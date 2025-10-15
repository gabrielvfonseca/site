import { keys as analytics } from '@gabfon/analytics/keys';
import { keys as cache } from '@gabfon/cache/keys';
import { keys as database } from '@gabfon/database/keys';
import { keys as core } from '@gabfon/next-config/keys';
import { keys as observability } from '@gabfon/observability/keys';
import { keys as security } from '@gabfon/security/keys';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Create the environment variables
export const env = createEnv({
  extends: [
    core(),
    observability(),
    security(),
    cache(),
    analytics(),
    database(),
  ],
  client: {
    NEXT_PUBLIC_TWITTER_URL: z
      .url()
      .optional()
      .default('https://x.com/gabfon_'),
    NEXT_PUBLIC_LINKEDIN_URL: z
      .url()
      .optional()
      .default('https://www.linkedin.com/in/gabrielvfonseca/'),
    NEXT_PUBLIC_GITHUB_URL: z
      .url()
      .optional()
      .default('https://github.com/gabrielvfonseca'),
    NEXT_PUBLIC_SCHEDULE_URL: z
      .url()
      .optional()
      .default('https://calendar.notion.so/meet/gabfon/schedule'),
    NEXT_PUBLIC_EMAIL: z.email().optional().default('hey@gabfon.com'),
    NEXT_PUBLIC_ATPROTO_DID: z.string().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_TWITTER_URL: process.env.NEXT_PUBLIC_TWITTER_URL,
    NEXT_PUBLIC_LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
    NEXT_PUBLIC_SCHEDULE_URL: process.env.NEXT_PUBLIC_SCHEDULE_URL,
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
    NEXT_PUBLIC_ATPROTO_DID: process.env.NEXT_PUBLIC_ATPROTO_DID,
  },
});
