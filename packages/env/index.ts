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

  // Added by Vercel
  VERCEL: z.string().optional(),
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
};

const client: Parameters<typeof createEnv>[0]['client'] = {
  // Added by Vercel
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1).optional(),
};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    RESEND_FROM: process.env.RESEND_FROM,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
    RESEND_AUDIENCE: process.env.RESEND_AUDIENCE,
    VERCEL: process.env.VERCEL,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    KV_URL: process.env.KV_URL,
    KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
