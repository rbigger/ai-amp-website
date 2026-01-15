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
            <Link href="/survey" className="btn btn-primary btn-large">Talk With Us</Link>
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
                <li><strong>Multi-Agent Orchestration</strong><br />15 specialized agents working as a team</li>
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
              { title: 'Governance & Control', items: ['Decision Scopes - Each role knows what it can decide vs escalate', 'Independent Verification - ARCHITECT verifies CODER work before approval', 'Escalation Paths - Clear routing to ARCHITECT, USER, or CISO', 'No Self-Approval - Agents cannot approve their own work'] },
              { title: 'Security & Compliance', items: ['CISO Agent - Vulnerability classification, incident response', 'COMPLIANCE Agent - Evidence collection, traceability matrices', 'SEV Classification - SEV0-3 with defined SLAs and authority', 'Audit-Ready - Regulation → Requirement → Code → Test → Evidence'] },
              { title: 'Quality Engineering', items: ['TDD Mandatory - CODER writes tests FIRST, 0 errors before handoff', 'TESTER Agent - Executes tests, documents with evidence', 'REVIEWER Agent - Never rubber-stamps, checks security', 'DEVOPS Agent - Monitors daemon health, generates reports'] },
              { title: 'Resilience & Recovery', items: ['RESCUER Agent - Reconstructs crashed agent context', 'Synthetic Handoffs - Recovery from session artifacts', 'Confidence Scoring - Validates rescue quality', 'Crash Recovery - No context lost, seamless continuation'] },
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
