import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';

export default function ProductOverview() {
  return (
    <Layout
      title="Product Overview"
      description="AI-AMP orchestrates 15 specialized AI agents with full accountability, audit trails, and compliance controls. See the complete platform overview."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>The AI Development Platform for Enterprise Teams</h1>
          <p>AI-AMP orchestrates specialized AI agents working as a coordinated team&mdash;with the governance, visibility, and compliance controls enterprise teams require.</p>
          <div className="btn-group" style={{ marginTop: 'var(--spacing-xl)' }}>
            <Link href="/survey" className="btn btn-primary btn-large">Share Your Feedback</Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="section">
        <div className="container">
          <div className="feature-grid">
            {[
              { icon: '15', title: 'Multi-Agent Orchestration', desc: 'Each agent has defined decision scopes: what it can decide autonomously vs what requires escalation. ARCHITECT verifies CODER work independently.' },
              { icon: 'TDD', title: 'Test-Driven Development', desc: 'CODER writes tests FIRST. Build must pass with 0 errors before handoff. No exceptions. Quality is built in, not bolted on.' },
              { icon: '\u2713', title: 'Independent Verification', desc: 'No agent can approve its own work. ARCHITECT performs independent verification before presenting to USER. Separation of duties enforced.' },
              { icon: '\u25C9', title: 'Real-Time Liveness', desc: 'Every agent tracked by process ID. Platform verifies agents are actually running, not just claiming to be. Ghost agents detected and cleaned automatically.' },
              { icon: '\u267B', title: 'Crash Recovery', desc: 'When agents crash without handoff, RESCUER reconstructs context from session artifacts. Dead processes detected automatically, recovery initiated immediately.' },
              { icon: '\u2713', title: 'Security & Compliance', desc: 'CISO monitors alerts and classifies vulnerabilities. COMPLIANCE collects evidence, maps controls, maintains traceability matrices.' },
              { icon: 'KB', title: 'Knowledge Management', desc: 'Unified information lifecycle with 8-state document workflow. Any agent finds any document in under 30 seconds. Full version history and audit trails.' },
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

      {/* Agent Lifecycle */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Agent Lifecycle</h2>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <Image
              src="/graphics/agent-lifecycle.png"
              alt="Agent Lifecycle State Machine showing states: SPAWNED, IDLE, WORKING, BLOCKED, and MEMORY MANAGEMENT"
              width={800}
              height={450}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <p className="text-light mt-md">Every agent follows a defined lifecycle with full audit trails at each transition.</p>
          </div>

          <div className="grid grid-3 mt-2xl">
            <div className="card">
              <h4 style={{ color: '#6b7280' }}>SPAWNED</h4>
              <p className="text-light mb-0">Agent created but not yet registered. Must complete /checkin before any work. Identity assigned, awaiting role.</p>
            </div>
            <div className="card">
              <h4 style={{ color: '#16a34a' }}>IDLE</h4>
              <p className="text-light mb-0">Fully registered and ready for work. Role loaded, context initialized. Waiting for task assignment.</p>
            </div>
            <div className="card">
              <h4 style={{ color: '#2563eb' }}>WORKING</h4>
              <p className="text-light mb-0">Actively executing a task. Progress tracked, outputs logged. Can transition to BLOCKED if stuck.</p>
            </div>
            <div className="card">
              <h4 style={{ color: '#dc2626' }}>BLOCKED</h4>
              <p className="text-light mb-0">Waiting on external dependency or approval. Escalation triggered. Returns to WORKING when unblocked.</p>
            </div>
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <h4 style={{ color: '#7c3aed' }}>MEMORY MANAGEMENT</h4>
              <p className="text-light mb-0">Saving or restoring agent context. Handles /handoff (save state before shutdown) and /recover (restore state on restart). Ensures continuity across sessions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Memory Model */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">Four-Tier Memory Architecture</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            Agents maintain continuity across sessions, crashes, and restarts through a structured memory system.
          </p>
          <div style={{ maxWidth: '900px', margin: '0 auto var(--spacing-xl)', textAlign: 'center' }}>
            <Image
              src="/graphics/memory-architecture.png"
              alt="Four-Tier Memory Architecture: HOT (DNA), WARM-A (Role Injection), WARM-B (Session Work), COOL (Handoffs), COLD (Knowledge Base)"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        </div>
      </section>

      {/* Information Lifecycle */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Information Lifecycle Management</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            Every document follows a governed lifecycle from creation to archival. Full audit trails, approval workflows, and instant discovery.
          </p>
          <div className="grid grid-4">
            <div className="card text-center">
              <h4 style={{ color: '#6b7280' }}>DRAFT</h4>
              <p className="text-light mb-0">Being created or revised. Not discoverable until published.</p>
            </div>
            <div className="card text-center">
              <h4 style={{ color: '#f59e0b' }}>REVIEW</h4>
              <p className="text-light mb-0">Submitted for technical and product review. Sequential approvals.</p>
            </div>
            <div className="card text-center">
              <h4 style={{ color: '#16a34a' }}>PUBLISHED</h4>
              <p className="text-light mb-0">Active and authoritative. Discoverable by all authorized agents.</p>
            </div>
            <div className="card text-center">
              <h4 style={{ color: '#64748b' }}>ARCHIVED</h4>
              <p className="text-light mb-0">Retained for compliance. 7-year retention per NYDFS 500.06.</p>
            </div>
          </div>
          <div className="grid grid-3 mt-lg">
            <div className="card">
              <h4>30-Second Discovery</h4>
              <p className="text-light mb-0">Full-text search across 1,300+ documents. Role-based filtering ensures agents find what they need.</p>
            </div>
            <div className="card">
              <h4>Version Control</h4>
              <p className="text-light mb-0">Every version is immutable. Supersession chains show complete document lineage.</p>
            </div>
            <div className="card">
              <h4>Compliance Ready</h4>
              <p className="text-light mb-0">SOC 2 CC2.2, CC4.1, CC6.1 aligned. Audit trails for every state transition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Escalation Paths */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">Clear Escalation Paths</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            Every agent knows what it can decide autonomously and when to escalate. No ambiguity.
          </p>
          <div className="grid grid-3">
            <div className="card">
              <h4>Implementation → ARCHITECT</h4>
              <p className="text-light">CODER escalates architectural changes. ANALYST escalates recommendations. DB-ADMIN escalates schema decisions.</p>
            </div>
            <div className="card">
              <h4>Security → ARCHITECT</h4>
              <p className="text-light">CISO escalates SEV0/SEV1 incidents. COMPLIANCE escalates control design questions.</p>
            </div>
            <div className="card">
              <h4>Policy → USER</h4>
              <p className="text-light">All roles can escalate policy decisions to USER. Visions require USER approval to activate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Architecture */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">Platform Architecture</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            Four layers working together to deliver enterprise-grade AI development.
          </p>
          <div style={{ maxWidth: '950px', margin: '0 auto', textAlign: 'center' }}>
            <Image
              src="/graphics/platform-architecture.png"
              alt="Platform Architecture showing four layers: Interface, Agent, Orchestration, and Foundation"
              width={900}
              height={500}
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
            <Link href="/survey" className="btn btn-primary btn-large">Share Your Feedback</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
