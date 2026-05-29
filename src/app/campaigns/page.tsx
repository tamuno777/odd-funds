"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import {
  FiArrowRight,
  FiClock,
  FiHeart,
  FiSearch,
  FiTrendingUp,
  FiUsers,
  FiLoader,
} from "react-icons/fi";

interface Campaign {
  id: string;
  title: string;
  description?: string;
  image?: string;
  goal: number;
  raised?: number;
  createdAt?: string;
  category?: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/campaigns");

        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }

        const data = await response.json();

        setCampaigns(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) =>
      campaign.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [campaigns, search]);

  const totalRaised = campaigns.reduce(
    (acc, item) => acc + (item.raised || 0),
    0
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fbff]">
      {/* BG */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-customPrimary/10 blur-3xl" />

      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-16">
        {/* HERO */}
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-customPrimary/10 px-4 py-2 text-sm font-medium text-customPrimary">
              Explore campaigns
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
              Discover causes worth supporting
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-500">
              Support impactful fundraisers,
              contribute to meaningful causes,
              and help communities around the
              world.
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex h-14 w-full max-w-md items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-5 shadow-xl backdrop-blur-xl">
            <FiSearch
              className="text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-full w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="mb-12 grid gap-5 md:grid-cols-3">
          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100">
              <FiHeart
                className="text-pink-600"
                size={24}
              />
            </div>

            <h2 className="mt-6 text-4xl font-black text-gray-900">
              {campaigns.length}+
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Active campaigns changing lives.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <FiUsers
                className="text-blue-600"
                size={24}
              />
            </div>

            <h2 className="mt-6 text-4xl font-black text-gray-900">
              {campaigns.length * 12}+
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Supporters actively donating.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
              <FiTrendingUp
                className="text-green-600"
                size={24}
              />
            </div>

            <h2 className="mt-6 text-4xl font-black text-gray-900">
              ₦{totalRaised.toLocaleString()}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Raised across all campaigns.
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <FiLoader
              className="animate-spin text-customPrimary"
              size={32}
            />
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white/70 p-14 text-center backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-gray-900">
              No campaigns found
            </h2>

            <p className="mt-3 text-gray-500">
              Try another search keyword.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCampaigns.map(
              (campaign, index) => {
                const raised =
                  campaign.raised || 0;

                const goal =
                  campaign.goal || 1;

                const progress =
                  (raised / goal) * 100;

                return (
                  <motion.div
                    key={campaign.id}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="group overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-xl backdrop-blur-xl"
                  >
                    {/* IMAGE */}
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      {campaign.image ? (
                        <Image
                          src={campaign.image}
                          alt={campaign.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                          No Image
                        </div>
                      )}

                      <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-900 backdrop-blur-md">
                        {campaign.category ||
                          "Fundraiser"}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      <h2 className="line-clamp-2 text-2xl font-black text-gray-900">
                        {campaign.title}
                      </h2>

                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">
                        {campaign.description}
                      </p>

                      {/* STATS */}
                      <div className="mt-5 flex items-center gap-5 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <FiUsers size={15} />

                          <span>
                            {(index + 1) * 8} donors
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <FiClock size={15} />

                          <span>
                            {10 + index} days left
                          </span>
                        </div>
                      </div>

                      {/* MONEY */}
                      <div className="mt-6">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">
                            Raised
                          </span>

                          <span className="text-sm font-bold text-gray-900">
                            ₦
                            {raised.toLocaleString()}
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                          <div
                            style={{
                              width: `${Math.min(
                                progress,
                                100
                              )}%`,
                            }}
                            className="h-full rounded-full bg-customPrimary"
                          />
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                          <span>
                            Goal: ₦
                            {goal.toLocaleString()}
                          </span>

                          <span>
                            {Math.floor(progress)}%
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/campaigns/${campaign.id}`}
                        className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-customPrimary text-sm font-semibold text-white transition hover:scale-[1.01]"
                      >
                        View Campaign
                        <FiArrowRight size={18} />
                      </Link>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        )}
      </div>
    </main>
  );
}