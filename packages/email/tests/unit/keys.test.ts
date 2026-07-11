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

  it('handles invalid token format as-is (client not validated)', async () => {
    process.env.RESEND_FROM = 'contact@gabfon.com';
    process.env.RESEND_TOKEN = 'invalid_token';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.RESEND_TOKEN).toBe('invalid_token');
  });

  it('handles invalid email format as-is (server not validated)', async () => {
    process.env.RESEND_FROM = 'not-an-email';
    process.env.RESEND_TOKEN = 're_test123';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.RESEND_FROM).toBe('not-an-email');
  });

  it('handles missing env vars as undefined when validation skipped', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';
    delete process.env.RESEND_TOKEN;
    delete process.env.RESEND_FROM;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });

  it('handles empty string as undefined', async () => {
    process.env.RESEND_FROM = '';
    process.env.RESEND_TOKEN = '';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.RESEND_FROM).toBeUndefined();
    expect(config.RESEND_TOKEN).toBeUndefined();
  });
});
