"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg text-center bg-white shadow-lg rounded-2xl p-8 sm:p-10">
        
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <span className="text-3xl">⚠️</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
          We encountered an unexpected error while loading this page.  
          Please try again or return to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          
          <button
            onClick={() => router.refresh()}
            className="px-5 py-3 rounded-lg bg-customPrimary text-white font-medium hover:opacity-90 transition"
          >
            Try Again
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Go Home
          </button>
        </div>

        {/* Optional small footer text */}
        <p className="text-xs text-gray-400 mt-6">
          If this continues, contact support.
        </p>
      </div>
    </div>
  );
};

export default Error;