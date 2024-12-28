import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firbase.config";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("Missing credentials");
          throw new Error("Missing credentials");
        }

        const { email, password } = credentials;

        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("User authorized via NextAuth:", userCredential.user);
          return { id: userCredential.user.uid, email: userCredential.user.email };
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("NextAuth authorize error:", error.message);
            throw new Error("Invalid email or password");
          }
          console.error("Unexpected error during authorization:", error);
          throw new Error("An unknown error occurred during sign-in.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "fallbackSecret",
  pages: {
    signIn: "/signIn",
    error: "/api/auth/error",
  },
};

export default NextAuth(authOptions);
