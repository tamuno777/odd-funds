/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

interface DonationFormProps {
    campaignId: string;
    campaignTitle: string;
    userId?: string;
}

export default function DonationForm({ campaignId, campaignTitle, userId }: DonationFormProps) {
    const [formData, setFormData] = useState({
        amount: "",
        donorName: "",
        donorEmail: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDonate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const checkoutToastId = toast.loading("Initializing secure checkout window...");

        try {
            const initResponse = await fetch("/api/donations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: formData.amount,
                    campaignId,
                    donorName: formData.donorName || "Anonymous",
                    donorEmail: formData.donorEmail,
                    message: formData.message,
                    userId,
                }),
            });

            const donationData = await initResponse.json();

            if (!initResponse.ok) throw new Error(donationData.error || "Initialization failed");

            const PaystackPop = (window as any).PaystackPop;
            if (!PaystackPop) {
                toast.error("Payment gateway failed to load. Please refresh the page.", { id: checkoutToastId });
                setLoading(false);
                return;
            }

            toast.dismiss(checkoutToastId);

            const paystack = new PaystackPop();
            paystack.newTransaction({
                key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_your_key_here",
                email: formData.donorEmail || "anonymous@example.com",
                amount: Number(formData.amount) * 100, 
                currency: "NGN",
                ref: donationData.reference,
                onSuccess: async () => {
                    const verificationToastId = toast.loading("Verifying transaction balance allocation...");
                    
                    try {
                        const verifyResponse = await fetch("/api/donations/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                reference: donationData.reference,
                            }),
                        });

                        if (verifyResponse.ok) {
                            toast.success("Thank you for your generous donation!", { id: verificationToastId, duration: 4000 });
                            
                            setFormData({ amount: "", donorName: "", donorEmail: "", message: "" });
                            
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            toast.error("Payment complete, but sync timed out. Our team will verify manually.", { id: verificationToastId, duration: 5000 });
                        }
                    } catch (err) {
                        toast.error("Network error verification timeout.", { id: verificationToastId });
                    } finally {
                        setLoading(false);
                    }
                },
                onCancel: () => {
                    toast.error("Payment process canceled by user.");
                    setLoading(false);
                },
            });

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Something went wrong initializing transaction.", { id: checkoutToastId });
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleDonate} className="max-w-md p-6 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold">Support: {campaignTitle}</h3>

            <div>
                <label className="block text-sm font-medium">Amount (NGN)</label>
                <input
                    type="number"
                    name="amount"
                    required
                    min="100"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="e.g. 5000"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Your Name (Optional)</label>
                <input
                    type="text"
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Anonymous"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Email Address</label>
                <input
                    type="email"
                    name="donorEmail"
                    required
                    value={formData.donorEmail}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Words of Support (Optional)</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 h-24 resize-none"
                    placeholder="Leave a kind message..."
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold transition-colors disabled:bg-gray-400"
            >
                {loading ? "Processing..." : `Donate ₦${Number(formData.amount || 0).toLocaleString()}`}
            </button>
        </form>
    );
}