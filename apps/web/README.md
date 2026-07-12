# web — gabfon.com

The main website of Gabriel Fonseca — home page, blog, projects, bio, contact form, and /now page. Built with Next.js 16 App Router and Fumadocs MDX content.

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage (about, activity graph, projects, posts) |
| `/bio` | Bio page |
| `/contact` | Contact form |
| `/posts` | Blog listing (30 posts) |
| `/posts/[slug]` | Individual blog post |
| `/projects` | Projects listing (7 projects) |
| `/projects/[slug]` | Project case study |
| `/ama` | Ask Me Anything |
| `/now` | Now page (live activity) |

### API Routes

| Path | Description |
|------|-------------|
| `/api/activity` | GitHub/Spotify/Strava contribution data |
| `/api/ama` | AMA questions (read/write) |
| `/api/now` | Now page live data |

## Content

All content is file-based MDX at `apps/web/content/`. Fumadocs compiles it at build time via `source.config.ts`.

| Collection | Path | Files |
|------------|------|-------|
| Posts | `content/posts/*` | 30 `.mdx` files |
| Projects | `content/projects/*` | 7 `.mdx` files |

Content is edited through the **Keystatic CMS** at [`apps/cms/`](../cms/README.md) (local dev) or [`cms.gabfon.com`](https://cms.gabfon.com) (production).

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next@16`, `react@19` | Framework |
| `fumadocs-mdx`, `fumadocs-core` | MDX content compilation |
| `tailwindcss@4` | Styling |
| `@tanstack/react-query` | Client data fetching |
| `@base-ui/react`, `@radix-ui/*` | Headless UI primitives |
| `@gabfon/design-system` | Shared UI components (~30) |
| `@gabfon/*` packages | External integrations (GitHub, Spotify, Strava, analytics, security) |
| `@sentry/nextjs` | Error tracking |
| `@arcjet/next` | API protection |
| `zod` | Runtime validation |
| `shiki` | Syntax highlighting |
| `motion` | Animations |

## Development

```bash
# From repo root
bun --filter site dev        # starts on :3000
bun --filter site build      # production build
bun --filter site test        # vitest run (unit + integration)
bun --filter site test:e2e    # playwright
bun --filter site typecheck   # TypeScript check
bun --filter site analyze     # bundle analysis
```

### Environment

All env vars are validated at startup via `@t3-oss/env-nextjs` + Zod in `src/config/env.ts`. Required vars include `DATABASE_URL`, `ARCJET_KEY`, `SENTRY_*`, PostHog keys, and various API secrets for external integrations.

See the [CLAUDE.md](../../CLAUDE.md) for the full environment variable reference.

## Architecture

- **Server Components by default** — only `'use client'` where interactivity is needed
- **Composition pattern**: data-fetching parent (`Posts`, `Projects`) → rendering child (`PostsList`, `ProjectsList`)
- **Workspace package isolation**: every external integration is a standalone `@gabfon/*` package with its own env keys
- **Security middleware chain**: Rate Limiter → Nosecone → Arcjet

## Testing

| Type | Framework | Location |
|------|-----------|----------|
| Unit | Vitest + Testing Library | `src/**/*.test.*`, `tests/unit/` |
| Integration | Vitest | `tests/integration/` |
| E2E | Playwright | `tests/e2e/` |
| Load | k6 | `tests/load/` |

## Documentation

More detailed docs are available in [`apps/web/docs/`](./docs/):

- [Overview](./docs/OVERVIEW.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Deployment](./docs/DEPLOYMENT.md)
- [Testing](./docs/TESTING.md)
