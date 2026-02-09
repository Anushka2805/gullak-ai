"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Toast from "@/components/Toast";

export default function EditAssetPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [type, setType] = useState("Bank");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      const res = await fetch(`/api/assets/${id}`);
      const data = await res.json();
      setName(data.name);
      setType(data.type);
    };
    fetchAsset();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`/api/assets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type }),
      });

      if (!res.ok) throw new Error("Update failed");

      setToast({ msg: "Asset updated successfully", type: "success" });
      setTimeout(() => router.push("/dashboard/assets"), 1000);
    } catch {
      setToast({ msg: "Could not update asset", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-8 rounded-3xl shadow border border-yellow-200">
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h1 className="text-2xl font-bold mb-6">Edit Asset</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Asset Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Asset Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          >
            <option>Bank</option>
            <option>Insurance</option>
            <option>Investment</option>
            <option>Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl font-semibold shadow disabled:opacity-70"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
