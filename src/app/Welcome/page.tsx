"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  FiArrowRight,
  FiHeart,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

export default function WelcomePage() {
  const router = useRouter();

  const { data: session, status } =
    useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-customPrimary border-t-transparent" />

          <p className="text-sm text-gray-500">
            Loading your experience...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fbff]">
      <section className="relative">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-customPrimary/10 blur-3xl" />

        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-20 lg:px-16">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="max-w-3xl"
          >
            <span className="inline-flex rounded-full bg-customPrimary/10 px-4 py-2 text-sm font-medium text-customPrimary">
              Welcome back
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900 md:text-7xl">
              Fund ideas.
              <br />
              Change lives.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              Launch meaningful campaigns, connect
              with supporters, and create real-world
              impact through community fundraising.
            </p>

            {session?.user?.name && (
              <div className="mt-6 inline-flex items-center rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
                <span className="text-sm text-gray-500">
                  Signed in as
                </span>

                <span className="ml-2 font-semibold text-gray-900">
                  {session.user.name}
                </span>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-customPrimary px-8 text-sm font-semibold text-white transition hover:scale-[1.02] hover:text-white"
              >
                Go to Dashboard
                <FiArrowRight size={18} />
              </Link>

              <Link
                href="/dashboard/campaign"
                className="flex h-14 items-center justify-center rounded-2xl border border-gray-200 bg-white px-8 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-white"
              >
                Explore Campaigns
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
            className="mt-16 grid gap-5 md:grid-cols-3"
          >
            <div className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100">
                <FiHeart
                  className="text-pink-600"
                  size={24}
                />
              </div>

              <h3 className="mt-6 text-3xl font-black text-gray-900">
                120+
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Active fundraisers helping people
                globally.
              </p>
            </div>

            <div className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <FiUsers
                  className="text-blue-600"
                  size={24}
                />
              </div>

              <h3 className="mt-6 text-3xl font-black text-gray-900">
                8K+
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Supporters actively contributing to
                causes.
              </p>
            </div>

            <div className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                <FiTrendingUp
                  className="text-green-600"
                  size={24}
                />
              </div>

              <h3 className="mt-6 text-3xl font-black text-gray-900">
                ₦25M+
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Successfully raised through community
                support.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}