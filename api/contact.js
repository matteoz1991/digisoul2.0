import { createMailer, createContactHandler } from '../contact.mjs';

export default function handler(req, res) {
  const origins = ['https://digisoul.se', 'https://www.digisoul.se'];
  if (process.env.VERCEL_URL) origins.push(`https://${process.env.VERCEL_URL}`);
  if (process.env.SITE_ORIGIN) origins.push(process.env.SITE_ORIGIN);
  return createContactHandler({
    mailer: createMailer(),
    from: process.env.MAIL_FROM || 'info@digisoul.se',
    origins,
    getClientIp: request => request.headers['x-vercel-forwarded-for']?.split(',')[0]?.trim(),
  })(req, res);
}
