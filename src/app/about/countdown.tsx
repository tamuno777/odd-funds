"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import AppHeading from "../components/Heading";
import TextHighlight from "../components/TextHighlight";

import {
  FaGlobe,
  FaHandsHelping,
  FaRegMoneyBillAlt,
  FaDonate,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaGlobe size={38} />,
    value: 83,
    label: "Countries reached",
    sub: "Global support",
    suffix: "+",
  },
  {
    icon: <FaHandsHelping size={38} />,
    value: 470,
    label: "Campaigns",
    sub: "Active fundraisers",
    suffix: "+",
  },
  {
    icon: <FaRegMoneyBillAlt size={38} />,
    value: 490,
    label: "Funds raised",
    sub: "Donations made",
    suffix: "K",
  },
  {
    icon: <FaDonate size={38} />,
    value: 421,
    label: "Payouts",
    sub: "Successfully delivered",
    suffix: "K",
  },
];

const TOTAL_PAGES = Math.ceil(stats.length / 2);
const AUTO_INTERVAL = 3500;
const RESUME_DELAY = 5000; // resume auto-play 5s after last user interaction

const StatsSection = () => {
  const [startCount, setStartCount] = useState(false);
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // We store the auto-play timer and resume timer in refs so we can
  // clear/restart them without causing re-renders
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Touch/swipe tracking
  const touchStartX = useRef<number | null>(null);

  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

  // Count-up animation trigger
  useEffect(() => {
    if (inView) {
      setStartCount(false);
      setTimeout(() => setStartCount(true), 80);
    }
  }, [inView]);

  // Sync scroll position whenever `current` changes
  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: current * sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  }, [current]);

  // --- Auto-play helpers ---

  const stopAutoPlay = useCallback(() => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoTimerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TOTAL_PAGES);
    }, AUTO_INTERVAL);
  }, [stopAutoPlay]);

  // Start auto-play on mount; clean up on unmount
  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [startAutoPlay, stopAutoPlay]);

  // --- User interaction handler ---
  // Stops auto-play immediately, applies the user's choice,
  // then restarts auto-play after RESUME_DELAY.
  const goToPage = useCallback(
    (index: number) => {
      // 1. Kill the running interval so it can't overwrite us
      stopAutoPlay();

      // 2. Apply user's choice
      setCurrent(index);

      // 3. Clear any pending resume and schedule a fresh one
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        startAutoPlay();
      }, RESUME_DELAY);
    },
    [stopAutoPlay, startAutoPlay]
  );

  // --- Swipe handlers ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      const next =
        delta > 0
          ? (current + 1) % TOTAL_PAGES
          : (current - 1 + TOTAL_PAGES) % TOTAL_PAGES;
      goToPage(next);
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/aboutBanner.png"
          className="w-full h-full object-cover"
          alt="bg"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div className="text-center text-white mb-12">
          <AppHeading as="h2" variant="default">
            Trusted by{" "}
            <TextHighlight variant="primary">thousands</TextHighlight>, powered
            by <TextHighlight variant="primary">generosity</TextHighlight>
          </AppHeading>
          <p className="text-gray-200 text-sm md:text-mdmax-w-xl mx-auto">
            Real impact from real people supporting real causes.
          </p>
        </div>

        {/* ===== MOBILE CAROUSEL ===== */}
        <div className="md:hidden">
          <div
            ref={sliderRef}
            className="flex overflow-hidden scroll-smooth"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {Array.from({ length: TOTAL_PAGES }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="min-w-full grid grid-cols-2 gap-4 px-2"
              >
                {stats
                  .slice(pageIndex * 2, pageIndex * 2 + 2)
                  .map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center text-white flex flex-col items-center gap-2"
                    >
                      <div className="text-customPrimary">{stat.icon}</div>
                      <h2 className="text-xl font-bold">
                        {startCount && (
                          <CountUp start={0} end={stat.value} duration={2} />
                        )}
                        {stat.suffix}
                      </h2>
                      <p className="text-sm font-medium">{stat.label}</p>
                      <p className="text-xs text-gray-300">{stat.sub}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i ? "w-6 bg-customPrimary" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ===== DESKTOP GRID ===== */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="text-white flex flex-col items-center gap-3">
              <div className="text-customPrimary">{stat.icon}</div>
              <h2 className="text-3xl font-bold">
                {startCount && (
                  <CountUp start={0} end={stat.value} duration={2.5} />
                )}
                {stat.suffix}
              </h2>
              <p className="text-mdfont-semibold">{stat.label}</p>
              <p className="text-sm text-gray-300">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;