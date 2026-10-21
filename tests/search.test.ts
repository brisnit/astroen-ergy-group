import { test } from 'node:test';
import assert from 'node:assert/strict';
import { search, stem, editDistance, cleanQuery } from '../src/lib/search.ts';
import { passages } from '../src/lib/search-index.ts';

const topUrl = (q: string) => search(q).results[0]?.url ?? '';

test('natural-language questions reach the right page', () => {
  assert.match(topUrl('Where should we start if our energy bills keep increasing?'), /faq-rising-bills|energy-audits/);
  assert.match(topUrl('What is the difference between an audit and energy modeling?'), /audit-vs-modeling/);
  assert.match(topUrl('Can you help us plan upgrades for aging equipment?'), /aging-equipment|design-build/);
  assert.match(topUrl('What does Eco-1 monitor?'), /monitoring-verification/);
  assert.match(topUrl('What funding options should we discuss?'), /funding/);
  assert.match(topUrl('Do you work with schools?'), /industries\/education/);
});

test('keywords and synonyms', () => {
  assert.match(topUrl('hospital'), /industries\/healthcare/);
  assert.match(topUrl('rebates'), /funding/);
  assert.match(topUrl('m&v'), /monitoring-verification|closeout/);
  assert.match(topUrl('k-12'), /education/);
  assert.match(topUrl('phone number'), /contact/);
});

test('misspellings are corrected', () => {
  const r = search('asessment');
  assert.equal(r.correctedQuery, 'assessment');
  assert.match(r.results[0].url, /energy-audits/);
  assert.match(topUrl('equst'), /energy-modeling/);
});

test('off-topic queries return nothing', () => {
  assert.equal(search('pizza recipe').results.length, 0);
  assert.equal(search('best pizza recipe').results.length, 0);
  assert.equal(search('   ').results.length, 0);
  assert.equal(search('the and of').results.length, 0);
});

test('snippets carry highlight marks as plain text parts', () => {
  const r = search('commissioning');
  assert.ok(r.results.length > 0);
  assert.ok(r.results[0].snippet.some((p) => p.mark));
  for (const p of r.results[0].snippet) assert.equal(typeof p.text, 'string');
});

test('queries are cleaned and bounded', () => {
  assert.equal(cleanQuery('a\u0000b\nc'), 'a b c');
  assert.equal(cleanQuery('x'.repeat(500)).length, 200);
  assert.equal(cleanQuery(42), '');
  // Markup in a query is treated as text, not executed or matched as HTML.
  assert.doesNotThrow(() => search('<script>alert(1)</script> audit'));
});

test('helpers', () => {
  assert.equal(stem('audits'), 'audit');
  assert.equal(stem('monitoring'), 'monitor');
  assert.equal(stem('facilities'), 'facility');
  assert.equal(editDistance('equst', 'equest'), 1);
  assert.equal(editDistance('teh', 'the'), 1);
});

test('every passage links to a real site path', () => {
  const ids = new Set<string>();
  for (const p of passages) {
    assert.match(p.url, /^\/[a-z0-9\-/]*\/?(#[a-z0-9-]+)?$/, p.url);
    assert.ok(!ids.has(p.id), `duplicate passage id ${p.id}`);
    ids.add(p.id);
  }
});
