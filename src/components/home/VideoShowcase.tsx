"use client";

import React from "react";
import { VideoCropped } from "./VideoCropped";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { CheckCircle2 } from "lucide-react";

export function VideoShowcase() {
  return (
    <section className="py-20 sm:py-24 bg-brand-ink text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-navy/35 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="eyebrow-label-dark justify-center mb-2.5">
            <span className="slash-accent" />
            <span>Fleet Operations</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-heading font-bold uppercase tracking-tight text-white">
            See Our Lifts At Work
          </h2>
          <p className="mt-2 text-[15px] sm:text-[17px] text-white/80 font-sans">
            Watch our lifts in real-world operation and inspection across Indian project sites.
          </p>
        </div>

        {/* Video Dual Grid (Desktop side by side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Video 1: Citizen Visit & Fleet Quality Inspection */}
          <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-6 sm:gap-7 shadow-xl">
            <div className="w-full max-w-[240px] sm:max-w-[250px] shrink-0 mx-auto">
              <VideoCropped
                src="/video/Citizen-visit.mp4"
                poster="/video/Citizen-visit-poster.webp"
                title="Fleet Inspection & Verification"
                caption="Citizen leadership inspecting boom lift fleet."
              />
            </div>

            <div className="flex-1 space-y-4 text-left w-full">
              <div>
                <span className="text-xs font-heading font-bold text-brand-amber uppercase tracking-wider">
                  Quality Verified
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold uppercase text-white mt-1">
                  Fleet Inspection &amp; Safety
                </h3>
                <p className="text-sm text-white/80 mt-2 leading-relaxed font-sans">
                  Rigorous quality verification ensures every scissor and boom lift deployed on rent meets high safety tolerances and CE standards.
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-brand-amber shrink-0" />
                  <span>CE certified safety &amp; load testing</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-brand-amber shrink-0" />
                  <span>Brand new Straightline boom &amp; scissor fleet</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-brand-amber shrink-0" />
                  <span>Mobilized to sites across India</span>
                </div>
              </div>

              <div className="pt-2">
                <WhatsAppCTA
                  variant="amber"
                  size="md"
                  message="Hello Citizen Construction Rentals, I would like to ask about renting aerial lifts. Site location: , Duration: "
                >
                  Get Rental Quote
                </WhatsAppCTA>
              </div>
            </div>
          </div>

          {/* Video 2: Machines in Action / Showreel */}
          <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-6 sm:gap-7 shadow-xl">
            <div className="w-full max-w-[240px] sm:max-w-[250px] shrink-0 mx-auto">
              <VideoCropped
                src="/video/Citizen.mp4"
                poster="/video/Citizen-poster.webp"
                title="Lifts in Action"
                caption="Straightline scissor lifts in operation."
              />
            </div>

            <div className="flex-1 space-y-4 text-left w-full">
              <div>
                <span className="text-xs font-heading font-bold text-brand-amber uppercase tracking-wider">
                  Real Performance
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold uppercase text-white mt-1">
                  Proven Across Indian Sites
                </h3>
                <p className="text-sm text-white/80 mt-2 leading-relaxed font-sans">
                  From narrow logistics aisles to demanding outdoor infrastructure, our rental fleet delivers high uptime, smooth proportional control, and zero emissions.
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-brand-amber shrink-0" />
                  <span>Smooth proportional drive &amp; steering</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-brand-amber shrink-0" />
                  <span>Non-marking solid tyres</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-brand-amber shrink-0" />
                  <span>Immediate site dispatch &amp; support</span>
                </div>
              </div>

              <div className="pt-2">
                <WhatsAppCTA
                  variant="amber"
                  size="md"
                  message="Hello Citizen Construction Rentals, I'd like to get a rental quote for an aerial lift. Site location: , Duration: "
                >
                  Get Rental Quote
                </WhatsAppCTA>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
