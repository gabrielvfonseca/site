# deployment

## Overview

This guide covers deployment strategies for the `site` application, including production setup, environment configuration, and CI/CD pipeline integration.

## Deployment Options

### 1. Vercel (Recommended)

Vercel provides the best integration with Next.js applications and offers automatic optimizations.

#### Setup

```bash
# Install Vercel CLI
bun add -D vercel

# Login to Vercel
bunx vercel login

# Deploy project
bunx vercel --prod
```

#### Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "bun run build",
  "outputDirectory": ".next",
  "installCommand": "bun install",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_SITE_URL": "@site_url",
    "OPENAI_API_KEY": "@openai_api_key",
    "SPOTIFY_CLIENT_ID": "@spotify_client_id",
    "SPOTIFY_CLIENT_SECRET": "@spotify_client_secret",
    "STRAVA_CLIENT_ID": "@strava_client_id",
    "STRAVA_CLIENT_SECRET": "@strava_client_secret",
    "ARCJET_KEY": "@arcjet_key"
  },
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

#### Environment Variables

Set these in Vercel dashboard:

```bash
# Core Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# AI Integration
OPENAI_API_KEY=your-openai-api-key

# Music Service Integrations
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
STRAVA_CLIENT_ID=your-strava-client-id
STRAVA_CLIENT_SECRET=your-strava-client-secret

# Security
ARCJET_KEY=your-arcjet-key

# Analytics & Monitoring
NEXT_PUBLIC_GA_ID=your-ga-id
SENTRY_DSN=your-sentry-dsn
```

### 2. Docker Deployment

For self-hosted deployments using Docker.

#### Dockerfile

```dockerfile
# Multi-stage build for optimization
FROM node:18-alpine AS base
WORKDIR /app
COPY package.json bun.lockb ./
RUN corepack enable bun && bun install --frozen-lockfile

# Build stage
FROM base AS builder
COPY . .
RUN bun run build

# Production stage
FROM base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=http://localhost:3000
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
      - SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}
      - STRAVA_CLIENT_ID=${STRAVA_CLIENT_ID}
      - STRAVA_CLIENT_SECRET=${STRAVA_CLIENT_SECRET}
      - ARCJET_KEY=${ARCJET_KEY}
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  redis_data:
```

### 3. Static Export

For static site deployment to GitHub Pages, Netlify, or similar.

#### Configuration

Update `next.config.ts`:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Disable server-side features for static export
  experimental: {
    missingSuspenseWithCSRBailout: false
  },
  // Disable API routes for static export
  async rewrites() {
    return [];
  }
};

export default nextConfig;
```

#### Build and Deploy

```bash
# Build static files
bun run build

# Deploy to Netlify
bunx netlify deploy --prod --dir=out

# Deploy to GitHub Pages
bunx gh-pages -d out
```

## Environment Configuration

### Development Environment

```bash
# .env.local
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# AI Integration (Optional for development)
OPENAI_API_KEY=your-openai-api-key

# Music Service Integrations (Optional for development)
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
STRAVA_CLIENT_ID=your-strava-client-id
STRAVA_CLIENT_SECRET=your-strava-client-secret

# Security (Optional for development)
ARCJET_KEY=your-arcjet-key

# Development-only features
NEXT_PUBLIC_DEV_TOOLS=true
ANALYTICS_ENABLED=false
```

### Production Environment

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# AI Integration
OPENAI_API_KEY=your-openai-api-key

# Music Service Integrations
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
STRAVA_CLIENT_ID=your-strava-client-id
STRAVA_CLIENT_SECRET=your-strava-client-secret

# Security
ARCJET_KEY=your-arcjet-key

# Production features
NEXT_PUBLIC_DEV_TOOLS=false
ANALYTICS_ENABLED=true
SENTRY_DSN=your-sentry-dsn
```

### Environment Variables Schema

```typescript
// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  
  // AI Integration
  OPENAI_API_KEY: z.string().min(1),
  
  // Music Service Integrations
  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
  STRAVA_CLIENT_ID: z.string().min(1),
  STRAVA_CLIENT_SECRET: z.string().min(1),
  
  // Security
  ARCJET_KEY: z.string().min(1),
  
  // Optional analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
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
        run: bun run test
        
      - name: Run typecheck
        run: bun run typecheck
        
      - name: Build application
        run: bun run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install dependencies
        run: bun install --frozen-lockfile
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Deployment Scripts

```bash
# scripts/deploy.sh
#!/bin/bash
set -e

echo "Starting deployment..."

# Check if we're on main branch
if [ "$(git branch --show-current)" != "main" ]; then
  echo "Error: Not on main branch. Aborting."
  exit 1
fi

# Pull latest changes
git pull origin main

# Install dependencies
bun install

# Run tests
bun run test

# Build application
bun run build

# Deploy to Vercel
bunx vercel --prod

echo "Deployment complete!"
```

## Performance Optimization

### Build Optimization

```typescript
// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@gabfon/design-system', 'lucide-react'],
    turbopackFileSystemCacheForDev: true,
    inlineCss: true,
    cachedNavigations: true,
  },
  
  // Bundle analyzer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression
  compress: true,
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### CDN Configuration

```typescript
// next.config.ts - CDN setup
const nextConfig = {
  // Asset prefix for CDN
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.your-domain.com' 
    : undefined,
    
  // Image CDN
  images: {
    domains: ['cdn.your-domain.com'],
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
};
```

## Monitoring & Analytics

### Performance Monitoring

```typescript
// lib/performance.ts
import { AnalyticsProvider } from '@gabfon/analytics';

// Performance tracking is handled automatically by the provider
// In your layout.tsx:
// <AnalyticsProvider>
//   {children}
// </AnalyticsProvider>
```

## Security Considerations

### Security Headers

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};
```

### Environment Security

```bash
# Secure environment variables
echo "ARCJET_KEY=$(openssl rand -base64 32)" >> .env.local

# Generate secure keys for music services
# Spotify: Get from Spotify Developer Dashboard
# Strava: Get from Strava API Settings
# OpenAI: Get from OpenAI Platform

# Rate limiting is handled by Arcjet automatically
```

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear build cache
rm -rf .next

# Clear node modules
rm -rf node_modules bun.lockb
bun install

# Check TypeScript errors
bun run typecheck
```

#### Deployment Failures
```bash
# Check environment variables
bunx vercel env ls

# Check build logs
bunx vercel logs

# Test production build locally
NODE_ENV=production bun run build
```

#### Performance Issues
```bash
# Analyze bundle size
bun run analyze

# Check Core Web Vitals
bunx lighthouse http://your-domain.com

# Monitor API response times
curl -w "@curl-format.txt" -o /dev/null -s "https://your-domain.com/api/posts"
```

This deployment guide provides comprehensive coverage for deploying the `site` application across various platforms while maintaining security, performance, and reliability.