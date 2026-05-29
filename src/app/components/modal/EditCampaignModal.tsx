/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiX,
    FiDollarSign,
    FiFileText,
    FiImage,
    FiTarget,
    FiSave,
} from "react-icons/fi";
import { Campaign } from "@/app/types/campaign";



type Props = {
    open: boolean;
    onClose: () => void;
    campaign: Campaign | null;
    onUpdated: (campaign: Campaign) => void;
};

export default function EditCampaignModal({
    open,
    onClose,
    campaign,
    onUpdated,
}: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] =
        useState("");
    const [goal, setGoal] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] =
        useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (campaign) {
            setTitle(campaign.title);
            setDescription(campaign.description);
            setGoal(String(campaign.goal));
            setImage(campaign.image || "");
        }
    }, [campaign]);

    const progress = useMemo(() => {
        let value = 0;

        if (title) value += 25;
        if (description) value += 25;
        if (goal) value += 25;
        if (image) value += 25;

        return value;
    }, [title, description, goal, image]);

    const handleUpdate = async () => {
        if (!campaign) return;

        try {
            setLoading(true);
            setError("");

            const res = await fetch(
                `/api/campaign/${campaign.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        goal: Number(goal),
                        image,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(
                    data.error ||
                    "Failed to update campaign"
                );
                return;
            }

            onUpdated(data);
            onClose();
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                        }}
                        className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] bg-white"
                    >
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5">
                            <div>
                                <h2 className="text-2xl font-black">
                                    Edit Campaign
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update your fundraiser
                                    details.
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100"
                            >
                                <div>                                <FiX size={20} />
                                </div>                            </button>
                        </div>

                        <div className="grid gap-8 p-6 lg:grid-cols-[1fr_380px]">
                            {/* FORM */}
                            <div className="space-y-6">
                                {error && (
                                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-500">
                                        {error}
                                    </div>
                                )}

                                {/* TITLE */}
                                <div>
                                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold">
                                        <FiTarget />
                                        Campaign Title
                                    </label>

                                    <input
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        className="h-14 w-full rounded-2xl border border-gray-200 px-5 outline-none focus:border-customPrimary"
                                    />
                                </div>

                                {/* DESC */}
                                <div>
                                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold">
                                        <FiFileText />
                                        Description
                                    </label>

                                    <textarea
                                        rows={7}
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-2xl border border-gray-200 p-5 outline-none focus:border-customPrimary"
                                    />
                                </div>

                                {/* GOAL */}
                                <div>
                                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold">
                                        <FiDollarSign />
                                        Goal
                                    </label>

                                    <input
                                        type="number"
                                        value={goal}
                                        onChange={(e) =>
                                            setGoal(e.target.value)
                                        }
                                        className="h-14 w-full rounded-2xl border border-gray-200 px-5 outline-none focus:border-customPrimary"
                                    />
                                </div>

                                {/* IMAGE */}
                                <div>
                                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold">
                                        <FiImage />
                                        Cover Image URL
                                    </label>

                                    <input
                                        value={image}
                                        onChange={(e) =>
                                            setImage(e.target.value)
                                        }
                                        className="h-14 w-full rounded-2xl border border-gray-200 px-5 outline-none focus:border-customPrimary"
                                    />
                                </div>

                                <button
                                    onClick={handleUpdate}
                                    disabled={loading}
                                    className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-customPrimary font-semibold text-white disabled:opacity-50"
                                >
                                    <FiSave />

                                    {loading
                                        ? "Updating..."
                                        : "Save Changes"}
                                </button>
                            </div>

                            {/* PREVIEW */}
                            <div className="rounded-[2rem] border bg-[#f8fbff] p-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-black">
                                        Live Preview
                                    </h3>

                                    <span className="text-sm font-bold text-customPrimary">
                                        {progress}%
                                    </span>
                                </div>

                                <div className="mt-5 overflow-hidden rounded-3xl bg-white shadow-sm">
                                    <div className="relative h-60 bg-gray-100">
                                        {image ? (
                                            <Image
                                                src={image}
                                                alt={title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-2xl font-black">
                                            {title}
                                        </h3>

                                        <p className="mt-3 line-clamp-4 text-sm text-gray-500">
                                            {description}
                                        </p>

                                        <div className="mt-5">
                                            <div className="mb-2 flex justify-between">
                                                <span className="text-sm text-gray-500">
                                                    Goal
                                                </span>

                                                <span className="font-bold">
                                                    ₦
                                                    {Number(
                                                        goal || 0
                                                    ).toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="h-3 rounded-full bg-gray-100">
                                                <div className="h-full w-1/3 rounded-full bg-customPrimary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}