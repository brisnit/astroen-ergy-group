import type { APIRoute } from 'astro';
import { handleSubmission } from '../../lib/contact.ts';
import { contactLimiter } from '../../lib/limiters.ts';
import { clientKey } from '../../lib/rate-limit.ts';

export const prerender = false;

const MAX_BODY = 16 * 1024;

const json = (body: unknown, status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_BODY) return json({ status: 'rejected', message: 'Request too large.' }, 413);

  let source: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY) return json({ status: 'rejected', message: 'Request too large.' }, 413);
    source = JSON.parse(raw);
    if (!source || typeof source !== 'object' || Array.isArray(source)) throw new Error('not an object');
  } catch {
    return json({ status: 'rejected', message: 'Invalid request.' }, 400);
  }

  const rate = contactLimiter.check(clientKey(request, clientAddress));
  const { outcome } = await handleSubmission(source, rate.allowed);
  const statusCode = {
    sent: 200,
    invalid: 422,
    rate_limited: 429,
    rejected: 400,
    unconfigured: 503,
    failed: 502,
  }[outcome.status];
  const headers: Record<string, string> = rate.allowed ? {} : { 'Retry-After': String(rate.retryAfterSeconds) };
  return json(outcome, statusCode, headers);
};

export const ALL: APIRoute = () => json({ status: 'rejected', message: 'Method not allowed.' }, 405, { Allow: 'POST' });
