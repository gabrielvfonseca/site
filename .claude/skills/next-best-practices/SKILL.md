---
name: next-best-practices
description: Expert guidance for Next.js 16 development with App Router, TypeScript, and modern best practices. Use for Next.js-specific architecture decisions, performance optimization, and framework patterns.
license: Complete terms in LICENSE.txt
---

This skill provides expert guidance for Next.js 16 development using the App Router, TypeScript, and modern web development best practices.

The user requests help with Next.js development: architecture decisions, component patterns, performance optimization, or framework-specific features.

## Next.js Expertise

### Core Architecture
- **App Router**: Proper usage of layouts, pages, and routing patterns
- **Server vs Client Components**: Strategic decisions for rendering strategy
- **Data Fetching**: Implementing Next.js data fetching patterns (fetch, cache, revalidate)
- **Middleware**: Authentication, redirects, and request processing
- **API Routes**: Building robust backend endpoints with proper error handling

### Performance Optimization
- **Code Splitting**: Dynamic imports and route-based splitting
- **Image Optimization**: Next.js Image component with proper sizing and lazy loading
- **Caching Strategies**: ISR, SSR, and static generation decisions
- **Bundle Analysis**: Identifying and optimizing bundle size issues
- **Font Optimization**: Using next/font for performance

### Development Patterns
- **TypeScript Integration**: Strict typing for all Next.js APIs
- **Environment Configuration**: Proper env var usage with validation
- **Error Handling**: Error boundaries and proper error reporting
- **Metadata API**: Comprehensive SEO and social media optimization
- **Route Handlers**: Modern API route patterns with proper validation

### Key Principles

Always follow Next.js 16 best practices:
- Use App Router for new projects
- Implement proper loading and error states
- Leverage React Server Components by default
- Use TypeScript with strict mode
- Implement proper caching strategies
- Follow the data fetching hierarchy

### Common Scenarios

**Component Architecture**:
```
// Server Component (default)
export default function ServerComponent() {
  // Server-side logic, data fetching
  return <div>{/* Server-rendered content */}</div>
}

// Client Component
'use client'
export default function ClientComponent() {
  // Interactive features, state, effects
  return <div>{/* Client-side interactivity */}</div>
}
```

**Data Fetching Patterns**:
```typescript
// Static generation
export async function generateStaticParams() {
  // Return static params
}

// Server-side data fetching
async function getData() {
  const res = await fetch('https://api.example.com', {
    cache: 'force-static', // or 'no-store'
  })
  return res.json()
}
```

**API Routes**:
```typescript
// app/api/hello/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Handle GET request
  return NextResponse.json({ message: 'Hello World' })
}

export async function POST(request: Request) {
  // Handle POST request
  const body = await request.json()
  return NextResponse.json({ received: body })
}
```

### Integration Points

- **Sanity CMS**: Content fetching with GROQ queries
- **Vercel**: Deployment analytics and performance monitoring
- **Sentry**: Error tracking and performance monitoring
- **Tailwind CSS**: Styling with CSS-in-JS optimization
- **shadcn/ui**: Component library integration

### Quality Standards

- Implement proper error boundaries
- Add comprehensive metadata for SEO
- Use proper TypeScript types for all APIs
- Test API routes and data fetching
- Monitor performance with Vercel Analytics
- Track errors with Sentry

Remember: Next.js 16 with App Router represents the future of React development. Embrace server components, proper caching, and the full power of the framework while maintaining excellent developer experience and user performance.
