import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createClient } from '@/lib/supabase/client';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          AI-<span>AMP</span>
        </Link>
        <ul className="nav-links">
          <li className="nav-dropdown">
            <Link href="/product/overview">Product</Link>
            <div className="nav-dropdown-content">
              <Link href="/product/overview">Overview</Link>
              <Link href="/product/agent-roles">Agent Roles</Link>
              <Link href="/product/compliance">Compliance</Link>
              <Link href="/product/dashboard">Dashboard</Link>
              <Link href="/product/memory">Memory Model</Link>
            </div>
          </li>
          <li className="nav-dropdown">
            <Link href="/solutions/enterprise">Solutions</Link>
            <div className="nav-dropdown-content">
              <Link href="/solutions/financial-services">Financial Services</Link>
              <Link href="/solutions/healthcare">Healthcare</Link>
              <Link href="/solutions/enterprise">Enterprise</Link>
            </div>
          </li>
          <li><Link href="/survey">Feedback</Link></li>
          <li><ThemeToggle /></li>
          {user ? (
            <>
              {user.email === 'roger@discoverie.us' && (
                <li className="nav-dropdown">
                  <Link href="/admin/approvals">Admin</Link>
                  <div className="nav-dropdown-content">
                    <Link href="/admin/approvals">Approvals</Link>
                    <Link href="/admin/invites">Invites</Link>
                  </div>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/login">Sign In</Link></li>
              <li><Link href="/survey" className="btn btn-primary">Talk With Us</Link></li>
            </>
          )}
        </ul>
        <button className="nav-mobile-toggle">&#9776;</button>
      </div>
    </nav>
  );
}
