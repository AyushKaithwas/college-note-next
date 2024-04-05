import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import { compare } from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { encrypt } from "./cred-auth";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google Client ID and/or Client Secret are not defined");
}

if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
  throw new Error("Linkedin Client ID and/or Client Secret are not defined");
}

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: { scope: "openid profile email" },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (
            user &&
            user.hashedPassword &&
            (await compare(credentials.password, user.hashedPassword))
          ) {
            const minimalData = {
              id: user.id,
              email: user.email,
              emailVerified: user.emailVerified,
              image: user.image,
              name: user.name,
            };

            return minimalData;
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", // Error code passed in query string as ?error=
  },
  adapter: PrismaAdapter(prisma),
} as AuthOptions;
