"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import AppHeading from "../../Heading";
import TextHighlight from "../../TextHighlight";
import PrimaryLink from "../../Link";
import SectionBackground from "../../sectionBackground";
import { campaigns } from "../../contants/campaigns";

const PopularCampaigns = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto scroll
  useEffect(() => {
    const container = scrollRef.current;

    if (!container || isPaused) return;

    const interval = setInterval(() => {
      container.scrollBy({
        left: 320,
        behavior: "smooth",
      });

      // Infinite loop effect
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 20
      ) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;

    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <SectionBackground>
      <section className="relative z-10 overflow-hidden px-6 py-20 lg:px-16">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <AppHeading as="h2">
              Popular{" "}
              <TextHighlight variant="primary">
                campaigns
              </TextHighlight>
            </AppHeading>

            <p className="mt-3 text-md leading-relaxed text-gray-500 md:text-base">

              Discover verified fundraisers creating real impact across
              healthcare, education, emergency relief, and community support.
            </p>
          </div>

          {/* Desktop controls */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-200 hover:border-customPrimary hover:bg-customPrimary hover:text-white"
            >
              <div>
                <FiChevronLeft size={20} />
              </div>            </button>

            <button
              onClick={() => scroll("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-200 hover:border-customPrimary hover:bg-customPrimary hover:text-white"
            >
              <div>
                <FiChevronRight size={20} />
              </div>            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="
            no-scrollbar
            flex gap-4 md:gap-6
            overflow-x-auto overflow-y-hidden
            scroll-smooth
            snap-x snap-mandatory
            touch-pan-x
            pb-2
          "
        >
          {campaigns.map((campaign, index) => {
            const raised =
              parseFloat(campaign.raised.replace(/[₦MK+,]/g, "")) || 0;

            const goal =
              parseFloat(campaign.goal.replace(/[₦MK+,]/g, "")) || 1;

            const progress = (raised / goal) * 100;

            return (
              <div
                key={index}
                className="
                  min-w-[280px]
                  sm:min-w-[300px]
                  md:min-w-[340px]
                  snap-start
                  overflow-hidden
                  rounded-3xl
                  border border-white/60
                  bg-white/90
                  shadow-sm
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  flex flex-col
                "
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={campaign.imgSrc}
                    alt={campaign.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-customPrimary backdrop-blur-sm">
                      {campaign.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {campaign.title}
                  </h3>

                  <p className="mb-5 text-sm leading-relaxed text-gray-500">
                    {campaign.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-5">
                    <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
                      <span>{campaign.raised} raised</span>
                      <span>{campaign.goal} goal</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-customPrimary transition-all duration-500"
                        style={{
                          width: `${Math.min(progress, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <PrimaryLink href="/campaigns" variant="primary">
                      Donate now
                    </PrimaryLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile controls */}
        <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
          <button
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-200 hover:border-customPrimary hover:bg-customPrimary hover:text-white"
          >
            <div>
              <FiChevronLeft size={18} />
            </div>          </button>

          <button
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-200 hover:border-customPrimary hover:bg-customPrimary hover:text-white"
          >
            <div>
              <FiChevronRight size={18} />
            </div>          </button>
        </div>
      </section>
    </SectionBackground>
  );
};

export default PopularCampaigns;