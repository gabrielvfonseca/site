import { createRateLimiter, slidingWindow } from '@gabfon/rate-limit';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Rate limit middleware for API routes.
 * Returns 429 if rate limit is exceeded.
 */
export async function checkRateLimit(
  request: NextRequest,
  identifier?: string
): Promise<{ success: boolean; response?: NextResponse }> {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    const limiter = createRateLimiter({
      limiter: slidingWindow(5, '1 m'), // 5 requests per minute
      prefix: `rate-limit:${identifier || 'default'}`,
    });

    const { success, limit, remaining, reset } = await limiter.limit(ip);

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return {
        success: false,
        response: NextResponse.json(
          {
            error: 'Too many requests',
            retryAfter,
          },
          {
            status: 429,
            headers: {
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': Math.max(0, remaining).toString(),
              'X-RateLimit-Reset': reset.toString(),
            },
          }
        ),
      };
    }

    return { success: true };
  } catch (error) {
    // If rate limiting fails, deny request (fail-secure approach)
    console.error('[Rate Limit] Error:', error);
    return {
      success: false,
      response: NextResponse.json(
        {
          error: 'Service temporarily unavailable',
          details: 'Rate limit check failed',
        },
        {
          status: 503,
          headers: {
            'Retry-After': '60',
          },
        }
      ),
    };
  }
}
