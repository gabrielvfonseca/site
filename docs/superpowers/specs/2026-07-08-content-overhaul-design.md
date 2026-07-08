# Content Overhaul: Posts & Projects — Design

**Date:** 2026-07-08
**Goal:** Replace placeholder/AI-filler content in `apps/web/content/` with content grounded in real work, written in Gabriel's voice.

## Voice

Drawn from the homepage bio: first-person, direct, specific, lightly opinionated. Short declarative sentences. Confident. No listicle padding, no "in today's fast-paced world" openers, no hedging-heavy filler.

## Constraints (hard)

- **No invented Frontal specifics** — features, users, metrics, or dates. Work only from the public bio framing: "AI-powered platform to streamline business operations and decision-making," founder & CEO, actively building.
- **No fabricated anecdotes** — the bad-code post stays grounded in general reasoning, not fake "at Frontal we…" war stories.
- Frontmatter stays within schema:
  - Projects: `title, description, date, link?` (`link` must be a valid URL)
  - Posts: `title, description, date, author?`

## Projects (`apps/web/content/projects/`)

| File | Action |
|---|---|
| `awesome-project.mdx` | **Delete** — pure placeholder. |
| `my-site.mdx` | **Rewrite → `frontal.mdx`** — flagship project page. High-level, confident, `link: https://frontal.dev`. No invented specifics. |

Result: one real project (Frontal); placeholders gone.

## Posts (`apps/web/content/posts/`)

| File | Action |
|---|---|
| `website-journey.mdx` | **Rewrite → "How I built this site"** — real technical post grounded in the repo: Next.js 16 monorepo, custom `packages/seo` + `packages/security`, AI chat trained on the bio, live Spotify/Strava/GitHub stats, `llms.txt`. Concrete decisions replace vague "future plans." |
| `cost-of-bad-code.mdx` | **Rewrite** — shorter, opinionated, in-voice. Drop the padded 6-section structure. |
| `building-frontal.mdx` | **New** — build-in-public "why I'm building Frontal." High-level from bio framing, confident, actively-building. |

## Dates (refreshed spread)

- `frontal.mdx` — 2026-06-10
- `building-frontal.mdx` — 2026-06-18
- `website-journey.mdx` (site post) — 2026-07-02
- `cost-of-bad-code.mdx` — 2026-05-20 (kept)

## Out of scope

- No changes to page components, loaders, or schemas.
- No new projects beyond Frontal.
