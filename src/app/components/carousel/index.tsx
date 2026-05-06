"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FiArrowRight,
  FiArrowLeft,
  FiTarget,
} from "react-icons/fi";
import { FaHeart, FaRocket, FaCheckCircle } from "react-icons/fa";
import { HiChartBar } from "react-icons/hi";
import PrimaryLink from "../Link";
import SectionBackground from "../sectionBackground";

const slides = [
  {
    badge: "Trusted by thousands",
    title: ["Make ", "real change", " today"],
    titleAccent: [false, true, false],
    sub: "Start a campaign, donate to causes you care about, and track every naira in real time.",
    cta1: "Start a Campaign",
    cta1Route: "/signup",
    cta2: "Explore Campaigns",
    cta2Route: "/campaigns",
    stats: [
      { num: "₦2B+", label: "Raised so far" },
      { num: "18K+", label: "Campaigns funded" },
    ],
    image: "/hero1.png",
    floatLeft: { icon: FaHeart, label: "New donation", val: "₦50,000" },
    floatRight: { icon: FiTarget, label: "Goal reached", val: "94%" },
  },

  {
    badge: "Give with confidence",
    title: ["Every gift changes a ", "life", ""],
    titleAccent: [false, true, false],
    sub: "From ₦500 to millions,  your support reaches real people with full transparency and trust.",
    cta1: "Donate Now",
    cta1Route: "/campaigns",
    cta2: "See Impact Stories",
    cta2Route: "/about",
    stats: [
      { num: "98%", label: "Funds delivered" },
      { num: "24H", label: "Average payout" },
    ],
    image: "/hero2.jpg",
    floatLeft: { icon: FaCheckCircle, label: "Verified campaigns", val: "Safe to give" },
    floatRight: { icon: FaHeart, label: "Active supporters", val: "1,203" },
  },

  {
    badge: "Join our mission",
    title: ["Building a ", "better world", ""],
    titleAccent: [false, true, false],
    sub: "Launch a campaign in minutes and join a community driving real impact together.",
    cta1: "Get Started it's free",
    cta1Route: "/signup",
    cta2: "How it works",
    cta2Route: "/about",
    stats: [
      { num: "3 min", label: "To launch" },
      { num: "0%", label: "Platform fee" },
    ],
    image: "/hero1.png",
    floatLeft: { icon: FaRocket, label: "Just launched", val: "Live now" },
    floatRight: { icon: HiChartBar, label: "Tracking", val: "Real-time" },
  },
];
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");

  const goTo = useCallback(
    (idx: number, dir: "left" | "right" = "right") => {
      const next = ((idx % slides.length) + slides.length) % slides.length;
      setSlideDir(dir);
      setVisible(false);
      setTimeout(() => {
        setCurrent(next);
        setVisible(true);
      }, 350);
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1, "right"), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];
  const LeftIcon = slide.floatLeft.icon;
  const RightIcon = slide.floatRight.icon;

  const slideStyle: React.CSSProperties = {
    transition: "opacity 350ms ease, transform 350ms ease",
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateX(0)"
      : slideDir === "right"
        ? "translateX(-24px)"
        : "translateX(24px)",
  };

  return (

    <SectionBackground>

      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #e0f0ff 0%, transparent 70%)",
          bottom: -80,
          left: "30%",
          opacity: 0.5,
        }}
      />

      <div
        style={{
          ...slideStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          padding: "2rem 5rem",
          minHeight: "calc(100vh - 65px)",
          flexWrap: "wrap",
        }}
        className="flex-col lg:flex-row"
      >
        <div className="flex-1 max-w-xl text-center lg:text-left">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-customPrimary text-xs font-medium mb-5 border"
            style={{ background: "#eff4ff", borderColor: "#c7d7fc" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            {slide.badge}
          </div>

          {/* Title */}
          <h1
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              color: "#111827",
            }}
          >
            {slide.title.map((part, i) =>
              slide.titleAccent[i] ? (
                <span key={i} className="text-customPrimary">{part}</span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h1>

          {/* Subtitle */}
          <p
            className="text-mdleading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
            style={{ color: "#6b7280" }}
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
            <PrimaryLink
              href={slide.cta1Route}
              variant="primary"

            >
              {slide.cta1}
            </PrimaryLink>

            <PrimaryLink href={slide.cta2Route} variant="secondary">
              {slide.cta2}
            </PrimaryLink>
          </div>

          {/* Stats */}
          <div
            className="flex gap-8 mt-8 pt-6 border-t justify-center lg:justify-start flex-wrap"
            style={{ borderColor: "#e5e7eb" }}
          >
            {slide.stats.map((s, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    color: "#111827",
                  }}
                >
                  {s.num}
                </span>
                <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:flex-1 hidden lg:flex  max-w-lg w-full relative flex items-center justify-center">
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#e8edf5]">
            <img
              src={slide.image}
              alt="Campaign visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Float left */}
          <div
            className="absolute flex items-center gap-2 rounded-xl border px-3 py-2"
            style={{
              bottom: -14,
              left: -20,
              background: "#fff",
              borderColor: "#e8edf5",
              boxShadow: "0 4px 20px rgba(26,86,219,0.08)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: "#eff4ff" }}
            >
              <LeftIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-xs" style={{ color: "#9ca3af" }}>
                {slide.floatLeft.label}
              </span>
              <span
                className="text-sm font-bold"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "#111827",
                }}
              >
                {slide.floatLeft.val}
              </span>
            </div>
          </div>

          {/* Float right */}
          <div
            className="absolute flex items-center gap-2 rounded-xl border px-3 py-2"
            style={{
              top: -14,
              right: -16,
              background: "#fff",
              borderColor: "#e8edf5",
              boxShadow: "0 4px 20px rgba(26,86,219,0.08)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: "#eff4ff" }}
            >
              <RightIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-xs" style={{ color: "#9ca3af" }}>
                {slide.floatRight.label}
              </span>
              <span
                className="text-sm font-bold"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "#111827",
                }}
              >
                {slide.floatRight.val}
              </span>
            </div>
          </div>
        </div>
      </div>




      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={() => goTo(current - 1, "left")}
          className="w-9 h-9 rounded-full border border-[#d1d9f0] bg-white flex items-center justify-center transition-all hover:bg-gray-100"
          aria-label="Previous slide"
        >
          <div>
            <FiArrowLeft size={18} color="#374151" />

          </div>
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-customPrimary" : "w-2 bg-[#c7d7fc]"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1, "right")}
          className="w-9 h-9 rounded-full border border-[#d1d9f0] bg-white flex items-center justify-center transition-all hover:bg-gray-100"
          aria-label="Next slide"
        >
          <div>

            <FiArrowRight size={18} color="#374151" />
          </div>
        </button>
      </div>

    </SectionBackground>
  );
};

export default HeroCarousel;