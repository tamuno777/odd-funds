/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";
import { signInSchema } from "@/lib/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const validated = signInSchema.safeParse(credentials);
        if (!validated.success) return null;

        const user = await db.user.findUnique({
          where: { email: validated.data.email },
        });

        if (!user || !user.password) return null;

        const match = await compare(
          validated.data.password,
          user.password
        );

        if (!match) return null;

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});