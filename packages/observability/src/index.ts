import { captureException } from "@sentry/nextjs";

import { log } from "./log";

/**
 * The parseError function for the observability.
 * @param error - The error to parse.
 * @returns The parsed error.
 */
export const parseError = (error: unknown): string => {
  let message = "An error occurred";

  if (error instanceof Error) {
    ({ message } = error);
  } else if (error && typeof error === "object" && "message" in error) {
    const { message: msg } = error as { message: string };
    message = msg;
  } else {
    message = String(error);
  }

  try {
    captureException(error);
    log.error(`Parsing error: ${message}`);
  } catch (newError) {
    console.error("Error parsing error:", newError);
  }

  return message;
};
