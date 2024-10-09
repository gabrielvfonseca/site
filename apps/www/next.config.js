/**
 * @type {import('next').NextConfig}
 */

const { withContentlayer } = require('next-contentlayer');

// Next config
const config = {
  /* config options here */
};

// Export default config with contentlayer
module.exports = withContentlayer(config);