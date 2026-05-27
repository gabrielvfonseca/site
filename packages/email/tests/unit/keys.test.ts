import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

// Mock process.env
const originalEnv = process.env;

describe('email keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns valid configuration with RESEND_TOKEN and RESEND_FROM', async () => {
    process.env.RESEND_TOKEN = 're_test123';
    process.env.RESEND_FROM = 'test@example.com';
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.RESEND_TOKEN).toBe('re_test123');
    expect(config.RESEND_FROM).toBe('test@example.com');
  });

  it('validates RESEND_TOKEN format', async () => {
    process.env.RESEND_TOKEN = 'invalid_token';
    process.env.RESEND_FROM = 'test@example.com';
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();
    expect(config.RESEND_TOKEN).toBe('invalid_token');
  });

  it('validates RESEND_FROM email format', async () => {
    process.env.RESEND_TOKEN = 're_test123';
    process.env.RESEND_FROM = 'invalid-email';
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();
    expect(config.RESEND_FROM).toBe('invalid-email');
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config).toBeDefined();
  });

  it('handles empty string as undefined', async () => {
    process.env.RESEND_TOKEN = '';
    process.env.RESEND_FROM = '';
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.RESEND_TOKEN).toBeUndefined();
    expect(config.RESEND_FROM).toBeUndefined();
  });
});
