import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout
      title="About AI-AMP"
      description="AI-AMP is the enterprise AI agent management platform built for regulated industries."
    >
      <section className="hero hero-page">
        <div className="container">
          <h1>About AI-AMP</h1>
          <p>Building accountable AI for enterprises that can't compromise on governance.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: 'var(--spacing-3xl)' }}>
            <div>
              <h2 className="mb-lg">Our Mission</h2>
              <p>
                AI-AMP exists to make AI development safe, accountable, and auditable for
                regulated industries. We believe enterprises shouldn't have to choose between
                AI productivity and compliance.
              </p>
              <p>
                Our platform orchestrates teams of specialized AI agents—each with defined roles,
                clear boundaries, and complete audit trails. Every action is logged. Every decision
                is traceable. Every agent is accountable.
              </p>
            </div>
            <div className="card" style={{ backgroundColor: 'var(--color-background-alt)' }}>
              <h4 className="mb-md">What Sets Us Apart</h4>
              <ul style={{ listStyle: 'none' }}>
                <li className="mb-sm"><strong>15 Specialized Roles</strong> — Not one AI, but a coordinated team</li>
                <li className="mb-sm"><strong>Compliance-First</strong> — SOC 2, NYDFS 500, HIPAA alignment</li>
                <li className="mb-sm"><strong>Full Audit Trails</strong> — Every action logged immutably</li>
                <li className="mb-sm"><strong>Kill Switches</strong> — Absolute control when you need it</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Built for Regulated Industries</h2>
          <p className="text-center text-light mb-2xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>
            Financial services, healthcare, and enterprise organizations trust AI-AMP because
            we understand their compliance requirements aren't optional.
          </p>
          <div className="grid grid-3">
            <div className="card text-center">
              <h4>Financial Services</h4>
              <p className="mb-0">Banks, insurance, investment firms under regulatory oversight.</p>
            </div>
            <div className="card text-center">
              <h4>Healthcare</h4>
              <p className="mb-0">Hospitals, pharma, health tech with HIPAA requirements.</p>
            </div>
            <div className="card text-center">
              <h4>Enterprise</h4>
              <p className="mb-0">Large organizations needing governance and accountability.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <h2 className="mb-md">Get in Touch</h2>
          <p className="text-light mb-lg" style={{ maxWidth: '500px', margin: '0 auto var(--spacing-lg)' }}>
            Questions about AI-AMP? We'd love to hear from you.
          </p>
          <p>
            <a href="mailto:info@ai-agent-management-platform.com" className="btn btn-primary">Contact Us</a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
