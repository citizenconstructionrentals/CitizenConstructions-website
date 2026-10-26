import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Hero } from "@/components/home/Hero";
import { ChooseMachine } from "@/components/home/ChooseMachine";
import { BrandNewScissorSection } from "@/components/home/BrandNewScissorSection";
import { WhyCitizen } from "@/components/home/WhyCitizen";
import { CertifiedBacked } from "@/components/home/CertifiedBacked";
import { Applications } from "@/components/home/Applications";
import { HowItWorks } from "@/components/home/HowItWorks";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqJsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Scissor Lift on Rent | Citizen Construction Rentals India",
  description:
    "Citizen Construction Rentals offers scissor lift on rent and boom lift on rent across India. Reliable scissor lift rental India, boom lift rental India, aerial work platform rental, man lift on rent, and aerial lift on hire with fast site mobilization.",
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />

      {/* 1. Hero with Photo, Ken-Burns & Overlapping Trust Bar */}
      <Hero />

      {/* 2. Choose Your Rental Fleet (Off-white) */}
      <ChooseMachine />

      {/* 3. Brand New Scissor Lifts on Rent (White) */}
      <BrandNewScissorSection />

      {/* 4. Why Rent From Citizen (White) */}
      <WhyCitizen />

      {/* 5. Certified & Backed Strip (Conditional CE Certificate Slot) */}
      <CertifiedBacked />

      {/* 6. Where Our Lifts Work (White) */}
      <Applications />

      {/* 7. How Renting Works (Off-white) */}
      <HowItWorks />

      {/* 8. See Our Lifts At Work (Deep Ink) */}
      <VideoShowcase />

      {/* 9. Testimonials (Conditional, ships empty) */}
      <TestimonialsSection />

      {/* 9. Frequently Asked Questions (White, 2-column) */}
      <FaqSection />

      {/* 10. Final CTA Band (Navy Gradient) */}
      <CtaBand />
    </>
  );
}
