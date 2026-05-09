# testing

## Overview

The `site` application includes a comprehensive testing infrastructure built with Vitest and Playwright, providing full coverage for unit, integration, and end-to-end testing scenarios.

## Testing Stack

### Core Testing Frameworks
- **Vitest 3.2.4** - Fast unit testing framework with TypeScript support
- **React Testing Library** - Component testing utilities
- **Playwright** - E2E testing with multi-browser support
- **@gabfon/testing** - Shared testing utilities and mocks

### Test Organization

```
tests/
├── unit/              # Unit tests
│   ├── components/     # Component unit tests
│   ├── hooks/          # Hook testing
│   ├── utils/          # Utility function tests
│   └── lib/            # Library function tests
├── integration/       # Integration tests
│   ├── api/            # API route testing
│   ├── services/       # Service integration testing
│   └── security/       # Security testing
├── e2e/              # End-to-end tests
│   ├── api/            # API endpoint testing
│   ├── navigation/      # Navigation testing
│   ├── forms/           # Form submission testing
│   └── accessibility/   # Accessibility testing
├── fixtures/          # Test data and mocks
│   ├── users.json       # User test data
│   ├── api-responses.json # API response mocks
│   └── music-data.json # Music service test data
└── utils/             # Testing utilities
    ├── setup.ts         # Test setup configuration
    ├── helpers.ts       # Common test helpers
    └── mocks.ts         # Global mocks
```

## Running Tests

### Available Scripts

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:cover

# Run specific test types
bun run test:unit        # Unit tests only
bun run test:integration # Integration tests only
bun run test:e2e         # E2E tests only

# Run specific test patterns
bun run test --grep "API"
bun run test --grep "Component"
```

### Test Commands

```bash
# Run specific test file
bun test Button.test.tsx

# Run tests matching pattern
bun test --grep "Button"

# Run tests in watch mode with specific file
bun test Button.test.tsx --watch

# Generate coverage report
bun test --coverage
```

## Unit Testing

### Component Testing

Example unit test for a UI component:

```typescript
// tests/unit/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Button } from '@gabfon/design-system/components/button';

describe('Button Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct styles for variants', () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
    
    rerender(<Button variant="outline">Cancel</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-input');
  });

  it('supports accessibility attributes', () => {
    render(
      <Button disabled aria-label="Submit form">
        Submit
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-label', 'Submit form');
  });
});
```

### Hook Testing

Example test for a custom hook:

```typescript
// tests/unit/hooks/useQueryState.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useQueryState } from 'nuqs';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
}));

describe('useQueryState Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useQueryState('q'));
    
    expect(result.current[0]).toBe('');
    expect(typeof result.current[1]).toBe('function');
  });

  it('updates URL state correctly', async () => {
    const { result } = renderHook(() => useQueryState('q'));
    
    await act(async () => {
      result.current[1]('test');
    });
    
    expect(result.current[0]).toBe('test');
  });
});
```

## Integration Testing

### API Route Testing

Example integration test for API routes:

```typescript
// tests/integration/api/chat.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { POST } from '@/app/api/chat/route';

// Mock OpenAI
vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn(),
}));

// Mock Arcjet
vi.mock('@arcjet/next', () => ({
  arcjet: vi.fn(() => ({
    protect: vi.fn().mockResolvedValue({ isDenied: false }),
  })),
}));

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('processes chat message successfully', async () => {
    const requestData = {
      message: 'Hello, AI!'
    };

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('response');
  });

  it('validates required fields', async () => {
    const invalidData = {
      message: ''
    };

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  it('handles Arcjet protection correctly', async () => {
    // Mock Arcjet to deny request
    const { arcjet } = require('@arcjet/next');
    arcjet.mockReturnValue({
      protect: vi.fn().mockResolvedValue({ isDenied: true }),
    });

    const requestData = {
      message: 'Test message'
    };

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    
    expect(response.status).toBe(403);
    const data = await response.json();
    expect(data.error).toBe('Request denied');
  });
});
```

### Database Integration Testing

Example database integration test:

```typescript
// tests/integration/services/spotify.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getNowPlaying, getTopTracks } from '@/lib/spotify';

