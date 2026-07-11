// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = process.env;

describe('rate-limit keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns valid configuration with redis settings', async () => {
    process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'token123';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.UPSTASH_REDIS_REST_URL).toBe('https://example.upstash.io');
    expect(config.UPSTASH_REDIS_REST_TOKEN).toBe('token123');
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config).toBeDefined();
  });

  it('handles empty string as undefined', async () => {
    process.env.UPSTASH_REDIS_REST_URL = '';
    process.env.UPSTASH_REDIS_REST_TOKEN = '';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.UPSTASH_REDIS_REST_URL).toBeUndefined();
    expect(config.UPSTASH_REDIS_REST_TOKEN).toBeUndefined();
  });
});
