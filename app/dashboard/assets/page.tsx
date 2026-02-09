"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Toast from "@/components/Toast";

type Asset = {
  id: string;
  name: string;
  type: string;
};

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/assets");
      if (!res.ok) throw new Error("Failed to fetch assets");
      const data = await res.json();
      setAssets(data);
    } catch {
      setError("Could not load assets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      const res = await fetch(`/api/assets/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      setToast({ msg: "Asset deleted successfully", type: "success" });
      fetchAssets(); // refresh list
    } catch {
      setToast({ msg: "Could not delete asset", type: "error" });
    }
  };

  if (loading) return <p className="text-lg font-semibold">Loading assets...</p>;
  if (error) return <p className="text-red-600 font-semibold">{error}</p>;

  return (
    <div>
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Assets</h1>
        <Link
          href="/dashboard/assets/new"
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow"
        >
          + Add Asset
        </Link>
      </div>

      {assets.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-yellow-200 shadow text-center">
          <p className="text-lg font-semibold">
            No assets yet. Add your first asset.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {assets.map((a) => (
            <div
              key={a.id}
              className="bg-white p-6 rounded-2xl border border-yellow-200 shadow"
            >
              <p className="text-sm font-medium text-slate-800">{a.type}</p>
              <h3 className="text-lg font-bold mt-1">{a.name}</h3>

              <div className="mt-4 flex gap-3">
                <Link
                  href={`/dashboard/assets/${a.id}/edit`}
                  className="text-yellow-700 font-semibold hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-600 font-semibold hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
