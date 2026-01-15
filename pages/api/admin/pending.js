import { createClient } from '@/lib/supabase/server';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = createClient({ req, res });

  // Check if user is authenticated and has admin role
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Get pending approvals
  const { data, error } = await supabase
    .from('pending_approvals')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ pending: data });
}
