import '@testing-library/jest-dom';
import {
  type RenderResult,
  cleanup,
  type render as rtlRender,
} from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, vi } from 'vitest';

// Configure testing library to use React's act
vi.mock('@testing-library/react', async () => {
  const actual = await vi.importActual<typeof import('@testing-library/react')>(
    '@testing-library/react'
  );
  return {
    ...actual,
    render: (
      ui: ReactElement,
      options?: Parameters<typeof rtlRender>[1]
    ): RenderResult => {
      return actual.render(ui, options);
    },
  };
});

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js components
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/link', () => ({
  default: 'a',
}));

// Mock environment variables
vi.mock('@repo/analytics', () => ({
  trackEvent: vi.fn(),
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
