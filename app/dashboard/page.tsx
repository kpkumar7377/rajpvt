"use client";

import Link from "next/link";
import { useState } from "react";
import useAuthGuard from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";

interface Tile {
  label: string;
  key: string;
  accent: string;
  href: string;
}

const sidebarOptions = [
  {
    key: "railway",
    label: "Indian Railway",
  },
  {
    key: "nic",
    label: "NIC",
  },
  {
    key: "defence",
    label: "Defence",
  },
];

const tileMap: Record<string, Tile[]> = {
  railway: [
    {
      label: "Pension Card",
      key: "pension",
      accent: "from-blue-600 via-blue-500 to-indigo-600",
      href: "/home/pension",
    },
    {
      label: "ID Card",
      key: "id",
      accent: "from-emerald-600 via-teal-500 to-emerald-700",
      href: "/home/identity",
    },
    {
      label: "Training Card",
      key: "training",
      accent: "from-slate-600 via-gray-600 to-zinc-700",
      href: "/home/training",
    },
    {
      label: "Notify Letter",
      key: "notify",
      accent: "from-indigo-600 via-violet-500 to-purple-600",
      href: "/home/notifyLetter/print",
    },
    {
      label: "Medical Letter",
      key: "medical",
      accent: "from-rose-600 via-red-500 to-rose-700",
      href: "/home/medicalLetter",
    },
    {
      label: "Joining Letter",
      key: "joining",
      accent: "from-amber-500 via-yellow-500 to-orange-500",
      href: "/home/joiningLetter/print",
    },
    {
      label: "Job Joining Letter",
      key: "jobJoining",
      accent: "from-amber-600 via-orange-500 to-amber-700",
      href: "/home/jobJoining/print",
    },
    {
      label: "Cancellation Letter",
      key: "cancellation",
      accent: "from-teal-600 via-cyan-600 to-teal-700",
      href: "/home/cancellation/print",
    },
    {
      label: "Reporting Letter",
      key: "reporting",
      accent: "from-emerald-600 via-green-600 to-teal-700",
      href: "/home/reportingLetter/print",
    },
    {
      label: "Envelope",
      key: "envelop",
      accent: "from-cyan-600 via-sky-500 to-blue-600",
      href: "/home/envelop/print",
    },
    {
      label: "Admit Card",
      key: "admitCard",
      accent: "from-violet-600 via-purple-600 to-indigo-700",
      href: "/home/admitCard/print",
    },
    {
      label: "Service Book",
      key: "serviceBook",
      accent: "from-purple-600 via-fuchsia-600 to-purple-800",
      href: "/home/serviceBook/print",
    },
    {
      label: "Manual",
      key: "manual",
      accent: "from-amber-600 via-orange-600 to-yellow-600",
      href: "/home/manual/print",
    },
    {
      label: "Aadhar Card",
      key: "aadhar",
      accent: "from-amber-500 via-orange-500 to-amber-600",
      href: "/home/aadhar",
    },
  ],

  nic: [
    {
      label: "NIC Id Card",
      key: "nic-id",
      accent: "from-cyan-700 via-sky-500 to-blue-700",
      href: "/home/nic",
    },
  ],

  defence: [
    {
      label: "Defence ID",
      key: "def-id",
      accent: "from-zinc-800 via-stone-800 to-neutral-900",
      href: "#",
    },
  ],
};

export default function Page() {
  const { isAuthorized, checking } = useAuthGuard();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("railway");

  const tiles = tileMap[activeCategory] || [];
  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.replace("/");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-3 text-slate-100">
        <div className="w-10 h-10 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-sm font-medium tracking-wide text-slate-400">
          Checking Authentication...
        </p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur-md border-r border-slate-200/80 p-6 flex flex-col justify-between shadow-sm">
        <div>
          {/* Logo / Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
              P
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-slate-900 leading-none">
                Portal Management
              </h2>
              <span className="text-xs text-slate-400">Workspace</span>
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-3">
            Departments
          </p>

          {/* Navigation Items */}
          <div className="space-y-1.5">
            {sidebarOptions.map((item) => {
              const isActive = activeCategory === item.key;
              const count = tileMap[item.key]?.length || 0;

              return (
                <button
                  key={item.key}
                  onClick={() => setActiveCategory(item.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span>{item.label}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? "bg-slate-800 text-slate-300 border border-slate-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info card */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-500">
          <p className="font-medium text-slate-700">Protected Workspace</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Session active</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-200/70 px-8 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {activeCategory === "railway"
                ? "Indian Railway"
                : activeCategory.toUpperCase()}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a module or service document to get started
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/home/send-email")}
              className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200/60 px-4 py-2 rounded-xl text-sm font-medium shadow-sm hover:bg-red-100/70 hover:border-red-300 transition-all cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Tiles Grid */}
        <section className="flex-1 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tiles.map(({ label, key, accent, href }) => (
              <Link
                href={href}
                key={key}
                className={`group relative overflow-hidden rounded-2xl p-6 min-h-[160px] flex flex-col justify-between bg-gradient-to-br ${accent} text-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
              >
                {/* Decorative background glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider bg-black/15 backdrop-blur-md px-2.5 py-1 rounded-md text-white/80">
                    Module
                  </span>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <span className="text-lg font-semibold tracking-tight leading-snug group-hover:translate-x-0.5 transition-transform">
                    {label}
                  </span>

                  <span className="text-xs font-semibold bg-white/20 group-hover:bg-white text-white group-hover:text-slate-900 px-3 py-1.5 rounded-lg backdrop-blur-md transition-all duration-300 flex items-center gap-1">
                    Open
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
