import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Compliance() {
  return (
    <Layout
      title="Compliance & Security"
      description="AI-AMP provides SOC 2 aligned controls, audit trails, approval workflows, and kill switches. Built for financial services, healthcare, and regulated enterprises."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>Built for Regulated Industries</h1>
          <p>AI-AMP was designed from day one for enterprises that can&apos;t compromise on compliance. Security controls, audit trails, and governance are architecture&mdash;not afterthoughts.</p>
        </div>
      </section>

      {/* Core Controls */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-2xl">Core Security Controls</h2>
          <div className="grid grid-2">
            {[
              { title: 'Immutable Audit Trails', desc: 'Every agent action logged to append-only storage. Complete record of who did what, when, and why.' },
              { title: 'Role-Based Access Control', desc: '13 defined agent roles with explicit permissions. Agents can only access what they need.' },
              { title: 'Multi-Party Approval Workflows', desc: 'Configure approval requirements for sensitive operations. Machine + human approval options.' },
              { title: 'Environment Separation', desc: 'Hard boundaries between development, staging, and production. Agents cannot cross without explicit promotion.' },
              { title: 'Kill Switches', desc: 'Immediate agent termination when needed. Not a request&mdash;an enforcement. Cannot be bypassed.' },
              { title: 'Confabulation Detection', desc: 'Verify agent claims against actual system state. Catch misrepresentations before they cause problems.' },
            ].map((control, i) => (
              <div key={i} className="card">
                <h4>{control.title}</h4>
                <p className="mb-0">{control.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOC 2 */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">SOC 2 Trust Services Criteria</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Criteria</th><th>AI-AMP Capability</th></tr>
              </thead>
              <tbody>
                <tr><td>CC6.1 - Logical Access</td><td>Role-based access with 13 defined roles</td></tr>
                <tr><td>CC6.2 - Access Removal</td><td>Agent lifecycle management</td></tr>
                <tr><td>CC7.1 - Configuration</td><td>Environment separation, change tracking</td></tr>
                <tr><td>CC7.2 - Change Management</td><td>Multi-party approval workflows</td></tr>
                <tr><td>CC7.3 - Change Testing</td><td>Dedicated TESTER agent</td></tr>
                <tr><td>CC8.1 - Monitoring</td><td>Real-time dashboard, 22 views</td></tr>
              </tbody>
            </table>
          </div>
          <div className="card text-center mt-xl" style={{ backgroundColor: 'var(--color-accent)', color: 'white', maxWidth: '600px', margin: '0 auto' }}>
            <h4 style={{ color: 'white' }}>SOC 2 Certification Roadmap</h4>
            <p className="mb-0">Type I: Q2 2026 | Type II: Q4 2026</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Discuss Your Compliance Requirements</h2>
          <p>Every organization has unique regulatory obligations. Let&apos;s discuss how AI-AMP maps to your specific requirements.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/contact-sales" className="btn btn-primary btn-large">Contact Sales</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
