'use client'; // Ensure this is a client component

import posthog, { type PostHog } from 'posthog-js';
import { PostHogProvider as PostHogProviderRaw } from 'posthog-js/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { keys } from '../keys';

type PostHogProviderProps = {
  readonly children: ReactNode;
};

/**
 * The PostHogProvider for the analytics.
 * @param properties - The PostHogProviderProps.
 * @returns The PostHogProvider for the analytics.
 */
export function PostHogProvider(
  properties: Omit<PostHogProviderProps, 'client'>
) {
  useEffect(() => {
    posthog.init(keys().NEXT_PUBLIC_POSTHOG_KEY, {
      // biome-ignore lint: Posthog API host
      api_host: '/ingest',
      // biome-ignore lint: Posthog UI host
      ui_host: keys().NEXT_PUBLIC_POSTHOG_HOST,
      // biome-ignore lint: Posthog person profiles
      person_profiles: 'identified_only',
      // biome-ignore lint: Posthog capture pageview
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      // biome-ignore lint: Posthog capture pageleave
      capture_pageleave: true, // Overrides the `capture_pageview` setting
    }) as PostHog;
  }, []);

  return <PostHogProviderRaw client={posthog} {...properties} />;
}

export { usePostHog as useAnalytics } from 'posthog-js/react';
