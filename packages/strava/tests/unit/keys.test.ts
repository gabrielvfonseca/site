// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = process.env;

describe('strava keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns the validated Strava credentials', async () => {
    process.env.STRAVA_CLIENT_ID = 'client-id';
    process.env.STRAVA_CLIENT_SECRET = 'client-secret';
    process.env.STRAVA_REFRESH_TOKEN = 'refresh-token';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.STRAVA_CLIENT_ID).toBe('client-id');
    expect(config.STRAVA_REFRESH_TOKEN).toBe('refresh-token');
  });

  it('handles empty string as undefined', async () => {
    process.env.STRAVA_CLIENT_ID = 'client-id';
    process.env.STRAVA_CLIENT_SECRET = '';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.STRAVA_CLIENT_SECRET).toBeUndefined();
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';
    delete process.env.STRAVA_CLIENT_ID;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });
});
