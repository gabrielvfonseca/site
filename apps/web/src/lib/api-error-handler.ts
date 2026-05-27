import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  error: string;
  timestamp?: string;
}

/**
 * Handle API errors consistently
 * - Logs errors to Sentry
 * - Returns generic error message to client
 * - Never exposes internal error details
 */
export function handleApiError(
  error: unknown,
  context: {
    route: string;
    defaultMessage: string;
    statusCode?: number;
  }
): NextResponse<ApiErrorResponse> {
  const { route, defaultMessage, statusCode = 500 } = context;

  // Log to Sentry with context
  Sentry.captureException(error, {
    tags: {
      type: 'api_error',
      route,
    },
    contexts: {
      api: {
        route,
        statusCode,
      },
    },
  });

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${route}] Error:`, error);
  }

  return NextResponse.json<ApiErrorResponse>(
    {
      error: defaultMessage,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode }
  );
}

/**
 * Handle validation errors (4xx)
 */
export function handleValidationError(
  message: string,
  statusCode = 400
): NextResponse<ApiErrorResponse> {
  return NextResponse.json<ApiErrorResponse>(
    {
      error: message,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode }
  );
}

/**
 * Successful API response with caching headers
 */
export interface ApiResponseOptions {
  cacheControl?: 'no-cache' | 'short' | 'long';
  statusCode?: number;
}

const CACHE_DURATIONS = {
  'no-cache': 'no-cache, no-store, must-revalidate',
  short: 'public, max-age=300', // 5 minutes
  long: 'public, max-age=3600', // 1 hour
} as const;

/**
 * Return a successful API response with proper caching headers
 */
export function successResponse<T>(
  data: T,
  options: ApiResponseOptions = {}
): NextResponse<T> {
  const { cacheControl = 'short', statusCode = 200 } = options;

  return NextResponse.json(data, {
    status: statusCode,
    headers: {
      'Cache-Control': CACHE_DURATIONS[cacheControl],
    },
  });
}
