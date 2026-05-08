
"use client";

import PrimaryLink from "../Link";
import Image from "next/image";


interface Props {
  badge: string;
  title: string;
  sub: string;
  image: string;
}

const AboutHero = ({ badge, title, sub, image }: Props) => {
  return (
    <section className="relative max-h-[75vh] overflow-hidden">
      <Image
        src={image}
        alt="About hero"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 lg:px-16">
        <div className="max-w-3xl text-center lg:text-left">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
            {badge}
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
            {sub}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <PrimaryLink href="/signup" variant="primary">
              Start fundraising
            </PrimaryLink>

            <PrimaryLink href="/campaigns" variant="secondary">
              Explore campaigns
            </PrimaryLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;


