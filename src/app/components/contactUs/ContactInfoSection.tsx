"use client";

import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
} from "react-icons/fi";

const items = [
  {
    icon: FiMail,
    title: "Email Support",
    value: "support@oddfund.com",
    desc: "Reach us anytime for account or campaign support.",
  },
  {
    icon: FiPhone,
    title: "Phone Number",
    value: "+234 800 000 0000",
    desc: "Available Monday to Friday from 8am - 6pm.",
  },
  {
    icon: FiMapPin,
    title: "Office Address",
    value: "Abuja, Nigeria",
    desc: "Serving communities across Africa and beyond.",
  },
  {
    icon: FiClock,
    title: "Response Time",
    value: "Under 24hrs",
    desc: "Fast and reliable customer support.",
  },
];

const ContactInfoSection = () => {
  return (
    <section className="px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex rounded-full bg-customPrimary/10 px-4 py-2 text-sm font-medium text-customPrimary">
            Support Channels
          </span>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Multiple ways to reach us
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Whether you need technical help or campaign guidance,
            our team is available across multiple support channels.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-customPrimary/10 text-customPrimary">
                  <Icon size={26} />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mb-3 font-medium text-customPrimary">
                  {item.value}
                </p>

                <p className="text-sm leading-relaxed text-gray-500">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;