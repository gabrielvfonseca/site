// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

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
    process.env.NEXT_PUBLIC_WEB_URL = 'https://gabfon.com';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.NEXT_PUBLIC_WEB_URL).toBe('https://gabfon.com');
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config).toBeDefined();
  });
});
