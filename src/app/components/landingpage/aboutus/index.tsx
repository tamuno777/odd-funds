import React from "react";
import Image from "next/image";

import PrimaryLink from "../../Link";
import AppHeading from "../../Heading";
import TextHighlight from "../../TextHighlight";

const Aboutsection = () => {
  return (
    <div className="w-full mx-auto max-w-7xl">
      <section className="flex flex-col items-center justify-between gap-12 bg-white px-6 py-16 md:px-10 lg:flex-row lg:px-16">
        
        <div className="hidden lg:flex lg:w-1/2 justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/about.jpg"
              alt="Fundraising"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <AppHeading as="h2" variant="dark">
            About{" "}
            <TextHighlight variant="primary">
              Us
            </TextHighlight>
          </AppHeading>

          <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base">
            At <span className="font-semibold text-gray-900">ODDFUND</span>,
            we believe in the power of community and collective giving. Our
            platform helps people raise funds for causes that matter most.
          </p>

          <p className="mb-8 text-sm leading-relaxed text-gray-600 md:text-base">
            From medical support to creative ideas and emergency relief, we make
            fundraising simple, transparent, and impactful for everyone.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <PrimaryLink href="#explore" variant="primary">
              Join the Movement
            </PrimaryLink>

            <PrimaryLink href="/services" variant="secondary">
              Explore Services
            </PrimaryLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutsection;