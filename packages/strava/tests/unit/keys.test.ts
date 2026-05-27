import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

// Mock process.env
const originalEnv = process.env;

describe('strava keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns valid configuration with Strava credentials', async () => {
    process.env.STRAVA_CLIENT_ID = 'test_client_id';
    process.env.STRAVA_CLIENT_SECRET = 'test_client_secret';
    process.env.STRAVA_REFRESH_TOKEN = 'test_refresh_token';
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.STRAVA_CLIENT_ID).toBe('test_client_id');
    expect(config.STRAVA_CLIENT_SECRET).toBe('test_client_secret');
    expect(config.STRAVA_REFRESH_TOKEN).toBe('test_refresh_token');
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config).toBeDefined();
  });

  it('handles empty string as undefined', async () => {
    process.env.STRAVA_CLIENT_ID = '';
    process.env.STRAVA_CLIENT_SECRET = '';
    process.env.STRAVA_REFRESH_TOKEN = '';
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.STRAVA_CLIENT_ID).toBeUndefined();
    expect(config.STRAVA_CLIENT_SECRET).toBeUndefined();
    expect(config.STRAVA_REFRESH_TOKEN).toBeUndefined();
  });
});
