# @gabfon/next-config API Reference

## Installation

```bash
npm install @gabfon/next-config
```

## Environment Setup

Create environment variables for Next.js configuration:

```env
NEXT_PUBLIC_WEB_URL=https://yourdomain.com
ANALYZE=true
NEXT_RUNTIME=nodejs
```

## Exports

### Main Configuration
```typescript
export { config } from './index';
```

### Bundle Analyzer Wrapper
```typescript
export { withAnalyzer } from './index';
```

### Environment Keys
```typescript
export { keys } from './keys';
```

## Configuration

### config

The main Next.js configuration object with security headers and analytics integration.

#### Usage

```typescript
// next.config.js
import { config } from '@gabfon/next-config';

export default config;
```

#### Features

- **Security Headers**: Comprehensive security headers applied globally
- **Analytics Integration**: PostHog analytics rewrites
- **Trailing Slash Handling**: Configured for PostHog compatibility
- **Environment Validation**: Type-safe environment variable handling

#### Security Headers

```typescript
headers: [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self';"
      },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
    ]
  }
]
```

#### Analytics Rewrites

```typescript
rewrites: [
  {
    source: '/ingest/static/:path*',
    destination: 'https://us-assets.i.posthog.com/static/:path*'
  },
  {
    source: '/ingest/:path*',
    destination: 'https://us.i.posthog.com/:path*'
  },
  {
    source: '/ingest/decide',
    destination: 'https://us.i.posthog.com/decide'
  }
]
```

### withAnalyzer

Higher-order function that wraps the configuration with bundle analysis.

#### Signature

```typescript
function withAnalyzer(sourceConfig: NextConfig): NextConfig
```

#### Usage

```typescript
// next.config.js
import { config, withAnalyzer } from '@gabfon/next-config';

export default withAnalyzer(config);
```

#### Conditional Usage

```typescript
// next.config.js
import { config, withAnalyzer } from '@gabfon/next-config';

const finalConfig = process.env.ANALYZE 
  ? withAnalyzer(config)
  : config;

export default finalConfig;
```

## Environment Variables

### Required Variables

| Variable | Description | Type | Environment | Required |
|----------|-------------|------|-------------|----------|
| `NEXT_PUBLIC_WEB_URL` | Public web URL for the application | URL | Client | Yes |

### Optional Variables

| Variable | Description | Type | Environment | Default |
|----------|-------------|------|-------------|---------|
| `ANALYZE` | Enable bundle analysis | string | Server | undefined |
| `NEXT_RUNTIME` | Runtime environment | 'nodejs' \| 'edge' | Server | undefined |

### Environment Validation

```typescript
import { keys } from '@gabfon/next-config';

// Validates environment variables and returns typed object
const env = keys();
console.log(env.NEXT_PUBLIC_WEB_URL);
```

### Validation Rules

- `NEXT_PUBLIC_WEB_URL`: Must be a valid URL with minimum length
- `ANALYZE`: Optional string value
- `NEXT_RUNTIME`: Must be 'nodejs' or 'edge'
- Extends Vercel preset for additional Vercel-specific variables

## Usage Examples

### Basic Configuration

```typescript
// next.config.js
import { config } from '@gabfon/next-config';

export default config;
```

### Custom Configuration Extension

```typescript
// next.config.js
import { config } from '@gabfon/next-config';

const customConfig = {
  ...config,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
};

export default customConfig;
```

### Environment-Specific Configuration

```typescript
// next.config.js
import { config } from '@gabfon/next-config';

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const finalConfig = {
  ...config,
  ...(isDevelopment && {
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    devIndicators: {
      buildActivity: true,
    },
  }),
  ...(isProduction && {
    compress: true,
    poweredByHeader: false,
  }),
};

export default finalConfig;
```

### Bundle Analysis Integration

```typescript
// next.config.js
import { config, withAnalyzer } from '@gabfon/next-config';

// Enable bundle analysis when ANALYZE=true
const finalConfig = process.env.ANALYZE === 'true' 
  ? withAnalyzer(config)
  : config;

export default finalConfig;
```

### Multi-Environment Configuration

```typescript
// next.config.js
import { config, withAnalyzer } from '@gabfon/next-config';

const { keys } = require('@gabfon/next-config');

const env = keys();

const baseConfig = {
  ...config,
  images: {
    domains: env.NEXT_PUBLIC_WEB_URL ? [new URL(env.NEXT_PUBLIC_WEB_URL).hostname] : [],
  },
};

const finalConfig = env.ANALYZE ? withAnalyzer(baseConfig) : baseConfig;

export default finalConfig;
```

### Security Customization

