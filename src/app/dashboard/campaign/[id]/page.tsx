"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  FiArrowLeft,
  FiEdit3,
  FiTrash2,
  FiShare2,
  FiUsers,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";

type Campaign = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  goal: number;
  raised: number;
  donors?: number;
  status: string;
  createdAt: string;
};

export default function CampaignDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const campaignId = params?.id as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/campaign/${campaignId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch campaign");
        }

        const data = await res.json();
        setCampaign(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Unable to load campaign");
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) fetchCampaign();
  }, [campaignId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading campaign...
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        {error || "Campaign not found"}
      </div>
    );
  }

  const progress =
    (campaign.raised / campaign.goal) * 100;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fbff]">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-customPrimary/10 blur-3xl" />
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-16">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              onClick={() => router.push("/dashboard/campaign")}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              <FiArrowLeft size={16} />
              Back to campaigns
            </button>

            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              {campaign.status}
            </span>

            <h1 className="mt-5 max-w-4xl text-4xl font-black text-gray-900 md:text-5xl">
              {campaign.title}
            </h1>

            <p className="mt-4 max-w-3xl text-gray-500">
              {campaign.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex h-12 items-center gap-2 rounded-2xl border px-5 text-sm">
              <FiShare2 />
              Share
            </button>

            <button className="flex h-12 items-center gap-2 rounded-2xl bg-customPrimary px-5 text-sm text-white">
              <FiEdit3 />
              Edit
            </button>

            <button className="flex h-12 items-center gap-2 rounded-2xl bg-red-50 px-5 text-sm text-red-600">
              <FiTrash2 />
              Delete
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_420px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-[2rem] bg-white shadow-xl"
          >
            <div className="relative h-[420px] w-full">
              <Image
                src={
                  campaign.image ||
                  "/placeholder.jpg"
                }
                alt={campaign.title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] bg-white p-7 shadow-xl"
          >
            <h2 className="text-2xl font-black">
              Campaign Analytics
            </h2>

            <div className="mt-8">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.floor(progress)}%</span>
              </div>

              <div className="mt-2 h-3 rounded-full bg-gray-100">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full rounded-full bg-customPrimary"
                />
              </div>
            </div>

            {/* TOTAL */}
            <div className="mt-8 rounded-2xl bg-customPrimary p-6 text-white">
              <p>Total Raised</p>
              <h3 className="text-3xl font-bold">
                ₦{campaign.raised.toLocaleString()}
              </h3>
              <p>
                Goal: ₦
                {campaign.goal.toLocaleString()}
              </p>
            </div>

            {/* METRICS */}
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <FiUsers /> {campaign.donors || 0}
              </div>

              <div className="flex justify-between">
                <FiClock /> {campaign.createdAt}
              </div>

              <div className="flex justify-between">
                <FiDollarSign />
                ₦
                {(
                  campaign.goal - campaign.raised
                ).toLocaleString()}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}