import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The keys for the security.
 * @returns The keys for the security.
 */
export const keys = (): ReturnType<typeof createEnv> =>
  createEnv({
    server: {
      ARCJET_KEY: z.string().min(1).startsWith('ajkey_').optional(),
    },
    runtimeEnv: {
      ARCJET_KEY: process.env.ARCJET_KEY,
    },
  });
