import {
  defaults,
  type NoseconeOptions,
  withVercelToolbar,
} from '@nosecone/next';

export { createMiddleware as noseconeMiddleware } from '@nosecone/next';

// Nosecone security headers configuration
// https://docs.arcjet.com/nosecone/quick-start
export const noseconeOptions: NoseconeOptions = {
  ...defaults,
  // Content Security Policy (CSP) is disabled by default because the values
  // depend on which Next Forge features are enabled. See
  // https://docs.next-forge.com/features/security/headers for guidance on how
  // to configure it.
  contentSecurityPolicy: false,
};

/**
 * The nosecone options with the vercel toolbar.
 * @returns The nosecone options with the vercel toolbar.
 */
export const noseconeOptionsWithToolbar: NoseconeOptions =
  withVercelToolbar(noseconeOptions);
