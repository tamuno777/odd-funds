"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../api/auth/authUtils";
import { AuthContext } from "../context/authprovider";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loading, setLoading, setUser } = useContext(AuthContext);

  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { session, user } = await signIn(email, password);
      if (session) {
        console.log("Session created successfully:", session);
        console.log("Session created successfully:", user);
        setUser(user);
        router.push("/Welcome");
      } else {
        throw new Error("Session creation failed.");
      }
    } catch (err: unknown) {
      // Safely narrow down to an error with a `message` property
      if (err instanceof Error) {
        console.error("SignIn Error:", err.message);
        setError("Failed to sign in. Please try again.");
      } else {
        console.error("Unknown error during sign-in:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded"
          disabled={loading}
        />
        <button
          onClick={handleSignIn}
          className={`w-full px-4 py-2 text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-500 underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
