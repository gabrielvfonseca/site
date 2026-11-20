import path from "node:path";

import { config, withAnalyzer } from "@gabfon/next-config";
import { withLogging, withSentry } from "@gabfon/observability/next-config";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

// Repo root (two levels up from apps/web). Used as the file-tracing root so the
// `standalone` build bundles hoisted workspace dependencies from the monorepo.
const monorepoRoot = path.join(import.meta.dirname, "../..");

let nextConfig: NextConfig = withLogging({
  ...config,
  // Self-contained server bundle for the Docker runtime image.
  // Not needed for Cloudflare Workers (vinext bundles into .cloudflare/);
  // only enabled for Docker deployments.
  ...(process.env.DOCKER_BUILD
    ? {
        output: "standalone" as const,
        outputFileTracingRoot: monorepoRoot,
      }
    : {}),
  // Allow the dev server to serve HMR/`_next` resources to other devices on
  // the local network (phone testing, hotspot). Private ranges only, and only
  // in development — the option is ignored by production builds.
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "172.20.*.*",
    "*.local",
  ],
  // The `opengraph-image`/`twitter-image` routes read bundled Geist TTFs at
  // runtime; ensure file tracing ships them with the serverless functions.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./apps/web/assets/fonts/*.ttf"],
    "/twitter-image": ["./apps/web/assets/fonts/*.ttf"],
    "/posts/[slug]/opengraph-image": ["./apps/web/assets/fonts/*.ttf"],
    "/projects/[slug]/opengraph-image": ["./apps/web/assets/fonts/*.ttf"],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // i18n handled via middleware (domain-based routing)
  // App Router doesn't support legacy i18n config
  transpilePackages: [
    "@gabfon/analytics",
    "@gabfon/next-config",
    "@gabfon/observability",
    "@gabfon/design-system",
    "@gabfon/rate-limit",
    "@gabfon/security",
    "@gabfon/seo",
    "@gabfon/spotify",
    "@gabfon/strava",
    "@gabfon/github",
    "@gabfon/email",
    "@gabfon/seo",
  ],
  experimental: {
    globalNotFound: true,
    prefetchInlining: true,
    // To enable file/function-level caching, set `cacheComponents: true` below.
    // This unlocks the `"use cache"` directive and PPR (Partial Prerendering).
    // Note: `cachedNavigations` also requires `cacheComponents` to take effect.
    inlineCss: true,
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Placeholder image host for the bio gallery (swap for your own photos).
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      // Additional common image hosts for better @unpic/react detection
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.imgix.net",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "media.graphcms.com",
      },
    ],
    // No custom `loader`/`loaderFile` here: keep the built-in optimizer for
    // `next dev` / `next build` / `next start`. Cloudflare Images optimization
    // on the vinext path is registered separately via `imagesOptimizer()` in
    // vite.config.ts and the IMAGES binding in cloudflare.config.ts (vinext
    // ignores `images.loader`; a `loaderFile` here was dead config there and
    // bypassed the built-in optimizer on the plain Next.js path for any host
    // not on the loader's supported-CDN list).
  },
  // Enable Cache Components + PPR for file/function-level caching via the
  // "use cache" directive. Requires Node.js runtime.
  // cacheComponents: true,
  devIndicators: false,
  // Production optimizations and security
  poweredByHeader: false,
  reactStrictMode: true,
});

if (process.env.SENTRY_DSN) {
  nextConfig = withSentry(nextConfig);
}

if (process.env.ANALYZE === "true") {
  nextConfig = withAnalyzer(nextConfig);
}

const withMdx = createMDX();

export default withMdx(nextConfig);
