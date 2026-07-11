// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = process.env;

describe('github keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns the validated token and username', async () => {
    process.env.GITHUB_TOKEN = 'test_token';
    process.env.GITHUB_USERNAME = 'octocat';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.GITHUB_TOKEN).toBe('test_token');
    expect(config.GITHUB_USERNAME).toBe('octocat');
  });

  it('returns undefined for username when unset', async () => {
    process.env.GITHUB_TOKEN = 'test_token';
    process.env.SKIP_ENV_VALIDATION = 'false';
    delete process.env.GITHUB_USERNAME;

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.GITHUB_USERNAME).toBeUndefined();
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';
    delete process.env.GITHUB_TOKEN;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });
});
