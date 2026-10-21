import { createRateLimiter } from './rate-limit.ts';

const askPerMinute = Number(process.env.ASK_RATE_LIMIT_PER_MIN) || 8;

/** Shared across the contact page POST and /api/contact. */
export const contactLimiter = createRateLimiter(5, 10 * 60 * 1000);
export const askLimiter = createRateLimiter(askPerMinute, 60 * 1000);
