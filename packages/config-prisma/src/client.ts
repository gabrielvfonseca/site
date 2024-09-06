import { PrismaClient } from "@prisma/client";

// Create a new prisma client
export const prisma = global.prisma || new PrismaClient();

// If we're in development, let's set the global prisma object
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// Export the prisma client
export * from "@prisma/client";

// Export the prisma client
export default prisma;