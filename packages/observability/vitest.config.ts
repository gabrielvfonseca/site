import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['../../packages/testing/src/setup.ts'],
    include: ['**/test/**', '**/*.test.ts', '**/*.test.tsx'],
    exclude: ['node_modules', 'dist', '.next', 'coverage'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@gabfon/testing': path.resolve(__dirname, '../../packages/testing/src'),
    },
  },
});
