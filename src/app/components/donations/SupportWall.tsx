const donations = [
  { name: "John D.", amount: 5000, message: "Keep going!" },
  { name: "Anonymous", amount: 2000, message: "Great cause!" },
];

export default function SupportWall() {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="text-sm font-bold text-gray-800">
        Support Wall
      </h3>

      <div className="mt-4 space-y-4">
        {donations.map((d, i) => (
          <div key={i} className="border-b pb-3">
            <p className="text-sm font-semibold">
              {d.name} • ₦{d.amount}
            </p>
            <p className="text-xs text-gray-500">
              {d.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}