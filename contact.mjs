import nodemailer from 'nodemailer';

export function createMailer(env = process.env) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !env.MAIL_FROM) return null;
  const port = Number(env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: env.SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    disableFileAccess: true, disableUrlAccess: true,
  });
}

export function createContactHandler({ mailer, from, origins, getClientIp }) {
  const requests = new Map();
  const reply = (res, status, message) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ ok: status === 200, message }));
  };
  return async (req, res) => {
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return reply(res, 405, 'Använd formuläret för att skicka en förfrågan.'); }
    if (!origins.includes(req.headers.origin) || req.headers['sec-fetch-site'] === 'cross-site') return reply(res, 403, 'Förfrågan kunde inte godkännas. Ladda om sidan och försök igen.');
    if (!req.headers['content-type']?.startsWith('application/json')) return reply(res, 415, 'Ogiltigt format.');
    const now = Date.now();
    for (const [key, value] of requests) if (value.until <= now) requests.delete(key);
    const ip = getClientIp?.(req) || req.socket?.remoteAddress || 'unknown';
    const entry = requests.get(ip) || { count: 0, until: now + 15 * 60 * 1000 };
    if (entry.count >= 5 || (!requests.has(ip) && requests.size >= 10000)) { res.setHeader('Retry-After', '900'); return reply(res, 429, 'För många försök. Vänta en stund eller mejla info@digisoul.se.'); }
    entry.count++; requests.set(ip, entry);
    let data;
    try {
      if (req.body !== undefined) {
        if (Buffer.byteLength(JSON.stringify(req.body)) > 16384) return reply(res, 413, 'Meddelandet är för långt.');
        data = req.body;
      } else {
        let size = 0; const chunks = [];
        for await (const chunk of req) { size += chunk.length; if (size > 16384) { reply(res, 413, 'Meddelandet är för långt.'); return; } chunks.push(chunk); }
        data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      }
    } catch { return reply(res, 400, 'Förfrågan kunde inte läsas.'); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(res, 400, 'Ogiltig förfrågan.');
    const { name, email, message, service, website } = data;
    if (website) return reply(res, 400, 'Förfrågan kunde inte godkännas.');
    if (typeof name !== 'string' || !name.trim() || name.length > 120 || /[\r\n\x00]/.test(name)
      || typeof email !== 'string' || email.length > 254 || !/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(email)
      || typeof message !== 'string' || !message.trim() || message.length > 5000
      || !['Webbplats', 'Identitet', 'Annat'].includes(service)) return reply(res, 400, 'Kontrollera namn, e-post och meddelande (högst 5 000 tecken).');
    if (!mailer || !from) return reply(res, 503, 'Formuläret är inte anslutet ännu. Mejla info@digisoul.se så hjälper vi er.');
    try {
      const result = await mailer.sendMail({
        from, to: 'info@digisoul.se', replyTo: { name: name.trim(), address: email },
        subject: `Projektförfrågan: ${service}`,
        text: `Ny förfrågan via Digisoul Media\n\nNamn: ${name.trim()}\nE-post: ${email}\nIntresse: ${service}\n\n${message.trim()}`,
      });
      if (!result.accepted?.some(address => String(address).toLowerCase() === 'info@digisoul.se')) throw new Error('Recipient rejected');
      return reply(res, 200, 'Tack! Din förfrågan har skickats till oss.');
    } catch { return reply(res, 502, 'Mejltjänsten kunde inte bekräfta utskicket. Försök senare eller kontakta info@digisoul.se.'); }
  };
}
