"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [userName, setUserName] = useState("User");

  // Auth guard + load user name
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
      return;
    }

    const name = localStorage.getItem("userName") || "User";
    setUserName(name);
  }, [router]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Assets", href: "/dashboard/assets" },
    { name: "Nominees", href: "/dashboard/nominees" },
    { name: "Documents", href: "/dashboard/documents" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  const pageTitle =
    navItems.find((n) => pathname.startsWith(n.href))?.name || "Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#FFF7E6] via-white to-[#FFF2D6] text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-yellow-200 shadow-sm flex flex-col">
        {/* Brand */}
        <div className="p-6 flex items-center gap-2 border-b border-yellow-200">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow">
            ₹
          </div>
          <span className="text-xl font-bold">Gullak</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-xl font-semibold transition ${
                  active
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow"
                    : "text-slate-900 hover:bg-yellow-50"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-yellow-200">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-xl font-semibold text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white/80 backdrop-blur border-b border-yellow-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold">{pageTitle}</h1>

          <div className="flex items-center gap-3">
            <span className="font-semibold">{userName}</span>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
