import type { ReactNode } from 'react';
import { PostHogProvider } from './lib/client';
import { VercelAnalytics } from './vercel';

type AnalyticsProviderProps = {
  readonly children: ReactNode;
};

/**
 * The AnalyticsProvider for the analytics.
 * @param props - The AnalyticsProviderProps.
 * @returns The AnalyticsProvider for the analytics.
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <PostHogProvider>
      {children}
      <VercelAnalytics />
    </PostHogProvider>
  );
}
