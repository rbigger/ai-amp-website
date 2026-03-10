import Link from 'next/link';
import Image from 'next/image';
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
          <p>AI-AMP includes dedicated CISO and COMPLIANCE agents. Security operations and audit readiness are not afterthoughts&mdash;they&apos;re specialized roles with defined authority and escalation paths.</p>
        </div>
      </section>

      {/* Core Controls */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-2xl">Dedicated Security & Compliance Agents</h2>
          <div className="grid grid-2">
            {[
              { title: 'CISO Agent', desc: 'Monitors security alerts, classifies vulnerabilities by severity (SEV0-3), coordinates incident response. SEV0/SEV1 require ARCHITECT approval before containment.' },
              { title: 'COMPLIANCE Agent', desc: 'Collects and validates evidence artifacts, maps controls to regulatory requirements, maintains traceability matrices. Audit-ready at any time.' },
              { title: 'Severity Classification', desc: 'SEV0: Active breach (immediate). SEV1: Critical, exploitable (24h SLA). SEV2: High risk with workaround. SEV3: Low risk.' },
              { title: 'Evidence Traceability', desc: 'Every artifact has agent_id, timestamp (ISO 8601), ticket_id, control_id. Chain from Regulation to Requirement to Design to Code to Test to Evidence.' },
              { title: 'Escalation Authority', desc: 'Each role has defined decision scope: what it can decide autonomously vs what requires escalation. Security exceptions require CISO + ARCHITECT approval.' },
              { title: 'Independent Verification', desc: 'No agent can approve its own work. ARCHITECT performs independent verification. REVIEWER never rubber-stamps reviews.' },
            ].map((control, i) => (
              <div key={i} className="card">
                <h4>{control.title}</h4>
                <p className="mb-0">{control.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traceability Chain */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Complete Audit Trail</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            Every requirement, implementation, and test links back to strategic vision. Auditors can trace any artifact to its origin.
          </p>
          <div style={{ maxWidth: '950px', margin: '0 auto', textAlign: 'center' }}>
            <Image
              src="/graphics/traceability-chain.png"
              alt="Traceability Chain: Vision to Use Case to Ticket to Test to Evidence with complete audit trail"
              width={900}
              height={400}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        </div>
      </section>

      {/* SOC 2 */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">SOC 2 Trust Services Criteria</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Criteria</th><th>AI-AMP Capability</th></tr>
              </thead>
              <tbody>
                <tr><td>CC6.1 - Logical Access</td><td>Role-based access with 15 defined roles</td></tr>
                <tr><td>CC6.2 - Access Removal</td><td>Agent lifecycle management</td></tr>
                <tr><td>CC7.1 - Configuration</td><td>Environment separation, change tracking</td></tr>
                <tr><td>CC7.2 - Change Management</td><td>Multi-party approval workflows</td></tr>
                <tr><td>CC7.3 - Change Testing</td><td>Dedicated TESTER agent</td></tr>
                <tr><td>CC8.1 - Monitoring</td><td>Real-time dashboard, 22 views</td></tr>
                <tr><td>A1.2 - Backup/Recovery</td><td>Multi-layer backup strategy, documented DR procedures</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SOC 2 Roadmap */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">SOC 2 Certification Roadmap</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            Our path to SOC 2 Type I (Q2 2026) and Type II (Q4 2026) certification.
          </p>
          <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
            <Image
              src="/graphics/soc2-roadmap.png"
              alt="SOC 2 Certification Roadmap showing 4 phases: Foundation (complete), Controls (in progress), Documentation (Q1-Q2 2026), and Audit (Q2-Q4 2026)"
              width={1100}
              height={650}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
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
