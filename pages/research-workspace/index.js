import Link from 'next/link';
import Layout from '@/components/Layout';
import FadeIn from '@/components/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/StaggerChildren';

const stages = [
  {
    number: '1',
    name: 'Idea',
    description: 'Articulate your thesis, identify the gap, and formulate research questions.',
    color: '#FEFCE8',
    features: ['Thesis statement', 'Gap identification', 'Research questions'],
  },
  {
    number: '2',
    name: 'Claims',
    description: 'Break your thesis into testable assertions. Track their status as evidence emerges.',
    color: '#F0FDF4',
    features: ['Status tracking', 'Evidence linking', 'Cross-pollination'],
  },
  {
    number: '3',
    name: 'Outline',
    description: 'Structure your document. Map claims to sections. Identify citation gaps.',
    color: '#EFF6FF',
    features: ['Hierarchical sections', 'Claim mapping', 'Gap detection'],
  },
  {
    number: '4',
    name: 'Draft',
    description: 'Write with your claims and references at hand. Insert citations inline.',
    color: '#FAFAFA',
    features: ['Rich text editor', 'Inline citations', 'AI suggestions'],
  },
];

const cocitationModes = [
  {
    name: 'Landscape Mapping',
    description: 'Where does your idea fit in the field? Visualize research clusters and identify key venues.',
    icon: '🗺️',
  },
  {
    name: 'Foundation Verification',
    description: 'Are you citing the canonical works? Surface foundational papers cited 7+ times.',
    icon: '🏛️',
  },
  {
    name: 'Cross-Pollination',
    description: 'What concepts from adjacent fields apply? Discover unexpected connections.',
    icon: '🔀',
  },
  {
    name: 'Claim Deep-Dive',
    description: 'What references support or oppose this specific claim? Build your evidence base.',
    icon: '🔍',
  },
];

