// All email credential handling lives here — never imported by the frontend.
import { Resend } from 'resend';

// Escape user-supplied strings before embedding in HTML
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function createResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY in .env');
  }
  return new Resend(apiKey);
}

export async function sendContactEmail(opts: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const resend = createResendClient();
  const to = process.env.CONTACT_EMAIL ?? 'vote4garishan@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';
  const safeName    = escapeHtml(opts.name);
  const safeEmail   = escapeHtml(opts.email);
  const safeMessage = escapeHtml(opts.message);

  const result = await resend.emails.send({
    from: `Vote4Garishan Website <${from}>`,
    to,
    replyTo: opts.email,
    subject: `Message from ${opts.name} — campaign website`,
    text: [
      `Name:    ${opts.name}`,
      `Email:   ${opts.email}`,
      ``,
      `Message:`,
      opts.message,
    ].join('\n'),
    html: `
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <hr>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${safeMessage}</p>
    `,
  });

  if (result.error) {
    throw new Error(result.error.message || 'Resend API request failed');
  }
}
