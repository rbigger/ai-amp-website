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
    if (!keyData.permissions?.includes('notes:write')) {
      return res.status(403).json({ error: 'Permission denied: notes:write required' });
    }

    const { document_id, content } = req.body;

    if (!document_id || !content) {
      return res.status(400).json({ error: 'document_id and content are required' });
    }

    // Verify document exists
    const { data: docData, error: docError } = await supabase
      .from('collab_documents')
      .select('id')
      .eq('id', document_id)
      .single();

    if (docError || !docData) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const { data, error } = await supabase
      .from('collab_notes')
      .insert({
        document_id,
        content,
        author_name: keyData.agent_name,
        author_type: 'AGENT'
      })
      .select('id')
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ id: data.id, message: 'Note created' });
  }

  if (req.method === 'GET') {
    // Check permission
    if (!keyData.permissions?.includes('notes:read')) {
      return res.status(403).json({ error: 'Permission denied: notes:read required' });
    }

    const { document_id } = req.query;

    let query = supabase
      .from('collab_notes')
      .select('id, document_id, content, author_name, author_type, created_at')
      .order('created_at', { ascending: false });

    if (document_id) {
      query = query.eq('document_id', document_id);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ notes: data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
