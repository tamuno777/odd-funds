"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiTrash2,
  FiX,
} from "react-icons/fi";

type Props = {
  open: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  loading: boolean;
};

export default function DeleteCampaignModal({
  open,
  onClose,
  onDelete,
  loading,
}: Props) {
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
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            className="w-full max-w-md rounded-[2rem] bg-white p-7"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <FiAlertTriangle size={28} />
              </div>

              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              >
                <FiX />
              </button>
            </div>

            <h2 className="mt-6 text-2xl font-black text-gray-900">
              Delete Campaign
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              This action cannot be undone.
              Your fundraiser and all related
              information will be permanently
              removed.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={onClose}
                className="h-14 flex-1 rounded-2xl border border-gray-200 font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={onDelete}
                disabled={loading}
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-red-600 font-semibold text-white disabled:opacity-50"
              >
                <FiTrash2 />

                {loading
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}