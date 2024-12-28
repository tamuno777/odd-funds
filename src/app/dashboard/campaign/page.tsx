"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Campaign {
  id: number;
  name: string;
  // Add other fields here if needed
}

export default function Campaigns() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    // Fetch campaigns data here
    // For now, it's static data. Replace with your API logic
    setCampaigns([
      { id: 1, name: "Campaign 1" },
      { id: 2, name: "Campaign 2" },
    ]);
  }, []);

  return (
    <div>
      <h1>Your Campaigns</h1>
      <p>Here you can create, manage, and explore campaigns.</p>
      <div>
        {campaigns.map((campaign) => (
          <div key={campaign.id}>
            <p>{campaign.name}</p>
            {/* Add more info about the campaign */}
          </div>
        ))}
      </div>
      <button onClick={() => router.push("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}
