import path from 'node:path';
import { fileURLToPath as fileUrlToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Get the current directory name in ESM context
const Dirname = path.dirname(fileUrlToPath(import.meta.url));

// Shared Vitest config for @gabfon/testing
export const testingConfig = defineConfig({
  // Register React plugin for Vite
  plugins: [react()],
  test: {
    // Enable global test APIs (describe/it/expect) so setup files and
    // jest-dom matcher registration work without explicit imports.
    globals: true,
    // Use jsdom environment for browser-like testing (individual test files
    // may opt into node via `// @vitest-environment node`).
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      // Alias "@" to the current package root for easy imports
      '@': path.resolve(Dirname, './'),
      // Alias "@gabfon" to the monorepo packages directory
      '@gabfon': path.resolve(Dirname, '../../packages'),
    },
  },
});

// Default export for backward compatibility
export default testingConfig;
