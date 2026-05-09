import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The environment variables for the Strava package.
 * @returns The environment variables for the Strava package.
 */
export const keys = () =>
  createEnv({
    server: {
      STRAVA_CLIENT_ID: z.string().min(1).describe('Strava Client ID'),
      STRAVA_CLIENT_SECRET: z.string().min(1).describe('Strava Client Secret'),
      STRAVA_REFRESH_TOKEN: z.string().min(1).describe('Strava Refresh Token'),
    },
    runtimeEnv: {
      STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
      STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
      STRAVA_REFRESH_TOKEN: process.env.STRAVA_REFRESH_TOKEN,
    },
    emptyStringAsUndefined: true,
    skipValidation: !process.env.SKIP_ENV_VALIDATION,
  });
