import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';

export default function ProductOverview() {
  return (
    <Layout
      title="Product Overview"
      description="AI-AMP orchestrates 13 specialized AI agents with full accountability, audit trails, and compliance controls. See the complete platform overview."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>The AI Development Platform for Enterprise Teams</h1>
          <p>AI-AMP orchestrates specialized AI agents working as a coordinated team&mdash;with the governance, visibility, and compliance controls enterprise teams require.</p>
          <div className="btn-group" style={{ marginTop: 'var(--spacing-xl)' }}>
            <Link href="/demo-request" className="btn btn-primary btn-large">Request Demo</Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="section">
        <div className="container">
          <div className="feature-grid">
            {[
              { icon: '13', title: 'Multi-Agent Orchestration', desc: 'Not one AI doing everything, but 13 specialized agents collaborating. Architects design, coders implement, testers validate, reviewers approve.' },
              { icon: '\u2713', title: 'Complete Accountability', desc: 'Every agent action logged. Every decision traceable. Immutable audit trails meet the strictest compliance requirements.' },
              { icon: '\u2022', title: 'Enterprise Governance', desc: 'Approval workflows, environment separation, and kill switches ensure humans stay in control.' },
              { icon: '4', title: 'Continuous Memory', desc: 'Four-tier memory model means agents never lose context. Work survives sessions, handoffs, and team changes. Parking lot notes capture ideas without losing focus.' },
              { icon: '22', title: 'Real-Time Visibility', desc: 'Dashboard with 22 views shows everything your AI team is doing. Agent status, work progress, system health.' },
              { icon: '\u2192', title: 'Compliance-Ready', desc: 'Built for regulated industries. SOC 2 alignment, NYDFS 500 considerations, and audit controls designed in from day one.' },
            ].map((feature, i) => (
              <div key={i} className="feature">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Agent Lifecycle Architecture</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="card" style={{ backgroundColor: 'var(--color-background-dark)', padding: 'var(--spacing-2xl)' }}>
              <p style={{ color: 'var(--color-text-inverse)', opacity: 0.7 }}>[Agent Lifecycle Diagram]</p>
            </div>
            <p className="text-light mt-md">Agents follow a defined lifecycle: spawn, work, handoff, and recover&mdash;all with full audit trails.</p>
          </div>

          <div className="grid grid-2 mt-2xl">
            <div>
              <h3>Agent Layer</h3>
              <p>13 specialized agents, each with defined roles, responsibilities, and boundaries. Agents collaborate through structured handoffs.</p>
            </div>
            <div>
              <h3>Orchestration Layer</h3>
              <p>Coordinates agent work, manages state transitions, enforces workflow rules. The conductor of your AI team.</p>
            </div>
            <div>
              <h3>Foundation Layer</h3>
              <p>Memory management, audit logging, approval workflows, and security controls. The infrastructure that makes enterprise AI possible.</p>
            </div>
            <div>
              <h3>Interface Layer</h3>
              <p>Dashboard for visibility, API for integration, CLI for developers. Multiple ways to interact with your AI team.</p>
            </div>
          </div>
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
