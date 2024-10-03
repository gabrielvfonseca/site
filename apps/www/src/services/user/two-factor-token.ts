// Generate a two-factor token for a user

// Import db instance
import { db } from "@repo/database-config";

// Import setTokenExpiration
import { setTokenExpiration } from "@lib/tokens";

// Import crypto from node
import crypto from "node:crypto";


// Generate two-factor token
export const generateTwoFactorToken = async (email: string) => {
  // Check if there is an existing two-factor token
  const existingToken = await getTwoFactorTokenByEmail(email);

  // If there is an existing two-factor token, delete it
  if (existingToken) {
    await deleteTwoFactorTokenById(existingToken.id);
  }

  // Generate a new token
  const token = String(crypto.randomInt(100000, 1000000));

  // Set the token expiration
  const expires = setTokenExpiration(60 * 2); // 2 minutes

  // Create a new two-factor token
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  // Return the two-factor token
  return twoFactorToken;
};


// Get two-factor token by token
export const getTwoFactorToken = async (token: string) => {
  // Try to get the two-factor token
  try {
    // Get the two-factor token
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    // Return the two-factor token
    return twoFactorToken;
  } catch {
    // Return null if there is an error
    return null;
  }
};


// Get two-factor token by email
export const getTwoFactorTokenByEmail = async (email: string) => {
  // Try to get the two-factor token
  try {
    // Get the two-factor token
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    // Return the two-factor token
    return twoFactorToken;
  } catch {
    // Return null if there is an error
    return null;
  }
};


// Delete two-factor token by id
export const deleteTwoFactorTokenById = async (id: string) => {
  // Try to delete the two-factor token
  try {
    // Delete the two-factor token
    return await db.twoFactorToken.delete({
      where: { id },
    });
  } catch {
    // Return null if there is an error
    return null;
  }
};
