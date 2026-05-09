# architecture

## Overview

The `site` application is a modern, full-stack web application built with Next.js 16, React 19, and TypeScript. It serves as the primary user-facing application in the monorepo, showcasing the integration of all `@gabfon/*` packages.

## Technology Stack

### Core Framework
- **Next.js 16.2.1** - React framework with App Router
- **React 19.2.1** - UI library with latest features
- **TypeScript 5.9.2** - Type-safe development

### Styling & UI
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **@gabfon/design-system** - Design system with components
- **Lucide React** - Icon library
- **Motion** - Animation library

### Content & MDX
- **Fumadocs** - MDX processing and documentation
- **Contentlayer** - Content management
- **Remark** - Markdown processing
- **Shiki** - Syntax highlighting

### Data & State
- **@tanstack/react-query** - Server state management
- **Zod 4.1.5** - Schema validation
- **Nuqs** - URL state management

### Development & Testing
- **Vitest 3.2.4** - Unit testing framework
- **Playwright** - E2E testing
- **@gabfon/testing** - Testing utilities
- **Biome** - Code linting and formatting

## Application Structure

```
apps/web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (site)/            # Site routes group
│   │   ├── api/               # API routes
│   │   │   ├── chat/          # AI chat API
│   │   │   ├── github/        # GitHub integration
│   │   │   ├── spotify/       # Spotify integration
│   │   │   ├── strava/        # Strava integration
│   │   │   └── now/           # Now playing API
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/             # Reusable components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and configurations
│   ├── constants/             # Application constants
│   ├── styles/                # CSS files
│   └── types/                 # Type definitions
├── docs/                     # App-specific documentation
├── public/                   # Static assets
├── tests/                    # Test files
└── [config files]            # Next.js, TypeScript, etc.
```

## Key Architectural Patterns

### 1. App Router Architecture

The application uses Next.js 16 App Router with:

- **Server Components** - Default for optimal performance
- **Client Components** - Marked with `"use client"` when needed
- **Route Groups** - `(site)` for logical organization
- **API Routes** - RESTful endpoints for integrations
- **MDX Support** - For documentation and content

### 2. API Integration Architecture

```typescript
// API routes structure
src/app/api/
├── chat/                  # AI chat integration
│   ├── route.ts          # Chat endpoint
│   └── types.ts          # Chat types
├── github/               # GitHub API integration
│   ├── route.ts          # GitHub webhook handler
│   ├── stars.ts          # Star counting
│   └── types.ts          # GitHub types
├── spotify/              # Spotify API integration
│   ├── route.ts          # Spotify endpoint
│   ├── now-playing.ts    # Current track
│   ├── top-tracks.ts     # Top tracks
│   └── types.ts          # Spotify types
├── strava/               # Strava API integration
│   ├── route.ts          # Strava endpoint
│   ├── activities.ts     # Activity data
│   ├── stats.ts          # Athlete stats
│   ├── tokens.ts         # OAuth tokens
│   ├── webhook.ts        # Webhook handler
│   └── types.ts          # Strava types
└── now/                  # Now playing aggregation
    └── route.ts          # Combined music data
```

### 3. Component Architecture

**Provider Pattern**:
```typescript
// src/app/layout.tsx - Root providers
<QueryProvider>
  <ThemeProvider defaultTheme="dark" enableSystem>
    <AnalyticsProvider>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </AnalyticsProvider>
  </ThemeProvider>
</QueryProvider>
```

**Component Organization**:
```typescript
// Feature-based organization
src/components/
├── providers/             # React context providers
├── ui/                   # Base UI components
├── [feature]/           # Feature-specific components
└── lib/                 # Component utilities
```

### 4. State Management Architecture

**React Query Integration**:
```typescript
// src/providers/query-provider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 3,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

**URL State Management**:
```typescript
// Using Nuqs for URL state
import { useQueryState } from 'nuqs';

const [search, setSearch] = useQueryState('q', {
  defaultValue: '',
  clearOnDefault: true,
});
```

### 5. Styling Architecture

**Design System Integration**:
```typescript
// Using @gabfon/design-system components
import { Button, Card, Input } from '@gabfon/design-system/components';

