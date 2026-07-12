import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

// React and Turbopack rely on `eval()` for hot reloading and debugging features
// in development, so `'unsafe-eval'` must be allowed there. It is intentionally
// omitted in production to keep the policy strict.
const isDevelopment = process.env.NODE_ENV === 'development';
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  'https://va.vercel-scripts.com',
  ...(isDevelopment ? ["'unsafe-eval'"] : []),
].join(' ');
const contentSecurityPolicy = `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://va.vercel-scripts.com; font-src 'self'; object-src 'none'; base-uri 'self';`;

export const config: NextConfig = {
  // Security headers for production
  // biome-ignore lint/suspicious/useAwait: required for Next.js config
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  // biome-ignore lint/suspicious/useAwait: rewrites is async
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export const withAnalyzer = (sourceConfig: NextConfig): NextConfig =>
  withBundleAnalyzer()(sourceConfig);
