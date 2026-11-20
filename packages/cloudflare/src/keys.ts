import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * The keys for the Cloudflare package (the account-scoped API client).
 *
 * `CF_API_TOKEN` is a Cloudflare API token used as a plain Bearer credential
 * for account-scoped endpoints (D1, Workers, Email Sending, …). `CF_ACCOUNT_ID`
 * scopes the account in the request path. Email Sending uses its own
 * `EMAIL_*` keys (see `@gabfon/email`) and is not covered here.
 * @returns The validated Cloudflare environment keys.
 */
export const keys = () =>
  createEnv({
    server: {
      CF_ACCOUNT_ID: z.string().min(1),
      CF_API_TOKEN: z.string().min(1),
    },
    runtimeEnv: {
      CF_ACCOUNT_ID: process.env.CF_ACCOUNT_ID,
      CF_API_TOKEN: process.env.CF_API_TOKEN,
    },
    emptyStringAsUndefined: true,
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  });

/**
 * The env var name for the Cloudflare account id.
 * @returns The account id env key.
 */
export const CF_ACCOUNT_ID_KEY = "CF_ACCOUNT_ID";

/**
 * The env var name for the Cloudflare API token.
 * @returns The API token env key.
 */
export const CF_API_TOKEN_KEY = "CF_API_TOKEN";

/**
 * Whether the account-scoped Cloudflare API client is configured.
 * @returns `true` when both `CF_ACCOUNT_ID` and `CF_API_TOKEN` are present.
 */
export function isCloudflareConfigured(): boolean {
  return Boolean(process.env.CF_ACCOUNT_ID && process.env.CF_API_TOKEN);
}