// Tailwind CSS for custom styling
<button className="flex items-center gap-2 rounded-lg bg-primary">
  <Icon />
  <span>Click me</span>
</button>
```

**Theme System**:
- **CSS Variables** - For dynamic theming
- **Dark Mode** - System preference detection
- **Tailwind CSS 4** - Latest utility-first framework

**Font System**:
```typescript
// Using design system fonts
import { fonts } from '@gabfon/design-system/lib/fonts';

<html className={fonts} lang="en">
```

### 6. Performance Architecture

**Optimization Strategies**:
- **Server Components** - Reduced client-side JavaScript
- **Image Optimization** - Next.js Image component with AVIF/WebP
- **Code Splitting** - Automatic route-based splitting
- **Component Caching** - React Query caching
- **Bundle Analysis** - Built-in analyzer
- **Turbopack** - Fast development builds

## Security Architecture

### API Security
```typescript
// Using @gabfon/security and @arcjet/next
import { authenticate, authorize } from '@gabfon/security';
import arcjet, { shield } from '@arcjet/next';

// API route protection
export async function GET(request: NextRequest) {
  const user = await authenticate(request);
  if (!authorize(user, 'read')) {
    return NextResponse.redirect('/login');
  }
}

// Arcjet protection
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [shield()],
});
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
import { AnalyticsProvider } from '@gabfon/analytics';

// In layout.tsx
<AnalyticsProvider>
  {children}
</AnalyticsProvider>
```

**@gabfon/seo**:
```typescript
import { createMetadata, createViewport } from '@gabfon/seo/metadata';
import { createViewport } from '@gabfon/seo/viewport';

export const metadata: Metadata = createMetadata({ ...meta });
export const viewport: Viewport = createViewport();
```

**@gabfon/ai**:
```typescript
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

// In API routes
const { text } = await generateText({
  model: openai('gpt-4-turbo'),
  prompt: 'Generate a response',
});
```

### External API Integrations

**GitHub Integration**:
```typescript
// src/app/api/github/stars.ts
export async function GET() {
  const response = await fetch('https://api.github.com/repos/owner/repo');
  const data = await response.json();
  return NextResponse.json({ stars: data.stargazers_count });
}
```

**Spotify Integration**:
```typescript
// src/app/api/spotify/now-playing.ts
export async function GET() {
  const token = await getSpotifyToken();
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return NextResponse.json(await response.json());
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

# Bundle analysis
bun run analyze
```

### Build Process
```bash
# Production build
bun run build

# Start production server
bun run start

# Clean build cache
bun run clean
```

## Performance Considerations

### Core Web Vitals
- **LCP** - Optimized images (AVIF/WebP) and font loading
- **FID** - Minimal JavaScript, code splitting
- **CLS** - Stable layout with proper dimensions

### Monitoring
```typescript
// Performance tracking with @gabfon/analytics
import { AnalyticsProvider } from '@gabfon/analytics';

// Automatic tracking in provider
<AnalyticsProvider>
  {children}
</AnalyticsProvider>
```

## Deployment Architecture

### Environment Configuration
```typescript
// @t3-oss/env-nextjs for type-safe environment variables
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  clientPrefix: 'NEXT_PUBLIC_',
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
  },
  server: {
    DATABASE_URL: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    STRAVA_CLIENT_ID: z.string().min(1),
    STRAVA_CLIENT_SECRET: z.string().min(1),
  },
  runtimeEnv: process.env,
});
```

### Build Optimization
- **Tree Shaking** - Eliminate unused code
- **Minification** - JavaScript and CSS compression
- **Image Optimization** - AVIF/WebP generation
- **Static Generation** - Where possible for performance
- **Turbopack** - Fast development builds

## Future Architecture Considerations

### Scalability
- **Edge Functions** - For global performance
- **Micro-frontends** - For team scaling
- **CDN Integration** - For asset delivery

### Advanced Features
- **Real-time Updates** - WebSocket integration
- **Progressive Web App** - Offline capabilities
- **AI Integration** - Enhanced @gabfon/ai package features
- **Advanced Analytics** - Custom tracking and insights

This architecture provides a solid foundation for building scalable, maintainable web applications while leveraging the full power of the @gabfon monorepo ecosystem.