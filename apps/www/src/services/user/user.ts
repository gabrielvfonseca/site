// Get, create, update, and delete user functions

// Import db instance
import { prisma } from "@site/prisma-config";

// Import prisma types
import { Prisma } from "@site/prisma-config";

// Types for updating a user
type UpdateUserType = Prisma.Args<typeof prisma.user, "update">["data"];

// Get user by email
export const getUserByEmail = async (email: string) => {
  // Try to get the user
  try {
    // Get the user
    const user = await prisma.user.findUnique({ where: { email } });

    // Return the user
    return user;
  } catch {
    // Return null if there is an error
    return null;
  }
};


// Get user by id
export const getUserById = async (id: string) => {
  // Try to get the user
  try {
    // Get the user
    const user = await prisma.user.findUnique({ where: { id } });

    // Return the user
    return user;
  } catch {
    // Return null if there is an error
    return null;
  }
};


// Create a new user
export const createUser = async (payload:any) => {
  // Try to create the user
  try {
    // Create the user and return it
    return await prisma.user.create({
      data: payload,
    });
  } catch {
    // Return null if there is an error
    return null;
  }
};


// Update a user by id
export const updateUserById = async (id: string, payload: UpdateUserType) => {
  // Try to update the user
  try {
    // Update the user and return it
    return await prisma.user.update({
      where: { id },
      data: payload,
    });
  } catch {
    // Return null if there is an error
    return null;
  }
};