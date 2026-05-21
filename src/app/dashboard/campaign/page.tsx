/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiFolder,
  FiPlus,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";

interface Campaign {
  id: string; 
  title: string; 
  status: string;
  raised: number;
  goal: number;
  image?: string;
  description?: string;
}

export default function CampaignsPage() {
  const router = useRouter();
  
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        setIsLoading(true);
        setErrorMsg(null);
        
        const res = await fetch("/api/campaign");
        
        if (!res.ok) {
          throw new Error(`Failed to load campaigns: ${res.statusText}`);
        }
        
        const data = await res.json();
        
        setCampaigns(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        setErrorMsg(err?.message || "Something went wrong while retrieving data.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  const totalRaised = campaigns.reduce(
    (acc, item) => acc + (item.raised || 0),
    0
  );

  const activeCount = campaigns.filter(
    (item) => item.status?.toLowerCase() === "active"
  ).length;

  return (
    <main className="min-h-screen bg-[#f8fbff] overflow-hidden relative">
      {/* BG Shadows */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-customPrimary/10 blur-3xl" />
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-16">
        {/* TOP PANEL */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              onClick={() => router.push("/dashboard")}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              <FiArrowLeft size={16} />
              Back to dashboard
            </button>

            <br />
            <span className="inline-flex rounded-full bg-customPrimary/10 px-4 py-2 text-sm font-medium text-customPrimary">
              Campaign Management
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
              Your Campaigns
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-500">
              Manage active fundraisers, monitor donations,
              and launch new campaigns.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/campaign/new")}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-customPrimary px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
          >
            <FiPlus size={18} />
            New Campaign
          </button>
        </div>

        {/* ERROR MESSAGE NOTIFICATION */}
        {errorMsg && (
          <div className="mb-8 rounded-2xl bg-red-50 p-4 border border-red-200 text-sm font-medium text-red-600">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* METRICS PANELS */}
        <div className="mb-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <FiFolder className="text-blue-600" size={24} />
            </div>
            <h3 className="mt-6 text-3xl font-black text-gray-900">
              {isLoading ? "..." : campaigns.length}
            </h3>
            <p className="mt-2 text-sm text-gray-500">Total campaigns created</p>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
              <FiTrendingUp className="text-green-600" size={24} />
            </div>
            <h3 className="mt-6 text-3xl font-black text-gray-900">
              ₦{isLoading ? "0" : totalRaised.toLocaleString()}
            </h3>
            <p className="mt-2 text-sm text-gray-500">Total raised funds</p>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
              <FiClock className="text-orange-600" size={24} />
            </div>
            <h3 className="mt-6 text-3xl font-black text-gray-900">
              {isLoading ? "..." : activeCount}
            </h3>
            <p className="mt-2 text-sm text-gray-500">Active campaigns</p>
          </div>
        </div>

        {/* CORE INTERFACE FEED */}
        {isLoading ? (
          /* LOADING WHEEL / GLOW BLOCKS STATE */
          <div className="flex flex-col items-center justify-center py-20 bg-white/40 rounded-[2rem] border border-white/60 backdrop-blur-sm">
            <FiLoader className="text-customPrimary animate-spin mb-4" size={32} />
            <p className="text-sm font-semibold text-gray-500">Syncing database entries...</p>
          </div>
        ) : campaigns.length === 0 ? (
          /* EMPTY FALLBACK CONTAINER */
          <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white/70 p-14 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-customPrimary/10 text-customPrimary">
              <FiFolder size={34} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No campaigns yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              Start your first fundraiser and begin
              receiving support from donors worldwide.
            </p>

            <button
              onClick={() => router.push("/dashboard/campaigns/new")}
              className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-customPrimary px-6 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              <FiPlus />
              Create Campaign
            </button>
          </div>
        ) : (
          /* RENDER GRID CARDS FROM DATABASE */
          <div className="grid gap-6 lg:grid-cols-2">
            {campaigns.map((campaign, index) => {
              const currentGoal = campaign.goal || 1; // Safeguard division-by-zero bounds
              const currentRaised = campaign.raised || 0;
              const progress = Math.min((currentRaised / currentGoal) * 100, 100);

              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[2rem] border border-white/60 bg-white/80 p-7 shadow-xl backdrop-blur-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 overflow-hidden shrink-0">
                        {campaign.image ? (
                          <img 
                            src={campaign.image} 
                            alt={campaign.title} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FiFolder className="text-blue-600" size={24} />
                        )}
                      </div>

                      <button 
                        onClick={() => router.push(`/dashboard/campaign/${campaign.id}`)}
                        className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        Manage
                      </button>
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-gray-900 line-clamp-1">
                      {campaign.title} {/* Changed from name to title */}
                    </h2>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 capitalize">
                      <FiCheckCircle size={12} />
                      {campaign.status || "Active"}
                    </div>
                  </div>

                  {/* PROGRESS INDICATOR TRACKER */}
                  <div className="mt-8">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500">Raised</span>
                      <span className="text-sm font-bold text-gray-900">
                        {"₦"}{currentRaised.toLocaleString()}
                        {" / "}
                        {"₦"}{currentGoal.toLocaleString()}
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                      <div
                        style={{ width: `${progress}%` }}
                        className="h-full rounded-full bg-customPrimary transition-all duration-500"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}