import React from "react";
import Image from "next/image";
import Link from "next/link";
import { scissorLiftsData } from "@/data/scissor-lifts";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ArrowRight, ArrowUpFromLine, Weight, ShieldCheck } from "lucide-react";

export function BrandNewScissorSection() {
  return (
    <section className="py-20 sm:py-24 bg-brand-offwhite border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="eyebrow-label justify-center mb-2.5">
            <span className="slash-accent" />
            <span>Electric Self-Propelled</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-bold tracking-tight text-slate-900">
            Brand New Scissor Lifts on Rent
          </h2>
          <p className="mt-2 text-[16px] sm:text-[17px] text-slate-600">
            Five precision electric models from 6m to 14m working height on rent with zero emissions and non-marking tyres.
          </p>
        </div>

        {/* 5-Card Responsive Grid (Horizontal swipe carousel on mobile < 768px) */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {scissorLiftsData.map((model) => (
            <div
              key={model.slug}
              className="w-[82vw] max-w-[320px] shrink-0 snap-center md:w-auto md:shrink card-premium p-5 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Image Area */}
                <div className="relative h-44 w-full rounded-xl bg-white p-3 mb-4 border border-slate-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={model.images[0]}
                    alt={`${model.name} Scissor Lift on rent`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Top Badges */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Available on Rent</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 text-[10px] font-semibold">
                    <ShieldCheck className="w-2.5 h-2.5 text-slate-700" />
                    <span>CE Certified</span>
                  </span>
                </div>

                {/* Model Name */}
                <h3 className="text-[17px] font-bold text-slate-900 group-hover:text-brand-navy transition-colors mb-3 line-clamp-1">
                  {model.name}
                </h3>

                {/* Three Exact Spec Chips */}
                <div className="space-y-1.5 mb-3 text-[12px]">
                  <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <ArrowUpFromLine className="w-3 h-3 text-brand-navy" />
                      <span>Working Height</span>
                    </span>
                    <span className="font-bold text-slate-800">
                      {model.workingHeight}
                    </span>
                  </div>

                  <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500">Platform Height</span>
                    <span className="font-semibold text-slate-700">
                      {model.platformHeight}
                    </span>
                  </div>

                  <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Weight className="w-3 h-3 text-brand-amber" />
                      <span>Capacity</span>
                    </span>
                    <span className="font-bold text-slate-800">
                      {model.safeWorkingLoad}
                    </span>
                  </div>
                </div>

                {/* Rental rate on request */}
                <div className="mb-4 text-center text-xs font-semibold text-brand-navy bg-slate-100/70 py-1 px-2 rounded-md">
                  Rental rate on request
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <WhatsAppCTA
                  variant="whatsapp"
                  size="sm"
                  className="w-full h-9 py-2 px-3 text-[13px] justify-center"
                  message={`Hello Citizen Construction Rentals, I need a rental quote for the ${model.name} (${model.workingHeight} working height). Please share availability and rental rates.`}
                  modalTitle={`Rental Quote: ${model.name}`}
                >
                  Get Rental Quote
                </WhatsAppCTA>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <Link
                    href={`/brand-new/scissor-lifts/${model.slug}`}
                    className="inline-flex items-center justify-center gap-1 text-[12px] font-semibold text-brand-navy hover:underline"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  {model.specSheetUrl && (
                    <a
                      href={model.specSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-500 hover:text-brand-navy underline transition-colors"
                    >
                      Spec Sheet
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Dots (< 768px) */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-2">
          {scissorLiftsData.map((_, idx) => (
            <span
              key={idx}
              className="w-2 h-2 rounded-full bg-slate-300 first:bg-brand-navy"
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Section Footer Link */}
        <div className="mt-12 text-center">
          <Link
            href="/brand-new/scissor-lifts"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-navy hover:text-brand-navy-dark"
          >
            <span>Compare All 5 Models &amp; Download Spec Sheets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
