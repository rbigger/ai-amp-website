import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Memory() {
  const tiers = [
    { name: 'HOT', color: '#dc2626', title: 'Agent DNA', what: 'Universal agent identity, protocols, and behavioral rules that every agent carries.', contains: 'Agent identity, role protocols, communication standards, safety guardrails.', persistence: 'Survives everything—compacts, restarts, handoffs, recovery.', analogy: 'Like a company\'s core values every employee knows.' },
    { name: 'WARM', color: '#d97706', title: 'Role Context', what: 'Role-specific knowledge loaded when an agent checks in.', contains: 'Role responsibilities, workflow procedures, authority boundaries, handoff targets.', persistence: 'Loaded at check-in, active throughout session.', analogy: 'Like job training an employee receives for their role.' },
    { name: 'COOL', color: '#0d9488', title: 'Session History', what: 'Persistent snapshots of completed sessions. Handoff documents capturing work and next steps.', contains: 'Work completed, next actions, critical files, key decisions, blockers.', persistence: 'Stored in database, survives indefinitely.', analogy: 'Like detailed shift handoff notes between employees.' },
    { name: 'COLD', color: '#1a365d', title: 'Knowledge Base', what: 'Shared organizational memory. Procedures, templates, and accumulated wisdom.', contains: 'HOWTOs, templates, glossary, architectural decisions.', persistence: 'Permanent organizational asset.', analogy: 'Like a company wiki everyone can reference.' },
  ];

  return (
    <Layout
      title="Four-Tier Memory Model"
      description="AI-AMP's four-tier memory model ensures AI agents never lose context. HOT, WARM, COOL, and COLD tiers provide continuous memory across sessions."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>AI Agents That Never Forget</h1>
          <p>AI-AMP&apos;s four-tier memory model ensures your agents maintain context across sessions, handoffs, and team changes. No more starting from scratch.</p>
        </div>
      </section>

      {/* The Problem */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">The Context Problem in AI Development</h2>
          <p className="text-center text-light mb-2xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>Consumer AI tools forget everything when a session ends. Every new conversation starts from zero.</p>
          <div className="grid grid-4">
            {['Repeated Explanations', 'Lost Decisions', 'Broken Continuity', 'Handoff Failures'].map((problem, i) => (
              <div key={i} className="card text-center">
                <h4>{problem}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Four Tiers */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-2xl">The Four-Tier Memory Model</h2>
          <div className="grid grid-2">
            {tiers.map((tier) => (
              <div key={tier.name} className="card" style={{ borderLeft: `4px solid ${tier.color}` }}>
                <h3 style={{ color: tier.color }}>{tier.name} Tier: {tier.title}</h3>
                <p><strong>What It Is:</strong> {tier.what}</p>
                <p><strong>Contains:</strong> {tier.contains}</p>
                <p><strong>Persistence:</strong> {tier.persistence}</p>
                <p className="text-light mb-0"><em>{tier.analogy}</em></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In Practice */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-2xl">Memory in Practice</h2>
          <div className="grid grid-2">
            <div className="card">
              <h4 style={{ color: 'var(--color-error)' }}>Without AI-AMP</h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                <li>Session 1: Explain requirements, AI designs approach</li>
                <li>Session 2: Re-explain requirements, AI designs <em>different</em> approach</li>
                <li>Session 3: Re-explain again, AI forgets earlier decisions</li>
              </ul>
              <p className="mb-0"><strong>Result:</strong> Inconsistent implementation, wasted time</p>
            </div>
            <div className="card">
              <h4 style={{ color: 'var(--color-success)' }}>With AI-AMP</h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                <li>Session 1: ARCHITECT designs, hands off to CODER</li>
                <li>Session 2: CODER implements Phase 1, handoff created</li>
                <li>Session 3: CODER recovers, continues Phase 2</li>
                <li>Session 4: TESTER receives complete context, validates</li>
              </ul>
              <p className="mb-0"><strong>Result:</strong> Consistent implementation, continuous progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parking Lot Notes */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Capture Ideas Without Losing Focus</h2>
          <p className="text-center text-light mb-2xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>When agents discover something important mid-task, they don&apos;t have to choose between pursuing it and losing context, or ignoring it and losing the insight.</p>
          <div className="grid grid-3">
            <div className="card">
              <h4>Parking Lot Notes</h4>
              <p>Agents capture ideas, questions, and observations in a structured notes system. Strategic thoughts are preserved for later review without derailing current work.</p>
            </div>
            <div className="card">
              <h4>Categorized &amp; Searchable</h4>
              <p>Notes are tagged by type&mdash;IDEA, QUESTION, STRATEGIC, TECHNICAL, PROCESS&mdash;and searchable by tag, project, or agent. Nothing gets lost.</p>
            </div>
            <div className="card">
              <h4>Tracked to Resolution</h4>
              <p>Notes follow a lifecycle: NEW to REVIEWED to ACTIONED, PARKED, or DISMISSED. Assign notes to agents. Full accountability for every captured idea.</p>
            </div>
          </div>
          <div className="card mt-xl" style={{ maxWidth: '700px', margin: 'var(--spacing-xl) auto 0' }}>
            <h4>Example: Strategic Insight During Implementation</h4>
            <p className="mb-0">A CODER working on API endpoints notices the architecture could support event sourcing. Instead of stopping to explore or forgetting the insight, they create a STRATEGIC note: &ldquo;Consider event sourcing for state machine.&rdquo; The note persists, gets reviewed by ARCHITECT later, and becomes a future enhancement&mdash;all without interrupting the current sprint.</p>
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
