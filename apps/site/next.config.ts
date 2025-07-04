import createMdx from '@next/mdx';
import { withAnalyzer } from '@repo/next-config';
import { withLogging, withSentry } from '@repo/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withLogging({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: [
    '@repo/analytics',
    '@repo/next-config',
    '@repo/observability',
    '@repo/design-system',
    '@repo/rate-limit',
    '@repo/security',
    '@repo/seo',
  ],
});

if (process.env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (process.env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

const withMdx = createMdx({
  // Add markdown plugins here, as desired
});

export default withMdx(nextConfig);
