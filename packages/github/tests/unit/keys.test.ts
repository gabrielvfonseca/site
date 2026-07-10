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

  it('applies the default username when unset', async () => {
    process.env.GITHUB_TOKEN = 'test_token';
    process.env.SKIP_ENV_VALIDATION = 'false';
    process.env.GITHUB_USERNAME = undefined;
    delete process.env.GITHUB_USERNAME;

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.GITHUB_USERNAME).toBe('gabrielvfonseca');
  });

  it('skips validation when SKIP_ENV_VALIDATION is unset', async () => {
    process.env.SKIP_ENV_VALIDATION = undefined;
    process.env.GITHUB_TOKEN = undefined;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });
});
