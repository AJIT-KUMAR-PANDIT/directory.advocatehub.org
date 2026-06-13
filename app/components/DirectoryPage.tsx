"use client";

import { useState, useMemo, useEffect } from "react";

/* ── Mock data ── */
const practiceAreas = [
  "All Areas",
  "Housing Rights",
  "Immigration",
  "Family Law",
  "Employment",
  "Civil Rights",
  "Consumer Protection",
];

interface Advocate {
  id: number;
  name: string;
  photo: string; // colored blob placeholder
  specialty: string;
  areas: string[];
  rating: number;
  reviews: number;
  availability: "available" | "busy" | "limited";
  languages: string[];
  bio: string;
  price: string;
  responseTime: string;
}

const advocates: Advocate[] = [
  {
    id: 1,
    name: "Sarah Chen",
    photo: "#FF9884",
    specialty: "Housing Rights",
    areas: ["Housing Rights"],
    rating: 4.9,
    reviews: 127,
    availability: "available",
    languages: ["English", "Mandarin"],
    bio: "Dedicated to protecting tenants' rights for over 12 years. Sarah has helped hundreds of families navigate evictions, rent control disputes, and housing discrimination cases.",
    price: "Free consultation (30 min)",
    responseTime: "within 2 hours",
  },
  {
    id: 2,
    name: "Michael Torres",
    photo: "#4A7C59",
    specialty: "Immigration",
    areas: ["Immigration"],
    rating: 4.8,
    reviews: 93,
    availability: "available",
    languages: ["English", "Spanish"],
    bio: "Michael believes everyone deserves a fair shot. He specializes in family-based immigration, asylum applications, and works closely with immigrant community organizations.",
    price: "$0 — Pro bono eligible",
    responseTime: "within 3 hours",
  },
  {
    id: 3,
    name: "Amara Okafor",
    photo: "#F59E0B",
    specialty: "Family Law",
    areas: ["Family Law"],
    rating: 4.7,
    reviews: 68,
    availability: "busy",
    languages: ["English", "Igbo"],
    bio: "Amara brings warmth and clarity to some of life's most difficult moments. She guides clients through custody matters, divorce, and protective orders with compassion.",
    price: "Free initial screening",
    responseTime: "within 6 hours",
  },
  {
    id: 4,
    name: "David Kim",
    photo: "#0EA5E9",
    specialty: "Employment Rights",
    areas: ["Employment"],
    rating: 4.9,
    reviews: 156,
    availability: "available",
    languages: ["English", "Korean"],
    bio: "David has fought workplace discrimination cases for 15 years. He's helped clients win against wrongful termination, wage theft, and hostile work environments.",
    price: "$0 — Free case evaluation",
    responseTime: "within 1 hour",
  },
  {
    id: 5,
    name: "Elena Vasquez",
    photo: "#B53323",
    specialty: "Civil Rights",
    areas: ["Civil Rights"],
    rating: 4.8,
    reviews: 104,
    availability: "available",
    languages: ["English", "Spanish", "Portuguese"],
    bio: "Elena has been a vocal advocate for equal justice, with deep experience in police accountability, voting rights, and freedom of information cases.",
    price: "Sliding scale available",
    responseTime: "within 4 hours",
  },
  {
    id: 6,
    name: "James Whitfield",
    photo: "#D8B4FE",
    specialty: "Consumer Protection",
    areas: ["Consumer Protection"],
    rating: 4.6,
    reviews: 41,
    availability: "limited",
    languages: ["English"],
    bio: "James helps everyday people fight back against unfair business practices — from predatory lending and scam calls to defective products and warranty disputes.",
    price: "$50 initial consult",
    responseTime: "within 8 hours",
  },
];

