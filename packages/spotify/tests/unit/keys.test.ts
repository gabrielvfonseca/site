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

  it('handles empty string as undefined', async () => {
    process.env.SPOTIFY_CLIENT_ID = 'client-id';
    process.env.SPOTIFY_CLIENT_SECRET = '';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.SPOTIFY_CLIENT_SECRET).toBeUndefined();
  });

  it('returns undefined for missing optional credential', async () => {
    process.env.SPOTIFY_CLIENT_ID = 'client-id';
    process.env.SPOTIFY_CLIENT_SECRET = 'client-secret';
    process.env.SKIP_ENV_VALIDATION = 'false';
    delete process.env.SPOTIFY_REFRESH_TOKEN;

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.SPOTIFY_REFRESH_TOKEN).toBeUndefined();
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';
    delete process.env.SPOTIFY_CLIENT_ID;

    const { keys } = await import('../../src/keys');

    expect(() => keys()).not.toThrow();
  });
});
