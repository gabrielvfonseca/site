import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The keys for the analytics.
 * @returns The keys for the analytics.
 */
export const keys = (): ReturnType<typeof createEnv> =>
  createEnv({
    client: {
      NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).startsWith('phc_'),
      NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1).url(),
    },
    runtimeEnv: {
      NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
      NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    },
  });
