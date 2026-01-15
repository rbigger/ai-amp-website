import Link from 'next/link';
import Layout from '@/components/Layout';

export default function FinancialServices() {
  return (
    <Layout
      title="Financial Services"
      description="AI-AMP provides SOC 2 aligned controls, NYDFS 500 alignment, and OCC guidance compliance for financial services AI development."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>AI Development That Banks Can Trust</h1>
          <p>AI-AMP delivers the compliance controls, audit trails, and governance that financial institutions require. Build faster without compromising on regulatory obligations.</p>
          <div className="btn-group" style={{ marginTop: 'var(--spacing-xl)' }}>
            <Link href="/survey" className="btn btn-primary btn-large">Talk With Us</Link>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">Why Banks Can&apos;t Use Consumer AI Tools</h2>
          <p className="text-center text-light mb-2xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>Financial services operate under strict regulatory oversight. SOC 2, NYDFS 500, and OCC guidance mandate capabilities that consumer AI tools simply don&apos;t provide.</p>
          <div className="grid grid-3">
            {[
              { title: 'Audit Requirements', desc: 'Regulators need to see exactly what happened, when, and why. Consumer tools don\'t log at the level required.' },
              { title: 'Approval Workflows', desc: 'Production changes require documented approvals. Most AI tools bypass approval processes entirely.' },
              { title: 'Environment Controls', desc: 'Development and production must be strictly separated. AI shouldn\'t access production during development.' },
            ].map((challenge, i) => (
              <div key={i} className="card">
                <h4>{challenge.title}</h4>
                <p className="mb-0">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Alignment */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-2xl">Regulatory Alignment</h2>

          <h3 className="mb-lg">SOC 2 Trust Services Criteria</h3>
          <div className="table-container mb-2xl">
            <table>
              <thead>
                <tr><th>Criteria</th><th>AI-AMP Capability</th></tr>
              </thead>
              <tbody>
                <tr><td>CC6.1 - Logical Access</td><td>Role-based access with 15 defined roles, each with decision scopes</td></tr>
                <tr><td>CC6.2 - Access Removal</td><td>Agent lifecycle management</td></tr>
                <tr><td>CC7.1 - Configuration</td><td>Environment separation, change tracking</td></tr>
                <tr><td>CC7.2 - Change Management</td><td>Multi-party approval workflows</td></tr>
                <tr><td>CC7.3 - Change Testing</td><td>Dedicated TESTER agent</td></tr>
                <tr><td>CC8.1 - Monitoring</td><td>Real-time dashboard, 22 views</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="mb-lg">NYDFS 23 NYCRR 500</h3>
          <div className="table-container mb-2xl">
            <table>
              <thead>
                <tr><th>Section</th><th>Requirement</th><th>AI-AMP Control</th></tr>
              </thead>
              <tbody>
                <tr><td>500.6</td><td>Audit Trail</td><td>Immutable logging, 90-day retention</td></tr>
                <tr><td>500.7</td><td>Access Privileges</td><td>Least privilege, role-based</td></tr>
                <tr><td>500.9</td><td>Testing</td><td>TESTER agent, test management</td></tr>
                <tr><td>500.13</td><td>Asset Inventory</td><td>Complete agent tracking</td></tr>
                <tr><td>500.16</td><td>Incident Response</td><td>CISO agent with SEV0-3 classification, escalation paths</td></tr>
              </tbody>
            </table>
          </div>

          <div className="card text-center" style={{ backgroundColor: 'var(--color-accent)', color: 'white', maxWidth: '600px', margin: '0 auto' }}>
            <h4 style={{ color: 'white' }}>SOC 2 Certification Roadmap</h4>
            <p className="mb-0">Type I: Q2 2026 | Type II: Q4 2026</p>
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
