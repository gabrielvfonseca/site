import { Redis } from '@upstash/redis';
import { keys } from './keys';

/**
 * The redis client for the cache.
 * @returns The redis client for the cache.
 */
export const redis = new Redis({
  url: keys().UPSTASH_REDIS_REST_URL,
  token: keys().UPSTASH_REDIS_REST_TOKEN,
});
