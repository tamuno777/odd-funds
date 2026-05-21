"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiDollarSign,
  FiFileText,
  FiGlobe,
  FiImage,
  FiTarget,
} from "react-icons/fi";
import { uploadImage } from "@/app/api/actions/uplaodImage";

export default function NewCampaignPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [goal, setGoal] = useState("");
//   const [image, setImage] = useState("");
const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const completion = useMemo(() => {
    let progress = 0;

    if (title) progress += 25;
    if (description) progress += 25;
    if (goal) progress += 25;
    if (image) progress += 25;

    return progress;
  }, [title, description, goal, image]);

 const handleCreate = async () => {
  setError("");

  if (!title || !description || !goal) {
    setError("Please fill all required fields.");
    return;
  }

  try {
    setLoading(true);

    let imageUrl = "";

    // STEP 1: upload image if exists
    if (image) {
      imageUrl = await uploadImage(image);
    }

    // STEP 2: send campaign data
    const response = await fetch("/api/campaign", {
      method: "POST",
        credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim(),
        goal: Number(goal),
        image: imageUrl,
        isPublic: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Failed to create campaign");
      return;
    }

    router.push("/dashboard/campaign");
    router.refresh();
  } catch (err) {
    console.error(err);
    setError("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fbff]">
      {/* BG */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-customPrimary/10 blur-3xl" />

      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-16">
        {/* TOP */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              onClick={() =>
                router.push(
                  "/dashboard/campaigns"
                )
              }
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              <FiArrowLeft size={16} />
              Back
            </button>

            <span className="inline-flex rounded-full bg-customPrimary/10 px-4 py-2 text-sm font-medium text-customPrimary">
              Launch a fundraiser
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
              Create a new campaign
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-500">
              Share your story, inspire
              supporters, and start raising
              funds for meaningful causes.
            </p>
          </div>

          {/* PROGRESS CARD */}
          <div className="w-full max-w-sm rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Campaign completion
              </p>

              <span className="text-sm font-bold text-customPrimary">
                {completion}%
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${completion}%`,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="h-full rounded-full bg-customPrimary"
              />
            </div>

            <div className="mt-5 space-y-3">
              {[
                {
                  label: "Campaign title",
                  done: !!title,
                },
                {
                  label: "Description",
                  done: !!description,
                },
                {
                  label: "Funding goal",
                  done: !!goal,
                },
                {
                  label: "Cover image",
                  done: !!image,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      item.done
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <FiCheck size={14} />
                  </div>

                  <span className="text-sm text-gray-600">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* FORM */}
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
              duration: 0.5,
            }}
            className="rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl"
          >
            {error && (
              <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="space-y-7">
              {/* TITLE */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <FiTarget
                    className="text-customPrimary"
                    size={16}
                  />
                  Campaign Title
                </label>

                <input
                  type="text"
                  placeholder="Help children access education"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-sm outline-none transition focus:border-customPrimary"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Keep it short, emotional,
                  and clear.
                </p>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <FiFileText
                    className="text-customPrimary"
                    size={16}
                  />
                  Story & Description
                </label>

                <textarea
                  rows={8}
                  placeholder="Tell people why this campaign matters, how donations will help, and the impact supporters can make..."
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-gray-200 bg-white p-5 text-sm leading-relaxed outline-none transition focus:border-customPrimary"
                />

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    Authentic stories perform
                    better.
                  </p>

                  <span className="text-xs text-gray-400">
                    {description.length}/1000
                  </span>
                </div>
              </div>

              {/* GOAL */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <FiDollarSign
                    className="text-customPrimary"
                    size={16}
                  />
                  Funding Goal
                </label>

                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                    ₦
                  </span>

                  <input
                    type="number"
                    placeholder="500000"
                    value={goal}
                    onChange={(e) =>
                      setGoal(e.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-10 pr-5 text-sm outline-none transition focus:border-customPrimary"
                  />
                </div>
              </div>

              {/* IMAGE */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <FiImage
                    className="text-customPrimary"
                    size={16}
                  />
                  Cover Image
                </label>

                {/* <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={image}
                  onChange={(e) =>
                    setImage(e.target.value)
                  }
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-sm outline-none transition focus:border-customPrimary"
                /> */}
                <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }}
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-sm outline-none transition focus:border-customPrimary"

/>

                <p className="mt-2 text-xs text-gray-400">
                  Use a strong emotional image
                  for better engagement.
                </p>
              </div>

              {/* VISIBILITY */}
              <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-customPrimary/10 text-customPrimary">
                  <FiGlobe size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Public campaign
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    Your fundraiser will be
                    visible to everyone and can
                    receive public donations.
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={handleCreate}
                disabled={loading}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-customPrimary text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  "Creating campaign..."
                ) : (
                  <>
                    Launch Campaign
                    <FiArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* PREVIEW */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
            className="h-fit rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl"
          >
            <h2 className="text-lg font-bold text-gray-900">
              Live Preview
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              See how supporters will view your
              campaign.
            </p>

            <div className="mt-6 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              <div className="relative h-52 w-full bg-gray-100">
               {image ? (
  <Image
    src={URL.createObjectURL(image)}
    alt="Campaign"
    fill
    className="object-cover"
  />
) : (
  <div className="flex h-full items-center justify-center text-sm text-gray-400">
    No image selected
  </div>
)}
              </div>

              <div className="p-5">
                <h3 className="line-clamp-2 text-xl font-bold text-gray-900">
                  {title ||
                    "Your campaign title"}
                </h3>

                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-gray-500">
                  {description ||
                    "Your campaign story will appear here. Tell supporters why your fundraiser matters and how they can help create impact."}
                </p>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Goal
                    </span>

                    <span className="text-sm font-bold text-gray-900">
                      ₦
                      {goal
                        ? Number(
                            goal
                          ).toLocaleString()
                        : "0"}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-full w-1/4 rounded-full bg-customPrimary" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}