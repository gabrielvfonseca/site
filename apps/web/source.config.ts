import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers';
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
    // Dual-theme syntax highlighting via Shiki. `vesper` (by Rauno Freiberg,
    // Vercel) gives the dark palette its Geist/Vercel-style look — muted grays
    // for keywords, warm peach for functions/types, mint for strings — paired
    // with the elegant, restrained `vitesse-light` for light mode. The prose
    // CSS swaps to the dark palette under `.dark` via the emitted
    // `--shiki-dark` variables.
    rehypeCodeOptions: {
      themes: {
        light: 'vitesse-light',
        dark: 'vesper',
      },
      // Render unknown/fictional fence languages (e.g. `gala`) as plain text
      // instead of throwing a ShikiError that breaks the whole page.
      fallbackLanguage: 'text',
      // Code-fence meta features: `{1,3-5}` line ranges and inline
      // `// [!code highlight]`, `// [!code ++]/[!code --]`, `// [!code focus]`.
      transformers: [
        transformerMetaHighlight(),
        transformerNotationHighlight(),
        transformerNotationDiff(),
        transformerNotationFocus(),
      ],
    },
  },
});
