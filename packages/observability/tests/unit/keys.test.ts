// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = process.env;

describe('observability keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns a valid configuration with a Sentry DSN', async () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = 'https://test@sentry.io/project';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.NEXT_PUBLIC_SENTRY_DSN).toBe(
      'https://test@sentry.io/project'
    );
  });

  it('returns the invalid DSN as-is when optional (client env not validated at runtime)', async () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = 'not-a-url';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.NEXT_PUBLIC_SENTRY_DSN).toBe('not-a-url');
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';
    delete process.env.NEXT_PUBLIC_SENTRY_DSN;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });

  it('handles an empty string as undefined', async () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = '';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.NEXT_PUBLIC_SENTRY_DSN).toBeUndefined();
  });
});
