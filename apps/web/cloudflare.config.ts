// Re-exports the Cloudflare config from the monorepo root. The Vite plugin
// (@cloudflare/vite-plugin) only looks for `cloudflare.config.ts` in the Vite
// root (apps/web), so this shim keeps the build working while the real
// definition lives at the monorepo root.
export { default } from "../../cloudflare.config.ts";
export { responseStoreServiceBinding } from "../../cloudflare.config.ts";
