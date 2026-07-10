import { Redis } from '@upstash/redis';
import { keys } from './keys';

const config = keys();
/**
 * The redis client for the cache. Created only when KV env vars are set;
 * applications that import this module should handle the case where redis
 * is undefined (e.g. rate-limiting becomes a no-op).
 */
export const redis =
  config.UPSTASH_REDIS_REST_URL && config.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: config.UPSTASH_REDIS_REST_URL,
        token: config.UPSTASH_REDIS_REST_TOKEN,
      })
    : undefined;
