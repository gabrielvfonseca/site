import { withLogtail } from "@logtail/next";
import { withSentryConfig } from "@sentry/nextjs";

import { keys } from "./keys";

/**
 * The sentry config for the observability.
 * @returns The sentry config for the observability.
 */
export const sentryConfig: Parameters<typeof withSentryConfig>[1] = {
  org: keys().SENTRY_ORG,
  project: keys().SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  /*
   * For all available options, see:
   * https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
   */

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  /*
   * Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
   * This can increase your server load as well as your hosting bill.
   * Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
   * side errors will fail.
   */
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  /*
   * Automatic cron monitoring is not available on Cloudflare Workers.
   * See: https://docs.sentry.io/product/crons/
   */

  // Suppress OpenTelemetry warnings
  sourcemaps: {
    disable: false,
  },
};

export const withSentry = (sourceConfig: object): object => {
  const configWithTranspile = {
    ...sourceConfig,
    transpilePackages: ["@sentry/nextjs"],
  };

  return withSentryConfig(configWithTranspile, sentryConfig);
};

export const withLogging = (config: object): object => withLogtail(config);
