import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Layout from '@/components/Layout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://ai-agent-management-platform.com/set-password',
      });

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
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

  if (success) {
    return (
      <Layout title="Reset Password" description="Reset your AI-AMP password">
        <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ maxWidth: '500px', textAlign: 'center' }}>
            <h1 className="mb-lg">Check Your Email</h1>
            <div className="card">
              <p>If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link.</p>
              <p className="text-light mt-lg" style={{ fontSize: '0.9rem' }}>
                The link will expire in 24 hours. If you don&apos;t see the email, check your spam folder.
              </p>
            </div>
            <p className="mt-xl">
              <Link href="/login" className="btn btn-secondary">Back to Login</Link>
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title="Reset Password" description="Reset your AI-AMP password">
      <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '400px' }}>
          <h1 className="text-center mb-lg">Reset Password</h1>
          <p className="text-center text-light mb-xl">
            Enter your email address and we&apos;ll send you a link to reset your password.
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
                <label htmlFor="email" style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '500' }}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                  placeholder="you@company.com"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>

            <p className="text-center mt-lg">
              Remember your password? <Link href="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
}
