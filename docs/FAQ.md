# frequently asked questions

Find answers to common questions about the project.

## General Questions

### What is this project?

This is a modern monorepo application built with Next.js 15, TypeScript, Tailwind CSS 4, and Fumadocs MDX for content management. It uses Turbo for monorepo management and includes various utility packages for analytics, observability, security, and more.

### What technologies are used?

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Fumadocs MDX** - Content management
- **Turbo** - Monorepo management
- **pnpm** - Package manager
- **Biome** - Linting and formatting

### How do I get started?

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Copy `.env.example` to `.env.local`
4. Run `pnpm dev`

See the [Getting Started guide](./getting-started.md) for detailed instructions.

## Development Questions

### How do I add a new package?

1. Create directory in `packages/`
2. Add to `pnpm-workspace.yaml`
3. Update `package.json` with workspace dependencies
4. Follow package structure conventions

### How do I run tests?

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm test --filter=@gabfon/package-name

# Run tests in watch mode
pnpm test --watch
```

### How do I add new content?

Content is managed through Fumadocs MDX:

1. **Documentation**: Add `.mdx` files to `content/docs/`
2. **Blog**: Add `.mdx` files to `content/blog/`
3. Use frontmatter for metadata

Example:

```mdx
---
title: "Your Title"
description: "Content description"
published: true
---

# Your Content

Write your MDX content here.
```

### How do I debug issues?

1. Check browser console for errors
2. Review network requests in DevTools
3. Check server logs: `pnpm dev` logs
4. Use VS Code debugger with launch configuration
5. Check environment variables

## Deployment Questions

### How do I deploy to Vercel?

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Push to main branch (auto-deploy)

See the [Deployment Guide](./deployment.md) for detailed instructions.

### How do I deploy with Docker?

```bash
# Build image
docker build -t your-app .

# Run with Docker Compose
docker-compose up -d
```

### What environment variables are needed?

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Authentication secret

Optional:
- `SENTRY_DSN` - Error tracking
- `POSTHOG_KEY` - Analytics
- `ANALYZE` - Bundle analysis

## Package-Specific Questions

### @gabfon/mdx

**How do I access content?**

```typescript
import { docs, blog } from '@gabfon/mdx';

const allDocs = await docs.getPages();
const allBlog = await blog.getPages();
```

**How do I add custom MDX components?**

```typescript
import { useMDXComponents } from '@gabfon/mdx';

const { components } = useMDXComponents();
// Use components in your MDX files
```

### @gabfon/ui

**How do I customize styling?**

The design system uses Tailwind CSS classes. You can:

1. Use existing variants and sizes
2. Extend with custom classes
3. Override CSS variables

**How do I add new components?**

Follow the established patterns:
1. Create component directory with `Component.tsx`
2. Add `Component.test.tsx` for tests
3. Add `Component.stories.tsx` for Storybook
4. Export from `index.ts`

### @gabfon/analytics

**How do I track custom events?**

```typescript
import { trackEvent } from '@gabfon/analytics';

trackEvent('custom_action', {
  property: 'value'
});
```

**How do I disable analytics?**

Remove environment variables:
- `POSTHOG_KEY`
- `VERCEL_ANALYTICS_ID`

## Troubleshooting

### Build fails with TypeScript errors

1. Check TypeScript version: `node --version`
2. Clear cache: `rm -rf .next`
3. Reinstall dependencies: `pnpm install`
4. Check for conflicting types

### Development server won't start

1. Check port 3000 is available
2. Verify environment variables
3. Check for syntax errors in configuration
4. Review logs for specific error messages

### Tests are failing

1. Update snapshots: `pnpm test --update-snapshots`
2. Check test environment setup
3. Verify test dependencies are mocked
4. Run tests individually: `pnpm test --testNamePattern="specific test"`

### Styles not applying

1. Verify Tailwind CSS is processing
2. Check CSS imports in components
3. Review class names in HTML output
4. Check for CSS specificity issues

### Performance issues

1. Enable bundle analysis: `ANALYZE=true pnpm build`
2. Check for large dependencies
3. Review code splitting
4. Optimize images and assets

## Content Questions

### How do I add images to MDX?

```mdx
import Image from './image.jpg';

# Use in content
![Alt text]({src: Image})
```

### How do I organize content?

```
content/
├── docs/
│   ├── getting-started/
│   ├── api/
│   └── ...
└── blog/
    ├── 2024/
    ├── 2025/
    └── index.mdx
```

### How do I add metadata?

Use frontmatter in your MDX files:

```mdx
---
title: "Page Title"
description: "SEO description"
published: true
date: "2025-03-23"
author: "Author Name"
tags: ["tag1", "tag2"]
---

Content here...
```

## Contributing Questions

### How do I report a bug?

1. Check existing issues first
2. Use bug report template
3. Include:
   - Environment details
   - Steps to reproduce
   - Expected vs actual behavior
   - Error messages

### How do I request a feature?

1. Check existing issues and discussions
2. Use feature request template
3. Include:
   - Problem statement
   - Proposed solution
   - Use cases
   - Implementation considerations

### How do I contribute to documentation?

1. Fork the repository
2. Create feature branch
3. Update documentation files
4. Test documentation examples
5. Submit pull request

See the [Contributing Guide](./contributing.md) for detailed process.

## Technical Questions

### What's the monorepo structure?

```
site/
├── apps/           # Applications
├── packages/        # Shared packages
├── content/         # MDX content
├── docs/           # Project documentation
├── scripts/         # Utility scripts
└── migrations/      # Database migrations
```

### How does Turbo work?

Turbo provides:
- **Task orchestration** - Run tasks across packages
- **Intelligent caching** - Skip unchanged work
- **Parallel execution** - Build multiple packages simultaneously
- **Dependency graphs** - Build in correct order

### How is TypeScript configured?

Shared configuration in `internals/typescript-config/`:
- Strict mode enabled
- Path aliases configured
- Modern compiler options
- Consistent across all packages

## Still Have Questions?

If you don't find your question here:

1. **Check the documentation**: Review other guides in `/docs/`
2. **Search issues**: Look for similar questions
3. **Start a discussion**: Ask the community
4. **Contact maintainers**: Reach out directly

---

*This FAQ is updated regularly. Last updated: 2025-03-23*
