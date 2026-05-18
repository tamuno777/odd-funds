import {
  encode as defaultEncode,
  decode as defaultDecode,
} from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { signInSchema } from "@/lib/schema";
import type { NextAuthConfig } from "next-auth";

const adapter = PrismaAdapter(db);

const isUUID = (token: unknown): boolean =>
  typeof token === "string" &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(token);

export const jwtConfig: NextAuthConfig["jwt"] = {
  encode: async (params) => {
    if (params.token?.credentials) {
      const sessionToken = uuidv4();

      if (!params.token.sub) throw new Error("No user ID found in token");

      await adapter.createSession?.({
        sessionToken,
        userId: params.token.sub,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      return sessionToken;
    }

    return defaultEncode(params);
  },

  decode: async (params) => {
    if (isUUID(params.token)) {
      const session = await db.session.findUnique({
        where: { sessionToken: params.token as string },
        include: { user: true },
      });

      if (!session) return null;

      return {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        sub: session.user.id,
        credentials: true,
      };
    }

    return defaultDecode(params);
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validated = signInSchema.safeParse(credentials);
        if (!validated.success) throw new Error("Invalid credentials.");

        const { email, password } = validated.data;

        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.password) throw new Error("User not found.");

        const match = await compare(password, user.password);
        if (!match) throw new Error("Invalid password.");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },

  jwt: jwtConfig,
});
