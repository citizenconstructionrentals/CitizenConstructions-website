import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import {
  usedScissorBrands,
  usedBoomBrands,
  USED_TRADEMARK_DISCLAIMER,
} from "@/data/used";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { CtaBand } from "@/components/shared/CtaBand";
import {
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JLG and Genie Lift on Rent | Citizen Construction Rentals India",
  description:
    "Citizen Construction Rentals offers JLG and Genie lift on rent across India. Reliable used lift on rent options with JLG lift rental and Genie lift rental backed by trusted aerial platform hire dispatch.",
  alternates: {
    canonical: `${siteConfig.url}/used`,
  },
  keywords: [
    "JLG and Genie lift on rent",
    "used lift on rent",
    "JLG lift rental",
    "Genie lift rental",
    "trusted aerial platform hire",
  ],
};

export default function UsedLandingPage() {
  const isScissorLive = siteConfig.categoryStatus.usedScissor === "live";
  const isBoomLive = siteConfig.categoryStatus.usedBoom === "live";

  if (!isScissorLive && !isBoomLive) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Used Fleet" }]} />
        <ComingSoon categoryName="Used Fleet" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-brand-navy text-white py-14 sm:py-20 relative overflow-hidden">
        {/* Slanted Amber Slash Accent */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-amber/15 -skew-x-12 translate-x-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: "Used Fleet" }]} />

          {/* Brands text badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-5">
            <span className="text-xs font-semibold text-blue-200">Brands Available:</span>
            <span className="px-3 py-1 rounded-md bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider border border-white/20">
              JLG
            </span>
            <span className="px-3 py-1 rounded-md bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider border border-white/20">
              Genie
            </span>
            <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-heading font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available on Rent</span>
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white max-w-3xl leading-none">
            JLG and Genie Lift on Rent
          </h1>

          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed font-sans">
            Citizen Construction Rentals offers dependable JLG and Genie lift on rent options across India. Choose our used lift on rent inventory with dedicated JLG lift rental and Genie lift rental choices for trusted aerial platform hire on every job site.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <WhatsAppCTA
              variant="amber"
              size="md"
              message="Hello Citizen Construction Rentals, I'm looking for a Used JLG or Genie lift on rent. Please share available models and rental rates."
            >
              Check Availability &amp; Rental Rates
            </WhatsAppCTA>
          </div>
        </div>
      </section>

      {/* Two Subcategory Cards */}
      <section className="py-16 sm:py-20 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-brand-ink">
              JLG and Genie Lift on Rent — Scissor &amp; Boom Series
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Reliable slab scissor lifts for vertical elevation or articulating/telescopic boom lifts for up-and-over outreach on rent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Used Scissor Lifts */}
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-card p-6 sm:p-8 flex flex-col justify-between group hover:shadow-card-hover transition-all">
              <div>
                <div className="relative h-60 w-full mb-6 rounded-2xl overflow-hidden bg-brand-offwhite p-4">
                  <Image
                    src="/images/used/jlg-scissor-hd.png"
                    alt="JLG and Genie lift on rent - Scissor Lift"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                    priority
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-navy/10 text-brand-navy">
                    JLG &amp; Genie
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Available on Rent
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-brand-ink group-hover:text-brand-navy transition-colors">
                  Used Scissor Lifts on Rent
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Smooth electric slab scissor lifts from JLG and Genie. Compact dimensions and roll-out deck extensions, ideal for plant maintenance, warehousing, and commercial fit-outs.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/used/scissor-lifts"
                  className="font-heading font-bold uppercase tracking-wider text-brand-navy inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>Explore Used Scissor Lifts</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <WhatsAppCTA
                  variant="whatsapp"
                  size="sm"
                  message="Hello Citizen Construction Rentals, I need a Used Scissor Lift on rent. Please share available models and rental rates."
                >
                  Check Availability &amp; Rental Rates
                </WhatsAppCTA>
              </div>
            </div>

            {/* Used Boom Lifts */}
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-card p-6 sm:p-8 flex flex-col justify-between group hover:shadow-card-hover transition-all">
              <div>
                <div className="relative h-60 w-full mb-6 rounded-2xl overflow-hidden bg-brand-offwhite p-4">
                  <Image
                    src="/images/used/jlg-boom-hd.png"
                    alt="JLG and Genie lift on rent - Boom Lift"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                    priority
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-navy/10 text-brand-navy">
                    JLG &amp; Genie
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Available on Rent
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-brand-ink group-hover:text-brand-navy transition-colors">
                  Used Boom Lifts on Rent
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Industry-standard telescopic and articulating boom lifts from JLG and Genie. Maximum reach over obstacles for construction, steel structures, and outdoor plant maintenance.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/used/boom-lifts"
                  className="font-heading font-bold uppercase tracking-wider text-brand-navy inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>Explore Used Boom Lifts</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <WhatsAppCTA
                  variant="whatsapp"
                  size="sm"
                  message="Hello Citizen Construction Rentals, I need a Used Boom Lift on rent. Please share available models and rental rates."
                >
                  Check Availability &amp; Rental Rates
                </WhatsAppCTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Disclaimer Banner */}
      <section className="py-8 bg-white border-t border-gray-200 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            {USED_TRADEMARK_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* Final CTA band */}
      <CtaBand
        heading="Looking for a Used JLG or Genie Lift on Rent?"
        subheading="Chat with our rental desk for available models, working heights, and rental rates."
        customMessage="Hello Citizen Construction Rentals, I'm looking for a Used JLG / Genie lift on rent. My location: "
      />
    </>
  );
}
