import { apiFetch } from "./client";

/** The per-recipient delivery status returned by the Email Sending API. */
export interface CloudflareEmailSendResult {
  /** The RFC 5322 Message-ID of the sent email. */
  messageId: string;
  /** Recipients the email was delivered to synchronously. */
  delivered: string[];
  /** Recipients queued for asynchronous delivery. */
  queued: string[];
  /** Recipients that permanently bounced. */
  permanentBounces: string[];
  /** Recipients that are on the suppression list. */
  suppressedRecipients: string[];
}

/**
 * Options for {@link sendCloudflareEmail}. Mirrors the Cloudflare Email
 * Sending REST API body.
 */
export interface CloudflareEmailSendOptions {
  /** The Cloudflare account id that owns the verified sending domain. */
  accountId: string;
  /** An API token with the "Email Sending – Send" permission. */
  apiToken: string;
  /** Recipient address(es). */
  to: string | string[];
  /** Sender address (must be on a verified domain). */
  from: string;
  /** CC recipients. */
  cc?: string | string[];
  /** BCC recipients. */
  bcc?: string | string[];
  subject: string;
  /** Plain-text body. */
  text?: string;
  /** HTML body. */
  html?: string;
  /** Reply-To address. */
  replyTo?: string;
  /** Custom headers (threading, tracking, …). */
  headers?: Record<string, string>;
}

function toList(value: string | string[] | undefined): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }
  return Array.isArray(value) ? value : [value];
}

/**
 * Send a single email through the Cloudflare Email Sending REST API
 * (`POST /accounts/{account_id}/email/sending/send`).
 *
 * Account and token are passed explicitly (not read from the process env) so
 * callers can use dedicated `EMAIL_*` credentials. The API returns 200 with
 * `success: true` and a per-recipient result; failures reject with a
 * {@link CloudflareApiError}.
 * @param options - The email to send.
 * @returns The delivery status for each recipient.
 */
export async function sendCloudflareEmail(
  options: CloudflareEmailSendOptions
): Promise<CloudflareEmailSendResult> {
  const body: Record<string, unknown> = {
    to: toList(options.to),
    from: options.from,
    subject: options.subject,
  };
  if (options.text !== undefined) {
    body.text = options.text;
  }
  if (options.html !== undefined) {
    body.html = options.html;
  }
  if (options.cc !== undefined) {
    body.cc = toList(options.cc);
  }
  if (options.bcc !== undefined) {
    body.bcc = toList(options.bcc);
  }
  if (options.replyTo !== undefined) {
    body.reply_to = options.replyTo;
  }
  if (options.headers !== undefined) {
    body.headers = options.headers;
  }

  const result = await apiFetch<{
    message_id?: string;
    delivered?: string[];
    queued?: string[];
    permanent_bounces?: string[];
    suppressed_recipients?: string[];
  }>({
    accountId: options.accountId,
    apiToken: options.apiToken,
    path: "email/sending/send",
    method: "POST",
    body,
  });

  return {
    messageId: result.message_id ?? "",
    delivered: result.delivered ?? [],
    queued: result.queued ?? [],
    permanentBounces: result.permanent_bounces ?? [],
    suppressedRecipients: result.suppressed_recipients ?? [],
  };
}
