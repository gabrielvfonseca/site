import { initializeSentry } from "@gabfon/observability/client";
import { captureRouterTransitionStart } from "@sentry/nextjs";

/*
 * Next.js runs this file in the browser before the app becomes interactive, so
 * it is the client-side counterpart to `instrumentation.ts` (which only runs on
 * the server). It replaces the legacy `sentry.client.config.ts` entry point.
 * https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client
 */
initializeSentry();

/**
 * Instruments App Router client-side navigations so Sentry can trace them.
 * Next.js calls this on every router transition; Sentry requires the export to
 * be named `onRouterTransitionStart`.
 */
export const onRouterTransitionStart = captureRouterTransitionStart;
