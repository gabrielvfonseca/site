# testing

## Overview

The `@apps/www` application includes a comprehensive testing infrastructure built with Vitest and Playwright, providing full coverage for unit, integration, and end-to-end testing scenarios.

## Testing Stack

### Core Testing Frameworks
- **Vitest** - Fast unit testing framework with TypeScript support
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
│   ├── database/        # Database integration tests
│   └── auth/           # Authentication testing
├── e2e/              # End-to-end tests
│   ├── auth/            # Authentication flows
│   ├── navigation/      # Navigation testing
│   ├── forms/           # Form submission testing
│   └── accessibility/   # Accessibility testing
├── fixtures/          # Test data and mocks
│   ├── users.json       # User test data
│   ├── posts.json       # Blog post test data
│   └── api-responses.json # API response mocks
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
bun run test:coverage

# Run specific test types
bun run test:unit        # Unit tests only
bun run test:integration # Integration tests only
bun run test:e2e         # E2E tests only
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
import { Button } from '@gabfon/ui';

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
// tests/unit/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuth } from '@/hooks/useAuth';

// Mock the auth context
vi.mock('@/components/providers/auth-provider', () => ({
  AuthProvider: ({ children }) => <div>{children}</div>
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns initial auth state', () => {
    const { result } = renderHook(() => useAuth());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('handles login correctly', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    expect(result.current.user).toEqual({
      id: '1',
      email: 'test@example.com'
    });
    expect(result.current.isLoading).toBe(false);
  });
});
```

## Integration Testing

### API Route Testing

Example integration test for API routes:

```typescript
// tests/integration/api/posts.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { POST } from 'test/api-helper';

describe('POST /api/posts', () => {
  beforeEach(() => {
    // Setup database state
    vi.mocked('@/data-access/queries/query-posts');
  });

  afterEach(() => {
    // Cleanup
    vi.restoreAllMocks();
  });

  it('creates a new post successfully', async () => {
    const postData = {
      title: 'Test Post',
      content: 'This is test content',
      published: false
    };

    const response = await POST('/api/posts', postData);
    
    expect(response.status).toBe(201);
    expect(response.data).toMatchObject({
      id: expect.any(String),
      title: postData.title,
      content: postData.content,
      published: postData.published,
      createdAt: expect.any(String)
    });
  });

  it('validates required fields', async () => {
    const invalidData = {
      title: '',
      content: 'Short'
    };

    const response = await POST('/api/posts', invalidData);
    
    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('error');
  });

  it('handles authentication correctly', async () => {
    const postData = {
      title: 'Test Post',
      content: 'This is test content'
    };

    // Test without authentication
    const response = await POST('/api/posts', postData, { skipAuth: true });
    
    expect(response.status).toBe(401);
  });
});
```

### Database Integration Testing

Example database integration test:

```typescript
// tests/integration/database/posts.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { queryAllPosts, createPost } from '@/data-access/queries/query-posts';
import { setupTestDb, cleanupTestDb } from '@/tests/utils/database';

describe('Database Posts Operations', () => {
  beforeEach(async () => {
    await setupTestDb();
  });

  afterEach(async () => {
    await cleanupTestDb();
  });

  it('creates and retrieves posts correctly', async () => {
    const postData = {
      title: 'Test Post',
      content: 'Test content',
      published: true
    };

    const created = await createPost(postData);
    expect(created).toMatchObject(postData);

    const posts = await queryAllPosts();
    expect(posts).toContainEqual(created);
  });

  it('handles query filters correctly', async () => {
    // Create test data
    await createPost({ title: 'Published Post', content: 'Content', published: true });
    await createPost({ title: 'Draft Post', content: 'Content', published: false });

    const publishedPosts = await queryAllPosts({ published: true });
    const allPosts = await queryAllPosts();

    expect(publishedPosts).toHaveLength(1);
    expect(allPosts).toHaveLength(2);
  });
});
```

## End-to-End Testing

### Authentication Flow

Example E2E test for user authentication:

```typescript
// tests/e2e/auth/login.test.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '@/pages/login';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('user can login with valid credentials', async ({ page }) => {
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/dashboard/);
    
    // Should show user menu
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('shows error with invalid credentials', async ({ page }) => {
    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');

    // Should show error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"])).toContainText('Invalid credentials');
    
    // Should stay on login page
    await expect(page).toHaveURL(/login/);
  });

  test('supports form validation', async ({ page }) => {
    await page.click('[data-testid="login-button"]');

    // Should show validation errors
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-error"])).toBeVisible();
    await expect(page.locator('[data-testid="email-error"])).toContainText('Email is required');
  });
});
```

### Navigation Testing

Example E2E test for navigation:

```typescript
// tests/e2e/navigation/main-menu.test.ts
import { test, expect } from '@playwright/test';

test.describe('Main Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigation menu is accessible', async ({ page }) => {
    const menu = page.locator('[data-testid="main-menu"]');
    
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('button', { name: 'Home' })).toBeVisible();
    await expect(menu.getByRole('button', { name: 'Blog' })).toBeVisible();
    await expect(menu.getByRole('button', { name: 'About' })).toBeVisible();
  });

  test('navigation works correctly', async ({ page }) => {
    await page.click('[data-testid="blog-link"]');
    
    await expect(page).toHaveURL(/blog/);
    await expect(page.locator('h1')).toContainText('Blog');
  });

  test('mobile navigation is responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
    
    await page.click('[data-testid="mobile-menu-toggle"]');
    await expect(page.locator('[data-testid="mobile-menu-items"]')).toBeVisible();
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

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <TestProviders>
        {children}
      </TestProviders>
    ),
    ...options
  });
};

export const createMockPost = (overrides = {}) => ({
  id: '1',
  title: 'Test Post',
  content: 'Test content',
  published: true,
  createdAt: new Date().toISOString(),
  ...overrides
});

export const waitForApi = (ms = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));
```

### Database Test Utilities

```typescript
// tests/utils/database.ts
import { Database } from '@gabfon/database';

let testDb: Database;

export const setupTestDb = async () => {
  testDb = new Database({
    provider: 'sqlite',
    connectionString: ':memory:'
  });
  
  // Run migrations
  await testDb.migrate();
  
  // Seed test data
  await seedTestData(testDb);
};

export const cleanupTestDb = async () => {
  if (testDb) {
    await testDb.close();
    testDb = null;
  }
};

export const getTestDb = () => testDb;
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
    setupFiles: ['./tests/utils/setup.ts'],
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
      '@gabfon/testing': path.resolve(__dirname, '../../packages/testing/src')
    }
  }
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

This testing infrastructure provides comprehensive coverage for the `@apps/www` application, ensuring code quality, functionality, and user experience across all scenarios.