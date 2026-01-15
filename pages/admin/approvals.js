import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@/lib/supabase/client';
import Layout from '@/components/Layout';

export default function Approvals() {
  const [pending, setPending] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approving, setApproving] = useState(null);
  const [updatingRole, setUpdatingRole] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const router = useRouter();

  useEffect(() => {
    checkAdminAndFetch();
  }, []);

  const checkAdminAndFetch = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/');
      return;
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchPending();
    fetchAllUsers();
  };

  const fetchAllUsers = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, email, full_name, role, approved, created_at')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAllUsers(data);
    }
  };

  const fetchPending = async () => {
    try {
      const res = await fetch('/api/admin/pending');
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else {
        setPending(data.pending || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    setApproving(userId);

    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error}`);
      } else {
        const emailStatus = data.resetEmailSent
          ? 'Password reset email sent.'
          : `Password email failed: ${data.resetError || 'Unknown error'}`;
        alert(`Approved: ${data.user.email}\n${emailStatus}`);
        setPending(pending.filter(p => p.id !== userId));
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setApproving(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingRole(userId);
    try {
      const res = await fetch('/api/admin/update-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error}`);
      } else {
        setAllUsers(allUsers.map(u =>
          u.id === userId ? { ...u, role: newRole } : u
        ));
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setUpdatingRole(null);
    }
  };

  return (
    <Layout title="Admin Panel" description="Manage users and approvals">
      <section className="section">
        <div className="container">
          <h1 className="mb-lg">Admin Panel</h1>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)', borderBottom: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setActiveTab('pending')}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'pending' ? '2px solid var(--color-primary)' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: activeTab === 'pending' ? '600' : '400'
              }}
            >
              Pending Approvals ({pending.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'users' ? '2px solid var(--color-primary)' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: activeTab === 'users' ? '600' : '400'
              }}
            >
              All Users ({allUsers.length})
            </button>
          </div>

          {loading && <p>Loading...</p>}

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

          {/* Pending Approvals Tab */}
          {activeTab === 'pending' && (
            <>
              {!loading && pending.length === 0 && (
                <div className="card">
                  <p>No pending approvals.</p>
                </div>
              )}

              {pending.map((user) => (
                <div key={user.id} className="card mb-lg">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <div>
                      <h3>{user.full_name}</h3>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Company:</strong> {user.company_name}</p>
                      <p><strong>Title:</strong> {user.job_title}</p>
                      <p><strong>Size:</strong> {user.company_size}</p>
                      <p><strong>Industry:</strong> {user.industry}{user.industry_other ? ` (${user.industry_other})` : ''}</p>
                    </div>
                    <div>
                      <p><strong>Current AI Usage:</strong><br />{user.current_ai_usage}{user.current_ai_usage_other ? ` - ${user.current_ai_usage_other}` : ''}</p>
                      <p><strong>Desired AI Usage:</strong><br />{user.desired_ai_usage}{user.desired_ai_usage_other ? ` - ${user.desired_ai_usage_other}` : ''}</p>
                      <p className="text-light" style={{ fontSize: '0.9rem' }}>
                        <strong>Signed up:</strong> {formatDate(user.created_at)}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: 'var(--spacing-lg)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-lg)' }}>
                    <button
                      onClick={() => handleApprove(user.id)}
                      disabled={approving === user.id}
                      className="btn btn-primary"
                    >
                      {approving === user.id ? 'Approving...' : 'Approve'}
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* All Users Tab */}
          {activeTab === 'users' && (
            <div className="card">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)' }}>Email</th>
                    <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: 'var(--spacing-sm)' }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: 'var(--spacing-sm)' }}>{user.full_name || '-'}</td>
                      <td style={{ padding: 'var(--spacing-sm)' }}>{user.email}</td>
                      <td style={{ padding: 'var(--spacing-sm)' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          backgroundColor: user.approved ? '#d1fae5' : '#fef3c7',
                          color: user.approved ? '#065f46' : '#92400e'
                        }}>
                          {user.approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td style={{ padding: 'var(--spacing-sm)' }}>
                        <select
                          value={user.role || 'user'}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          disabled={updatingRole === user.id}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid var(--color-border)'
                          }}
                        >
                          <option value="user">user</option>
                          <option value="collaborator">collaborator</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
