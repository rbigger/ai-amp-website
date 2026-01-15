import { createClient } from '@/lib/supabase/server';

export default async function handler(req, res) {
  const { id } = req.query;
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

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('collab_documents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Document not found' });
    }

    return res.status(200).json({ document: data });
  }

  if (req.method === 'PUT') {
    const { title, content } = req.body;

    const { data, error } = await supabase
      .from('collab_documents')
      .update({
        title,
        content,
        author_id: user.id,
        author_name: user.email
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ document: data });
  }

  if (req.method === 'DELETE') {
    // First delete associated notes
    await supabase
      .from('collab_notes')
      .delete()
      .eq('document_id', id);

    // Then delete the document
    const { error } = await supabase
      .from('collab_documents')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, message: 'Document deleted' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
