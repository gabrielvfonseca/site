import { config, withAnalyzer } from '@gabfon/next-config';
import { withLogging, withSentry } from '@gabfon/observability/next-config';
import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withLogging({
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
  },
  // Production optimizations and security
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
});

if (process.env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (process.env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

const withMdx = createMDX();

export default withMdx(nextConfig);
