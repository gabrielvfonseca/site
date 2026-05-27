import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

// Mock process.env
const originalEnv = process.env;

describe('seo keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns valid configuration with SEO settings', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    process.env.NEXT_PUBLIC_SITE_NAME = 'Example Site';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.NEXT_PUBLIC_SITE_URL).toBe('https://example.com');
    expect(config.NEXT_PUBLIC_SITE_NAME).toBe('Example Site');
  });

  it('validates site URL format', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'invalid-url';
    process.env.NEXT_PUBLIC_SITE_NAME = 'Example Site';
    process.env.SKIP_ENV_VALIDATION = 'false';

    await expect(async () => {
      const { keys } = await import('../../src/keys');
      keys();
    }).toThrow();
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config).toBeDefined();
  });

  it('handles empty string as undefined', async () => {
    process.env.NEXT_PUBLIC_SITE_URL = '';
    process.env.NEXT_PUBLIC_SITE_NAME = '';
    process.env.SKIP_ENV_VALIDATION = 'false';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.NEXT_PUBLIC_SITE_URL).toBeUndefined();
    expect(config.NEXT_PUBLIC_SITE_NAME).toBeUndefined();
  });
});
