import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { boomLiftsData } from "@/data/boom-lifts";
import { MachineCard } from "@/components/machine/MachineCard";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { CtaBand } from "@/components/shared/CtaBand";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand New Boom Lifts on Rent | Straightline Fleet | Citizen Construction Rentals",
  description:
    "Rent brand new CE-certified Straightline telescopic and articulating boom lifts across India. High-reach access for construction, industrial plants, and facade work.",
  alternates: {
    canonical: `${siteConfig.url}/brand-new/boom-lifts`,
  },
  openGraph: {
    title: "Brand New Boom Lifts on Rent | Straightline Fleet | Citizen Construction Rentals",
    description:
      "Rent brand new CE-certified Straightline telescopic and articulating boom lifts across India. High-reach access for construction, industrial plants, and facade work.",
    url: `${siteConfig.url}/brand-new/boom-lifts`,
    images: [{ url: `${siteConfig.url}/images/hero/hero-boom-lot.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand New Boom Lifts on Rent | Straightline Fleet | Citizen Construction Rentals",
    description:
      "Rent brand new CE-certified Straightline telescopic and articulating boom lifts across India. High-reach access for construction, industrial plants, and facade work.",
    images: [`${siteConfig.url}/images/hero/hero-boom-lot.jpg`],
  },
};

export default function BoomLiftsListingPage() {
  const isLive = siteConfig.categoryStatus.brandNewBoom === "live";

  if (!isLive) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Brand New", href: "/brand-new" },
            { label: "Boom Lifts" },
          ]}
        />
        <ComingSoon categoryName="Brand New Boom Lifts" />
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
              { label: "Boom Lifts" },
            ]}
          />

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-5">
            <span className="px-3 py-1 rounded-md bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider border border-white/15">
              Straightline Fleet
            </span>
            <span className="px-3 py-1 rounded-md bg-brand-amber text-brand-navy text-xs font-heading font-bold uppercase tracking-wider">
              CE Certified
            </span>
            <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-heading font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available on Rent</span>
            </span>
            <span className="px-3 py-1 rounded-md bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider border border-white/15">
              High Reach &amp; Rough Terrain
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white max-w-3xl leading-none">
            Brand New Boom Lift on Rent
          </h1>

          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed font-sans">
            Citizen Construction Rentals provides brand new CE-certified Straightline boom lifts on rent across India. Choose from high-reach telescopic and versatile articulating models delivered directly to your job site.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <WhatsAppCTA
              variant="amber"
              size="md"
              message="Hello Citizen Construction Rentals, I'm interested in renting a Brand New Straightline Boom Lift. Please share available models and rental rates."
            >
              Get Rental Quote on WhatsApp
            </WhatsAppCTA>
          </div>
        </div>
      </section>

      {/* Grid of Model Cards */}
      <section className="py-16 sm:py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-gray-200 gap-4">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-navy block mb-1">
                Straightline Boom Models
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-brand-ink">
                Brand New Boom Lift on Rent — Straightline High Reach Series
              </h2>
            </div>
            <span className="text-xs text-gray-500">
              2 CE Certified Models Available on Rent
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {boomLiftsData.map((model) => (
              <MachineCard key={model.slug} type="boom" model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* Specifications on Request Banner */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-offwhite rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-heading font-bold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Technical Advisory</span>
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-wide text-brand-ink">
                Need Exact Reach Charts &amp; Boom Lift Spec Sheets?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                Our engineering team will share verified reach envelopes, gradeability parameters, and machine dimensions directly for your job site evaluation.
              </p>
            </div>

            <WhatsAppCTA
              variant="whatsapp"
              size="lg"
              className="shrink-0"
              message="Hello Citizen Construction Rentals, please share the boom lift technical spec sheets and reach charts. My location: "
            >
              Ask for Spec Sheet
            </WhatsAppCTA>
          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <CtaBand
        heading="Ready to Rent a Straightline Boom Lift?"
        subheading="Chat with our rental desk for availability, job-site delivery, and transparent rental rates."
      />
    </>
  );
}
