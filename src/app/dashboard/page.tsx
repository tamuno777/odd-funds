"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  FiArrowRight,
  FiFolder,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";

export default function Dashboard() {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signIn");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <div className="text-sm text-gray-500">
          Loading dashboard...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fbff]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-customPrimary/10 px-4 py-2 text-sm font-medium text-customPrimary">
              Dashboard
            </span>

            <h1 className="mt-4 text-4xl font-bold text-gray-900">
              Welcome back
            </h1>

            <p className="mt-3 text-gray-500">
              Manage your campaigns, profile, and fundraising activities.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
            <p className="text-sm text-gray-500">
              Signed in as
            </p>

            <p className="font-semibold text-gray-900">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <FiFolder
                className="text-blue-600"
                size={24}
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Campaigns
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Create, edit, and manage all your fundraising campaigns in one place.
            </p>

            <button
              onClick={() =>
                router.push("/dashboard/campaigns")
              }
              className="mt-6 flex items-center gap-2 rounded-2xl bg-customPrimary px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              Manage campaigns
              <FiArrowRight />
            </button>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
              <FiSettings
                className="text-purple-600"
                size={24}
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Account Settings
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Update your personal information and account preferences.
            </p>

            <button
              onClick={() =>
                router.push("/dashboard/settings")
              }
              className="mt-6 flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Open settings
              <FiArrowRight />
            </button>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={async () => {
              await signOut({
                callbackUrl: "/signIn",
              });
            }}
            className="flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            <FiLogOut />
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
}