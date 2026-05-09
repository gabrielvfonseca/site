import { defaults, withVercelToolbar } from '@nosecone/next';
import { keys } from './keys';

export { createMiddleware as noseconeMiddleware } from '@nosecone/next';

// Nosecone security headers configuration
// https://docs.arcjet.com/nosecone/quick-start
export const noseconeOptions = {
  ...defaults,
  // Content Security Policy (CSP) configuration
  // In development, enable unsafe-eval for React's debugging features
  contentSecurityPolicy: keys().NODE_ENV === 'development' ? {
    directives: {
      ...defaults.contentSecurityPolicy?.directives,
      scriptSrc: [
        ...(defaults.contentSecurityPolicy?.directives?.scriptSrc || ["'self'"] as const),
        "'unsafe-eval'" as const, // Required for React development mode
      ] as const,
    },
  } : false,
};

/**
 * The nosecone options with the vercel toolbar.
 * @returns The nosecone options with the vercel toolbar.
 */
export const noseconeOptionsWithToolbar: ReturnType<typeof withVercelToolbar> =
  withVercelToolbar(noseconeOptions);
