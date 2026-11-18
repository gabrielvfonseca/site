import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { responseStoreServiceBinding } from "./cloudflare.config";
import { responseStoreAdapter } from "@vinext/cloudflare/cache/response-store-adapter";
import { imagesOptimizer } from "@vinext/cloudflare/images/images-optimizer";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const workspaceRoot = join(__dirname, "../..");

// Map of package name to its dist directory (built outputs)
const workspacePackageDirs = {
  "@gabfon/analytics": "packages/analytics/dist",
  "@gabfon/database": "packages/database/dist",
  "@gabfon/design-system": "packages/design-system/dist",
  "@gabfon/email": "packages/email/dist",
  "@gabfon/github": "packages/github/dist",
  "@gabfon/next-config": "packages/next-config/dist",
  "@gabfon/observability": "packages/observability/dist",
  "@gabfon/rate-limit": "packages/rate-limit/dist",
  "@gabfon/security": "packages/security/dist",
  "@gabfon/seo": "packages/seo/dist",
  "@gabfon/spotify": "packages/spotify/dist",
  "@gabfon/strava": "packages/strava/dist",
  "@gabfon/supabase": "packages/supabase/dist",
  "@gabfon/wakatime": "packages/wakatime/dist",
  "@gabfon/x": "packages/x/dist",
};

