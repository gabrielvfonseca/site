import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The keys for the database.
 * @returns The keys for the database.
 */
export const keys = () => {
  // If DATABASE_URL is not available, return a default value
  if (!process.env.DATABASE_URL) {
    return {
      DATABASE_URL: 'postgres://default:default@default:5432/default',
    };
  }

  return createEnv({
    server: {
      DATABASE_URL: z.string().startsWith('postgres://'),
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
  });
};
