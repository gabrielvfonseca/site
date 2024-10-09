/**
 * @type {import('next').NextConfig}
 */

const { withContentlayer } = require('next-contentlayer');

const path = require('path');

// Next config
const config = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@contentlayer': path.resolve(__dirname, '.contentlayer/generated'),
    };

    return config;
  },
};

// Export default config with contentlayer
module.exports = withContentlayer(config);