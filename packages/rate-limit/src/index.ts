import { Ratelimit, type RatelimitConfig } from '@upstash/ratelimit';
import { redis } from './redis';

/**
 * Creates a rate limiter using the Redis cache.
 * Throws when UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are not configured.
 * @param props - The rate limiter configuration.
 * @returns The rate limiter.
 */
export const createRateLimiter = (props: Omit<RatelimitConfig, 'redis'>) => {
  if (!redis) {
    throw new Error(
      'Rate limiting requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars.'
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
