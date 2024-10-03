// Providers for NextAuth

// Import the providers from NextAuth
import Github from "next-auth/providers/github";

// Export the providers for the app
export const GithubProvider = Github({
  clientId: process.env.GITHUB_ID as string,
  clientSecret: process.env.GITHUB_SECRET as string,
});