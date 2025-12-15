import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Pricing() {
  const tiers = [
    {
      name: 'Core',
      price: '$TBD',
      period: 'Contact for pricing',
      description: 'Individual developers and evaluation',
      features: [
        'Up to 3 agent roles',
        'Basic dashboard',
        'Local deployment only',
        'Community support',
        '7-day session history',
      ],
      featured: false,
    },
    {
      name: 'Teams',
      price: '$TBD',
      period: 'per seat/month',
      description: 'Development teams ready to scale',
      features: [
        'All 13 agent roles',
        'Full dashboard (22 views)',
        'Cloud-hosted option',
        'GitHub, Vercel, Supabase, Slack',
        '90-day session history',
        'Basic audit logging',
        'Email support (48hr)',
      ],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: '$TBD',
      period: 'Contact for pricing',
      description: 'Organizations with compliance needs',
      features: [
        'Everything in Teams, plus:',
        'Advanced audit trails',
        'Multi-party approval workflows',
        'Environment separation',
        'Kill switch controls',
        'SSO/SAML authentication',
        'Self-hosted option',
        'Dedicated support (4hr)',
        '99.9% uptime SLA',
      ],
      featured: false,
    },
    {
      name: 'Financial Services',
      price: '$TBD',
      period: 'Contact for pricing',
      description: 'Banks and regulated institutions',
      features: [
        'Everything in Enterprise, plus:',
        'SOC 2 compliance package',
        'NYDFS 500 alignment',
        'Confabulation detection',
        'Security questionnaire support',
        'On-premises deployment',
        'Air-gapped option',
        'Vendor risk documentation',
      ],
      featured: false,
    },
  ];

  return (
    <Layout
      title="Pricing"
      description="AI-AMP pricing for Core, Teams, Enterprise, and Financial Services plans. Contact us for details."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>Simple, Transparent Pricing</h1>
          <p>Plans for teams of all sizes. Enterprise features when you need them.</p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section">
        <div className="container">
          <div className="pricing-grid">
            {tiers.map((tier) => (
              <div key={tier.name} className={`pricing-card ${tier.featured ? 'pricing-featured' : ''}`}>
                {tier.featured && <span className="pricing-badge">Most Popular</span>}
                <h3>{tier.name}</h3>
                <div className="pricing-amount">{tier.price}</div>
                <p className="pricing-period">{tier.period}</p>
                <p className="text-light">{tier.description}</p>
                <ul className="pricing-features">
                  {tier.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <Link href="/contact-sales" className={`btn ${tier.featured ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                  Contact Sales
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-2xl">Feature Comparison</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Core</th>
                  <th>Teams</th>
                  <th>Enterprise</th>
                  <th>Financial Services</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Agent Roles</strong></td><td>3</td><td>13</td><td>13</td><td>13</td></tr>
                <tr><td><strong>Dashboard Views</strong></td><td>Basic</td><td>22</td><td>22</td><td>22</td></tr>
                <tr><td><strong>Session History</strong></td><td>7 days</td><td>90 days</td><td>Custom</td><td>Custom</td></tr>
                <tr><td><strong>Audit Logging</strong></td><td>&mdash;</td><td>Basic</td><td>Advanced</td><td>Advanced + Compliance</td></tr>
                <tr><td><strong>Deployment</strong></td><td>Local</td><td>Cloud</td><td>Cloud or Self-hosted</td><td>On-prem or Air-gapped</td></tr>
                <tr><td><strong>Approval Workflows</strong></td><td>&mdash;</td><td>&mdash;</td><td>Yes</td><td>Yes + Multi-party</td></tr>
                <tr><td><strong>Kill Switches</strong></td><td>&mdash;</td><td>&mdash;</td><td>Yes</td><td>Yes</td></tr>
                <tr><td><strong>SSO/SAML</strong></td><td>&mdash;</td><td>&mdash;</td><td>Yes</td><td>Yes</td></tr>
                <tr><td><strong>Support</strong></td><td>Community</td><td>Email (48hr)</td><td>Dedicated (4hr)</td><td>Dedicated + Compliance</td></tr>
                <tr><td><strong>SLA</strong></td><td>&mdash;</td><td>&mdash;</td><td>99.9%</td><td>99.9%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-2xl">Frequently Asked Questions</h2>
          <div className="grid grid-2">
            {[
              { q: 'Can I see a demo before committing?', a: 'Yes. Request a demo and we\'ll schedule a personalized walkthrough of AI-AMP for your team.' },
              { q: 'Can I switch plans later?', a: 'Yes. Upgrade anytime. Downgrade at the end of your billing period.' },
              { q: 'What counts as a seat?', a: 'Any user who can create or manage agents. Read-only dashboard access doesn\'t require a seat.' },
              { q: 'How is Enterprise pricing determined?', a: 'Based on number of users, deployment model, and specific requirements. Contact us for a quote.' },
            ].map((faq, i) => (
              <div key={i} className="card">
                <h4>{faq.q}</h4>
                <p className="mb-0">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Not Sure Which Plan?</h2>
          <p>Talk to our team. We&apos;ll help you find the right fit for your organization.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/contact-sales" className="btn btn-primary btn-large">Contact Sales</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
