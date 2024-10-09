/**
 * @type {import('next').NextConfig}
 */

const { withContentlayer } = require('next-contentlayer');

const { resolve } = require('path');

// Next config
const config = {
  reactStrictMode: true,
  webpack: (config) => {
    // Set up Webpack aliases based on the baseUrl
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, 'src'),  // Base alias for src
    };

    return config;
  },
};

// Export default config with contentlayer
module.exports = withContentlayer(config);