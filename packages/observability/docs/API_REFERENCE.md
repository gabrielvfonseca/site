# @gabfon/observability API Reference

## Installation

```bash
npm install @gabfon/observability
```

## Environment Setup

Create environment variables for observability services:

```env
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_DSN=your_server_sentry_dsn
LOGTAIL_SOURCE_TOKEN=your_logtail_token
```

## Exports

### Main Utilities
```typescript
export { parseError } from './index';
```

### Client-Side
```typescript
export { initializeSentry } from './client';
```

### Server-Side
```typescript
export { register } from './instrumentation';
export { log } from './log';
```

### Next.js Configuration
```typescript
export { config } from './next-config';
```

### Environment Keys
```typescript
export { keys } from './keys';
```

## Core Functions

### parseError

Centralized error parsing function that automatically captures errors in Sentry and logs them to Logtail.

#### Signature

```typescript
function parseError(error: unknown): string
```

#### Parameters

- `error: unknown` - The error to parse and capture

#### Returns

- `string` - A user-friendly error message

#### Usage

```typescript
import { parseError } from '@gabfon/observability';

try {
  // Your code that might throw an error
  await riskyOperation();
} catch (error) {
  const message = parseError(error);
  console.error(message); // User-friendly message
  // Error is automatically sent to Sentry and Logtail
}
```

#### Error Types Handled

```typescript
// Standard Error objects
const error = new Error('Something went wrong');
parseError(error); // 'Something went wrong'

// Objects with message property
const errorObj = { message: 'Custom error message' };
parseError(errorObj); // 'Custom error message'

// Primitive values
parseError('String error'); // 'String error'
parseError(404); // '404'
parseError(true); // 'true'

// Unknown types
parseError(undefined); // 'An error occurred'
parseError(null); // 'An error occurred'
```

## Client-Side

### initializeSentry

Initializes Sentry on the client side with session replay and performance monitoring.

#### Signature

```typescript
function initializeSentry(): ReturnType<typeof init>
```

#### Usage

