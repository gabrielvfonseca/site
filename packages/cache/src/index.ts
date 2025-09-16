import { Redis } from '@upstash/redis';
import { keys } from './keys';

/**
 * The redis client for the cache.
 * @returns The redis client for the cache.
 */
export const redis = new Redis({
  url: keys().KV_REST_API_URL,
  token: keys().KV_REST_API_TOKEN,
});
