# cms — Keystatic CMS Admin

Keystatic-powered headless CMS for [gabfon.com](https://gabfon.com). Edits and creates MDX content files that feed the Fumadocs-based site at `apps/web`.

## Architecture

- **Next.js 16.2.1** (App Router) with React 19
- **Keystatic** (`@keystatic/core`) for the admin UI and content editing
- Directly edits `.mdx` files in `apps/web/content/posts/` and `apps/web/content/projects/`
- Fumadocs recompiles the MDX at build time — no database involved

### Collections

| Collection | Path | Entries | Schema |
|-----------|------|---------|--------|
| Posts | `apps/web/content/posts/*` | 30 | title, description, date, author, content (MDX) |
| Projects | `apps/web/content/projects/*` | 7 | title, description, date, link, content (MDX) |

## Storage

Two modes, controlled by environment variables:

| Mode | Trigger | Behavior |
|------|---------|----------|
| **Local** | `KEYSTATIC_GITHUB_CLIENT_ID` unset (default dev) | Edits files directly on disk |
| **GitHub** | `KEYSTATIC_GITHUB_CLIENT_ID` set (production) | Creates PRs via OAuth |

In local mode, files are resolved relative to the monorepo root via `localBaseDirectory` in the API route handler.

## Routes

| Path | Handler |
|------|---------|
| `/` | Redirects to `/keystatic` |
| `/keystatic/[[...params]]` | Keystatic admin UI (`makePage`) |
| `/api/keystatic/[...params]` | Keystatic API (tree, blob, update) |

## Development

```bash
# From repo root
bun --filter cms dev          # starts on port 3001
bun --filter cms build        # production build
bun --filter cms typecheck    # TypeScript check
```

## Deployment

Deployed to Vercel at `cms.gabfon.com` with `vercel.json` config. The production build outputs to `standalone` mode.

### Required env vars (production)

| Variable | Purpose |
|----------|---------|
| `KEYSTATIC_GITHUB_CLIENT_ID` | GitHub OAuth app ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | GitHub OAuth app secret |
| `KEYSTATIC_SECRET` | Session encryption key |

## Key Files

| File | Purpose |
|------|---------|
| `src/keystatic.config.ts` | Collection definitions and storage config |
| `src/app/api/keystatic/[...params]/route.ts` | API route handler with `localBaseDirectory` |
| `src/app/keystatic/[[...params]]/page.tsx` | Keystatic admin UI page |
