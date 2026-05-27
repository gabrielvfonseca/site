# @gabfon/security

Security package providing comprehensive security features and middleware.

## Overview

This package provides security utilities and middleware for Next.js applications, including bot protection, DDoS mitigation, and security headers. It integrates with Arcjet and Nosecone for advanced security features.

## Features

- **Bot Protection**: Advanced bot detection and blocking
- **DDoS Protection**: Distributed denial-of-service attack mitigation
- **Security Headers**: Automatic security header injection
- **Rate Limiting**: Built-in rate limiting capabilities
- **Middleware Integration**: Next.js middleware for request filtering
- **Type Safety**: Full TypeScript support with environment validation

## Installation

```bash
pnpm add @gabfon/security
```

## Usage

### Basic Security Setup

```typescript
import { withSecurity } from '@gabfon/security';

// Next.js configuration
const nextConfig = withSecurity({
  // your Next.js config
});
```

### Middleware Integration

```typescript
// middleware.ts
import { securityMiddleware } from '@gabfon/security/middleware';

export default securityMiddleware({
  // security configuration
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### Security Headers

```typescript
import { securityHeaders } from '@gabfon/security';

// Apply security headers
const headers = securityHeaders({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
});
```

### Bot Protection

```typescript
import { botProtection } from '@gabfon/security';

// Check if request is from a bot
const isBot = await botProtection.check(request);

if (isBot) {
  return new Response('Bot detected', { status: 403 });
}
```

## Exports

- `./src/index.ts` - Main security utilities
- `./src/keys.ts` - Environment variable keys
- `./src/middleware.ts` - Next.js middleware

## Environment Variables

```env
# Arcjet Configuration
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=production

# Nosecone Configuration
NOSECONE_KEY=your_nosecone_key
NOSECONE_ENV=production

# Security Configuration
SECURITY_ENABLED=true
BOT_PROTECTION_ENABLED=true
DDOS_PROTECTION_ENABLED=true
```

## Security Features

### Bot Protection
- **Advanced Detection**: Machine learning-based bot detection
- **Behavioral Analysis**: Analyzes request patterns and behavior
- **CAPTCHA Integration**: Optional CAPTCHA challenges
- **Whitelist Support**: Allow trusted bots and crawlers

### DDoS Protection
- **Traffic Analysis**: Real-time traffic pattern analysis
- **Automatic Mitigation**: Automatic blocking of suspicious traffic
- **Rate Limiting**: Built-in rate limiting for API endpoints
- **Geographic Filtering**: Block traffic from specific regions

### Security Headers
- **Content Security Policy**: Prevent XSS attacks
- **Strict Transport Security**: Enforce HTTPS
- **X-Frame-Options**: Prevent clickjacking
- **X-Content-Type-Options**: Prevent MIME sniffing
- **Referrer Policy**: Control referrer information

## Configuration

```typescript
interface SecurityConfig {
  botProtection: {
    enabled: boolean;
    mode: 'monitor' | 'block';
    whitelist?: string[];
  };
  ddosProtection: {
    enabled: boolean;
    threshold: number;
    window: string;
  };
  headers: {
    contentSecurityPolicy?: object;
    strictTransportSecurity?: boolean;
    xFrameOptions?: string;
  };
}
```

## Dependencies

- `@arcjet/next` - Arcjet security integration
- `@nosecone/next` - Nosecone security integration
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

1. **Enable All Features**: Enable bot protection, DDoS protection, and security headers
2. **Monitor Logs**: Regularly monitor security logs for threats
3. **Update Rules**: Keep security rules and patterns updated
4. **Test Configuration**: Test security configuration in staging environment
5. **Whitelist Trusted Sources**: Whitelist legitimate bots and services

## Error Handling

```typescript
try {
  const result = await securityMiddleware(request);
  
  if (result.blocked) {
    return new Response('Request blocked', { 
      status: result.status,
      headers: result.headers 
    });
  }
} catch (error) {
  // Handle security service errors
  console.error('Security error:', error);
  // Optionally allow request to proceed
}
```

## Monitoring

The security package provides detailed logging and monitoring:

- **Threat Detection**: Logs of detected threats and attacks
- **Performance Metrics**: Security middleware performance
- **Blocked Requests**: Statistics on blocked requests
- **Bot Activity**: Bot detection and blocking statistics