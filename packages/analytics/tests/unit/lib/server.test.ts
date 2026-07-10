import { beforeEach, describe, expect, it, vi } from 'vitest';

// Neutralize the `server-only` import guard so the module loads under vitest.
vi.mock('server-only', () => ({}));

// Mock the keys module (resolved relative to src/lib/server, three levels up).
vi.mock('../../../src/keys', () => ({
  keys: () => ({
    NEXT_PUBLIC_POSTHOG_KEY: 'phc_test123',
    NEXT_PUBLIC_POSTHOG_HOST: 'https://app.posthog.com',
  }),
}));

// Mock posthog-node. A regular (non-arrow) function is used so `new PostHog()`
// works as a constructor under vitest 4, while `vi.fn` keeps it a spy.
vi.mock('posthog-node', () => ({
  PostHog: vi.fn(function (
    this: Record<string, unknown>,
    key: string,
    options: unknown
  ) {
    this.key = key;
    this.options = options;
    this.capture = vi.fn();
    this.identify = vi.fn();
    this.alias = vi.fn();
    this.flush = vi.fn();
    this.shutdown = vi.fn();
  }),
}));

describe('analytics server', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates PostHog instance with correct configuration', async () => {
    const { PostHog } = await import('posthog-node');
    const mockPostHog = vi.mocked(PostHog);

    await import('../../../src/lib/server');

    expect(mockPostHog).toHaveBeenCalledWith('phc_test123', {
      host: 'https://app.posthog.com',
      flushAt: 1,
      flushInterval: 0,
    });
  });

  it('exports analytics instance', async () => {
    const { analytics } = await import('../../../src/lib/server');

    expect(analytics).toBeDefined();
    expect(typeof analytics.capture).toBe('function');
    expect(typeof analytics.identify).toBe('function');
    expect(typeof analytics.alias).toBe('function');
    expect(typeof analytics.flush).toBe('function');
    expect(typeof analytics.shutdown).toBe('function');
  });

  it('uses serverless configuration', async () => {
    const { PostHog } = await import('posthog-node');
    const mockPostHog = vi.mocked(PostHog);

    await import('../../../src/lib/server');

    const [, options] = mockPostHog.mock.calls[0];
    expect(options.flushAt).toBe(1);
    expect(options.flushInterval).toBe(0);
  });
});
