import { keys as ai } from '@gabfon/ai/keys';
import { keys as analytics } from '@gabfon/analytics/keys';
import { keys as email } from '@gabfon/email/keys';
import { keys as core } from '@gabfon/next-config/keys';
import { keys as observability } from '@gabfon/observability/keys';
import { keys as rateLimit } from '@gabfon/rate-limit/keys';
import { keys as security } from '@gabfon/security/keys';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Create the environment variables
export const env = createEnv({
  extends: [
    core(),
    observability(),
    security(),
    rateLimit(),
    analytics(),
    ai(),
    email(),
  ],
  server: {
    ANALYZE: z.enum(['true', 'false']).optional().default('false'),
    FLAGS_SECRET: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_X_URL: z
      .string()
      .url()
      .optional()
      .default('https://x.com/gabfon_'),
    NEXT_PUBLIC_LINKEDIN_URL: z
      .string()
      .url()
      .optional()
      .default('https://www.linkedin.com/in/gabrielvfonseca/'),
    NEXT_PUBLIC_GITHUB_URL: z
      .string()
      .url()
      .optional()
      .default('https://github.com/gabrielvfonseca'),
    NEXT_PUBLIC_SCHEDULE_URL: z
      .string()
      .url()
      .optional()
      .default('https://calendar.notion.so/meet/gabfon/schedule'),
    NEXT_PUBLIC_EMAIL: z.string().email().optional().default('hey@gabfon.com'),
  },
  shared: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .optional()
      .default('development'),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    ANALYZE: process.env.ANALYZE,
    FLAGS_SECRET: process.env.FLAGS_SECRET,
    NEXT_PUBLIC_X_URL: process.env.NEXT_PUBLIC_X_URL,
    NEXT_PUBLIC_LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
    NEXT_PUBLIC_SCHEDULE_URL: process.env.NEXT_PUBLIC_SCHEDULE_URL,
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
  },
});
