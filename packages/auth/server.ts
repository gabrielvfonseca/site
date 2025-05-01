import 'server-only';

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { keys } from './keys';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', 
  }),
  emailAndPassword: {  
    enabled: true
  },
  socialProviders: { 
    github: { 
      clientId: keys().GITHUB_CLIENT_ID as string, 
      clientSecret: keys().GITHUB_CLIENT_SECRET as string, 
    }, 
  }, 
});