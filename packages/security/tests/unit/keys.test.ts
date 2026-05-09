import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

// Mock process.env
const originalEnv = process.env;

describe('security keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns valid configuration with Arcjet settings', async () => {
    process.env.ARCJET_KEY = 'aj_test_key';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.ARCJET_KEY).toBe('aj_test_key');
  });

  it('validates Arcjet key format', async () => {
    process.env.ARCJET_KEY = 'invalid_key';
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
    process.env.ARCJET_KEY = '';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.ARCJET_KEY).toBeUndefined();
  });
});
