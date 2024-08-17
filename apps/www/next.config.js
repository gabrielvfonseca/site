/**
 * @type {import('next').NextConfig}
 */

const { withContentlayer } = require('next-contentlayer');

// Next config
const config = {
  reactStrictMode: true,
};

// Export default config with contentlayer
module.exports = withContentlayer(config);