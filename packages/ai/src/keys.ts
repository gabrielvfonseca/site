import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      GOOGLE_API_KEY: z.string().optional(),
    },
    runtimeEnv: {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    },
    emptyStringAsUndefined: true,
    skipValidation: !process.env.SKIP_ENV_VALIDATION,
  });
