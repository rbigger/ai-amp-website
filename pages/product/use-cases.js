import Link from 'next/link';
import Layout from '@/components/Layout';

export default function UseCases() {
  const categories = [
    {
      name: 'Agent Lifecycle',
      count: 16,
      status: 'EXISTING',
      description: 'Complete agent lifecycle from spawn to decommission, including rescue workflows for crashed agents.',
      useCases: [
        { id: 'UC-AL-001', title: 'Agent Spawn', status: 'EXISTING' },
        { id: 'UC-AL-002', title: 'Agent Checkin', status: 'EXISTING' },
        { id: 'UC-AL-003', title: 'Agent State Transition', status: 'EXISTING' },
        { id: 'UC-AL-004', title: 'Agent Handoff', status: 'EXISTING' },
        { id: 'UC-AL-005', title: 'Agent Recovery', status: 'EXISTING' },
        { id: 'UC-AL-006', title: 'Agent Checkout', status: 'EXISTING' },
        { id: 'UC-AL-007', title: 'Agent Decommission', status: 'EXISTING' },
        { id: 'UC-AL-008a', title: 'Initiate Rescue Operation', status: 'EXISTING' },
        { id: 'UC-AL-008b', title: 'Force Agent Offline', status: 'EXISTING' },
        { id: 'UC-AL-008c', title: 'Create Synthetic Handoff', status: 'EXISTING' },
        { id: 'UC-AL-008d', title: 'Complete Rescue Operation', status: 'EXISTING' },
        { id: 'UC-AL-009', title: 'Rename Agent', status: 'EXISTING' },
        { id: 'UC-AL-010', title: 'View Valid State Transitions', status: 'EXISTING' },
        { id: 'UC-AL-011', title: 'IDE-Triggered State Transition', status: 'EXISTING' },
        { id: 'UC-AL-012', title: 'Update Handoff Status', status: 'EXISTING' },
        { id: 'UC-AL-013', title: 'Cleanup Orphan Agents', status: 'EXISTING' },
      ]
    },
    {
      name: 'IDE Monitoring',
      count: 10,
      status: 'EXISTING',
      description: 'Real-time visibility into agent activity, health, and context usage through the desktop IDE.',
      useCases: [
        { id: 'UC-IM-001', title: 'View Agent List', status: 'EXISTING' },
        { id: 'UC-IM-002', title: 'Poll Agent Updates', status: 'EXISTING' },
        { id: 'UC-IM-003', title: 'Filter Agents by Health', status: 'EXISTING' },
        { id: 'UC-IM-004', title: 'Sort Agents', status: 'EXISTING' },
        { id: 'UC-IM-005', title: 'View Agent Details', status: 'EXISTING' },
        { id: 'UC-IM-006', title: 'View Lifecycle History', status: 'EXISTING' },
        { id: 'UC-IM-007', title: 'View Agent Messages', status: 'EXISTING' },
        { id: 'UC-IM-008', title: 'View Handoff Status', status: 'EXISTING' },
        { id: 'UC-IM-009', title: 'List Handoffs', status: 'EXISTING' },
        { id: 'UC-IM-010', title: 'List Senior Agents', status: 'EXISTING' },
      ]
    },
    {
      name: 'Terminal Control',
      count: 5,
      status: 'EXISTING',
      description: 'Direct control over agent terminals including focus, read, send commands, and automated workflows.',
      useCases: [
        { id: 'UC-TC-001', title: 'Focus Agent Terminal', status: 'EXISTING' },
        { id: 'UC-TC-002', title: 'Peek Terminal Content', status: 'EXISTING' },
        { id: 'UC-TC-003', title: 'Send to Terminal', status: 'EXISTING' },
        { id: 'UC-TC-004', title: 'Run Handoff Cycle', status: 'EXISTING' },
        { id: 'UC-TC-005', title: 'Create Terminal Window/Tab', status: 'EXISTING' },
      ]
    },
    {
      name: 'Messaging',
      count: 8,
      status: 'EXISTING',
      description: 'Inter-agent communication with threading, read receipts, and user inbox integration.',
      useCases: [
        { id: 'UC-MSG-001', title: 'Agent Sends Message', status: 'EXISTING' },
        { id: 'UC-MSG-002', title: 'Agent Checks Inbox', status: 'EXISTING' },
        { id: 'UC-MSG-003', title: 'Agent Reads Message', status: 'EXISTING' },
        { id: 'UC-MSG-004', title: 'User Views Mailbox', status: 'EXISTING' },
        { id: 'UC-MSG-005', title: 'User Marks Message Read', status: 'EXISTING' },
        { id: 'UC-MSG-006', title: 'Fetch Thread Messages', status: 'EXISTING' },
        { id: 'UC-MSG-007', title: 'Create Thread Message', status: 'EXISTING' },
        { id: 'UC-MSG-008', title: 'Delete Agent Message', status: 'EXISTING' },
      ]
    },
    {
      name: 'Context Monitoring',
      count: 6,
      status: 'EXISTING',
      description: 'Track token usage across agents with real-time gauges and proactive alerts before context limits.',
      useCases: [
        { id: 'UC-CM-001', title: 'Daemon Captures Context', status: 'EXISTING' },
        { id: 'UC-CM-002', title: 'IDE Displays Context Gauge', status: 'EXISTING' },
        { id: 'UC-CM-003', title: 'Context Alert', status: 'EXISTING' },
        { id: 'UC-CM-004', title: 'Manual Context Refresh', status: 'NEW' },
        { id: 'UC-CM-005', title: 'Session File Not Found', status: 'NEW' },
        { id: 'UC-CM-006', title: 'Daemon Restart Recovery', status: 'NEW' },
      ]
    },
    {
      name: 'Health Monitoring',
      count: 5,
      status: 'EXISTING',
      description: 'System-wide health checks for database, network, terminal, and context monitoring services.',
      useCases: [
        { id: 'UC-HM-001', title: 'Database Health Check', status: 'EXISTING' },
        { id: 'UC-HM-002', title: 'Network Health Check', status: 'EXISTING' },
        { id: 'UC-HM-003', title: 'PTY Health Check', status: 'EXISTING' },
        { id: 'UC-HM-004', title: 'Context Monitor Health', status: 'EXISTING' },
        { id: 'UC-HM-005', title: 'Context API Check', status: 'EXISTING' },
      ]
    },
    {
      name: 'File Operations',
      count: 2,
      status: 'EXISTING',
      description: 'Secure file listing and reading with role-based access controls.',
      useCases: [
        { id: 'UC-FO-001', title: 'List Files', status: 'EXISTING' },
        { id: 'UC-FO-002', title: 'Read File', status: 'EXISTING' },
      ]
    },
    {
      name: 'External Services',
      count: 4,
      status: 'EXISTING',
      description: 'Integration with Slack for notifications and bidirectional communication.',
      useCases: [
        { id: 'UC-EXT-001', title: 'Post Message to Slack', status: 'EXISTING' },
        { id: 'UC-EXT-002', title: 'Receive Slack Message', status: 'EXISTING' },
        { id: 'UC-NTF-001', title: 'Queue Notification', status: 'EXISTING' },
        { id: 'UC-NTF-002', title: 'Deliver Notification', status: 'EXISTING' },
      ]
    },
    {
      name: 'Error Handling',
      count: 4,
      status: 'PROPOSED',
      description: 'Standardized error handling patterns for API timeouts, database failures, and MCP tool errors.',
      useCases: [
        { id: 'UC-ERR-001', title: 'Handle API Timeout', status: 'PROPOSED' },
        { id: 'UC-ERR-002', title: 'Handle Database Connection Failure', status: 'PROPOSED' },
        { id: 'UC-ERR-003', title: 'Handle iTerm2 Connection Failure', status: 'PROPOSED' },
        { id: 'UC-ERR-004', title: 'Handle MCP Tool Failure', status: 'PROPOSED' },
      ]
    },
    {
      name: 'Groups Management',
      count: 9,
      status: 'PROPOSED',
      description: 'Database-backed agent grouping for organized workflows and fleet restart capabilities.',
      useCases: [
        { id: 'UC-GRP-001', title: 'List Groups', status: 'PROPOSED' },
        { id: 'UC-GRP-002', title: 'Create Group', status: 'PROPOSED' },
        { id: 'UC-GRP-003', title: 'Rename Group', status: 'PROPOSED' },
        { id: 'UC-GRP-004', title: 'Delete Group', status: 'PROPOSED' },
        { id: 'UC-GRP-005', title: 'Add Agent to Group', status: 'PROPOSED' },
        { id: 'UC-GRP-006', title: 'Remove Agent from Group', status: 'PROPOSED' },
        { id: 'UC-GRP-007', title: 'Bulk Add Agents', status: 'PROPOSED' },
        { id: 'UC-GRP-008', title: 'Reorder Agents in Group', status: 'PROPOSED' },
        { id: 'UC-GRP-009', title: 'Toggle Group Collapsed', status: 'EXISTING' },
      ]
    },
    {
      name: 'Restart Workflow',
      count: 4,
      status: 'PROPOSED',
      description: 'Automated agent fleet restart with layout preservation and session recovery.',
      useCases: [
        { id: 'UC-RST-001', title: 'Capture Current Layout', status: 'PROPOSED' },
        { id: 'UC-RST-002', title: 'Get Layout for Restart', status: 'PROPOSED' },
        { id: 'UC-RST-003', title: 'Restore Single Group', status: 'PROPOSED' },
        { id: 'UC-RST-004', title: 'Full Fleet Restart', status: 'PROPOSED' },
      ]
    },
  ];

  const statusColors = {
    'EXISTING': '#16a34a',
    'NEW': '#2563eb',
    'PROPOSED': '#7c3aed'
  };

  const totalCount = categories.reduce((sum, cat) => sum + cat.count, 0);
  const existingCount = categories.reduce((sum, cat) =>
    sum + cat.useCases.filter(uc => uc.status === 'EXISTING').length, 0);
  const newCount = categories.reduce((sum, cat) =>
    sum + cat.useCases.filter(uc => uc.status === 'NEW').length, 0);
  const proposedCount = categories.reduce((sum, cat) =>
    sum + cat.useCases.filter(uc => uc.status === 'PROPOSED').length, 0);

  return (
    <Layout
      title="Use Cases"
      description="73 use cases across 11 categories covering agent lifecycle, monitoring, messaging, and more. See what AI-AMP can do."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>73 Use Cases. 11 Categories.</h1>
          <p>A comprehensive platform covering every aspect of multi-agent orchestration&mdash;from agent lifecycle to fleet management.</p>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            <div className="card text-center">
              <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{totalCount}</h2>
              <p className="text-light mb-0">Total Use Cases</p>
            </div>
            <div className="card text-center">
              <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: statusColors.EXISTING }}>{existingCount}</h2>
              <p className="text-light mb-0">Existing (71%)</p>
            </div>
            <div className="card text-center">
              <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: statusColors.NEW }}>{newCount}</h2>
              <p className="text-light mb-0">New (8%)</p>
            </div>
            <div className="card text-center">
              <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: statusColors.PROPOSED }}>{proposedCount}</h2>
              <p className="text-light mb-0">Proposed (21%)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Use Case Categories</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            Each category represents a core capability of the AI-AMP platform. Use cases range from basic operations to advanced orchestration workflows.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
            {categories.map((category, idx) => (
              <div key={idx} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                  <div>
                    <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>{category.name}</h3>
                    <p className="text-light" style={{ marginBottom: 0 }}>{category.description}</p>
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '4px',
                    backgroundColor: statusColors[category.status] + '20',
                    color: statusColors[category.status],
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}>
                    {category.count} Use Cases
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 'var(--spacing-sm)',
                  marginTop: 'var(--spacing-md)'
                }}>
                  {category.useCases.map((uc, ucIdx) => (
                    <div
                      key={ucIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        padding: 'var(--spacing-sm)',
                        backgroundColor: 'var(--color-bg-alt)',
                        borderRadius: 'var(--border-radius)',
                        borderLeft: `3px solid ${statusColors[uc.status]}`
                      }}
                    >
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-light)',
                        fontFamily: 'monospace'
                      }}>
                        {uc.id}
                      </span>
                      <span style={{ flex: 1 }}>{uc.title}</span>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        backgroundColor: statusColors[uc.status] + '20',
                        color: statusColors[uc.status]
                      }}>
                        {uc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Components */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-lg">System Components</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            10 integrated components working together to deliver enterprise-grade multi-agent orchestration.
          </p>

          <div className="grid grid-3">
            {[
              { name: 'Desktop IDE', tech: 'Next.js + Tauri', desc: 'User interface for agent management, file editing, system monitoring' },
              { name: 'PostgreSQL Database', tech: '5 Schemas', desc: 'Single source of truth for agent state, handoffs, messages, knowledge base' },
              { name: 'MCP Server', tech: '11 Tools', desc: 'State management interface for Claude Code agents' },
              { name: 'Context Monitor', tech: 'Python Daemon', desc: 'Monitors session files, extracts token usage, updates database' },
              { name: 'Terminal Interface', tech: 'iTerm2 API', desc: 'Programmatic control of terminal sessions' },
              { name: 'Orchestration Scripts', tech: 'Python', desc: 'Coordinate multi-step workflows like handoff cycles' },
              { name: 'Slack Bridge', tech: 'Events API', desc: 'Bidirectional communication between Slack and agents' },
              { name: 'Notification Daemon', tech: 'Python', desc: 'System-wide event notifications and alerts' },
              { name: 'Session Files', tech: 'JSONL', desc: 'Raw conversation history parsed by context monitor' },
            ].map((comp, i) => (
              <div key={i} className="card">
                <h4>{comp.name}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }}>{comp.tech}</p>
                <p className="text-light mb-0">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Coverage */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">API Coverage</h2>
          <div className="grid grid-2">
            <div className="card">
              <h3>23 Existing Endpoints</h3>
              <p className="text-light">Full REST API for agent management, messaging, health monitoring, and terminal control.</p>
              <ul style={{ marginTop: 'var(--spacing-md)', paddingLeft: 'var(--spacing-lg)' }}>
                <li>Agent lifecycle operations</li>
                <li>Message management</li>
                <li>Health checks (database, network, PTY, context)</li>
                <li>Terminal control (focus, peek, send)</li>
                <li>Handoff management</li>
              </ul>
            </div>
            <div className="card">
              <h3>9 Proposed Endpoints</h3>
              <p className="text-light">Database-backed groups management for organized workflows and fleet restart capabilities.</p>
              <ul style={{ marginTop: 'var(--spacing-md)', paddingLeft: 'var(--spacing-lg)' }}>
                <li>Group CRUD operations</li>
                <li>Member management</li>
                <li>Layout capture and restore</li>
                <li>Full fleet restart workflow</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>See AI-AMP in Action</h2>
          <p>73 use cases. Enterprise-grade orchestration. Full audit trails.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/survey" className="btn btn-primary btn-large">Talk With Us</Link>
            <Link href="/product/overview" className="btn btn-secondary btn-large">Product Overview</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
