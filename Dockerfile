# syntax=docker/dockerfile:1

# Multi-stage build for the `site` Next.js app (apps/web) in the pnpm/Bun
# Turborepo monorepo. Produces a small runner image from Next's `standalone`
# output. Build:
#   docker build -t gabfon-site .
# or via Compose (recommended, wires the local Postgres/Redis proxies):
#   docker compose up --build

# ---- Base: Node runtime + Bun (the repo's package manager) ------------------
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g bun@1.3.3
WORKDIR /app

# ---- Dependencies -----------------------------------------------------------
# Copy the whole workspace so Bun can resolve every `@gabfon/*` package. The
# lockfile keeps installs deterministic.
FROM base AS deps
COPY . .
RUN bun install --frozen-lockfile

# ---- Builder ----------------------------------------------------------------
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# NEXT_PUBLIC_* vars are inlined at build time, so the public web URL must be
# provided as a build argument (defaults to localhost for local images).
ARG NEXT_PUBLIC_WEB_URL=http://localhost:3000
ENV NEXT_PUBLIC_WEB_URL=${NEXT_PUBLIC_WEB_URL}

COPY --from=deps /app ./

# Build only the web app (Turbo builds its workspace deps first). Package env
# validation is skipped here (see each `keys()` factory) so the image builds
# without secrets; server-side env is provided at runtime.
RUN bun run --filter site build

# ---- Runner: minimal standalone server --------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Standalone server + traced node_modules (file-tracing root is the repo root,
# so the layout is mirrored under apps/web/).
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# server.js lives at apps/web/server.js inside the standalone output.
CMD ["node", "apps/web/server.js"]
