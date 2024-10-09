/**
 * @type {import('next').NextConfig}
 */

const { withContentlayer } = require('next-contentlayer');

const path = require('path');

// Next config
const config = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
};

// Export default config with contentlayer
module.exports = withContentlayer(config);