import path from 'node:path';
import { fileURLToPath as fileUrlToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Get the current directory name in ESM context
const Dirname = path.dirname(fileUrlToPath(import.meta.url));

// Shared Vitest config for @gabfon/testing
export default defineConfig({
  // Register React plugin for Vite
  plugins: [react()],
  test: {
    // Use jsdom environment for browser-like testing
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
