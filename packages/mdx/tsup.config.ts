import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    remote: 'src/remote.ts',
    serialize: 'src/serialize.ts',
    components: 'src/components.tsx',
    'next-config': 'src/next-config.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'next',
    'sugar-high',
    '@next/mdx',
    'remark-gfm',
    'remark-sugar-high',
    '@gabfon/design-system',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
