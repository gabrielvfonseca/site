import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The keys for the database package (Neon Postgres connection string).
 * @returns The validated database environment keys.
 */
export const keys = () =>
  createEnv({
    server: {
      DATABASE_URL: z.string().url(),
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
    emptyStringAsUndefined: true,
    skipValidation: !process.env.SKIP_ENV_VALIDATION,
  });
