import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createReviewHandler } from './review.mjs';

const payload = { betyg: 5, namn: 'Testperson', foretag: 'Exempel AB', text: 'Ett testomdöme.', samtycke: true, saljare: 'sara', profil: 'sara-jecm69', gotcha: '' };
async function withHandler(mailer, run) {
  const server = http.createServer(createReviewHandler({ mailer, from: 'info@digisoul.se', origins: ['http://localhost'] }));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const send = (body = payload, origin = 'http://localhost') => fetch(`http://127.0.0.1:${server.address().port}`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try { await run(send); } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}

test('mejlar Saras omdöme enbart till Sara efter SMTP-bekräftelse', async () => {
  let sent;
  await withHandler({ sendMail: async mail => { sent = mail; return { accepted: ['sara@digisoul.se'] }; } }, async send => {
    const result = await send({ ...payload, to: 'other@example.com' });
    assert.equal(result.status, 200);
    assert.equal(sent.to, 'sara@digisoul.se');
    assert.match(sent.text, /Sara|sara/);
    assert.match(sent.text, /5 av 5/);
    assert.match(sent.text, /Granska och godkänn/);
  });
});

test('nekar otillåten avsändare, bot, saknat samtycke och ogiltiga fält', async () => {
  let calls = 0;
  const mailer = { sendMail: async () => { calls++; } };
  await withHandler(mailer, async send => assert.equal((await send(payload, 'https://other.example')).status, 403));
  for (const invalid of [
    { betyg: 6 }, { namn: 'Test\r\nBcc: other@example.com' }, { text: '' },
    { samtycke: false }, { profil: 'other-jecm69' }, { saljare: 'anna', profil: 'anna-example' }, { gotcha: 'spam' },
  ]) await withHandler(mailer, async send => assert.equal((await send({ ...payload, ...invalid })).status, 400));
  assert.equal(calls, 0);
});

test('visar inte falsk framgång vid saknad SMTP eller avvisat mejl', async () => {
  await withHandler(null, async send => assert.equal((await send()).status, 503));
  await withHandler({ sendMail: async () => ({ accepted: [] }) }, async send => assert.equal((await send()).status, 502));
});

test('begränsar antal försök', async () => {
  await withHandler(null, async send => {
    for (let i = 0; i < 5; i++) await send();
    assert.equal((await send()).status, 429);
  });
});
