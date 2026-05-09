# @gabfon/testing API Reference

## Installation

```bash
npm install @gabfon/testing
```

## Exports

### Configuration
```typescript
export { testingConfig, default } from './index.mjs';
```

### Global Setup
```typescript
export * from './setup';
```

## Configuration

### testingConfig

Pre-configured Vitest configuration for monorepo testing with React support and path aliases.

#### Usage

```typescript
// vitest.config.ts
import { testingConfig } from '@gabfon/testing';

export default testingConfig;
```

#### Configuration Details

```typescript
export const testingConfig = defineConfig({
  plugins: [react()],                    // React JSX support
  test: {
    environment: 'jsdom',                // Browser-like environment
  },
  resolve: {
    alias: {
      '@': path.resolve(Dirname, './'),           // Current package root
      '@gabfon': path.resolve(Dirname, '../../packages'), // Monorepo packages
    },
  },
});
```

#### Features

- **React Support**: Full JSX and React component testing
- **jsdom Environment**: DOM simulation for browser testing
- **Path Aliases**: Simplified imports across packages
- **TypeScript**: Full TypeScript integration

### Custom Configuration

```typescript
// vitest.config.ts
import { testingConfig } from '@gabfon/testing';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...testingConfig,
  test: {
    ...testingConfig.test,
    globals: true,                    // Enable global test functions
    coverage: {
      reporter: ['text', 'json'],
      exclude: ['node_modules/', '__tests__/'],
    },
  },
});
```

## Global Setup

The package automatically configures global test setup when imported. The setup includes:

### Web API Mocks

#### ResizeObserver

Mock for the ResizeObserver API used in responsive components.

```typescript
// Automatically available in tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
```

#### matchMedia

Mock for window.matchMedia used in responsive design testing.

```typescript
// Automatically available in tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

#### IntersectionObserver

Mock for the IntersectionObserver API used in scroll and visibility testing.

```typescript
// Automatically available in tests
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
```

### Environment Management

#### Process Environment Reset

Automatic environment variable cleanup between tests.

```typescript
// Automatically runs before each test
beforeEach(() => {
  vi.resetModules();
  process.env = { ...originalEnv };
});

// Automatically runs after each test
afterEach(() => {
  process.env = originalEnv;
});
```

## Usage Examples

### Basic Component Testing

```typescript
// packages/example/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Cross-Package Testing

```typescript
// packages/app/__tests__/integration.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@gabfon/design-system';
import { AnalyticsProvider } from '@gabfon/analytics';

describe('Cross-Package Integration', () => {
  it('integrates design system with analytics', () => {
    render(
      <AnalyticsProvider>
        <Button>Test Button</Button>
      </AnalyticsProvider>
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### API Client Testing

```typescript
// packages/github/__tests__/client.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { githubClient } from '@/client';

describe('GitHub Client', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches user data', async () => {
    const mockUser = { id: 1, name: 'Test User', login: 'testuser' };
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(mockUser),
      ok: true,
    });

    const user = await githubClient.getUser('testuser');
    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/testuser')
    );
  });

  it('handles API errors', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(githubClient.getUser('nonexistent')).rejects.toThrow();
  });
});
```

### Responsive Component Testing

```typescript
// packages/design-system/__tests__/ResponsiveComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ResponsiveComponent } from '@/components/ResponsiveComponent';

describe('ResponsiveComponent', () => {
  it('handles mobile view', () => {
    // Mock matchMedia to return mobile view
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 768px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })));

    render(<ResponsiveComponent />);
    expect(screen.getByText('Mobile View')).toBeInTheDocument();
  });

  it('handles desktop view', () => {
    // Mock matchMedia to return desktop view
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 769px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })));

    render(<ResponsiveComponent />);
    expect(screen.getByText('Desktop View')).toBeInTheDocument();
  });
});
```

### Hook Testing

```typescript
// packages/design-system/__tests__/useDebounce.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce Hook', () => {
  it('debounces value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 100 }
      }
    );

    expect(result.current).toBe('initial');

    // Update value
    rerender({ value: 'updated', delay: 100 });
    
    // Should still be initial due to debounce
    expect(result.current).toBe('initial');

    // Wait for debounce
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    expect(result.current).toBe('updated');
  });
});
```

### Environment Variable Testing

```typescript
// packages/analytics/__tests__/keys.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { keys } from '@/keys';

