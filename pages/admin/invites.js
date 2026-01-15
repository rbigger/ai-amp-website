import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Layout from '@/components/Layout';

const ADMIN_EMAIL = 'roger@discoverie.us';

export default function Invites() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newInvite, setNewInvite] = useState({ email: '', notes: '', sendEmail: true });
  const [lastCreated, setLastCreated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAdminAndFetch();
  }, []);

  const checkAdminAndFetch = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email !== ADMIN_EMAIL) {
      router.push('/');
      return;
    }

    fetchInvites();
  };

  const fetchInvites = async () => {
    try {
      const res = await fetch('/api/admin/invite');
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else {
        setInvites(data.invites || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInvite),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else {
        setLastCreated({
          url: data.inviteUrl,
          emailSent: data.emailSent,
          emailError: data.emailError,
          email: newInvite.email
        });
        setNewInvite({ email: '', notes: '', sendEmail: true });
        setShowCreateForm(false);
        fetchInvites();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to revoke this invite?')) return;

    try {
      const res = await fetch('/api/admin/invite', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchInvites();
      } else {
        const data = await res.json();
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  const getInviteStatus = (invite) => {
    if (invite.used_at) return { status: 'Used', color: '#059669' };
    if (new Date(invite.expires_at) < new Date()) return { status: 'Expired', color: '#dc2626' };
    return { status: 'Pending', color: '#d97706' };
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

  return (
    <Layout title="Manage Invites" description="Create and manage invitation links">
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
            <h1>Manage Invites</h1>
            <div>
              <Link href="/admin/approvals" className="btn btn-secondary" style={{ marginRight: 'var(--spacing-md)' }}>
                Approvals
              </Link>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="btn btn-primary"
              >
                {showCreateForm ? 'Cancel' : 'Create Invite'}
              </button>
            </div>
          </div>

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

          {lastCreated && (
            <div className="card mb-lg" style={{ backgroundColor: '#e6fffa', border: '1px solid #0d9488' }}>
              <h3 style={{ color: '#0d9488', marginBottom: 'var(--spacing-md)' }}>Invite Created!</h3>
              <p><strong>Invite URL:</strong></p>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                <input
                  type="text"
                  value={lastCreated.url}
                  readOnly
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button onClick={() => copyToClipboard(lastCreated.url)} className="btn btn-secondary">
                  Copy
                </button>
              </div>
              {lastCreated.email && (
                <p>
                  {lastCreated.emailSent
                    ? `Email sent to ${lastCreated.email}`
                    : `Email failed: ${lastCreated.emailError || 'Unknown error'}`}
                </p>
              )}
              <button onClick={() => setLastCreated(null)} className="btn btn-secondary" style={{ marginTop: 'var(--spacing-md)' }}>
                Dismiss
              </button>
            </div>
          )}

          {showCreateForm && (
            <div className="card mb-xl">
              <h3 className="mb-lg">Create New Invite</h3>
              <form onSubmit={handleCreate}>
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={newInvite.email}
                    onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
                    placeholder="recipient@example.com"
                    style={inputStyle}
                  />
                  <small className="text-light">If provided, the invite will be sent to this email and pre-fill the signup form.</small>
                </div>

                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <label htmlFor="notes" style={{ display: 'block', marginBottom: 'var(--spacing-sm)' }}>
                    Notes (optional)
                  </label>
                  <input
                    id="notes"
                    type="text"
                    value={newInvite.notes}
                    onChange={(e) => setNewInvite({ ...newInvite, notes: e.target.value })}
                    placeholder="e.g., Referral from John Smith"
                    style={inputStyle}
                  />
                </div>

                {newInvite.email && (
                  <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={newInvite.sendEmail}
                        onChange={(e) => setNewInvite({ ...newInvite, sendEmail: e.target.checked })}
                      />
                      Send invite email to recipient
                    </label>
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={creating}>
                  {creating ? 'Creating...' : 'Create Invite'}
                </button>
              </form>
            </div>
          )}

          {loading && <p>Loading...</p>}

          {!loading && invites.length === 0 && (
            <div className="card">
              <p>No invites yet. Create one to get started.</p>
            </div>
          )}

          {invites.length > 0 && (
            <div className="card">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)' }}>Email / Notes</th>
                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)' }}>Created</th>
                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)' }}>Expires</th>
                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invites.map((invite) => {
                    const { status, color } = getInviteStatus(invite);
                    const inviteUrl = `https://ai-agent-management-platform.com/signup?invite=${invite.token}`;

                    return (
                      <tr key={invite.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: 'var(--spacing-md)' }}>
                          {invite.email ? (
                            <strong>{invite.email}</strong>
                          ) : (
                            <span className="text-light">No email specified</span>
                          )}
                          {invite.notes && (
                            <p className="text-light" style={{ fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                              {invite.notes}
                            </p>
                          )}
                        </td>
                        <td style={{ padding: 'var(--spacing-md)' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            backgroundColor: color,
                            color: '#fff',
                            fontSize: '0.85rem',
                            fontWeight: '500'
                          }}>
                            {status}
                          </span>
                        </td>
                        <td style={{ padding: 'var(--spacing-md)', fontSize: '0.9rem' }}>
                          {formatDate(invite.created_at)}
                        </td>
                        <td style={{ padding: 'var(--spacing-md)', fontSize: '0.9rem' }}>
                          {formatDate(invite.expires_at)}
                        </td>
                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                          {!invite.used_at && (
                            <>
                              <button
                                onClick={() => copyToClipboard(inviteUrl)}
                                className="btn btn-secondary"
                                style={{ marginRight: 'var(--spacing-sm)', padding: '6px 12px', fontSize: '0.85rem' }}
                              >
                                Copy Link
                              </button>
                              <button
                                onClick={() => handleDelete(invite.id)}
                                className="btn"
                                style={{ padding: '6px 12px', fontSize: '0.85rem', backgroundColor: '#dc2626', color: '#fff' }}
                              >
                                Revoke
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
