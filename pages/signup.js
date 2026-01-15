import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createClient } from '@/lib/supabase/client';
import Layout from '@/components/Layout';

const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1,000 employees' },
  { value: '1000+', label: '1,000+ employees' },
];

const INDUSTRIES = [
  { value: 'Financial Services', label: 'Financial Services' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Government', label: 'Government' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Other', label: 'Other' },
];

const CURRENT_AI_USAGE = [
  { value: 'Not using AI for development yet', label: 'Not using AI for development yet' },
  { value: 'Individual tools (GitHub Copilot, ChatGPT, etc.)', label: 'Individual tools (GitHub Copilot, ChatGPT, etc.)' },
  { value: 'Team-wide AI coding assistants', label: 'Team-wide AI coding assistants' },
  { value: 'Custom AI integrations/workflows', label: 'Custom AI integrations/workflows' },
  { value: 'Other', label: 'Other' },
];

const DESIRED_AI_USAGE = [
  { value: 'Accelerate development velocity', label: 'Accelerate development velocity' },
  { value: 'Automate testing and QA', label: 'Automate testing and QA' },
  { value: 'Automate code review', label: 'Automate code review' },
  { value: 'Full SDLC automation with governance', label: 'Full SDLC automation with governance' },
  { value: 'Other', label: 'Other' },
];

