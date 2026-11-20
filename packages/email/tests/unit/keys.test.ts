// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const originalEnv = process.env;

describe("email keys", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns the validated Cloudflare Email Sending configuration", async () => {
    process.env.EMAIL_ACCOUNT_ID = "test-account-id";
    process.env.EMAIL_API_TOKEN = "test-api-token";
    process.env.EMAIL_FROM = "contact@gabfon.com";
    process.env.SKIP_ENV_VALIDATION = "false";

    const { keys } = await import("../../src/keys");
    const config = keys();

    expect(config.EMAIL_ACCOUNT_ID).toBe("test-account-id");
    expect(config.EMAIL_API_TOKEN).toBe("test-api-token");
    expect(config.EMAIL_FROM).toBe("contact@gabfon.com");
  });

  it("rejects an invalid From address", async () => {
    process.env.EMAIL_ACCOUNT_ID = "test-account-id";
    process.env.EMAIL_API_TOKEN = "test-api-token";
    process.env.EMAIL_FROM = "not-an-email";
    process.env.SKIP_ENV_VALIDATION = "false";

    const { keys } = await import("../../src/keys");

    expect(() => keys()).toThrow();
  });

  it("skips validation when SKIP_ENV_VALIDATION is set", async () => {
    process.env.EMAIL_FROM = "not-an-email";
    process.env.SKIP_ENV_VALIDATION = "true";

    const { keys } = await import("../../src/keys");
    const config = keys();

    expect(config.EMAIL_FROM).toBe("not-an-email");
  });
});
