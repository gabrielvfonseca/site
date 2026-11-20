import { createRequire } from "node:module";
import path from "node:path";

import { cloudflare } from "@cloudflare/vite-plugin";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindPostcss from "@tailwindcss/postcss";
import { responseStoreAdapter } from "@vinext/cloudflare/cache/response-store-adapter";
import { imagesOptimizer } from "@vinext/cloudflare/images/images-optimizer";
import vitePluginRsc from "@vitejs/plugin-rsc";
import vinext from "vinext";
import { defineConfig } from "vite";

import { responseStoreServiceBinding } from "./cloudflare.config";

// The Response Store cache requires an R2 bucket (site-response-store-cache-bodies)
// in the target Cloudflare account. R2 is not enabled on every account, so the
// cache is opt-in: set RESPONSE_STORE=1 when the bucket exists, otherwise the
// build deploys bare (no warm-cache, no auxiliary worker).
const responseStoreEnabled = process.env.RESPONSE_STORE === "1";

const Dirname = import.meta.dirname;
const workspaceRoot = path.join(Dirname, "../..");

// Map of package name to its source directory (packages export src/*.ts directly; no dist build step)
const _workspacePackageDirs = {
  "@gabfon/analytics": "packages/analytics/src",
  "@gabfon/database": "packages/database/src",
  "@gabfon/design-system": "packages/design-system/src",
  "@gabfon/email": "packages/email/src",
  "@gabfon/github": "packages/github/src",
  "@gabfon/next-config": "packages/next-config/src",
  "@gabfon/observability": "packages/observability/src",
  "@gabfon/rate-limit": "packages/rate-limit/src",
  "@gabfon/security": "packages/security/src",
  "@gabfon/seo": "packages/seo/src",
  "@gabfon/spotify": "packages/spotify/src",
  "@gabfon/strava": "packages/strava/src",
  "@gabfon/wakatime": "packages/wakatime/src",
  "@gabfon/x": "packages/x/src",
};

