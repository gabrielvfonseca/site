import { githubClient } from '@gabfon/github';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/github/events
 * Returns user's public GitHub events
 * Query parameters:
 * - per_page: number of events to return (default: 30)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = Number.parseInt(searchParams.get('per_page') || '30', 10);

    const events = await githubClient.getUserEvents(perPage);

    return NextResponse.json(events, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300', // 5 minutes
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub events' },
      { status: 500 }
    );
  }
}
