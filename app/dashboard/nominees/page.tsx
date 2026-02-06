"use client";

export default function NomineesPage() {
  const nominees = [
    { name: "Mom", relation: "Mother" },
    { name: "Dad", relation: "Father" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7E6] via-white to-[#FFF2D6] p-8 text-slate-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Nominees</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {nominees.map((n, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-yellow-200 shadow"
            >
              <h3 className="text-lg font-bold">{n.name}</h3>
              <p className="text-slate-800 font-medium">{n.relation}</p>
            </div>
          ))}
        </div>

        <button className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow">
          + Add Nominee
        </button>
      </div>
    </div>
  );
}
