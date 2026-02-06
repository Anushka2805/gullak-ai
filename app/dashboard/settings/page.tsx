"use client";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7E6] via-white to-[#FFF2D6] p-8 text-slate-900">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow border border-yellow-200">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input className="w-full border border-slate-300 rounded-xl px-4 py-3" />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input className="w-full border border-slate-300 rounded-xl px-4 py-3" />
          </div>

          <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl font-semibold shadow">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
