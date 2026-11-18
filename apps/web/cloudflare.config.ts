import { createWorkersResponseStoreServiceBindingConfig } from "@vinext/cloudflare/cache/config";
import { bindings, defineConfig, defineWorker } from "cf/config";

const responseStore = await createWorkersResponseStoreServiceBindingConfig({
	worker: {
		name: "site-response-store",
		compatibilityDate: "2026-11-18",
	},
	bucket: "site-response-store-cache-bodies",
});

export const responseStoreServiceBinding = responseStore.serviceBindingWorker;

export default defineConfig({
	worker: defineWorker({
		...responseStore.applicationWorker,
		name: "site",
		entrypoint: "vinext/server/fetch-handler",
		compatibilityDate: "2026-11-18",
		assets: {
			htmlHandling: "none",
			notFoundHandling: "none",
			runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
		},
		env: {
			...responseStore.applicationWorker.env,
			ASSETS: bindings.assets(),
			IMAGES: bindings.images(),
		},
	}),
});
