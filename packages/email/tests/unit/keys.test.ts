// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = process.env;

describe('email keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns the validated Resend configuration', async () => {
    process.env.RESEND_FROM = 'contact@gabfon.com';
    process.env.RESEND_TOKEN = 're_test123';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.RESEND_FROM).toBe('contact@gabfon.com');
    expect(config.RESEND_TOKEN).toBe('re_test123');
  });

  it('rejects a token without the "re_" prefix', async () => {
    process.env.RESEND_FROM = 'contact@gabfon.com';
    process.env.RESEND_TOKEN = 'invalid_token';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');

    expect(() => keys()).toThrow();
  });

  it('rejects a malformed from-address', async () => {
    process.env.RESEND_FROM = 'not-an-email';
    process.env.RESEND_TOKEN = 're_test123';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');

    expect(() => keys()).toThrow();
  });

  it('skips validation when SKIP_ENV_VALIDATION is unset', async () => {
    delete process.env.SKIP_ENV_VALIDATION;
    delete process.env.RESEND_TOKEN;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });
});
