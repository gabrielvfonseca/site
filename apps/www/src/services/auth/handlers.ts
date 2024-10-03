// This file is used to configure the authentication providers for the app.

// Import NextAuth from the next-auth module
import NextAuth from "next-auth";

// Use authConfig to configure the authentication providers for the app
import AuthConfig from "./config";

// Import PrismaAdapter from the @auth/prisma-adapter module
import { PrismaAdapter } from "@auth/prisma-adapter";

// Db is used to connect to the database
import { prisma } from "@site/prisma-config";

// Import the getUserById and updateUserById functions
import { getUserById, updateUserById } from "@services/user/user";

// Import the getAccountByUserId function
import { getAccountByUserId } from "@services/account/account";

// Adapter type is used to define the adapter for the app
import type { Adapter } from "next-auth/adapters";

// Export the handlers, auth, signIn, signOut, and update functions
export const { 
  handlers: { GET, POST },
  signIn, 
  signOut, 
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 Day
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    // Link the account to the user
    async linkAccount({ user }: { user: any }) {
      // Update the user with the account id
      await updateUserById(user.id, { emailVerified: new Date() });
    },
  },
  callbacks: {
    // Get the user's information from the token
    async jwt({ token }: { token: any }) {
      // If the token doesn't have a sub, return the token
      if (!token.sub) return token;

      // Get the user by the id
      const existingUser = await getUserById(token.sub);

      // If the user doesn't exist, return the token
      if (!existingUser) return token;

      // Get the account by the user id
      const existingAccount = await getAccountByUserId(existingUser.id);

      // Update the token with the user's information
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.isOAuth = !!existingAccount; // Check if the account exists

      // Return the token
      return token;
    },
    async session({ token, session }: { token: any; session: any }) {
      // If the token doesn't have a sub, return the session
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // If the token has a role and the user exists, update the user's role
      if (token.role && session.user) {
        session.user.role = token.role;
      }

      // If the token has a name and email, update the user's name and email
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
        session.user.isOAuth = token.isOAuth;
      }

      // Return the session
      return session;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      // If the account provider is not credentials, return true
      if (account?.provider !== "credentials") return true;

      // Get the user by the id
      const existingUser = await getUserById(user.id);
      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      // Return true if the user exists
      return true;
    },
  },
  ...AuthConfig,
});