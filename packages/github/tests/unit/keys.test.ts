import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

// Mock process.env
const originalEnv = process.env;

describe('github keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns valid configuration with GitHub credentials', async () => {
    process.env.GITHUB_TOKEN = 'test_token';
    process.env.GITHUB_USERNAME = 'test_username';
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.GITHUB_TOKEN).toBe('test_token');
    expect(config.GITHUB_USERNAME).toBe('test_username');
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config).toBeDefined();
  });

  it('handles empty string as undefined', async () => {
    process.env.GITHUB_TOKEN = '';
    process.env.GITHUB_USERNAME = '';
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.GITHUB_TOKEN).toBeUndefined();
    // When GITHUB_USERNAME is empty and validation is skipped, it returns empty string not default
    expect(config.GITHUB_USERNAME).toBeUndefined();
  });
});
