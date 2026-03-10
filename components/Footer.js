import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error);
      } else {
        setStatus('success');
        setMessage('Thanks for subscribing!');
        setEmail('');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link href="/product/overview">Overview</Link></li>
              <li><Link href="/protected/product/agent-roles">Agent Roles</Link></li>
              <li><Link href="/protected/product/compliance">Compliance</Link></li>
              <li><Link href="/protected/product/dashboard">Dashboard</Link></li>
              <li><Link href="/protected/product/memory">Memory Model</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Solutions</h4>
            <ul>
              <li><Link href="/solutions/financial-services">Financial Services</Link></li>
              <li><Link href="/solutions/healthcare">Healthcare</Link></li>
              <li><Link href="/solutions/enterprise">Enterprise</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/survey">Give Feedback</Link></li>
              <li><span className="footer-coming-soon">Documentation</span></li>
              <li><span className="footer-coming-soon">Blog</span></li>
              <li><span className="footer-coming-soon">Case Studies</span></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><a href="mailto:info@ai-agent-management-platform.com">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Get product updates and AI governance insights.</p>
          {status === 'success' ? (
            <p style={{ color: 'var(--color-accent)' }}>{message}</p>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 'var(--spacing-sm)', maxWidth: '400px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                style={{
                  flex: 1,
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text)',
                  fontSize: '0.9rem',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary"
                style={{ whiteSpace: 'nowrap' }}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: 'var(--spacing-sm)' }}>{message}</p>
          )}
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 AI-AMP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
