"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import SectionBackground from "../sectionBackground";
import Image from "next/image";
import { MobileTextBlock, TextBlock } from "./TextBlock";
import { slides } from "../contants/carouse";

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");

  const goTo = useCallback((idx: number, dir: "left" | "right" = "right") => {
    const next = ((idx % slides.length) + slides.length) % slides.length;
    setSlideDir(dir);
    setVisible(false);
    setTimeout(() => {
      setCurrent(next);
      setVisible(true);
    }, 350);
  }, []);

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


  const desktopHeight = "clamp(500px, 72vh, 760px)";

  return (
    <SectionBackground>
      <div
        style={slideStyle}
        className="flex flex-col items-center text-center px-6 pt-10 pb-14 md:px-12 md:pt-14 lg:hidden"
      >
        <MobileTextBlock slide={slide} />
      </div>

      <div
        className="hidden lg:block"
        style={{ height: desktopHeight }}
      >
        <div
          style={{ ...slideStyle, height: "100%" }}
          className="mx-auto flex h-full max-w-7xl flex-row items-center justify-between gap-8 px-16 xl:px-20"
        >
          <div className="flex-1 max-w-xl text-left">
            <TextBlock slide={slide} />
          </div>

          <div className="flex-1 max-w-lg w-full relative flex items-center justify-center ml-8">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#e8edf5]">
              <Image
                src={slide.image}
                alt="Campaign visual"
                fill
                priority
                className="object-cover"
              />
            </div>

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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#eff4ff" }}>
                <LeftIcon className="text-customPrimary" size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs" style={{ color: "#9ca3af" }}>{slide.floatLeft.label}</span>
                <span className="text-sm font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#111827" }}>
                  {slide.floatLeft.val}
                </span>
              </div>
            </div>

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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#eff4ff" }}>
                <RightIcon className="text-customPrimary" size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs" style={{ color: "#9ca3af" }}>{slide.floatRight.label}</span>
                <span className="text-sm font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#111827" }}>
                  {slide.floatRight.val}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        <button
          onClick={() => goTo(current - 1, "left")}
          className="w-9 h-9 rounded-full border border-[#d1d9f0] bg-white flex items-center justify-center transition-all hover:bg-gray-100"
          aria-label="Previous slide"
        >
          <div>
            <FiArrowLeft size={18} color="#374151" />
          </div>        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              className={`h-2 rounded-full transition-all border-none cursor-pointer ${i === current ? "w-6 bg-customPrimary" : "w-2 bg-[#c7d7fc]"
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
          </div>        </button>
      </div>
    </SectionBackground>
  );
};

export default HeroCarousel;