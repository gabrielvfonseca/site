import { QueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { vi } from 'vitest'

/**
 * Create a test QueryClient with disabled retries and caching
 */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })
}

/**
 * Create a mock API response
 */
export function createMockApiResponse(
  status = 200,
  data: unknown = {},
  options: ResponseInit = {}
) {
  return Promise.resolve(
    new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
  )
}

/**
 * Create a mock error response
 */
export function createMockErrorResponse(
  status = 500,
  message = 'Internal Server Error'
) {
  return Promise.resolve(
    new Response(JSON.stringify({ error: message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  )
}

/**
 * Mock fetch globally for tests
 */
export function setupMockFetch() {
  const mockFetch = vi.fn()
  global.fetch = mockFetch as any
  return mockFetch
}

/**
 * Create mock headers for API requests
 */
export function createMockHeaders(overrides?: Record<string, string>) {
  return {
    'Content-Type': 'application/json',
    'User-Agent': 'Test-Agent',
    ...overrides,
  }
}

/**
 * Create mock request context
 */
export function createMockRequest(
  url: string,
  options: RequestInit = {}
): Request {
  return new Request(url, {
    method: 'GET',
    headers: createMockHeaders(),
    ...options,
  })
}

/**
 * Parse form data from request body
 */
export function parseFormData(formData: FormData) {
  const data: Record<string, string | string[]> = {}

  for (const [key, value] of formData.entries()) {
    if (key in data) {
      const existing = data[key]
      if (Array.isArray(existing)) {
        existing.push(value)
      } else {
        data[key] = [existing as string, value]
      }
    } else {
      data[key] = value
    }
  }

  return data
}

/**
 * Mock Resend email service
 */
export function mockResendEmail() {
  return {
    send: vi.fn().mockResolvedValue({ id: 'test-email-id' }),
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'test-email-id' }),
    },
  }
}

/**
 * Mock rate limiting response
 */
export function createRateLimitResponse() {
  return {
    success: true,
    remaining: 100,
    reset: Date.now() + 3600000,
  }
}

/**
 * Mock rate limit exceeded response
 */
export function createRateLimitExceededResponse() {
  return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
    status: 429,
    headers: { 'Retry-After': '60' },
  })
}

/**
 * Create mock Spotify API responses
 */
export const mockSpotifyResponses = {
  currentlyPlaying: {
    item: {
      id: 'track-1',
      name: 'Test Track',
      artists: [{ name: 'Test Artist' }],
      duration_ms: 180000,
    },
    is_playing: true,
    progress_ms: 90000,
  },
  recentlyPlayed: {
    items: [
      {
        track: {
          id: 'track-1',
          name: 'Test Track 1',
          artists: [{ name: 'Artist 1' }],
        },
        played_at: new Date().toISOString(),
      },
    ],
  },
  topTracks: {
    items: [
      {
        id: 'track-1',
        name: 'Top Track 1',
        popularity: 85,
      },
    ],
  },
  topArtists: {
    items: [
      {
        id: 'artist-1',
        name: 'Top Artist 1',
        popularity: 90,
      },
    ],
  },
}

/**
 * Create mock GitHub API responses
 */
export const mockGitHubResponses = {
  user: {
    login: 'testuser',
    id: 1,
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    repositories_url: 'https://api.github.com/users/testuser/repos',
  },
  repos: [
    {
      id: 1,
      name: 'test-repo',
      full_name: 'testuser/test-repo',
      description: 'A test repository',
      html_url: 'https://github.com/testuser/test-repo',
      stargazers_count: 100,
      forks_count: 25,
      watchers_count: 50,
    },
  ],
  contributions: {
    total: 1500,
    thisYear: 500,
  },
  events: [
    {
      id: 'event-1',
      type: 'PushEvent',
      created_at: new Date().toISOString(),
      repo: { name: 'testuser/test-repo' },
    },
  ],
}

/**
 * Create mock Strava API responses
 */
export const mockStravaResponses = {
  athlete: {
    id: 12345,
    firstname: 'Test',
    lastname: 'User',
    profile: 'https://example.com/profile.jpg',
  },
  activities: [
    {
      id: 1,
      name: 'Test Run',
      type: 'Run',
      distance: 5000,
      moving_time: 1800,
      start_date: new Date().toISOString(),
    },
  ],
  stats: {
    all_ride_totals: {
      count: 100,
      distance: 5000000,
      moving_time: 180000,
    },
  },
}

/**
 * Delay execution for async testing
 */
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Wait for condition to be true
 */
export async function waitFor(
  condition: () => boolean,
  timeout = 1000,
  interval = 50
) {
  const startTime = Date.now()

  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Wait timeout exceeded')
    }
    await delay(interval)
  }
}
