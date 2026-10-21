/**
 * Fixed-window, in-memory rate limiter keyed by client address.
 * Suitable for a single Node process. If the site runs on several instances,
 * replace with a shared store (e.g. Redis) so limits apply across them.
 */
export interface RateLimiter {
  check(key: string): { allowed: boolean; retryAfterSeconds: number };
}

export function createRateLimiter(limit: number, windowMs: number): RateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return {
    check(key) {
      const now = Date.now();
      if (hits.size > 5000) {
        for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
      }
      const entry = hits.get(key);
      if (!entry || entry.resetAt <= now) {
        hits.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true, retryAfterSeconds: 0 };
      }
      entry.count += 1;
      const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
      return { allowed: entry.count <= limit, retryAfterSeconds };
    },
  };
}

/** Best-effort client key. Behind a proxy, x-forwarded-for's first entry is the client. */
export function clientKey(request: Request, clientAddress?: string): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || clientAddress || 'unknown';
}
