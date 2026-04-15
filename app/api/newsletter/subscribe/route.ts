import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const BodySchema = z.object({
  email: z.string().email(),
});

/**
 * POST /api/newsletter/subscribe
 * Adds the email to the Resend audience (if RESEND_AUDIENCE_ID is set)
 * and sends a welcome confirmation email.
 */
export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Newsletter not configured' }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const parsed = BodySchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Valid email address required' }, { status: 400 });
  }

  const { email } = parsed.data;

  // Add to Resend Audience (mailing list) — optional, only if configured
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    }).catch(() => {
      // Non-fatal — still send the confirmation email
    });
  }

  // Send welcome confirmation email
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'DesignPulse <newsletter@designpulse.io>';
  const { error } = await resend.emails.send({
    from:    fromAddress,
    to:      email,
    subject: "You're in — welcome to DesignPulse",
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#F5F6FA;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F6FA;padding:40px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0F3460;padding:32px 40px 28px;">
            <h1 style="margin:0;font-size:26px;font-weight:800;color:#fff;letter-spacing:-0.5px;">
              Design<span style="color:#E94560;">Pulse</span>
            </h1>
            <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.6);">Your weekly design digest</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#1A1A2E;">You're subscribed!</h2>
            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4B5563;">
              Welcome to the DesignPulse community. Every Thursday you'll get the best in design —
              hand-picked articles, new tools, upcoming events, and opinions that matter.
            </p>
            <table cellpadding="0" cellspacing="0" style="background:#F5F6FA;border-radius:12px;padding:20px 24px;margin-bottom:24px;width:100%;">
              <tr>
                <td style="font-size:13px;color:#6B7280;padding-bottom:8px;">📬 &nbsp;<strong style="color:#1A1A2E;">Every Thursday</strong> — no spam, ever</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#6B7280;padding-bottom:8px;">🎨 &nbsp;<strong style="color:#1A1A2E;">Curated daily</strong> from 50+ design sources</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#6B7280;">🔕 &nbsp;<strong style="color:#1A1A2E;">Unsubscribe any time</strong> — one click, no questions</td>
              </tr>
            </table>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://designpulse.io'}"
               style="display:inline-block;background:#E94560;color:#fff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:10px;text-decoration:none;">
              Explore DesignPulse →
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px 28px;border-top:1px solid #F0F0F0;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.5;">
              You subscribed with <strong>${email}</strong>.<br />
              © 2026 DesignPulse. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `.trim(),
  });

  if (error) {
    console.error('[newsletter/subscribe] Resend error:', error);
    return NextResponse.json({ error: 'Failed to send confirmation email' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
