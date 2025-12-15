import Link from 'next/link';
import Layout from '@/components/Layout';

export default function AgentRoles() {
  const roles = {
    leadership: [
      { name: 'ARCHITECT', purpose: 'Strategic design and orchestration', desc: 'Designs system architecture, creates specifications, orchestrates other agents.' },
      { name: 'PRODUCT-MGR', purpose: 'Product strategy and user advocacy', desc: 'Creates product vision, gathers requirements, prioritizes features.' },
      { name: 'PROJECT-MGR', purpose: 'Execution tracking and coordination', desc: 'Tracks project status, manages timelines, identifies blockers.' },
    ],
    implementation: [
      { name: 'CODER', purpose: 'Implementation and feature development', desc: 'Writes code to specification, implements features, fixes bugs.' },
      { name: 'DB-ADMIN', purpose: 'Database design and optimization', desc: 'Database schema design, migrations, query optimization, security.' },
      { name: 'UX-DESIGNER', purpose: 'User experience design', desc: 'UI/UX design, style guides, accessibility compliance.' },
    ],
    quality: [
      { name: 'TESTER', purpose: 'Quality assurance and validation', desc: 'Executes tests, identifies bugs, documents quality metrics.' },
      { name: 'REVIEWER', purpose: 'Code review and approval gates', desc: 'Reviews code, enforces standards, makes approval decisions.' },
      { name: 'SECURITY', purpose: 'Security review and compliance', desc: 'Security review, vulnerability assessment, compliance checking.' },
    ],
    operations: [
      { name: 'DEVOPS', purpose: 'Deployment and infrastructure', desc: 'Deployment execution, infrastructure management, CI/CD pipelines.' },
    ],
    support: [
      { name: 'ANALYST', purpose: 'Data analysis and recommendations', desc: 'Data analysis, feasibility assessment, solution recommendations.' },
      { name: 'RESEARCHER', purpose: 'Information gathering and synthesis', desc: 'Market research, technical research, competitive analysis.' },
      { name: 'LIBRARIAN', purpose: 'Knowledge management and curation', desc: 'Knowledge base maintenance, documentation curation, HOWTO creation.' },
    ],
  };

  return (
    <Layout
      title="13 Agent Roles"
      description="AI-AMP orchestrates 13 specialized AI agents: ARCHITECT, CODER, TESTER, REVIEWER, and more. See how multi-agent collaboration works."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>13 Specialized Agents.<br />One Coordinated Team.</h1>
          <p>AI-AMP doesn&apos;t use one AI for everything. We orchestrate specialized agents&mdash;each with defined roles, clear authorities, and accountability&mdash;working together like a well-run engineering organization.</p>
        </div>
      </section>

      {/* Why Multiple Agents */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">The Problem with Single-Agent AI</h2>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p>Most AI coding tools use a single model for everything&mdash;planning, coding, testing, reviewing. That&apos;s like asking one person to be architect, developer, QA, and code reviewer simultaneously.</p>
              <h4 className="mt-lg mb-sm">The Result:</h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                <li>No specialization means mediocre at everything</li>
                <li>No checks or balances</li>
                <li>No separation of concerns</li>
                <li>No accountability when things go wrong</li>
              </ul>
            </div>
            <div className="card" style={{ backgroundColor: 'var(--color-background-alt)' }}>
              <h4 className="mb-md">The AI-AMP Approach</h4>
              <p className="mb-0">We model AI development after how successful engineering teams actually work: specialized roles with clear responsibilities, structured handoffs, and independent verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Roles */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-2xl">All 13 Agent Roles</h2>

          {Object.entries({
            'Leadership Roles': roles.leadership,
            'Implementation Roles': roles.implementation,
            'Quality Roles': roles.quality,
            'Operations Roles': roles.operations,
            'Support Roles': roles.support,
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
                  <th>AI-AMP (13 Agents)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Specialization</td><td>One model does everything</td><td>Each agent is a specialist</td></tr>
                <tr><td>Accountability</td><td>No separation of duties</td><td>Clear role boundaries</td></tr>
                <tr><td>Verification</td><td>Self-reviews</td><td>Independent verification</td></tr>
                <tr><td>Audit Trail</td><td>Limited</td><td>Every action logged</td></tr>
                <tr><td>Failure Mode</td><td>Single point of failure</td><td>Redundancy and checks</td></tr>
                <tr><td>Scalability</td><td>One context</td><td>Parallel agent work</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>See Multi-Agent Orchestration in Action</h2>
          <p>Watch how 13 specialized agents collaborate on real development work. Schedule a demo to see AI-AMP&apos;s orchestration engine.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/demo-request" className="btn btn-primary btn-large">Request Demo</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
