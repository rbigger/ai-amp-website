import Link from 'next/link';
import Layout from '@/components/Layout';
import FadeIn from '@/components/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/StaggerChildren';

export default function Methodology() {
  return (
    <Layout
      title="Agent-Centric Development Methodology | AI-AMP"
      description="The structured methodology that makes AI agents reliable. Vision, Use Cases, Architecture Decisions, Tests, then Code. Intent captured at every layer."
    >
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <FadeIn>
            <h1>The Agent-Centric Development Methodology</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p>A structured approach that gives AI agents what they cannot generate themselves: long-term context, captured intent, and a framework for every decision.</p>
          </FadeIn>
        </div>
      </section>

      {/* The Problem */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <h2>Why Agents Need Methodology</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p>
              Traditional software development assumes human memory. Developers remember why decisions were made, what alternatives were rejected, and what the code must never do. That knowledge persists across sprints, meetings, and years.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p>
              AI agents have no such memory. Five hours into a complex task, an agent may have only a superficial understanding of what it&apos;s building. Ask it why an architectural decision was made, and it has no answer. Without structure, agents produce volume without wisdom.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="card" style={{ backgroundColor: 'var(--color-background-alt)', borderLeft: '4px solid var(--color-accent)', marginTop: 'var(--spacing-xl)' }}>
              <p className="mb-0" style={{ fontWeight: '500' }}>
                The methodology solves this by externalizing intent. Every decision an agent might need to make is answered by an artifact that exists before the agent starts working.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The Value Chain */}
      <section className="section section-alt">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-lg">The Value Chain</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-center text-light mb-2xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>
              Every piece of work traces back to a business reason. No orphan code. No rogue decisions.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              flexWrap: 'wrap',
              marginBottom: 'var(--spacing-2xl)'
            }}>
              {[
                { name: 'Vision', question: 'WHY' },
                { name: 'Use Case', question: 'WHAT' },
                { name: 'ADR', question: 'HOW' },
                { name: 'Test', question: 'VERIFY' },
                { name: 'Ticket', question: 'DO' },
              ].map((item, index) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <div className="card text-center" style={{
                    minWidth: '120px',
                    padding: 'var(--spacing-md)',
                    margin: 0
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: '600', marginBottom: '4px' }}>
                      {item.question}
                    </div>
                    <div style={{ fontWeight: '500' }}>{item.name}</div>
                  </div>
                  {index < 4 && (
                    <span style={{ color: 'var(--color-text-light)', fontSize: '1.5rem' }}>&rarr;</span>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <StaggerItem>
              <div className="card">
                <h4 style={{ color: 'var(--color-accent)' }}>Vision</h4>
                <p className="text-light mb-0">
                  What problem are we solving? What does success look like? The agent knows the destination before it starts walking.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card">
                <h4 style={{ color: 'var(--color-accent)' }}>Use Cases</h4>
                <p className="text-light mb-0">
                  What must the system do? Preconditions, actions, postconditions. The agent knows expected behavior, not just features.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card">
                <h4 style={{ color: 'var(--color-accent)' }}>Architecture Decision Records</h4>
                <p className="text-light mb-0">
                  Why is the system built this way? What alternatives were rejected? The agent inherits institutional knowledge.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card">
                <h4 style={{ color: 'var(--color-accent)' }}>Tests</h4>
                <p className="text-light mb-0">
                  What does &ldquo;done&rdquo; look like? Tests are written before code. The agent has an objective definition of success.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card">
                <h4 style={{ color: 'var(--color-accent)' }}>Tickets</h4>
                <p className="text-light mb-0">
                  What specific work needs doing? Clear scope, acceptance criteria, and a link back to the use case it implements.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card">
                <h4 style={{ color: 'var(--color-accent)' }}>Traceability</h4>
                <p className="text-light mb-0">
                  Every artifact links to its parent. Any code can be traced back to a business reason in seconds.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* How Agents Use It */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <h2>How Agents Use the Methodology</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              When an AI-AMP agent receives a ticket, it doesn&apos;t start with a blank slate. The methodology provides context at every level:
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ marginTop: 'var(--spacing-xl)' }}>
              <div style={{
                borderLeft: '2px solid var(--color-border)',
                paddingLeft: 'var(--spacing-lg)',
                marginLeft: 'var(--spacing-md)'
              }}>
                {[
                  {
                    title: 'The Vision tells the agent what success looks like',
                    desc: 'Business objectives, constraints, and the definition of done at the highest level.'
                  },
                  {
                    title: 'The Use Cases define expected behavior',
                    desc: 'Not just features, but preconditions, postconditions, and invariants the code must respect.'
                  },
                  {
                    title: 'The ADRs explain why the system is built this way',
                    desc: 'Architectural decisions, rejected alternatives, and the reasoning behind constraints.'
                  },
                  {
                    title: 'The Tests define done',
                    desc: 'Objective, executable criteria. The agent knows exactly when its work is complete.'
                  },
                ].map((item, index) => (
                  <div key={index} style={{
                    marginBottom: 'var(--spacing-xl)',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: 'calc(-1 * var(--spacing-lg) - var(--spacing-md) - 5px)',
                      top: '4px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent)'
                    }} />
                    <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>{item.title}</h4>
                    <p className="text-light mb-0">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p style={{ marginTop: 'var(--spacing-xl)' }}>
              The agent isn&apos;t guessing. It&apos;s operating inside a system of captured intent. Decisions that would otherwise be arbitrary are guided by artifacts that exist before the work begins.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What It Prevents */}
      <section className="section section-alt">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-lg">What the Methodology Prevents</h2>
          </FadeIn>

          <div className="grid grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <FadeIn delay={0.1}>
              <div>
                <h4 style={{ color: '#f85149' }}>Without Methodology</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    'Agent drift from original goals',
                    'Decisions made without context',
                    'Code that works but misses the point',
                    'Rework when intent is discovered late',
                    'No way to explain why code exists',
                    'Tribal knowledge lost between sessions',
                  ].map((item, index) => (
                    <li key={index} style={{
                      padding: 'var(--spacing-sm) 0',
                      borderBottom: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-sm)'
                    }}>
                      <span style={{ color: '#f85149' }}>&#10005;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <h4 style={{ color: '#3fb950' }}>With AI-AMP Methodology</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    'Every task anchored to a vision',
                    'Decisions guided by captured intent',
                    'Code that implements verified requirements',
                    'Intent captured before work begins',
                    'Full traceability from code to business reason',
                    'Context persists across agents and sessions',
                  ].map((item, index) => (
                    <li key={index} style={{
                      padding: 'var(--spacing-sm) 0',
                      borderBottom: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-sm)'
                    }}>
                      <span style={{ color: '#3fb950' }}>&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Agent Roles in Methodology */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-lg">Specialized Agents for Each Phase</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-center text-light mb-2xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>
              Different phases require different expertise. AI-AMP assigns specialized agents to each stage of the methodology.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-4">
            {[
              { phase: 'Vision & Strategy', agents: ['PRODUCT-MGR', 'ANALYST'], color: '#a371f7' },
              { phase: 'Architecture', agents: ['ARCHITECT', 'DATA-MODELER'], color: '#58a6ff' },
              { phase: 'Implementation', agents: ['CODER', 'DB-ADMIN'], color: '#3fb950' },
              { phase: 'Verification', agents: ['TESTER', 'REVIEWER'], color: '#f0883e' },
            ].map((item) => (
              <StaggerItem key={item.phase}>
                <div className="card text-center">
                  <div style={{
                    fontSize: '0.75rem',
                    color: item.color,
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 'var(--spacing-sm)'
                  }}>
                    {item.phase}
                  </div>
                  {item.agents.map((agent) => (
                    <div key={agent} style={{
                      fontSize: '0.875rem',
                      padding: 'var(--spacing-xs) 0'
                    }}>
                      {agent}
                    </div>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <p className="text-center mt-xl">
              <Link href="/protected/product/agent-roles" className="btn btn-secondary">View All 15 Agent Roles</Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Governance */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <h2>Built-In Governance</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p>
              The methodology enforces quality gates that agents cannot bypass:
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Vision must be approved before architecture work begins',
                  'Use cases must be approved before tickets are created',
                  'Tests must exist before implementation starts',
                  'Code must pass tests before tickets close',
                  'Agents cannot approve their own work',
                ].map((item, index) => (
                  <li key={index} style={{
                    padding: 'var(--spacing-md) 0',
                    borderBottom: index < 4 ? '1px solid var(--color-border)' : 'none',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-sm)'
                  }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: '600' }}>&#8594;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p style={{ marginTop: 'var(--spacing-xl)' }}>
              These aren&apos;t suggestions. They&apos;re enforced by the platform. The methodology creates a system where cutting corners is harder than doing it right.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <FadeIn>
            <h2>Ready to See It In Action?</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p>Learn how the Agent-Centric Development Methodology transforms AI-assisted software development.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link href="/why" className="btn btn-secondary btn-large">Read Our Philosophy</Link>
              <Link href="/survey" className="btn btn-primary btn-large">Talk With Us</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
