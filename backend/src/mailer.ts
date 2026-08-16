// All email credential handling lives here — never imported by the frontend.
import nodemailer from 'nodemailer';

// Escape user-supplied strings before embedding in HTML
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      'Missing SMTP configuration. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env'
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendContactEmail(opts: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const transport = createTransport();
  const to = process.env.CONTACT_EMAIL ?? 'vote4garishan@gmail.com';
  const safeName    = escapeHtml(opts.name);
  const safeEmail   = escapeHtml(opts.email);
  const safeMessage = escapeHtml(opts.message);

  await transport.sendMail({
    from:    `"Vote4Garishan Website" <${process.env.SMTP_USER}>`,
    replyTo: `"${opts.name}" <${opts.email}>`,
    to,
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
}
