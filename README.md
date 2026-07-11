# gabfon — Personal Website & Portfolio

[gabfon.com](https://gabfon.com) — the personal website and portfolio of [Gabriel Fonseca](https://github.com/gabrielvfonseca), a Lisbon-based software developer, founder, and Computer Engineering student.

## Monorepo Architecture

This is a Turborepo monorepo managed with **pnpm workspaces** and **Bun**.

```
site-main/
├── apps/
│   ├── web/          # Next.js 16 site — gabfon.com (Fumadocs MDX content)
│   └── cms/          # Keystatic CMS admin — cms.gabfon.com
├── packages/         # 16 shared @gabfon/* packages
│   ├── analytics/    # PostHog + Vercel Analytics
│   ├── database/     # Neon/PostgreSQL client
│   ├── design-system/# shadcn/ui + Radix UI components (~30)
│   ├── email/        # Contact notification templates
│   ├── github/       # GitHub API client
│   ├── next-config/  # Shared Next.js config presets
│   ├── observability/# Sentry + Logtail
│   ├── rate-limit/   # Upstash Redis / Vercel KV rate limiting
│   ├── security/     # Arcjet + Nosecone middleware
│   ├── seo/          # Metadata, viewport, JSON-LD helpers
│   ├── spotify/      # Spotify API client
│   ├── strava/       # Strava API client
│   ├── testing/      # Shared test setup (mocks)
│   ├── typescript-config/ # Shared tsconfig presets
│   ├── wakatime/     # WakaTime API client
│   └── x/            # X (Twitter) API client
├── docs/             # Project documentation
├── scripts/          # CLI scripts
└── skills/           # AI agent skill definitions
```

## Quick Start

```bash
# Prerequisites: Node.js >=18, Bun >=1.3
git clone https://github.com/gabriel-fonseca/site-main
cd site-main
bun install

# Start all dev servers (web on :3000, cms on :3001)
bun dev

# Or run a specific app
bun --filter site dev
bun --filter cms dev
```

## Commands

Run from root.

| Command | Purpose |
|---------|---------|
| `bun dev` | Start all dev servers (Turborepo) |
| `bun build` | Build all apps + packages |
| `bun test` | Run all tests |
| `bun test:coverage` | With coverage report |
| `bun typecheck` | TypeScript validation |
| `bun lint` | Biome check via ultracite |
| `bun format` | Biome auto-fix |
| `bun clean` | Clean all caches and dependencies |
| `bun changeset` | Create a changeset |
| `bun security:scan` | Security audit |

## Apps

| App | Domain | Description | README |
|-----|--------|-------------|--------|
| **web** (`@gabfon/site`) | [gabfon.com](https://gabfon.com) | Main website — blog, projects, portfolio | [`apps/web/README.md`](apps/web/README.md) |
| **cms** (`@gabfon/cms`) | [cms.gabfon.com](https://cms.gabfon.com) | Keystatic CMS for editing MDX content | [`apps/cms/README.md`](apps/cms/README.md) |

## Content

All content is file-based MDX at `apps/web/content/` — no database. Fumadocs compiles it at build time.

- **30 posts** in `apps/web/content/posts/`
- **7 projects** in `apps/web/content/projects/`
- **Editing**: via the Keystatic CMS at `apps/cms/` (local dev) or `cms.gabfon.com` (production with GitHub OAuth)

## Tech Stack

| Layer | Stack |
|-------|-------|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5.9 (strict) |
| Styling | Tailwind CSS v4 + OKLCH color tokens |
| UI | shadcn/ui + Radix UI + @base-ui/react |
| Content | Fumadocs MDX |
| Monorepo | Turborepo 2.9 + pnpm + Bun |
| Linting | Biome 2.2 via ultracite |
| Testing | Vitest + Testing Library, Playwright |
| Security | Arcjet + Nosecone + Gitleaks + Snyk |
| Observability | Sentry + PostHog + Logtail + Vercel Analytics |
| Deployment | Vercel |

## Deployment

Both apps are deployed to Vercel:

- **web** (`gabfon.com`): Edge network, standalone output, Sentry error tracking
- **cms** (`cms.gabfon.com`): Standalone output, GitHub OAuth for content commits

## License

MIT — see [LICENSE](LICENSE.md).
