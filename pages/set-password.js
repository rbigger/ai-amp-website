import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Layout from '@/components/Layout';

export default function SetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    // Check if user has a valid session from the reset link
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setHasSession(!!session);
      setSessionChecked(true);
    };
    checkSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);

      // Redirect to home after a short delay
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: 'var(--spacing-md)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
    fontSize: '1rem',
    backgroundColor: 'var(--color-background)',
    color: 'var(--color-text)',
  };

  // Show loading state while checking session
  if (!sessionChecked) {
    return (
      <Layout title="Set Password" description="Set your AI-AMP password">
        <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <p>Loading...</p>
          </div>
        </section>
      </Layout>
    );
  }

  // Show error if no valid session
  if (!hasSession) {
    return (
      <Layout title="Set Password" description="Set your AI-AMP password">
        <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ maxWidth: '500px', textAlign: 'center' }}>
            <h1 className="mb-lg">Invalid or Expired Link</h1>
            <div className="card">
              <p>This password reset link is invalid or has expired.</p>
              <p className="text-light mt-lg" style={{ fontSize: '0.9rem' }}>
                Please request a new password reset link.
              </p>
            </div>
            <p className="mt-xl">
              <Link href="/forgot-password" className="btn btn-primary">Request New Link</Link>
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  if (success) {
    return (
      <Layout title="Password Set" description="Your AI-AMP password has been set">
        <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ maxWidth: '500px', textAlign: 'center' }}>
            <h1 className="mb-lg">Password Set Successfully</h1>
            <div className="card">
              <p>Your password has been set. You can now sign in to AI-AMP.</p>
              <p className="text-light mt-lg" style={{ fontSize: '0.9rem' }}>
                Redirecting you to the dashboard...
              </p>
            </div>
            <p className="mt-xl">
              <Link href="/" className="btn btn-primary">Go to Dashboard</Link>
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title="Set Password" description="Set your AI-AMP password">
      <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '400px' }}>
          <h1 className="text-center mb-lg">Set Your Password</h1>
          <p className="text-center text-light mb-xl">
            Create a secure password for your AI-AMP account.
          </p>

          <form onSubmit={handleSubmit}>
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

            <div className="card">
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label htmlFor="password" style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '500' }}>
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  style={inputStyle}
                />
                <small className="text-light">Minimum 8 characters</small>
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '500' }}>
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Setting Password...' : 'Set Password'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
