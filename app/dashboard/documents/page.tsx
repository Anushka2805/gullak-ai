"use client";

import { useEffect, useRef, useState } from "react";

type DocumentItem = {
  id: string;
  name: string;
};

export default function DocumentsPage() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/documents");
      if (!res.ok) throw new Error("Failed to fetch documents");
      const data = await res.json();
      setDocs(data);
    } catch (err) {
      setError("Could not load documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);

    try {
      setUploading(true);
      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      // refresh list
      await fetchDocs();
    } catch (err) {
      alert("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <p className="text-lg font-semibold">Loading documents...</p>;
  }

  if (error) {
    return <p className="text-red-600 font-semibold">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      {docs.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-yellow-200 shadow text-center">
          <p className="text-lg font-semibold">
            No documents uploaded yet. Upload your first document.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {docs.map((d) => (
            <div
              key={d.id}
              className="bg-white p-6 rounded-2xl border border-yellow-200 shadow"
            >
              <p className="font-semibold">{d.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        onClick={handleUploadClick}
        disabled={uploading}
        className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow disabled:opacity-60"
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>
    </div>
  );
}
