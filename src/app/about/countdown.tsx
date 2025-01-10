"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  FaGlobe,
  FaHandsHelping,
  FaRegMoneyBillAlt,
  FaDonate,
} from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      icon: <FaGlobe size={50} className="text-customPrimary" />,
      value: 83,
      label: "Countries",
    },
    {
      icon: <FaHandsHelping size={50} className="text-customPrimary" />,
      value: 470,
      label: "Volunteers",
    },
    {
      icon: <FaRegMoneyBillAlt size={50} className="text-customPrimary" />,
      value: 490,
      label: "Goal",
    },
    {
      icon: <FaDonate size={50} className="text-customPrimary" />,
      value: 421,
      label: "Raised",
    },
  ];

  // Use Intersection Observer to detect when stats come into view
  const [ref, inView] = useInView({
    triggerOnce: false, // Trigger animation only once
    threshold: 0.3, // Trigger when 30% of the component is visible
  });

  return (
    <div
      className=" relative w-full bg-cover bg-center py-12 my-10"
      style={{ backgroundImage: "url('/aboutBanner.png')" }}
    >
      {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}

      <div
        ref={ref} // Attach ref to the parent container
        className="flex flex-col md:flex-row justify-between items-center text-white gap-8 px-4 md:px-16"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-2 md:gap-4"
          >
            {/* Icon */}
            <div>{stat.icon}</div>
            {/* Animated Number */}
            <h2 className="text-4xl font-bold text-white">
              {inView && (
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2.5}
                  separator=","
                />
              )}
              {index === 2 || index === 3 ? "K" : "+"}
            </h2>
            {/* Label */}
            <p className="text-lg font-medium text-white">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
