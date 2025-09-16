import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The keys for the database.
 * @returns The keys for the database.
 */
export const keys = () =>
  createEnv({
    server: {
      DATABASE_URL: z.string().startsWith('postgres://'),
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
  });