// Build alias array for Vite - order matters, more specific first
const workspaceAliases = [
  // Main package entries (handle special cases like seo)
  {
    find: /^@gabfon\/analytics$/,
    replacement: path.join(workspaceRoot, "packages/analytics/src/index.tsx"),
  },
  {
    find: /^@gabfon\/database$/,
    replacement: path.join(workspaceRoot, "packages/database/src/index.ts"),
  },
  {
    find: /^@gabfon\/design-system$/,
    replacement: path.join(
      workspaceRoot,
      "packages/design-system/src/index.tsx"
    ),
  },
  {
    find: /^@gabfon\/email$/,
    replacement: path.join(workspaceRoot, "packages/email/src/index.ts"),
  },
  {
    find: /^@gabfon\/github$/,
    replacement: path.join(workspaceRoot, "packages/github/src/index.ts"),
  },
  {
    find: /^@gabfon\/next-config$/,
    replacement: path.join(workspaceRoot, "packages/next-config/src/index.ts"),
  },
  {
    find: /^@gabfon\/observability$/,
    replacement: path.join(
      workspaceRoot,
      "packages/observability/src/index.ts"
    ),
  },
  {
    find: /^@gabfon\/rate-limit$/,
    replacement: path.join(workspaceRoot, "packages/rate-limit/src/index.ts"),
  },
  {
    find: /^@gabfon\/security$/,
    replacement: path.join(workspaceRoot, "packages/security/src/index.ts"),
  },
  // seo uses metadata.js as main entry
  {
    find: /^@gabfon\/seo$/,
    replacement: path.join(workspaceRoot, "packages/seo/src/metadata.ts"),
  },
  {
    find: /^@gabfon\/spotify$/,
    replacement: path.join(workspaceRoot, "packages/spotify/src/index.ts"),
  },
  {
    find: /^@gabfon\/strava$/,
    replacement: path.join(workspaceRoot, "packages/strava/src/index.ts"),
  },
  {
    find: /^@gabfon\/wakatime$/,
    replacement: path.join(workspaceRoot, "packages/wakatime/src/index.ts"),
  },
  {
    find: /^@gabfon\/x$/,
    replacement: path.join(workspaceRoot, "packages/x/src/index.ts"),
  },
  // Sub-path exports - these need to be more specific
  // analytics
  {
    find: /^@gabfon\/analytics\/keys$/,
    replacement: path.join(workspaceRoot, "packages/analytics/src/keys.ts"),
  },
  {
    find: /^@gabfon\/analytics\/lib\/client$/,
    replacement: path.join(
      workspaceRoot,
      "packages/analytics/src/lib/client.tsx"
    ),
  },
  {
    find: /^@gabfon\/analytics\/lib\/server$/,
    replacement: path.join(
      workspaceRoot,
      "packages/analytics/src/lib/server.ts"
    ),
  },
  // database
  {
    find: /^@gabfon\/database\/keys$/,
    replacement: path.join(workspaceRoot, "packages/database/src/keys.ts"),
  },
  {
    find: /^@gabfon\/database\/client$/,
    replacement: path.join(workspaceRoot, "packages/database/src/client.ts"),
  },
  {
    find: /^@gabfon\/database\/queries$/,
    replacement: path.join(workspaceRoot, "packages/database/src/queries.ts"),
  },
  {
    find: /^@gabfon\/database\/schema$/,
    replacement: path.join(workspaceRoot, "packages/database/src/schema.ts"),
  },
  // design-system (components, hooks, providers, lib are directories with index.js)
  // email
  {
    find: /^@gabfon\/email\/keys$/,
    replacement: path.join(workspaceRoot, "packages/email/src/keys.ts"),
  },
  {
    find: /^@gabfon\/email\/templates\/contact$/,
    replacement: path.join(
      workspaceRoot,
      "packages/email/src/templates/contact.tsx"
    ),
  },
  // github
  {
    find: /^@gabfon\/github\/keys$/,
    replacement: path.join(workspaceRoot, "packages/github/src/keys.ts"),
  },
  {
    find: /^@gabfon\/github\/client$/,
    replacement: path.join(workspaceRoot, "packages/github/src/client.ts"),
  },
  {
    find: /^@gabfon\/github\/types$/,
    replacement: path.join(workspaceRoot, "packages/github/src/types.ts"),
  },
  // next-config
  {
    find: /^@gabfon\/next-config\/keys$/,
    replacement: path.join(workspaceRoot, "packages/next-config/src/keys.ts"),
  },
  // observability
  {
    find: /^@gabfon\/observability\/keys$/,
    replacement: path.join(workspaceRoot, "packages/observability/src/keys.ts"),
  },
  {
    find: /^@gabfon\/observability\/next-config$/,
    replacement: path.join(
      workspaceRoot,
      "packages/observability/src/next-config.ts"
    ),
  },
  {
    find: /^@gabfon\/observability\/client$/,
    replacement: path.join(
      workspaceRoot,
      "packages/observability/src/client.ts"
    ),
  },
  {
    find: /^@gabfon\/observability\/log$/,
    replacement: path.join(workspaceRoot, "packages/observability/src/log.ts"),
  },
  {
    find: /^@gabfon\/observability\/instrumentation$/,
    replacement: path.join(
      workspaceRoot,
      "packages/observability/src/instrumentation.ts"
    ),
  },
  // rate-limit
  {
    find: /^@gabfon\/rate-limit\/redis$/,
    replacement: path.join(workspaceRoot, "packages/rate-limit/src/redis.ts"),
  },
  {
    find: /^@gabfon\/rate-limit\/keys$/,
    replacement: path.join(workspaceRoot, "packages/rate-limit/src/keys.ts"),
  },
  // security
  {
    find: /^@gabfon\/security\/keys$/,
    replacement: path.join(workspaceRoot, "packages/security/src/keys.ts"),
  },
  {
    find: /^@gabfon\/security\/proxy$/,
    replacement: path.join(workspaceRoot, "packages/security/src/proxy.ts"),
  },
  // seo
  {
    find: /^@gabfon\/seo\/keys$/,
    replacement: path.join(workspaceRoot, "packages/seo/src/keys.ts"),
  },
  {
    find: /^@gabfon\/seo\/json-ld$/,
    replacement: path.join(workspaceRoot, "packages/seo/src/json-ld.tsx"),
  },
  {
    find: /^@gabfon\/seo\/metadata$/,
    replacement: path.join(workspaceRoot, "packages/seo/src/metadata.ts"),
  },
  {
    find: /^@gabfon\/seo\/viewport$/,
    replacement: path.join(workspaceRoot, "packages/seo/src/viewport.tsx"),
  },
  // spotify
  {
    find: /^@gabfon\/spotify\/keys$/,
    replacement: path.join(workspaceRoot, "packages/spotify/src/keys.ts"),
  },
  {
    find: /^@gabfon\/spotify\/client$/,
    replacement: path.join(workspaceRoot, "packages/spotify/src/client.ts"),
  },
  // strava
  {
    find: /^@gabfon\/strava\/keys$/,
    replacement: path.join(workspaceRoot, "packages/strava/src/keys.ts"),
  },
  {
    find: /^@gabfon\/strava\/client$/,
    replacement: path.join(workspaceRoot, "packages/strava/src/client.ts"),
  },
  // wakatime
  {
    find: /^@gabfon\/wakatime\/keys$/,
    replacement: path.join(workspaceRoot, "packages/wakatime/src/keys.ts"),
  },
  {
    find: /^@gabfon\/wakatime\/client$/,
    replacement: path.join(workspaceRoot, "packages/wakatime/src/client.ts"),
  },
  {
    find: /^@gabfon\/wakatime\/types$/,
    replacement: path.join(workspaceRoot, "packages/wakatime/src/types.ts"),
  },
  // x
  {
    find: /^@gabfon\/x\/keys$/,
    replacement: path.join(workspaceRoot, "packages/x/src/keys.ts"),
  },
  {
    find: /^@gabfon\/x\/client$/,
    replacement: path.join(workspaceRoot, "packages/x/src/client.ts"),
  },
  {
    find: /^@gabfon\/x\/types$/,
    replacement: path.join(workspaceRoot, "packages/x/src/types.ts"),
  },
];

