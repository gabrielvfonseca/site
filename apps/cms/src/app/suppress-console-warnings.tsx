'use client';

/**
 * Keystatic's admin UI (built on `@keystar/ui` / React Aria) renders some link
 * elements with an empty `href`, which trips React's dev-only
 * "An empty string ("") was passed to the href attribute" warning. It is
 * benign (dev-only, stripped from production) and originates entirely inside
 * the library, so there is nothing to fix in our own code.
 *
 * This module filters out only that one warning to keep the dev console and
 * Next.js error overlay quiet, while leaving every other `console.error`
 * untouched.
 */

/** Substring that uniquely identifies the Keystatic empty-`href` warning. */
const SUPPRESSED_HREF_WARNING = 'was passed to the';

if (typeof window !== 'undefined') {
  const globalWithFlag = window as typeof window & {
    __consoleWarningsPatched?: boolean;
  };

  if (!globalWithFlag.__consoleWarningsPatched) {
    globalWithFlag.__consoleWarningsPatched = true;

    // biome-ignore lint/suspicious/noConsole: Intentionally wrapping console.error to filter Keystatic dev warning
    const originalError = console.error;

    console.error = (...args: unknown[]): void => {
      const [first, ...rest] = args;
      const isEmptyHrefWarning =
        typeof first === 'string' &&
        first.includes(SUPPRESSED_HREF_WARNING) &&
        rest.some((arg) => arg === 'href');

      if (isEmptyHrefWarning) {
        return;
      }

      originalError.apply(console, args);
    };
  }
}

/**
 * Renders nothing; importing this component installs the `console.error`
 * filter as a side effect on the client.
 * @returns `null`.
 */
export function SuppressConsoleWarnings(): null {
  return null;
}
