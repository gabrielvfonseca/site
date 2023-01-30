/** @type {import('next').NextConfig} */

const nextConfig = {
  publicRuntimeConfig: {
    staticFolder: "/static",
  },
  devIndicators: {
    buildActivity: false,
  },
  images: {
    loader: 'custom',
    loaderFile: './lib/loader.ts',
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig
