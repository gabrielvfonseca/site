# architecture

This document provides an in-depth overview of the project's architecture, design decisions, and technical implementation details.

## Overview

This is a modern monorepo application built with:
- **Next.js 15** - React framework for the web application
- **Turbo** - Monorepo management and build orchestration
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS 4** - Utility-first CSS framework
- **Fumadocs MDX** - Content management and MDX processing
- **pnpm** - Fast, disk space efficient package manager

## Monorepo Structure

```
site/
├── apps/                    # Applications
│   └── www/               # Main Next.js web application
├── packages/                # Shared packages
│   ├── mdx/               # MDX processing with Fumadocs
│   ├── design-system/      # UI components and styling
│   ├── analytics/          # Analytics utilities
│   ├── observability/      # Logging and monitoring
│   ├── next-config/        # Next.js configuration
│   ├── typescript-config/   # Shared TypeScript config
│   ├── ai/                # AI integration utilities
│   ├── database/           # Database utilities
│   ├── rate-limit/         # Rate limiting
│   ├── cache/              # Caching solutions
│   ├── security/           # Security utilities
│   ├── seo/               # SEO utilities
│   └── email/             # Email templates
├── content/                # MDX content
│   ├── docs/              # Documentation pages
│   └── blog/              # Blog posts
├── docs/                  # Project documentation
├── internals/              # Internal tooling
│   ├── next-config/        # Next.js shared config
│   └── typescript-config/   # TypeScript shared config
├── scripts/                # Utility scripts
└── migrations/             # Database migrations
```

## Package Dependencies

### Core Application (`apps/www`)

The main web application depends on:
- `@gabfon/mdx` - Custom MDX processing package
- `@gabfon/ui` - UI components
- `@gabfon/analytics` - Analytics integration
- Various third-party packages (Next.js, React, etc.)

### Shared Packages

#### `@gabfon/mdx`
- **Purpose**: MDX content processing and collections
- **Technology**: Fumadocs MDX
- **Exports**: MDX components, collections, Next.js plugin

#### `@gabfon/ui`
- **Purpose**: Reusable UI components
- **Technology**: React, Tailwind CSS
- **Exports**: Components, utilities, styling

#### `@gabfon/analytics`
- **Purpose**: Analytics integration
- **Technology**: Vercel Analytics, PostHog
- **Exports**: Analytics providers, utilities

## Content Management

### Fumadocs MDX Integration

The project uses Fumadocs MDX for content management:

```typescript
// source.config.ts - Root configuration
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs',
});

export const blog = defineDocs({
  dir: 'content/blog',
});

export default defineConfig();
```

### Content Processing

1. **Collections**: Auto-generated TypeScript types for content
2. **Frontmatter**: Validated metadata for each MDX file
3. **Compilation**: Fast MDX compilation with caching
4. **API**: Programmatic access to content data

## Development Workflow

### Build System

Turbo orchestrates the build process:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### Code Quality

- **Biome**: Linting and formatting
- **TypeScript**: Static type checking
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Conventional commit enforcement

## Data Flow

```
Content (MDX) → Fumadocs MDX → Collections → Next.js Pages → Browser
     ↓
TypeScript Generation → Type Safety → Developer Experience
```

## Key Architectural Decisions

### 1. Monorepo with Turbo

**Why**: Simplifies dependency management and build orchestration
**Benefits**: 
- Shared packages reduce code duplication
- Consistent tooling across packages
- Efficient caching and incremental builds

### 2. Fumadocs MDX

**Why**: Type-safe content management with excellent DX
**Benefits**:
- Auto-generated TypeScript types
- Fast compilation and caching
- Rich content features (collections, frontmatter)

### 3. Tailwind CSS 4

**Why**: Modern utility-first CSS with excellent performance
**Benefits**:
- Consistent design system
- Highly optimized CSS
- Excellent developer experience

### 4. TypeScript Everywhere

**Why**: Type safety and better developer experience
**Benefits**:
- Catch errors at compile time
- Better IDE support
- Self-documenting code

## Performance Considerations

### Build Performance

- **Turbo Caching**: Incremental builds with smart caching
- **Parallel Processing**: Multiple packages built simultaneously
- **MDX Compilation**: Fast compilation with caching

### Runtime Performance

- **Next.js**: Automatic code splitting and optimization
- **Tailwind CSS**: Minimal CSS bundle size
- **Fumadocs MDX**: Efficient content loading

## Security Architecture

### Package Security

- **Dependency Scanning**: Automated vulnerability scanning
- **Content Security**: MDX content is processed safely
- **Environment Variables**: Sensitive data properly managed

### Application Security

- **@gabfon/security**: Centralized security utilities
- **Rate Limiting**: API protection
- **Input Validation**: Type-safe data handling

## Deployment Architecture

### Vercel Integration

- **Automatic Deployments**: Git-based deployment
- **Environment Management**: Proper env var handling
- **Edge Functions**: Serverless functions for dynamic content

### Docker Support

```dockerfile
# Multi-stage build for optimization
FROM node:20-alpine AS builder
# ... build steps
FROM node:20-alpine AS runner
# ... runtime
```

## Monitoring and Observability

### Logging

- **Sentry**: Error tracking and performance monitoring
- **Logtail**: Structured logging
- **Custom Utilities**: Centralized logging interface

### Analytics

- **Vercel Analytics**: Core web analytics
- **PostHog**: Product analytics and user behavior
- **Custom Events**: Business metrics tracking

## Future Architecture Considerations

### Scalability

- **Microservices**: Potential service splitting
- **CDN Integration**: Content delivery optimization
- **Database Scaling**: Optimized data storage

### Technology Evolution

- **React Server Components**: Adoption as they mature
- **Edge Runtime**: More edge-side processing
- **AI Integration**: Enhanced AI-powered features

---

*This architecture document evolves with the project. Last updated: 2025-03-23*
