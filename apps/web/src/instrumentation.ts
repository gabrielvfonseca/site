import {
	initializeSentry,
	onRequestError,
} from "@gabfon/observability/instrumentation";

/**
 * Next.js calls this once per server instance, before any request is handled.
 * Export the function itself — calling it here would run it at module load and
 * export `undefined`, so Next would never invoke it.
 */
export const register = initializeSentry;

// vinext registers this export as the global `onRequestError` handler, invoked
// by `reportRequestError` when an unhandled request error occurs on the Worker.
export { onRequestError };
