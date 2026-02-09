"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
};

export default function Toast({ message, type = "info", onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-slate-800";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`${colors} text-white px-6 py-3 rounded-xl shadow-lg font-semibold`}
      >
        {message}
      </div>
    </div>
  );
}
