// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = process.env;

describe('x keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns the validated bearer token and username', async () => {
    process.env.X_API_BEARER_TOKEN = 'test_bearer';
    process.env.X_USERNAME = 'someone';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.X_API_BEARER_TOKEN).toBe('test_bearer');
    expect(config.X_USERNAME).toBe('someone');
  });

  it('returns undefined for username when unset', async () => {
    process.env.SKIP_ENV_VALIDATION = 'false';
    process.env.X_API_BEARER_TOKEN = 'test_bearer';
    delete process.env.X_USERNAME;

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.X_USERNAME).toBeUndefined();
  });

  it('treats the bearer token as optional', async () => {
    process.env.SKIP_ENV_VALIDATION = 'false';
    delete process.env.X_API_BEARER_TOKEN;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
    expect(keys().X_API_BEARER_TOKEN).toBeUndefined();
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });
});
