import { redis } from '@gabfon/cache';
import { Ratelimit, type RatelimitConfig } from '@upstash/ratelimit';

/**
 * Creates a rate limiter using the Redis cache.
 * @param props - The rate limiter configuration.
 * @returns The rate limiter.
 */
export const createRateLimiter = (props: Omit<RatelimitConfig, 'redis'>) =>
  new Ratelimit({
    redis,
    limiter: props.limiter ?? Ratelimit.slidingWindow(10, '10 s'),
    prefix: props.prefix ?? 'site-app',
  });

/**
 * The sliding window rate limiting algorithm.
 */
export const { slidingWindow } = Ratelimit;
