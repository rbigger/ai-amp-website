import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function DemoRequest() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      await fetch('https://formsubmit.co/ajax/demo_requested@discoverie.us', {
        method: 'POST',
        body: formData,
      });
      router.push('/thank-you');
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="Request a Demo"
      description="Request a personalized demo of AI-AMP. See how multi-agent orchestration with governance and compliance controls can transform your development workflow."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>Request a Demo</h1>
          <p>See AI-AMP in action. Tell us about your needs and we&apos;ll schedule a personalized demonstration.</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="AI-AMP Demo Request" />
              <input type="hidden" name="_template" value="table" />

              <h3 className="mb-lg">Tell Us About Yourself</h3>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Work Email *</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company *</label>
                <input type="text" id="company" name="company" required />
              </div>

              <div className="form-group">
                <label htmlFor="title">Job Title *</label>
                <input type="text" id="title" name="title" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" />
              </div>

              <h3 className="mb-lg mt-xl">About Your Organization</h3>

              <div className="form-group">
                <label htmlFor="company-size">Company Size *</label>
                <select id="company-size" name="company_size" required>
                  <option value="">Select...</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1,000 employees</option>
                  <option value="1001-5000">1,001-5,000 employees</option>
                  <option value="5000+">5,000+ employees</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dev-team-size">Development Team Size *</label>
                <select id="dev-team-size" name="dev_team_size" required>
                  <option value="">Select...</option>
                  <option value="1-5">1-5 developers</option>
                  <option value="6-20">6-20 developers</option>
                  <option value="21-50">21-50 developers</option>
                  <option value="51-100">51-100 developers</option>
                  <option value="100+">100+ developers</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="industry">Industry *</label>
                <select id="industry" name="industry" required>
                  <option value="">Select...</option>
                  <option value="financial-services">Financial Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="technology">Technology</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail / E-commerce</option>
                  <option value="government">Government</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <h3 className="mb-lg mt-xl">Your Interest</h3>

              <div className="form-group">
                <label htmlFor="current-tools">What AI coding tools are you currently using?</label>
                <input type="text" id="current-tools" name="current_tools" placeholder="e.g., GitHub Copilot, Cursor, ChatGPT, etc." />
              </div>

              <div className="form-group">
                <label htmlFor="primary-interest">What interests you most about AI-AMP? *</label>
                <select id="primary-interest" name="primary_interest" required>
                  <option value="">Select...</option>
                  <option value="multi-agent">Multi-agent orchestration</option>
                  <option value="compliance">Compliance and audit trails</option>
                  <option value="governance">Governance and controls</option>
                  <option value="visibility">Dashboard and visibility</option>
                  <option value="memory">Continuous memory / handoffs</option>
                  <option value="all">All of the above</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="timeline">When are you looking to implement?</label>
                <select id="timeline" name="timeline">
                  <option value="">Select...</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="evaluating">Just evaluating</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="comments">Anything else you&apos;d like us to know?</label>
                <textarea id="comments" name="comments" rows="4" placeholder="Specific requirements, questions, or use cases..."></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large"
                style={{ width: '100%', marginTop: 'var(--spacing-lg)' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Request Demo'}
              </button>

              <p className="text-light text-center mt-md" style={{ fontSize: '0.875rem' }}>
                We&apos;ll respond within 1 business day.
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
