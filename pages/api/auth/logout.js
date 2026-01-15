import { createClient } from '@/lib/supabase/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = createClient({ req, res });
  await supabase.auth.signOut();

  res.redirect('/login');
}
