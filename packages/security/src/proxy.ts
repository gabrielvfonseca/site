import { defaults, withVercelToolbar } from '@nosecone/next';
import { keys } from './keys';

export { createMiddleware as noseconeMiddleware } from '@nosecone/next';

// Nosecone security headers configuration
// https://docs.arcjet.com/nosecone/quick-start
export const noseconeOptions = {
  ...defaults,
  // Disable Cross-Origin-Embedder-Policy. The default `require-corp` blocks
  // cross-origin resources that don't send a CORP header, including the
  // OpenStreetMap tiles used by the /now map. This site doesn't rely on
  // cross-origin isolation (SharedArrayBuffer, etc.), so relaxing it is safe.
  crossOriginEmbedderPolicy: false as const,
  // Content Security Policy (CSP) configuration
  // In development, enable unsafe-eval for React's debugging features
  contentSecurityPolicy:
    keys().NODE_ENV === 'development'
      ? {
          directives: {
            ...defaults.contentSecurityPolicy?.directives,
            scriptSrc: [
              ...(defaults.contentSecurityPolicy?.directives?.scriptSrc ||
                (["'self'"] as const)),
              "'unsafe-eval'" as const, // Required for React development mode
              'https://va.vercel-scripts.com' as const, // Vercel Analytics script
              // Hash of the next-themes anti-flash inline script (no nonce is
              // applied to third-party inline scripts under the nonce-based CSP).
              // Production uses 'unsafe-inline' so this only matters in dev.
              "'sha256-E8EPi3ovz+EfxEviTr9UjHKYh5PnfxNoZOnJbyuXKOo='" as const,
            ] as const,
            connectSrc: [
              ...(defaults.contentSecurityPolicy?.directives?.connectSrc ||
                (["'self'"] as const)),
              'https://va.vercel-scripts.com' as const, // Vercel Analytics beacon
            ] as const,
            imgSrc: [
              ...(defaults.contentSecurityPolicy?.directives?.imgSrc ||
                (["'self'"] as const)),
              'data:' as const,
              'blob:' as const,
              'https://*.basemaps.cartocdn.com' as const, // CARTO map tiles on /now
            ] as const,
          },
        }
      : false,
};

/**
 * The nosecone options with the vercel toolbar.
 * @returns The nosecone options with the vercel toolbar.
 */
export const noseconeOptionsWithToolbar: ReturnType<typeof withVercelToolbar> =
  withVercelToolbar(noseconeOptions);
