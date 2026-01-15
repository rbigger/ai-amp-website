import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Create Supabase client with service role for agent operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function validateApiKey(apiKey) {
  if (!apiKey) return null;

  // Hash the API key
  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

  // Look up the key
  const { data, error } = await supabase
    .from('collab_api_keys')
    .select('id, agent_name, permissions, expires_at')
    .eq('key_hash', keyHash)
    .single();

  if (error || !data) return null;

  // Check expiry
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return null;
  }

  // Update last_used_at
  await supabase
    .from('collab_api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', data.id);

  return data;
}

export default async function handler(req, res) {
  // Extract API key from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const apiKey = authHeader.slice(7);
  const keyData = await validateApiKey(apiKey);

  if (!keyData) {
    return res.status(401).json({ error: 'Invalid or expired API key' });
  }

  if (req.method === 'POST') {
    // Check permission
    if (!keyData.permissions?.includes('documents:write')) {
      return res.status(403).json({ error: 'Permission denied: documents:write required' });
    }

    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'title is required' });
    }

    const { data, error } = await supabase
      .from('collab_documents')
      .insert({
        title,
        content: content || '',
        author_name: keyData.agent_name
      })
      .select('id')
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ id: data.id, message: 'Document created' });
  }

  if (req.method === 'GET') {
    // Check permission
    if (!keyData.permissions?.includes('documents:read')) {
      return res.status(403).json({ error: 'Permission denied: documents:read required' });
    }

    const { data, error } = await supabase
      .from('collab_documents')
      .select('id, title, created_at, updated_at')
      .order('updated_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ documents: data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
