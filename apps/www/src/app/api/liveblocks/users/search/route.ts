
// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

/**
 * Returns a list of user IDs from a partial search input
 * For `resolveMentionSuggestions` in liveblocks.config.ts
 */

interface User {
  id: string;
  name: string;
}

// GET /api/liveblocks/users/search?text=...
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");

  const userIndices = [0];
  const users = userIndices.map(
    (userIndex) => ({ id: `user-${userIndex}`, name: 'Gabriel' }) as User
  );
  const filteredUserIds = users
    .filter((user) =>
      text ? user.name.toLowerCase().includes(text.toLowerCase()) : true
    )
    .map((user) => user.id);

  return NextResponse.json(filteredUserIds);
}