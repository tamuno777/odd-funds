"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  FiArrowLeft,
  FiCalendar,
  FiMail,
  FiUser,
} from "react-icons/fi";

export default function Settings() {
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-[#f8fbff]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <FiArrowLeft />
          Back to dashboard
        </button>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <span className="inline-flex rounded-full bg-customPrimary/10 px-4 py-2 text-sm font-medium text-customPrimary">
            Account Settings
          </span>

          <h1 className="mt-5 text-4xl font-bold text-gray-900">
            Personal Information
          </h1>

          <p className="mt-3 text-gray-500">
            Manage your account details and personal information.
          </p>

          <div className="mt-10 space-y-5">
            <div className="rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <FiUser className="text-gray-400" />

                <div>
                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <p className="font-semibold text-gray-900">
                    {session?.user?.name || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <FiMail className="text-gray-400" />

                <div>
                  <p className="text-sm text-gray-500">
                    Email Address
                  </p>

                  <p className="font-semibold text-gray-900">
                    {session?.user?.email || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <FiCalendar className="text-gray-400" />

                <div>
                  <p className="text-sm text-gray-500">
                    Date of Birth
                  </p>

                  <p className="font-semibold text-gray-900">
                    Add DOB support from session later
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-8 rounded-2xl bg-customPrimary px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]">
            Update profile
          </button>
        </div>
      </div>
    </main>
  );
}