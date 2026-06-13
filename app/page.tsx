"use client";

import HeroSection from "./components/HeroSection";
import StatsBar from "./components/StatsBar";

export default function Home() {
  return (
    <>
      <HeroSection onGetStarted={() => (window.location.href = "/directory")} />
      <StatsBar />
    </>
  );
}
