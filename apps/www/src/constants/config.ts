import { env } from '@/env';

export const config = {
  name: 'Gabriel Fonseca',
  title: 'Software Developer',
  location: 'Lisbon, Portugal',
  email: `mailto:${env.NEXT_PUBLIC_EMAIL}`,
  social: {
    twitter: env.NEXT_PUBLIC_TWITTER_URL,
    linkedin: env.NEXT_PUBLIC_LINKEDIN_URL,
    github: env.NEXT_PUBLIC_GITHUB_URL,
  },
  schedule: env.NEXT_PUBLIC_SCHEDULE_URL,
} as const;
