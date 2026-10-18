import { createMailer } from '../contact.mjs';
import { createReviewHandler } from '../review.mjs';

const origins = ['https://digisoul.se', 'https://www.digisoul.se'];
if (process.env.VERCEL_URL) origins.push(`https://${process.env.VERCEL_URL}`);
if (process.env.SITE_ORIGIN) origins.push(process.env.SITE_ORIGIN);

export default createReviewHandler({
  mailer: createMailer(),
  from: process.env.MAIL_FROM || 'info@digisoul.se',
  origins,
  getClientIp: request => request.headers['x-vercel-forwarded-for']?.split(',')[0]?.trim(),
});
