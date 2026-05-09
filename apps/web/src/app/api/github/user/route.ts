import { githubClient } from '@gabfon/github';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/github/user
 * Returns authenticated GitHub user information
 */
export async function GET(_request: NextRequest) {
  try {
    const user = await githubClient.getUser();

    return NextResponse.json(user, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=1800', // 30 minutes
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub user information' },
      { status: 500 }
    );
  }
}
