import Link from 'next/link';
import Layout from '@/components/Layout';
import FadeIn from '@/components/FadeIn';

export default function Why() {
  return (
    <Layout
      title="Why AI-AMP | Quality Software is the Only Possible Outcome"
      description="Most companies inspect software for quality after the fact. AI-AMP enforces quality at the process level through the Value Chain Methodology."
    >
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <FadeIn>
            <h1>Quality Software is the Only Possible Outcome</h1>
          </FadeIn>
        </div>
      </section>

      {/* The Problem */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <p className="text-large">
              Most companies don&apos;t produce quality software. They produce software and then inspect it for quality&mdash;through code reviews, QA cycles, and testing phases bolted on after the fact. The result is predictable: bugs, rework, technical debt, and systems that nobody fully understands anymore.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              The root cause isn&apos;t developer talent. It&apos;s process. And the most expensive symptom of a broken process is lost intent&mdash;code that tells you what it does, but not why, what it was supposed to do, or what it must never do. That knowledge lives in Dave&apos;s head. Until Dave leaves.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The AI Amplification Problem */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <h2>Now Imagine Dropping AI Agents Into That Environment</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              Agents don&apos;t wait. They move at machine speed, making dozens of micro-decisions&mdash;architectural, structural, stylistic&mdash;with no framework to guide them and no record of why. They have no access to the conversations that shaped the project, the tradeoffs that were considered, or the constraints that were quietly agreed upon in a meeting six months ago. They don&apos;t know what the code is <em>not</em> supposed to do. They can&apos;t ask Dave.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p>
              And if the human process around them is already fragmented&mdash;intent scattered across Jira tickets, Slack threads, and tribal knowledge&mdash;the agent inherits that chaos and amplifies it.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="card" style={{ backgroundColor: 'var(--color-background)', borderLeft: '4px solid var(--color-accent)', marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
              <p className="mb-0" style={{ fontStyle: 'italic' }}>
                Five hours into a complex task, an autonomous agent may have drifted far from its original goals, confidently producing code that is technically functional and strategically wrong. It won&apos;t flag this. It doesn&apos;t know enough to. The output looks like progress. The damage is invisible until it isn&apos;t.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p>
              Deploying AI agents into a standard human-oriented development environment doesn&apos;t fix a flawed process. It accelerates it&mdash;bugs, rework, and misaligned intent at machine speed.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* The Solution */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <h2>AI-AMP Solves This at the Process Level</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              Built on the Value Chain Methodology, AI-AMP enforces a structured development sequence&mdash;Vision, Use Cases, Feasibility Analysis, Technology Selection, Architecture Decision Records, Tests, and only then Work Tickets&mdash;where every artifact is registered, indexed, and traceable. You cannot skip steps. Intent is captured at every layer, from business vision down to a single work ticket.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p>
              The result isn&apos;t just better documentation. It&apos;s a living chain of custody for every decision ever made about your software&mdash;why it was built, how it&apos;s supposed to behave, what alternatives were rejected, and what a finished product looks like before a line of code is written.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-large" style={{ marginTop: 'var(--spacing-xl)' }}>
              This matters enormously for human teams. It matters even more for AI agents.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Why It Matters for AI */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <h2>Agents Need What They Cannot Generate Themselves</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              Autonomous AI agents accelerate both the benefits and the pitfalls of software development. An agent five hours into a complex task may have only a superficial understanding of what it&apos;s trying to accomplish. Ask it why an architectural decision was made, and it might as well say &ldquo;who&apos;s Dave?&rdquo; Without structure, agents produce volume without wisdom&mdash;and at machine speed.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p>
              AI-AMP gives agents what they cannot generate themselves: long-term context, defined skill sets, and a structured framework for every decision.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 'var(--spacing-xl)' }}>
              <li style={{ marginBottom: 'var(--spacing-md)' }}>
                <strong>The Vision record</strong> tells the agent what success looks like.
              </li>
              <li style={{ marginBottom: 'var(--spacing-md)' }}>
                <strong>The Use Cases</strong> define expected behavior.
              </li>
              <li style={{ marginBottom: 'var(--spacing-md)' }}>
                <strong>The ADRs</strong> explain why the system is built the way it is.
              </li>
              <li style={{ marginBottom: 'var(--spacing-md)' }}>
                <strong>The Tests</strong> define done.
              </li>
            </ul>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p>
              The agent isn&apos;t guessing&mdash;it&apos;s operating inside a system of captured intent.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Conclusion */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <FadeIn>
            <p className="text-large">
              AI-AMP isn&apos;t just a coding tool. It&apos;s the infrastructure that makes AI-assisted software development trustworthy.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-large" style={{ fontWeight: '600', marginTop: 'var(--spacing-xl)' }}>
              Quality software isn&apos;t a goal you aim for.<br />
              With AI-AMP, it&apos;s the only possible outcome.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <FadeIn>
            <h2>See It In Action</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p>Learn how AI-AMP enforces quality at every step of the development process.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link href="/product/overview" className="btn btn-primary btn-large">Explore the Product</Link>
              <Link href="/survey" className="btn btn-secondary btn-large">Talk With Us</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
