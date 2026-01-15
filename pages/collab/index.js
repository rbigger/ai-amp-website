import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Layout from '@/components/Layout';

export default function CollabIndex() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('collab_documents')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!error && data) {
      setDocuments(data);
    }
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setCreating(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('collab_documents')
      .insert({
        title: newTitle.trim(),
        content: '',
        author_id: user.id,
        author_name: user.email
      })
      .select()
      .single();

    if (!error && data) {
      setDocuments([data, ...documents]);
      setNewTitle('');
    }
    setCreating(false);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/collab/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.document) {
        setDocuments([data.document, ...documents]);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }

    setUploading(false);
    e.target.value = ''; // Reset file input
  };

  return (
    <Layout title="Workspace" description="Collaboration workspace for documents">
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
            <h1>Workspace</h1>
          </div>

          {/* Create New Document */}
          <div className="card mb-xl">
            <h3>Create New Document</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Document title..."
                style={{
                  flex: 1,
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)'
                }}
              />
              <button type="submit" className="btn btn-primary" disabled={creating || !newTitle.trim()}>
                {creating ? 'Creating...' : 'Create'}
              </button>
            </form>

            <div style={{ marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--color-border)' }}>
              <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Or Upload a File</h4>
              <p className="text-light" style={{ fontSize: '0.9rem', marginBottom: 'var(--spacing-md)' }}>
                Upload .md, .txt, or other files. Text files will be imported as document content.
              </p>
              <label
                style={{
                  display: 'inline-block',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  backgroundColor: 'var(--color-bg-alt)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  opacity: uploading ? 0.6 : 1
                }}
              >
                {uploading ? 'Uploading...' : 'Choose File'}
                <input
                  type="file"
                  onChange={handleUpload}
                  disabled={uploading}
                  accept=".md,.markdown,.txt,.text,.pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>

          {/* Document List */}
          {loading ? (
            <p>Loading...</p>
          ) : documents.length === 0 ? (
            <div className="card">
              <p>No documents yet. Create your first document above.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
              {documents.map((doc) => (
                <Link href={`/collab/${doc.id}`} key={doc.id} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>{doc.title}</h3>
                        <p className="text-light" style={{ fontSize: '0.9rem' }}>
                          {doc.content ? doc.content.substring(0, 150) + (doc.content.length > 150 ? '...' : '') : 'No content yet'}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                        <p>Updated: {formatDate(doc.updated_at)}</p>
                        <p>By: {doc.author_name}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
