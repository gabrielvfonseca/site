import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * The keys for the database package. The D1 binding itself is injected by the
 * Workers runtime (`env.DB`, declared in the root `cloudflare.config.ts`) and
 * is not an environment variable — these keys only validate optional local
 * development overrides.
 * @returns The validated database environment keys.
 */
export const keys = () =>
  createEnv({
    server: {
      // Optional: local D1 development server port (miniflare `wrangler dev`).
      // Unused by the client — the binding comes from the runtime.
      D1_LOCAL_PORT: z.coerce.number().optional(),
    },
    runtimeEnv: {
      D1_LOCAL_PORT: process.env.D1_LOCAL_PORT,
    },
    emptyStringAsUndefined: true,
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  });
