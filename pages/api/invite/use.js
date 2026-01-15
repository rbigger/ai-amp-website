import { createClient } from '@/lib/supabase/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, userId } = req.body;

  if (!token || !userId) {
    return res.status(400).json({ error: 'Token and userId are required' });
  }

  const supabase = createClient({ req, res });

  // Mark the invite as used
  const { data, error } = await supabase
    .from('invites')
    .update({
      used_at: new Date().toISOString(),
      used_by: userId
    })
    .eq('token', token)
    .is('used_at', null)  // Only update if not already used
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message, success: false });
  }

  if (!data) {
    return res.status(400).json({ error: 'Invite already used or invalid', success: false });
  }

  return res.status(200).json({ success: true });
}
