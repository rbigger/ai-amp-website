import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const resend = new Resend("re_W3dqMYST_BUP7cwYLL4p3qPXBRuGTGvVR");

const featureLabels = {
  agents: '15 specialized agent roles',
  audit: 'Audit trails and traceability',
  recovery: 'Crash recovery (RESCUER)',
  soc2: 'SOC 2 roadmap',
  dashboard: 'Real-time dashboard',
  tdd: 'TDD enforcement'
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      clarity_rating,
      interesting_features,
      concerns,
      would_use,
      other_feedback,
      email
    } = req.body;

    // Validate required fields
    if (!clarity_rating || !would_use) {
      return res.status(400).json({ error: 'Please answer all required questions' });
    }

    // Save to Supabase
    const { data, error: dbError } = await supabase
      .from('survey_responses')
      .insert([{
        clarity_rating,
        interesting_features,
        concerns: concerns || null,
        would_use,
        other_feedback: other_feedback || null,
        email: email || null
      }])
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save response' });
    }

    // Format features for email
    const selectedFeatures = interesting_features
      .map(f => featureLabels[f] || f)
      .join('\n    - ') || 'None selected';

    // Send email notification
    const emailHtml = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d;">New Survey Response</h2>
        <p style="color: #64748b;">Submitted: ${new Date().toLocaleString()}</p>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1a365d; margin-top: 0;">1. How clear is the value proposition?</h3>
          <p style="font-size: 18px; color: ${clarity_rating === 'Very clear' ? '#16a34a' : clarity_rating === 'Somewhat clear' ? '#d97706' : '#dc2626'};">
            <strong>${clarity_rating}</strong>
          </p>

          <h3 style="color: #1a365d;">2. Interesting capabilities:</h3>
          <ul style="color: #1e293b;">
            ${interesting_features.length > 0
              ? interesting_features.map(f => `<li>${featureLabels[f] || f}</li>`).join('')
              : '<li>None selected</li>'
            }
          </ul>

          <h3 style="color: #1a365d;">3. Concerns or questions:</h3>
          <p style="color: #1e293b;">${concerns || '<em>No response</em>'}</p>

          <h3 style="color: #1a365d;">4. Would consider using?</h3>
          <p style="font-size: 18px; color: ${would_use === 'Yes' ? '#16a34a' : would_use === 'Maybe' ? '#d97706' : '#dc2626'};">
            <strong>${would_use}</strong>
          </p>

          <h3 style="color: #1a365d;">5. Other feedback:</h3>
          <p style="color: #1e293b;">${other_feedback || '<em>No response</em>'}</p>

          <h3 style="color: #1a365d;">6. Email for follow-up:</h3>
          <p style="color: #1e293b;">${email || '<em>Not provided</em>'}</p>
        </div>

        <p style="color: #94a3b8; font-size: 12px;">
          Response ID: ${data[0]?.id || 'unknown'}
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'AI-AMP Survey <noreply@ai-agent-management-platform.com>',
      to: 'roger@discoverie.us',
      subject: `Survey Response: ${clarity_rating} clarity, ${would_use} would use`,
      html: emailHtml
    });

    return res.status(200).json({ success: true, id: data[0]?.id });

  } catch (error) {
    console.error('Survey submission error:', error);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
