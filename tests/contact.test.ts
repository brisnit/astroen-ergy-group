import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readValues, validate, looksAutomated, deliver, deliveryConfigured, handleSubmission } from '../src/lib/contact.ts';

const good = { name: 'Pat Lee', email: 'pat@example.org', organization: 'Valley USD', improve: 'Our energy bills keep rising every year.' };

test('valid submissions pass validation', () => {
  assert.deepEqual(validate(readValues(good)), {});
});

test('required fields and formats are enforced', () => {
  const e = validate(readValues({ email: 'nope' }));
  assert.ok(e.name && e.email && e.organization && e.improve);
  assert.ok(validate(readValues({ ...good, phone: 'call me' })).phone);
  assert.ok(validate(readValues({ ...good, topic: 'made-up' })).topic);
  assert.equal(validate(readValues({ ...good, phone: '(619) 555-0100' })).phone, undefined);
});

test('account-number-like content is refused, ordinary phone numbers are not', () => {
  assert.ok(validate(readValues({ ...good, improve: 'Account 1234 5678 9012 has high bills' })).improve);
  assert.equal(validate(readValues({ ...good, improve: 'Call me at 619-555-0100 about our chiller' })).improve, undefined);
});

test('spam checks', () => {
  const now = Date.now();
  assert.equal(looksAutomated({ startedAt: String(now - 10_000) }, now), false);
  assert.equal(looksAutomated({ startedAt: String(now - 500) }, now), true);
  assert.equal(looksAutomated({ startedAt: String(now - 10_000), website: 'x' }, now), true);
  assert.equal(looksAutomated({}, now), true);
});

test('without a delivery integration, nothing is reported as sent', async () => {
  const env = {} as NodeJS.ProcessEnv;
  assert.equal(deliveryConfigured(env), null);
  assert.deepEqual(await deliver(readValues(good), env), { ok: false, reason: 'unconfigured' });
});

test('a failing webhook is reported as failed', async () => {
  const env = { CONTACT_WEBHOOK_URL: 'http://127.0.0.1:9/unreachable' } as NodeJS.ProcessEnv;
  assert.equal(deliveryConfigured(env), 'webhook');
  const r = await deliver(readValues(good), env);
  assert.deepEqual(r, { ok: false, reason: 'failed' });
});

test('rate-limited submissions are not processed', async () => {
  const { outcome } = await handleSubmission({ ...good, startedAt: String(Date.now() - 10_000) }, false);
  assert.equal(outcome.status, 'rate_limited');
});
