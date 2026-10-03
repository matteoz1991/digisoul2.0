import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createContactHandler } from './contact.mjs';
const payload = { name: 'Testperson', email: 'test@example.com', service: 'Webbplats', message: 'En lokal testförfrågan.', website: '' };
async function withHandler(mailer, run) {
  const handler = createContactHandler({ mailer, from: 'info@digisoul.se', origins: ['http://localhost'] });
  const server = http.createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const send = (body = payload, origin = 'http://localhost') => fetch(`http://127.0.0.1:${server.address().port}`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try { await run(send); } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}
test('fixed recipient, reply-to and success only after SMTP acceptance', async () => {
  let sent;
  await withHandler({ sendMail: async mail => { sent = mail; return { accepted: ['info@digisoul.se'] }; } }, async send => {
    const result = await send({ ...payload, to: 'attacker@example.com' });
    assert.equal(result.status, 200); assert.equal((await result.json()).ok, true);
    assert.equal(sent.to, 'info@digisoul.se'); assert.equal(sent.replyTo.address, payload.email);
  });
});
test('unconfigured service does not claim success', async () => {
  await withHandler(null, async send => { const result = await send(); assert.equal(result.status, 503); assert.equal((await result.json()).ok, false); });
});
test('rejects cross-origin, invalid fields and bots without sending', async () => {
  let calls = 0;
  await withHandler({ sendMail: async () => { calls++; } }, async send => {
    assert.equal((await send(payload, 'https://other.example')).status, 403);
    assert.equal((await send({ ...payload, email: 'invalid' })).status, 400);
    assert.equal((await send({ ...payload, name: 'Test\r\nBcc: attack' })).status, 400);
    assert.equal((await send({ ...payload, website: 'spam' })).status, 400);
    assert.equal((await send({ ...payload, message: 'x'.repeat(5001) })).status, 400);
    assert.equal(calls, 0);
  });
});
test('SMTP rejection and errors return failures', async () => {
  for (const sendMail of [async () => ({ accepted: [] }), async () => { throw new Error('private provider details'); }]) {
    await withHandler({ sendMail }, async send => { const result = await send(); assert.equal(result.status, 502); assert.ok(!(await result.text()).includes('private provider')); });
  }
});
test('limits repeat attempts', async () => {
  await withHandler(null, async send => { for (let i = 0; i < 5; i++) await send(); assert.equal((await send()).status, 429); });
});
