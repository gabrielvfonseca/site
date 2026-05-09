# overview

## Introduction

The `site` application is a modern, full-stack web application that serves as the primary user-facing interface for the `@gabfon` monorepo ecosystem. Built with Next.js 16, React 19, and TypeScript, it demonstrates best practices for integrating multiple packages into a cohesive, production-ready application.

## Key Features

### Modern Web Development
- **Next.js 16** with App Router for optimal performance
- **React 19** with Server Components by default
- **TypeScript** for type-safe development
- **Tailwind CSS 4** for utility-first styling

### Design System Integration
- **@gabfon/design-system** - Comprehensive component library
- **Consistent theming** with CSS variables
- **Dark mode** support with system preference detection
- **Responsive design** for all screen sizes

### Content Management
- **MDX support** with Fumadocs integration
- **Content management** with Contentlayer
- **SEO optimization** with structured data
- **Syntax highlighting** with Shiki

### AI Integration
- **OpenAI API** integration for AI features
- **AI chat** functionality with streaming responses
- **Content generation** capabilities
- **Smart automation** features

### Security & Protection
- **Arcjet** integration for API protection
- **Rate limiting** and abuse prevention
- **Input validation** with Zod schemas
- **Security headers** and best practices

### Service Integrations
- **Spotify API** - Music data and now playing
- **Strava API** - Activity tracking and stats
- **GitHub API** - Repository information
- **Combined endpoints** for unified data

## Package Ecosystem Integration

The application showcases seamless integration of all `@gabfon/*` packages:

### Core Infrastructure
- **@gabfon/ai** - AI integration and OpenAI API
- **@gabfon/analytics** - User behavior tracking
- **@gabfon/design-system** - Component library
- **@gabfon/seo** - Search optimization
- **@gabfon/security** - Security utilities

### User Experience
- **@gabfon/design-system** - Design system components
- **@gabfon/analytics** - User behavior tracking
- **@gabfon/seo** - Search optimization
- **@gabfon/email** - Email notifications

### Content & Communication
- **@gabfon/mdx** - MDX processing
- **@gabfon/email** - Email notifications
- **@gabfon/ai** - AI-powered features

### Development Tools
- **@gabfon/testing** - Comprehensive testing
- **@gabfon/rate-limit** - API protection
- **@gabfon/typescript-config** - Shared TypeScript config
- **@gabfon/observability** - Error tracking and monitoring

## Application Structure

### Directory Layout

```
apps/web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (site)/            # Site routes group
│   │   ├── api/               # API endpoints
│   │   │   ├── chat/          # AI chat API
│   │   │   ├── github/        # GitHub integration
│   │   │   ├── spotify/       # Spotify integration
│   │   │   ├── strava/        # Strava integration
│   │   │   └── now/           # Now playing aggregation
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/             # Reusable components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and configurations
│   ├── constants/             # Application constants
│   ├── styles/                # CSS files
│   └── types/                 # Type definitions
├── docs/                     # Documentation
├── public/                   # Static assets
├── tests/                    # Test files
└── [config files]            # Configuration
```

### Key Directories Explained

#### `/src/app` - Next.js App Router
- **Server Components** by default for optimal performance
- **Route Groups** for logical organization
- **API Routes** for backend functionality
- **Service Integrations** (Spotify, Strava, GitHub, AI)

#### `/src/components` - Component Library
- **Providers** for React context (theme, analytics)
- **UI Components** extending the design system
- **Feature Components** for specific functionality

#### `/src/lib` - Utilities
- **API integrations** with proper error handling
- **Helper functions** for common operations
- **Configuration files** and constants

#### `/src/hooks` - Custom Hooks
- **React Query hooks** for data fetching
- **State management** hooks
- **Utility hooks** for common patterns

## Technology Stack

### Frontend Framework
- **Next.js 16.2.1** - React framework with App Router
- **React 19.2.1** - UI library with latest features
- **TypeScript 5.9.2** - Type-safe development

