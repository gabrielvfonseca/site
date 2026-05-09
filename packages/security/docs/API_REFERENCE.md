# @gabfon/security API Reference

## Installation

```bash
npm install @gabfon/security
```

## Environment Setup

Create environment variables for security services:

```env
ARCJET_KEY=your_arcjet_api_key
NODE_ENV=production
```

## Exports

### Main Security Functions
```typescript
export { secure } from './index';
```

### Middleware
```typescript
export { noseconeMiddleware } from './proxy';
```

### Configuration
```typescript
export { noseconeOptions, noseconeOptionsWithToolbar } from './proxy';
```

### Environment Keys
```typescript
export { keys } from './keys';
```

## Core Functions

### secure

Protects requests using Arcjet security rules including bot detection and shield protection.

#### Signature

```typescript
function secure(
  allow: (ArcjetWellKnownBot | ArcjetBotCategory)[],
  sourceRequest?: Request
): Promise<void>
```

#### Parameters

- `allow: (ArcjetWellKnownBot | ArcjetBotCategory)[]` - Array of allowed bots and categories
- `sourceRequest?: Request` - Optional request object (auto-detected if not provided)

#### Returns

- `Promise<void>` - Resolves if request is allowed, throws error if blocked

#### Usage

```typescript
import { secure } from '@gabfon/security';

export async function POST(request: Request) {
  try {
    // Protect against bots and attacks
    await secure(['CATEGORY:SEARCH_ENGINE', 'CATEGORY:MONITOR'], request);
    
    // Process protected request
    return Response.json({ success: true });
  } catch (error) {
    if (error.message === 'No bots allowed') {
      return Response.json({ error: 'Bot access denied' }, { status: 403 });
    }
    
    if (error.message === 'Rate limit exceeded') {
      return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    
    return Response.json({ error: 'Access denied' }, { status: 403 });
  }
}
```

#### Bot Categories

```typescript
// Allow specific bot categories
await secure(['CATEGORY:SEARCH_ENGINE']);      // Search engines only
await secure(['CATEGORY:MONITOR']);             // Monitoring services only
await secure(['CATEGORY:PREVIEW']);             // Preview services only
await secure(['CATEGORY:AI']);                  // AI crawlers only
await secure(['CATEGORY:SCRAPE']);              // Web scrapers only

// Allow multiple categories
await secure(['CATEGORY:SEARCH_ENGINE', 'CATEGORY:MONITOR']);
```

#### Well-Known Bots

```typescript
// Allow specific well-known bots
await secure(['GOOGLE', 'BING']);               // Google and Bing bots
await secure(['FACEBOOK', 'TWITTER']);          // Social media crawlers
await secure(['LINKEDIN']);                     // LinkedIn crawler

// Mix categories and specific bots
await secure(['CATEGORY:SEARCH_ENGINE', 'GOOGLE', 'BING']);
```

## Middleware

### noseconeMiddleware

Next.js middleware that applies security headers to all requests.

#### Signature

```typescript
function createMiddleware(options: NoseconeOptions): (request: NextRequest) => NextResponse
```

#### Usage

```typescript
// middleware.ts
import { noseconeMiddleware, noseconeOptions } from '@gabfon/security';

export default noseconeMiddleware(noseconeOptions);

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

#### Configuration Options

```typescript
interface NoseconeOptions {
  contentSecurityPolicy?: boolean | CSPDirectives;
  xFrameOptions?: boolean | 'DENY' | 'SAMEORIGIN' | 'ALLOW-FROM';
  xContentTypeOptions?: boolean;
  referrerPolicy?: boolean | ReferrerPolicy;
  permissionsPolicy?: boolean | PermissionsPolicy;
  // ... other security header options
}
```

## Configuration

### noseconeOptions

Default security header configuration with environment-aware CSP.

#### Usage

```typescript
import { noseconeOptions } from '@gabfon/security';

