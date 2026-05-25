import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/signIn",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
  async jwt({ token, user, account }) {
    if (user) {
      token.id   = user.id;  
      token.role = (user as { role?: string }).role ?? "user";
    }

    if (account?.provider === "credentials") {
      token.credentials = true;
    }

    return token;
  },

  async session({ session, token }) {
    if (session.user && token.id) {
      session.user.id   = token.id as string;
      session.user.role = (token.role as string) ?? "user";
    }
    return session;
  },
},
  session: { strategy: "jwt" },
};