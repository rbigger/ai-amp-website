import { createClient } from '@/lib/supabase/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = createClient({ req, res });

  // Check if user is authenticated and has admin role
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { data: adminProfile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!adminProfile || adminProfile.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ error: 'userId and role are required' });
  }

  // Validate role value
  const validRoles = ['user', 'collaborator', 'admin'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  // Update user role
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true, user: data });
}
