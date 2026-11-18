import * as Sentry from "@sentry/nextjs";

/**
 * Server-side Sentry init for the vinext (Cloudflare Workers) runtime.
 *
 * The only runtime `init` options supported by @sentry/nextjs 10.78.0 are
 * dsn/tunnel/... — the `autoInstrument*` flags removed here were only
 * build-time (SentryBuildWebpackOptions) and are no-ops at runtime on the
 * Workers runtime.
 */
export function initializeSentry() {
	if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;

	Sentry.init({
		dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
		environment: process.env.NODE_ENV,
		enabled: process.env.NODE_ENV === "production",
	});
}

/**
 * vinext `onRequestError` hook.
 *
 * vinext's instrumentation-runtime registers this export as
 * `globalThis.__VINEXT_onRequestErrorHandler__` and invokes it via
 * `reportRequestError` when an unhandled request error occurs. This is the
 * supported integration point for server-side error capture on the Workers
 * runtime (no `autoInstrument*` flags involved).
 */
export function onRequestError(error: unknown) {
	Sentry.captureException(error);
}
