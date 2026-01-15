import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Healthcare() {
  return (
    <Layout
      title="Healthcare"
      description="AI-AMP provides HIPAA-aligned access controls, audit trails, and change management for healthcare software development."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>AI Development for Healthcare</h1>
          <p>AI-AMP provides the audit trails, access controls, and change management that healthcare organizations need. Accelerate development while maintaining HIPAA alignment.</p>
          <div className="btn-group" style={{ marginTop: 'var(--spacing-xl)' }}>
            <Link href="/survey" className="btn btn-primary btn-large">Talk With Us</Link>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">Healthcare Development Requirements</h2>
          <div className="grid grid-3">
            {[
              { title: 'PHI Protection', desc: 'Systems touching patient data must have appropriate access controls and audit trails.' },
              { title: 'Change Control', desc: 'Software changes require documented procedures, testing, and approval workflows.' },
              { title: 'Validation', desc: 'FDA-regulated software has specific validation requirements for traceability.' },
            ].map((req, i) => (
              <div key={i} className="card">
                <h4>{req.title}</h4>
                <p className="mb-0">{req.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIPAA Alignment */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">HIPAA Alignment</h2>
          <div className="table-container mb-xl">
            <table>
              <thead>
                <tr><th>Safeguard</th><th>AI-AMP Capability</th></tr>
              </thead>
              <tbody>
                <tr><td>Access Controls (§164.312(a))</td><td>Role-based access, 13 defined agent roles</td></tr>
                <tr><td>Audit Controls (§164.312(b))</td><td>Immutable action logging, complete trails</td></tr>
                <tr><td>Integrity Controls (§164.312(c))</td><td>Tamper-evident audit storage</td></tr>
                <tr><td>Person Authentication (§164.312(d))</td><td>Agent identity via GUID</td></tr>
                <tr><td>Transmission Security (§164.312(e))</td><td>Encrypted communications</td></tr>
              </tbody>
            </table>
          </div>
          <div className="card" style={{ backgroundColor: 'var(--color-background)', borderLeft: '4px solid var(--color-warning)', maxWidth: '700px', margin: '0 auto' }}>
            <p className="mb-0"><strong>Important Note:</strong> AI-AMP is a development tool, not a clinical system. PHI should not be stored in AI-AMP. Compliance depends on your implementation and data handling practices.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>What Do You Think?</h2>
          <p>We&apos;re building AI-AMP for enterprise teams. Your feedback shapes what we build next.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/survey" className="btn btn-primary btn-large">Talk With Us</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
