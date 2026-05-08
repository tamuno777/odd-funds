"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GiFamilyHouse, GiWorld } from "react-icons/gi";

const items = [
    {
        icon: <GiFamilyHouse size={26} />,
        title: "Who we are",
        desc: "A modern crowdfunding platform helping people support causes, emergencies, education, healthcare, and community projects.",
    },
    {
        icon: <GiWorld size={26} />,
        title: "Our mission",
        desc: "We believe generosity should be simple, transparent, and accessible to everyone everywhere.",
    },
];

const MissionSection = () => {
    return (
        <section className="py-20 px-6 lg:px-16">
            <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="relative hidden lg:block"
                >
                    <div className="relative aspect-[4/5] flex flex-col  group">
                        <Image
                            src="/aboutimg2.jpg"
                            alt="About Us"
                            fill
                            className="object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-105 "
                        />
                        <div className="absolute bottom-0 left-[-30px] w-2/3 h-2/3 group border-8 border-white rounded-lg bg-transparent translate-x-3 translate-y-3"></div>
                    </div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center lg:text-left"
                >
                    <span className="text-sm font-semibold uppercase tracking-widest text-customPrimary">
                        Our Story
                    </span>

                    <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                        Building trust through giving
                    </h2>

                    <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
                        OddFund connects generous people with meaningful causes. From personal emergencies to nonprofit initiatives, we help communities raise support faster.
                    </p>

                    <div className="mt-10 space-y-6">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:flex-row md:items-start"
                            >
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-customPrimary/10 text-customPrimary lg:mx-0">
                                    {item.icon}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MissionSection;