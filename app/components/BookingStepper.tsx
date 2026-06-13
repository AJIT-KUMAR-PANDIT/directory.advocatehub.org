"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, label: "Describe" },
  { id: 2, label: "Choose Advocate" },
  { id: 3, label: "Pick Date & Time" },
  { id: 4, label: "Your Details" },
  { id: 5, label: "Confirm" },
];

const issueCategories = [
  { id: "housing", icon: "🏠", label: "Housing Rights", desc: "Eviction, rent control, landlord disputes" },
  { id: "immigration", icon: "✈️", label: "Immigration", desc: "Visa, asylum, citizenship, family petitions" },
  { id: "family", icon: "💛", label: "Family Law", desc: "Custody, divorce, protective orders" },
  { id: "employment", icon: "💼", label: "Employment", desc: "Discrimination, wrongful termination, wage disputes" },
  { id: "civil", icon: "⚖️", label: "Civil Rights", desc: "Equality, discrimination, constitutional rights" },
  { id: "consumer", icon: "🛡️", label: "Consumer Protection", desc: "Scams, unfair billing, product safety" },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM",
];

/* ── Stepper indicator ── */
function Stepper({ current, onStep }: { current: number; onStep: (s: number) => void }) {
  return (
    <nav className="flex items-center justify-center gap-0 overflow-x-auto px-4 py-6">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <button
            onClick={() => {
              if (step.id <= current) onStep(step.id);
            }}
            className={`relative flex flex-col items-center gap-1.5 focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-coral-300 ${
              step.id < current ? "cursor-pointer" : step.id === current ? "cursor-pointer" : "cursor-not-allowed opacity-40"
            }`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                step.id < current
                  ? "bg-sage-500 text-white"
                  : step.id === current
                  ? "bg-coral-500 text-white shadow-btn"
                  : "bg-natural-100 text-natural-400"
              }`}
            >
              {step.id < current ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                step.id
              )}
            </span>
            <span
              className={`text-xs font-medium whitespace-nowrap hidden sm:block ${
                step.id === current ? "text-natural-900" : "text-natural-400"
              }`}
            >
              {step.label}
            </span>
          </button>

          {/* Connector line */}
          {idx < steps.length - 1 && (
            <div className="mx-2 sm:mx-4 h-0.5 w-6 sm:w-12 bg-natural-100 relative">
              <div
                className={`absolute left-0 top-0 h-full rounded transition-all duration-300 ${
                  step.id < current ? "w-full bg-sage-500" : "w-0"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

/* ── Advocate options for step 2 ── */
interface AdvocateOption {
  id: number;
  name: string;
  initials: string;
  color: string;
  specialty: string;
  rating: number;
  reviews: number;
}

const advocateOptions: AdvocateOption[] = [
  { id: 1, name: "Sarah Chen", initials: "SC", color: "#FF9884 bg-coral-400", specialty: "Housing Rights", rating: 4.9, reviews: 127 },
  { id: 2, name: "Michael Torres", initials: "MT", color: "bg-green-600", specialty: "Immigration Law", rating: 4.8, reviews: 93 },
  { id: 3, name: "David Kim", initials: "DK", color: "bg-sky-500", specialty: "Employment Rights", rating: 4.9, reviews: 156 },
];

/* ── Main Booking Page ── */
export default function BookingStepper() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [issueNotes, setIssueNotes] = useState("");
  const [selectedAdvocate, setSelectedAdvocate] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const selectedAdvocateData = useMemo(() => {
    if (selectedAdvocate === 0) return null;
    return advocateOptions[selectedAdvocate - 1];
  }, [selectedAdvocate]);

  /* ── Steps content ── */
  function renderStep() {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-fade-up">
            <h2 className="font-display text-2xl font-bold text-natural-900 mb-2">What type of legal help do you need?</h2>
            <p className="text-natural-500 mb-8">Select the category that best describes your situation.</p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {issueCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left rounded-xl border-2 p-5 transition-all ${
                    selectedCategory === cat.id
                      ? "border-coral-400 bg-coral-50 shadow-soft"
                      : "border-natural-100 bg-white hover:border-natural-200"
                  }`}
                >
                  <span className="text-2xl mb-3 block">{cat.icon}</span>
                  <p className="font-semibold text-natural-900">{cat.label}</p>
                  <p className="text-sm text-natural-400 mt-1">{cat.desc}</p>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <label className="block text-sm font-medium text-natural-700 mb-2">
                Tell us a bit more about your situation (optional)
              </label>
              <textarea
                rows={3}
                value={issueNotes}
                onChange={(e) => setIssueNotes(e.target.value)}
                placeholder="Briefly describe your legal issue — this helps us match you with the right advocate..."
                className="input-focus w-full rounded-xl border border-natural-200 bg-white p-4 text-sm text-natural-700 placeholder-natural-300 resize-none"
              />
            </div>
          </div>
        );

      case 2: {
        const recommended = advocateOptions.slice(0, 3);
        return (
          <div className="animate-fade-up">
            <h2 className="font-display text-2xl font-bold text-natural-900 mb-2">Recommended for you</h2>
            <p className="text-natural-500 mb-8">Based on your issue, here are advocates who specialize in this area.</p>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((adv) => (
                <button
                  key={adv.id}
                  onClick={() => setSelectedAdvocate(adv.id)}
                  className={`text-left rounded-xl border-2 p-6 transition-all text-center ${
                    selectedAdvocate === adv.id
                      ? "border-coral-400 bg-coral-50 shadow-card-hover"
                      : "border-natural-100 bg-white card-hover"
                  }`}
                >
                  <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white ${adv.color}`}>
                    {adv.initials}
                  </div>
                  <p className="font-semibold text-natural-900">{adv.name}</p>
                  <p className="text-sm text-coral-600 mt-0.5">{adv.specialty}</p>
                  <p className="text-xs text-natural-400 mt-1">⭐ {adv.rating} · {adv.reviews} reviews</p>
                  {selectedAdvocate === adv.id && (
                    <div className="mt-3 flex justify-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-coral-500 px-4 py-1 text-xs font-semibold text-white">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Selected
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      }

      case 3:
        return (
          <div className="animate-fade-up">
            <h2 className="font-display text-2xl font-bold text-natural-900 mb-2">Pick a date and time</h2>
            <p className="text-natural-500 mb-8">Choose when works best for you. All consultations are conducted via video call.</p>

            {/* Calendar strip (next 7 days) */}
            <div className="flex gap-3 overflow-x-auto pb-3 mb-6">
              {[...Array(7)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                const dayNum = date.getDate();
                const monthShort = date.toLocaleDateString("en-US", { month: "short" });
                const isToday = i === 0;
                const isSelected = selectedDate === `${monthShort} ${dayNum}`;

                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(`${monthShort} ${dayNum}`)}
                    className={`flex flex-shrink-0 flex-col items-center justify-center rounded-xl border-2 p-4 min-w-[72px] transition-all ${
                      isSelected
                        ? "border-coral-400 bg-coral-50"
                        : isToday
                        ? "border-natural-200 hover:border-coral-300"
                        : "border-natural-100 hover:border-natural-200"
                    }`}
                  >
                    <span className={`text-xs font-medium ${isToday ? "text-coral-600" : "text-natural-400"}`}>
                      {isToday ? "TODAY" : dayName.toUpperCase()}
                    </span>
                    <span className="font-display text-2xl font-bold mt-1 text-natural-900">{dayNum}</span>
                    <span className="text-xs text-natural-400">{monthShort}</span>
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div>
                <p className="text-sm font-medium text-natural-700 mb-3">Available times for {selectedDate}</p>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                        selectedTime === slot
                          ? "bg-coral-500 text-white shadow-btn"
                          : "border border-natural-200 bg-white text-natural-600 hover:border-coral-300"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="animate-fade-up">
            <h2 className="font-display text-2xl font-bold text-natural-900 mb-2">Almost there!</h2>
            <p className="text-natural-500 mb-8">Just a few details to confirm your consultation.</p>

            <div className="max-w-lg space-y-5">
              {(["name", "email", "phone"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-natural-700 mb-2 capitalize">{field}</label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    placeholder={
                      field === "name" ? "Your full name" : field === "email" ? "you@example.com" : "(555) 000-0000"
                    }
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="input-focus w-full rounded-xl border border-natural-200 bg-white px-4 py-3 text-sm text-natural-700 placeholder-natural-300"
                  />
                </div>
              ))}

              {/* Summary card */}
              {selectedAdvocateData && selectedDate && selectedTime && (
                <div className="rounded-xl bg-warm-50 border border-natural-100 p-5">
                  <p className="text-sm font-semibold text-natural-700 mb-3">Your booking summary</p>
                  <div className="space-y-2 text-sm text-natural-500">
                    <p><span className="font-medium text-natural-700">Advocate:</span> {selectedAdvocateData.name}</p>
                    <p><span className="font-medium text-natural-700">Specialty:</span> {selectedAdvocateData.specialty}</p>
                    <p><span className="font-medium text-natural-700">Date:</span> {selectedDate}</p>
                    <p><span className="font-medium text-natural-700">Time:</span> {selectedTime} (video call)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="animate-fade-up max-w-lg mx-auto text-center">
            {/* Success illustration */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-100">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M11 20l6 6 12-12" stroke="#4A7C59" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h2 className="font-display text-3xl font-bold text-natural-900 mb-2">Booking Confirmed! 🎉</h2>
            <p className="text-natural-500 mb-8 max-w-md mx-auto">
              Your consultation has been scheduled. We've sent a confirmation to your email with the video call link and preparation tips.
            </p>

            {/* Confirmation card */}
            <div className="rounded-xl border border-sage-200 bg-sage-100 p-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="3" width="14" height="14" rx="3" stroke="#4A7C59" strokeWidth="1.5"/>
                  <path d="M6 1v3M14 1v3M3 8h14" stroke="#4A7C59" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="text-sm font-semibold text-sage-600">Consultation Details</p>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-natural-700"><span className="font-medium">Advocate:</span> {selectedAdvocateData?.name}</p>
                <p className="text-natural-700"><span className="font-medium">Specialty:</span> {selectedAdvocateData?.specialty}</p>
                <p className="text-natural-700"><span className="font-medium">Date & Time:</span> {selectedDate}, {selectedTime}</p>
                <p className="text-natural-700"><span className="font-medium">Format:</span> Video call via AdvocateHub</p>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => router.back()}
                className="rounded-full border border-natural-200 px-6 py-3 text-sm font-semibold text-natural-700 hover:bg-natural-50"
              >
                Back to Previous
              </button>
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setSelectedCategory("");
                  setSelectedAdvocate(0);
                  setSelectedDate("");
                  setSelectedTime("");
                  setFormData({ name: "", email: "", phone: "" });
                }}
                className="rounded-full bg-coral-500 px-6 py-3 text-sm font-semibold text-white shadow-btn hover:bg-coral-600"
              >
                Book Another
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!selectedCategory;
      case 2: return selectedAdvocate > 0;
      case 3: return !!selectedDate && !!selectedTime;
      case 4: return formData.name.length > 0 && formData.email.includes("@");
      default: return false;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-warm-50">
      {/* Step indicator */}
      {currentStep < 5 && <Stepper current={currentStep} onStep={setCurrentStep} />}

      {/* Step content */}
      <div className="mx-auto max-w-4xl px-6 py-8 sm:px-8">
        {renderStep()}

        {/* Navigation buttons (hide on step 5 / confirm) */}
        {currentStep < 5 && (
          <div className="mt-10 flex items-center justify-between max-w-4xl mx-auto">
            <button
              onClick={() => router.back()}
              className="text-sm font-medium text-natural-500 hover:text-natural-700 transition-colors"
            >
              ← Back to previous page
            </button>

            <button
              disabled={!canProceed()}
              onClick={() => setCurrentStep(currentStep + 1)}
              className={`flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold transition-all ${
                canProceed()
                  ? "bg-coral-500 text-white shadow-btn hover:bg-coral-600 hover:shadow-btn-hover active:scale-[0.98]"
                  : "cursor-not-allowed bg-natural-200 text-natural-400"
              }`}
            >
              {currentStep === 4 ? "Confirm Booking" : "Continue"}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l4 5-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
