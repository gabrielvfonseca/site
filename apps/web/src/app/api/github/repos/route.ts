import { githubClient } from '@gabfon/github';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/github/repos
 * Returns user's repositories
 * Query parameters:
 * - per_page: number of repos to return (default: 10)
 * - sort: sort order (default: updated)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = Number.parseInt(searchParams.get('per_page') || '10', 10);
    const sort = searchParams.get('sort') || 'updated';

    const repos = await githubClient.getUserRepos(perPage, sort);

    return NextResponse.json(repos, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600', // 1 hour
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    );
  }
}