// Mock fetch globally
vi.mock('global/fetch', () => vi.fn());

describe('Spotify Service Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches now playing data correctly', async () => {
    const mockResponse = {
      item: {
        name: 'Test Song',
        artists: [{ name: 'Test Artist' }],
        album: { name: 'Test Album', images: [{ url: 'test.jpg' }] },
      },
      is_playing: true,
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getNowPlaying('test-token');
    
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: { Authorization: 'Bearer test-token' },
      }
    );
  });

  it('handles API errors gracefully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
    });

    await expect(getNowPlaying('invalid-token')).rejects.toThrow();
  });
});
```

## End-to-End Testing

### Authentication Flow

Example E2E test for user authentication:

```typescript
// tests/e2e/api/chat-api.test.ts
import { test, expect } from '@playwright/test';

test.describe('Chat API E2E', () => {
  test('can send chat message and receive response', async ({ page, request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'Hello, AI!'
      }
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('response');
    expect(typeof data.response).toBe('string');
  });

  test('handles invalid requests', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: ''
      }
    });

    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  test('rate limits excessive requests', async ({ request }) => {
    // Make multiple rapid requests
    const requests = Array(10).fill(null).map(() => 
      request.post('/api/chat', {
        data: { message: 'Test message' }
      })
    );

    const responses = await Promise.all(requests);
    
    // At least one should be rate limited
    const rateLimited = responses.some(r => r.status() === 429);
    expect(rateLimited).toBeTruthy();
  });
});
```

### Navigation Testing

Example E2E test for navigation:

```typescript
// tests/e2e/navigation/site-navigation.test.ts
import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigation menu is accessible', async ({ page }) => {
    const nav = page.locator('nav');
    
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /about/i })).toBeVisible();
  });

  test('API endpoints are accessible', async ({ request }) => {
    const endpoints = [
      '/api/chat',
      '/api/github/stars',
      '/api/spotify/now-playing',
      '/api/strava/activities',
      '/api/now'
    ];

    for (const endpoint of endpoints) {
      const response = await request.get(endpoint);
      // Should not error (may return 401 for auth-protected endpoints)
      expect([200, 401, 404]).toContain(response.status());
    }
  });

  test('mobile navigation is responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Test mobile-specific navigation if present
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    if (await mobileMenu.isVisible()) {
      await mobileMenu.click();
      await expect(page.locator('[data-testid="mobile-menu-items"]')).toBeVisible();
    }
  });
});
```

## Testing Utilities

### Test Setup

```typescript
// tests/utils/setup.ts
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Global test setup
beforeAll(() => {
  // Mock IntersectionObserver
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }))
  });

  // Mock ResizeObserver
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }))
  });

  // Mock fetch for API tests
  global.fetch = vi.fn();
});

// Cleanup after each test
afterEach(() => {
  vi.clearAllMocks();
});
```

### Test Helpers

```typescript
// tests/utils/helpers.ts
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Test providers wrapper
const TestProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions
) => {
  return render(ui, {
    wrapper: TestProviders,
    ...options
  });
};

export const createMockMusicData = (overrides = {}) => ({
  spotify: {
    item: {
      name: 'Test Song',
      artists: [{ name: 'Test Artist' }],
      album: { name: 'Test Album' },
    },
    is_playing: true,
  },
  strava: {
    recent: [{ name: 'Morning Run', distance: 5000, type: 'Run' }],
  },
  github: {
    stars: 42,
  },
  ...overrides
});

export const waitForApi = (ms = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));
```

### Database Test Utilities

```typescript
// tests/utils/mocks.ts
import { vi } from 'vitest';

// Mock API responses
export const mockSpotifyResponse = {
  item: {
    name: 'Test Song',
    artists: [{ name: 'Test Artist' }],
    album: { name: 'Test Album', images: [{ url: 'test.jpg' }] },
  },
  is_playing: true,
};

