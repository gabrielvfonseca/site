// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = process.env;

describe('wakatime keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns the validated api key', async () => {
    process.env.WAKATIME_API_KEY = 'waka_test_key';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.WAKATIME_API_KEY).toBe('waka_test_key');
  });

  it('treats the api key as optional', async () => {
    process.env.SKIP_ENV_VALIDATION = 'false';
    delete process.env.WAKATIME_API_KEY;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
    expect(keys().WAKATIME_API_KEY).toBeUndefined();
  });

  it('skips validation when SKIP_ENV_VALIDATION is unset', async () => {
    process.env.SKIP_ENV_VALIDATION = undefined;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });
});
