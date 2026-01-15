import { createServerClient } from '@supabase/ssr';

export function createClient(context) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return context.req.cookies[name];
        },
        set(name, value, options) {
          context.res.setHeader('Set-Cookie', `${name}=${value}; Path=/; HttpOnly; SameSite=Lax`);
        },
        remove(name, options) {
          context.res.setHeader('Set-Cookie', `${name}=; Path=/; HttpOnly; Max-Age=0`);
        },
      },
    }
  );
}
