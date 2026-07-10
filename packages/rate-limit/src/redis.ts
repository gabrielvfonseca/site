import { Redis } from '@upstash/redis';
import { keys } from './keys';

const config = keys();
/**
 * The redis client for the cache. Created only when KV env vars are set;
 * applications that import this module should handle the case where redis
 * is undefined (e.g. rate-limiting becomes a no-op).
 */
export const redis =
  config.KV_REST_API_URL && config.KV_REST_API_TOKEN
    ? new Redis({
        url: config.KV_REST_API_URL,
        token: config.KV_REST_API_TOKEN,
      })
    : undefined;
