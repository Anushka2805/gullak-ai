"use client";

export default function DocumentsPage() {
  const docs = ["Insurance.pdf", "BankStatement.pdf", "PANCard.png"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7E6] via-white to-[#FFF2D6] p-8 text-slate-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Documents</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {docs.map((d, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-yellow-200 shadow"
            >
              <p className="font-semibold">{d}</p>
            </div>
          ))}
        </div>

        <button className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow">
          Upload Document
        </button>
      </div>
    </div>
  );
}
