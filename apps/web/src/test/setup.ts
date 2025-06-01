import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: 'a',
}));

// Mock environment variables
vi.mock('../../env', () => ({
  env: {
    NEXT_PUBLIC_EMAIL: 'jg.fonseca@outlook.pt',
    NEXT_PUBLIC_TWITTER_URL: 'https://x.com/gabfon_',
    NEXT_PUBLIC_LINKEDIN_URL: 'https://www.linkedin.com/in/gabrielvfonseca/',
    NEXT_PUBLIC_GITHUB_URL: 'https://github.com/gabrielvfonseca',
    NEXT_PUBLIC_SCHEDULE_URL:
      'https://calendar.notion.so/meet/gabrielvfonseca/schedule',
  },
}));

// Also mock the aliased path
vi.mock('@/env', () => ({
  env: {
    NEXT_PUBLIC_EMAIL: 'jg.fonseca@outlook.pt',
    NEXT_PUBLIC_TWITTER_URL: 'https://x.com/gabfon_',
    NEXT_PUBLIC_LINKEDIN_URL: 'https://www.linkedin.com/in/gabrielvfonseca/',
    NEXT_PUBLIC_GITHUB_URL: 'https://github.com/gabrielvfonseca',
    NEXT_PUBLIC_SCHEDULE_URL:
      'https://calendar.notion.so/meet/gabrielvfonseca/schedule',
  },
}));
