// Get the current user and role from the session

// Get the auth function from the auth handlers
import { prisma } from "@site/prisma-config";

// Get the current user and role from the session
export const getAccountByUserId = async (userId: string) => {
  // Get the session
  try {
    // Return the user from the session
    const account = await prisma.account.findFirst({
      where: { userId },
    });

    // Return the user from the session
    return account;
  } catch {
    // Return the user from the session
    return null;
  }
};