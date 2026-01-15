import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate a secure random token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

export default async function handler(req, res) {
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

  if (req.method === 'POST') {
    // Create a new invite
    const { email, notes, sendEmail = true } = req.body;

    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    const { data: invite, error } = await supabase
      .from('invites')
      .insert({
        token,
        email: email || null,
        notes: notes || null,
        created_by: adminProfile.email,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const inviteUrl = `https://ai-agent-management-platform.com/signup?invite=${token}`;

    // Send invite email if requested and email is provided
    let emailSent = false;
    let emailError = null;

    if (sendEmail && email) {
      try {
        await resend.emails.send({
          from: 'AI-AMP <noreply@ai-agent-management-platform.com>',
          to: email,
          subject: "You're Invited to AI-AMP",
          html: generateInviteEmailHtml(inviteUrl)
        });
        emailSent = true;
      } catch (err) {
        emailError = err.message;
      }
    }

    return res.status(200).json({
      success: true,
      invite,
      inviteUrl,
      emailSent,
      emailError
    });
  }

  if (req.method === 'GET') {
    // List all invites
    const { data: invites, error } = await supabase
      .from('invites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ invites });
  }

  if (req.method === 'DELETE') {
    // Delete/revoke an invite
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }

    const { error } = await supabase
      .from('invites')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

function generateInviteEmailHtml(inviteUrl) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%); padding: 32px 40px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700;">
                <span style="color: #ffffff;">AI-</span><span style="color: #14b8a6;">AMP</span>
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">AI Agent Management Platform</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 24px 0; color: #1a365d; font-size: 28px; font-weight: 700; line-height: 1.3;">
                You're Invited
              </h2>

              <p style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; line-height: 1.7;">
                You've been invited to join AI-AMP, the AI Agent Management Platform built for regulated industries.
              </p>

              <p style="margin: 0 0 32px 0; color: #1e293b; font-size: 16px; line-height: 1.7;">
                AI-AMP orchestrates teams of <strong>15 specialized AI agents</strong> with defined decision scopes, clear escalation paths, and complete accountability.
              </p>

              <!-- What Makes AI-AMP Different -->
              <div style="background-color: #f8fafc; padding: 28px; border-radius: 8px; border-left: 4px solid #0d9488; margin: 0 0 32px 0;">
                <h3 style="margin: 0 0 20px 0; color: #1a365d; font-size: 18px; font-weight: 600;">
                  What Makes AI-AMP Different
                </h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0; color: #1e293b; font-size: 15px; line-height: 1.6;">
                      <span style="color: #0d9488; font-weight: bold; margin-right: 10px;">01</span>
                      <strong>15 Specialized Agents</strong> - Each with defined decision scopes
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1e293b; font-size: 15px; line-height: 1.6;">
                      <span style="color: #0d9488; font-weight: bold; margin-right: 10px;">02</span>
                      <strong>TDD Mandatory</strong> - Tests first, 0 build errors before handoff
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1e293b; font-size: 15px; line-height: 1.6;">
                      <span style="color: #0d9488; font-weight: bold; margin-right: 10px;">03</span>
                      <strong>Independent Verification</strong> - No agent approves its own work
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1e293b; font-size: 15px; line-height: 1.6;">
                      <span style="color: #0d9488; font-weight: bold; margin-right: 10px;">04</span>
                      <strong>CISO + COMPLIANCE</strong> - Security and audit readiness built in
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Primary CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 8px 0 32px 0;">
                    <a href="${inviteUrl}" style="display: inline-block; padding: 16px 40px; background-color: #0d9488; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Accept Invitation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #64748b; font-size: 14px; text-align: center;">
                This invitation expires in 7 days.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 24px 40px; border-radius: 0 0 8px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                      <span>AI-</span><span style="color: #14b8a6;">AMP</span>
                    </p>
                    <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 13px; line-height: 1.5;">
                      Built for regulated industries.<br>Designed for accountability.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
