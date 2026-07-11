import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The environment variables for the WakaTime package. The API key is optional
 * so the app still boots without it; the client throws at call time and
 * callers degrade gracefully.
 * @returns The environment variables for the WakaTime package.
 */
export const keys = () =>
  createEnv({
    server: {
      WAKATIME_API_KEY: z
        .string()
        .min(1)
        .optional()
        .describe('WakaTime API key (from wakatime.com/settings/api-key)'),
    },
    runtimeEnv: {
      WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
    },
    emptyStringAsUndefined: true,
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  });
