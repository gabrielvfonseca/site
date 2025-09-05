# @gabfon/observability

Observability package providing logging, monitoring, and error tracking capabilities.

## Overview

This package provides comprehensive observability features including structured logging, error tracking with Sentry, and performance monitoring. It's designed to work seamlessly with Next.js applications in both server and client environments.

## Features

- **Structured Logging**: Logtail integration for centralized logging
- **Error Tracking**: Sentry integration for error monitoring and performance tracking
- **Next.js Integration**: Optimized for Next.js with middleware and instrumentation
- **Type Safety**: Full TypeScript support with environment validation
- **Server/Client Support**: Both server-side and client-side observability

## Installation

```bash
pnpm add @gabfon/observability
```

## Usage

### Basic Setup

```typescript
import { withLogging, withSentry } from '@gabfon/observability/next-config';

// Next.js configuration
const nextConfig = withLogging(withSentry({
  // your Next.js config
}));
```

### Logging

```typescript
import { log } from '@gabfon/observability/log';

// Structured logging
log.info('User action', { userId: '123', action: 'login' });
log.error('Database error', { error: error.message, query: 'SELECT * FROM users' });
```

### Error Tracking

```typescript
import { captureException } from '@gabfon/observability/client';

// Capture exceptions
try {
  // risky operation
} catch (error) {
  captureException(error, { context: 'user-action' });
}
```

### Instrumentation

```typescript
// instrumentation.ts
import { instrumentation } from '@gabfon/observability/instrumentation';

export default instrumentation;
```

## Exports

- `./src/index.ts` - Main observability utilities
- `./src/keys.ts` - Environment variable keys
- `./src/next-config.ts` - Next.js configuration helpers
- `./src/client.ts` - Client-side observability
- `./src/log.ts` - Logging utilities
- `./src/instrumentation.ts` - Next.js instrumentation

## Environment Variables

```env
# Logtail Configuration
LOGTAIL_SOURCE_TOKEN=your_logtail_token

# Sentry Configuration
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Environment
NODE_ENV=production
VERCEL_ENV=production
```

## Logging Levels

The package supports multiple logging levels:

- `log.debug()` - Debug information
- `log.info()` - General information
- `log.warn()` - Warning messages
- `log.error()` - Error messages
- `log.fatal()` - Fatal errors

## Error Tracking Features

- **Automatic Error Capture**: Unhandled exceptions are automatically captured
- **Performance Monitoring**: Track page load times and API response times
- **User Context**: Associate errors with user sessions
- **Release Tracking**: Track errors by application version
- **Custom Tags**: Add custom tags to errors for better filtering

## Dependencies

- `@logtail/next` - Logtail Next.js integration
- `@sentry/nextjs` - Sentry Next.js integration
- `@t3-oss/env-nextjs` - Environment validation
- `react` - React framework
- `server-only` - Server-only utilities
- `zod` - Schema validation

## Development

```bash
# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Configuration

### Sentry Configuration

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Logtail Configuration

```typescript
// logtail.config.ts
import { Logtail } from '@logtail/next';

const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN);
```

## Best Practices

1. **Use Structured Logging**: Always include relevant context in log messages
2. **Error Boundaries**: Implement React error boundaries for client-side error handling
3. **Performance Monitoring**: Use Sentry's performance monitoring for critical user flows
4. **Environment Separation**: Use different Sentry projects for different environments
5. **Log Sampling**: Implement log sampling for high-volume applications