
'use client'

import { Analytics } from '@vercel/analytics/react';

// PostHog Provider
export function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
};