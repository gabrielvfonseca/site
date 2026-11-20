// Next.js calls `register` once per server instance, before any request is
// handled. Export the function itself — calling it here would run it at module
// load and export `undefined`, so Next would never invoke it.
export { initializeSentry as register } from "@gabfon/observability/instrumentation";

// vinext registers this export as the global `onRequestError` handler, invoked
// by `reportRequestError` when an unhandled request error occurs on the Worker.
export { onRequestError } from "@gabfon/observability/instrumentation";
