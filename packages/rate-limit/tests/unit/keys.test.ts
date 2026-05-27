import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

// Mock process.env
const originalEnv = process.env;

describe('rate-limit keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns valid configuration with rate limit settings', async () => {
    process.env.RATE_LIMIT_WINDOW = '900000';
    process.env.RATE_LIMIT_MAX = '100';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.RATE_LIMIT_WINDOW).toBe(900000);
    expect(config.RATE_LIMIT_MAX).toBe(100);
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config).toBeDefined();
  });

  it('handles empty string as undefined', async () => {
    process.env.RATE_LIMIT_WINDOW = '';
    process.env.RATE_LIMIT_MAX = '';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.RATE_LIMIT_WINDOW).toBeUndefined();
    expect(config.RATE_LIMIT_MAX).toBeUndefined();
  });
});
