"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7E6] via-white to-[#FFF2D6] text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
              ₹
            </div>
            <span className="text-xl font-bold tracking-tight">Gullak</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#how" className="hover:text-yellow-600 transition">
              How it Works
            </a>
            <a href="#security" className="hover:text-yellow-600 transition">
              Security
            </a>
            <Link
              href="/login"
              className="hover:text-yellow-600 transition"
            >
              Sign In
            </Link>
          </div>

          {/* CTA */}
          <Link
            href="/signup"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Get Started →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          ⭐ Trusted by families across India
        </div>

        {/* Heading */}
        <h1
          className={`text-5xl md:text-6xl font-extrabold leading-tight mb-6 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Your financial life.{" "}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
            Protected. Passed on.
          </span>
        </h1>

        {/* Subtext */}
        <p
          className={`max-w-2xl mx-auto text-slate-600 text-lg mb-10 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Securely store all your financial information in one place and make
          sure your family always knows where everything is — when they need it
          the most.
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            href="/signup"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all"
          >
            Start Protecting Your Gullak →
          </Link>

          <a
            href="#how"
            className="px-8 py-4 rounded-2xl border-2 border-yellow-400 text-yellow-700 font-semibold hover:bg-yellow-50 transition-all"
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* Simple Feature Strip */}
      <section id="how" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Secure Vault",
              desc: "All your assets, documents, and policies in one encrypted place.",
            },
            {
              title: "Smart Nominee Access",
              desc: "Your family gets access only when it truly matters.",
            },
            {
              title: "Zero Confusion",
              desc: "Clear, structured view of everything — no more hunting for papers.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-yellow-100"
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
