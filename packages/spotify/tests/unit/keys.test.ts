// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = process.env;

describe('spotify keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns the validated Spotify credentials', async () => {
    process.env.SPOTIFY_CLIENT_ID = 'client-id';
    process.env.SPOTIFY_CLIENT_SECRET = 'client-secret';
    process.env.SPOTIFY_REFRESH_TOKEN = 'refresh-token';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.SPOTIFY_CLIENT_ID).toBe('client-id');
    expect(config.SPOTIFY_CLIENT_SECRET).toBe('client-secret');
  });

  it('throws when a required credential is missing', async () => {
    process.env.SPOTIFY_CLIENT_ID = 'client-id';
    process.env.SKIP_ENV_VALIDATION = 'false';
    delete process.env.SPOTIFY_CLIENT_SECRET;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).toThrow();
  });

  it('skips validation when SKIP_ENV_VALIDATION is unset', async () => {
    delete process.env.SKIP_ENV_VALIDATION;
    delete process.env.SPOTIFY_CLIENT_ID;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });
});
