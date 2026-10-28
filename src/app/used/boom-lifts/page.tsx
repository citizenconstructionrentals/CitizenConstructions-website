import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import {
  usedBoomBrands,
  USED_TRADEMARK_DISCLAIMER,
} from "@/data/used";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { CtaBand } from "@/components/shared/CtaBand";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "JLG & Genie Boom Lifts on Rent | Citizen Construction Rentals",
  description:
    "Rent inspected used JLG and Genie boom lifts across India from Citizen Construction Rentals. Telescopic and articulating models delivered to your site.",
  alternates: {
    canonical: `${siteConfig.url}/used/boom-lifts`,
  },
  openGraph: {
    title: "JLG & Genie Boom Lifts on Rent | Citizen Construction Rentals",
    description:
      "Rent inspected used JLG and Genie boom lifts across India from Citizen Construction Rentals. Telescopic and articulating models delivered to your site.",
    url: `${siteConfig.url}/used/boom-lifts`,
    images: [{ url: `${siteConfig.url}/images/hero/hero-boom-lot.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JLG & Genie Boom Lifts on Rent | Citizen Construction Rentals",
    description:
      "Rent inspected used JLG and Genie boom lifts across India from Citizen Construction Rentals. Telescopic and articulating models delivered to your site.",
    images: [`${siteConfig.url}/images/hero/hero-boom-lot.jpg`],
  },
};

export default function UsedBoomLiftsPage() {
  const isLive = siteConfig.categoryStatus.usedBoom === "live";

  if (!isLive) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Used", href: "/used" },
            { label: "Boom Lifts" },
          ]}
        />
        <ComingSoon categoryName="Used Boom Lifts" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-brand-navy text-white py-14 sm:py-18 relative overflow-hidden">
        {/* Slanted Amber Slash Accent */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-amber/15 -skew-x-12 translate-x-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: "Used", href: "/used" },
              { label: "Boom Lifts" },
            ]}
          />

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-5">
            <span className="px-3 py-1 rounded-md bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider border border-white/15">
              Rental Fleet
            </span>
            <span className="px-3 py-1 rounded-md bg-brand-amber text-brand-navy text-xs font-heading font-bold uppercase tracking-wider">
              JLG &amp; Genie
            </span>
            <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-heading font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available on Rent</span>
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white max-w-3xl leading-none">
            JLG Boom Lift on Rent &amp; Genie Fleet
          </h1>

          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed font-sans">
            Citizen Construction Rentals provides dependable JLG and Genie boom lifts on rent across India. High-reach telescopic and articulating machines delivered directly from our Delhi base to your site.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <WhatsAppCTA
              variant="amber"
              size="md"
              message="Hello Citizen Construction Rentals, I need a JLG or Genie Boom Lift on rent. Please share available models and rental rates."
            >
              Check Availability &amp; Rental Rates
            </WhatsAppCTA>
          </div>
        </div>
      </section>

      {/* Main Content: Brand Cards */}
      <section className="py-16 sm:py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {usedBoomBrands.map((item) => (
              <div
                key={item.brand}
                className="bg-white rounded-3xl border border-gray-200/90 shadow-card p-6 sm:p-8 flex flex-col justify-between group hover:shadow-card-hover transition-all"
              >
                <div>
                  <div className="relative h-64 w-full mb-6 rounded-2xl overflow-hidden bg-brand-offwhite p-4">
                    <Image
                      src={item.image}
                      alt={item.brand === "JLG" ? "Used JLG telescopic boom lift" : "Used Genie articulating boom lift"}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                      priority
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-heading font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-brand-navy/10 text-brand-navy">
                      {item.brand} Fleet
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Available on Rent</span>
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-wide text-brand-ink group-hover:text-brand-navy transition-colors">
                    {item.brand === "JLG" ? "JLG Boom Lift on Rent" : "Genie Boom Lift on Rent"}
                  </h2>

                  <p className="text-sm text-gray-600 mt-3 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                  <WhatsAppCTA
                    variant="whatsapp"
                    size="md"
                    className="w-full justify-center"
                    message={item.whatsappMessage}
                  >
                    Check Availability &amp; Rental Rates
                  </WhatsAppCTA>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-navy" />
                    <span>Delivered to Your Site Across India</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trademark Disclaimer on all Used pages */}
      <section className="py-6 bg-white border-t border-gray-200 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            {USED_TRADEMARK_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* Final CTA band */}
      <CtaBand
        heading="Need a Used Boom Lift on Rent?"
        subheading="Chat with our rental desk for available reach envelopes, models, and rental quotes."
        customMessage="Hello Citizen Construction Rentals, I need a Used Boom Lift on rent. My location: "
      />
    </>
  );
}
