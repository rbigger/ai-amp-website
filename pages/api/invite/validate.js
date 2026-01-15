import { createClient } from '@/lib/supabase/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required', valid: false });
  }

  const supabase = createClient({ req, res });

  // Find the invite
  const { data: invite, error } = await supabase
    .from('invites')
    .select('*')
    .eq('token', token)
    .single();

  if (error || !invite) {
    return res.status(200).json({ valid: false, reason: 'Invalid invite token' });
  }

  // Check if already used
  if (invite.used_at) {
    return res.status(200).json({ valid: false, reason: 'This invite has already been used' });
  }

  // Check if expired
  if (new Date(invite.expires_at) < new Date()) {
    return res.status(200).json({ valid: false, reason: 'This invite has expired' });
  }

  // Valid invite
  return res.status(200).json({
    valid: true,
    invite: {
      id: invite.id,
      email: invite.email,  // Pre-filled email if specified
      notes: invite.notes
    }
  });
}
