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
  FiUsers,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";

import { Campaign } from "@/app/types/campaign";

export default function CampaignDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params?.id as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [processingDonation, setProcessingDonation] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/campaign/${campaignId}`);
        if (!res.ok) throw new Error("Failed to fetch campaign");
        
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

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !donorEmail) return;

    setProcessingDonation(true);
    const loadingToastId = toast.loading("Initializing secure checkout window...");

    try {
      const initRes = await fetch("/api/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          campaignId,
          donorName: donorName || "Anonymous",
          donorEmail,
          message,
        }),
      });

      const donationData = await initRes.json();
      if (!initRes.ok) throw new Error(donationData.error || "Initialization failed");

      const PaystackPop = (window as any).PaystackPop;
      if (!PaystackPop) {
        toast.error("Payment gateway script failed to load. Please refresh.", { id: loadingToastId });
        setProcessingDonation(false);
        return;
      }

      toast.dismiss(loadingToastId);

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_your_public_key",
        email: donorEmail,
        amount: Number(amount) * 100, 
        currency: "NGN",
        ref: donationData.reference, 
        onSuccess: async () => {
          const verifyToastId = toast.loading("Verifying ledger balance allocation...");
          
          const verifyRes = await fetch("/api/donation/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reference: donationData.reference,
              gatewayStatus: "success",
            }),
          });

          if (verifyRes.ok) {
            toast.success("Thank you for your generous contribution!", { id: verifyToastId, duration: 4000 });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error("Payment complete, but sync timed out. Our team will verify manually.", { id: verifyToastId, duration: 5000 });
            setProcessingDonation(false);
          }
        },
        onCancel: () => {
          toast.error("Donation process canceled.");
          setProcessingDonation(false);
        },
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An unexpected transaction fault occurred.", { id: loadingToastId });
      setProcessingDonation(false);
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
        <button 
          onClick={() => router.back()} 
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-customPrimary"
        >
          <FiArrowLeft /> Back to campaigns
        </button>

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
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
                alt={campaign.title || "Campaign visual representation"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] bg-white p-7 shadow-xl"
            >
              <h2 className="text-2xl font-black">Campaign Analytics</h2>

              <div className="mt-8">
                <div className="flex justify-between text-sm">
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

              <div className="mt-8 rounded-2xl bg-customPrimary p-6 text-white">
                <p className="text-sm opacity-90">Total Raised</p>
                <h3 className="text-3xl font-bold">
                  ₦{(campaign.raised || 0).toLocaleString()}
                </h3>
                <p className="text-xs mt-1 opacity-75">
                  Goal: ₦{(campaign.goal || 0).toLocaleString()}
                </p>
              </div>

              <div className="mt-6 space-y-4 border-t border-gray-100 pt-6 text-gray-600 text-sm">
                <div className="flex items-center gap-3">
                  <FiUsers className="text-customPrimary" /> 
                  <span><strong>{(campaign as any).donors || 0}</strong> contributors backer support</span>
                </div>

                <div className="flex items-center gap-3">
                  <FiClock className="text-customPrimary" /> 
                  <span>Launched {new Date(campaign.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FiDollarSign className="text-customPrimary" />
                  <span>
                    ₦{Math.max((campaign.goal || 0) - (campaign.raised || 0), 0).toLocaleString()} remaining to target
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-[2rem] bg-white p-7 shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Make a Contribution</h3>
              <form onSubmit={handleDonateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500">Amount (NGN)</label>
                  <input
                    type="number"
                    required
                    min="100"
                    placeholder="Minimum ₦100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-customPrimary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="donor@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-customPrimary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500">Display Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Anonymous"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-customPrimary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500">Support Message (Optional)</label>
                  <textarea
                    placeholder="Leave words of encouragement..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-customPrimary h-20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={processingDonation}
                  className="w-full py-3 bg-customPrimary hover:bg-customPrimary/90 text-white rounded-xl font-bold transition-all disabled:bg-gray-300"
                >
                  {processingDonation ? "Processing Payment..." : `Donate ₦${Number(amount || 0).toLocaleString()}`}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}