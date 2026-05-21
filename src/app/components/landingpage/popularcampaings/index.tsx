"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import AppHeading from "../../Heading";
import TextHighlight from "../../TextHighlight";
import PrimaryLink from "../../Link";
import SectionBackground from "../../sectionBackground";

type Campaign = {
  id: string;
  title?: string;
  description?: string;
  image?: string | null;
  goal?: number | null;
  raised?: number | null;
  category?: string;
};

const PopularCampaigns = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("/api/public/campaigns");

        if (!res.ok) {
          console.warn("Campaign API failed:", res.status);
          setCampaigns([]);
          return;
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          setCampaigns([]);
          return;
        }

        setCampaigns(data);
      } catch (err) {
        console.error("Campaign fetch error:", err);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    const checkScrollAbility = () => {
      const container = scrollRef.current;
      if (container) {
        setCanScroll(container.scrollWidth > container.clientWidth);
      }
    };

    checkScrollAbility();

    window.addEventListener("resize", checkScrollAbility);
    return () => window.removeEventListener("resize", checkScrollAbility);
  }, [campaigns, loading]);


  useEffect(() => {
    const container = scrollRef.current;

    if (!container || isPaused || !canScroll || campaigns.length <= 1) return;

    const interval = setInterval(() => {
      const atEnd =
        Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 15;

      if (atEnd) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 340, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, campaigns, canScroll]);


  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <SectionBackground>
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-16 overflow-hidden">

        {/* HEADER AREA */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <AppHeading as="h2">
              Popular{" "}
              <TextHighlight variant="primary">campaigns</TextHighlight>
            </AppHeading>

            <p className="mt-3 text-gray-500">
              Discover verified fundraisers making real impact.
            </p>
          </div>

          {canScroll && (
            <div className="hidden items-center gap-3 md:flex">
              <button
                onClick={() => scroll("left")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:border-customPrimary hover:bg-customPrimary hover:text-white"
                aria-label="Scroll Left"
              >
                <div>
                  <FiChevronLeft size={20} />
                </div>
              </button>

              <button
                onClick={() => scroll("right")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:border-customPrimary hover:bg-customPrimary hover:text-white"
                aria-label="Scroll Right"
              >
                <div>
                  <FiChevronRight size={20} />
                </div>
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500 font-medium">
            Loading campaigns...
          </div>
        ) : campaigns.length === 0 ? (
          <div className="py-16 text-center text-gray-500 font-medium">
            No campaigns available yet.
          </div>
        ) : (
          <>
            <div
              ref={scrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
            >
              {campaigns.map((campaign) => {
                const goal = campaign.goal ?? 0;
                const raised = campaign.raised ?? 0;
                const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

                return (
                  <div
                    key={campaign.id}
                    className="w-[280px] md:w-[340px] shrink-0 snap-start rounded-3xl border border-gray-100 bg-white shadow-sm flex flex-col transition-all duration-200 hover:shadow-md"                  >
                    <div className="relative h-52 w-full overflow-hidden rounded-t-3xl bg-gray-50">
                      {campaign.image ? (
                        <Image
                          src={campaign.image}
                          alt={campaign.title || "Campaign image"}
                          fill
                          sizes="(max-w-768px) 280px, 340px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm font-medium text-gray-400">
                          No image provided
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                        {campaign.title ?? "Untitled campaign"}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">
                        {campaign.description ?? "No description available for this campaign."}
                      </p>

                      <div className="mt-6">
                        <div className="flex justify-between text-xs font-bold text-gray-600">
                          <span>₦{raised.toLocaleString()}</span>
                          <span className="text-gray-400">₦{goal.toLocaleString()}</span>
                        </div>

                        <div className="mt-2 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full bg-customPrimary transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-auto pt-6">
                        <PrimaryLink href={`/campaigns/${campaign.id}`} variant="primary">
                          Donate now
                        </PrimaryLink>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {canScroll && (
              <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
                <button
                  onClick={() => scroll("left")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:border-customPrimary hover:bg-customPrimary hover:text-white"
                  aria-label="Scroll Left Mobile"
                >
                  <div>
                    <FiChevronLeft size={18} />
                  </div>
                </button>

                <button
                  onClick={() => scroll("right")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:border-customPrimary hover:bg-customPrimary hover:text-white"
                  aria-label="Scroll Right Mobile"
                >
                  <div>
                    <FiChevronRight size={18} />
                  </div>
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </SectionBackground>
  );
};

export default PopularCampaigns;