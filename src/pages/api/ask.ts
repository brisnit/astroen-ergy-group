import type { APIRoute } from 'astro';
import { ask } from '../../lib/ask.ts';
import { askLimiter } from '../../lib/limiters.ts';
import { clientKey } from '../../lib/rate-limit.ts';

export const prerender = false;

const MAX_BODY = 2 * 1024;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ status: 'invalid', message: 'Send JSON.' }, 415);
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ status: 'invalid', message: 'Question is too long.' }, 413);

  let q: unknown;
  try {
    q = JSON.parse(raw)?.q;
  } catch {
    return json({ status: 'invalid', message: 'Invalid request.' }, 400);
  }
  if (typeof q !== 'string') return json({ status: 'invalid', message: 'Enter a question.' }, 400);

  const rate = askLimiter.check(clientKey(request, clientAddress));
  if (!rate.allowed) {
    return json({ status: 'rate_limited', retryAfterSeconds: rate.retryAfterSeconds }, 429, { 'Retry-After': String(rate.retryAfterSeconds) });
  }

  const result = await ask(q);
  // Handled outcomes (including "unconfigured" and "unavailable") return 200 with a status field;
  // only malformed requests use error codes.
  return json(result, result.status === 'invalid' ? 400 : 200);
};

export const ALL: APIRoute = () => json({ status: 'invalid', message: 'Method not allowed.' }, 405, { Allow: 'POST' });
