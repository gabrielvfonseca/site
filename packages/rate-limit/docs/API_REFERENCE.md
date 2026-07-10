# @gabfon/rate-limit API Reference

## Installation

```bash
npm install @gabfon/rate-limit
```

## Environment Setup

Create environment variables for Upstash Redis:

```env
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

## Exports

### Main Functions
```typescript
export { createRateLimiter, slidingWindow } from './index';
```

### Redis Client
```typescript
export { redis } from './redis';
```

### Environment Keys
```typescript
export { keys } from './keys';
```

## Core Functions

### createRateLimiter

Factory function that creates a rate limiter with Redis backend.

#### Signature

```typescript
function createRateLimiter(props: Omit<RatelimitConfig, 'redis'>): Ratelimit
```

#### Parameters

- `props: Omit<RatelimitConfig, 'redis'>` - Rate limiter configuration (excluding Redis client)

#### Returns

- `Ratelimit` - Configured rate limiter instance

#### Usage

```typescript
import { createRateLimiter } from '@gabfon/rate-limit';

const rateLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  prefix: 'api-requests',
});

export async function POST(request: Request) {
  const ip = request.ip || 'unknown';
  
  const { success, limit, remaining, reset } = await rateLimiter.limit(ip);
  
  if (!success) {
    return Response.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
  
  return Response.json({ success: true });
}
```

#### Configuration Options

```typescript
interface RateLimiterConfig {
  limiter?: RatelimitConfig; // Rate limiting algorithm
  prefix?: string;          // Redis key prefix
  // Redis client is automatically configured
}
```

### slidingWindow

Sliding window rate limiting algorithm.

#### Signature

```typescript
function slidingWindow(requests: number, window: string): RatelimitConfig
```

#### Parameters

- `requests: number` - Maximum number of requests allowed
- `window: string` - Time window (e.g., '10 s', '1 m', '1 h')

#### Returns

- `RatelimitConfig` - Sliding window configuration

#### Usage

```typescript
import { createRateLimiter, slidingWindow } from '@gabfon/rate-limit';

const rateLimiter = createRateLimiter({
  limiter: slidingWindow(10, '10 s'), // 10 requests per 10 seconds
});

// Alternative time windows
const perMinute = slidingWindow(60, '1 m');    // 60 requests per minute
const perHour = slidingWindow(1000, '1 h');    // 1000 requests per hour
const perDay = slidingWindow(10000, '1 d');    // 10000 requests per day
```

## Rate Limiting Algorithms

### Sliding Window

Counts requests within a sliding time window.

```typescript
import { createRateLimiter, slidingWindow } from '@gabfon/rate-limit';

const slidingLimiter = createRateLimiter({
  limiter: slidingWindow(10, '10 s'),
});

// Behavior: Allows 10 requests in any 10-second sliding window
// Use case: General API rate limiting
```

### Fixed Window

Counts requests within fixed time boundaries.

```typescript
import { createRateLimiter } from '@gabfon/rate-limit';

const fixedLimiter = createRateLimiter({
  limiter: Ratelimit.fixedWindow(10, '10 s'),
});

// Behavior: Allows 10 requests, resets every 10 seconds
// Use case: Simple rate limiting with predictable reset times
```

### Token Bucket

Allows bursts up to bucket capacity with sustained rate limits.

```typescript
import { createRateLimiter } from '@gabfon/rate-limit';

const tokenBucketLimiter = createRateLimiter({
  limiter: Ratelimit.tokenBucket(5, '10 s', 10),
});

// Behavior: Refills 5 tokens every 10 seconds, max 10 tokens
// Use case: Burst traffic handling
```

## Redis Client

### redis

Pre-configured Upstash Redis client.

#### Usage

```typescript
import { redis } from '@gabfon/rate-limit';

// Direct Redis operations
await redis.set('key', 'value');
const value = await redis.get('key');
await redis.del('key');
```

#### Configuration

The Redis client is automatically configured with:
- URL from `UPSTASH_REDIS_REST_URL` environment variable
- Token from `UPSTASH_REDIS_REST_TOKEN` environment variable
- Optimized settings for rate limiting operations

## Environment Variables

### Required Variables

| Variable | Description | Type | Required |
|----------|-------------|------|----------|
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST API URL | string | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST API token | string | Yes |

### Environment Validation

```typescript
import { keys } from '@gabfon/rate-limit';

// Validates environment variables and returns typed object
const env = keys();
console.log(env.UPSTASH_REDIS_REST_URL);
console.log(env.UPSTASH_REDIS_REST_TOKEN);
```

### Validation Rules

- `UPSTASH_REDIS_REST_URL`: Must be a valid Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN`: Must be a valid Upstash Redis token

## Usage Examples

### Basic API Rate Limiting

```typescript
// app/api/protected/route.ts
import { createRateLimiter, slidingWindow } from '@gabfon/rate-limit';

const rateLimiter = createRateLimiter({
  limiter: slidingWindow(10, '10 s'),
  prefix: 'api-protected',
});

export async function POST(request: Request) {
  const ip = request.ip || 'unknown';
  
  const { success, limit, remaining, reset } = await rateLimiter.limit(ip);
  
  if (!success) {
    return Response.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
        }
      }
    );
  }
  
  // Process request
  return Response.json({ success: true });
}
```

### User-Specific Rate Limiting

```typescript
// app/api/user-action/route.ts
import { createRateLimiter } from '@gabfon/rate-limit';

const userRateLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  prefix: 'user-action',
});

export async function POST(request: Request) {
  const { userId } = await request.json();
  
  if (!userId) {
    return Response.json({ error: 'User ID required' }, { status: 400 });
  }
  
  const { success, limit, remaining, reset } = await userRateLimiter.limit(userId);
  
  if (!success) {
    return Response.json(
      { error: 'User rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        }
      }
    );
  }
  
  // Process user action
  return Response.json({ success: true });
}
```

### Global Rate Limiting Middleware

```typescript
// middleware.ts
import { createRateLimiter, slidingWindow } from '@gabfon/rate-limit';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const globalRateLimiter = createRateLimiter({
  limiter: slidingWindow(100, '1 m'),
  prefix: 'global',
});

export async function middleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  
  const { success } = await globalRateLimiter.limit(ip);
  
  if (!success) {
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '60',
      }
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
```

### Multiple Rate Limiters

```typescript
// app/api/sensitive/route.ts
import { createRateLimiter } from '@gabfon/rate-limit';

// Global rate limit
const globalLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  prefix: 'global',
});

// Endpoint-specific rate limit
const endpointLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(2, '1 m'),
  prefix: 'sensitive-endpoint',
});

export async function POST(request: Request) {
  const ip = request.ip || 'unknown';
  
  // Check global rate limit
  const globalResult = await globalLimiter.limit(ip);
  if (!globalResult.success) {
    return Response.json(
      { error: 'Global rate limit exceeded' },
      { status: 429 }
    );
  }
  
  // Check endpoint-specific rate limit
  const endpointResult = await endpointLimiter.limit(ip);
  if (!endpointResult.success) {
    return Response.json(
      { error: 'Endpoint rate limit exceeded' },
      { status: 429 }
    );
  }
  
  // Process sensitive operation
  return Response.json({ success: true });
}
```

### Rate Limiting with Analytics

```typescript
// app/api/tracked/route.ts
import { createRateLimiter } from '@gabfon/rate-limit';
import { analytics } from '@gabfon/analytics/lib/server';

const rateLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  prefix: 'tracked-api',
});

export async function POST(request: Request) {
  const ip = request.ip || 'unknown';
  
  const { success, limit, remaining, reset } = await rateLimiter.limit(ip);
  
  // Track rate limit events
  if (!success) {
    analytics.capture('rate_limit_exceeded', {
      ip,
      limit,
      remaining,
      endpoint: '/api/tracked',
    });
  }
  
  if (!success) {
    return Response.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
  
  // Process request
  analytics.capture('api_request', {
    ip,
    endpoint: '/api/tracked',
  });
  
  return Response.json({ success: true });
}
```

## Advanced Usage

### Custom Rate Limiting Logic

```typescript
// utils/rateLimit.ts
import { createRateLimiter } from '@gabfon/rate-limit';

class RateLimitManager {
  private limiters = new Map<string, any>();
  
  getLimiter(config: { requests: number; window: string; prefix: string }) {
    const key = `${config.prefix}-${config.requests}-${config.window}`;
    
    if (!this.limiters.has(key)) {
      this.limiters.set(key, createRateLimiter({
        limiter: Ratelimit.slidingWindow(config.requests, config.window),
        prefix: config.prefix,
      }));
    }
    
    return this.limiters.get(key);
  }
}

export const rateLimitManager = new RateLimitManager();

// Usage
const limiter = rateLimitManager.getLimiter({
  requests: 10,
  window: '10 s',
  prefix: 'custom',
});
```

### Rate Limiting with Fallback

```typescript
// utils/safeRateLimit.ts
import { createRateLimiter } from '@gabfon/rate-limit';

const rateLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function safeRateLimit(identifier: string) {
  try {
    const result = await rateLimiter.limit(identifier);
    return result;
  } catch (error) {
    // Fallback to allow request if Redis is unavailable
    console.error('Rate limiting error:', error);
    return { 
      success: true, 
      limit: 0, 
      remaining: 0, 
      reset: Date.now() + 60000 
    };
  }
}
```

### Rate Limiting with Custom Headers

```typescript
// utils/rateLimitHeaders.ts
import { createRateLimiter } from '@gabfon/rate-limit';

const rateLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function rateLimitWithHeaders(identifier: string) {
  const result = await rateLimiter.limit(identifier);
  
  const headers = new Headers();
  headers.set('X-RateLimit-Limit', result.limit.toString());
  headers.set('X-RateLimit-Remaining', result.remaining.toString());
  headers.set('X-RateLimit-Reset', result.reset.toString());
  
  if (!result.success) {
    headers.set('Retry-After', Math.ceil((result.reset - Date.now()) / 1000).toString());
  }
  
  return { ...result, headers };
}

// Usage in API route
export async function POST(request: Request) {
  const ip = request.ip || 'unknown';
  const { success, headers } = await rateLimitWithHeaders(ip);
  
  if (!success) {
    return Response.json(
      { error: 'Rate limit exceeded' },
      { status: 429, headers }
    );
  }
  
  return Response.json({ success: true }, { headers });
}
```

## Error Handling

### Redis Connection Errors

```typescript
import { createRateLimiter } from '@gabfon/rate-limit';

const rateLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function rateLimitWithErrorHandling(identifier: string) {
  try {
    const result = await rateLimiter.limit(identifier);
    return result;
  } catch (error) {
    console.error('Rate limiting error:', error);
    
    // Log the error for monitoring
    // In production, you might want to use a monitoring service
    // analytics.capture('rate_limiting_error', { error: error.message });
    
    // Fallback strategy: allow the request
    return { 
      success: true, 
      limit: 0, 
      remaining: 0, 
      reset: Date.now() + 60000 
    };
  }
}
```

### Configuration Errors

```typescript
import { keys } from '@gabfon/rate-limit';

function validateRateLimitConfig() {
  try {
    const env = keys();
    console.log('Rate limiting configuration validated');
    return true;
  } catch (error) {
    console.error('Rate limiting configuration error:', error);
    return false;
  }
}

// Usage at application startup
if (!validateRateLimitConfig()) {
  console.warn('Rate limiting will not be available');
}
```

## Best Practices

### 1. Rate Limiting Strategy

```typescript
// Good: Use appropriate limits for different endpoints
const authLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(5, '1 m'),  // Strict for auth
  prefix: 'auth',
});

const dataLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(100, '1 m'), // Lenient for data
  prefix: 'data',
});

// Bad: Same limits for all endpoints
const universalLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  prefix: 'universal',
});
```

### 2. Identifier Selection

```typescript
// Good: Use appropriate identifiers
const ipBasedLimiter = rateLimiter.limit(ip);           // Anonymous users
const userBasedLimiter = rateLimiter.limit(userId);     // Authenticated users
const apiBasedLimiter = rateLimiter.limit(apiKey);      // API clients

// Bad: Always use IP address
const alwaysIpLimiter = rateLimiter.limit(ip);
```

### 3. Error Handling

```typescript
// Good: Comprehensive error handling
try {
  const result = await rateLimiter.limit(identifier);
  return result;
} catch (error) {
  // Log error for monitoring
  console.error('Rate limiting error:', error);
  
  // Implement fallback strategy
  return { success: true, limit: 0, remaining: 0, reset: Date.now() + 60000 };
}

// Bad: No error handling
const result = await rateLimiter.limit(identifier);
```

### 4. Response Headers

```typescript
// Good: Include rate limit headers
return Response.json(data, {
  headers: {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': reset.toString(),
  }
});

// Bad: No rate limit information
return Response.json(data);
```

## Integration Examples

### With Observability Package

```typescript
import { createRateLimiter } from '@gabfon/rate-limit';
import { parseError } from '@gabfon/observability';

const rateLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function rateLimitWithObservability(identifier: string) {
  try {
    const result = await rateLimiter.limit(identifier);
    return result;
  } catch (error) {
    const message = parseError(error);
    console.error('Rate limiting failed:', message);
    
    // Fallback to allow request
    return { success: true, limit: 0, remaining: 0, reset: Date.now() + 60000 };
  }
}
```

### With Security Package

```typescript
import { createRateLimiter } from '@gabfon/rate-limit';
import { securityMiddleware } from '@gabfon/security';

const rateLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function secureRateLimitedHandler(request: Request) {
  // Apply security middleware first
  const securedRequest = await securityMiddleware(request);
  
  // Then apply rate limiting
  const ip = securedRequest.ip || 'unknown';
  const { success } = await rateLimiter.limit(ip);
  
  if (!success) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
  
  // Process request
  return Response.json({ success: true });
}
```

### With Analytics Package

```typescript
import { createRateLimiter } from '@gabfon/rate-limit';
import { analytics } from '@gabfon/analytics/lib/server';

const rateLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function rateLimitWithAnalytics(identifier: string, endpoint: string) {
  const result = await rateLimiter.limit(identifier);
  
  // Track rate limit events
  if (!result.success) {
    analytics.capture('rate_limit_exceeded', {
      identifier,
      endpoint,
      limit: result.limit,
      remaining: result.remaining,
    });
  }
  
  return result;
}
```

## Testing

### Unit Testing

```typescript
// __tests__/rateLimit.test.ts
import { createRateLimiter } from '@gabfon/rate-limit';

// Mock Redis
jest.mock('@upstash/redis');

describe('Rate Limiter', () => {
  test('creates rate limiter with default config', () => {
    const limiter = createRateLimiter({});
    expect(limiter).toBeDefined();
  });

  test('creates rate limiter with custom config', () => {
    const limiter = createRateLimiter({
      limiter: Ratelimit.slidingWindow(5, '1 m'),
      prefix: 'test',
    });
    expect(limiter).toBeDefined();
  });
});
```

### Integration Testing

```typescript
// __tests__/rateLimit.integration.test.ts
import { createRateLimiter } from '@gabfon/rate-limit';

describe('Rate Limiter Integration', () => {
  test('limits requests correctly', async () => {
    const limiter = createRateLimiter({
      limiter: Ratelimit.slidingWindow(2, '10 s'),
      prefix: 'test',
    });

    const identifier = 'test-user';
    
    // First request should succeed
    const result1 = await limiter.limit(identifier);
    expect(result1.success).toBe(true);
    
    // Second request should succeed
    const result2 = await limiter.limit(identifier);
    expect(result2.success).toBe(true);
    
    // Third request should fail
    const result3 = await limiter.limit(identifier);
    expect(result3.success).toBe(false);
  });
});
```
