"use client";

import React from "react";
import Image from "next/image";
import AppHeading from "../../Heading";
import TextHighlight from "../../TextHighlight";
import SectionBackground from "../../sectionBackground";
import { FiArrowUpRight } from "react-icons/fi";
import { galleryImages } from "../../contants/gallery";



const GallerySection = () => {
  return (
    <SectionBackground>
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="mb-14 flex flex-col items-center text-center">
            <AppHeading as="h2">
              Stories of{" "}
              <TextHighlight variant="primary">
                impact
              </TextHighlight>
            </AppHeading>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Every campaign represents real people, real needs, and a community
              willing to help. Together, we turn generosity into action.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="
                  group relative overflow-hidden rounded-3xl
                  border border-gray-100 bg-white
                  shadow-sm transition-all duration-500
                  hover:-translate-y-1 hover:shadow-2xl
                "
              >
                <div className="relative aspect-[4/4.5] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="
                      object-cover transition-transform duration-700
                      group-hover:scale-105
                    "
                  />
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t from-black/75 via-black/10 to-transparent
                    "
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div
                    className="
                      translate-y-4 opacity-0
                      transition-all duration-500
                      group-hover:translate-y-0 group-hover:opacity-100
                    "
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className="
                          inline-flex items-center rounded-full
                          bg-white/15 px-3 py-1 text-xs font-medium
                          text-white backdrop-blur-md
                        "
                      >
                        Featured Story
                      </span>

                      <div
                        className="
                          flex h-10 w-10 items-center justify-center
                          rounded-full bg-white text-gray-900
                        "
                      >
                        <FiArrowUpRight size={18} />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white">
                      {image.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-200">
                      {image.desc}
                    </p>
                  </div>

                  <div
                    className="
                      transition-all duration-500
                      group-hover:opacity-0
                    "
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <button
              className="
                rounded-full bg-customPrimary px-6 py-3
                text-sm font-medium text-white
                transition-all duration-300
                hover:scale-[1.02] hover:bg-customPrimary/90
              "
            >
              Explore More Stories
            </button>
          </div>
        </div>
      </section>
    </SectionBackground>
  );
};

export default GallerySection;