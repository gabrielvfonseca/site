import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

// Mock process.env
const originalEnv = process.env;

describe('observability keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns valid configuration with Sentry DSN', async () => {
    process.env.SENTRY_DSN = 'https://test@sentry.io/project';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.SENTRY_DSN).toBe('https://test@sentry.io/project');
  });

  it('validates Sentry DSN format', async () => {
    process.env.SENTRY_DSN = 'invalid-dsn';
    process.env.SKIP_ENV_VALIDATION = 'false';

    await expect(async () => {
      const { keys } = await import('../../src/keys');
      keys();
    }).toThrow();
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config).toBeDefined();
  });

  it('handles empty string as undefined', async () => {
    process.env.SENTRY_DSN = '';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.SENTRY_DSN).toBeUndefined();
  });
});
