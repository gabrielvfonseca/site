import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The environment variables for the X (Twitter) package. The bearer token is
 * optional so the app still boots without it; the client throws at call time
 * and callers degrade gracefully.
 * @returns The environment variables for the X package.
 */
export const keys = () =>
  createEnv({
    server: {
      X_API_BEARER_TOKEN: z
        .string()
        .min(1)
        .optional()
        .describe('X (Twitter) API v2 app-only Bearer token'),
      X_USERNAME: z
        .string()
        .min(1)
        .default('gabfon_')
        .describe('X handle without the @'),
    },
    runtimeEnv: {
      X_API_BEARER_TOKEN: process.env.X_API_BEARER_TOKEN,
      X_USERNAME: process.env.X_USERNAME,
    },
    emptyStringAsUndefined: true,
    skipValidation: !process.env.SKIP_ENV_VALIDATION,
  });
