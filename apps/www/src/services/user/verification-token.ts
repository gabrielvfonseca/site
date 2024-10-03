// Validate email and generate a verification token

// Import the database instance
import { db } from "@repo/database-config";

// Import the setTokenExpiration function
import { setTokenExpiration } from "@lib/tokens";

// Import uuid
import { v4 as uuid } from "uuid";


// Generate a verification token
export const generateVerificationToken = async (email: string) => {
  // Check if there is an existing verification token
  const existingToken = await getVerificationTokenByEmail(email);

  // If there is an existing verification token, delete it
  if (existingToken) {
    await deleteVerificationTokenById(existingToken.id);
  }

  // Generate a new token
  const token = uuid();

  // Set the token expiration
  const expires = setTokenExpiration();

  // Create a new verification token
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  // Return the verification token
  return verificationToken;
};


// Get verification token by token
export const getVerificationToken = async (token: string) => {
  // Try to get the verification token
  try {
    // Get the verification token
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    // Return the verification token
    return verificationToken;
  } catch {
    // Return null if there is an error
    return null;
  }
};


// Get verification token by email
export const getVerificationTokenByEmail = async (email: string) => {
  // Try to get the verification token
  try {
    // Get the verification token
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    // Return the verification token
    return verificationToken;
  } catch {
    // Return null if there is an error
    return null;
  }
};


// Delete verification token by id
export const deleteVerificationTokenById = async (id: string) => {
  // Try to delete the verification token
  try {
    // Delete the verification token
    return await db.verificationToken.delete({
      where: { id },
    });
  } catch {
    // Return null if there is an error
    return null;
  }
};