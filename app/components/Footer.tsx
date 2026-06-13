"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/book" || pathname?.startsWith("/book")) return null;

  return (
    <footer className="border-t border-natural-100 bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <circle cx="16" cy="16" r="15" fill="#FF6B52" opacity="0.15"/>
              <path d="M10 18c1.5-3 3.5-5 6-5s4.5 2 6 5" stroke="#E8533B" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="16" cy="12" r="3" fill="#E8533B"/>
              <path d="M14 20h4" stroke="#E8533B" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="font-display text-lg font-semibold text-natural-700">
              AdvocateHub
            </span>
          </div>
          <p className="text-sm text-natural-400">
            Building bridges between communities and legal support.
          </p>
          <div className="flex gap-6 text-sm text-natural-500">
            <a href="#" className="hover:text-coral-600 transition-colors">About</a>
            <a href="#" className="hover:text-coral-600 transition-colors">Contact</a>
            <a href="#" className="hover:text-coral-600 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
