import { env } from '@/env';
import { posts } from './posts';
import { projects } from './projects';

export const config = {
  name: {
    value: 'Gabriel Fonseca',
  },
  title: {
    value: 'Software Developer',
  },
  location: {
    value: 'Lisbon, Portugal',
    alt: 'Lisbon, Portugal',
  },
  email: {
    url: `mailto:${env.NEXT_PUBLIC_EMAIL}`,
    value: env.NEXT_PUBLIC_EMAIL,
    alt: 'Email me',
  },
  projects: {
    title: 'Projects',
    items: {
      isEmpty: !(projects.length === 0),
      list: projects,
    },
  },
  posts: {
    title: 'Posts',
    items: {
      isEmpty: !(posts.length === 0),
      list: posts,
    },
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
};

export type Config = typeof config;