export default function ResearchWorkspace() {
  return (
    <Layout
      title="Research Workspace"
      description="A collaborative research writing tool with structured workflow and co-citation analysis. From idea to draft, with literature validation at every step."
    >
      {/* Hero Section */}
      <section className="hero" style={{ background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)' }}>
        <div className="container">
          <FadeIn>
            <h1>Research Workspace</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p>From idea to draft, with literature validation at every step. A structured workflow for academic writing that integrates co-citation analysis where you need it most.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="btn-group" style={{ marginTop: 'var(--spacing-xl)' }}>
              <Link href="/login?redirect=/research-workspace/projects" className="btn btn-primary btn-large" style={{ backgroundColor: 'white', color: '#0d9488' }}>Get Started</Link>
              <Link href="#workflow" className="btn btn-secondary btn-large" style={{ borderColor: 'white', color: 'white' }}>See How It Works</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-lg">The Challenge of Academic Writing</h2>
          </FadeIn>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <FadeIn delay={0.1} direction="left">
              <div>
                <p>Academic writing tools treat citations as an afterthought. You write first, then scramble to find supporting literature.</p>
                <p>But research thinking is iterative. Claims need validation. Literature informs direction. The best papers are built on solid foundations.</p>
                <h4 className="mt-lg mb-sm">Research Workspace provides:</h4>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                  <li>Claims as first-class objects with status tracking</li>
                  <li>Co-citation analysis at every workflow stage</li>
                  <li>Real-time collaboration with presence awareness</li>
                  <li>AI-assisted citation suggestions (opt-in)</li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <div className="card" style={{ backgroundColor: 'var(--color-background-alt)' }}>
                <h4>Claims-First Approach</h4>
                <p style={{ marginBottom: 'var(--spacing-md)' }}>Every claim you make has a status:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#94a3b8' }}></span>
                    <span><strong>Untested</strong> &ndash; Hypothesis awaiting evidence</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></span>
                    <span><strong>Testing</strong> &ndash; Actively gathering evidence</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
                    <span><strong>Reinforced</strong> &ndash; Supported by literature</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                    <span><strong>Partial</strong> &ndash; Some support, needs more</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
                    <span><strong>Declined</strong> &ndash; Contradicted by evidence</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Workflow Stages */}
      <section id="workflow" className="section section-alt">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-lg">Four-Stage Workflow</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-center text-light mb-2xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>Progress naturally from initial idea to polished draft. Each stage has contextual tools and co-citation analysis tailored to your needs.</p>
          </FadeIn>

          <StaggerContainer className="grid grid-4">
            {stages.map((stage) => (
              <StaggerItem key={stage.name}>
                <div className="card" style={{ backgroundColor: stage.color, height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '600'
                    }}>{stage.number}</span>
                    <h4 style={{ margin: 0, color: 'var(--color-primary)' }}>{stage.name}</h4>
                  </div>
                  <p style={{ color: 'var(--color-text)', marginBottom: 'var(--spacing-md)' }}>{stage.description}</p>
                  <ul style={{ listStyle: 'none', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-light)' }}>
                    {stage.features.map((feature) => (
                      <li key={feature} style={{ marginBottom: 'var(--spacing-xs)' }}>
                        <span style={{ color: 'var(--color-accent)', marginRight: 'var(--spacing-xs)' }}>&#10003;</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Co-Citation Analysis */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-lg">Co-Citation Analysis</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-center text-light mb-2xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>Literature doesn&apos;t exist in isolation. Co-citation analysis reveals which papers are frequently cited together, surfacing foundational works and unexpected connections.</p>
          </FadeIn>

          <StaggerContainer className="grid grid-2">
            {cocitationModes.map((mode) => (
              <StaggerItem key={mode.name}>
                <div className="card" style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                  <div style={{ fontSize: '2rem', lineHeight: 1 }}>{mode.icon}</div>
                  <div>
                    <h4 style={{ color: 'var(--color-accent)', marginBottom: 'var(--spacing-xs)' }}>{mode.name}</h4>
                    <p className="mb-0">{mode.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="card mt-xl" style={{ backgroundColor: 'var(--color-background-alt)', textAlign: 'center' }}>
              <h4>Frequency Badges</h4>
              <p style={{ maxWidth: '600px', margin: '0 auto var(--spacing-lg)' }}>References are tagged by how often they&apos;re co-cited in your project&apos;s literature:</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: '#7c3aed',
                    color: 'white',
                    borderRadius: '9999px',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '600'
                  }}>7+</span>
                  <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--spacing-xs)', marginBottom: 0 }}>Highly Foundational</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    borderRadius: '9999px',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '600'
                  }}>5-6</span>
                  <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--spacing-xs)', marginBottom: 0 }}>Foundational</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: '#0891b2',
                    color: 'white',
                    borderRadius: '9999px',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '600'
                  }}>3-4</span>
                  <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--spacing-xs)', marginBottom: 0 }}>Significant</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: '#64748b',
                    color: 'white',
                    borderRadius: '9999px',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '600'
                  }}>2</span>
                  <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--spacing-xs)', marginBottom: 0 }}>Co-cited</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section section-alt">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-lg">Built for Researchers</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-3">
            <StaggerItem>
              <div className="card text-center">
                <h4>BibTeX Import</h4>
                <p className="mb-0">Import your reference library from Zotero, Mendeley, or any reference manager.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card text-center">
                <h4>Real-Time Collaboration</h4>
                <p className="mb-0">See who&apos;s viewing which section. Presence indicators and threaded notes.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card text-center">
                <h4>LaTeX Math Support</h4>
                <p className="mb-0">Write equations inline with full LaTeX syntax. Renders beautifully.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card text-center">
                <h4>PDF Export</h4>
                <p className="mb-0">Export your draft as a formatted PDF ready for submission or sharing.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card text-center">
                <h4>AI Suggestions (Opt-in)</h4>
                <p className="mb-0">Get citation recommendations as you write. Always optional, always transparent.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card text-center">
                <h4>Version History</h4>
                <p className="mb-0">Track how your claims evolved. See the full audit trail of your thinking.</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" style={{ background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)' }}>
        <div className="container">
          <FadeIn>
            <h2>Start Your Research Project</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p>From initial idea to polished draft. Validate your claims with literature at every step.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link href="/login?redirect=/research-workspace/projects" className="btn btn-primary btn-large" style={{ backgroundColor: 'white', color: '#0d9488' }}>Get Started Free</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
