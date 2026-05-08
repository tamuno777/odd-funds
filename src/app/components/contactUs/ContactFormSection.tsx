"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ContactFormSection = () => {
  return (
    <section className="bg-gray-50 px-6 py-20 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="hidden lg:block"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
            <Image
              src="/about.jpg"
              alt="Customer support"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="mb-4 inline-flex rounded-full bg-customPrimary/10 px-4 py-2 text-sm font-medium text-customPrimary">
            Send us a message
          </span>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            We’d love to hear from you
          </h2>

          <p className="mt-4 text-gray-500">
            Have questions about donations, campaigns, payouts,
            or partnerships? Fill out the form and our team
            will get back to you shortly.
          </p>

          <form className="mt-10 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Full name"
                className="h-14 rounded-2xl border border-gray-200 px-5 outline-none transition focus:border-customPrimary"
              />

              <input
                type="email"
                placeholder="Email address"
                className="h-14 rounded-2xl border border-gray-200 px-5 outline-none transition focus:border-customPrimary"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="h-14 w-full rounded-2xl border border-gray-200 px-5 outline-none transition focus:border-customPrimary"
            />

            <textarea
              rows={6}
              placeholder="Your message..."
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-customPrimary"
            />

            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-customPrimary px-8 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormSection;