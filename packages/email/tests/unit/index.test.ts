// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { EmailSendError, isEmailConfigured, sendEmail } from "../../src/index";

const ACCOUNT_ID = "test-account-id";
const TOKEN = "test-api-token";
const FROM = "contact@gabfon.com";

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

const successBody = {
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
};

describe("email index (Cloudflare Email Sending)", () => {
  const originalEnv = process.env;
  let fetchMock: ReturnType<typeof stubFetch>;

  beforeEach(() => {
    vi.resetModules();
    process.env = {
      ...originalEnv,
      EMAIL_ACCOUNT_ID: ACCOUNT_ID,
      EMAIL_API_TOKEN: TOKEN,
      EMAIL_FROM: FROM,
    };
    fetchMock = stubFetch(200, successBody);
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  it("sends an email via the Cloudflare Email Sending REST API", async () => {
    const result = await sendEmail({
      to: "recipient@example.com",
      subject: "Hello",
      text: "Plain text body",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/email/sending/send`
    );
    expect(init?.method).toBe("POST");
    const headers = init?.headers as Record<string, string>;
    expect(headers.Authorization).toBe(`Bearer ${TOKEN}`);
    expect(headers["Content-Type"]).toBe("application/json");

    const payload = JSON.parse(init?.body as string);
    expect(payload.to).toEqual(["recipient@example.com"]);
    expect(payload.from).toBe(FROM);
    expect(payload.subject).toBe("Hello");
    expect(payload.text).toBe("Plain text body");

    expect(result.messageId).toBe("<abc123@gabfon.com>");
    expect(result.delivered).toEqual(["recipient@example.com"]);
  });

  it("supports named From, reply-to, and custom headers", async () => {
    await sendEmail({
      to: "recipient@example.com",
      from: "AMA <ama@gabfon.com>",
      subject: "New AMA question",
      text: "body",
      replyTo: "asker@example.com",
      headers: { "X-Case-ID": "123" },
    });

    const payload = JSON.parse(
      (fetchMock.mock.calls[0][1]?.body as string) ?? "{}"
    );
    expect(payload.from).toBe("AMA <ama@gabfon.com>");
    expect(payload.reply_to).toBe("asker@example.com");
    expect(payload.headers).toEqual({ "X-Case-ID": "123" });
  });

  it("renders a React template when `react` is provided without `html`", async () => {
    const { h, createElement } = await import("react");
    await sendEmail({
      to: "recipient@example.com",
      subject: "Template",
      react: createElement(h, "p", null, "Template body"),
    });

    const payload = JSON.parse(
      (fetchMock.mock.calls[0][1]?.body as string) ?? "{}"
    );
    expect(payload.html).toContain("Template body");
  });

  it("throws EmailSendError with API codes when the API rejects the send", async () => {
    vi.stubGlobal(
      "fetch",
      stubFetch(401, {
        success: false,
        errors: [{ code: 10_101, message: "unauthorized" }],
        messages: [],
        result: null,
      })
    );

    await expect(
      sendEmail({ to: "a@example.com", subject: "x" })
    ).rejects.toMatchObject({
      name: "EmailSendError",
      status: 401,
      codes: [10_101],
    });
  });

  it("throws EmailSendError (code 0) when Email Sending is not configured", async () => {
    delete process.env.EMAIL_ACCOUNT_ID;
    delete process.env.EMAIL_API_TOKEN;
    delete process.env.EMAIL_FROM;

    await expect(
      sendEmail({ to: "a@example.com", subject: "x" })
    ).rejects.toThrow(EmailSendError);
    await expect(
      sendEmail({ to: "a@example.com", subject: "x" })
        .then(() => {
          throw new Error("should have thrown");
        })
        // oxlint-disable-next-line promise/prefer-catch -- the test exercises the rejection path directly; `.catch()` would swallow the assertion's thrown error and change the observable behavior under test.
        .catch((error: unknown) => {
          expect((error as EmailSendError).codes).toEqual([]);
        })
    ).resolves.toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports whether Email Sending is configured", () => {
    expect(isEmailConfigured()).toBe(true);
    delete process.env.EMAIL_API_TOKEN;
    expect(isEmailConfigured()).toBe(false);
  });
});