```typescript
// next.config.js
import { config } from '@gabfon/next-config';

const secureConfig = {
  ...config,
  async headers() {
    const baseHeaders = await config.headers();
    
    return [
      ...baseHeaders,
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-RateLimit-Limit',
            value: '100',
          },
          {
            key: 'X-RateLimit-Remaining',
            value: '99',
          },
        ],
      },
    ];
  },
};

export default secureConfig;
```

## Advanced Configuration

### Custom Security Headers

```typescript
// next.config.js
import { config } from '@gabfon/next-config';

const customSecurityConfig = {
  ...config,
  async headers() {
    const baseHeaders = await config.headers();
    
    return [
      ...baseHeaders,
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default customSecurityConfig;
```

### Custom Rewrites

```typescript
// next.config.js
import { config } from '@gabfon/next-config';

const customRewritesConfig = {
  ...config,
  async rewrites() {
    const baseRewrites = await config.rewrites();
    
    return [
      ...baseRewrites,
      {
        source: '/api/external/:path*',
        destination: 'https://external-api.com/:path*',
      },
      {
        source: '/blog/:slug',
        destination: '/api/blog?slug=:slug',
      },
    ];
  },
};

export default customRewritesConfig;
```

### Middleware Integration

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Custom middleware logic
  const response = NextResponse.next();
  
  // Add custom headers
  response.headers.set('X-Custom-Header', 'value');
  
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

## Error Handling

### Environment Validation Errors

```typescript
// next.config.js
import { config, keys } from '@gabfon/next-config';

try {
  const env = keys();
  console.log('Environment validated successfully');
} catch (error) {
  console.error('Environment validation failed:', error);
  // Handle missing or invalid environment variables
  process.exit(1);
}

export default config;
```

### Configuration Errors

```typescript
// next.config.js
import { config } from '@gabfon/next-config';

function validateConfig(config) {
  // Custom validation logic
  if (!config.images) {
    console.warn('No image configuration found');
  }
  
  return config;
}

export default validateConfig(config);
```

## Best Practices

### 1. Security
- Review and update CSP policies regularly
- Test security headers in different environments
- Monitor security header effectiveness
- Keep security configurations up to date

### 2. Performance
- Use bundle analysis for optimization
- Monitor rewrite performance
- Test configuration impact on build time
- Optimize for production builds

### 3. Environment Management
- Use environment-specific configurations
- Validate environment variables at startup
- Secure sensitive configuration
- Document environment requirements

### 4. Development
- Use consistent configuration across environments
- Test configuration changes thoroughly
- Document custom configuration
- Monitor configuration performance

## Integration Examples

### With Analytics Package

```typescript
// next.config.js
import { config } from '@gabfon/next-config';

const analyticsConfig = {
  ...config,
  // Analytics rewrites are already included in base config
  // Additional analytics-specific configuration can be added here
};

export default analyticsConfig;
```

### With Design System

```typescript
// next.config.js
import { config } from '@gabfon/next-config';

const designSystemConfig = {
  ...config,
  transpilePackages: ['@gabfon/design-system'],
  experimental: {
    optimizePackageImports: ['@gabfon/design-system'],
  },
};

export default designSystemConfig;
```

### With Security Package

```typescript
// next.config.js
import { config } from '@gabfon/next-config';

const securityConfig = {
  ...config,
  // Security headers are already included in base config
  // Additional security middleware can be added
};

export default securityConfig;
```

## Testing

### Configuration Testing

```typescript
// __tests__/next.config.test.js
import { config } from '@gabfon/next-config';

describe('Next.js Configuration', () => {
  test('includes security headers', async () => {
    const headers = await config.headers();
    const securityHeaders = headers[0].headers;
    
    expect(securityHeaders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'Content-Security-Policy' }),
        expect.objectContaining({ key: 'X-Content-Type-Options' }),
        expect.objectContaining({ key: 'X-Frame-Options' }),
        expect.objectContaining({ key: 'Referrer-Policy' }),
        expect.objectContaining({ key: 'Strict-Transport-Security' }),
      ])
    );
  });

  test('includes analytics rewrites', async () => {
    const rewrites = await config.rewrites();
    
    expect(rewrites).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: '/ingest/static/:path*' }),
        expect.objectContaining({ source: '/ingest/:path*' }),
        expect.objectContaining({ source: '/ingest/decide' }),
      ])
    );
  });
});
```

### Environment Testing

```typescript
// __tests__/keys.test.js
import { keys } from '@gabfon/next-config';

describe('Environment Keys', () => {
  test('validates required variables', () => {
    process.env.NEXT_PUBLIC_WEB_URL = 'https://example.com';
    
    const env = keys();
    expect(env.NEXT_PUBLIC_WEB_URL).toBe('https://example.com');
  });

  test('throws error for invalid URL', () => {
    process.env.NEXT_PUBLIC_WEB_URL = 'invalid-url';
    
    expect(() => keys()).toThrow();
  });
});
```