```typescript
// app/layout.tsx
import { initializeSentry } from '@gabfon/observability/client';

initializeSentry();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

#### Configuration

```typescript
// Default configuration
{
  dsn: keys().NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
  replaysOnErrorSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  integrations: [
    replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
}
```

#### Features

- **Error Tracking**: Automatic error capture and reporting
- **Performance Monitoring**: Trace sampling for performance insights
- **Session Replay**: User session recording for debugging
- **Privacy Protection**: Text masking and media blocking

## Server-Side

### register

Registers server-side instrumentation for Sentry error tracking.

#### Signature

```typescript
function register(): void
```

#### Usage

```typescript
// instrumentation.ts (Next.js 13+)
import { register } from '@gabfon/observability/instrumentation';

export function register() {
  // This function is called by Next.js
  register();
}
```

#### Configuration

```typescript
// Server-side Sentry configuration
{
  dsn: keys().SENTRY_DSN,
  tracesSampleRate: 1,
}
```

### log

Logtail logging instance for structured server-side logging.

#### Usage

```typescript
import { log } from '@gabfon/observability/log';

// Log levels
log.info('User logged in', { userId: '123' });
log.warn('Deprecated API used', { endpoint: '/old-api' });
log.error('Database connection failed', { error: 'connection_timeout' });
```

#### Log Methods

```typescript
log.info(message: string, context?: object): void
log.warn(message: string, context?: object): void
log.error(message: string, context?: object): void
log.debug(message: string, context?: object): void
```

## Next.js Configuration

### config

Next.js configuration object with observability integrations.

#### Usage

```typescript
// next.config.js
import { config } from '@gabfon/observability/next-config';

export default config;
```

#### Features

- **Sentry Integration**: Automatic Sentry configuration
- **Error Handling**: Global error boundaries
- **Performance Monitoring**: Built-in performance tracking
- **Middleware Integration**: Request/response logging

## Environment Variables

### Required Variables

| Variable | Description | Type | Environment | Required |
|----------|-------------|------|-------------|----------|
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for client-side error tracking | string | Client | Yes |
| `SENTRY_DSN` | Sentry DSN for server-side error tracking | string | Server | Yes |
| `LOGTAIL_SOURCE_TOKEN` | Logtail source token for structured logging | string | Server | Yes |

### Environment Validation

```typescript
import { keys } from '@gabfon/observability';

// Validates environment variables and returns typed object
const env = keys();
console.log(env.NEXT_PUBLIC_SENTRY_DSN);
console.log(env.SENTRY_DSN);
console.log(env.LOGTAIL_SOURCE_TOKEN);
```

### Validation Rules

- `NEXT_PUBLIC_SENTRY_DSN`: Must be a valid Sentry DSN string
- `SENTRY_DSN`: Must be a valid Sentry DSN string
- `LOGTAIL_SOURCE_TOKEN`: Must be a valid Logtail source token

## Usage Examples

### Basic Error Handling

```typescript
// components/ExampleComponent.tsx
import { parseError } from '@gabfon/observability';

function ExampleComponent() {
  const handleClick = async () => {
    try {
      await fetch('/api/data');
    } catch (error) {
      const message = parseError(error);
      alert(message); // User-friendly error message
    }
  };

  return <button onClick={handleClick}>Load Data</button>;
}
```

### API Route Error Handling

```typescript
// app/api/users/route.ts
import { parseError } from '@gabfon/observability';
import { log } from '@gabfon/observability/log';

export async function GET() {
  try {
    const users = await getUsers();
    log.info('Users fetched successfully', { count: users.length });
    return Response.json(users);
  } catch (error) {
    const message = parseError(error);
    return Response.json({ error: message }, { status: 500 });
  }
}
```

### React Error Boundary

```typescript
// components/ErrorBoundary.tsx
import React from 'react';
import { parseError } from '@gabfon/observability';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: string;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: parseError(error) };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const message = parseError(error);
    console.error('Error caught by boundary:', message, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <p>{this.state.error}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Server Action Error Handling

```typescript
// actions/userActions.ts
'use server';

import { parseError } from '@gabfon/observability';
import { log } from '@gabfon/observability/log';

export async function createUser(userData: UserData) {
  try {
    const user = await db.user.create({ data: userData });
    log.info('User created successfully', { userId: user.id });
    return { success: true, user };
  } catch (error) {
    const message = parseError(error);
    log.error('User creation failed', { error: message });
    return { success: false, error: message };
  }
}
```

### Custom Error Handling Hook

```typescript
// hooks/useErrorHandler.ts
import { useCallback } from 'react';
import { parseError } from '@gabfon/observability';

export function useErrorHandler() {
  const handleError = useCallback((error: unknown) => {
    const message = parseError(error);
    // Additional error handling logic
    console.error('Handled error:', message);
    return message;
  }, []);

  return { handleError };
}

// Usage
// components/ComponentWithErrorHandling.tsx
function ComponentWithErrorHandling() {
  const { handleError } = useErrorHandler();

  const riskyOperation = async () => {
    try {
      await someAsyncOperation();
    } catch (error) {
      const message = handleError(error);
      // Show user-friendly message
    }
  };

  return <button onClick={riskyOperation}>Execute</button>;
}
```

### Performance Monitoring

```typescript
// utils/performance.ts
import * as Sentry from '@sentry/nextjs';

export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return ((...args: any[]) => {
    return Sentry.startSpan(
      {
        name,
        op: 'function',
      },
      () => fn(...args)
    );
  }) as T;
}

// Usage
const trackedFunction = withPerformanceTracking(
  async (data: any) => {
    // Your function logic
  },
  'data-processing'
);
```

### Structured Logging

```typescript
// utils/logger.ts
import { log } from '@gabfon/observability/log';

export const logger = {
  userAction: (action: string, userId: string, metadata?: object) => {
    log.info(`User action: ${action}`, { userId, action, ...metadata });
  },

  apiRequest: (endpoint: string, method: string, duration: number) => {
    log.info(`API request: ${method} ${endpoint}`, {
      endpoint,
      method,
      duration,
    });
  },

  businessEvent: (event: string, data: object) => {
    log.info(`Business event: ${event}`, { event, ...data });
  },

  systemError: (error: string, context: object) => {
    log.error(`System error: ${error}`, { error, ...context });
  },
};
```

## Advanced Configuration

### Custom Sentry Configuration

```typescript
// custom-sentry.ts
import { init } from '@sentry/nextjs';
import { keys } from '@gabfon/observability';

export function initializeCustomSentry() {
  return init({
    dsn: keys().NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.5, // Custom sample rate
    debug: process.env.NODE_ENV === 'development',
    replaysOnErrorSampleRate: 0.5,
    replaysSessionSampleRate: 0.05,
    integrations: [
      // Custom integrations
    ],
    beforeSend(event) {
      // Custom event filtering
      return event;
    },
  });
}
```

### Custom Error Parsing

```typescript
// utils/errorParser.ts
import { parseError } from '@gabfon/observability';

export function parseCustomError(error: unknown, context?: object): string {
  const message = parseError(error);
  
  // Add custom context to error
  if (context) {
    console.error('Error context:', context);
  }
  
  // Custom error handling logic
  if (message.includes('network')) {
    return 'Network connection failed. Please check your internet connection.';
  }
  
  return message;
}
```

## Error Handling Best Practices

### 1. Consistent Error Handling

```typescript
// Good: Use parseError consistently
try {
  await operation();
} catch (error) {
  const message = parseError(error);
  // Handle error consistently
}

// Bad: Inconsistent error handling
try {
  await operation();
} catch (error) {
  console.log(error); // Different handling
}
```

### 2. Contextual Logging

```typescript
// Good: Include context in logs
log.error('Database operation failed', {
  operation: 'user_update',
  userId: '123',
  duration: 1500,
});

// Bad: Generic error message
log.error('Something went wrong');
```

### 3. Error Boundaries

```typescript
// Good: Implement error boundaries
<ErrorBoundary>
  <ComponentThatMightFail />
</ErrorBoundary>

// Bad: No error handling
<ComponentThatMightFail />
```

## Integration Examples

### With Analytics Package

```typescript
import { parseError } from '@gabfon/observability';
import { analytics } from '@gabfon/analytics/lib/server';

export async function trackWithErrorHandling(event: string, data: object) {
  try {
    analytics.capture(event, data);
  } catch (error) {
    const message = parseError(error);
    log.error('Analytics tracking failed', { event, error: message });
  }
}
```

### With Security Package

```typescript
import { parseError } from '@gabfon/observability';
import { securityMiddleware } from '@gabfon/security';

export function secureApiHandler(handler: Function) {
  return async (request: Request) => {
    try {
      // Apply security middleware
      const securedRequest = await securityMiddleware(request);
      return await handler(securedRequest);
    } catch (error) {
      const message = parseError(error);
      return Response.json({ error: message }, { status: 500 });
    }
  };
}
```

### With Rate Limiting

```typescript
import { parseError } from '@gabfon/observability';
import { rateLimit } from '@gabfon/rate-limit';

export async function rateLimitedApiCall(key: string, limit: number) {
  try {
    const { success } = await rateLimit.limit({ key, requests: limit });
    if (!success) {
      throw new Error('Rate limit exceeded');
    }
    // Proceed with API call
  } catch (error) {
    const message = parseError(error);
    log.warn('Rate limit exceeded', { key, limit });
    throw new Error(message);
  }
}
```

## Testing

### Error Handling Testing

```typescript
// __tests__/parseError.test.ts
import { parseError } from '@gabfon/observability';

describe('parseError', () => {
  test('handles Error objects', () => {
    const error = new Error('Test error');
    expect(parseError(error)).toBe('Test error');
  });

  test('handles objects with message', () => {
    const error = { message: 'Custom error' };
    expect(parseError(error)).toBe('Custom error');
  });

  test('handles primitive values', () => {
    expect(parseError('String error')).toBe('String error');
    expect(parseError(404)).toBe('404');
  });

  test('handles unknown types', () => {
    expect(parseError(undefined)).toBe('An error occurred');
    expect(parseError(null)).toBe('An error occurred');
  });
});
```

### Logging Testing

```typescript
// __tests__/logging.test.ts
import { log } from '@gabfon/observability/log';

// Mock Logtail
jest.mock('@logtail/next');

describe('logging', () => {
  test('logs info messages', () => {
    log.info('Test message', { key: 'value' });
    expect(log.info).toHaveBeenCalledWith('Test message', { key: 'value' });
  });

  test('logs error messages', () => {
    log.error('Error message', { error: 'details' });
    expect(log.error).toHaveBeenCalledWith('Error message', { error: 'details' });
  });
});
```
