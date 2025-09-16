import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The keys for the security.
 * @returns The keys for the security.
 */
export const keys = () =>
  createEnv({
    server: {
      ARCJET_KEY: z.string().startsWith('ajkey_'),
    },
    runtimeEnv: {
      ARCJET_KEY: process.env.ARCJET_KEY,
    },
  });
