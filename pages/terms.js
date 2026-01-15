import Layout from '@/components/Layout';

export default function Terms() {
  return (
    <Layout
      title="Terms of Service"
      description="AI-AMP terms of service - the agreement governing your use of our platform."
    >
      <section className="hero hero-page">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>Last updated: December 2025</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <h2 className="mb-md">Agreement to Terms</h2>
          <p>
            By accessing or using AI-AMP's website and services, you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please do not use
            our services.
          </p>

          <h2 className="mt-2xl mb-md">Description of Service</h2>
          <p>
            AI-AMP provides an AI agent management platform designed for enterprise use.
            Our platform enables organizations to orchestrate, monitor, and govern AI agents
            with full accountability and audit trails.
          </p>

          <h2 className="mt-2xl mb-md">Account Registration</h2>
          <p>
            To access certain features, you may need to create an account. You agree to:
          </p>
          <ul style={{ marginBottom: 'var(--spacing-lg)' }}>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>

          <h2 className="mt-2xl mb-md">Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul style={{ marginBottom: 'var(--spacing-lg)' }}>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the proper functioning of our services</li>
            <li>Use our services for any unlawful or harmful purpose</li>
          </ul>

          <h2 className="mt-2xl mb-md">Intellectual Property</h2>
          <p>
            All content, features, and functionality of AI-AMP—including but not limited to
            text, graphics, logos, and software—are owned by AI-AMP and protected by
            intellectual property laws. You may not copy, modify, or distribute our content
            without express written permission.
          </p>

          <h2 className="mt-2xl mb-md">Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" and "as available" without warranties of any
            kind, either express or implied. We do not guarantee that our services will be
            uninterrupted, secure, or error-free.
          </p>

          <h2 className="mt-2xl mb-md">Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, AI-AMP shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages arising from
            your use of our services.
          </p>

          <h2 className="mt-2xl mb-md">Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless AI-AMP and its officers, directors,
            employees, and agents from any claims, damages, or expenses arising from your
            use of our services or violation of these terms.
          </p>

          <h2 className="mt-2xl mb-md">Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to our services at any
            time, with or without cause, and with or without notice. Upon termination, your
            right to use our services will immediately cease.
          </p>

          <h2 className="mt-2xl mb-md">Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of
            the State of Delaware, without regard to its conflict of law provisions.
          </p>

          <h2 className="mt-2xl mb-md">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will provide notice
            of material changes by posting the updated terms on this page. Your continued
            use of our services after such changes constitutes acceptance of the new terms.
          </p>

          <h2 className="mt-2xl mb-md">Contact Us</h2>
          <p>
            If you have questions about these Terms of Service, please contact us at:{' '}
            <a href="mailto:info@ai-agent-management-platform.com">info@ai-agent-management-platform.com</a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
