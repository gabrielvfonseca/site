import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server: Parameters<typeof createEnv>[0]['server'] = {
  RESEND_FROM: z.string().min(1).email(),
  RESEND_TOKEN: z.string().min(1).startsWith('re_'),
  RESEND_AUDIENCE: z.string().min(1),

  KV_URL: z.string().min(1),
  KV_REST_API_READ_ONLY_TOKEN: z.string().min(1),
  KV_REST_API_TOKEN: z.string().min(1),
  KV_REST_API_URL: z.string().min(1),

  DATABASE_URL: z.string().min(1),

  ARCJET_KEY: z.string().min(1).startsWith('ajkey_'),
};

const client: Parameters<typeof createEnv>[0]['client'] = {
  NEXT_PUBLIC_SITE_URL: z.string().min(1).optional(),
};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    RESEND_FROM: process.env.RESEND_FROM,
    ARCJET_KEY: process.env.ARCJET_KEY,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
    RESEND_AUDIENCE: process.env.RESEND_AUDIENCE,
    KV_URL: process.env.KV_URL,
    KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});