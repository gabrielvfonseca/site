import { defineCollections, defineConfig } from 'fumadocs-mdx/config';
import { postSchema } from '@/models/post';
import { projectSchema } from '@/models/project';

export const posts = defineCollections({
  type: 'doc',
  dir: 'content/posts',
  schema: postSchema,
});

export const projects = defineCollections({
  type: 'doc',
  dir: 'content/projects',
  schema: projectSchema,
});

export default defineConfig({
  mdxOptions: {
    // Dual-theme syntax highlighting via Shiki. The prose CSS swaps to the
    // dark palette under `.dark` using the emitted `--shiki-dark` variables.
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // Render unknown/fictional fence languages (e.g. `gala`) as plain text
      // instead of throwing a ShikiError that breaks the whole page.
      fallbackLanguage: 'text',
    },
  },
});
