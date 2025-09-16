import createMdx from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkSugarHigh from 'remark-sugar-high';

/**
 * The withMdx function for the mdx.
 * @returns The withMdx function.
 */
export const withMdx = createMdx({
  options: {
    remarkPlugins: [remarkGfm, remarkSugarHigh],
    rehypePlugins: [],
  },
});
