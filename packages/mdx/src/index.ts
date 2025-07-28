import createMdx from '@next/mdx';

export const withMdx = createMdx({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
