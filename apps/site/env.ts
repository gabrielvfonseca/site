import { keys as analytics } from '@repo/analytics/keys';
import { keys as core } from '@repo/next-config/keys';
import { keys as observability } from '@repo/observability/keys';
import { keys as rateLimit } from '@repo/rate-limit/keys';
import { keys as security } from '@repo/security/keys';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  extends: [core(), observability(), security(), rateLimit(), analytics()],
  server: {},
  client: {
    NEXT_PUBLIC_TWITTER_URL: z
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
    NEXT_PUBLIC_EMAIL: z
      .string()
      .email()
      .optional()
      .default('hey@gabfon.com'),
  },
  runtimeEnv: {
    NEXT_PUBLIC_TWITTER_URL: process.env.NEXT_PUBLIC_TWITTER_URL,
    NEXT_PUBLIC_LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
    NEXT_PUBLIC_SCHEDULE_URL: process.env.NEXT_PUBLIC_SCHEDULE_URL,
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
  },
});
