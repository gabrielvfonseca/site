// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = process.env;

describe('analytics keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns the validated PostHog configuration', async () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test123';
    process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://us.i.posthog.com';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.NEXT_PUBLIC_POSTHOG_KEY).toBe('phc_test123');
    expect(config.NEXT_PUBLIC_POSTHOG_HOST).toBe('https://us.i.posthog.com');
  });

  it('rejects a PostHog key with the wrong prefix', async () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'wrong_prefix';
    process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://us.i.posthog.com';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');

    expect(() => keys()).toThrow();
  });

  it('skips validation when SKIP_ENV_VALIDATION is unset', async () => {
    delete process.env.SKIP_ENV_VALIDATION;
    delete process.env.NEXT_PUBLIC_POSTHOG_KEY;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });
});