export default noseconeMiddleware(noseconeOptions);
```

#### Features

- **Environment-Aware CSP**: Different policies for development vs production
- **Development Mode**: Allows unsafe-eval for React debugging
- **Production Mode**: Strict CSP with minimal permissions
- **Comprehensive Headers**: Includes all standard security headers

### noseconeOptionsWithToolbar

Security configuration with Vercel toolbar support for development.

#### Usage

```typescript
import { noseconeOptionsWithToolbar } from '@gabfon/security';

export default noseconeMiddleware(noseconeOptionsWithToolbar);
```

#### Features

- **Vercel Toolbar**: Enables Vercel debugging toolbar in development
- **Enhanced Debugging**: Additional development-friendly features
- **Production Safe**: Automatically disables in production

## Environment Variables

### Required Variables

| Variable | Description | Type | Required |
|----------|-------------|------|----------|
| `ARCJET_KEY` | Arcjet API key for security protection | string | Yes |
| `NODE_ENV` | Environment identifier | 'development' \| 'production' | Yes |

### Environment Validation

```typescript
import { keys } from '@gabfon/security';

// Validates environment variables and returns typed object
const env = keys();
console.log(env.ARCJET_KEY);
console.log(env.NODE_ENV);
```

### Validation Rules

- `ARCJET_KEY`: Must be a valid Arcjet API key
- `NODE_ENV`: Must be 'development' or 'production'

## Usage Examples

### Basic API Route Protection

```typescript
// app/api/protected/route.ts
import { secure } from '@gabfon/security';

export async function POST(request: Request) {
  // Protect against all bots except search engines
  await secure(['CATEGORY:SEARCH_ENGINE'], request);
  
  // Process protected request
  const data = await request.json();
  return Response.json({ success: true, data });
}
```

### Page-Level Protection

```typescript
// app/dashboard/page.tsx
import { secure } from '@gabfon/security';

export default async function DashboardPage() {
  // No bots allowed on dashboard
  await secure([], request);
  
  return <div>Dashboard Content</div>;
}
```

### Multiple Security Layers

```typescript
// app/api/sensitive/route.ts
import { secure } from '@gabfon/security';

export async function POST(request: Request) {
  // Strict protection - no bots allowed
  await secure([], request);
  
  // Additional application-level security
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Process sensitive operation
  return Response.json({ success: true });
}
```

### Conditional Bot Protection

```typescript
// app/api/public/route.ts
import { secure } from '@gabfon/security';

export async function GET(request: Request) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Different protection based on endpoint
  if (request.url.includes('/api/search')) {
    // Allow search engines for search endpoints
    await secure(['CATEGORY:SEARCH_ENGINE'], request);
  } else {
    // No bots for other endpoints
    await secure([], request);
  }
  
  return Response.json({ data: 'public data' });
}
```

### Middleware with Custom Options

```typescript
// middleware.ts
import { noseconeMiddleware } from '@gabfon/security';

const customOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://trusted.cdn.com'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https://images.example.com'],
    },
  },
  xFrameOptions: 'DENY',
  referrerPolicy: 'strict-origin-when-cross-origin',
};

export default noseconeMiddleware(customOptions);

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

### Security with Error Handling

```typescript
// app/api/robust/route.ts
import { secure } from '@gabfon/security';

export async function POST(request: Request) {
  try {
    await secure(['CATEGORY:SEARCH_ENGINE'], request);
    
    // Process request
    const data = await request.json();
    return Response.json({ success: true, data });
    
  } catch (error) {
    // Handle different security violations
    if (error.message === 'No bots allowed') {
      return Response.json(
        { error: 'Bot access not allowed' },
        { status: 403 }
      );
    }
    
    if (error.message === 'Rate limit exceeded') {
      return Response.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }
    
    // Generic security error
    return Response.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }
}
```

### Security with Analytics

