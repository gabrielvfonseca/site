import createMdx from '@next/mdx';

/**
 * The withMdx function for the mdx.
 * @returns The withMdx function.
 */
export const withMdx = createMdx({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
