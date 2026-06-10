"use client";

import DonationForm from "../donations/DonationForm";
import DonationSummary from "../donations/DonationSummary";

interface Props {
  open: boolean;
  onClose: () => void;
  campaignTitle: string;
  campaignId: string; 
  userId?: string;    
}

export default function DonateModal({
  open,
  onClose,
  campaignTitle,
  campaignId,
  userId,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Donate to Campaign
          </h2>

          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            Close
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_280px]">
          <DonationForm
            campaignId={campaignId}
            campaignTitle={campaignTitle}
            userId={userId}
          />

          <DonationSummary
            campaignTitle={campaignTitle}
            amount={1000}
          />
        </div>
      </div>
    </div>
  );
}