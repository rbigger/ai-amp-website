import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Enterprise() {
  return (
    <Layout
      title="Enterprise"
      description="AI-AMP provides enterprise governance, visibility, and control for AI-assisted development. Multi-agent orchestration with full accountability."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>Enterprise AI Development<br />with Accountability</h1>
          <p>AI-AMP brings governance, visibility, and control to AI-assisted development. Scale AI across your engineering organization without sacrificing oversight.</p>
          <div className="btn-group" style={{ marginTop: 'var(--spacing-xl)' }}>
            <Link href="/demo-request" className="btn btn-primary btn-large">Request Demo</Link>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">The Enterprise Challenge</h2>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h3 className="mb-md">The Opportunity</h3>
              <p>AI coding assistants promise massive productivity gains. Your developers want them. Your competitors are using them.</p>
              <h3 className="mb-md mt-lg">The Risk</h3>
              <p>Without proper governance, AI tools can make unauthorized changes, bypass processes, create compliance gaps, and lack accountability when things go wrong.</p>
              <h3 className="mb-md mt-lg">The Question</h3>
              <p className="mb-0">How do you capture the productivity benefits while maintaining the controls your enterprise requires?</p>
            </div>
            <div className="card" style={{ backgroundColor: 'var(--color-background-alt)' }}>
              <h4>The AI-AMP Approach</h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                <li><strong>Multi-Agent Orchestration</strong><br />13 specialized agents working as a team</li>
                <li><strong>Built-In Governance</strong><br />Approval workflows and audit trails by design</li>
                <li><strong>Complete Visibility</strong><br />Real-time dashboard with 22 views</li>
                <li><strong>Enterprise Integration</strong><br />Connects to your existing tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-2xl">Enterprise Capabilities</h2>
          <div className="grid grid-2">
            {[
              { title: 'Governance & Control', items: ['Role-Based Access - 13 agent roles with defined boundaries', 'Approval Workflows - Multi-party gates for sensitive operations', 'Environment Separation - Dev/staging/prod isolation', 'Kill Switches - Immediate agent termination'] },
              { title: 'Visibility & Monitoring', items: ['Real-Time Dashboard - 22 views for complete visibility', 'Agent Status - Active, working, blocked, idle', 'Work Tracking - Tickets, kanban, progress', 'System Health - Performance metrics and alerts'] },
              { title: 'Traceability & Compliance', items: ['Audit Trails - Every action logged, immutable', 'Traceability Chain - Vision → Ticket → Test', 'Decision Records - What and why captured'] },
              { title: 'Continuity & Reliability', items: ['Four-Tier Memory - Context survives sessions', 'Handoff System - Structured context transfer', 'Recovery - Restore from any handoff'] },
            ].map((section, i) => (
              <div key={i} className="card">
                <h3>{section.title}</h3>
                <ul style={{ listStyle: 'none' }}>
                  {section.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>See AI-AMP for Enterprise</h2>
          <p>Schedule a demo to see how AI-AMP brings governance and visibility to AI development at enterprise scale.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/demo-request" className="btn btn-primary btn-large">Request Demo</Link>
            <Link href="/contact-sales" className="btn btn-secondary btn-large" style={{ borderColor: 'white', color: 'white' }}>Contact Sales</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
