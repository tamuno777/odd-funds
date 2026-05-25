/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"; 
import { compare } from "bcryptjs";
import { db } from "@/lib/db";
import { signInSchema } from "@/lib/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),

  session: {
    strategy: "jwt",
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      // 2. ALLOW AUTOMATIC LINKING IF EMAIL MATCHES EXISTING CREDENTIALS ACCOUNTS
      allowDangerousEmailAccountLinking: true,
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
    async jwt({ token, user, account }) {
      // If user logs in via OAuth, find the real DB record using the adapter sync
      if (account && account.provider !== "credentials" && token.email) {
        const dbUser = await db.user.findUnique({
          where: { email: token.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      } else if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "user";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "user";
      }
      return session;
    },
  },
});