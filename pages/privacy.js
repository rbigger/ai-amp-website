import Layout from '@/components/Layout';

export default function Privacy() {
  return (
    <Layout
      title="Privacy Policy"
      description="AI-AMP privacy policy - how we collect, use, and protect your information."
    >
      <section className="hero hero-page">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last updated: December 2025</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <h2 className="mb-md">Introduction</h2>
          <p>
            AI-AMP ("we," "our," or "us") respects your privacy and is committed to protecting
            your personal data. This privacy policy explains how we collect, use, and safeguard
            your information when you use our website and services.
          </p>

          <h2 className="mt-2xl mb-md">Information We Collect</h2>
          <h4 className="mb-sm">Information You Provide</h4>
          <ul style={{ marginBottom: 'var(--spacing-lg)' }}>
            <li>Account information (name, email, company)</li>
            <li>Survey responses and feedback</li>
            <li>Newsletter subscriptions</li>
            <li>Communications with us</li>
          </ul>

          <h4 className="mb-sm">Information Collected Automatically</h4>
          <ul style={{ marginBottom: 'var(--spacing-lg)' }}>
            <li>Usage data (pages visited, features used)</li>
            <li>Device information (browser type, operating system)</li>
            <li>IP address and general location</li>
          </ul>

          <h2 className="mt-2xl mb-md">How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul style={{ marginBottom: 'var(--spacing-lg)' }}>
            <li>Provide and improve our services</li>
            <li>Communicate with you about updates and features</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Ensure security and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="mt-2xl mb-md">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your
            personal data against unauthorized access, alteration, disclosure, or destruction.
            This includes encryption, access controls, and regular security assessments.
          </p>

          <h2 className="mt-2xl mb-md">Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary to fulfill the purposes
            for which it was collected, or as required by law. When data is no longer needed,
            we securely delete or anonymize it.
          </p>

          <h2 className="mt-2xl mb-md">Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul style={{ marginBottom: 'var(--spacing-lg)' }}>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing</li>
            <li>Data portability</li>
          </ul>

          <h2 className="mt-2xl mb-md">Cookies</h2>
          <p>
            We use essential cookies to ensure our website functions properly. We may also
            use analytics cookies to understand how visitors interact with our site. You can
            control cookie preferences through your browser settings.
          </p>

          <h2 className="mt-2xl mb-md">Third-Party Services</h2>
          <p>
            We may use third-party services for analytics, authentication, and communication.
            These services have their own privacy policies governing their use of your data.
          </p>

          <h2 className="mt-2xl mb-md">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any
            material changes by posting the new policy on this page and updating the "Last
            updated" date.
          </p>

          <h2 className="mt-2xl mb-md">Contact Us</h2>
          <p>
            If you have questions about this privacy policy or our data practices, please
            contact us at:{' '}
            <a href="mailto:info@ai-agent-management-platform.com">info@ai-agent-management-platform.com</a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
