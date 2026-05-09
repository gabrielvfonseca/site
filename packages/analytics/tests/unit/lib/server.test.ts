import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the keys module
vi.mock('../../src/keys', () => ({
  keys: () => ({
    NEXT_PUBLIC_POSTHOG_KEY: 'phc_test123',
    NEXT_PUBLIC_POSTHOG_HOST: 'https://app.posthog.com',
  }),
}));

// Mock posthog-node
vi.mock('posthog-node', () => ({
  PostHog: vi.fn().mockImplementation((key, options) => ({
    key,
    options,
    capture: vi.fn(),
    identify: vi.fn(),
    alias: vi.fn(),
    flush: vi.fn(),
    shutdown: vi.fn(),
  })),
}));

describe('analytics server', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates PostHog instance with correct configuration', async () => {
    const { PostHog } = await import('posthog-node');
    const mockPostHog = vi.mocked(PostHog);

    await import('../../src/lib/server');

    expect(mockPostHog).toHaveBeenCalledWith('phc_test123', {
      host: 'https://app.posthog.com',
      flushAt: 1,
      flushInterval: 0,
    });
  });

  it('exports analytics instance', async () => {
    const { analytics } = await import('../../src/lib/server');

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

    await import('../../src/lib/server');

    const [, options] = mockPostHog.mock.calls[0];
    expect(options.flushAt).toBe(1);
    expect(options.flushInterval).toBe(0);
  });
});
