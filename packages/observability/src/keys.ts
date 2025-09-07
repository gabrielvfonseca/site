import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The keys for the observability.
 * @returns The keys for the observability.
 */
export const keys = () =>
  createEnv({
    server: {
      // Added by Sentry Integration, Vercel Marketplace
      SENTRY_ORG: z.string().min(1).optional(),
      SENTRY_PROJECT: z.string().min(1).optional(),
    },
    client: {
      // Added by Sentry Integration, Vercel Marketplace
      NEXT_PUBLIC_SENTRY_DSN: z.string().min(1).url().optional(),
    },
    runtimeEnv: {
      SENTRY_ORG: process.env.SENTRY_ORG,
      SENTRY_PROJECT: process.env.SENTRY_PROJECT,
      NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    },
  });
