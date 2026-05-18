"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import AppHeading from "../Heading";
import TextHighlight from "../TextHighlight";

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
const RESUME_DELAY = 5000;

const StatsSection = () => {
  const [startCount, setStartCount] = useState(false);
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });
  useEffect(() => {
    if (inView) {
      setStartCount(false);
      setTimeout(() => setStartCount(true), 80);
    }
  }, [inView]);

  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: current * sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  }, [current]);

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

  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [startAutoPlay, stopAutoPlay]);


  const goToPage = useCallback(
    (index: number) => {
      stopAutoPlay();

      setCurrent(index);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        startAutoPlay();
      }, RESUME_DELAY);
    },
    [stopAutoPlay, startAutoPlay]
  );

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
    <section className="relative w-full overflow-hidden py-24">
      <div className="absolute inset-0">
        <img
          src="/aboutBanner.png"
          alt="background"
          className="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      <div ref={ref} className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="text-center text-white mb-14">
            <AppHeading as="h2" className="text-white">
              Trusted by{" "}
              <TextHighlight variant="primary">thousands</TextHighlight>,
              powered by{" "}
              <TextHighlight variant="primary">generosity</TextHighlight>
            </AppHeading>

            <p className="mt-3 text-sm md:text-base text-white/70 max-w-xl mx-auto">
              Real impact from real people supporting real causes.
            </p>
          </div>

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
                  className="min-w-full grid grid-cols-2 gap-4"
                >
                  {stats
                    .slice(pageIndex * 2, pageIndex * 2 + 2)
                    .map((stat, i) => (
                      <div
                        key={i}
                        className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-5 text-center text-white"
                      >
                        <div className="text-customPrimary flex justify-center">
                          {stat.icon}
                        </div>

                        <h2 className="text-2xl font-bold mt-2">
                          {startCount && (
                            <CountUp
                              start={0}
                              end={stat.value}
                              duration={2}
                            />
                          )}
                          {stat.suffix}
                        </h2>

                        <p className="text-sm font-medium mt-1">
                          {stat.label}
                        </p>
                        <p className="text-xs text-white/60">{stat.sub}</p>
                      </div>
                    ))}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`h-2 rounded-full transition-all ${current === i ? "w-6 bg-customPrimary" : "w-2 bg-white/40"
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-white flex flex-col items-center gap-3"
              >
                <div className="text-customPrimary">{stat.icon}</div>

                <h2 className="text-4xl font-bold">
                  {startCount && (
                    <CountUp start={0} end={stat.value} duration={2.5} />
                  )}
                  {stat.suffix}
                </h2>

                <p className="text-base font-semibold">{stat.label}</p>
                <p className="text-sm text-white/60">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;