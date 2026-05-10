import { config, withAnalyzer } from '@gabfon/next-config';
import { withLogging, withSentry } from '@gabfon/observability/next-config';
import { withVercelToolbar } from '@vercel/toolbar/plugins/next';
import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withToolbar = (cfg: object) =>
  process.env.FLAGS_SECRET ? withVercelToolbar()(cfg) : cfg;

let nextConfig: NextConfig = withToolbar(
  withLogging({
    ...config,
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    transpilePackages: [
      '@gabfon/ai',
      '@gabfon/analytics',
      '@gabfon/next-config',
      '@gabfon/observability',
      '@gabfon/design-system',
      '@gabfon/rate-limit',
      '@gabfon/cache',
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
