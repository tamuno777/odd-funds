"use client";

import React, { useState } from "react";
import AppHeading from "../../Heading";
import TextHighlight from "../../TextHighlight";
import SectionBackground from "../../sectionBackground";

interface Step {
  badge: string;
  title: string;
  desc: string;
  points: string[];
  cta: string;
  icon: string;
}

const steps: Step[] = [
  {
    badge: "Step 01",
    title: "Create a campaign",
    desc: "Launch your fundraising page in under 3 minutes. Tell your story, set a goal, and start reaching donors immediately.",
    points: [
      "Choose a campaign category and goal amount",
      "Add photos, videos, and your story",
      "Share your campaign link instantly",
    ],
    cta: "Start a campaign",
    icon: "ti-forms",
  },
  {
    badge: "Step 02",
    title: "Donate to causes",
    desc: "Browse hundreds of verified campaigns. Give what you can — every naira moves the needle for someone who needs it.",
    points: [
      "Secure payments via card, bank transfer, or USSD",
      "Donate anonymously or publicly",
      "Get instant donation receipt by email",
    ],
    cta: "Explore campaigns",
    icon: "ti-heart-handshake",
  },
  {
    badge: "Step 03",
    title: "Track campaign progress",
    desc: "Watch your impact unfold in real time. Campaign owners share updates and donors see exactly where funds go.",
    points: [
      "Live progress bar and donation feed",
      "Campaign owner posts milestones",
      "End-to-end payout transparency",
    ],
    cta: "See how tracking works",
    icon: "ti-chart-bar",
  },
  {
    badge: "Step 04",
    title: "Build your community",
    desc: "Every campaign is a gathering place. Supporters comment, share, and rally around your cause together.",
    points: [
      "Comment threads and supporter shoutouts",
      "Social sharing to WhatsApp, X, and more",
      "Follow campaigns for ongoing updates",
    ],
    cta: "Join the community",
    icon: "ti-users",
  },
];

const HowWeWork = () => {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <SectionBackground>
      <section className="py-16 px-6 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <AppHeading as="h2" variant="dark">
            How <TextHighlight variant="primary">it works</TextHighlight>
          </AppHeading>
          <p className="text-md leading-relaxed  text-gray-700 mb-8">
            Three simple steps to start making a difference. whether you&apos;re raising funds or giving them.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-gray-100 bg-white min-h-[420px]">

          <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-100">

            <div className="flex flex-wrap gap-2 p-4 lg:hidden">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-full hover:text-white text-xs font-medium transition
                    ${active === i
                      ? "bg-customPrimary text-white"
                      : "bg-customPrimarySoft text-customPrimary"}
                  `}
                >
                  <i className={`ti ${s.icon} text-sm`} />
                  {s.badge}
                </button>
              ))}
            </div>

            {/* DESKTOP  */}
            <div className="hidden lg:flex flex-col">
              {steps.map((s, i) => {
                const isActive = active === i;

                return (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`
          group relative flex items-center gap-3 px-5 py-5 text-left w-full
          border-b border-gray-300 transition-all duration-200
        ${isActive ? "bg-customPrimarySoft text-customPrimary hover:bg-customPrimary hover:text-white" :
                        "bg-transparent hover:bg-customPrimarySoft text-customPrimary"}
        `}
                  >
                    {isActive && (
                      <span className="absolute right-0 top-0 bottom-0 w-1 bg-customPrimary" />
                    )}
                    <span
                      className={`
            w-10 h-10 rounded-xl flex items-center justify-center transition-all

           
          `}
                    >
                      <i
                        className={`
              ti ${s.icon} text-lg transition-colors

             
            `}
                      />
                    </span>

                    <span
                      className={`
            text-sm font-medium transition-colors
            
          `}
                    >
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center p-8 border-r border-gray-100">
            <div className="w-full max-w-[200px] aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 bg-customPrimarySoft">
              <i className={`ti ${step.icon} text-5xl text-customPrimary`} />
              <span className="text-xs font-medium text-gray-400">
                {step.title}
              </span>
            </div>
          </div>

          <div className="flex-1 lg:flex-[1.1] p-7 lg:p-10 flex flex-col justify-center animate-fadeUp">

            <span className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-3 py-1 mb-5 w-fit bg-customPrimarySoft text-customPrimary border border-customBorder">
              <span className="w-1.5 h-1.5 rounded-full bg-customPrimary" />
              {step.badge}
            </span>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {step.title}
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {step.desc}
            </p>

            <ul className="flex flex-col gap-3 mb-7">
              {step.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                  <i className="ti ti-circle-check text-customPrimary mt-0.5" />
                  {pt}
                </li>
              ))}
            </ul>

            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-customPrimary hover:bg-customPrimaryHover transition w-fit active:scale-95">
              {step.cta}
              <i className="ti ti-arrow-right text-sm" />
            </button>
          </div>
        </div>
      </section>

      <link
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        rel="stylesheet"
      />
    </SectionBackground>
  );
};

export default HowWeWork;