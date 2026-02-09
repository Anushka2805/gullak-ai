"use client";

import { useEffect, useState } from "react";

type Nominee = {
  id: string;
  name: string;
  relation: string;
};

export default function NomineesPage() {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/nominees");
        if (!res.ok) throw new Error("Failed to fetch nominees");
        const data = await res.json();
        setNominees(data);
      } catch (err) {
        setError("Could not load nominees.");
      } finally {
        setLoading(false);
      }
    };

    fetchNominees();
  }, []);

  if (loading) {
    return <p className="text-lg font-semibold">Loading nominees...</p>;
  }

  if (error) {
    return <p className="text-red-600 font-semibold">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nominees</h1>

      {nominees.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-yellow-200 shadow text-center">
          <p className="text-lg font-semibold">
            No nominees added yet. Add your first nominee.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {nominees.map((n) => (
            <div
              key={n.id}
              className="bg-white p-6 rounded-2xl border border-yellow-200 shadow"
            >
              <h3 className="text-lg font-bold">{n.name}</h3>
              <p className="font-medium text-slate-800">{n.relation}</p>
            </div>
          ))}
        </div>
      )}

      <button className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow">
        + Add Nominee
      </button>
    </div>
  );
}
