import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { scissorLiftsData } from "@/data/scissor-lifts";
import { MachineCard } from "@/components/machine/MachineCard";
import { ComparisonTable } from "@/components/machine/ComparisonTable";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { CtaBand } from "@/components/shared/CtaBand";
import {
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Brand New Scissor Lift on Rent | Straightline Electric Fleet India",
  description:
    "Rent a brand new scissor lift on rent across India. Explore Straightline scissor lift rental options with CE certified scissor lift on rent assurance and electric scissor lift rental across 6m 8m 10m 12m 14m scissor lift on rent sizes.",
  alternates: {
    canonical: `${siteConfig.url}/brand-new/scissor-lifts`,
  },
  keywords: [
    "brand new scissor lift on rent",
    "Straightline scissor lift rental",
    "CE certified scissor lift on rent",
    "electric scissor lift rental",
    "6m 8m 10m 12m 14m scissor lift on rent",
  ],
};

export default function ScissorLiftsListingPage() {
  const isLive = siteConfig.categoryStatus.brandNewScissor === "live";

  if (!isLive) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Brand New", href: "/brand-new" },
            { label: "Scissor Lifts" },
          ]}
        />
        <ComingSoon categoryName="Brand New Scissor Lifts" />
      </div>
    );
  }

  return (
    <>
      {/* Listing Header */}
      <section className="bg-brand-navy text-white py-14 sm:py-18 relative overflow-hidden">
        {/* Slanted Amber Slash Accent */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-amber/15 -skew-x-12 translate-x-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: "Brand New", href: "/brand-new" },
              { label: "Scissor Lifts" },
            ]}
          />

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-5">
            <span className="px-3 py-1 rounded-md bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider border border-white/15">
              Straightline Series
            </span>
            <span className="px-3 py-1 rounded-md bg-brand-amber text-brand-navy text-xs font-heading font-bold uppercase tracking-wider">
              CE Certified
            </span>
            <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-heading font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available on Rent</span>
            </span>
            <span className="px-3 py-1 rounded-md bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider border border-white/15">
              Electric Self-Propelled
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white max-w-3xl leading-none">
            Brand New Scissor Lift on Rent
          </h1>

          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed font-sans">
            Citizen Construction Rentals offers brand new scissor lift on rent options with our complete Straightline scissor lift rental fleet. Benefit from CE certified scissor lift on rent safety standards and electric scissor lift rental choices across 6m 8m 10m 12m 14m scissor lift on rent capacity classes delivered directly to your job site anywhere in India.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <WhatsAppCTA
              variant="amber"
              size="md"
              message="Hello Citizen Construction Rentals, I need a Brand New Scissor Lift on rent. Please share available models and rental rates."
            >
              Get Rental Quote on WhatsApp
            </WhatsAppCTA>
          </div>
        </div>
      </section>

      {/* Grid of 5 Model Cards */}
      <section className="py-16 sm:py-20 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-gray-200 gap-4">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-navy block mb-1">
                Full 5-Model Fleet
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-brand-ink">
                Brand New Scissor Lift on Rent — Straightline Fleet (6m 8m 10m 12m 14m Scissor Lift on Rent)
              </h2>
            </div>
            <span className="text-xs text-gray-500">
              Showing all 5 models with full technical specifications
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {scissorLiftsData.map((model) => (
              <MachineCard key={model.slug} type="scissor" model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* "Which height do you need?" Helper Strip */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-offwhite rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-heading font-bold uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Height Selection Guide</span>
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-wide text-brand-ink">
                  Which Height Do You Need?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  <strong>Working height is about 2 metres more than platform height</strong>, which accounts for the standing reach of an average operator. For instance, if you need to work on ceiling lights at 12 metres, our 10m platform model (GTJZ10) gives you exactly 12m of working height.
                </p>
                <div className="pt-2">
                  <WhatsAppCTA
                    variant="whatsapp"
                    size="sm"
                    message="Hello Citizen Construction Rentals, I'm not sure which scissor lift height I need. My ceiling/work height is: "
                  >
                    Ask an Expert on WhatsApp
                  </WhatsAppCTA>
                </div>
              </div>

              {/* Quick model reference buttons */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-5 gap-3">
                {scissorLiftsData.map((m) => (
                  <div
                    key={m.slug}
                    className="p-3.5 rounded-2xl bg-white border border-gray-200 text-center shadow-sm hover:border-brand-navy transition-colors flex flex-col justify-between"
                  >
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">
                      Model
                    </span>
                    <span className="font-heading font-bold text-lg text-brand-ink uppercase block my-1">
                      {m.modelCode}
                    </span>
                    <div className="text-xs bg-brand-navy/5 text-brand-navy font-bold py-1 px-1.5 rounded mb-1">
                      {m.workingHeight} Work
                    </div>
                    <span className="text-[11px] text-gray-500 block">
                      {m.platformHeight} Deck
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontally scrollable comparison table with sticky first column */}
      <section className="py-16 sm:py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ComparisonTable />
        </div>
      </section>

      {/* Final CTA Band */}
      <CtaBand
        heading="Ready to Rent a Straightline Scissor Lift?"
        subheading="Get competitive rental rates, availability, and immediate pan-India delivery."
        customMessage="Hello Citizen Construction Rentals, I need a quote for a Straightline Scissor Lift. My location: "
      />
    </>
  );
}
