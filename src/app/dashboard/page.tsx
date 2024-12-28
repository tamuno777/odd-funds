"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authprovider";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading ,signOut} = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signIn");
    }
  }, [loading, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user?.email}</h1>
      <p className="mb-8">Explore your dashboard and manage your campaigns.</p>
      <div>
        <button
          onClick={() => router.push("/dashboard/campaigns")}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
        >
          Manage Campaigns
        </button>
        <button
          onClick={() => {
            signOut();
            router.push("/signIn");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
