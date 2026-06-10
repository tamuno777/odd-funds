"use client";

import { useState } from "react";

const presetAmounts = [1000, 2000, 5000, 10000, 20000];

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function DonationAmount({ value, onChange }: Props) {
  const [custom, setCustom] = useState("");

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-800">
        Choose amount
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => onChange(amount)}
            className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
              value === amount
                ? "border-customPrimary bg-customPrimary text-white"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            ₦{amount.toLocaleString()}
          </button>
        ))}
      </div>

      <input
        type="number"
        placeholder="Custom amount"
        value={custom}
        onChange={(e) => {
          setCustom(e.target.value);
          onChange(Number(e.target.value));
        }}
        className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-customPrimary"
      />
    </div>
  );
}