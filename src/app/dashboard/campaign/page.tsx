"use client";

import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiFolder,
  FiPlus,
} from "react-icons/fi";

interface Campaign {
  id: number;
  name: string;
  status: string;
}

export default function Campaigns() {
  const router = useRouter();

  const campaigns: Campaign[] = [
    {
      id: 1,
      name: "Help Build a Community School",
      status: "Active",
    },
    {
      id: 2,
      name: "Medical Support Campaign",
      status: "Pending",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8fbff]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              onClick={() => router.push("/dashboard")}
              className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-white"
            >
              <FiArrowLeft />
              Back to dashboard
            </button>

            <h1 className="text-4xl font-bold text-gray-900">
              Your Campaigns
            </h1>

            <p className="mt-3 text-gray-500">
              Create and manage fundraising campaigns.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-customPrimary px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
            <FiPlus />
            New Campaign
          </button>
        </div>

        <div className="grid gap-5">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                    <FiFolder
                      className="text-blue-600"
                      size={20}
                    />
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-gray-900">
                    {campaign.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Status: {campaign.status}
                  </p>
                </div>

                <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}