```typescript
// app/api/tracked/route.ts
import { secure } from '@gabfon/security';
import { analytics } from '@gabfon/analytics/lib/server';

export async function POST(request: Request) {
  try {
    await secure(['CATEGORY:SEARCH_ENGINE'], request);
    
    // Track successful requests
    analytics.capture('api_request', {
      endpoint: '/api/tracked',
      ip: request.ip,
      userAgent: request.headers.get('user-agent'),
    });
    
    return Response.json({ success: true });
    
  } catch (error) {
    // Track security violations
    analytics.capture('security_violation', {
      type: error.message,
      endpoint: '/api/tracked',
      ip: request.ip,
      userAgent: request.headers.get('user-agent'),
    });
    
    throw error;
  }
}
```

## Advanced Usage

### Custom Security Rules

```typescript
// utils/security.ts
import { secure } from '@gabfon/security';

class SecurityManager {
  private static instance: SecurityManager;
  
  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }
  
  async protectPublicEndpoint(request: Request) {
    // Allow search engines and monitoring
    await secure(['CATEGORY:SEARCH_ENGINE', 'CATEGORY:MONITOR'], request);
  }
  
  async protectUserEndpoint(request: Request) {
    // No bots allowed for user endpoints
    await secure([], request);
  }
  
  async protectAdminEndpoint(request: Request) {
    // No bots allowed + additional checks
    await secure([], request);
    
    // Additional admin-specific security
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Invalid authorization');
    }
  }
}

export const securityManager = SecurityManager.getInstance();
```

### Dynamic Bot Configuration

```typescript
// app/api/dynamic/route.ts
import { secure } from '@gabfon/security';

export async function POST(request: Request) {
  const { endpoint } = await request.json();
  
  // Dynamic bot configuration based on endpoint
  let allowedBots: (ArcjetWellKnownBot | ArcjetBotCategory)[] = [];
  
  switch (endpoint) {
    case 'search':
      allowedBots = ['CATEGORY:SEARCH_ENGINE'];
      break;
    case 'preview':
      allowedBots = ['CATEGORY:PREVIEW'];
      break;
    case 'monitor':
      allowedBots = ['CATEGORY:MONITOR'];
      break;
    default:
      allowedBots = [];
  }
  
  await secure(allowedBots, request);
  
  return Response.json({ success: true, endpoint });
}
```

### Security Middleware with Custom Logic

```typescript
// middleware.ts
import { noseconeMiddleware, noseconeOptions } from '@gabfon/security';
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  // Apply security headers
  const securityResponse = noseconeMiddleware(noseconeOptions)(request);
  
  // Add custom security headers
  securityResponse.headers.set('X-Security-Timestamp', Date.now().toString());
  securityResponse.headers.set('X-Security-Version', '1.0.0');
  
  // Log security events
  if (request.url.includes('/admin')) {
    console.log(`Admin access attempt: ${request.ip}`);
  }
  
  return securityResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

## Error Handling

### Security Violation Handling

```typescript
// utils/securityHandler.ts
import { secure } from '@gabfon/security';

export async function handleSecurityRequest(
  request: Request,
  allowedBots: (ArcjetWellKnownBot | ArcjetBotCategory)[]
) {
  try {
    await secure(allowedBots, request);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      statusCode: getStatusCode(error.message),
    };
  }
}

function getStatusCode(errorMessage: string): number {
  switch (errorMessage) {
    case 'No bots allowed':
      return 403;
    case 'Rate limit exceeded':
      return 429;
    default:
      return 403;
  }
}
```

### Configuration Error Handling

```typescript
// utils/securityConfig.ts
import { keys } from '@gabfon/security';

export function validateSecurityConfig() {
  try {
    const env = keys();
    return {
      valid: true,
      arcjetKey: !!env.ARCJET_KEY,
      nodeEnv: env.NODE_ENV,
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message,
    };
  }
}

// Usage at startup
const config = validateSecurityConfig();
if (!config.valid) {
  console.error('Security configuration invalid:', config.error);
  process.exit(1);
}
```

## Best Practices

### 1. Bot Management

```typescript
// Good: Specific bot allowances
await secure(['CATEGORY:SEARCH_ENGINE']);  // Only search engines

// Bad: Allow all bots
await secure(['CATEGORY:*']);  // Too permissive
```

### 2. Security Layering

```typescript
// Good: Multiple security layers
await secure([], request);  // No bots
if (!isAuthenticated(request)) {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}

