
"use client";

import { motion } from "framer-motion";
import {
  FiEdit3,
  FiShare2,
  FiDollarSign,
  FiBarChart2,
} from "react-icons/fi";

const steps = [
  {
    icon: <FiEdit3 size={24} />,
    title: "Create your campaign",
    desc: "Tell your story, upload photos, set your fundraising goal, and launch in minutes.",
  },
  {
    icon: <FiShare2 size={24} />,
    title: "Share with supporters",
    desc: "Send your campaign to friends, family, and social media to reach more donors.",
  },
  {
    icon: <FiDollarSign size={24} />,
    title: "Receive donations",
    desc: "Accept secure donations through trusted payment methods with real-time updates.",
  },
  {
    icon: <FiBarChart2 size={24} />,
    title: "Track your impact",
    desc: "Monitor donations, supporter activity, and campaign progress from your dashboard.",
  },
];

const ProcessSteps = () => {
  return (
    <section className="relative py-20 px-6 lg:px-16 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl text-center mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-customPrimary">
            Step by step
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-5xl">
            Launch your fundraiser in four easy steps
          </h2>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-[30px] border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-customPrimary/10 text-customPrimary transition-all duration-300 group-hover:bg-customPrimary group-hover:text-white">
                {step.icon}
              </div>

              <span className="mt-6 inline-block text-sm font-semibold text-customPrimary">
                Step 0{index + 1}
              </span>

              <h3 className="mt-3 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;






