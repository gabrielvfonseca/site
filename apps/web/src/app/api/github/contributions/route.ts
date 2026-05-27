import { githubClient } from '@gabfon/github';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/github/contributions
 * Returns user's contribution calendar
 */
export async function GET(_request: NextRequest) {
  try {
    const contributions = await githubClient.getContributionCalendar();

    return NextResponse.json(contributions, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=1800', // 30 minutes
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributions' },
      { status: 500 }
    );
  }
}
