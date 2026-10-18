const recipient = 'info@digisoul.se';

export function createReviewHandler({ mailer, from, origins, getClientIp }) {
  const requests = new Map();
  const reply = (res, status, message) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ ok: status === 200, message }));
  };
  return async (req, res) => {
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return reply(res, 405, 'Använd formuläret för att lämna ett omdöme.'); }
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
        if (Buffer.byteLength(JSON.stringify(req.body)) > 8192) return reply(res, 413, 'Omdömet är för långt.');
        data = req.body;
      } else {
        let size = 0; const chunks = [];
        for await (const chunk of req) { size += chunk.length; if (size > 8192) { reply(res, 413, 'Omdömet är för långt.'); return; } chunks.push(chunk); }
        data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      }
    } catch { return reply(res, 400, 'Omdömet kunde inte läsas.'); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(res, 400, 'Ogiltig förfrågan.');
    const { betyg, namn, foretag, text, samtycke, saljare, profil, gotcha } = data;
    if (gotcha) return reply(res, 400, 'Förfrågan kunde inte godkännas.');
    if (!Number.isInteger(betyg) || betyg < 1 || betyg > 5
      || typeof namn !== 'string' || !namn.trim() || namn.length > 80 || /[\r\n\x00]/.test(namn)
      || typeof foretag !== 'string' || foretag.length > 120 || /[\r\n\x00]/.test(foretag)
      || typeof text !== 'string' || !text.trim() || text.length > 1200
      || samtycke !== true
      || typeof saljare !== 'string' || !/^[a-z0-9-]{2,40}$/.test(saljare)
      || typeof profil !== 'string' || !/^[a-z0-9-]{2,60}$/.test(profil) || !profil.startsWith(saljare + '-'))
      return reply(res, 400, 'Kontrollera betyg, namn, omdöme och samtycke.');
    if (!mailer || !from) return reply(res, 503, 'Formuläret är inte anslutet ännu. Mejla info@digisoul.se i stället.');
    try {
      const result = await mailer.sendMail({
        from, to: recipient,
        subject: `Nytt omdöme för ${saljare}`,
        text: `Nytt omdöme via Digisoul Media\n\nProfil: ${profil}\nSäljare: ${saljare}\nBetyg: ${betyg} av 5\nNamn: ${namn.trim()}\nFöretag: ${foretag.trim() || 'Ej angivet'}\nSamtycke till publicering: Ja\n\nOmdöme:\n${text.trim()}\n\nGranska och godkänn innan publicering.`,
      });
      if (!result.accepted?.some(address => String(address).toLowerCase() === recipient)) throw new Error('Recipient rejected');
      return reply(res, 200, 'Tack! Ditt omdöme har skickats för granskning.');
    } catch { return reply(res, 502, 'Mejltjänsten kunde inte bekräfta utskicket. Försök senare eller mejla info@digisoul.se.'); }
  };
}
