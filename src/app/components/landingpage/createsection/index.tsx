"use client";

import React from "react";
import Image from "next/image";

import AppHeading from "../../Heading";
import TextHighlight from "../../TextHighlight";
import PrimaryLink from "../../Link";

import {
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

const steps = [
  "Choose a cause you care about",
  "Create your campaign in minutes",
  "Share with friends and supporters",
  "Receive donations securely",
];

const Createsection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-14 px-6 lg:flex-row lg:gap-20 lg:px-16">
        
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-customPrimary/20 bg-customPrimarySoft px-4 py-2 text-xs font-medium text-customPrimary">
            <span className="h-2 w-2 rounded-full bg-customPrimary" />
            Start fundraising today
          </div>

          <AppHeading as="h2" variant="dark">
            Launch your{" "}
            <TextHighlight variant="primary">
              campaign
            </TextHighlight>{" "}
            in minutes
          </AppHeading>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base lg:mx-0">
            Raise funds for medical needs, education, emergencies,
            community projects, and more — all from one trusted platform.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-customPrimary/10 text-customPrimary">
                  <FiCheckCircle size={18} />
                </div>

                <p className="text-sm font-medium leading-relaxed text-gray-700">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <PrimaryLink href="/signup" variant="primary">
              Create a Campaign
            </PrimaryLink>

            <PrimaryLink href="/about" variant="secondary">
              Learn More
            </PrimaryLink>
          </div>
        </div>

        <div className="hidden w-full lg:flex lg:w-1/2 justify-center">
          <div className="relative w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-2xl">
            
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/about.jpg"
                alt="Create fundraising campaign"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="absolute left-5 top-5 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md">
              <p className="text-xs text-gray-500">
                Campaign launched
              </p>
              <h4 className="text-sm font-semibold text-gray-900">
                Education for All
              </h4>
            </div>

            <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-customPrimary/10 text-customPrimary">
                <FiArrowRight size={18} />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Funds raised
                </p>
                <h4 className="text-sm font-semibold text-gray-900">
                  ₦2.4M+
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Createsection;