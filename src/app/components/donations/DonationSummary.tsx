"use client";

interface Props {
  campaignTitle: string;
  amount: number;
}

export default function DonationSummary({
  campaignTitle,
  amount,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800">
        Donation Summary
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        Supporting: {campaignTitle}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">Amount</span>
        <span className="text-lg font-bold text-gray-900">
          ₦{amount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}