import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock process.env
const originalEnv = process.env;

describe('keys', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns valid configuration with GOOGLE_API_KEY', async () => {
    process.env.GOOGLE_API_KEY = 'test-api-key';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../../src/keys');
    const config = keys();

    expect(config.GOOGLE_API_KEY).toBe('test-api-key');
  });

  it('handles missing GOOGLE_API_KEY when optional', async () => {
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../../src/keys');
    const config = keys();

    expect(config.GOOGLE_API_KEY).toBeUndefined();
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../../src/keys');
    const config = keys();

    expect(config).toBeDefined();
  });

  it('handles empty string as undefined', async () => {
    process.env.GOOGLE_API_KEY = '';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../../src/keys');
    const config = keys();

    expect(config.GOOGLE_API_KEY).toBeUndefined();
  });
});
