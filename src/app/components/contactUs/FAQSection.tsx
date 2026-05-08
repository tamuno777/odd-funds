"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    q: "How do I start a campaign?",
    a: "Create an account, tell your story, upload images, set a funding goal, and publish your campaign in minutes.",
  },
  {
    q: "How long does payout take?",
    a: "Most payouts are processed within 24 hours after verification.",
  },
  {
    q: "Are donations secure?",
    a: "Yes. All payments are securely processed and monitored to protect donors and campaign owners.",
  },
  {
    q: "Can I donate anonymously?",
    a: "Absolutely. You can choose to hide your name when making donations.",
  },
];

const FAQSection = () => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex rounded-full bg-customPrimary/10 px-4 py-2 text-sm font-medium text-customPrimary">
            Frequently asked questions
          </span>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Answers to common questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const open = active === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white"
              >
                <button
                  onClick={() =>
                    setActive(open ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.q}
                  </span>

                  <FiChevronDown
                    className={`transition ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    open
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-gray-500">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;