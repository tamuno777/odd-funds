"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import {
  FiArrowRight,
  FiCalendar,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "../../../firbase.config";

import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleSignUp = async () => {
    if (!name || !dob || !email || !password) {
      setErrorMessage(
        "Please complete all required fields."
      );

      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        dob,
        createdAt: new Date().toISOString(),
      });

      router.push("/signin");
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fbff]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT */}
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
              Join our community
            </span>

            <h1 className="max-w-lg text-5xl font-bold leading-tight">
              Start changing lives today
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80">
              Launch campaigns, support causes, and become
              part of a growing community creating real
              impact.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <span className="mb-4 inline-flex rounded-full bg-customPrimary/10 px-4 py-2 text-sm font-medium text-customPrimary">
                Create account
              </span>

              <h2 className="text-3xl font-bold text-gray-900">
                Join OddFund
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Create your account and start fundraising
                or supporting meaningful causes.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
                {errorMessage}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full name
                </label>

                <div className="flex h-14 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 transition focus-within:border-customPrimary">
                  <FiUser className="text-gray-400" />

                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    disabled={loading}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="h-full w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
                    value={password}
                    disabled={loading}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="h-full w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Date of birth
                </label>

                <div className="flex h-14 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 transition focus-within:border-customPrimary">
                  <FiCalendar className="text-gray-400" />

                  <input
                    type="date"
                    value={dob}
                    disabled={loading}
                    onChange={(e) =>
                      setDob(e.target.value)
                    }
                    className="h-full w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>


              <button
                onClick={handleSignUp}
                disabled={loading}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-customPrimary text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  "Creating account..."
                ) : (
                  <>
                    Create account
                    <FiArrowRight size={18} />
                  </>
                )}
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="signIn"
                className="font-semibold text-customPrimary"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}