# architecture

## Overview

The `@apps/www` application is a modern, full-stack web application built with Next.js 15, React 19, and TypeScript. It serves as the primary user-facing application in the monorepo, showcasing the integration of all `@gabfon/*` packages.

## Technology Stack

### Core Framework
- **Next.js 15.5.3** - React framework with App Router
- **React 19.2.1** - UI library with latest features
- **TypeScript 5.9.2** - Type-safe development

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **@gabfon/ui** - Design system with 50+ components
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### Content & Internationalization
- **@gabfon/mdx** - MDX processing with Fumadocs
- **@gabfon/internationalization** - Multi-language support
- **next-international** - Next.js i18n integration

### Data & State
- **@gabfon/database** - Database abstraction layer
- **React Query** - Server state management
- **Zod** - Schema validation

### Development & Testing
- **@gabfon/testing** - Comprehensive testing framework
- **Vitest** - Unit testing
- **Playwright** - E2E testing

## Application Structure

```
apps/www/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth routes group
│   │   ├── (dashboard)/       # Dashboard routes group
│   │   ├── api/               # API routes
│   │   ├── blog/              # Blog pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/             # Reusable components
│   │   ├── providers/         # React providers
│   │   ├── ui/               # UI components
│   │   └── [feature]/        # Feature-specific components
│   ├── data-access/           # Data layer
│   │   └── queries/          # Database queries
│   ├── dictionaries/          # i18n translation files
│   ├── lib/                  # Utilities and configurations
│   ├── scripts/               # Build and utility scripts
│   └── types/                # Type definitions
├── docs/                     # App-specific documentation
├── public/                   # Static assets
├── tests/                    # Test files
└── [config files]            # Next.js, TypeScript, etc.
```

## Key Architectural Patterns

### 1. App Router Architecture

The application uses Next.js 15 App Router with:

- **Server Components** - Default for optimal performance
- **Client Components** - Marked with `"use client"` when needed
- **Route Groups** - `(auth)`, `(dashboard)` for logical organization
- **Parallel Routes** - For complex layouts
- **Intercepting Routes** - For modal/overlay patterns

### 2. Data Layer Architecture

```typescript
// Data access pattern
src/data-access/queries/
├── query-posts.ts          # Blog post queries
├── query-users.ts          # User management
├── query-projects.ts       # Project data
└── index.ts               # Query exports

// Usage in components
import { queryAllPosts } from '@/data-access/queries/query-posts';
const { data: posts, error } = await queryAllPosts();
```

### 3. Component Architecture

**Provider Pattern**:
```typescript
// src/components/providers/
├── i18n-provider.tsx      # Internationalization
├── theme-provider.tsx       # Theme management
├── query-provider.tsx       # React Query
└── design-system-provider.tsx # UI components
```

**Component Composition**:
```typescript
// Feature-based organization
src/components/
├── blog/                   # Blog-specific components
│   ├── post-card.tsx
│   ├── post-list.tsx
│   └── post-pagination.tsx
├── auth/                   # Auth components
└── shared/                 # Shared utilities
```

### 4. Internationalization Architecture

**Locale Support**:
- **Supported Languages**: `en`, `fr`, `es`, `de`, `ja`
- **Locale Detection**: Browser preference → URL path → Default
- **Translation Files**: `src/dictionaries/[locale].json`
- **Middleware**: Automatic locale routing

**Implementation**:
```typescript
// src/middleware.ts
import { createI18nMiddleware } from '@gabfon/internationalization';

export const middleware = createI18nMiddleware({
  locales: ['en', 'fr', 'es', 'de', 'ja'],
  defaultLocale: 'en'
});

// Usage in components
import { useI18n } from '@/lib/i18n';
const t = useI18n();
<h1>{t('welcome.title')}</h1>
```

### 5. Styling Architecture

**Design System Integration**:
```typescript
// Using @gabfon/ui components
import { Button, Card, Input } from '@gabfon/ui';

// Tailwind CSS for custom styling
<button className="flex items-center gap-2 rounded-lg bg-primary">
  <Icon />
  <span>Click me</span>
</button>
```

**Theme System**:
- **CSS Variables** - For dynamic theming
- **Dark Mode** - System preference detection
- **Custom Themes** - Brand-specific variations

### 6. Performance Architecture

**Optimization Strategies**:
- **Server Components** - Reduced client-side JavaScript
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **Caching** - React Query + @gabfon/cache
- **Bundle Analysis** - Built-in analyzer

## Security Architecture

### Authentication & Authorization
```typescript
// Using @gabfon/security
import { authenticate, authorize } from '@gabfon/security';

// Middleware protection
export async function middleware(request: NextRequest) {
  const user = await authenticate(request);
  if (!authorize(user, 'admin')) {
    return NextResponse.redirect('/login');
  }
}
```

### Data Validation
```typescript
// Zod schemas for API routes
const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(10),
  published: z.boolean().default(false)
});
```

## Integration Patterns

### Package Integration

**@gabfon/analytics**:
```typescript
import { trackEvent, trackPageView } from '@gabfon/analytics';

// Event tracking
trackEvent('button_click', { button: 'subscribe' });
trackPageView('/blog/[slug]');
```

**@gabfon/seo**:
```typescript
import { generateMetadata, generateStructuredData } from '@gabfon/seo';

export async function generateMetadata({ params }: PageProps) {
  return generateMetadata({
    title: 'Blog Post',
    description: 'Read our latest blog post',
    openGraph: { ... }
  });
}
```

## Development Workflow

### Local Development
```bash
# Start development server
bun run dev

# Type checking
bun run typecheck

# Testing
bun run test
bun run test:watch
bun run test:coverage
```

### Build Process
```bash
# Production build
bun run build

# Start production server
bun run start

# Analyze bundle
bun run analyze
```

## Performance Considerations

### Core Web Vitals
- **LCP** - Optimized images and font loading
- **FID** - Minimal JavaScript, code splitting
- **CLS** - Stable layout with proper dimensions

### Monitoring
```typescript
// Performance tracking
import { trackWebVitals } from '@gabfon/analytics';

trackWebVitals({
  onLCP: (metric) => logger.info('LCP', metric),
  onFID: (metric) => logger.info('FID', metric),
  onCLS: (metric) => logger.info('CLS', metric)
});
```

## Deployment Architecture

### Environment Configuration
```typescript
// Environment-specific configs
const config = {
  development: {
    database: 'sqlite:./dev.db',
    analytics: false
  },
  production: {
    database: process.env.DATABASE_URL,
    analytics: true
  }
};
```

### Build Optimization
- **Tree Shaking** - Eliminate unused code
- **Minification** - JavaScript and CSS compression
- **Image Optimization** - WebP/AVIF generation
- **Static Generation** - Where possible for performance

## Future Architecture Considerations

### Scalability
- **Edge Functions** - For global performance
- **Micro-frontends** - For team scaling
- **CDN Integration** - For asset delivery

### Advanced Features
- **Real-time Updates** - WebSocket integration
- **Progressive Web App** - Offline capabilities
- **AI Integration** - Using @gabfon/ai package

This architecture provides a solid foundation for building scalable, maintainable web applications while leveraging the full power of the @gabfon monorepo ecosystem.