describe('Environment Keys', () => {
  beforeEach(() => {
    // Environment is reset automatically by global setup
  });

  it('validates required environment variables', () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'test-key';
    process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://test.posthog.com';

    const env = keys();
    expect(env.NEXT_PUBLIC_POSTHOG_KEY).toBe('test-key');
    expect(env.NEXT_PUBLIC_POSTHOG_HOST).toBe('https://test.posthog.com');
  });

  it('throws error for missing variables', () => {
    // Variables are reset, so validation should fail
    expect(() => keys()).toThrow();
  });
});
```

### Mock API Responses

```typescript
// packages/spotify/__tests__/client.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { spotifyClient } from '@/client';

describe('Spotify Client', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches currently playing track', async () => {
    const mockTrack = {
      item: {
        id: 'track-id',
        name: 'Test Song',
        artists: [{ name: 'Test Artist' }],
        album: { name: 'Test Album' },
      },
      is_playing: true,
    };

    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(mockTrack),
      ok: true,
    });

    const currentlyPlaying = await spotifyClient.getCurrentlyPlaying();
    expect(currentlyPlaying).toEqual(mockTrack);
  });

  it('handles API rate limiting', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 429,
      headers: new Headers({ 'Retry-After': '60' }),
    });

    await expect(spotifyClient.getCurrentlyPlaying()).rejects.toThrow();
  });
});
```

## Advanced Testing Patterns

### Custom Test Utilities

```typescript
// __tests__/utils/testUtils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { AnalyticsProvider } from '@gabfon/analytics';

// Custom render function with providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AnalyticsProvider>
        {children}
      </AnalyticsProvider>
    ),
    ...options,
  });
};

// Re-export everything from Testing Library
export * from '@testing-library/react';
export { customRender as render };
```

### Mock Factories

```typescript
// __tests__/mocks/factory.ts
import type { GitHubUser } from '@gabfon/github/types';

export const createMockGitHubUser = (overrides: Partial<GitHubUser> = {}): GitHubUser => ({
  id: 1,
  login: 'testuser',
  name: 'Test User',
  email: 'test@example.com',
  bio: 'Test bio',
  ...overrides,
});

export const createMockSpotifyTrack = (overrides = {}) => ({
  id: 'track-id',
  name: 'Test Track',
  artists: [{ name: 'Test Artist' }],
  album: { name: 'Test Album' },
  duration_ms: 180000,
  ...overrides,
});
```

### Test Data Builders

```typescript
// __tests__/builders/userBuilder.ts
import type { GitHubUser } from '@gabfon/github/types';

class UserBuilder {
  private user: Partial<GitHubUser> = {};

  static create(): UserBuilder {
    return new UserBuilder();
  }

  withId(id: number): UserBuilder {
    this.user.id = id;
    return this;
  }

  withLogin(login: string): UserBuilder {
    this.user.login = login;
    return this;
  }

  withName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  build(): GitHubUser {
    return {
      id: 1,
      login: 'testuser',
      name: 'Test User',
      ...this.user,
    } as GitHubUser;
  }
}

export { UserBuilder };
```

### Integration Testing

```typescript
// packages/app/__tests__/e2e/userFlow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserFlow } from '@/components/UserFlow';

