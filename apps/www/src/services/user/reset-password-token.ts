// Generate, get and delete reset password token

// Import db intance
import { db } from "@repo/database-config";

// Import setTokenExpiration
import { setTokenExpiration } from "@lib/tokens";

// Import uuid
import { v4 as uuid } from "uuid";

// Generate reset password token
export const generateResetPasswordToken = async (email: string) => {
  // Check if there is an existing token
  const existingToken = await getResetPasswordTokenByEmail(email);

  // If there is an existing token, delete it
  if (existingToken) {
    // Delete the existing token
    await deleteResetPasswordTokenById(existingToken.id);
  }

  // Generate a new token
  const token = uuid();

  // Set the token expiration
  const expires = setTokenExpiration();

  // Create a new reset password token
  const resetPasswordToken = await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  // Return the reset password token
  return resetPasswordToken;
};


// Get reset password token by token
export const getResetPasswordToken = async (token: string) => {
  // Try to get the reset password token
  try {
    // Get the reset password token
    const resetPasswordToken = await db.resetPasswordToken.findUnique({
      where: { token },
    });

    // Return the reset password token
    return resetPasswordToken;
  } catch {
    // Return null if there is an error
    return null;
  }
};


// Get reset password token by email 
export const getResetPasswordTokenByEmail = async (email: string) => {
  // Try to get the reset password token
  try {
    // Get the reset password token
    const resetPasswordToken = await db.resetPasswordToken.findFirst({
      where: { email },
    });

    // Return the reset password token
    return resetPasswordToken;
  } catch {
    // Return null if there is an error
    return null;
  }
};


// Delete reset password token by id
export const deleteResetPasswordTokenById = async (id: string) => {
  // Try to delete the reset password token
  try {
    // Delete the reset password token and return the result
    return await db.resetPasswordToken.delete({
      where: { id },
    });
  } catch {
    // Return null if there is an error
    return null;
  }
};