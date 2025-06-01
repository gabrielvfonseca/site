import path from 'node:path';
import baseConfig from '@repo/testing';
import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig } from 'vitest/config';
/// <reference types="vitest" />

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      globals: true,
      watch: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
);
