import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Insert subscriber
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email })
      .select()
      .single();

    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        return res.status(400).json({ error: 'This email is already subscribed' });
      }
      throw error;
    }

    // Send welcome email
    let emailSent = false;
    let emailError = null;
    try {
      await resend.emails.send({
        from: 'AI-AMP <noreply@ai-agent-management-platform.com>',
        to: email,
        subject: 'Welcome to the AI-AMP Newsletter',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #1a1a1a; margin-bottom: 24px;">Welcome to AI-AMP</h1>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
              Thanks for subscribing to our newsletter. You're now on the list to receive updates about:
            </p>
            <ul style="color: #4a4a4a; font-size: 16px; line-height: 1.8;">
              <li>Product updates and new features</li>
              <li>AI governance insights and best practices</li>
              <li>Early access opportunities</li>
            </ul>
            <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
              We won't spam you. Expect updates when we have something meaningful to share.
            </p>
            <p style="margin-top: 32px;">
              <a href="https://ai-agent-management-platform.com" style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 6px;">Visit AI-AMP</a>
            </p>
            <p style="color: #888; font-size: 14px; margin-top: 40px;">
              AI-AMP - AI Development You Can Trust
            </p>
          </div>
        `
      });
      emailSent = true;
    } catch (err) {
      emailError = err.message;
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed',
      emailSent,
      emailError
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
}
