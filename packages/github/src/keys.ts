import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The environment variables for the GitHub package.
 * @returns The environment variables for the GitHub package.
 */
export const keys = () =>
  createEnv({
    server: {
      GITHUB_TOKEN: z.string().min(1).describe('GitHub Personal Access Token'),
      GITHUB_USERNAME: z
        .string()
        .min(1)
        .default('gabrielvfonseca')
        .describe('GitHub username'),
    },
    runtimeEnv: {
      GITHUB_TOKEN: process.env.GITHUB_TOKEN,
      GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    },
    emptyStringAsUndefined: true,
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  });
