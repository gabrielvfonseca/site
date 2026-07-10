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

  it('throws when a required credential is missing', async () => {
    process.env.STRAVA_CLIENT_ID = 'client-id';
    process.env.SKIP_ENV_VALIDATION = 'false';
    delete process.env.STRAVA_CLIENT_SECRET;
    delete process.env.STRAVA_REFRESH_TOKEN;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).toThrow();
  });

  it('skips validation when SKIP_ENV_VALIDATION is unset', async () => {
    delete process.env.SKIP_ENV_VALIDATION;
    delete process.env.STRAVA_CLIENT_ID;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });
});
