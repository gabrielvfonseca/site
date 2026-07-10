import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config, withAnalyzer } from '@gabfon/next-config';
import { withLogging, withSentry } from '@gabfon/observability/next-config';
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';
import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

// Repo root (two levels up from apps/web). Used as the file-tracing root so the
// `standalone` build bundles hoisted workspace dependencies from the monorepo.
const monorepoRoot = join(dirname(fileURLToPath(import.meta.url)), '../..');

const withToolbar = (cfg: object) =>
  process.env.FLAGS_SECRET ? withVercelToolbar()(cfg) : cfg;

let nextConfig: NextConfig = withToolbar(
  withLogging({
    ...config,
    // Self-contained server bundle for the Docker runtime image.
    output: 'standalone',
    outputFileTracingRoot: monorepoRoot,
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    transpilePackages: [
      '@gabfon/analytics',
      '@gabfon/next-config',
      '@gabfon/observability',
      '@gabfon/design-system',
      '@gabfon/rate-limit',
      '@gabfon/security',
      '@gabfon/spotify',
      '@gabfon/strava',
      '@gabfon/github',
      '@gabfon/email',
      '@gabfon/seo',
    ],
    experimental: {
      globalNotFound: true,
      prefetchInlining: true,
      cachedNavigations: true,
      appNewScrollHandler: true,
      inlineCss: true,
      turbopackFileSystemCacheForDev: true,
    },
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        // Placeholder image host for the bio gallery (swap for your own photos).
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
        {
          protocol: 'https',
          hostname: 'fastly.picsum.photos',
        },
      ],
    },
    cacheComponents: true,
    devIndicators: false,
    // Production optimizations and security
    poweredByHeader: false,
    reactStrictMode: true,
  })
);

if (process.env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (process.env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

const withMdx = createMDX();

export default withMdx(nextConfig);
