const updates = [
  {
    title: "Project started",
    date: "2 days ago",
  },
  {
    title: "Funds being used for materials",
    date: "1 day ago",
  },
];

export default function CampaignUpdates() {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="text-sm font-bold text-gray-800">
        Campaign Updates
      </h3>

      <div className="mt-4 space-y-4">
        {updates.map((u, i) => (
          <div key={i}>
            <p className="text-sm font-semibold">
              {u.title}
            </p>
            <p className="text-xs text-gray-400">
              {u.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}