"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SupportCTASection = () => {
  return (
    <section className="px-6 pb-24 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-customPrimary px-8 py-16 text-center text-white lg:px-16"
      >
        <span className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
          Need more help?
        </span>

        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          Our support team is always ready to assist you
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
          From campaign setup to donations and payouts,
          we’re committed to helping you every step of the way.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-8 text-sm font-semibold text-customPrimary transition hover:scale-[1.02]"
          >
            Start a campaign
          </Link>

          <Link
            href="/campaigns"
            className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/20 px-8 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore campaigns
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default SupportCTASection;