import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@gabfon/analytics': path.resolve(
        __dirname,
        '../../packages/analytics/src'
      ),
      '@gabfon/cache': path.resolve(__dirname, '../../packages/cache/src'),
      '@gabfon/database': path.resolve(
        __dirname,
        '../../packages/database/src'
      ),
      '@gabfon/design-system': path.resolve(
        __dirname,
        '../../packages/design-system/src'
      ),
      '@gabfon/mdx': path.resolve(__dirname, '../../packages/mdx/src'),
      '@gabfon/next-config': path.resolve(
        __dirname,
        '../../internals/next-config/src'
      ),
      '@gabfon/observability': path.resolve(
        __dirname,
        '../../packages/observability/src'
      ),
      '@gabfon/rate-limit': path.resolve(
        __dirname,
        '../../packages/rate-limit/src'
      ),
      '@gabfon/security': path.resolve(
        __dirname,
        '../../packages/security/src'
      ),
      '@gabfon/seo': path.resolve(__dirname, '../../packages/seo/src'),
      '@gabfon/testing': path.resolve(__dirname, '../../packages/testing'),
      '@gabfon/typescript-config': path.resolve(
        __dirname,
        '../../internals/typescript-config'
      ),
    },
  },
});
