import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Layout from '@/components/Layout';
import ReactMarkdown from 'react-markdown';

export default function DocumentView() {
  const router = useRouter();
  const { id } = router.query;
  const [doc, setDoc] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDocument();
      fetchNotes();
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
    }
    setLoading(false);
  };

  const fetchNotes = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('collab_notes')
      .select('*')
      .eq('document_id', id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNotes(data);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setSubmittingNote(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('collab_notes')
      .insert({
        document_id: id,
        content: newNote.trim(),
        author_id: user.id,
        author_name: user.email,
        author_type: 'HUMAN'
      })
      .select()
      .single();

    if (!error && data) {
      setNotes([data, ...notes]);
      setNewNote('');
    }
    setSubmittingNote(false);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this document? This will also delete all notes.')) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/collab/documents/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/collab');
      } else {
        const data = await res.json();
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
    setDeleting(false);
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
    <Layout title={doc.title} description="Document view">
      <section className="section">
        <div className="container">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
            <div>
              <Link href="/collab" style={{ fontSize: '0.9rem', marginBottom: 'var(--spacing-sm)', display: 'block' }}>
                &larr; Back to Workspace
              </Link>
              <h1>{doc.title}</h1>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <Link href={`/collab/${id}/edit`} className="btn btn-primary">
                Edit Document
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn btn-secondary"
                style={{ backgroundColor: '#dc2626', borderColor: '#dc2626', color: 'white' }}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 'var(--spacing-xl)' }}>
            {/* Document Content */}
            <div className="card">
              {doc.content ? (
                <div className="markdown-content">
                  <ReactMarkdown>{doc.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-light">No content yet. Click "Edit Document" to add content.</p>
              )}
            </div>

            {/* Notes Panel */}
            <div>
              <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Notes & Comments</h3>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} style={{ marginBottom: 'var(--spacing-lg)' }}>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--border-radius)',
                    marginBottom: 'var(--spacing-sm)',
                    resize: 'vertical'
                  }}
                />
                <button type="submit" className="btn btn-primary" disabled={submittingNote || !newNote.trim()}>
                  {submittingNote ? 'Adding...' : 'Add Note'}
                </button>
              </form>

              {/* Notes List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {notes.length === 0 ? (
                  <p className="text-light">No notes yet.</p>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className="card"
                      style={{
                        padding: 'var(--spacing-md)',
                        borderLeft: note.author_type === 'AGENT' ? '3px solid var(--color-primary)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                          {note.author_name}
                          {note.author_type === 'AGENT' && (
                            <span style={{
                              marginLeft: '8px',
                              padding: '2px 6px',
                              backgroundColor: 'var(--color-primary)',
                              color: 'white',
                              borderRadius: '4px',
                              fontSize: '0.75rem'
                            }}>
                              AI
                            </span>
                          )}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                          {formatDate(note.created_at)}
                        </span>
                      </div>
                      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
