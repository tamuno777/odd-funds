"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiLock, FiMail } from "react-icons/fi";

import { signIn } from "../api/auth/authUtils";
import { AuthContext } from "../context/authprovider";

export default function SignIn() {
  const router = useRouter();

  const { loading, setLoading, setUser } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { session, user } = await signIn(
        email,
        password
      );

      if (!session) {
        throw new Error("Session failed");
      }

      setUser({
        uid: user.uid,
        email: user.email ?? null,
        name: user.displayName ?? null,
      });

      router.push("/welcome");
    } catch (err) {
      console.error(err);

      setError(
        "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fbff] mx-auto max-w-7xl">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden lg:block">
          <Image
            src="/signup.jpeg"
            alt="Fundraising"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex flex-col justify-end p-14 text-white">
            <span className="mb-5 inline-flex w-fit rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              Welcome back
            </span>

            <h1 className="max-w-lg text-5xl font-bold leading-tight">
              Continue making a difference
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80">
              Sign in to manage campaigns, track donations,
              and stay connected with your supporters.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <span className="mb-4 inline-flex rounded-full bg-customPrimary/10 px-4 py-2 text-sm font-medium text-customPrimary">
                Sign in
              </span>

              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Sign in to continue supporting causes and
                managing your campaigns.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email address
                </label>

                <div className="flex h-14 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 transition focus-within:border-customPrimary">
                  <FiMail className="text-gray-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    disabled={loading}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="h-full w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="flex h-14 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 transition focus-within:border-customPrimary">
                  <FiLock className="text-gray-400" />

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    disabled={loading}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="h-full w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSignIn}
                disabled={loading}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-customPrimary text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign in
                    <FiArrowRight size={18} />
                  </>
                )}
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-customPrimary"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}