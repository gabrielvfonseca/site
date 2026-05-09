import { defineConfig } from 'vitest/config';
import { testingConfig } from '@gabfon/testing';
import path from 'node:path';

export default defineConfig({
  ...testingConfig,
  test: {
    ...testingConfig.test,
    setupFiles: ['./node_modules/@gabfon/testing/src/setup.ts'],
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
