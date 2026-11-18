# Site

[gabfon.com](https://gabfon.com) — the personal website and portfolio of [Gabriel Fonseca](https://github.com/gabrielvfonseca), a Lisbon-based software developer, founder, and Computer Engineering student.

## Monorepo Architecture

This is a Turborepo monorepo managed with **Bun workspaces**.

```
site/
├── apps/
│   ├── web/          # Next.js 16 site — gabfon.com (Fumadocs MDX content)
│   └── cms/          # Keystatic CMS admin — cms.gabfon.com
├── packages/         # 17 shared @gabfon/* packages
│   ├── analytics/    # PostHog + Vercel Analytics
│   ├── database/     # Neon/PostgreSQL client
│   ├── design-system/# shadcn/ui + Radix UI components
│   ├── email/        # Contact notification templates
│   ├── github/       # GitHub API client
│   ├── next-config/  # Shared Next.js config presets
│   ├── observability/# Sentry + Logtail
│   ├── rate-limit/   # Upstash Redis / Vercel KV rate limiting
│   ├── security/     # Arcjet + Nosecone middleware
│   ├── seo/          # Metadata, viewport, JSON-LD helpers
│   ├── spotify/      # Spotify API client
│   ├── strava/       # Strava API client
│   ├── supabase/     # Supabase client and environment validation
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
git clone https://github.com/gabrielvfonseca/site
cd site
bun install

# Start all dev servers (web on :3000, cms on :3001)
bun dev

# Or run a specific app
bun run --filter site dev
bun run --filter cms dev
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
| `bun lint` | Lint check via ultracite |
| `bun format` | Biome auto-fix via ultracite |
| `bun clean` | Clean all caches and dependencies |
| `bun changeset` | Create a changeset |

## Apps

| App | Domain | Description | README |
|-----|--------|-------------|--------|
| **web** (`site`) | [gabfon.com](https://gabfon.com) | Main website — blog, projects, portfolio | [`apps/web/README.md`](apps/web/README.md) |
| **cms** (`cms`) | [cms.gabfon.com](https://cms.gabfon.com) | Keystatic CMS for editing MDX content | [`apps/cms/README.md`](apps/cms/README.md) |

## Content

All content is file-based MDX at `apps/web/content/` — no database. Fumadocs compiles it at build time.

- **Posts** in `apps/web/content/posts/`
- **Projects** in `apps/web/content/projects/`
- **Editing**: via the Keystatic CMS at `apps/cms/` (local dev) or `cms.gabfon.com` (production with GitHub OAuth)

## Tech Stack

| Layer | Stack |
|-------|-------|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5.9 (strict) |
| Styling | Tailwind CSS v4 + OKLCH color tokens |
| UI | shadcn/ui + Radix UI + @base-ui/react |
| Content | Fumadocs MDX |
| Monorepo | Turborepo + Bun workspaces |
| Linting | Biome via ultracite |
| Testing | Vitest + Testing Library, Playwright |
| Security | Arcjet + Nosecone + Gitleaks |
| Observability | Sentry + PostHog + Logtail + Vercel Analytics |
| Deployment | Vercel |

## Deployment

Both apps are deployed to Vercel:

- **web** (`gabfon.com`): Edge network, standalone output, Sentry error tracking
- **cms** (`cms.gabfon.com`): Standalone output, GitHub OAuth for content commits

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow and [SECURITY.md](SECURITY.md) for the security policy. Issue templates live in [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/).

## License

MIT — see [LICENSE](LICENSE.md).