/* ── Avatar placeholder (blob) ── */
function AvatarPlaceholder({ color, name }: { color: string; name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div
      className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

/* ── Star rating display ── */
function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
            {i < Math.floor(rating) ? (
              <path d="M7 1.5l1.6 3.3 3.6.5-2.6 2.5.6 3.5L7 9.3 3.4 11.3l.6-3.5L1.8 5.3l3.6-.5z" fill="#F59E0B"/>
            ) : (
              <path d="M7 1.5l1.6 3.3 3.6.5-2.6 2.5.6 3.5L7 9.3 3.4 11.3l.6-3.5L1.8 5.3l3.6-.5z" fill="#D8CFC5"/>
            )}
          </svg>
        ))}
      </div>
      <span className="text-sm font-medium text-natural-700">{rating}</span>
      <span className="text-sm text-natural-400">({reviews})</span>
    </div>
  );
}

/* ── Availability indicator ── */
function AvailBadge({ status }: { status: Advocate["availability"] }) {
  const config = {
    available: { label: "Available now", color: "#4A7C59", bg: "#ECF5EE" },
    busy: { label: "Busy — low availability", color: "#D97706", bg: "#FEF3C7" },
    limited: { label: "Limited availability", color: "#8B7E75", bg: "#EDE6DF" },
  };
  const c = config[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
      style={{ color: c.color, backgroundColor: c.bg }}
    >
      <span
        className={`h-2 w-2 flex-shrink-0 rounded-full ${status === "available" ? "animate-pulse-dot" : ""}`}
        style={{ backgroundColor: c.color }}
      />
      {c.label}
    </span>
  );
}

/* ── Single advocate card ── */
function AdvocateCard({ advocate }: { advocate: Advocate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card-hover group rounded-xl bg-card-gradient border border-natural-100 p-6 sm:p-7">
      {/* Top row */}
      <div className="flex items-start gap-4 sm:gap-5">
        <AvatarPlaceholder color={advocate.photo} name={advocate.name} />

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="font-display text-xl font-semibold text-natural-900">{advocate.name}</h3>
              <p className="text-sm font-medium text-coral-600 mt-0.5">{advocate.specialty}</p>
            </div>
            <AvailBadge status={advocate.availability} />
          </div>

          <Stars rating={advocate.rating} reviews={advocate.reviews} />
        </div>
      </div>

      {/* Practice area tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {advocate.areas.map((area) => (
          <span key={area} className="rounded-full bg-warm-100 px-3 py-0.5 text-xs font-medium text-warm-700">
            {area}
          </span>
        ))}
        {advocate.languages.map((lang) => (
          <span key={lang} className="rounded-full bg-lavender-100 px-3 py-0.5 text-xs font-medium text-natural-500">
            🌐 {lang}
          </span>
        ))}
      </div>

      {/* Bio (expandable) */}
      <button onClick={() => setExpanded(!expanded)} className="mt-4 text-left w-full">
        <p className="text-sm leading-relaxed text-natural-500 line-clamp-2">{advocate.bio}</p>
        {expanded && <p className="text-sm leading-relaxed text-natural-500 mt-2">{advocate.bio}</p>}
        <span className={`inline-block mt-1 text-xs font-medium ${expanded ? "text-coral-600" : "text-natural-400 hover:text-natural-700"} transition-colors`}>
          {expanded ? "Show less" : "Read more"}
        </span>
      </button>

      {/* Bottom row */}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-natural-100">
        <div>
          <p className="text-sm font-semibold text-sage-600">{advocate.price}</p>
          <p className="text-xs text-natural-400 mt-0.5">Usually responds {advocate.responseTime}</p>
        </div>
        <button
          onClick={() => window.location.hash = "#booking"}
          className="inline-flex h-10 items-center justify-center rounded-full bg-coral-500 px-6 text-sm font-semibold text-white shadow-btn transition-all hover:bg-coral-600 hover:shadow-btn-hover active:scale-[0.98]"
        >
          Book Consultation
        </button>
      </div>
    </div>
  );
}

