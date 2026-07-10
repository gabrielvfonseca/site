import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['../../packages/testing/src/setup.ts'],
    globals: true,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    // Unit/integration tests only. Playwright E2E lives in tests/e2e and is run
    // via `pnpm test:e2e`, not vitest.
    include: [
      'src/**/*.test.{ts,tsx}',
      'tests/unit/**/*.test.{ts,tsx}',
      'tests/integration/**/*.test.{ts,tsx}',
    ],
    exclude: ['**/node_modules/**', 'tests/e2e/**', '**/*.spec.ts'],
    testTimeout: 10_000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@gabfon/analytics': path.resolve(
        __dirname,
        '../../packages/analytics/src'
      ),
      '@gabfon/design-system': path.resolve(
        __dirname,
        '../../packages/design-system/src'
      ),
      '@gabfon/next-config': path.resolve(
        __dirname,
        '../../packages/next-config/src'
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
    },
  },
});
