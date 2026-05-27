import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock process.env
const originalEnv = process.env;

describe('analytics keys', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns valid configuration with required PostHog keys', async () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test123';
    process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://test.posthog.com';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.NEXT_PUBLIC_POSTHOG_KEY).toBe('phc_test123');
    expect(config.NEXT_PUBLIC_POSTHOG_HOST).toBe('https://test.posthog.com');
  });

  it('validates PostHog key format', async () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'invalid_key';
    process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://test.posthog.com';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    expect(() => keys()).toThrow();
  });

  it('validates PostHog host URL format', async () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test123';
    process.env.NEXT_PUBLIC_POSTHOG_HOST = 'invalid-url';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    expect(() => keys()).toThrow();
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config).toBeDefined();
  });

  it('handles empty string as undefined', async () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = '';
    process.env.NEXT_PUBLIC_POSTHOG_HOST = '';
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.NEXT_PUBLIC_POSTHOG_KEY).toBeUndefined();
    expect(config.NEXT_PUBLIC_POSTHOG_HOST).toBeUndefined();
  });
});
