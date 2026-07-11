import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The keys for the seo package.
 * @returns The keys for the seo package.
 */
export const keys = () =>
  createEnv({
    server: {},
    client: {
      NEXT_PUBLIC_WEB_URL: z
        .string()
        .url()
        .optional()
        .default('https://gabfon.com'),
    },
    runtimeEnv: {
      NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    },
    emptyStringAsUndefined: true,
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  });
