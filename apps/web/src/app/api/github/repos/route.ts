import { githubClient } from '@gabfon/github';
import { parseError } from '@gabfon/observability';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * GET /api/github/repos
 * Returns user's repositories
 * Query parameters:
 * - per_page: number of repos to return (default: 10, max: 100)
 * - sort: sort order (default: updated) - must be: updated, created, pushed, name
 */

const QuerySchema = z.object({
  per_page: z.coerce
    .number()
    .int()
    .min(1, 'per_page must be at least 1')
    .max(100, 'per_page cannot exceed 100')
    .default(10),
  sort: z
    .enum(['updated', 'created', 'pushed', 'name'])
    .default('updated'),
});

export async function GET(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitCheck = await checkRateLimit(request, 'github-repos');
    if (!rateLimitCheck.success && rateLimitCheck.response) {
      return rateLimitCheck.response;
    }

    const { searchParams } = new URL(request.url);
    const queryParams = {
      per_page: searchParams.get('per_page'),
      sort: searchParams.get('sort'),
    };

    // Validate query parameters
    const validationResult = QuerySchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid query parameters',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { per_page, sort } = validationResult.data;

    const repos = await githubClient.getUserRepos(per_page, sort);

    return NextResponse.json(repos, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600', // 1 hour
      },
    });
  } catch (error) {
    const parsedError = parseError(error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories', details: parsedError },
      { status: 500 }
    );
  }
}
