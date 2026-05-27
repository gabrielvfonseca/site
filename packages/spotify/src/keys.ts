import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The environment variables for the Spotify package.
 * @returns The environment variables for the Spotify package.
 */
export const keys = () =>
  createEnv({
    server: {
      SPOTIFY_CLIENT_ID: z.string().min(1).describe('Spotify Client ID'),
      SPOTIFY_CLIENT_SECRET: z
        .string()
        .min(1)
        .describe('Spotify Client Secret'),
      SPOTIFY_REFRESH_TOKEN: z
        .string()
        .min(1)
        .optional()
        .describe('Spotify Refresh Token (for user data)'),
    },
    runtimeEnv: {
      SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
      SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    },
    emptyStringAsUndefined: true,
    skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
  });