### Styling & Design
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **@gabfon/design-system** - Comprehensive component library
- **Lucide React** - Modern icon library
- **Motion** - Animation library

### Data & State
- **@tanstack/react-query** - Server state management
- **Zod 4.1.5** - Schema validation
- **Nuqs** - URL state management
- **@gabfon/cache** - Performance caching

### Development Tools
- **Vitest 3.2.4** - Unit testing framework
- **Playwright** - E2E testing
- **@gabfon/testing** - Testing utilities
- **Biome** - Code linting and formatting

## Performance Features

### Core Web Vitals Optimization
- **Largest Contentful Paint (LCP)** - Optimized images and fonts
- **First Input Delay (FID)** - Minimal JavaScript bundle
- **Cumulative Layout Shift (CLS)** - Stable layouts with proper dimensions

### Bundle Optimization
- **Code Splitting** - Automatic route-based splitting
- **Tree Shaking** - Eliminate unused code
- **Image Optimization** - AVIF/WebP generation
- **Font Optimization** - Preload critical fonts

### Caching Strategy
- **Static Asset Caching** - Long-term cache for static files
- **API Response Caching** - Intelligent data caching with React Query
- **Browser Caching** - Proper cache headers
- **CDN Integration** - Global content delivery

## Security Features

### API Security
- **Arcjet Integration** - Advanced API protection
- **Rate Limiting** - Automatic abuse prevention
- **Input Validation** - Zod schema validation
- **Security Headers** - Comprehensive header configuration

### Data Protection
- **Input Validation** - Zod schema validation
- **API Security** - Arcjet protection
- **XSS Protection** - Content Security Policy
- **CSRF Protection** - Anti-CSRF tokens

### Infrastructure Security
- **HTTPS Enforcement** - SSL/TLS certificates
- **Security Headers** - Comprehensive header configuration
- **API Protection** - Arcjet rate limiting
- **Environment Security** - Secure variable management

## Development Experience

### Developer Tools
- **Hot Reload** - Fast development iteration with Turbopack
- **TypeScript Integration** - Full type safety
- **Biome Configuration** - Code quality enforcement
- **Git Hooks** - Pre-commit validation

### Testing Infrastructure
- **Unit Testing** - Component and utility testing with Vitest
- **Integration Testing** - API route testing
- **E2E Testing** - Full user journey testing with Playwright
- **Performance Testing** - Load and speed testing

### Documentation
- **API Documentation** - Comprehensive API reference
- **Component Documentation** - Design system integration
- **Architecture Documentation** - System design overview
- **Deployment Guides** - Production deployment instructions

## Deployment Options

### Recommended: Vercel
- **Zero-config deployment** with automatic optimizations
- **Global CDN** for fast content delivery
- **Automatic SSL** certificates
- **Preview deployments** for testing
- **Edge Functions** for global performance

### Alternative: Docker
- **Self-hosted** deployment option
- **Container orchestration** support
- **Custom infrastructure** flexibility
- **Scaling capabilities** with Redis

### Static Export
- **Static site generation** for simple hosting
- **GitHub Pages** deployment
- **Netlify** integration
- **CDN optimization**

## Monitoring & Analytics

### Performance Monitoring
- **Core Web Vitals** tracking with @gabfon/analytics
- **Error tracking** with Sentry integration
- **User behavior** analytics
- **Performance budgets** enforcement

### Business Intelligence
- **User engagement** metrics
- **API usage** tracking
- **Service integration** metrics
- **Real-time analytics** dashboard

## Future Roadmap

### Advanced Features
- **Real-time Updates** - WebSocket integration
- **Progressive Web App** - Offline capabilities
- **AI Integration** - Enhanced @gabfon/ai package features
- **Advanced Analytics** - Custom tracking and insights

### Scalability
- **Micro-frontend Architecture** - Team scaling
- **Edge Functions** - Global performance
- **Database Optimization** - Query optimization
- **CDN Integration** - Asset delivery optimization

This overview provides a comprehensive understanding of the `site` application's capabilities, architecture, and integration within the `@gabfon` monorepo ecosystem.