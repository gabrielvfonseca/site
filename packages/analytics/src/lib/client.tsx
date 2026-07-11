'use client'; // Ensure this is a client component

import posthog, { type PostHog } from 'posthog-js';
import { PostHogProvider as PostHogProviderRaw } from 'posthog-js/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { keys } from '../keys';

type PostHogProviderProps = {
  readonly children: ReactNode;
};

const { NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST } = keys();

/**
 * Whether the configured PostHog key is a real project key rather than a local
 * placeholder. Placeholder keys satisfy env validation in local dev without real
 * credentials; initializing PostHog with one only produces 404/401 network noise.
 * @param key - The configured PostHog project key.
 * @returns True when the key looks real and PostHog should initialize.
 */
function isRealPostHogKey(key: string | undefined): key is string {
  return Boolean(key) && !key?.includes('placeholder');
}

/**
 * The PostHogProvider for the analytics.
 * @param properties - The PostHogProviderProps.
 * @returns The PostHogProvider for the analytics.
 */
export function PostHogProvider(
  properties: Omit<PostHogProviderProps, 'client'>
) {
  useEffect(() => {
    // Only initialize PostHog with a real key — placeholder keys used for local
    // env validation would otherwise spam 404/401 requests against `/ingest`.
    if (isRealPostHogKey(NEXT_PUBLIC_POSTHOG_KEY)) {
      posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
        // biome-ignore lint: Posthog API host
        api_host: '/ingest',
        // biome-ignore lint: Posthog UI host
        ui_host: NEXT_PUBLIC_POSTHOG_HOST,
        // biome-ignore lint: Posthog person profiles
        person_profiles: 'identified_only',
        // biome-ignore lint: Posthog capture pageview
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        // biome-ignore lint: Posthog capture pageleave
        capture_pageleave: true, // Overrides the `capture_pageview` setting
      }) as PostHog;
    }
  }, []);

  return <PostHogProviderRaw client={posthog} {...properties} />;
}

export { usePostHog as useAnalytics } from 'posthog-js/react';
