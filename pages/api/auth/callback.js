import { createClient } from '@/lib/supabase/server';

export default async function handler(req, res) {
  const { code } = req.query;

  if (code) {
    const supabase = createClient({ req, res });
    await supabase.auth.exchangeCodeForSession(code);
  }

  res.redirect('/');
}
