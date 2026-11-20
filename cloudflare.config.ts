import { createWorkersResponseStoreServiceBindingConfig } from "@vinext/cloudflare/cache/config";
import { bindings, defineConfig, defineWorker } from "cf/config";

// The Response Store cache requires an R2 bucket
// (site-response-store-cache-bodies) in the target Cloudflare account. R2 is
// not enabled on every account, so the cache is opt-in: set RESPONSE_STORE=1
// when the bucket exists. Otherwise the worker deploys bare (no R2 binding,
// no auxiliary worker).
const responseStoreEnabled = process.env.RESPONSE_STORE === "1";

let responseStore: Awaited<
  ReturnType<typeof createWorkersResponseStoreServiceBindingConfig>
> | null = null;
if (responseStoreEnabled) {
  responseStore = await createWorkersResponseStoreServiceBindingConfig({
    worker: {
      name: "site-response-store",
      compatibilityDate: "2026-11-18",
    },
    bucket: "site-response-store-cache-bodies",
  });
}

export const responseStoreServiceBinding =
  responseStore?.serviceBindingWorker ?? null;

export default defineConfig({
  worker: defineWorker({
    ...(responseStore ? responseStore.applicationWorker : {}),
    name: "site",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-18",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ...(responseStore ? responseStore.applicationWorker.env : {}),
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      // D1 database backing `@gabfon/database` (AMA questions/messages).
      // The database must exist in the account (`site-db`); migrations are
      // applied with `bunx wrangler d1 migrations apply site-db`.
      DB: bindings.d1({ name: "site-db" }),
    },
  }),
});
