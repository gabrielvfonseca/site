// Generate, get, and delete two-factor confirmation tokens

// Importe db instance
import { db } from "@repo/database-config";

// Import setTokenExpiration
import { setTokenExpiration } from "@lib/tokens";

// Generate two-factor confirmation token
export const generateTwoFactorConfirmation = async (userId: string) => {
  // Check if there is an existing two-factor confirmation
  const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(userId);

  // If there is an existing two-factor confirmation, delete it
  if (existingTwoFactorConfirmation) {
    // Delete the existing two-factor confirmation
    await deleteTwoFactorConfirmationById(existingTwoFactorConfirmation.id);
  }
  
  // Set the token expiration
  const expires = setTokenExpiration(60 * 15); // 15 minutes

  // Create a new two-factor confirmation
  const twoFactorConfirmation = await db.twoFactorConfirmation.create({
    data: {
      userId,
      expires,
    },
  });

  // Return the two-factor confirmation
  return twoFactorConfirmation;
};


// Get two-factor confirmation by token
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  // Try to get the two-factor confirmation
  try {
    // Get the two-factor confirmation
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    // Return the two-factor confirmation
    return twoFactorConfirmation;
  } catch {
    // Return null if there is an error
    return null;
  }
};


// Delete two-factor confirmation by id
export const deleteTwoFactorConfirmationById = async (id: string) => {
  // Try to delete the two-factor confirmation
  try {
    // Delete the two-factor confirmation
    return await db.twoFactorConfirmation.delete({
      where: { id },
    });
  } catch {
    // Return null if there is an error
    return null;
  }
};


// Delete two-factor confirmation by user id
export const deleteTwoFactorConfirmationByUserId = async (userId: string) => {
  // Try to delete the two-factor confirmation
  try {
    // Delete the two-factor confirmation
    return await db.twoFactorConfirmation.delete({
      where: { userId },
    });
  } catch {
    // Return null if there is an error
    return null;
  }
};