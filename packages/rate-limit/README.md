# @gabfon/rate-limit

Rate limiting package providing API and request rate limiting capabilities.

## Overview

This package provides rate limiting functionality using Upstash Redis for distributed rate limiting. It's designed to work with Next.js applications and provides both server-side and edge runtime support.

## Features

- **Redis-based Rate Limiting**: Distributed rate limiting using Upstash Redis
- **Multiple Algorithms**: Support for various rate limiting algorithms
- **Edge Runtime Support**: Compatible with Vercel Edge Runtime
- **Type Safety**: Full TypeScript support with environment validation
- **Flexible Configuration**: Configurable rate limits and time windows

## Installation

```bash
pnpm add @gabfon/rate-limit
```

## Usage

### Basic Rate Limiting

```typescript
import { rateLimit } from '@gabfon/rate-limit';

// Create a rate limiter
const limiter = rateLimit({
  window: '1 m', // 1 minute window
  limit: 10,     // 10 requests per window
});

// Check rate limit
const { success, limit, remaining, reset } = await limiter.limit('user-123');
```

### API Route Protection

```typescript
import { rateLimit } from '@gabfon/rate-limit';

const limiter = rateLimit({
  window: '1 m',
  limit: 5,
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  
  const { success } = await limiter.limit(ip);
  
  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 });
  }
  
  // Process request
}
```

### Different Rate Limiting Strategies

```typescript
import { rateLimit } from '@gabfon/rate-limit';

// Fixed window
const fixedWindow = rateLimit({
  window: '1 m',
  limit: 100,
});

// Sliding window
const slidingWindow = rateLimit({
  window: '1 m',
  limit: 100,
  algorithm: 'sliding-window',
});

// Token bucket
const tokenBucket = rateLimit({
  window: '1 m',
  limit: 100,
  algorithm: 'token-bucket',
});
```

## Exports

- `./src/index.ts` - Main rate limiting utilities
- `./src/keys.ts` - Environment variable keys

## Environment Variables

```env
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

## Rate Limiting Algorithms

### Fixed Window
- Simple time-based windows
- Good for basic rate limiting
- May allow bursts at window boundaries

### Sliding Window
- More accurate rate limiting
- Prevents burst traffic
- Higher computational overhead

### Token Bucket
- Allows burst traffic up to bucket size
- Good for variable rate applications
- Configurable refill rate

## Configuration Options

```typescript
interface RateLimitConfig {
  window: string;           // Time window (e.g., '1 m', '1 h', '1 d')
  limit: number;           // Maximum requests per window
  algorithm?: 'fixed-window' | 'sliding-window' | 'token-bucket';
  keyGenerator?: (request: Request) => string; // Custom key generation
}
```

## Dependencies

- `@upstash/ratelimit` - Upstash rate limiting library
- `@upstash/redis` - Upstash Redis client
- `@t3-oss/env-nextjs` - Environment validation
- `zod` - Schema validation

## Development

```bash
# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Best Practices

1. **Choose Appropriate Windows**: Select time windows that match your use case
2. **Use Meaningful Keys**: Use user IDs, IP addresses, or API keys as rate limit keys
3. **Handle Rate Limit Responses**: Always handle rate limit exceeded responses gracefully
4. **Monitor Usage**: Track rate limit usage to optimize limits
5. **Edge Cases**: Consider edge cases like clock skew and distributed systems

## Error Handling

```typescript
try {
  const { success, limit, remaining, reset } = await limiter.limit(key);
  
  if (!success) {
    return new Response('Rate limit exceeded', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  }
} catch (error) {
  // Handle Redis connection errors
  console.error('Rate limiting error:', error);
  // Optionally allow request to proceed
}
```