/* ── Realistic stats for a growing legal-advocate directory platform ── */

const stats = [
  {
    value: "2,400+",
    label: "Members helped",
    description: "People connected with advocates since launch",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.5" fill="#E8533B"/>
        <path d="M6 21c0-3.5 2.5-6 6-6s6 2.5 6 6" stroke="#E8533B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value: "850+",
    label: "Cases connected",
    description: "Legal matters matched with the right advocate",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="3" stroke="#F59E0B" strokeWidth="1.8"/>
        <path d="M8 8h8M8 12h8M8 16h5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value: "180",
    label: "Verified advocates",
    description: "Licensed professionals across 8 practice areas",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.3L12 15.5 7.1 18l.9-5.3-4-3.9L9.5 8z" fill="#4A7C59" opacity="0.2" stroke="#4A7C59" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    value: "42",
    label: "Cities served",
    description: "Growing our network to reach more communities",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#0EA5E9" strokeWidth="1.8"/>
        <path d="M3 12h18M12 3c2.5 3 4 6.5 4 9s-1.5 6-4 9c-2.5-3-4-6.5-4-9s1.5-6 4-9z" stroke="#0EA5E9" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

export default function StatsBar() {
  return (
    <section className="border-t border-natural-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20">
        {/* Section label */}
        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-natural-400">
          Our Impact So Far
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-xl bg-warm-50 p-6 text-center transition-all duration-300 hover:bg-coral-50/60"
            >
              {/* Icon */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Value */}
              <p className="font-display text-3xl font-bold tracking-tight text-natural-900 sm:text-4xl">
                {stat.value}
              </p>

              {/* Label */}
              <p className="mt-1 text-sm font-semibold text-natural-700">{stat.label}</p>

              {/* Description */}
              <p className="mt-1.5 text-xs leading-relaxed text-natural-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative dots below stats */}
        <div className="mx-auto mt-10 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${
                i % 2 === 0 ? "bg-coral-400/50" : "bg-amber-400/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
