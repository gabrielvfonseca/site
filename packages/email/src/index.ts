import { CloudflareApiError, sendCloudflareEmail } from "@gabfon/cloudflare";
import { render } from "@react-email/render";
import type { ReactNode } from "react";

/** A named email address (e.g. "Contact Form <contact@gabfon.com>"). */
export type EmailAddress = string;

/** Options accepted by {@link sendEmail} (mirrors the Cloudflare REST API). */
export interface SendEmailOptions {
  /** Recipient address(es). */
  to: string | string[];
  /** Sender address; defaults to `EMAIL_FROM`. */
  from?: string;
  /** CC recipients. */
  cc?: string | string[];
  /** BCC recipients. */
  bcc?: string | string[];
  subject: string;
  /** Plain-text body. */
  text?: string;
  /** HTML body. When omitted and `react` is given, it is rendered. */
  html?: string;
  /** Reply-To address. */
  replyTo?: string;
  /** Custom headers (threading, tracking, …). */
  headers?: Record<string, string>;
  /**
   * A React Email template to render as the HTML body. Mutually exclusive
   * with an explicit `html` string (if both are given, `html` wins).
   */
  react?: ReactNode;
}

/** The per-recipient delivery status returned by the Cloudflare API. */
export interface SendEmailResult {
  /** The RFC 5322 Message-ID of the sent email. */
  messageId: string;
  delivered: string[];
  queued: string[];
  permanentBounces: string[];
  suppressedRecipients: string[];
}

/** Thrown when the Cloudflare Email Sending API rejects a send. */
export class EmailSendError extends Error {
  /** The HTTP status code returned by the API. */
  readonly status: number;
  /** The machine-readable API error codes (e.g. `10101`). */
  readonly codes: number[];

  constructor(status: number, codes: number[], detail: string) {
    super(detail);
    this.name = "EmailSendError";
    this.status = status;
    this.codes = codes;
  }
}

/**
 * Whether Cloudflare Email Sending is configured in this environment.
 * @returns `true` when the account id, token, and From address are present.
 */
export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.EMAIL_ACCOUNT_ID &&
    process.env.EMAIL_API_TOKEN &&
    process.env.EMAIL_FROM
  );
}

/**
 * Send a single email through the Cloudflare Email Sending REST API
 * (`POST /accounts/{account_id}/email/sending/send`).
 *
 * Config is read lazily so the import never throws: when Email Sending is not
 * configured (missing `EMAIL_*` vars) the call rejects with an
 * {@link EmailSendError} of code `0`, mirroring the "degrade gracefully"
 * contract of the rest of the stack.
 * @param options - The email to send.
 * @returns The delivery status for each recipient.
 */
export async function sendEmail(
  options: SendEmailOptions
): Promise<SendEmailResult> {
  const account = process.env.EMAIL_ACCOUNT_ID;
  const token = process.env.EMAIL_API_TOKEN;
  const defaultFrom = process.env.EMAIL_FROM;

  if (!account || !token || !defaultFrom) {
    throw new EmailSendError(
      0,
      [],
      "Cloudflare Email Sending is not configured (EMAIL_ACCOUNT_ID, EMAIL_API_TOKEN, EMAIL_FROM)"
    );
  }

  const html =
    options.html ??
    (options.react === undefined ? undefined : await render(options.react));

  try {
    return await sendCloudflareEmail({
      accountId: account,
      apiToken: token,
      to: options.to,
      from: options.from ?? defaultFrom,
      cc: options.cc,
      bcc: options.bcc,
      subject: options.subject,
      text: options.text,
      html,
      replyTo: options.replyTo,
      headers: options.headers,
    });
  } catch (error) {
    if (error instanceof CloudflareApiError) {
      throw new EmailSendError(error.status, error.codes, error.message);
    }
    throw error;
  }
}

/**
 * Convenience wrapper used by call sites that pass a React Email template:
 * renders the template and sends with the default From address.
 * @param options - The email to send (`react` is rendered to HTML).
 * @returns The delivery status for each recipient.
 */
export function sendTemplateEmail(
  options: Omit<SendEmailOptions, "html" | "react"> & { react: ReactNode }
): Promise<SendEmailResult> {
  return sendEmail(options);
}

export { keys } from "./keys";
