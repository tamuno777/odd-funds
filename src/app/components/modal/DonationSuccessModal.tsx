"use client";

export default function DonationSuccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          ✓
        </div>

        <h2 className="mt-5 text-xl font-bold">
          Donation Successful
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Thank you for supporting this campaign.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-customPrimary py-3 text-white"
        >
          Done
        </button>
      </div>
    </div>
  );
}