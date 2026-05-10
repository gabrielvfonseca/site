import { getProviderData as getPostHogProviderData } from '@flags-sdk/posthog';
import { createFlagsDiscoveryEndpoint } from 'flags/next';
import { env } from '../../../../config/env';

export const GET = createFlagsDiscoveryEndpoint(() => {
  if (!(env.NEXT_PUBLIC_POSTHOG_KEY && env.NEXT_PUBLIC_POSTHOG_HOST)) {
    return {
      definitions: {},
      hints: [
        {
          key: 'posthog',
          text: 'Configure PostHog environment variables to enable flag discovery.',
        },
      ],
    };
  }

  return getPostHogProviderData({
    personalApiKey: env.NEXT_PUBLIC_POSTHOG_KEY,
    projectId: env.NEXT_PUBLIC_POSTHOG_HOST,
  });
});
