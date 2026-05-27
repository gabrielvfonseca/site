import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * The keys for the observability.
 * @returns The keys for the observability.
 */
export const keys = () => {
  // Determine if Sentry is required (production environment)
  const isProduction = process.env.NODE_ENV === 'production';
  const sentryDsnSchema = isProduction
    ? z.string().min(1).url().describe('Sentry DSN is required in production')
    : z.string().min(1).url().optional();

  return createEnv({
    server: {
      // Added by Sentry Integration, Vercel Marketplace
      SENTRY_ORG: z.string().min(1).optional(),
      SENTRY_PROJECT: z.string().min(1).optional(),
    },
    client: {
      // Added by Sentry Integration, Vercel Marketplace
      // Required in production for error tracking
      NEXT_PUBLIC_SENTRY_DSN: sentryDsnSchema,
    },
    runtimeEnv: {
      SENTRY_ORG: process.env.SENTRY_ORG,
      SENTRY_PROJECT: process.env.SENTRY_PROJECT,
      NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    },
    emptyStringAsUndefined: true,
    skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
  });
};