// Bad: Single security check
await secure(['CATEGORY:SEARCH_ENGINE'], request);
```

### 3. Error Handling

```typescript
// Good: Comprehensive error handling
try {
  await secure([], request);
  return Response.json({ success: true });
} catch (error) {
  return Response.json(
    { error: error.message },
    { status: getStatusCode(error.message) }
  );
}

// Bad: No error handling
await secure([], request);
return Response.json({ success: true });
```

### 4. Environment Configuration

```typescript
// Good: Environment-aware security
const allowedBots = process.env.NODE_ENV === 'production' 
  ? ['CATEGORY:SEARCH_ENGINE'] 
  : ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:MONITOR'];

await secure(allowedBots, request);

// Bad: Same configuration everywhere
await secure(['CATEGORY:SEARCH_ENGINE'], request);
```

## Integration Examples

### With Rate Limiting Package

```typescript
import { secure } from '@gabfon/security';
import { createRateLimiter } from '@gabfon/rate-limit';

const rateLimiter = createRateLimiter({
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

export async function protectedEndpoint(request: Request) {
  // Apply security protection
  await secure(['CATEGORY:SEARCH_ENGINE'], request);
  
  // Apply rate limiting
  const ip = request.ip || 'unknown';
  const { success } = await rateLimiter.limit(ip);
  
  if (!success) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
  
  return Response.json({ success: true });
}
```

### With Observability Package

```typescript
import { secure } from '@gabfon/security';
import { parseError } from '@gabfon/observability';

export async function secureEndpoint(request: Request) {
  try {
    await secure(['CATEGORY:SEARCH_ENGINE'], request);
    return Response.json({ success: true });
  } catch (error) {
    const message = parseError(error);
    console.error('Security violation:', message);
    
    return Response.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }
}
```

### With Analytics Package

```typescript
import { secure } from '@gabfon/security';
import { analytics } from '@gabfon/analytics/lib/server';

export async function trackedEndpoint(request: Request) {
  try {
    await secure(['CATEGORY:SEARCH_ENGINE'], request);
    
    // Track successful access
    analytics.capture('endpoint_access', {
      endpoint: request.url,
      ip: request.ip,
    });
    
    return Response.json({ success: true });
    
  } catch (error) {
    // Track security violations
    analytics.capture('security_block', {
      endpoint: request.url,
      ip: request.ip,
      reason: error.message,
    });
    
    throw error;
  }
}
```

## Testing

### Security Testing

```typescript
// __tests__/security.test.ts
import { secure } from '@gabfon/security';

// Mock Arcjet
jest.mock('@arcjet/next');

describe('Security Protection', () => {
  test('allows search engines', async () => {
    const mockRequest = new Request('https://example.com/api/test', {
      headers: { 'User-Agent': 'Googlebot/2.1' },
    });
    
    await expect(secure(['CATEGORY:SEARCH_ENGINE'], mockRequest))
      .resolves.not.toThrow();
  });
  
  test('blocks unknown bots', async () => {
    const mockRequest = new Request('https://example.com/api/test', {
      headers: { 'User-Agent': 'EvilBot/1.0' },
    });
    
    await expect(secure([], mockRequest))
      .rejects.toThrow('No bots allowed');
  });
});
```

### Middleware Testing

```typescript
// __tests__/middleware.test.ts
import { noseconeMiddleware, noseconeOptions } from '@gabfon/security';

describe('Security Middleware', () => {
  test('applies security headers', () => {
    const mockRequest = new Request('https://example.com');
    const response = noseconeMiddleware(noseconeOptions)(mockRequest);
    
    expect(response.headers.get('X-Frame-Options')).toBe('DENY');
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
  });
  
  test('handles CSP in development', () => {
    process.env.NODE_ENV = 'development';
    const response = noseconeMiddleware(noseconeOptions)(new Request('https://example.com'));
    
    const csp = response.headers.get('Content-Security-Policy');
    expect(csp).toContain("unsafe-eval");
  });
});
```