export const mockStravaResponse = {
  recent: [
    { name: 'Morning Run', distance: 5000, type: 'Run', start_date: '2024-01-01T08:00:00Z' }
  ],
  stats: {
    all_ride_totals: { distance: 10000, count: 5 },
    all_run_totals: { distance: 50000, count: 20 },
  },
};

export const mockGitHubResponse = {
  stargazers_count: 42,
  name: 'test-repo',
  full_name: 'user/test-repo',
};

// Mock service functions
export const mockSpotifyService = {
  getNowPlaying: vi.fn().mockResolvedValue(mockSpotifyResponse),
  getTopTracks: vi.fn().mockResolvedValue([]),
};

export const mockStravaService = {
  getActivities: vi.fn().mockResolvedValue(mockStravaResponse.recent),
  getStats: vi.fn().mockResolvedValue(mockStravaResponse.stats),
};

export const mockGitHubService = {
  getRepoStars: vi.fn().mockResolvedValue(mockGitHubResponse),
};
```

## Coverage Configuration

### Vitest Coverage Setup

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    // Ensure React 19 compatibility
    testTimeout: 10_000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@gabfon/analytics': path.resolve(
        __dirname,
        '../../packages/analytics/src'
      ),
      '@gabfon/design-system': path.resolve(
        __dirname,
        '../../packages/design-system/src'
      ),
      '@gabfon/testing': path.resolve(__dirname, '../../packages/testing'),
    },
  },
});
```

### Coverage Reports

```bash
# Generate coverage report
bun run test:coverage

# View coverage in browser
open coverage/index.html

# Check coverage thresholds
bun run test:coverage --reporter=json
```

## Best Practices

### Test Organization

1. **Arrange, Act, Assert Pattern**
   ```typescript
   // Arrange
   const mockUser = createMockUser();
   
   // Act
   const result = await createUser(mockUser);
   
   // Assert
   expect(result).toBeDefined();
   ```

2. **Descriptive Test Names**
   ```typescript
   it('creates user with valid data', () => { ... });
   it('throws error with duplicate email', () => { ... });
   it('updates user profile correctly', () => { ... });
   ```

3. **Test Isolation**
   ```typescript
   beforeEach(() => {
     vi.clearAllMocks();
   });
   
   afterEach(() => {
     vi.restoreAllMocks();
   });
   ```

### Mocking Strategy

1. **Mock External Dependencies**
   ```typescript
   vi.mock('@gabfon/analytics', () => ({
     trackEvent: vi.fn(),
     trackPageView: vi.fn()
   }));
   ```

2. **Mock API Responses**
   ```typescript
   vi.mock('@/data-access/queries/query-posts', () => ({
     queryAllPosts: vi.fn().mockResolvedValue(mockPosts)
   }));
   ```

3. **Mock Network Requests**
   ```typescript
   vi.mock('node-fetch', () => ({
     default: vi.fn().mockResolvedValue({
       ok: true,
       json: () => Promise.resolve(mockData)
     })
   }));
   ```

### Accessibility Testing

1. **Automated Accessibility Tests**
   ```typescript
   test('navigation is accessible', async ({ page }) => {
     await page.goto('/');
     
     // Check for accessibility violations
     const accessibilityScan = await page.accessibility.snapshot();
     expect(accessibilityScan).toBeLessThan(10);
   });
   ```

2. **Keyboard Navigation**
   ```typescript
   test('supports keyboard navigation', async ({ page }) => {
     await page.goto('/');
     
     // Test Tab navigation
     await page.keyboard.press('Tab');
     await expect(page.locator(':focus')).toBeVisible();
     
     // Test Enter key
     await page.keyboard.press('Enter');
   });
   ```

## Continuous Integration

### GitHub Actions Testing

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
          
      - name: Install dependencies
        run: bun install --frozen-lockfile
        
      - name: Run tests
        run: bun run test:coverage
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

This testing infrastructure provides comprehensive coverage for the `site` application, ensuring code quality, functionality, and user experience across all scenarios.