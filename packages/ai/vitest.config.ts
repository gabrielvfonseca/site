import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./node_modules/@gabfon/testing/src/setup.ts'],
    include: ['**/test/**', '**/*.test.ts', '**/*.test.tsx'],
    exclude: ['node_modules', 'dist', '.next', 'coverage'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        pretendToBeVisual: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@gabfon/testing': resolve(__dirname, '../../packages/testing/src'),
    },
  },
});
