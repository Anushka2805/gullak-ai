"use client";
import Link from "next/link";

export default function AssetsPage() {
  const assets = [
    { name: "HDFC Bank Account", type: "Bank" },
    { name: "LIC Life Insurance", type: "Insurance" },
    { name: "Zerodha Demat", type: "Investments" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7E6] via-white to-[#FFF2D6] p-8 text-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Assets</h1>
          <Link
            href="/dashboard/assets/new"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow"
          >
            + Add Asset
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {assets.map((a, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-yellow-200 shadow hover:shadow-lg transition"
            >
              <p className="text-sm font-medium text-slate-800">{a.type}</p>
              <h3 className="text-lg font-bold mt-1">{a.name}</h3>
              <button className="mt-4 text-yellow-700 font-semibold hover:underline">
                View Details →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
