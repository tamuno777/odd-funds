"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8fbff] px-6">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-customPrimary/10 blur-3xl" />

            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="relative z-10 w-full max-w-2xl rounded-[32px] border border-white/60 bg-white/80 p-10 shadow-2xl backdrop-blur-xl md:p-14"
            >
                <div className="flex items-center gap-4">
                    <div className="rounded-3xl bg-customPrimary px-5 py-3 text-4xl font-black text-white shadow-lg">
                        404
                    </div>

                    <div>
                        <p className="text-sm font-medium uppercase tracking-widest text-customPrimary">
                            Page not found
                        </p>

                        <h1 className="mt-1 text-3xl font-black text-gray-900 md:text-5xl">
                            You seem lost.
                        </h1>
                    </div>
                </div>

                <p className="mt-8 max-w-xl text-base leading-relaxed text-gray-500 md:text-lg">
                    The page you are trying to access does not exist,
                    may have been moved, or is temporarily unavailable.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-customPrimary px-8 text-sm font-semibold text-white transition hover:scale-[1.02]"
                    >
                        <FiHome size={18} />
                        Back Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                        <FiArrowLeft size={18} />
                        Go Back
                    </button>
                </div>

                <div className="mt-10 border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-400">
                        OddFund • Empowering communities through
                        fundraising.
                    </p>
                </div>
            </motion.div>
        </main>
    );
}