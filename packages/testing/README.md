# @gabfon/testing

Testing utilities and configuration for the monorepo.

## Overview

This package provides shared testing utilities, configurations, and helpers for the monorepo. It includes Vitest configuration, React testing utilities, and common test patterns.

## Features

- **Vitest Configuration**: Pre-configured Vitest setup for the monorepo
- **React Testing**: React component testing utilities
- **Shared Utilities**: Common testing helpers and mocks
- **Type Safety**: Full TypeScript support for tests
- **Performance Testing**: Performance testing utilities

## Installation

```bash
pnpm add -D @gabfon/testing
```

## Usage

### Basic Test Setup

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { testingConfig } from '@gabfon/testing';

export default defineConfig(testingConfig);
```

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@gabfon/design-system/components/button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### API Testing

```typescript
import { createTestClient } from '@gabfon/testing';

test('API endpoint returns data', async () => {
  const client = createTestClient();
  const response = await client.get('/api/users');
  
  expect(response.status).toBe(200);
  expect(response.data).toHaveProperty('users');
});
```

### Database Testing

```typescript
import { setupTestDatabase, cleanupTestDatabase } from '@gabfon/testing';

beforeEach(async () => {
  await setupTestDatabase();
});

afterEach(async () => {
  await cleanupTestDatabase();
});

test('creates user in database', async () => {
  const user = await createUser({ name: 'John Doe' });
  expect(user.id).toBeDefined();
  expect(user.name).toBe('John Doe');
});
```

## Exports

- `./index.js` - Main testing utilities and configuration

## Testing Utilities

### Component Testing
- **Render Helpers**: Pre-configured render functions with providers
- **Custom Matchers**: Extended Jest/Vitest matchers
- **Mock Components**: Pre-built mock components for testing

### API Testing
- **Test Client**: HTTP client for API testing
- **Mock Handlers**: MSW handlers for API mocking
- **Response Helpers**: Utilities for testing API responses

### Database Testing
- **Test Database**: Isolated test database setup
- **Seed Data**: Test data seeding utilities
- **Cleanup Helpers**: Database cleanup utilities

### Performance Testing
- **Benchmark Utilities**: Performance benchmarking tools
- **Memory Testing**: Memory leak detection
- **Load Testing**: Basic load testing utilities

## Configuration

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { testingConfig } from '@gabfon/testing';

export default defineConfig({
  ...testingConfig,
  test: {
    ...testingConfig.test,
    // Your custom test configuration
  },
});
```

### Environment Setup

```typescript
// setupTests.ts
import '@gabfon/testing/setup';

// Global test setup
beforeAll(() => {
  // Setup code
});

afterAll(() => {
  // Cleanup code
});
```

## Dependencies

- `@vitejs/plugin-react` - React plugin for Vite
- `vitest` - Fast unit test framework

## Development

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Test Patterns

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from '../utils/date';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2023-01-01');
    expect(formatDate(date)).toBe('January 1, 2023');
  });
});
```

### Integration Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { setupTestDatabase } from '@gabfon/testing';

describe('User API', () => {
  beforeEach(async () => {
    await setupTestDatabase();
  });

  it('creates and retrieves user', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    
    const createResponse = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    expect(createResponse.status).toBe(201);
    
    const user = await createResponse.json();
    expect(user.name).toBe(userData.name);
  });
});
```

### Component Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/Button';

describe('Button', () => {
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

## Best Practices

1. **Test Isolation**: Each test should be independent and not rely on other tests
2. **Descriptive Names**: Use descriptive test names that explain what is being tested
3. **Arrange-Act-Assert**: Structure tests with clear arrange, act, and assert sections
4. **Mock External Dependencies**: Mock external services and APIs in tests
5. **Test Edge Cases**: Test both happy paths and edge cases
6. **Keep Tests Fast**: Write fast, focused unit tests
7. **Use TypeScript**: Leverage TypeScript for better test reliability