// All packages including sub-paths for transpilePackages and optimizeDeps
const workspacePackages = [
  // Main packages
  "@gabfon/analytics",
  "@gabfon/database",
  "@gabfon/design-system",
  "@gabfon/email",
  "@gabfon/github",
  "@gabfon/next-config",
  "@gabfon/observability",
  "@gabfon/rate-limit",
  "@gabfon/security",
  "@gabfon/seo",
  "@gabfon/spotify",
  "@gabfon/strava",
  "@gabfon/wakatime",
  "@gabfon/x",
  // Sub-path exports
  "@gabfon/analytics/keys",
  "@gabfon/analytics/lib/client",
  "@gabfon/analytics/lib/server",
  "@gabfon/database/keys",
  "@gabfon/database/client",
  "@gabfon/database/queries",
  "@gabfon/database/schema",
  "@gabfon/email/keys",
  "@gabfon/email/templates/contact",
  "@gabfon/github/keys",
  "@gabfon/github/client",
  "@gabfon/github/types",
  "@gabfon/next-config/keys",
  "@gabfon/observability/keys",
  "@gabfon/observability/next-config",
  "@gabfon/observability/client",
  "@gabfon/observability/log",
  "@gabfon/observability/instrumentation",
  "@gabfon/rate-limit/redis",
  "@gabfon/rate-limit/keys",
  "@gabfon/security/keys",
  "@gabfon/security/proxy",
  "@gabfon/seo/keys",
  "@gabfon/seo/json-ld",
  "@gabfon/seo/metadata",
  "@gabfon/seo/viewport",
  "@gabfon/spotify/keys",
  "@gabfon/spotify/client",
  "@gabfon/strava/keys",
  "@gabfon/strava/client",
  "@gabfon/wakatime/keys",
  "@gabfon/wakatime/client",
  "@gabfon/wakatime/types",
  "@gabfon/x/keys",
  "@gabfon/x/client",
  "@gabfon/x/types",
];

