import { useState } from 'react';
import Layout from '@/components/Layout';

export default function Survey() {
  const [formData, setFormData] = useState({
    clarity_rating: '',
    interesting_features: [],
    concerns: '',
    would_use: '',
    other_feedback: '',
    email: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const features = [
    { id: 'agents', label: '15 specialized agent roles' },
    { id: 'audit', label: 'Audit trails and traceability' },
    { id: 'recovery', label: 'Crash recovery (RESCUER)' },
    { id: 'soc2', label: 'SOC 2 roadmap' },
    { id: 'dashboard', label: 'Real-time dashboard' },
    { id: 'tdd', label: 'TDD enforcement' }
  ];

  const handleFeatureChange = (featureId) => {
    setFormData(prev => ({
      ...prev,
      interesting_features: prev.interesting_features.includes(featureId)
        ? prev.interesting_features.filter(f => f !== featureId)
        : [...prev.interesting_features, featureId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit survey');
      }

      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Layout title="Thank You" description="Thank you for your feedback on AI-AMP.">
        <section className="hero hero-page">
          <div className="container" style={{ textAlign: 'center' }}>
            <h1>Thank You</h1>
            <p>Your feedback is invaluable. We appreciate you taking the time to share your thoughts.</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout
      title="Feedback Survey"
      description="Share your feedback on AI-AMP. We'd love to hear your thoughts."
    >
      <section className="hero hero-page">
        <div className="container">
          <h1>We Value Your Feedback</h1>
          <p>Take a few minutes to share your thoughts on AI-AMP. Your input will help shape what we build.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
              {/* Question 1: Clarity */}
              <div className="card mb-lg">
                <h4 className="mb-md">1. How clear is the value proposition?</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  {['Very clear', 'Somewhat clear', 'Unclear'].map(option => (
                    <label key={option} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="clarity_rating"
                        value={option}
                        checked={formData.clarity_rating === option}
                        onChange={(e) => setFormData({ ...formData, clarity_rating: e.target.value })}
                        required
                        style={{ width: '18px', height: '18px' }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 2: Interesting Features */}
              <div className="card mb-lg">
                <h4 className="mb-md">2. Which capabilities are most interesting to you?</h4>
                <p className="text-light mb-md" style={{ fontSize: '0.875rem' }}>Select all that apply</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  {features.map(feature => (
                    <label key={feature.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.interesting_features.includes(feature.id)}
                        onChange={() => handleFeatureChange(feature.id)}
                        style={{ width: '18px', height: '18px' }}
                      />
                      {feature.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 3: Concerns */}
              <div className="card mb-lg">
                <h4 className="mb-md">3. What&apos;s your biggest concern or question?</h4>
                <textarea
                  value={formData.concerns}
                  onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                  placeholder="Share any concerns, questions, or things that weren't clear..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Question 4: Would Use */}
              <div className="card mb-lg">
                <h4 className="mb-md">4. Would you consider using this for your team?</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  {['Yes', 'Maybe', 'No'].map(option => (
                    <label key={option} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="would_use"
                        value={option}
                        checked={formData.would_use === option}
                        onChange={(e) => setFormData({ ...formData, would_use: e.target.value })}
                        required
                        style={{ width: '18px', height: '18px' }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 5: Other Feedback */}
              <div className="card mb-lg">
                <h4 className="mb-md">5. Any other feedback?</h4>
                <textarea
                  value={formData.other_feedback}
                  onChange={(e) => setFormData({ ...formData, other_feedback: e.target.value })}
                  placeholder="Anything else you'd like to share..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Question 6: Email */}
              <div className="card mb-lg">
                <h4 className="mb-md">6. Email (optional)</h4>
                <p className="text-light mb-md" style={{ fontSize: '0.875rem' }}>If you&apos;d like us to follow up</p>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {error && (
                <div className="card mb-lg" style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca' }}>
                  <p style={{ color: '#dc2626', margin: 0 }}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={status === 'submitting'}
                style={{ width: '100%' }}
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
