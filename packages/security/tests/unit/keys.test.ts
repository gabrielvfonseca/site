// @vitest-environment node
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

const originalEnv = process.env;

describe('security keys', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns valid configuration with Arcjet settings', async () => {
    process.env.ARCJET_KEY = 'ajkey_test_key';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config.ARCJET_KEY).toBe('ajkey_test_key');
  });

  it('validates Arcjet key format', async () => {
    process.env.ARCJET_KEY = 'invalid_key';

    const { keys } = await import('../../src/keys');

    expect(() => keys()).toThrow();
  });

  it('skips validation when SKIP_ENV_VALIDATION is true', async () => {
    process.env.SKIP_ENV_VALIDATION = 'true';

    const { keys } = await import('../../src/keys');
    const config = keys();

    expect(config).toBeDefined();
  });

  it('handles empty string as undefined', async () => {
    process.env.ARCJET_KEY = '';

    const { keys } = await import('../../src/keys');

    expect(() => keys()).toThrow();
  });
});
