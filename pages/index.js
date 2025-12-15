import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout
      title="AI Agent Management Platform for Enterprise"
      description="AI-AMP orchestrates teams of specialized AI agents with full accountability, audit trails, and compliance controls. Built for regulated industries."
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>AI Development You Can Trust</h1>
          <p>AI-AMP orchestrates teams of specialized AI agents&mdash;each with defined roles, clear boundaries, and complete accountability. Built for enterprises that can&apos;t compromise on governance.</p>
          <div className="btn-group" style={{ marginTop: 'var(--spacing-xl)' }}>
            <Link href="/demo-request" className="btn btn-primary btn-large">Request Demo</Link>
            <Link href="/product/overview" className="btn btn-secondary btn-large" style={{ borderColor: 'white', color: 'white' }}>Learn More</Link>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">The Problem with AI Coding Tools</h2>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p>Most AI coding tools are black boxes. They write code, but you can&apos;t see what they&apos;re doing, why they made certain decisions, or prove compliance to auditors.</p>
              <p>For regulated industries&mdash;financial services, healthcare, enterprise&mdash;that&apos;s a non-starter.</p>
              <h4 className="mt-lg mb-sm">You need:</h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                <li>Complete audit trails</li>
                <li>Approval workflows</li>
                <li>Environment separation</li>
                <li>Kill switches that actually work</li>
              </ul>
            </div>
            <div className="card" style={{ backgroundColor: 'var(--color-background-alt)' }}>
              <h4>AI-AMP Provides</h4>
              <ul style={{ listStyle: 'none' }}>
                <li><strong>13 Specialized Agents</strong> &ndash; Not one AI doing everything, but a team of specialists</li>
                <li><strong>Complete Audit Trails</strong> &ndash; Every action logged, immutable, exportable</li>
                <li><strong>Approval Workflows</strong> &ndash; Multi-party gates for sensitive operations</li>
                <li><strong>Real-Time Dashboard</strong> &ndash; 22 views for complete visibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Roles Preview */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">13 Specialized Agent Roles</h2>
          <p className="text-center text-light mb-2xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>Like a well-run engineering organization, AI-AMP uses specialized roles with clear responsibilities and handoffs.</p>

          <div className="grid grid-4">
            {[
              { name: 'ARCHITECT', desc: 'Strategic design and orchestration' },
              { name: 'CODER', desc: 'Implementation and features' },
              { name: 'TESTER', desc: 'Quality assurance and validation' },
              { name: 'REVIEWER', desc: 'Code review and approval gates' },
            ].map((role) => (
              <div key={role.name} className="card text-center">
                <h4 style={{ color: 'var(--color-accent)' }}>{role.name}</h4>
                <p className="mb-0">{role.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-xl">
            <Link href="/product/agent-roles" className="btn btn-secondary">See All 13 Roles</Link>
          </p>
        </div>
      </section>

      {/* Compliance */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">Built for Regulated Industries</h2>
          <div className="grid grid-3">
            <div className="card text-center">
              <h4>SOC 2</h4>
              <p className="mb-0">Controls aligned to Trust Services Criteria. Type I: Q2 2026.</p>
            </div>
            <div className="card text-center">
              <h4>NYDFS 500</h4>
              <p className="mb-0">Audit trails, access controls, and incident response aligned.</p>
            </div>
            <div className="card text-center">
              <h4>HIPAA</h4>
              <p className="mb-0">Technical safeguards for healthcare development environments.</p>
            </div>
          </div>
          <p className="text-center mt-xl">
            <Link href="/product/compliance" className="btn btn-secondary">View Compliance Details</Link>
          </p>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Complete Visibility</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '600px', margin: '0 auto var(--spacing-xl)' }}>Real-time dashboard with 22 views. See what every agent is doing, track work progress, and monitor system health.</p>

          <div className="card" style={{ backgroundColor: 'var(--color-background-dark)', textAlign: 'center', padding: 'var(--spacing-4xl)' }}>
            <p style={{ color: 'var(--color-text-inverse)', opacity: 0.7 }}>[Dashboard Screenshot Placeholder]</p>
          </div>

          <p className="text-center mt-xl">
            <Link href="/product/dashboard" className="btn btn-secondary">Explore the Dashboard</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>See AI-AMP in Action</h2>
          <p>Schedule a personalized demo. We&apos;ll show you how AI-AMP fits your team&apos;s workflow and compliance requirements.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/demo-request" className="btn btn-primary btn-large">Request Demo</Link>
            <Link href="/contact-sales" className="btn btn-secondary btn-large" style={{ borderColor: 'white', color: 'white' }}>Contact Sales</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
