"use client";

import { useState } from "react";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: "hero" | "directory" | "booking") => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs = [
    { key: "hero", label: "Home" },
    { key: "directory", label: "Directory" },
    { key: "booking", label: "Book Consultation" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-natural-100 bg-white/95 backdrop-blur-md">
      {/* Decorative top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-coral-300 via-amber-400 to-coral-300" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between md:h-[72px]">
          {/* Logo */}
          <button
            onClick={() => onTabChange("hero")}
            className="flex items-center gap-2.5 focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-coral-300"
          >
            {/* Organic logo mark */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9884"/>
                  <stop offset="1" stopColor="#E8533B"/>
                </linearGradient>
              </defs>
              <circle cx="18" cy="18" r="17" stroke="url(#logoGrad)" strokeWidth="2" fill="#FFF1EB"/>
              {/* Stylized person silhouette */}
              <circle cx="18" cy="13" r="4.5" fill="#E8533B" opacity="0.9"/>
              <path d="M10 26c1-4 3.5-7 8-7s7 3 8 7" stroke="#E8533B" strokeWidth="2" strokeLinecap="round" fill="none"/>
              {/* Small accent dots */}
              <circle cx="29" cy="10" r="1.5" fill="#F59E0B" opacity="0.6"/>
              <circle cx="8" cy="8" r="1" fill="#FF9884" opacity="0.5"/>
            </svg>
            <span className="font-display text-xl font-bold tracking-tight text-natural-900 hidden sm:block">
              AdvocateHub
            </span>
          </button>

          {/* Tab navigation */}
          <nav className="hidden md:flex items-center gap-1" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => onTabChange(tab.key as "hero" | "directory" | "booking")}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-coral-50 text-coral-700 shadow-soft"
                    : "text-natural-500 hover:text-natural-700 hover:bg-natural-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* CTA button + mobile menu */}
          <div className="flex items-center gap-3">
            {activeTab !== "booking" && (
              <button
                onClick={() => onTabChange("booking")}
                className="hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-full bg-coral-500 px-6 text-sm font-semibold text-white shadow-btn transition-all hover:bg-coral-600 hover:shadow-btn-hover active:scale-[0.98]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 1v4M11 1v4M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Book Now
              </button>
            )}

            {/* Mobile hamburger */}
            <MobileMenuButton onNavChange={onTabChange} activeTab={activeTab} />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── mobile menu button + overlay ── */
function MobileMenuButton({
  onNavChange,
  activeTab,
}: {
  onNavChange: (tab: "hero" | "directory" | "booking") => void;
  activeTab: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg hover:bg-natural-50"
        aria-label="Menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          {[6, 10, 14].map((y) => (
            <path key={y} d={`M3 ${y}h14`} stroke="#3D322A" strokeWidth="1.8" strokeLinecap="round"/>
          ))}
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-natural-900/20 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed right-4 top-[64px] z-50 w-64 rounded-xl border border-natural-100 bg-white p-3 shadow-elevated md:hidden">
            {([
              { key: "hero", label: "Home" },
              { key: "directory", label: "Directory" },
              { key: "booking", label: "Book Consultation" },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  onNavChange(tab.key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-coral-50 text-coral-700"
                    : "text-natural-600 hover:bg-natural-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
