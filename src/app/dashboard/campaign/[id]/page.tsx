/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FiArrowLeft,
  FiEdit3,
  FiTrash2,
  FiShare2,
  FiUsers,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import DeleteCampaignModal from "@/app/components/modal/DeleteCampaignModal";
import EditCampaignModal from "@/app/components/modal/EditCampaignModal";
import { Campaign } from "@/app/types/campaign";

export default function CampaignDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const campaignId = params?.id as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
      } catch (err) {
        setError("Unable to load campaign");
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) fetchCampaign();
  }, [campaignId]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/campaigns/${campaignId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: campaign?.title,
          text: campaign?.description,
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      toast.success("Campaign link copied to clipboard!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy link or share campaign.");
    }
  };

  const handleDelete = async () => {
    const deleteToastId = toast.loading("Deleting campaign data...");
    try {
      setActionLoading(true);

      const res = await fetch(
        `/api/campaign/${campaignId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Campaign deleted successfully", { id: deleteToastId });
      router.push("/dashboard/campaign");
    } catch (err) {
      toast.error("Failed to delete campaign", { id: deleteToastId });
    } finally {
      setActionLoading(false);
      setDeleteOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-customPrimary" />
        <span className="text-sm font-medium text-gray-500">Loading campaign...</span>
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

  const progress = Math.min(((campaign.raised || 0) / (campaign.goal || 1)) * 100, 100);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fbff]">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-customPrimary/10 blur-3xl" />
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-16">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              onClick={() => router.push("/dashboard/campaign")}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-990"
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
            <button
              onClick={handleShare}
              className="flex h-12 items-center gap-2 rounded-2xl border bg-white px-5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FiShare2 />
              Share
            </button>

            <button
              onClick={() => setEditOpen(true)}
              className="flex h-12 items-center gap-2 rounded-2xl bg-customPrimary px-5 text-sm font-semibold text-white hover:bg-customPrimary/90 transition-colors"
            >
              <FiEdit3 />
              Edit
            </button>

            <button
              onClick={() => setDeleteOpen(true)}
              className="flex h-12 items-center gap-2 rounded-2xl bg-red-50 border border-red-200 px-5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              <FiTrash2 />
              Delete
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_420px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-[2rem] bg-white shadow-xl h-fit"
          >
            <div className="relative h-[420px] w-full">
              <Image
                src={campaign.image || "/placeholder.jpg"}
                alt={campaign.title || "Campaign representation"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] bg-white p-7 shadow-xl"
          >
            <h2 className="text-2xl font-black text-gray-900">
              Campaign Analytics
            </h2>

            <div className="mt-8">
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>Progress</span>
                <span>{Math.floor(progress)}%</span>
              </div>

              <div className="mt-2 h-3 rounded-full bg-gray-100">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full rounded-full bg-customPrimary transition-all duration-500"
                />
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-customPrimary p-6 text-white shadow-lg shadow-customPrimary/20">
              <p className="text-sm opacity-90">Total Raised</p>
              <h3 className="text-3xl font-bold mt-1">
                ₦{(campaign.raised || 0).toLocaleString()}
              </h3>
              <p className="text-xs opacity-75 mt-2">
                Goal: ₦{(campaign.goal || 0).toLocaleString()}
              </p>
            </div>

            <div className="mt-6 space-y-4 border-t border-gray-100 pt-6 text-gray-600 text-sm font-medium">
              <div className="flex items-center gap-3">
                <FiUsers className="text-customPrimary" size={18} />
                <span>{(campaign as any).donors || 0} contributors support</span>
              </div>

              <div className="flex items-center gap-3">
                <FiClock className="text-customPrimary" size={18} />
                <span>Launched {new Date(campaign.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-3">
                <FiDollarSign className="text-customPrimary" size={18} />
                <span>
                  ₦{Math.max((campaign.goal || 0) - (campaign.raised || 0), 0).toLocaleString()} remaining to target
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <EditCampaignModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        campaign={campaign}
        onUpdated={(updatedCampaign) => {
          setCampaign(updatedCampaign);
          toast.success("Campaign details synced successfully!");
        }}
      />

      <DeleteCampaignModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
        loading={actionLoading}
      />
    </main>
  );
}