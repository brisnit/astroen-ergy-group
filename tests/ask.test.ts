import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ask, tidyAnswer, introducesFigures } from '../src/lib/ask.ts';

test('without an API key, ask reports unconfigured instead of inventing an answer', async () => {
  delete process.env.ANTHROPIC_API_KEY;
  assert.deepEqual(await ask('What does Eco-1 monitor?'), { status: 'unconfigured' });
});

test('questions with no supporting content never reach the model', async () => {
  process.env.ANTHROPIC_API_KEY = 'test-key-not-used';
  assert.deepEqual(await ask('best pizza recipe'), { status: 'no_context' });
  delete process.env.ANTHROPIC_API_KEY;
});

test('input validation', async () => {
  assert.equal((await ask('')).status, 'invalid');
  assert.equal((await ask(17)).status, 'invalid');
});

test('answers are stripped of links and markdown and bounded in length', () => {
  assert.equal(tidyAnswer('**Yes.** See https://evil.example now.'), 'Yes. See now.');
  assert.ok(tidyAnswer('Sentence one. '.repeat(200)).length <= 900);
});

test('invented money or percentage figures are detected', () => {
  assert.equal(introducesFigures('Most clients save 30% a year.', 'Monitoring shows energy use.'), true);
  assert.equal(introducesFigures('Audits cost $5,000.', 'No prices here.'), true);
  assert.equal(introducesFigures('Eco-1 records power factor.', 'Eco-1 records power factor.'), false);
});
