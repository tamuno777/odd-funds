// src/app/dashboard/settings/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firbase.config";

export default function Settings() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  return (
    <div>
      <h1>Personal Information</h1>
      <p>Name: {user?.displayName || "N/A"}</p>
      <p>Email: {user?.email || "N/A"}</p>
      <button onClick={() => router.push("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}
