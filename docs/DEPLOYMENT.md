# deployment guide

This guide covers deploying the application to various platforms and environments.

## Overview

The application is designed for modern deployment platforms with support for:
- **Vercel** (recommended) - Zero-config deployment
- **Docker** - Container-based deployment
- **Static Hosting** - Static export capability
- **Traditional Hosting** - Custom server deployment

## Dependency Management with Renovate

This project uses **Renovate** for automated dependency management. Renovate automatically creates pull requests to keep dependencies up to date.

### Renovate Configuration

The project includes a comprehensive `renovate.json` configuration that:

- **Monitors all packages** in the monorepo structure
- **Groups related dependencies** (React, TypeScript, testing, etc.)
- **Automates minor/patch updates** for development dependencies
- **Requires approval** for major version updates
- **Handles workspace dependencies** properly
- **Runs security updates** immediately

### Setup Requirements

1. **GitHub Token**: Create a personal access token with `repo` and `workflow` permissions
2. **Repository Secret**: Add `RENOVATE_TOKEN` to your repository secrets
3. **Enable Workflow**: The GitHub Actions workflow runs hourly

### Renovate Features

```json
{
  "schedule": ["before 6am on monday"],
  "prConcurrentLimit": 3,
  "automerge": true, // for minor/patch dev deps
  "groups": [
    "workspace dependencies",
    "internal packages", 
    "TypeScript ecosystem",
    "Next.js ecosystem",
    "Testing packages"
  ]
}
```

### Monitoring Updates

- **Dependency Dashboard**: Auto-generated issue tracking all updates
- **Pull Requests**: Grouped by dependency type
- **Security Alerts**: Immediate updates for vulnerabilities
- **Release Stability**: Configurable waiting periods

## Vercel Deployment (Recommended)

### Automatic Deployment

The project is pre-configured for Vercel deployment:

1. **Connect Repository**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel --prod
```

2. **Environment Variables**

Configure in Vercel dashboard:

```bash
# Required environment variables
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key

# Optional
ANALYZE=true              # Enable bundle analysis
SENTRY_DSN=your-sentry-dsn
POSTHOG_KEY=your-posthog-key
```

3. **Domain Configuration**

- Custom domains can be added in Vercel dashboard
- SSL certificates are automatically managed
- CDN is globally distributed

### Vercel Configuration

The `vercel.json` file handles deployment settings:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "functions": {
    "apps/www/src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

## Docker Deployment

### Building the Image

```bash
# Build Docker image
docker build -t your-app-name .

# Tag for registry
docker tag your-app-name your-registry/your-app-name:latest
```

### Running with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## Static Export

### Generating Static Files

```bash
# Export static site
pnpm build
pnpm export

# Files are in out/ directory
```

### Static Hosting Configuration

```json
// next.config.ts
{
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  distDir: 'out'
}
```

### Deploying to Static Hosting

```bash
# Deploy to Netlify
npm i -g netlify-cli
netlify deploy --prod --dir=out

# Deploy to GitHub Pages
gh-pages --dist out --branch gh-pages
```

## Environment Configuration

### Development

```bash
# .env.local
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/devdb
```

### Staging

```bash
# .env.staging
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.your-app.com
DATABASE_URL=postgresql://staging-db:5432/stagingdb
```

### Production

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app.com
DATABASE_URL=postgresql://prod-db:5432/proddb
```

## Database Deployment

### PostgreSQL Setup

```sql
-- Create database
CREATE DATABASE myapp;

-- Create user
CREATE USER myapp_user WITH PASSWORD 'secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE myapp TO myapp_user;
```

### Migration Management

```bash
# Run migrations
pnpm db:migrate

# Create new migration
pnpm db:migration:add create_user_table

# Reset database
pnpm db:reset
```

## Performance Optimization

### Build Optimization

```json
// next.config.ts
{
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@gabfon/ui']
  }
}
```

### CDN Configuration

```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Monitoring and Logging

### Sentry Integration

```typescript
// apps/www/src/lib/monitoring.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Analytics Setup

```typescript
// apps/www/src/lib/analytics.ts
import { Analytics } from '@vercel/analytics/react';

export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
};
```

## Security Considerations

### Environment Variables

```bash
# Use secure random values
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Database connection with SSL
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
```

### Headers and Security

```json
// next.config.ts
{
  headers: [
    {
      key: 'X-Frame-Options',
      value: 'DENY'
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin'
    }
  ]
}
```

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run tests
        run: pnpm test
        
      - name: Build application
        run: pnpm build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Troubleshooting

### Common Deployment Issues

**Build Failures**

```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

**Environment Variables**

```bash
# Verify environment setup
pnpm build:env
```

**Database Connection**

```bash
# Test database connection
pnpm db:migrate
```

**Performance Issues**

```bash
# Analyze bundle size
ANALYZE=true pnpm build
```

### Rollback Procedures

```bash
# Vercel rollback
vercel rollback

# Docker rollback
docker-compose down
docker-compose up -d --force-recreate
```

## Scaling Considerations

### Horizontal Scaling

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    build: .
    deploy:
      replicas: 3
    environment:
      - DATABASE_URL=postgresql://load-balancer:5432/myapp
```

### Database Scaling

```sql
-- Read replicas for read-heavy workloads
CREATE DATABASE myapp_replica;
```

---

*This deployment guide evolves with the project. Last updated: 2025-03-23*
