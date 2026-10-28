import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ArrowRight, Calculator, CheckCircle2, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/shared/CtaBand";

export const metadata: Metadata = {
  title: "Rental Rates & Charges | Citizen Construction Rentals",
  description:
    "Transparent rental pricing for scissor lifts and boom lifts across India. Learn how daily rates, monthly contracts, and mobilization freight are calculated.",
  alternates: {
    canonical: `${siteConfig.url}/rental-rates`,
  },
  openGraph: {
    title: "Rental Rates & Charges | Citizen Construction Rentals",
    description:
      "Transparent rental pricing for scissor lifts and boom lifts across India. Learn how daily rates, monthly contracts, and mobilization freight are calculated.",
    url: `${siteConfig.url}/rental-rates`,
    images: [{ url: `${siteConfig.url}/images/hero/hero-boom-lot.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rental Rates & Charges | Citizen Construction Rentals",
    description:
      "Transparent rental pricing for scissor lifts and boom lifts across India. Learn how daily rates, monthly contracts, and mobilization freight are calculated.",
    images: [`${siteConfig.url}/images/hero/hero-boom-lot.jpg`],
  },
};

export default function RentalRatesPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-amber/10 -skew-x-12 translate-x-16 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: "Rental Rates" }]} />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-amber my-4">
            <Calculator className="w-4 h-4" />
            <span>Transparent Rental Pricing Structure</span>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white max-w-4xl leading-tight">
            Scissor Lift Rental Rate &amp; Cost Factors in India
          </h1>

          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-3xl leading-relaxed font-sans">
            Citizen Construction Rentals provides customized rates for aerial work platform hire across India. Learn how daily rentals, monthly contracts, and equipment mobilization freight are determined.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="btn-pill btn-pill-amber h-12 text-sm font-bold uppercase"
            >
              <span>Request Custom Rental Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Cost Factors Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="eyebrow-label mb-2">
                <span className="slash-accent" />
                <span>Transparent Terms</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 uppercase font-heading">
                Scissor Lift Rental Rate &amp; Cost Factor Calculations
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                Aerial work platform rental charges are structured based on technical job specifications rather than fixed one-size-fits-all figures. Citizen Construction Rentals ensures clear, itemized pricing for every project.
              </p>
            </div>
            <div className="lg:col-span-4 relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-brand-offwhite border border-slate-200 p-4 flex items-center justify-center">
              <Image
                src="/images/machines/scissor/straightline-cutout-hd.png"
                alt="Straightline electric scissor lift"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-brand-offwhite border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center font-bold text-base mb-4 font-heading">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-lg uppercase font-heading">
                Working Height &amp; Model
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                A 6m or 8m scissor lift has different equipment value than a high-reach 14m scissor lift or a 28m boom lift. Your required working height directly defines machine class.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-offwhite border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center font-bold text-base mb-4 font-heading">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-lg uppercase font-heading">
                Brand New vs Used Fleet
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Brand new Straightline CE-certified lifts offer peak technology and zero-hour reliability. Tested used JLG and Genie machines provide a competitive budget-friendly alternative.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-offwhite border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center font-bold text-base mb-4 font-heading">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-lg uppercase font-heading">
                Rental Duration
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                We accommodate both short-term daily rentals for urgent shutdowns as well as extended monthly contracts with volume discounts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-offwhite border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center font-bold text-base mb-4 font-heading">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-lg uppercase font-heading">
                Site Location &amp; Transport
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mobilization freight charges are determined by distance from our logistics yards to your project location, ensuring clear, itemized logistics costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs on Rental Rates */}
      <section className="py-16 sm:py-20 bg-brand-offwhite border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-slate-900 font-heading text-center mb-8">
            Frequently Asked Questions on Rental Charges
          </h2>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                What is the rent of a scissor lift per day in India?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Daily scissor lift rental rates depend upon the working height of the lift, whether you rent brand new Straightline or used JLG/Genie models, total days required, site location, and equipment transport mobilization. Share these details on WhatsApp for an accurate quote tailored to your exact site requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                How much does it cost to rent a scissor lift for a month?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Monthly rentals represent the most cost-effective tier for continuous construction and warehouse fit-out contracts. Contact our rental desk with your project duration for competitive monthly pricing.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                How is boom lift rental cost calculated?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Boom lift rental charges are evaluated based on vertical reach height (such as 16m articulating or 28m telescopic reach), terrain capability, deployment timeframe, and transport freight to your destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <CtaBand />
    </>
  );
}
