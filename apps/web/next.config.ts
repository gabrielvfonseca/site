/** @type {import('next').NextConfig} **/

const { withContentlayer } = require('next-contentlayer');
const { resolve } = require('path');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, './src'),
      '@posts': resolve(__dirname, '.contentlayer/generated')
    };
    return config;
  },
};

module.exports = withContentlayer(nextConfig);