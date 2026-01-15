import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = createClient({ req, res });

  // Check if user is authenticated and has admin role
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { data: adminProfile } = await supabase
    .from('user_profiles')
    .select('role, email')
    .eq('id', user.id)
    .single();

  if (!adminProfile || adminProfile.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  // Approve the user
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      approved: true,
      approved_at: new Date().toISOString(),
      approved_by: adminProfile.email
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Trigger password reset email via Supabase (no service role key needed)
  let resetEmailSent = false;
  let resetError = null;

  try {
    const { error: passwordResetError } = await supabase.auth.resetPasswordForEmail(
      data.email,
      { redirectTo: 'https://ai-agent-management-platform.com/set-password' }
    );

    if (passwordResetError) {
      resetError = passwordResetError.message;
    } else {
      resetEmailSent = true;
    }
  } catch (err) {
    resetError = err.message;
  }

  // Send supplementary welcome email via Resend
  let welcomeEmailSent = false;
  try {
    await resend.emails.send({
      from: 'AI-AMP <noreply@ai-agent-management-platform.com>',
      to: data.email,
      subject: 'Welcome to AI-AMP - Your Account is Approved',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #1a365d; margin-bottom: 24px;">Welcome to AI-AMP!</h1>
          <p style="color: #1e293b; font-size: 16px; line-height: 1.6;">Hi ${data.full_name || 'there'},</p>
          <p style="color: #1e293b; font-size: 16px; line-height: 1.6;">Great news! Your account has been approved.</p>
          <p style="color: #1e293b; font-size: 16px; line-height: 1.6;">You should receive a separate email with a link to set your password. Once you've set your password, you'll have full access to AI-AMP.</p>
          <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-top: 24px;">If you don't see the password email, check your spam folder or visit <a href="https://ai-agent-management-platform.com/forgot-password" style="color: #0d9488;">forgot password</a> to request a new link.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
          <p style="color: #64748b; font-size: 14px;">
            AI-AMP - AI Agent Management Platform<br>
            Built for regulated industries. Designed for accountability.
          </p>
        </div>
      `
    });
    welcomeEmailSent = true;
  } catch (err) {
    // Non-critical - password reset email is the important one
    console.error('Failed to send welcome email:', err.message);
  }

  return res.status(200).json({
    success: true,
    message: `User ${data.email} approved`,
    user: data,
    resetEmailSent,
    welcomeEmailSent,
    resetError
  });
}
