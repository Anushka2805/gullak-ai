"use client";

import { useEffect, useState } from "react";

type Nominee = {
  id: string;
  name: string;
  relation: string;
  email: string;
};

export default function NomineesPage() {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  // form state
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [email, setEmail] = useState("");

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

  useEffect(() => {
    fetchNominees();
  }, []);

  const resetForm = () => {
    setName("");
    setRelation("");
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !relation || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      setAdding(true);

      const res = await fetch("/api/nominees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, relation, email }),
      });

      if (!res.ok) throw new Error("Failed to add nominee");

      await fetchNominees();
      resetForm();
      setShowForm(false);
    } catch (err) {
      alert("Failed to add nominee");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <p className="text-lg font-semibold">Loading nominees...</p>;
  }

  if (error) {
    return <p className="text-red-600 font-semibold">{error}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Nominees</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow"
        >
          + Add Nominee
        </button>
      </div>

      {/* Add Nominee Form */}
      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-2xl border border-yellow-200 shadow">
          <h2 className="text-xl font-bold mb-4">Add Nominee</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border rounded-lg px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Relation"
              className="border rounded-lg px-4 py-2"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="md:col-span-3 flex gap-4 mt-2">
              <button
                type="submit"
                disabled={adding}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold shadow disabled:opacity-60"
              >
                {adding ? "Saving..." : "Save Nominee"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="px-6 py-2 rounded-lg border font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

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
              <p className="text-sm text-slate-500">{n.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
