---
description: "Development workflow for Next.js 16 with TypeScript, Tailwind CSS, and Sanity CMS"
---

# Development Workflow

## 1. Project Setup
- Use Bun as package manager
- Follow established file structure
- Configure environment variables in `@/config/env`
- Set up TypeScript strict mode
- Configure ESLint and Prettier

## 2. Component Development
- Create functional components with React hooks
- Use TypeScript interfaces for props
- Follow shadcn/ui patterns when available
- Implement proper error boundaries
- Include loading states and accessibility features

## 3. Styling Guidelines
- Use Tailwind CSS classes exclusively
- Follow mobile-first responsive design
- Implement dark mode with `next-themes`
- Use CSS variables for theme customization
- Avoid inline styles except for dynamic values

## 4. Data Management
- Use Next.js data fetching patterns
- Implement Sanity CMS integration
- Use GROQ queries with proper optimization
- Handle client state with React hooks
- Implement proper caching strategies

## 5. Code Quality
- Maintain TypeScript strict mode
- Use absolute imports with `@/` prefix
- Follow established naming conventions
- Write comprehensive tests
- Document complex logic

## 6. Performance Optimization
- Use Next.js Image component
- Implement code splitting
- Optimize bundle size
- Use React.memo for expensive components
- Implement proper caching

## Development Commands
```bash
bun install              # Install dependencies
bun run dev             # Start development server
bun run build           # Production build
bun run lint:fix        # Fix linting issues
bun run typecheck       # Type checking
bun run test            # Run tests
bun run test:coverage   # Coverage report
```

## File Organization
```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── config/          # Configuration files
├── lib/             # Utilities and helpers
└── sanity/          # CMS-related code
```

## Best Practices
- Test components alongside implementation
- Use semantic HTML5 elements
- Implement proper error handling
- Follow WCAG 2.1 AA guidelines
- Use Sentry for error tracking
- Optimize for Core Web Vitals