export default function Signup() {
  const router = useRouter();
  const { invite: inviteToken } = router.query;

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    companyName: '',
    jobTitle: '',
    companySize: '',
    industry: '',
    industryOther: '',
    currentAiUsage: '',
    currentAiUsageOther: '',
    desiredAiUsage: '',
    desiredAiUsageOther: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Invite-related state
  const [inviteChecking, setInviteChecking] = useState(false);
  const [inviteValid, setInviteValid] = useState(null); // null = not checked, true/false = result
  const [inviteError, setInviteError] = useState(null);
  const [isInvited, setIsInvited] = useState(false);

  // Check invite token when URL changes
  useEffect(() => {
    if (inviteToken) {
      validateInvite(inviteToken);
    }
  }, [inviteToken]);

  const validateInvite = async (token) => {
    setInviteChecking(true);
    setInviteError(null);

    try {
      const res = await fetch('/api/invite/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.valid) {
        setInviteValid(true);
        setIsInvited(true);
        // Pre-fill email if provided in invite
        if (data.invite?.email) {
          setFormData(prev => ({ ...prev, email: data.invite.email }));
        }
      } else {
        setInviteValid(false);
        setInviteError(data.reason || 'Invalid invite');
      }
    } catch (err) {
      setInviteValid(false);
      setInviteError('Failed to validate invite');
    } finally {
      setInviteChecking(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Create auth user without password (passwordless signup)
      // User will set password after approval via reset link
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: crypto.randomUUID(), // Temporary password, user will reset after approval
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError('Failed to create account');
        setLoading(false);
        return;
      }

      // Create profile record using RPC function (bypasses RLS)
      // If invited, auto-approve the user
      const { error: profileError } = await supabase.rpc('create_user_profile', {
        p_id: authData.user.id,
        p_email: formData.email,
        p_full_name: formData.fullName,
        p_company_name: formData.companyName,
        p_job_title: formData.jobTitle,
        p_company_size: formData.companySize,
        p_industry: formData.industry,
        p_industry_other: formData.industry === 'Other' ? formData.industryOther : null,
        p_current_ai_usage: formData.currentAiUsage,
        p_current_ai_usage_other: formData.currentAiUsage === 'Other' ? formData.currentAiUsageOther : null,
        p_desired_ai_usage: formData.desiredAiUsage,
        p_desired_ai_usage_other: formData.desiredAiUsage === 'Other' ? formData.desiredAiUsageOther : null,
      });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      // If this is an invited user, auto-approve and trigger password reset
      if (isInvited && inviteToken) {
        // Mark invite as used
        await fetch('/api/invite/use', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: inviteToken, userId: authData.user.id }),
        });

        // Auto-approve the user profile
        const { error: approveError } = await supabase
          .from('user_profiles')
          .update({
            approved: true,
            approved_at: new Date().toISOString(),
            approved_by: 'invite'
          })
          .eq('id', authData.user.id);

        if (approveError) {
          console.error('Failed to auto-approve:', approveError);
          // Continue anyway - admin can manually approve
        }

        // Trigger password reset email
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          formData.email,
          { redirectTo: 'https://ai-agent-management-platform.com/set-password' }
        );

        if (resetError) {
          console.error('Failed to send password reset:', resetError);
        }
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: 'var(--spacing-md)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
    fontSize: '1rem',
    backgroundColor: 'var(--color-background)',
    color: 'var(--color-text)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: 'var(--spacing-sm)',
    fontWeight: '500',
  };

  const fieldStyle = {
    marginBottom: 'var(--spacing-lg)',
  };

  if (success) {
    // Different success message for invited vs. non-invited users
    if (isInvited) {
      return (
        <Layout title="Welcome to AI-AMP" description="Your account has been created">
          <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ maxWidth: '500px', textAlign: 'center' }}>
              <h1 className="mb-lg">Welcome to AI-AMP!</h1>
              <div className="card">
                <p>Your account has been created and approved.</p>
                <p>We&apos;ve sent an email to <strong>{formData.email}</strong> with a link to set your password.</p>
                <p className="text-light mt-lg" style={{ fontSize: '0.9rem' }}>
                  <strong>Next step:</strong>
                </p>
                <ol style={{ textAlign: 'left', paddingLeft: '1.5rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Check your email for the password setup link</li>
                  <li style={{ marginBottom: '0.5rem' }}>Set your password</li>
                  <li>Sign in and start exploring AI-AMP</li>
                </ol>
              </div>
              <p className="mt-xl">
                <Link href="/login" className="btn btn-primary">Go to Login</Link>
              </p>
            </div>
          </section>
        </Layout>
      );
    }

    return (
      <Layout title="Sign Up" description="Create your AI-AMP account">
        <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ maxWidth: '500px', textAlign: 'center' }}>
            <h1 className="mb-lg">Application Submitted</h1>
            <div className="card">
              <p>Thank you for your interest in AI-AMP!</p>
              <p>We&apos;ve received your application for <strong>{formData.email}</strong>.</p>
              <p className="text-light mt-lg" style={{ fontSize: '0.9rem' }}>
                <strong>What happens next:</strong>
              </p>
              <ol style={{ textAlign: 'left', paddingLeft: '1.5rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>We&apos;ll review your application</li>
                <li style={{ marginBottom: '0.5rem' }}>Once approved, you&apos;ll receive an email to set your password</li>
                <li>Sign in and start using AI-AMP</li>
              </ol>
            </div>
            <p className="mt-xl">
              <Link href="/" className="btn btn-secondary">Back to Home</Link>
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  // Show loading state while checking invite
  if (inviteToken && inviteChecking) {
    return (
      <Layout title="Sign Up" description="Create your AI-AMP account">
        <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <p>Validating your invitation...</p>
          </div>
        </section>
      </Layout>
    );
  }

  // Show error if invite is invalid
  if (inviteToken && inviteValid === false) {
    return (
      <Layout title="Invalid Invitation" description="This invitation is not valid">
        <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ maxWidth: '500px', textAlign: 'center' }}>
            <h1 className="mb-lg">Invalid Invitation</h1>
            <div className="card">
              <p style={{ color: '#c00' }}>{inviteError}</p>
              <p className="text-light mt-lg" style={{ fontSize: '0.9rem' }}>
                If you believe this is an error, please contact us for a new invitation.
              </p>
            </div>
            <p className="mt-xl">
              <Link href="/signup" className="btn btn-secondary">Request Access Instead</Link>
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title="Sign Up" description="Create your AI-AMP account">
      <section className="section">
        <div className="container" style={{ maxWidth: '600px' }}>
          <h1 className="text-center mb-lg">Create Your Account</h1>

          {isInvited ? (
            <div style={{
              padding: 'var(--spacing-md)',
              backgroundColor: '#e6fffa',
              border: '1px solid #0d9488',
              borderRadius: 'var(--border-radius)',
              marginBottom: 'var(--spacing-xl)',
              textAlign: 'center',
              color: '#0d9488'
            }}>
              You&apos;ve been invited! Complete the form below to get instant access.
            </div>
          ) : (
            <p className="text-center text-light mb-xl">
              Get started with AI-AMP. All fields are required.
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                padding: 'var(--spacing-md)',
                backgroundColor: '#fee',
                border: '1px solid #c00',
                borderRadius: 'var(--border-radius)',
                marginBottom: 'var(--spacing-lg)',
                color: '#c00'
              }}>
                {error}
              </div>
            )}

            {/* Account Information */}
            <div className="card mb-xl">
              <h3 className="mb-lg">Account Information</h3>

              <div style={fieldStyle}>
                <label htmlFor="email" style={labelStyle}>Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                <small className="text-light">You&apos;ll set your password after your account is approved.</small>
              </div>
            </div>

            {/* Personal Information */}
            <div className="card mb-xl">
              <h3 className="mb-lg">About You</h3>

              <div style={fieldStyle}>
                <label htmlFor="fullName" style={labelStyle}>Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label htmlFor="jobTitle" style={labelStyle}>Job Title</label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="e.g., VP of Engineering, CTO, Developer"
                />
              </div>
            </div>

            {/* Company Information */}
            <div className="card mb-xl">
              <h3 className="mb-lg">Company Information</h3>

              <div style={fieldStyle}>
                <label htmlFor="companyName" style={labelStyle}>Company Name</label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label htmlFor="companySize" style={labelStyle}>Company Size</label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select company size...</option>
                  {COMPANY_SIZES.map((size) => (
                    <option key={size.value} value={size.value}>{size.label}</option>
                  ))}
                </select>
              </div>

              <div style={fieldStyle}>
                <label htmlFor="industry" style={labelStyle}>Industry</label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select industry...</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind.value} value={ind.value}>{ind.label}</option>
                  ))}
                </select>
              </div>

              {formData.industry === 'Other' && (
                <div style={fieldStyle}>
                  <label htmlFor="industryOther" style={labelStyle}>Please specify your industry</label>
                  <input
                    id="industryOther"
                    name="industryOther"
                    type="text"
                    value={formData.industryOther}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
              )}
            </div>

            {/* AI Usage */}
            <div className="card mb-xl">
              <h3 className="mb-lg">AI Usage</h3>

              <div style={fieldStyle}>
                <label htmlFor="currentAiUsage" style={labelStyle}>
                  How do you currently use AI for software development?
                </label>
                <select
                  id="currentAiUsage"
                  name="currentAiUsage"
                  value={formData.currentAiUsage}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select current usage...</option>
                  {CURRENT_AI_USAGE.map((usage) => (
                    <option key={usage.value} value={usage.value}>{usage.label}</option>
                  ))}
                </select>
              </div>

              {formData.currentAiUsage === 'Other' && (
                <div style={fieldStyle}>
                  <label htmlFor="currentAiUsageOther" style={labelStyle}>
                    Please describe your current AI usage
                  </label>
                  <input
                    id="currentAiUsageOther"
                    name="currentAiUsageOther"
                    type="text"
                    value={formData.currentAiUsageOther}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
              )}

              <div style={fieldStyle}>
                <label htmlFor="desiredAiUsage" style={labelStyle}>
                  How would you like to use AI for software development?
                </label>
                <select
                  id="desiredAiUsage"
                  name="desiredAiUsage"
                  value={formData.desiredAiUsage}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select desired usage...</option>
                  {DESIRED_AI_USAGE.map((usage) => (
                    <option key={usage.value} value={usage.value}>{usage.label}</option>
                  ))}
                </select>
              </div>

              {formData.desiredAiUsage === 'Other' && (
                <div style={fieldStyle}>
                  <label htmlFor="desiredAiUsageOther" style={labelStyle}>
                    Please describe your desired AI usage
                  </label>
                  <input
                    id="desiredAiUsageOther"
                    name="desiredAiUsageOther"
                    type="text"
                    value={formData.desiredAiUsageOther}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-center mt-lg text-light" style={{ fontSize: '0.9rem' }}>
              By signing up, you agree to our terms of service and privacy policy.
            </p>

            <p className="text-center mt-lg">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
}
