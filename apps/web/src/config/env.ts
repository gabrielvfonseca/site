import { keys as analytics } from '@gabfon/analytics/keys';
import { keys as database } from '@gabfon/database/keys';
import { keys as email } from '@gabfon/email/keys';
import { keys as github } from '@gabfon/github/keys';
import { keys as core } from '@gabfon/next-config/keys';
import { keys as observability } from '@gabfon/observability/keys';
import { keys as rateLimit } from '@gabfon/rate-limit/keys';
import { keys as security } from '@gabfon/security/keys';
import { keys as spotify } from '@gabfon/spotify/keys';
import { keys as strava } from '@gabfon/strava/keys';
import { keys as wakatime } from '@gabfon/wakatime/keys';
import { keys as x } from '@gabfon/x/keys';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Centralized, type-safe environment configuration for the web app.
 *
 * Every package that reads env vars exposes a `keys()` factory (built with
 * `@t3-oss/env-nextjs` + zod); we compose them via `extends` so validation is
 * defined once per package but surfaced through a single `env` object. The
 * `github`/`spotify`/`strava` keys power the `/api/activity` contribution graph.
 */
export const env = createEnv({
  extends: [
    core(),
    observability(),
    security(),
    rateLimit(),
    analytics(),
    database(),
    email(),
    github(),
    spotify(),
    strava(),
    wakatime(),
    x(),
  ],
  server: {
    ANALYZE: z.enum(['true', 'false']).optional().default('false'),
    FLAGS_SECRET: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_X_URL: z.url().optional().default('https://x.com/gabfon_'),
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
