import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * The keys for the email package (Cloudflare Email Sending).
 *
 * `EMAIL_API_TOKEN` is a Cloudflare API token with the "Email Sending –
 * Send" permission (the REST API authenticates with a plain Bearer token —
 * no account prefix in the header). `EMAIL_FROM` is the default From
 * address; the sending domain must be verified in the Cloudflare dashboard.
 * @returns The validated email environment keys.
 */
export const keys = () =>
  createEnv({
    server: {
      EMAIL_ACCOUNT_ID: z.string().min(1),
      EMAIL_API_TOKEN: z.string().min(1),
      EMAIL_FROM: z.email(),
    },
    runtimeEnv: {
      EMAIL_ACCOUNT_ID: process.env.EMAIL_ACCOUNT_ID,
      EMAIL_API_TOKEN: process.env.EMAIL_API_TOKEN,
      EMAIL_FROM: process.env.EMAIL_FROM,
    },
    emptyStringAsUndefined: true,
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  });

/**
 * Whether Email Sending is configured. Reading `process.env` directly keeps
 * this callable in contexts where the full env schema has not been validated
 * (the app degrades gracefully when email is not configured).
 * @returns `true` when an account id, token, and From address are present.
 */
export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.EMAIL_ACCOUNT_ID &&
    process.env.EMAIL_API_TOKEN &&
    process.env.EMAIL_FROM
  );
}
