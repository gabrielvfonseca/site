import type { MDXComponents } from 'mdx/types';

// biome-ignore lint/style/useNamingConvention: Next.js expects this exact name for MDX component mapping
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
