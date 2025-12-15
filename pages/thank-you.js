import Link from 'next/link';
import Layout from '@/components/Layout';

export default function ThankYou() {
  return (
    <Layout
      title="Thank You"
      description="Thank you for your interest in AI-AMP. We'll be in touch soon."
    >
      {/* Thank You Section */}
      <section className="hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container text-center">
          <h1>Thank You</h1>
          <p style={{ maxWidth: '500px', margin: '0 auto' }}>
            We&apos;ve received your information and will be in touch within 1 business day.
          </p>
          <div className="btn-group mt-xl" style={{ justifyContent: 'center' }}>
            <Link href="/" className="btn btn-primary btn-large">Return to Homepage</Link>
            <Link href="/product/overview" className="btn btn-secondary btn-large" style={{ borderColor: 'white', color: 'white' }}>Explore the Product</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
