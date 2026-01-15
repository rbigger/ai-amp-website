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
            <Link href="/survey" className="btn btn-primary btn-large">Talk With Us</Link>
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

      {/* Agent Lifecycle - 12 State Machine */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Agent Lifecycle State Machine</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            12 states with explicit failure detection, cold storage, and recovery paths. Every transition is audited.
          </p>

          {/* Normal Lifecycle States */}
          <h3 className="mb-md">Normal Lifecycle</h3>
          <div className="grid grid-3 mb-xl">
            <div className="card">
              <h4 style={{ color: '#6b7280' }}>SPAWNED</h4>
              <p className="text-light mb-0">Record created, JWT issued. Must complete checkin with kernel-verified PID:starttime binding.</p>
            </div>
            <div className="card">
              <h4 style={{ color: '#16a34a' }}>CHECKED_IN</h4>
              <p className="text-light mb-0">Process bound, identity verified. Ready for work. Role loaded, context initialized.</p>
            </div>
            <div className="card">
              <h4 style={{ color: '#2563eb' }}>WORKING</h4>
              <p className="text-light mb-0">Actively executing task. Progress tracked, outputs logged. All actions audited.</p>
            </div>
            <div className="card">
              <h4 style={{ color: '#7c3aed' }}>COMPACTING</h4>
              <p className="text-light mb-0">Writing handoff document, preserving context to database before session end.</p>
            </div>
            <div className="card">
              <h4 style={{ color: '#8b5cf6' }}>COMPACTED</h4>
              <p className="text-light mb-0">Context preserved. Ready to release binding and go OFFLINE or enter HIBERNATING.</p>
            </div>
            <div className="card">
              <h4 style={{ color: '#64748b' }}>OFFLINE</h4>
              <p className="text-light mb-0">No process bound. Record exists. Ready for recovery with new JWT and process binding.</p>
            </div>
          </div>

          {/* Cold Storage */}
          <h3 className="mb-md">Cold Storage</h3>
          <div className="grid grid-3 mb-xl">
            <div className="card" style={{ gridColumn: 'span 3' }}>
              <h4 style={{ color: '#0ea5e9' }}>HIBERNATING</h4>
              <p className="text-light mb-0">Long-term cold storage for agents needed periodically (weekly/monthly). Full context preserved. Not subject to failure detection. Revive with new JWT when needed.</p>
            </div>
          </div>

          {/* Failure States */}
          <h3 className="mb-md">Failure Detection</h3>
          <div className="grid grid-3 mb-xl">
            <div className="card">
              <h4 style={{ color: '#f59e0b' }}>ABANDONED</h4>
              <p className="text-light mb-0">Spawn initiated but checkin never completed. Detected by Reaper after timeout threshold.</p>
            </div>
            <div className="card">
              <h4 style={{ color: '#f97316' }}>UNRESPONSIVE</h4>
              <p className="text-light mb-0">Was active but heartbeat stopped. Process may be hung. RESCUE agent can intervene.</p>
            </div>
            <div className="card">
              <h4 style={{ color: '#dc2626' }}>CRASHED</h4>
              <p className="text-light mb-0">Process confirmed gone. Binding invalidated. Ready for cleanup and re-spawn decision.</p>
            </div>
          </div>

          {/* Terminal State */}
          <h3 className="mb-md">Terminal</h3>
          <div className="grid grid-3">
            <div className="card">
              <h4 style={{ color: '#1f2937' }}>DECOMMISSIONED</h4>
              <p className="text-light mb-0">Permanently removed. No recovery possible. Audit trail retained for compliance.</p>
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

      {/* Security Architecture */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Defense-in-Depth Security</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            Four layers of authorization. Kernel-verified identity. Row-level isolation. Every decision audited.
          </p>

          {/* Trust Boundary */}
          <div className="grid grid-2 mb-xl">
            <div className="card">
              <h4>Infrastructure Layer</h4>
              <p className="text-light mb-0">Orchestrator, Reaper, and MCP Server have direct database access with dedicated credentials. Each component isolated with own PostgreSQL role.</p>
            </div>
            <div className="card">
              <h4>Agent Layer</h4>
              <p className="text-light mb-0">Agents access database only through MCP with kernel-verified identity. PID:starttime binding is unforgeable. No direct DB credentials.</p>
            </div>
          </div>

          {/* Security Features */}
          <div className="grid grid-4">
            <div className="card text-center">
              <h4>Row-Level Security</h4>
              <p className="text-light mb-0">Agents can only see their own data. PostgreSQL RLS enforced at query level.</p>
            </div>
            <div className="card text-center">
              <h4>Identity Binding</h4>
              <p className="text-light mb-0">PID:starttime verified by kernel via SO_PEERCRED. Cannot be spoofed by agents.</p>
            </div>
            <div className="card text-center">
              <h4>JWT Versioning</h4>
              <p className="text-light mb-0">Each JWT has version counter. Replay attacks blocked. Old tokens rejected.</p>
            </div>
            <div className="card text-center">
              <h4>Session Isolation</h4>
              <p className="text-light mb-0">SET LOCAL auto-resets on commit. No cross-transaction leakage in connection pools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Components */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">Infrastructure Components</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            Three infrastructure services manage agent lifecycle. Agents cannot impersonate infrastructure.
          </p>

          <div className="grid grid-3">
            <div className="card">
              <h4>Orchestrator</h4>
              <p className="text-light">Creates agents, generates JWTs, spawns processes. Detects crashed processes via reconciliation. Makes decommission decisions.</p>
              <p className="text-light mb-0" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Role: orchestrator_app</p>
            </div>
            <div className="card">
              <h4>Reaper</h4>
              <p className="text-light">Detects orphaned agents (SPAWNED too long). Monitors heartbeats. Marks agents ABANDONED or UNRESPONSIVE.</p>
              <p className="text-light mb-0" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Role: reaper_app</p>
            </div>
            <div className="card">
              <h4>MCP Server</h4>
              <p className="text-light">Verifies agent identity via PID:starttime. Binds sessions. Enforces authorization on every call. Sets agent context for RLS.</p>
              <p className="text-light mb-0" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Role: mcp_server_app</p>
            </div>
          </div>

          <div className="grid grid-2 mt-lg">
            <div className="card">
              <h4>RESCUE Agent</h4>
              <p className="text-light mb-0">Privileged agent role that can force_checkout UNRESPONSIVE agents. Only cross-agent operation allowed. Authorization checked in function, not role.</p>
            </div>
            <div className="card">
              <h4>Standard Agents</h4>
              <p className="text-light mb-0">CODER, ARCHITECT, ANALYST, etc. Can only modify their own state. Self-modification rule: caller_guid must equal target_guid.</p>
            </div>
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
