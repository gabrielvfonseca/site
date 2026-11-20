// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  apiFetch,
  CloudflareApiError,
  isCloudflareConfigured,
  sendCloudflareEmail,
} from "../../src/index";

const ACCOUNT_ID = "test-account-id";
const TOKEN = "test-api-token";

/** Install a fetch stub resolving to the given status/body. */
function stubFetch(status: number, body: Record<string, unknown>) {
  const response = Response.json(body);
  return vi.fn().mockResolvedValue(
    new Response(response.body, {
      status,
      headers: response.headers,
    })
  );
}

describe("cloudflare package", () => {
  const originalEnv = process.env;
  let fetchMock: ReturnType<typeof stubFetch>;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      CF_ACCOUNT_ID: ACCOUNT_ID,
      CF_API_TOKEN: TOKEN,
    };
    fetchMock = stubFetch(200, {
      success: true,
      errors: [],
      messages: [],
      result: null,
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  describe("apiFetch", () => {
    it("builds an account-scoped URL and parses the envelope", async () => {
      const result = await apiFetch<{ id: string }>({
        accountId: ACCOUNT_ID,
        apiToken: TOKEN,
        path: "account",
      });

      const [url, init] = fetchMock.mock.calls[0];
      expect(url).toBe(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/account`
      );
      expect(init?.method).toBe("GET");
      const headers = init?.headers as Record<string, string>;
      expect(headers.Authorization).toBe(`Bearer ${TOKEN}`);
      expect(result).toBeNull();
    });

    it("does not prefix the account for user-scoped paths", async () => {
      await apiFetch({
        accountId: ACCOUNT_ID,
        apiToken: TOKEN,
        path: "user",
        accountIdScoped: false,
      });

      const [url] = fetchMock.mock.calls[0];
      expect(url).toBe("https://api.cloudflare.com/client/v4/user");
    });

    it("POSTs a JSON body with Content-Type", async () => {
      await apiFetch({
        accountId: ACCOUNT_ID,
        apiToken: TOKEN,
        path: "d1/database/123/query",
        method: "POST",
        body: { batch: [{ sql: "SELECT 1" }] },
      });

      const [, init] = fetchMock.mock.calls[0];
      expect(init?.method).toBe("POST");
      const headers = init?.headers as Record<string, string>;
      expect(headers["Content-Type"]).toBe("application/json");
      expect(JSON.parse(init?.body as string)).toEqual({
        batch: [{ sql: "SELECT 1" }],
      });
    });

    it("throws a CloudflareApiError on a non-2xx response", async () => {
      fetchMock.mockResolvedValue(
        Response.json(
          {
            success: false,
            errors: [{ code: 10_405, message: "method not allowed" }],
            messages: [],
            result: null,
          },
          { status: 405 }
        )
      );

      const promise = apiFetch({
        accountId: ACCOUNT_ID,
        apiToken: TOKEN,
        path: "workers/scripts/site/secrets/bulk",
        method: "PUT",
        body: {},
      });

      await expect(promise).rejects.toBeInstanceOf(CloudflareApiError);
      await expect(promise).rejects.toMatchObject({
        status: 405,
        codes: [10_405],
        message: "method not allowed",
      });
    });

    it("returns the result as-is when throwOnError is false", async () => {
      fetchMock.mockResolvedValue(
        Response.json({
          success: false,
          errors: [{ code: 9109, message: "bad token" }],
          messages: [],
          result: { fallback: true },
        })
      );

      const result = await apiFetch({
        accountId: ACCOUNT_ID,
        apiToken: TOKEN,
        path: "user",
        accountIdScoped: false,
        throwOnError: false,
      });

      expect(result).toEqual({ fallback: true });
    });
  });

  describe("sendCloudflareEmail", () => {
    it("sends via the Email Sending endpoint and maps the result", async () => {
      fetchMock.mockResolvedValue(
        Response.json({
          success: true,
          errors: [],
          messages: [],
          result: {
            message_id: "<abc123@gabfon.com>",
            delivered: ["recipient@example.com"],
            permanent_bounces: [],
            queued: [],
            suppressed_recipients: [],
          },
        })
      );

      const result = await sendCloudflareEmail({
        accountId: ACCOUNT_ID,
        apiToken: TOKEN,
        from: "contact@gabfon.com",
        to: "recipient@example.com",
        subject: "Hello",
        text: "Body",
      });

      const [url, init] = fetchMock.mock.calls[0];
      expect(url).toBe(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/email/sending/send`
      );
      expect(init?.method).toBe("POST");
      const body = JSON.parse(init?.body as string);
      expect(body.to).toEqual(["recipient@example.com"]);
      expect(body.from).toBe("contact@gabfon.com");

      expect(result).toEqual({
        messageId: "<abc123@gabfon.com>",
        delivered: ["recipient@example.com"],
        queued: [],
        permanentBounces: [],
        suppressedRecipients: [],
      });
    });

    it("normalizes a missing result field to empty arrays", async () => {
      fetchMock.mockResolvedValue(
        Response.json({ success: true, errors: [], messages: [], result: {} })
      );

      const result = await sendCloudflareEmail({
        accountId: ACCOUNT_ID,
        apiToken: TOKEN,
        from: "contact@gabfon.com",
        to: "a@b.com",
        subject: "Hi",
      });

      expect(result.messageId).toBe("");
      expect(result.delivered).toEqual([]);
    });
  });

  describe("isCloudflareConfigured", () => {
    it("is true when both CF_ keys are set", () => {
      expect(isCloudflareConfigured()).toBe(true);
    });

    it("is false when the token is missing", () => {
      delete process.env.CF_API_TOKEN;
      expect(isCloudflareConfigured()).toBe(false);
    });
  });
});
