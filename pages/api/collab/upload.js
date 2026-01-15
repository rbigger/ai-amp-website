import { createClient } from '@/lib/supabase/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = createClient({ req, res });

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check user has collaborator or admin role
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || !['collaborator', 'admin'].includes(profile.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Parse the form
  const form = formidable({
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  try {
    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ext = path.extname(file.originalFilename || '').toLowerCase();
    const title = path.basename(file.originalFilename || 'Untitled', ext);

    // Read file content for text-based files
    let content = '';
    const textExtensions = ['.md', '.markdown', '.txt', '.text'];

    if (textExtensions.includes(ext)) {
      content = fs.readFileSync(file.filepath, 'utf-8');
    } else {
      // For non-text files, store a reference
      content = `[Uploaded file: ${file.originalFilename}]\n\nFile type: ${file.mimetype}\nSize: ${(file.size / 1024).toFixed(2)} KB`;
    }

    // Create document
    const { data, error } = await supabase
      .from('collab_documents')
      .insert({
        title: title,
        content: content,
        author_id: user.id,
        author_name: user.email
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    return res.status(201).json({
      success: true,
      document: data,
      message: `Document "${title}" created from uploaded file`
    });

  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: err.message });
  }
}
