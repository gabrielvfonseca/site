import { env } from '@/env';
import createMdx from '@next/mdx';
import { withAnalyzer } from '@repo/next-config';
import { withLogging, withSentry } from '@repo/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withLogging({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
});

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

const withMdx = createMdx({
  // Add markdown plugins here, as desired
});

export default withMdx(nextConfig);
