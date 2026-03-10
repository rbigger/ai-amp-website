import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';

export default function AgentRoles() {
  const roles = {
    leadership: [
      { name: 'ARCHITECT', purpose: 'Strategic orchestration and system design', desc: 'Creates visions, decomposes work into tickets, delegates to implementation roles, performs independent verification before USER approval.' },
      { name: 'PRODUCT-MGR', purpose: 'Requirements and feature prioritization', desc: 'Gathers user requirements, writes user stories with acceptance criteria, prioritizes by business value. Defines WHAT to build.' },
      { name: 'PROJECT-MGR', purpose: 'Progress tracking and coordination', desc: 'Tracks work across tickets and agents, identifies blockers, coordinates cross-agent activities, reports status to stakeholders.' },
    ],
    implementation: [
      { name: 'CODER', purpose: 'TDD implementation and feature development', desc: 'TDD mandatory: (1) Write tests first, (2) Run tests - verify FAIL, (3) Implement minimum code to pass, (4) Run tests - verify PASS, (5) Refactor if needed, (6) Build must pass with 0 errors before handoff.' },
      { name: 'DB-ADMIN', purpose: 'Database schema and migrations', desc: 'Designs schemas, writes and tests migrations with rollbacks. BACKUP FIRST is mandatory. Maintains agent lifecycle functions.' },
      { name: 'UX-DESIGNER', purpose: 'User experience and accessibility', desc: 'Designs interfaces and flows, maintains style guides, ensures WCAG 2.1 AA accessibility compliance.' },
    ],
    quality: [
      { name: 'TESTER', purpose: 'Test execution and verification', desc: 'Executes automated and manual tests. Every result requires evidence. Defects documented with reproduction steps and severity (CRITICAL/HIGH/MEDIUM/LOW). Verification proof required for passes.' },
      { name: 'REVIEWER', purpose: 'Code review and quality gates', desc: 'Reviews code against requirements, verifies tests pass, checks for security issues. Never approves own work.' },
    ],
    operations: [
      { name: 'DEVOPS', purpose: 'Monitoring and infrastructure', desc: 'Monitors daemon health, manages Git artifacts, generates daily/weekly/monthly reports, tracks system health and anomalies.' },
    ],
    support: [
      { name: 'ANALYST', purpose: 'Data analysis and recommendations', desc: 'Analyzes patterns and gaps, formulates evidence-based recommendations. Every recommendation requires supporting evidence.' },
      { name: 'RESEARCHER', purpose: 'Information gathering only', desc: 'Collects data from sources, documents findings with citations. Gathers facts only - does not analyze or recommend.' },
      { name: 'LIBRARIAN', purpose: 'Knowledge and documentation', desc: 'Maintains Run Book, KB articles, role prompts, and HOWTOs. Enforces documentation standards (tables ≤65 chars, no emojis).' },
    ],
    security: [
      { name: 'CISO', purpose: 'Security operations and incidents', desc: 'Monitors security alerts, classifies vulnerabilities (SEV0-3), coordinates incident response. SEV0: active breach (immediate). SEV1: critical vulnerability (24h). SEV2: high risk with workaround (1 week). SEV3: low risk (2 weeks). SEV0/SEV1 require ARCHITECT approval.' },
      { name: 'COMPLIANCE', purpose: 'Audit readiness and evidence', desc: 'Collects and validates evidence artifacts, maps controls to regulatory requirements, maintains traceability matrices (Regulation → Requirement → Design → Code → Test → Evidence). Assesses audit readiness and identifies compliance gaps.' },
    ],
    special: [
      { name: 'RESCUER', purpose: 'Crashed agent recovery', desc: 'Rehabilitates agents that crashed without handoff. Reconstructs context from session files with confidence scoring (90+ HIGH, 70-89 MEDIUM, <70 LOW). Creates synthetic handoffs with source annotations for seamless recovery.' },
    ],
  };

  return (
    <Layout
      title="15 Agent Roles"
      description="AI-AMP orchestrates 15 specialized AI agents: ARCHITECT, CODER, TESTER, REVIEWER, and more. See how multi-agent collaboration works."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>15 Specialized Agents.<br />One Coordinated Team.</h1>
          <p>AI-AMP orchestrates specialized agents with defined decision scopes, clear escalation paths, and strict accountability. Each role knows what it can decide, what requires approval, and who to escalate to.</p>
        </div>
      </section>

      {/* Agent Roles Chart */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <Image
              src="/graphics/agent-roles-chart.png"
              alt="15 Specialized Agent Roles organized by category: Leadership, Implementation, Quality, Operations, Support, Security, and Special Purpose"
              width={1000}
              height={700}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        </div>
      </section>

      {/* Why Multiple Agents */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">The Problem with Single-Agent AI</h2>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p>Most AI coding tools use a single model for everything&mdash;planning, coding, testing, reviewing. That&apos;s like asking one person to be architect, developer, QA, and code reviewer simultaneously.</p>
              <h4 className="mt-lg mb-sm">The Result:</h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                <li>No decision boundaries or escalation paths</li>
                <li>Self-approval with no independent verification</li>
                <li>No recovery when context is lost</li>
                <li>No traceability from vision to implementation</li>
              </ul>
            </div>
            <div className="card" style={{ backgroundColor: 'var(--color-background-alt)' }}>
              <h4 className="mb-md">The AI-AMP Approach</h4>
              <p>Each role has a defined decision scope: what it can decide autonomously, and what requires escalation. ARCHITECT verifies CODER work independently. CODER writes tests first (TDD mandatory). CISO classifies vulnerabilities. COMPLIANCE validates evidence.</p>
              <p className="mb-0">When an agent crashes, RESCUER reconstructs context from session artifacts and creates synthetic handoffs for seamless recovery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Roles */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-2xl">All 15 Agent Roles</h2>

          {Object.entries({
            'Leadership Roles': roles.leadership,
            'Implementation Roles': roles.implementation,
            'Quality Roles': roles.quality,
            'Operations Roles': roles.operations,
            'Support Roles': roles.support,
            'Security & Compliance Roles': roles.security,
            'Special Purpose Roles': roles.special,
          }).map(([category, categoryRoles]) => (
            <div key={category}>
              <h3 className="mb-lg">{category}</h3>
              <div className="role-grid mb-2xl">
                {categoryRoles.map((role) => (
                  <div key={role.name} className="role-card">
                    <h4>{role.name}</h4>
                    <p><strong>Purpose:</strong> {role.purpose}</p>
                    <p className="text-light" style={{ fontSize: '0.875rem' }}>{role.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">AI-AMP vs Single-Agent Tools</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Single Agent</th>
                  <th>AI-AMP (15 Agents)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Specialization</td><td>One model does everything</td><td>15 specialists with defined scopes</td></tr>
                <tr><td>Decision Authority</td><td>No boundaries</td><td>Can decide vs must escalate</td></tr>
                <tr><td>Verification</td><td>Self-reviews</td><td>Independent verification required</td></tr>
                <tr><td>Code Quality</td><td>Best effort</td><td>TDD mandatory, 0 build errors</td></tr>
                <tr><td>Audit Trail</td><td>Limited</td><td>Vision to test traceability</td></tr>
                <tr><td>Recovery</td><td>Context lost on crash</td><td>RESCUER reconstructs context</td></tr>
                <tr><td>Security</td><td>Afterthought</td><td>CISO + COMPLIANCE built in</td></tr>
              </tbody>
            </table>
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
