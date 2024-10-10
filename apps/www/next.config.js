/**
 * @type {import('next').NextConfig}
 */

const { withContentlayer } = require('next-contentlayer');
const { resolve } = require('path');
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

// Next config
const config = {
  /* config options here */
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, './src'),
      '.contentlayer/generated': resolve(__dirname, '.contentlayer/generated')
    };
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config;
  },
};

// Export default config with contentlayer
module.exports = withContentlayer(config);