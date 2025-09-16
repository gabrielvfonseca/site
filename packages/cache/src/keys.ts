import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The keys for the cache.
 * @returns The keys for the cache.
 */
export const keys = () =>
  createEnv({
    server: {
      KV_REST_API_URL: z.url(),
      KV_REST_API_TOKEN: z.string(),
    },
    runtimeEnv: {
      KV_REST_API_URL: process.env.KV_REST_API_URL,
      KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    },
  });
