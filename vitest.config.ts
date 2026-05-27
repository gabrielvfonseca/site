import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['../../packages/testing/src/setup.ts'],
    include: ['**/*.test.ts', '**/*.test.tsx', '**/test/**'],
    exclude: ['node_modules', 'dist', '.next', 'coverage'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/mocks/',
        'src/fixtures/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/test/**',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': './src',
      '@gabfon/testing': '../../packages/testing/src',
    },
  },
});
