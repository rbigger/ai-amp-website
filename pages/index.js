import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import FadeIn from '@/components/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/StaggerChildren';

export default function Home() {
  return (
    <Layout
      title="AI Agent Management Platform for Enterprise"
      description="AI-AMP orchestrates teams of specialized AI agents with full accountability, audit trails, and compliance controls. Built for regulated industries."
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <FadeIn>
            <h1>AI Development You Can Trust</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p>AI-AMP orchestrates teams of specialized AI agents&mdash;each with defined roles, clear boundaries, and complete accountability. Built for enterprises that can&apos;t compromise on governance.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="btn-group" style={{ marginTop: 'var(--spacing-xl)' }}>
              <Link href="/product/overview" className="btn btn-primary btn-large">Learn More</Link>
              <Link href="/why" className="btn btn-secondary btn-large">Why AI-AMP</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-lg">The Problem with AI Coding Tools</h2>
          </FadeIn>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <FadeIn delay={0.1} direction="left">
              <div>
                <p>Most AI coding tools are black boxes. They write code, but you can&apos;t see what they&apos;re doing, why they made certain decisions, or prove compliance to auditors.</p>
                <p>For regulated industries&mdash;financial services, healthcare, enterprise&mdash;that&apos;s a non-starter.</p>
                <h4 className="mt-lg mb-sm">You need:</h4>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                  <li>Complete audit trails</li>
                  <li>Approval workflows</li>
                  <li>Environment separation</li>
                  <li>Kill switches that actually work</li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <div className="card" style={{ backgroundColor: 'var(--color-background-alt)' }}>
                <h4>AI-AMP Provides</h4>
                <ul style={{ listStyle: 'none' }}>
                  <li><strong>Specialized Agents</strong> &ndash; Purpose-built roles for every stage of development</li>
                  <li><strong>Real-Time Monitoring</strong> &ndash; Always know your agents are working</li>
                  <li><strong>Quality Assurance</strong> &ndash; Tested code, every time</li>
                  <li><strong>Auto-Recovery</strong> &ndash; Work continues even when issues occur</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Agent Roles Preview */}
      <section className="section section-alt">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-lg">15 Specialized Agent Roles</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-center text-light mb-2xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-2xl)' }}>Like a well-run engineering organization, AI-AMP uses specialized roles with clear responsibilities.</p>
          </FadeIn>

          <StaggerContainer className="grid grid-4">
            {[
              { name: 'ARCHITECT', desc: 'Ensures coherent system design' },
              { name: 'CODER', desc: 'Delivers tested, production-ready code' },
              { name: 'CISO', desc: 'Maintains security standards' },
              { name: 'RESCUER', desc: 'Ensures work continuity' },
            ].map((role) => (
              <StaggerItem key={role.name}>
                <div className="card text-center">
                  <h4 style={{ color: 'var(--color-accent)' }}>{role.name}</h4>
                  <p className="mb-0">{role.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <p className="text-center mt-xl">
              <Link href="/protected/product/agent-roles" className="btn btn-secondary">See All 15 Roles</Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Compliance */}
      <section className="section">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-lg">Built for Regulated Industries</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-3">
            <StaggerItem>
              <div className="card text-center">
                <h4>SOC 2</h4>
                <p className="mb-0">Controls aligned to Trust Services Criteria. Type I: Q2 2026.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card text-center">
                <h4>NYDFS 500</h4>
                <p className="mb-0">Audit trails, access controls, and incident response aligned.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="card text-center">
                <h4>HIPAA</h4>
                <p className="mb-0">Technical safeguards for healthcare development environments.</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
          <FadeIn delay={0.3}>
            <p className="text-center mt-xl">
              <Link href="/protected/product/compliance" className="btn btn-secondary">View Compliance Details</Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="section section-alt">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-lg">Complete Visibility</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-center text-light mb-xl" style={{ maxWidth: '600px', margin: '0 auto var(--spacing-xl)' }}>Real-time dashboard for complete visibility. See what every agent is doing, track work progress, and monitor system health.</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="card" style={{ backgroundColor: 'var(--color-background-dark)', textAlign: 'center', padding: 'var(--spacing-4xl)' }}>
              <p style={{ color: 'var(--color-text-inverse)', opacity: 0.7 }}>[Dashboard Screenshot Placeholder]</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-center mt-xl">
              <Link href="/protected/product/dashboard" className="btn btn-secondary">Explore the Dashboard</Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <FadeIn>
            <h2>What Do You Think?</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p>We&apos;re building AI-AMP for enterprise teams. Your feedback shapes what we build next.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link href="/survey" className="btn btn-primary btn-large">Talk With Us</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
