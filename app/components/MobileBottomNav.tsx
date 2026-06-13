"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const activeTab =
    pathname === "/" ? "home" : pathname === "/directory" ? "directory" : "book";

  const coral = "#D1412C";
  const muted = "#B5A99F";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="border-t border-natural-100 bg-white/95 backdrop-blur-lg">
        <div className="flex items-center justify-around px-4 py-2">

          {/* Home */}
          <Link
            href="/"
            className={`relative flex flex-col items-center gap-1 rounded-xl px-5 py-2 transition-all ${
              activeTab === "home" ? "text-coral-600" : "text-natural-400 hover:text-natural-600"
            }`}
          >
            {activeTab === "home" && (
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-full bg-coral-500" />
            )}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12l9-9 9 9" stroke={activeTab === "home" ? coral : muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke={activeTab === "home" ? coral : muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={`text-[11px] font-semibold ${activeTab === "home" ? "text-coral-600" : "text-natural-400"}`}>Home</span>
          </Link>

          {/* Directory */}
          <Link
            href="/directory"
            className={`relative flex flex-col items-center gap-1 rounded-xl px-5 py-2 transition-all ${
              activeTab === "directory" ? "text-coral-600" : "text-natural-400 hover:text-natural-600"
            }`}
          >
            {activeTab === "directory" && (
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-full bg-coral-500" />
            )}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="5" r="3" stroke={activeTab === "directory" ? coral : muted} strokeWidth="1.8"/>
              <path d="M3 21v-4a4 4 0 014-4h4a4 4 0 014 4v4" stroke={activeTab === "directory" ? coral : muted} strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="19" cy="7" r="2.5" stroke={activeTab === "directory" ? coral : muted} strokeWidth="1.5"/>
              <path d="M21 12v3a3 3 0 01-3 3" stroke={activeTab === "directory" ? coral : muted} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className={`text-[11px] font-semibold ${activeTab === "directory" ? "text-coral-600" : "text-natural-400"}`}>Directory</span>
          </Link>

          {/* Book */}
          <Link
            href="/book"
            className={`relative flex flex-col items-center gap-1 rounded-xl px-5 py-2 transition-all ${
              activeTab === "book" ? "text-coral-600" : "text-natural-400 hover:text-natural-600"
            }`}
          >
            {activeTab === "book" && (
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-full bg-coral-500" />
            )}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="2" width="18" height="19" rx="3" stroke={activeTab === "book" ? coral : muted} strokeWidth="1.8"/>
              <path d="M7 6h10M7 10h10M7 14h6" stroke={activeTab === "book" ? coral : muted} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span className={`text-[11px] font-semibold ${activeTab === "book" ? "text-coral-600" : "text-natural-400"}`}>Book</span>
          </Link>

        </div>
      </div>

      {/* Safe area spacer for iOS */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white" />
    </nav>
  );
}
