"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-customPrimarySoft blur-3xl opacity-60" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-xl font-bold text-customPrimary">
          <div className="w-8 h-8 rounded-lg bg-customPrimary flex items-center justify-center">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
                  fill="#fff"
                />
              </svg>
            </div>
          ODDFUND
        </div>

        <div className="w-40 h-1.5 bg-customPrimarySoft rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-customPrimary animate-loading-bar rounded-full" />
        </div>

        <p className="text-sm text-customGray animate-pulse">
          Loading experience...
        </p>
      </div>
    </div>
  );
};

export default Loading;