// Build alias array for Vite - order matters, more specific first
const workspaceAliases = [
  // Main package entries (handle special cases like seo)
  { find: /^@gabfon\/analytics$/, replacement: join(workspaceRoot, "packages/analytics/dist/index.js") },
  { find: /^@gabfon\/database$/, replacement: join(workspaceRoot, "packages/database/dist/index.js") },
  { find: /^@gabfon\/design-system$/, replacement: join(workspaceRoot, "packages/design-system/dist/index.js") },
  { find: /^@gabfon\/email$/, replacement: join(workspaceRoot, "packages/email/dist/index.js") },
  { find: /^@gabfon\/github$/, replacement: join(workspaceRoot, "packages/github/dist/index.js") },
  { find: /^@gabfon\/next-config$/, replacement: join(workspaceRoot, "packages/next-config/dist/index.js") },
  { find: /^@gabfon\/observability$/, replacement: join(workspaceRoot, "packages/observability/dist/index.js") },
  { find: /^@gabfon\/rate-limit$/, replacement: join(workspaceRoot, "packages/rate-limit/dist/index.js") },
  { find: /^@gabfon\/security$/, replacement: join(workspaceRoot, "packages/security/dist/index.js") },
  // seo uses metadata.js as main entry
  { find: /^@gabfon\/seo$/, replacement: join(workspaceRoot, "packages/seo/dist/metadata.js") },
  { find: /^@gabfon\/spotify$/, replacement: join(workspaceRoot, "packages/spotify/dist/index.js") },
  { find: /^@gabfon\/strava$/, replacement: join(workspaceRoot, "packages/strava/dist/index.js") },
  { find: /^@gabfon\/supabase$/, replacement: join(workspaceRoot, "packages/supabase/dist/index.js") },
  { find: /^@gabfon\/wakatime$/, replacement: join(workspaceRoot, "packages/wakatime/dist/index.js") },
  { find: /^@gabfon\/x$/, replacement: join(workspaceRoot, "packages/x/dist/index.js") },
  // Sub-path exports - these need to be more specific
  // analytics
  { find: /^@gabfon\/analytics\/keys$/, replacement: join(workspaceRoot, "packages/analytics/dist/keys.js") },
  { find: /^@gabfon\/analytics\/vercel$/, replacement: join(workspaceRoot, "packages/analytics/dist/vercel.js") },
  { find: /^@gabfon\/analytics\/lib\/client$/, replacement: join(workspaceRoot, "packages/analytics/dist/lib/client.js") },
  { find: /^@gabfon\/analytics\/lib\/server$/, replacement: join(workspaceRoot, "packages/analytics/dist/lib/server.js") },
  // database
  { find: /^@gabfon\/database\/keys$/, replacement: join(workspaceRoot, "packages/database/dist/keys.js") },
  { find: /^@gabfon\/database\/client$/, replacement: join(workspaceRoot, "packages/database/dist/client.js") },
  { find: /^@gabfon\/database\/queries$/, replacement: join(workspaceRoot, "packages/database/dist/queries.js") },
  { find: /^@gabfon\/database\/schema$/, replacement: join(workspaceRoot, "packages/database/dist/schema.js") },
  // design-system (components, hooks, providers, lib are directories with index.js)
  // email
  { find: /^@gabfon\/email\/keys$/, replacement: join(workspaceRoot, "packages/email/dist/keys.js") },
  { find: /^@gabfon\/email\/templates\/contact$/, replacement: join(workspaceRoot, "packages/email/dist/templates/contact.js") },
  // github
  { find: /^@gabfon\/github\/keys$/, replacement: join(workspaceRoot, "packages/github/dist/keys.js") },
  { find: /^@gabfon\/github\/client$/, replacement: join(workspaceRoot, "packages/github/dist/client.js") },
  { find: /^@gabfon\/github\/types$/, replacement: join(workspaceRoot, "packages/github/dist/types.js") },
  // next-config
  { find: /^@gabfon\/next-config\/keys$/, replacement: join(workspaceRoot, "packages/next-config/dist/keys.js") },
  // observability
  { find: /^@gabfon\/observability\/keys$/, replacement: join(workspaceRoot, "packages/observability/dist/keys.js") },
  { find: /^@gabfon\/observability\/next-config$/, replacement: join(workspaceRoot, "packages/observability/dist/next-config.js") },
  { find: /^@gabfon\/observability\/client$/, replacement: join(workspaceRoot, "packages/observability/dist/client.js") },
  { find: /^@gabfon\/observability\/log$/, replacement: join(workspaceRoot, "packages/observability/dist/log.js") },
  { find: /^@gabfon\/observability\/instrumentation$/, replacement: join(workspaceRoot, "packages/observability/dist/instrumentation.js") },
  // rate-limit
  { find: /^@gabfon\/rate-limit\/redis$/, replacement: join(workspaceRoot, "packages/rate-limit/dist/redis.js") },
  { find: /^@gabfon\/rate-limit\/keys$/, replacement: join(workspaceRoot, "packages/rate-limit/dist/keys.js") },
  // security
  { find: /^@gabfon\/security\/keys$/, replacement: join(workspaceRoot, "packages/security/dist/keys.js") },
  { find: /^@gabfon\/security\/proxy$/, replacement: join(workspaceRoot, "packages/security/dist/proxy.js") },
  // seo
  { find: /^@gabfon\/seo\/keys$/, replacement: join(workspaceRoot, "packages/seo/dist/keys.js") },
  { find: /^@gabfon\/seo\/json-ld$/, replacement: join(workspaceRoot, "packages/seo/dist/json-ld.js") },
  { find: /^@gabfon\/seo\/metadata$/, replacement: join(workspaceRoot, "packages/seo/dist/metadata.js") },
  { find: /^@gabfon\/seo\/viewport$/, replacement: join(workspaceRoot, "packages/seo/dist/viewport.js") },
  // spotify
  { find: /^@gabfon\/spotify\/keys$/, replacement: join(workspaceRoot, "packages/spotify/dist/keys.js") },
  { find: /^@gabfon\/spotify\/client$/, replacement: join(workspaceRoot, "packages/spotify/dist/client.js") },
  // strava
  { find: /^@gabfon\/strava\/keys$/, replacement: join(workspaceRoot, "packages/strava/dist/keys.js") },
  { find: /^@gabfon\/strava\/client$/, replacement: join(workspaceRoot, "packages/strava/dist/client.js") },
  // supabase
  { find: /^@gabfon\/supabase\/client$/, replacement: join(workspaceRoot, "packages/supabase/dist/client/client.js") },
  { find: /^@gabfon\/supabase\/server$/, replacement: join(workspaceRoot, "packages/supabase/dist/client/server.js") },
  { find: /^@gabfon\/supabase\/keys$/, replacement: join(workspaceRoot, "packages/supabase/dist/keys.js") },
  { find: /^@gabfon\/supabase\/mutations$/, replacement: join(workspaceRoot, "packages/supabase/dist/mutations/index.js") },
  { find: /^@gabfon\/supabase\/queries$/, replacement: join(workspaceRoot, "packages/supabase/dist/queries/index.js") },
  { find: /^@gabfon\/supabase\/storage$/, replacement: join(workspaceRoot, "packages/supabase/dist/utils/storage.js") },
  { find: /^@gabfon\/supabase\/types$/, replacement: join(workspaceRoot, "packages/supabase/dist/types/index.js") },
  // wakatime
  { find: /^@gabfon\/wakatime\/keys$/, replacement: join(workspaceRoot, "packages/wakatime/dist/keys.js") },
  { find: /^@gabfon\/wakatime\/client$/, replacement: join(workspaceRoot, "packages/wakatime/dist/client.js") },
  { find: /^@gabfon\/wakatime\/types$/, replacement: join(workspaceRoot, "packages/wakatime/dist/types.js") },
  // x
  { find: /^@gabfon\/x\/keys$/, replacement: join(workspaceRoot, "packages/x/dist/keys.js") },
  { find: /^@gabfon\/x\/client$/, replacement: join(workspaceRoot, "packages/x/dist/client.js") },
  { find: /^@gabfon\/x\/types$/, replacement: join(workspaceRoot, "packages/x/dist/types.js") },
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
  "@gabfon/supabase",
  "@gabfon/wakatime",
  "@gabfon/x",
  // Sub-path exports
  "@gabfon/analytics/keys",
  "@gabfon/analytics/vercel",
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
  "@gabfon/supabase/client",
  "@gabfon/supabase/server",
  "@gabfon/supabase/keys",
  "@gabfon/supabase/mutations",
  "@gabfon/supabase/queries",
  "@gabfon/supabase/storage",
  "@gabfon/supabase/types",
  "@gabfon/wakatime/keys",
  "@gabfon/wakatime/client",
  "@gabfon/wakatime/types",
  "@gabfon/x/keys",
  "@gabfon/x/client",
  "@gabfon/x/types",
];

import vitePluginRsc from "@vitejs/plugin-rsc";

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
      cache: responseStoreAdapter(),
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
      auxiliaryWorkers: [{ config: responseStoreServiceBinding }],
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
          rscEnv.ssr = rscEnv.ssr || {};
          rscEnv.ssr.external = [...(rscEnv.ssr.external || []), "@sentry/nextjs"];
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
    alias: workspaceAliases,
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
