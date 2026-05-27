import { defaults, withVercelToolbar } from '@nosecone/next';

export { createMiddleware as noseconeMiddleware } from '@nosecone/next';

// Nosecone security headers configuration
// https://docs.arcjet.com/nosecone/quick-start
export const noseconeOptions = {
  ...defaults,
  contentSecurityPolicy: true,
};

/**
 * The nosecone options with the vercel toolbar.
 * @returns The nosecone options with the vercel toolbar.
 */
export const noseconeOptionsWithToolbar: ReturnType<typeof withVercelToolbar> =
  withVercelToolbar(noseconeOptions);