// Plugin to exclude MDX virtual modules from RSC plugin's scan-strip phase
function excludeMdxFromRscScan() {
  return {
    name: "exclude-mdx-from-rsc-scan",
    enforce: "pre",
    resolveId(id) {
      // Mark MDX virtual modules with collection query as external
      if (id.includes("?collection=")) {
        return { id, external: true };
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    // vinext without auto RSC registration - we configure it manually
    vinext({
      // Response Store cache is optional — only wired when the R2 bucket
      // exists in the target account (RESPONSE_STORE=1).
      ...(responseStoreEnabled ? { cache: responseStoreAdapter() } : {}),
      // Disable prerendering - using Response Store cache with warm-cache instead
      // Prerendering fails with Arcjet's custom protocol
      images: { optimizer: imagesOptimizer() },
      transpilePackages: workspacePackages,
      rsc: false,
    }),
    // Exclude MDX virtual modules from RSC scan
    excludeMdxFromRscScan(),
    // Manually configure RSC plugin with validateImports disabled
    vitePluginRsc({
      validateImports: false,
      serverHandler: {
        environmentName: "rsc",
        entryName: "index",
      },
    }),
    cloudflare({
      // Auxiliary worker only exists when the Response Store cache is on.
      ...(responseStoreEnabled
        ? { auxiliaryWorkers: [{ config: responseStoreServiceBinding }] }
        : {}),
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
    // Configure RSC environment to exclude @sentry/nextjs from edge runtime
    {
      name: "configure-rsc-environment",
      configResolved(config) {
        const rscEnv = config.environments?.rsc;
        if (rscEnv) {
          rscEnv.ssr ||= {};
          rscEnv.ssr.external = [
            ...(rscEnv.ssr.external || []),
            "@sentry/nextjs",
          ];
        }
      },
    },
    // Sentry Vite plugin for source map upload
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      // Only upload source maps in production
      disable: process.env.NODE_ENV !== "production",
      // Disable sourcemap upload during development
      debug: false,
      // Release version - can be set via environment variable
      release: process.env.SENTRY_RELEASE,
      // Include all source maps
      include: ".",
      ignore: ["node_modules", "dist"],
    }),
  ],
  resolve: {
    alias: [
      ...workspaceAliases,
      // The CSS @import "tailwindcss" must resolve to the package's CSS entry
      // in every environment (the RSC child env uses a different resolver path
      // that doesn't honor the "style" export condition). Alias it explicitly.
      {
        find: /^tailwindcss$/,
        replacement: createRequire(import.meta.url).resolve(
          "tailwindcss/index.css"
        ),
      },
    ],
  },
  // Explicitly set PostCSS so Vite uses this plugin list for ALL environments
  // (including the RSC child env). Without this, Vite falls back to
  // postcss-load-config which can miss the config in multi-env builds, and
  // `@import "tailwindcss"` gets resolved as a file path by postcss-import.
  // Setting this also makes vinext skip its own resolvePostcssStringPlugins.
  css: {
    postcss: {
      plugins: [tailwindPostcss()],
    },
  },
  optimizeDeps: {
    include: workspacePackages,
    exclude: ["@sentry/nextjs"],
  },
  ssr: {
    noExternal: workspacePackages,
    external: ["@sentry/nextjs"],
  },
});
