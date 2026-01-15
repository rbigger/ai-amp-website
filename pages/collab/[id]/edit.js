import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Layout from '@/components/Layout';

export default function DocumentEdit() {
  const router = useRouter();
  const { id } = router.query;
  const [doc, setDoc] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
  }, [id]);

  const fetchDocument = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('collab_documents')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setDoc(data);
      setTitle(data.title);
      setContent(data.content || '');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('collab_documents')
      .update({
        title,
        content,
        author_id: user.id,
        author_name: user.email
      })
      .eq('id', id);

    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <Layout title="Loading..." description="Loading document">
        <section className="section">
          <div className="container">
            <p>Loading...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!doc) {
    return (
      <Layout title="Not Found" description="Document not found">
        <section className="section">
          <div className="container">
            <h1>Document Not Found</h1>
            <Link href="/collab">Back to Workspace</Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title={`Edit: ${doc.title}`} description="Edit document">
      <section className="section">
        <div className="container">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
            <div>
              <Link href={`/collab/${id}`} style={{ fontSize: '0.9rem', marginBottom: 'var(--spacing-sm)', display: 'block' }}>
                &larr; Back to Document
              </Link>
              <h1>Edit Document</h1>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
              {saved && <span style={{ color: 'green' }}>Saved!</span>}
              <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Edit Form */}
          <div className="card">
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600' }}>
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '1.1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600' }}>
                Content (Markdown supported)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={25}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius)',
                  fontFamily: 'monospace',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  resize: 'vertical'
                }}
                placeholder="Write your document content here. Markdown is supported."
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
