// This file is used to configure the authentication providers for the app.

// This file is used to configure the authentication providers for the app.
import { 
  GithubProvider, 
} from "@services/auth/providers";

// NextAuthConfig is an interface that defines the configuration options for NextAuth.
import type { NextAuthConfig } from "next-auth";

// authConfig is an object that defines the authentication providers for the app.
export default {
  providers: [
    GithubProvider, 
  ]
} satisfies NextAuthConfig;