describe('User Flow Integration', () => {
  it('completes user registration flow', async () => {
    // Mock API calls
    vi.mock('@/api/user', () => ({
      createUser: vi.fn().mockResolvedValue({ id: 1, name: 'Test User' }),
    }));

    render(<UserFlow />);

    // Step 1: Fill registration form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    // Step 2: Submit form
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Step 3: Verify success
    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    });
  });
});
```

## Configuration Customization

### Coverage Configuration

```typescript
// vitest.config.ts
import { testingConfig } from '@gabfon/testing';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...testingConfig,
  test: {
    ...testingConfig.test,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '__tests__/',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.config.*',
        '**/dist/**',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
```

### Custom Test Environment

```typescript
// vitest.config.ts
import { testingConfig } from '@gabfon/testing';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...testingConfig,
  test: {
    ...testingConfig.test,
    setupFiles: ['./src/test/setup.ts'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        url: 'http://localhost:3000',
      },
    },
  },
});
```

## Best Practices

### 1. Test Organization

```typescript
// Good: Descriptive test names and grouping
describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with correct text', () => {
      // Test implementation
    });
  });

  describe('Interactions', () => {
    it('handles click events', () => {
      // Test implementation
    });
  });
});

// Bad: Poor organization
describe('Button', () => {
  it('works', () => {
    // Unclear what this tests
  });
});
```

### 2. Mock Management

```typescript
// Good: Proper mock setup and cleanup
describe('Component with API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles API response', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ data: 'test' }),
    });

    // Test implementation
  });
});

// Bad: Leaking mocks between tests
global.fetch = vi.fn(); // Global setup
```

### 3. Assertion Quality

```typescript
// Good: Specific and meaningful assertions
expect(screen.getByRole('button')).toBeInTheDocument();
expect(screen.getByRole('button')).toBeDisabled();
expect(mockFunction).toHaveBeenCalledWith(expectedArgs);

// Bad: Generic assertions
expect(component).toBeTruthy();
expect(result).toBeDefined();
```

### 4. Test Data Management

```typescript
// Good: Use test factories or builders
const user = createMockUser({ name: 'Test User' });

// Bad: Hardcoded test data
const user = { id: 1, name: 'Test User', email: 'test@example.com' };
```

## Integration Examples

### With Design System Package

```typescript
// packages/design-system/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/button';

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('applies destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('bg-destructive');
  });
});
```

### With Analytics Package

```typescript
// packages/analytics/__tests__/provider.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AnalyticsProvider } from '@/index';

// Mock PostHog
vi.mock('posthog-js/react', () => ({
  PostHogProvider: ({ children }: { children: React.ReactNode }) => children,
  usePostHog: () => ({
    track: vi.fn(),
    identify: vi.fn(),
  }),
}));

describe('AnalyticsProvider', () => {
  it('renders children without errors', () => {
    render(
      <AnalyticsProvider>
        <div>Test Content</div>
      </AnalyticsProvider>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
```

### With API Packages

```typescript
// packages/github/__tests__/integration.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { githubClient } from '@/client';

describe('GitHub Integration', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches and processes user data', async () => {
    const mockUser = {
      id: 1,
      login: 'testuser',
      name: 'Test User',
      public_repos: 10,
      followers: 100,
    };

    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(mockUser),
      ok: true,
    });

    const user = await githubClient.getUser('testuser');
    
    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/testuser')
    );
  });
});
```

## Performance Testing

### Component Performance

```typescript
// __tests__/performance.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeavyComponent } from '@/components/HeavyComponent';

describe('Performance Tests', () => {
  it('renders within performance budget', () => {
    const startTime = performance.now();
    
    render(<HeavyComponent />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(100); // 100ms budget
  });
});
```

### Memory Usage Testing

```typescript
// __tests__/memory.test.ts
import { describe, it, expect } from 'vitest';

describe('Memory Tests', () => {
  it('does not leak memory on repeated operations', () => {
    const initialMemory = process.memoryUsage().heapUsed;
    
    // Perform operation multiple times
    for (let i = 0; i < 1000; i++) {
      // Some operation that might leak memory
      const data = new Array(1000).fill(null);
      data.length = 0; // Clear array
    }
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
    
    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;
    
    // Allow some memory increase but not excessive
    expect(memoryIncrease).toBeLessThan(1024 * 1024); // 1MB
  });
});
```
