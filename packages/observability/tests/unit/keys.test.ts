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

  it('rejects a malformed Sentry DSN', async () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = 'not-a-url';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');

    expect(() => keys()).toThrow();
  });

  it('skips validation when SKIP_ENV_VALIDATION is unset', async () => {
    process.env.SKIP_ENV_VALIDATION = undefined;
    delete process.env.SKIP_ENV_VALIDATION;

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
