/**
 * @type {import('next').NextConfig}
 */

const { withContentlayer } = require('next-contentlayer');
const { resolve } = require('path');

// Next config
const config = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, 'src'),
      'contentlayer/generated': resolve(__dirname, '.contentlayer/generated')
    };

    return config;
  },
};

// Export default config with contentlayer
module.exports = withContentlayer(config);