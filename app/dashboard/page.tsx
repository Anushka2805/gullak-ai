"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div>
      <h1
        className={`text-3xl font-bold mb-2 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Welcome back 👋
      </h1>
      <p
        className={`text-slate-800 mb-8 transition-all duration-700 delay-100 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Here’s a snapshot of your financial vault.
      </p>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Total Assets", value: "8" },
          { title: "Documents Stored", value: "14" },
          { title: "Nominees Added", value: "2" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 shadow-md border border-yellow-200"
          >
            <p className="text-slate-800 font-medium">{stat.title}</p>
            <p className="text-3xl font-extrabold mt-2 text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Cards */}
      <h2 className="text-xl font-bold mb-4">Quick Overview</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { name: "HDFC Bank Account", type: "Bank" },
          { name: "LIC Life Insurance", type: "Insurance" },
          { name: "Zerodha Demat", type: "Investments" },
        ].map((asset, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 shadow-md border border-yellow-200 hover:shadow-lg transition"
          >
            <p className="text-sm font-medium text-slate-800">{asset.type}</p>
            <h3 className="text-lg font-bold mt-1">{asset.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
