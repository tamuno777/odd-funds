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
        setUser({
          uid: user.uid,
          email: user.email ?? null,
          name: user.displayName ?? null, // Map displayName to name
        });
        router.push("/Welcome");
      } else {
        throw new Error("Session creation failed.");
      }
    } catch (err: unknown) {
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
    <div>
      <div className="flex h-screen bg-customPrimary px-10">
        {/* Image section (visible on large devices only) */}
        <div
          className="hidden lg:block lg:w-1/2  bg-cover bg-center"
          style={{ backgroundImage: "url('/signup.jpeg')" }}
        ></div>
        {/* Form section */}
        <div className="w-full lg:w-1/2 max-w-md m bg-customPrimary p-8 shadow-md flex flex-col items-center justify-center">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-6 text-white">
              Welcome Back !!!{" "}
            </h1>

            <div>
              <label className="font-semibold text-sm text-white pb-1 block">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-white pb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <div className="bg-red-500 text-white px-4 py-2 rounded mb-4 w-full text-center">
                {error}
              </div>
            )}
            <button
              onClick={handleSignIn}
              className={`w-full px-4 py-2 text-white rounded ${
                loading
                  ? "bg-custombutton-200 cursor-not-allowed"
                  : "bg-custombutton"
              }`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <p className="mt-4 text-center text-white">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-custombutton underline text-bold"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
