"use client";

interface MobileBottomNavProps {
  active: "home" | "directory" | "book";
  onChange: (tab: "home" | "directory" | "book") => void;
}

function HomeIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 12l9-9 9 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DirectoryIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="5" r="3" stroke={color} strokeWidth="1.8"/>
      <path d="M3 21v-4a4 4 0 014-4h4a4 4 0 014 4v4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="19" cy="7" r="2.5" stroke={color} strokeWidth="1.5"/>
      <path d="M21 12v3a3 3 0 01-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function BookIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="2" width="18" height="19" rx="3" stroke={color} strokeWidth="1.8"/>
      <path d="M7 6h10M7 10h10M7 14h6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export default function MobileBottomNav({ active, onChange }: MobileBottomNavProps) {
  const coral = "#D1412C";
  const muted = "#B5A99F";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="border-t border-natural-100 bg-white/95 backdrop-blur-lg">
        <div className="flex items-center justify-around px-4 py-2">
          {/* Home */}
          <button
            onClick={() => onChange("home")}
            className={`relative flex flex-col items-center gap-1 rounded-xl px-5 py-2 transition-all ${
              active === "home" ? "text-coral-600" : "text-natural-400 hover:text-natural-600"
            }`}
          >
            {active === "home" && (
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-full bg-coral-500" />
            )}
            <HomeIcon color={active === "home" ? coral : muted} />
            <span className={`text-[11px] font-semibold ${active === "home" ? "text-coral-600" : "text-natural-400"}`}>
              Home
            </span>
          </button>

          {/* Directory */}
          <button
            onClick={() => onChange("directory")}
            className={`relative flex flex-col items-center gap-1 rounded-xl px-5 py-2 transition-all ${
              active === "directory" ? "text-coral-600" : "text-natural-400 hover:text-natural-600"
            }`}
          >
            {active === "directory" && (
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-full bg-coral-500" />
            )}
            <DirectoryIcon color={active === "directory" ? coral : muted} />
            <span className={`text-[11px] font-semibold ${active === "directory" ? "text-coral-600" : "text-natural-400"}`}>
              Directory
            </span>
          </button>

          {/* Book */}
          <button
            onClick={() => onChange("book")}
            className={`relative flex flex-col items-center gap-1 rounded-xl px-5 py-2 transition-all ${
              active === "book" ? "text-coral-600" : "text-natural-400 hover:text-natural-600"
            }`}
          >
            {active === "book" && (
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-[3px] w-8 rounded-full bg-coral-500" />
            )}
            <BookIcon color={active === "book" ? coral : muted} />
            <span className={`text-[11px] font-semibold ${active === "book" ? "text-coral-600" : "text-natural-400"}`}>
              Book
            </span>
          </button>
        </div>
      </div>

      {/* Safe area spacer for iOS */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white" />
    </nav>
  );
}
