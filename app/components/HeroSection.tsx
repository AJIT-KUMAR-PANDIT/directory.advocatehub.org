interface HeroProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {/* Organic blob decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="animate-float absolute top-[10%] -right-12 opacity-40 md:right-[5%] md:top-[8%]"
          style={{ width: 320, height: 280 }}
        >
          <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M160 20c80-5 140 60 130 140s-70 130-150 120S80 220 70 150 80 25 160 20z" fill="#FFB8A0" opacity="0.3"/>
          </svg>
        </div>
        <div
          className="animate-float-slow absolute bottom-[15%] -left-8 opacity-30 md:left-[3%]"
          style={{ width: 240, height: 200 }}
        >
          <svg viewBox="0 0 240 200" fill="none">
            <path d="M120 15c70-10 130 40 125 115S180 195 110 185 30 140 25 85 50 25 120 15z" fill="#FDE68A" opacity="0.3"/>
          </svg>
        </div>
        <div className="absolute top-1/3 left-[60%] -translate-y-1/2 animate-float-slow" style={{ animationDelay: "2s" }}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="40" fill="#E8533B" opacity="0.06"/>
            <circle cx="90" cy="35" r="20" fill="#F59E0B" opacity="0.08"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow label */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-coral-200 bg-coral-50 px-4 py-1.5 text-sm font-medium text-coral-700">
            <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-coral-500" />
            Now serving 12+ communities across the country
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl font-bold leading-[1.15] tracking-tight text-natural-900 sm:text-5xl lg:text-6xl">
            Finding legal support
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-coral-500 via-coral-400 to-amber-500 bg-clip-text text-transparent">
                should feel
              </span>
              {/* Decorative underline wave */}
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                <path d="M1 8c20-6 40-6 60-2s40 6 60 2 40-4 58-2" stroke="#E8533B" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
              </svg>
            </span>
            <br />
            <span className="text-natural-700">human, not hard.</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-natural-500 sm:text-xl">
            AdvocateHub connects you with trusted legal advocates who understand your community.
            Search our directory, find the right person for your situation, and book a consultation — all in minutes.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={onGetStarted}
              className="group flex h-14 w-full max-w-xs items-center justify-center gap-2.5 rounded-full bg-coral-500 px-8 text-base font-semibold text-white shadow-btn transition-all hover:bg-coral-600 hover:shadow-btn-hover active:scale-[0.98] sm:w-auto"
            >
              <span>Browse Advocates</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="flex h-14 w-full max-w-xs items-center justify-center gap-2.5 rounded-full border border-natural-200 bg-white px-8 text-base font-semibold text-natural-700 transition-all hover:border-coral-300 hover:bg-coral-50 sm:w-auto">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 6l4 3-4 3V6z" fill="currentColor"/>
              </svg>
              How It Works
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-natural-400">
            {["Free to search", "No signup required", "Confidential & secure"].map((text) => (
              <span key={text} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-sage-500">
                  <circle cx="8" cy="8" r="7" stroke="#4A7C59" strokeWidth="1.2"/>
                  <path d="M5 8l2 2 4-4" stroke="#4A7C59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative divider */}
        <div className="mx-auto mt-20 w-48">
          <hr className="dotted-divider" />
        </div>
      </div>
    </section>
  );
}
