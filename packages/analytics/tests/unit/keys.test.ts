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

  it('handles missing required client env vars when validation skipped', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';
    delete process.env.NEXT_PUBLIC_POSTHOG_KEY;
    delete process.env.NEXT_PUBLIC_POSTHOG_HOST;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });

  it('handles an empty string as undefined', async () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = '';
    process.env.NEXT_PUBLIC_POSTHOG_HOST = '';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.NEXT_PUBLIC_POSTHOG_KEY).toBeUndefined();
    expect(config.NEXT_PUBLIC_POSTHOG_HOST).toBeUndefined();
  });
});
