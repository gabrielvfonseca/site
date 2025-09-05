# @gabfon/analytics

Analytics integration package providing PostHog and Vercel Analytics support.

## Overview

This package provides a unified analytics solution combining PostHog for product analytics and Vercel Analytics for web vitals and performance metrics.

## Features

- **PostHog Integration**: Product analytics, feature flags, and user tracking
- **Vercel Analytics**: Web vitals and performance monitoring
- **React Components**: Pre-built React components for analytics
- **Server/Client Support**: Both server-side and client-side analytics
- **Type Safety**: Full TypeScript support with environment validation

## Installation

```bash
pnpm add @gabfon/analytics
```

## Usage

### Basic Setup

```typescript
import { AnalyticsProvider } from '@gabfon/analytics';

function App() {
  return (
    <AnalyticsProvider>
      {/* Your app */}
    </AnalyticsProvider>
  );
}
```

### Client-side Analytics

```typescript
import { trackEvent } from '@gabfon/analytics/lib/client';

// Track custom events
trackEvent('button_clicked', { button: 'signup' });
```

### Server-side Analytics

```typescript
import { trackServerEvent } from '@gabfon/analytics/lib/server';

// Track server events
trackServerEvent('user_signup', { userId: '123' });
```

## Exports

- `./src/index.tsx` - Main analytics provider and components
- `./src/keys.ts` - Environment variable keys
- `./src/vercel.ts` - Vercel Analytics integration
- `./src/lib/client.tsx` - Client-side analytics utilities
- `./src/lib/server.ts` - Server-side analytics utilities

## Environment Variables

```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_VERCEL_ANALYTICS=true
```

## Dependencies

- `@vercel/analytics` - Vercel Analytics
- `posthog-js` - PostHog client library
- `posthog-node` - PostHog server library
- `@t3-oss/env-nextjs` - Environment validation
- `react` - React components
- `server-only` - Server-only utilities
- `zod` - Schema validation

## Development

```bash
# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```