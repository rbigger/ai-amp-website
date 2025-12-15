import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function ContactSales() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      await fetch('https://formsubmit.co/ajax/sales@discoverie.us', {
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
      title="Contact Sales"
      description="Contact AI-AMP sales team. Get pricing information, discuss your requirements, and learn how AI-AMP fits your organization."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>Contact Sales</h1>
          <p>Let&apos;s discuss how AI-AMP can help your organization. Our team will get back to you within 1 business day.</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="AI-AMP Sales Inquiry" />
              <input type="hidden" name="_template" value="table" />

              <h3 className="mb-lg">Contact Information</h3>

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

              <h3 className="mb-lg mt-xl">Company Information</h3>

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

              <h3 className="mb-lg mt-xl">Your Requirements</h3>

              <div className="form-group">
                <label htmlFor="plan-interest">Which plan are you interested in? *</label>
                <select id="plan-interest" name="plan_interest" required>
                  <option value="">Select...</option>
                  <option value="core">Core</option>
                  <option value="teams">Teams</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="financial-services">Financial Services</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="compliance-requirements">Do you have specific compliance requirements?</label>
                <select id="compliance-requirements" name="compliance_requirements">
                  <option value="">Select...</option>
                  <option value="soc2">SOC 2</option>
                  <option value="hipaa">HIPAA</option>
                  <option value="nydfs">NYDFS 500</option>
                  <option value="pci">PCI DSS</option>
                  <option value="multiple">Multiple requirements</option>
                  <option value="none">No specific requirements</option>
                  <option value="not-sure">Not sure</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="timeline">When are you looking to implement? *</label>
                <select id="timeline" name="timeline" required>
                  <option value="">Select...</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="evaluating">Just evaluating</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Tell us about your needs *</label>
                <textarea id="message" name="message" rows="4" required placeholder="What challenges are you trying to solve? Any specific requirements or questions?"></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large"
                style={{ width: '100%', marginTop: 'var(--spacing-lg)' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Contact Sales'}
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
