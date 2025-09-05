import { withMdx } from '@gabfon/mdx';
import { withAnalyzer } from '@gabfon/next-config';
import { withLogging, withSentry } from '@gabfon/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withLogging({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: [
    '@gabfon/analytics',
    '@gabfon/next-config',
    '@gabfon/observability',
    '@gabfon/design-system',
    '@gabfon/database',
    '@gabfon/rate-limit',
    '@gabfon/security',
    '@gabfon/seo',
    '@gabfon/mdx',
  ],
});

if (process.env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (process.env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default withMdx(nextConfig);
