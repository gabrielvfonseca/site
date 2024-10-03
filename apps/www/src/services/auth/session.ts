import "server-only";

// This file is used to get the current user and role from the session

// Import the cache function
import { cache } from "react";

// Get the auth function from the auth handlers
import { auth } from "./handlers";

// Get the current user and role from the session
export const currentUser = cache(async () => {
    // Get the session
    const session = await auth();

    // Return the user from the session
    return session?.user;
});

// Get the session as boolean from the session
export const sessionState = cache(async () => {
    // Get the session
    const session = await auth();

    // Return the session as a boolean
    return !!session;
});