/* ── Main Directory Page ── */
export default function DirectoryPage({ initialSearch }: { initialSearch?: string }) {
  const [search, setSearch] = useState(initialSearch || "");
  const [selectedArea, setSelectedArea] = useState("All Areas");

  // Sync search from nav bar when navigating to this page
  useEffect(() => {
    if (initialSearch !== undefined) setSearch(initialSearch);
  }, [initialSearch]);

  const filteredAdvocates = useMemo(() => {
    return advocates.filter((a) => {
      const matchesSearch =
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.specialty.toLowerCase().includes(search.toLowerCase()) ||
        a.bio.toLowerCase().includes(search.toLowerCase()) ||
        a.areas.some((area) => area.toLowerCase().includes(search.toLowerCase()));
      const matchesArea = selectedArea === "All Areas" || a.areas.includes(selectedArea);
      return matchesSearch && matchesArea;
    });
  }, [search, selectedArea]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-warm-50">
      {/* Page header */}
      <div className="bg-white border-b border-natural-100">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-natural-400 mb-2">Directory</p>
          <h1 className="font-display text-3xl font-bold text-natural-900 sm:text-4xl">
            Find your advocate
          </h1>
          <p className="mt-3 text-base text-natural-500 max-w-xl">
            Browse verified legal advocates who specialize in the area you need help with. Everyone below has been background-checked and vetted by our team.
          </p>

          {/* Search bar */}
          <div className="mt-6 relative max-w-lg">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="#8B7E75" strokeWidth="1.8"/>
              <path d="M13.5 13.5L18 18" stroke="#8B7E75" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name, specialty, or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-focus w-full h-12 rounded-xl border border-natural-200 bg-warm-50 pl-12 pr-4 text-sm text-natural-700 placeholder-natural-300 focus:border-coral-400 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:flex lg:gap-8 lg:py-12">
        {/* Filter sidebar (desktop) / pills row (mobile) */}
        <aside className="mb-8 lg:mb-0 lg:w-64 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-natural-400 mb-4 hidden lg:block">
              Practice Area
            </h2>

            {/* Pill row (mobile) */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
              {practiceAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    selectedArea === area
                      ? "bg-coral-500 text-white shadow-btn"
                      : "bg-white border border-natural-200 text-natural-600 hover:border-coral-300"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>

            {/* Filter list (desktop) */}
            <div className="hidden lg:flex flex-col gap-1">
              {practiceAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`w-full text-left rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    selectedArea === area
                      ? "bg-coral-50 text-coral-700 border-l-[3px] border-coral-500"
                      : "text-natural-600 hover:bg-natural-50"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>

            {/* Quick filters */}
            <div className="mt-8 pt-6 border-t border-natural-100 hidden lg:block">
              <h3 className="text-sm font-semibold text-natural-400 mb-3">Quick Filters</h3>
              {["Available now", "Free consultation", "Multi-lingual"].map((label) => (
                <label key={label} className="flex items-center gap-2.5 py-2 text-sm text-natural-600 cursor-pointer hover:text-natural-700">
                  <input type="checkbox" className="h-4 w-4 rounded border-natural-300 text-coral-500 focus:ring-coral-400"/>
                  {label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <p className="text-sm text-natural-400 mb-6">
            Showing <span className="font-semibold text-natural-700">{filteredAdvocates.length}</span> of {advocates.length} advocates
          </p>

          {filteredAdvocates.length > 0 ? (
            <div className="grid gap-5 sm:gap-6 lg:gap-7">
              {filteredAdvocates.map((a) => (
                <AdvocateCard key={a.id} advocate={a} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-natural-200 bg-white p-12 text-center">
              {/* Empty state illustration */}
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto mb-4 opacity-40">
                <circle cx="32" cy="28" r="12" stroke="#B5A99F" strokeWidth="1.5"/>
                <path d="M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="#B5A99F" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M48 32l4 4m0-4l-4 4" stroke="#B5A99F" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <h3 className="font-display text-lg font-semibold text-natural-700">No advocates found</h3>
              <p className="text-sm text-natural-400 mt-2">Try adjusting your search or filters to find someone who matches.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
