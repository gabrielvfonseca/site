import 'server-only'; // Ensure this is a server component
import { PostHog } from 'posthog-node';
import { keys } from '../keys';

/**
 * The analytics for the analytics.
 * @returns The analytics for the analytics.
 */
export const analytics = new PostHog(keys().NEXT_PUBLIC_POSTHOG_KEY, {
  host: keys().NEXT_PUBLIC_POSTHOG_HOST,

  // Don't batch events and flush immediately - we're running in a serverless environment
  flushAt: 1,
  flushInterval: 0,
});
