import type { NextRequest } from 'next/server';
import { env } from '@/config/env';

/** Result of a rate-limit check. */
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/** Minimal structural type for an Upstash limiter (avoids eager redis import). */
type Limiter = {
  limit: (identifier: string) => Promise<RateLimitResult>;
};

interface RateLimitOptions {
  /** Namespace prefix for the limiter (keeps buckets independent). */
  prefix?: string;
  /** Allowed requests within the window. */
  requests?: number;
  /** Sliding window duration, e.g. `'60 s'` or `'1 m'`. */
  window?: `${number} ${'s' | 'm' | 'h'}`;
}

const MS_PER_SECOND = 1000;
const DEFAULT_REQUESTS = 60;
const DEFAULT_WINDOW = '60 s' as const;

// Limiters are cached per-prefix so we reuse a single Redis-backed instance.
const limiters = new Map<string, Limiter>();

/** Best-effort client IP from proxy headers. */
function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return (
    forwarded?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous'
  );
}

/**
 * Rate-limit a request by client IP. No-ops (returns `null`) when Vercel KV /
 * Upstash Redis is not configured, so local dev is unaffected.
 * @param request - The incoming request.
 * @param options - Optional prefix / limit / window overrides.
 * @returns The limit result, or `null` when rate limiting is disabled.
 */
export async function checkRateLimit(
  request: NextRequest,
  options: RateLimitOptions = {}
): Promise<RateLimitResult | null> {
  if (!env.UPSTASH_REDIS_REST_URL) {
    return null;
  }

  const prefix = options.prefix ?? 'gabfon:web';
  let limiter = limiters.get(prefix);

  if (!limiter) {
    try {
      const { createRateLimiter, slidingWindow } = await import(
        '@gabfon/rate-limit'
      );
      limiter = createRateLimiter({
        prefix,
        limiter: slidingWindow(
          options.requests ?? DEFAULT_REQUESTS,
          options.window ?? DEFAULT_WINDOW
        ),
      }) as unknown as Limiter;
      limiters.set(prefix, limiter);
    } catch {
      return null;
    }
  }

  try {
    return limiter.limit(clientIp(request));
  } catch {
    return null;
  }
}

/** Standard `RateLimit-*` / `Retry-After` response headers for a result. */
export function rateLimitHeaders(
  result: RateLimitResult
): Record<string, string> {
  const retryAfter = Math.max(
    0,
    Math.ceil((result.reset - Date.now()) / MS_PER_SECOND)
  );
  return {
    'RateLimit-Limit': String(result.limit),
    'RateLimit-Remaining': String(Math.max(0, result.remaining)),
    'RateLimit-Reset': String(retryAfter),
    'Retry-After': String(retryAfter),
  };
}
