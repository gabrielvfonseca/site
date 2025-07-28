import { env } from '@/env';

export const config = {
  name: 'Gabriel Fonseca',
  title: 'Software Developer',
  location: {
    value: 'Lisbon, Portugal',
    alt: 'Lisbon, Portugal',
  },
  email: {
    url: `mailto:${env.NEXT_PUBLIC_EMAIL}`,
    value: env.NEXT_PUBLIC_EMAIL,
    alt: 'Email me',
  },
  social: {
    twitter: {
      url: env.NEXT_PUBLIC_TWITTER_URL,
      alt: 'Twitter',
    },
    linkedin: {
      url: env.NEXT_PUBLIC_LINKEDIN_URL,
      alt: 'LinkedIn',
    },
    github: {
      url: env.NEXT_PUBLIC_GITHUB_URL,
      alt: 'GitHub',
    },
  },
  schedule: {
    url: env.NEXT_PUBLIC_SCHEDULE_URL,
    alt: 'Schedule a meeting',
  },
} as const;
