import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createClient } from '@/lib/supabase/client';
import Layout from '@/components/Layout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { redirect } = router.query;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (data?.session) {
        // Full page reload to ensure cookies are set
        window.location.href = redirect || '/';
      } else {
        setError('Login failed - no session returned');
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <Layout title="Login" description="Sign in to access AI-AMP">
      <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '400px' }}>
          <h1 className="text-center mb-xl">Sign In</h1>

          <form onSubmit={handleLogin}>
            {error && (
              <div style={{
                padding: 'var(--spacing-md)',
                backgroundColor: '#fee',
                border: '1px solid #c00',
                borderRadius: 'var(--border-radius)',
                marginBottom: 'var(--spacing-lg)',
                color: '#c00'
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'right' }}>
              <Link href="/forgot-password" style={{ fontSize: '0.9rem' }}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-xl">
            Don&apos;t have an account? <Link href="/signup">Request Access</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
