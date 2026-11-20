# Deployment Guide

This guide covers deploying the `web` application to Cloudflare Workers via vinext.

## Overview

The **web** app (`gabfon.com`) is a Next.js 16 (App Router) application deployed to Cloudflare Workers using [vinext](https://vinext.dev) — Next.js on the Workers runtime with R2/Assets support.

## Prerequisites

- [Bun](https://bun.sh) (package manager)
- [Node.js ≥ 22.18](https://nodejs.org) (config loading, build)
- A Cloudflare account with API token (Worker Scripts: Edit, Routes: Edit, R2: Read/Write)

## Cloudflare Workers Deployment (vinext)

### Build

```bash
# From the web app directory
cd apps/web
npx cf build
```

This produces the worker bundle and assets under `.cloudflare/output/v1/workers/default/`.

### Deploy

The site is deployed to Cloudflare via the Cloudflare Upload Worker API (asset session + JWT-authorized bucket uploads + multipart worker upload + zone-scoped routes).

The worker is configured in `cloudflare.config.ts` at the repository root:

- Worker name: `site`
- Compatibility date: `2026-11-18`
- Routes: `gabfon.com/*` and `*.gabfon.com/*`

### Environment Variables

Configure via the Cloudflare dashboard or `wrangler secret put`:

```bash
# Required (production)
DB (D1 binding)       # site-db D1 database (declared in cloudflare.config.ts)
EMAIL_ACCOUNT_ID      # Cloudflare account ID (Email Sending API)
EMAIL_API_TOKEN       # Cloudflare API token with "Email Sending – Send"
EMAIL_FROM            # Verified sender address
ARCJET_KEY            # Arcjet security

# Optional
SENTRY_DSN            # Error tracking
POSTHOG_KEY           # Analytics
LOGTAIL_TOKEN         # Log forwarding
```

`NEXT_PUBLIC_*` variables are inlined at build time and must be present in the environment at build time.

### Domain Configuration

The `gabfon.com` zone is configured in Cloudflare. DNS is served via Cloudflare nameservers (`etta.ns.cloudflare.com` / `troy.ns.cloudflare.com`).

## Auxiliary Worker: Response Store

Opt-in via `RESPONSE_STORE=1` at build time. When enabled, an auxiliary worker (`site-response-store`) with R2 storage caches HTTP response bodies.

### R2 Setup

1. Enable R2 in the Cloudflare dashboard
2. Create bucket `site-response-store-cache-bodies`
3. Rebuild with `RESPONSE_STORE=1` and redeploy

## D1 Database

The application uses Cloudflare D1 for the AMA (Ask Me Anything) feature:

```bash
# Create the database
bun x wrangler@4.163.0 d1 create site-db

# Apply migrations
bun x wrangler@4.163.0 d1 migrate site-db
```

Migrations live in `packages/database/drizzle/` and are generated with drizzle-kit.

## Docker Deployment (alternative)

```bash
# Build Docker image
docker build -t gabfon-web .

# Tag for registry
docker tag gabfon-web your-registry/gabfon-web:latest
```

## Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
rm -rf .cloudflare dist
bun install
npx cf build
```

### Worker Not Found

Verify the worker is deployed:

```bash
curl https://gabfon.com
```

If the zone is in `pending` status, DNS is not yet served. Switch the domain's nameservers to Cloudflare's nameservers.

### D1 Connection Issues

Ensure the D1 binding is declared in `cloudflare.config.ts`:

```typescript
env: {
  DB: { type: "d1", name: "site-db" },
}
```

And that the database exists and migrations have been applied.
