import { Ratelimit, type RatelimitConfig } from '@upstash/ratelimit';
import { redis } from './redis';

/**
 * Creates a rate limiter using the Redis cache.
 * Throws when KV_REST_API_URL / KV_REST_API_TOKEN are not configured.
 * @param props - The rate limiter configuration.
 * @returns The rate limiter.
 */
export const createRateLimiter = (props: Omit<RatelimitConfig, 'redis'>) => {
  if (!redis) {
    throw new Error(
      'Rate limiting requires KV_REST_API_URL and KV_REST_API_TOKEN env vars.'
    );
  }
  return new Ratelimit({
    redis,
    limiter: props.limiter ?? Ratelimit.slidingWindow(10, '10 s'),
    prefix: props.prefix ?? 'gabfon',
  });
};

/**
 * The sliding window rate limiting algorithm.
 */
export const { slidingWindow } = Ratelimit;
