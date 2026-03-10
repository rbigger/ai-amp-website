import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Dashboard() {
  return (
    <Layout
      title="Dashboard"
      description="AI-AMP dashboard provides 22 views for complete visibility into AI agent operations. Real-time status, work tracking, and compliance monitoring."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>Complete Visibility Into AI Operations</h1>
          <p>See everything your AI agents are doing. Track work, monitor status, manage approvals, and explore traceability&mdash;all from a single, real-time dashboard.</p>
        </div>
      </section>

      {/* Screenshot */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <img
              src="/images/dashboard-screenshot.png"
              alt="AI-AMP Dashboard showing agent monitoring and messaging"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <div className="grid grid-3 mt-xl">
            <div className="card">
              <h4>Status Bar</h4>
              <p className="mb-0">Top row monitors context health (cMon), PTY terminal connection, database connection (DB), and network status (Net) - all at a glance.</p>
            </div>
            <div className="card">
              <h4>Agent Panel</h4>
              <p className="mb-0">Shows inbox message count, agent name, working/idle status, assigned project, and a color-coded context usage thermometer showing percentage consumed.</p>
            </div>
            <div className="card">
              <h4>Message Inbox</h4>
              <p className="mb-0">Right panel displays messages sent to you from various agents - status updates, decisions needed, test results, and feature completions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">22 Views. Complete Control.</h2>
          <div className="grid grid-3">
            <div className="text-center">
              <h3 style={{ color: 'var(--color-accent)', fontSize: '3rem' }}>22</h3>
              <p className="text-light">Dashboard Views</p>
            </div>
            <div className="text-center">
              <h3 style={{ color: 'var(--color-accent)', fontSize: '3rem' }}>&lt;1s</h3>
              <p className="text-light">Real-time Updates</p>
            </div>
            <div className="text-center">
              <h3 style={{ color: 'var(--color-accent)', fontSize: '3rem' }}>100%</h3>
              <p className="text-light">Agent Visibility</p>
            </div>
          </div>
        </div>
      </section>

      {/* View Categories */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-2xl">Dashboard Sections</h2>
          <div className="grid grid-2">
            {[
              { title: 'Dashboards', items: ['Overview Dashboard - System-wide metrics, trend charts', 'Visions Dashboard - Strategic initiative tracking'] },
              { title: 'Strategy Views', items: ['All Visions', 'Vision Timeline', 'Projects', 'Traceability Explorer'] },
              { title: 'Execution Views', items: ['All Tickets', 'Kanban Board', 'Use Cases'] },
              { title: 'Actor Views', items: ['Agent Activity', 'Agent History', 'Context Health', 'Recoverable Agents', 'Agent Mailbox'] },
              { title: 'Testing Views', items: ['Test Status Dashboard', 'Test Results', 'Bug Tracker'] },
              { title: 'Admin Views', items: ['System Health', 'Database Sync', 'Tech Debt', 'Handoff Inventory'] },
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
