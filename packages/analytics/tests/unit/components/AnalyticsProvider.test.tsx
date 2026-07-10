import { render, screen } from '@testing-library/react';
import posthog from 'posthog-js';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AnalyticsProvider } from '../../../src/index';

// Mock PostHog
vi.mock('posthog-js', () => ({
  default: {
    init: vi.fn(),
  },
}));

// Mock PostHogProvider
vi.mock('posthog-js/react', () => ({
  PostHogProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="posthog-provider">{children}</div>
  ),
  usePostHog: vi.fn(() => ({
    capture: vi.fn(),
    identify: vi.fn(),
  })),
}));

// Mock Vercel Analytics
vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}));

// Mock keys (resolved relative to src/lib/client, hence three levels up).
vi.mock('../../../src/keys', () => ({
  keys: () => ({
    NEXT_PUBLIC_POSTHOG_KEY: 'phc_test123',
    NEXT_PUBLIC_POSTHOG_HOST: 'https://app.posthog.com',
  }),
}));

describe('AnalyticsProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children with PostHogProvider', () => {
    render(
      <AnalyticsProvider>
        <div>Test Content</div>
      </AnalyticsProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('posthog-provider')).toBeInTheDocument();
  });

  it('includes VercelAnalytics component', () => {
    render(
      <AnalyticsProvider>
        <div>Test Content</div>
      </AnalyticsProvider>
    );

    expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument();
  });

  it('initializes PostHog with the configured key', () => {
    render(
      <AnalyticsProvider>
        <div>Test Content</div>
      </AnalyticsProvider>
    );

    expect(posthog.init).toHaveBeenCalledWith(
      'phc_test123',
      expect.any(Object)
    );
  });

  it('wraps content in proper provider hierarchy', () => {
    render(
      <AnalyticsProvider>
        <div data-testid="test-content">Test Content</div>
      </AnalyticsProvider>
    );

    const posthogProvider = screen.getByTestId('posthog-provider');
    const testContent = screen.getByTestId('test-content');
    const vercelAnalytics = screen.getByTestId('vercel-analytics');

    expect(posthogProvider).toContainElement(testContent);
    expect(posthogProvider).toContainElement(vercelAnalytics);
  });
});
