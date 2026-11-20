const API_BASE_URL = "https://api.cloudflare.com/client/v4";

/**
 * An error returned by the Cloudflare API v4 client.
 *
 * `status` is the HTTP status of the response (0 when the network layer
 * failed). `errors` carries the per-error `code`/`message` pairs the API
 * returns in its envelope.
 */
export class CloudflareApiError extends Error {
  /** The HTTP status code of the failed response (0 for network failures). */
  readonly status: number;
  /** The error codes from the API envelope (empty when unavailable). */
  readonly codes: number[];

  constructor(status: number, codes: number[], detail: string) {
    super(detail);
    this.name = "CloudflareApiError";
    this.status = status;
    this.codes = codes;
  }
}

/**
 * The standard Cloudflare API v4 response envelope.
 *
 * The `result` payload is typed per call via the `T` generic on
 * {@link apiFetch}.
 */
export interface CloudflareApiResponse<T> {
  success: boolean;
  errors: { code?: number; message?: string }[];
  messages: string[];
  result: T;
}

/** Options for {@link apiFetch}. */
export interface ApiFetchOptions {
  /** The Cloudflare account id to scope the request to. */
  accountId: string;
  /** The API token used for the `Authorization: Bearer` header. */
  apiToken: string;
  /**
   * The path after `/client/v4`, without a leading slash, relative to the
   * account when `accountIdScoped` is true (the default). Examples:
   * `email/sending/send`, `d1/database/{id}/query`.
   */
  path: string;
  /** The HTTP method (defaults to `GET`). */
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** The request body; serialized as JSON when an object. */
  body?: unknown;
  /**
   * Whether `accountId` is interpolated into the URL as
   * `/accounts/{id}/{path}` (true) or the `path` already contains the
   * account id (false). Defaults to true.
   */
  accountIdScoped?: boolean;
  /**
   * When true, a non-2xx response or `success: false` envelope rejects with
   * a {@link CloudflareApiError}. When false, the parsed envelope is
   * returned as-is and the caller decides how to handle it. Defaults to
   * true.
   */
  throwOnError?: boolean;
  /** Optional timeout in milliseconds (defaults to 30s). */
  timeoutMs?: number;
}

/**
 * Fetch a Cloudflare API v4 endpoint with Bearer auth and a typed envelope.
 *
 * This is the single HTTP layer every Cloudflare call in this repo goes
 * through: it builds the URL, sets the auth header, parses the standard
 * `{ success, errors, messages, result }` envelope, and normalizes failures
 * into a {@link CloudflareApiError}.
 * @param options - The request to make.
 * @returns The typed `result` payload from the envelope.
 * @throws {CloudflareApiError} When `throwOnError` is true (the
 *   default) and the response is non-2xx or reports `success: false`.
 */
export async function apiFetch<T = unknown>(
  options: ApiFetchOptions
): Promise<T> {
  const {
    accountId,
    apiToken,
    path,
    method = "GET",
    body,
    accountIdScoped = true,
    throwOnError = true,
    timeoutMs = 30_000,
  } = options;

  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = accountIdScoped
    ? `${API_BASE_URL}/accounts/${accountId}/${normalizedPath}`
    : `${API_BASE_URL}/${normalizedPath}`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiToken}`,
  };
  const init: RequestInit = { method, headers };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  let response: Response;
  try {
    response = await fetch(url, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new CloudflareApiError(
        0,
        [],
        `Cloudflare API request timed out after ${timeoutMs}ms`
      );
    }
    throw new CloudflareApiError(
      0,
      [],
      `Cloudflare API request failed: ${String(error)}`
    );
  } finally {
    clearTimeout(timeout);
  }

  const data = (await response.json()) as CloudflareApiResponse<T>;

  if (!response.ok || data.success === false) {
    const codes = (data.errors ?? []).map((e) => e.code ?? 0);
    const detail =
      (data.errors ?? [])
        .map((e) => e.message ?? String(e.code ?? ""))
        .join("; ") || `HTTP ${response.status}`;
    if (throwOnError) {
      throw new CloudflareApiError(response.status, codes, detail);
    }
    return data.result as T;
  }

  return data.result;
}
