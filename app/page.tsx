"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF9ED] via-white to-[#FFF4D6] text-slate-900 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 bg-yellow-300/30 rounded-full blur-3xl" />
      <div className="absolute top-40 -right-40 h-96 w-96 bg-orange-300/30 rounded-full blur-3xl" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-yellow-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow"
            >
              ₹
            </motion.div>
            <span className="text-xl font-bold">Gullak</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-yellow-600 transition">
              Features
            </a>
            <a href="#flow" className="hover:text-yellow-600 transition">
              How it works
            </a>
            <a href="#security" className="hover:text-yellow-600 transition">
              Security
            </a>
            <Link href="/login" className="hover:text-yellow-600 transition">
              Sign in
            </Link>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow hover:shadow-md transition"
            >
              Get started
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-32 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium"
          >
            A digital vault for your family’s finances
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-8"
          >
            Organise today.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              Protect tomorrow.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-3xl mx-auto text-slate-600 text-lg md:text-xl mb-12"
          >
            Gullak helps you store all your bank accounts, investments, insurance
            and important documents in one secure place — and ensures your family
            can easily access them when needed.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-row gap-6 justify-center items-center"
          >

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition"
              >
                Create your Gullak
              </Link>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#features"
              className="px-10 py-4 rounded-2xl border-2 border-yellow-400 text-yellow-700 font-semibold hover:bg-yellow-50 transition"
            >
              Explore features
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: "₹2L+ Cr", label: "Unclaimed deposits in India" },
            { value: "10+", label: "Financial accounts per person" },
            { value: "100%", label: "Encrypted & private" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="bg-white/70 backdrop-blur border border-yellow-100 rounded-3xl p-10 shadow-sm hover:shadow-md"
            >
              <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-3">
                {item.value}
              </div>
              <p className="text-slate-600 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">
          Everything your family needs, in one place
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "All assets in one vault",
              desc: "Store bank accounts, FDs, mutual funds, insurance policies and more in a single secure dashboard.",
            },
            {
              title: "Document storage",
              desc: "Upload and organise important documents like Aadhaar, PAN, policies, wills and statements.",
            },
            {
              title: "Nominee & access control",
              desc: "Decide who gets access to what, with full control and consent-based permissions.",
            },
            {
              title: "Guided family view",
              desc: "Your family gets a simple, step-by-step dashboard instead of confusion and paperwork.",
            },
            {
              title: "Security first",
              desc: "Bank-grade encryption and strict access control to keep your data safe and private.",
            },
            {
              title: "Peace of mind",
              desc: "No more lost information, forgotten investments or unclaimed money.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="bg-white/80 backdrop-blur border border-yellow-100 rounded-3xl p-8 shadow-sm hover:shadow-md"
            >
              <div className="h-12 w-12 mb-4 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-500 py-24 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-4"
        >
          Turn your finances into a legacy
        </motion.h2>
        <p className="mb-10 text-white/90">
          Because your family deserves clarity, not confusion.
        </p>
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="inline-block"
        >
          <Link
            href="/signup"
            className="bg-white text-orange-600 px-12 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition"
          >
            Get started with Gullak
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
