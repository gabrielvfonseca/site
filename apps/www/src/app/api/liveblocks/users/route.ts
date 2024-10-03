
// Next Request and Response
import { NextRequest, NextResponse } from "next/server";

/**
 * Get users' info from their ID
 * For `resolveUsers` in liveblocks.config.ts
 */

// Get user info from their ID
function getUser(userId: string) {
  // Validate the user ID
  if (!userId.startsWith("user-")) {
    return;
  }

  // Get the user index from the user ID
  const userIndex = Number(userId.replace(/^\D+/g, "")) ?? 0;

  // Return the user info
  return {
    name: 'Gabriel',
    avatar: `https://liveblocks.io/avatars/avatar-${userIndex}.png`,
  };
}

// GET /api/liveblocks/users?userIds=...
export async function GET(request: NextRequest) {
  // Get the query params
  const { searchParams } = new URL(request.url);

  // Get the user IDs from the query params
  const userIds = searchParams.getAll("userIds");

  // Validate the user IDs
  if (!userIds || !Array.isArray(userIds)) {
    return new NextResponse("Missing or invalid userIds", { status: 400 });
  }

  // Return the user info for each user ID
  return NextResponse.json(userIds.map((userId) => getUser(userId)));
};