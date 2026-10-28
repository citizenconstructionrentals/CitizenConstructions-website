import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { boomLiftsData } from "@/data/boom-lifts";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqSection } from "@/components/home/FaqSection";
import { FaqJsonLd } from "@/components/shared/JsonLd";
import { BOOM_FAQS } from "@/data/faq";

export const metadata: Metadata = {
  title: "Boom Lift on Rent in India | High Reach Aerial Work Platforms",
  description:
    "Rent Straightline telescopic and articulating boom lifts and used JLG and Genie machines across India. High-reach access for industrial and infrastructure sites.",
  alternates: {
    canonical: `${siteConfig.url}/boom-lift-on-rent`,
  },
  openGraph: {
    title: "Boom Lift on Rent in India | High Reach Aerial Work Platforms",
    description:
      "Rent Straightline telescopic and articulating boom lifts and used JLG and Genie machines across India. High-reach access for industrial and infrastructure sites.",
    url: `${siteConfig.url}/boom-lift-on-rent`,
    images: [{ url: `${siteConfig.url}/images/hero/hero-boom-lot.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boom Lift on Rent in India | High Reach Aerial Work Platforms",
    description:
      "Rent Straightline telescopic and articulating boom lifts and used JLG and Genie machines across India. High-reach access for industrial and infrastructure sites.",
    images: [`${siteConfig.url}/images/hero/hero-boom-lot.jpg`],
  },
};

export default function BoomLiftOnRentPage() {
  return (
    <>
      <FaqJsonLd items={BOOM_FAQS} />
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-amber/10 -skew-x-12 translate-x-16 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: "Boom Lift on Rent" }]} />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-amber my-4">
            <ShieldCheck className="w-4 h-4" />
            <span>High Reach Access • Heavy Project Mobilization</span>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white max-w-4xl leading-tight">
            Boom Lift on Rent in India
          </h1>

          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-3xl leading-relaxed font-sans">
            Citizen Construction Rentals provides heavy-duty boom lift on rent in India for industrial plants, infrastructure development, petrochemical facilities, and architectural facade work.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 pt-2">
            <Link
              href="/brand-new/boom-lifts"
              className="btn-pill btn-pill-amber h-12 text-sm font-bold uppercase"
            >
              <span>Explore Brand New Boom Lifts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/rental-rates"
              className="btn-pill border border-white/30 text-white hover:bg-white/10 h-12 text-sm font-bold uppercase transition-colors"
            >
              <span>Check Rental Rates</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Explanatory Boom Lift Types Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="eyebrow-label mb-2">
              <span className="slash-accent" />
              <span>High-Altitude Access</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 uppercase">
              High Reach Telescopic &amp; Articulating Fleet
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              When working at elevated heights or over ground obstacles, boom lifts provide the outreach and stability needed for demanding industrial tasks. Telescopic models deliver direct straight outreach for maximum vertical extension, while articulating models feature hinged boom sections to maneuver up, over, and around structural steel, piping, and machinery.
            </p>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Our inventory includes brand new Straightline lifts as well as trusted used JLG and Genie machines. Each unit is delivered directly from our Delhi base to your site following thorough pre-dispatch inspection.
            </p>
          </div>

          {/* Model Cards Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {boomLiftsData.map((model) => (
              <div
                key={model.slug}
                className="card-premium flex flex-col justify-between overflow-hidden border border-slate-200/90 hover:border-brand-navy transition-all"
              >
                <div>
                  <div className="relative h-64 w-full bg-slate-50 border-b border-slate-100">
                    <Image
                      src={model.images[0]}
                      alt={`${model.name} ${model.type.toLowerCase()}, ${model.workingHeight} working height`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold uppercase text-slate-900 font-heading">
                      {model.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                      {model.condition} • CE Certified
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 bg-brand-offwhite p-3.5 rounded-xl text-xs">
                      <div>
                        <span className="text-slate-500 block">Working Height:</span>
                        <span className="font-bold text-slate-900 text-sm">{model.workingHeight || "On Request"}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Platform Height:</span>
                        <span className="font-bold text-slate-900 text-sm">{model.platformHeight || "On Request"}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Capacity:</span>
                        <span className="font-bold text-slate-900 text-sm">{model.capacity || "On Request"}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Availability:</span>
                        <span className="font-bold text-emerald-700 text-sm">{model.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/brand-new/boom-lifts/${model.slug}`}
                    className="btn-pill btn-pill-navy w-full justify-center text-xs uppercase font-bold"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Applications for Boom Lifts */}
      <section className="py-16 sm:py-20 bg-brand-offwhite border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-slate-900 font-heading">
              Boom Lift for High Reach Work Applications
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Our boom lifts on hire are engineered to tackle demanding construction and facility requirements:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="font-bold text-brand-navy font-heading text-lg uppercase">Heavy Industrial Plants</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Refinery pipe racking, power station retrofits, overhead crane servicing, and structural beam maintenance.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="font-bold text-brand-navy font-heading text-lg uppercase">Commercial Facades</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                High-rise glass installation, exterior pressure washing, sealant application, and architectural finishing.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="font-bold text-brand-navy font-heading text-lg uppercase">Infrastructure Projects</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Metro viaduct inspections, airport terminal construction, stadium lighting, and bridge retrofitting.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="font-bold text-brand-navy font-heading text-lg uppercase">High Altitude Signage</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Large billboard mounting, high-mast electrical cabling, highway hoardings, and LED display installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs on Boom Lifts */}
      <FaqSection
        items={BOOM_FAQS}
        layout="centered"
        title="Frequently Asked Questions: Boom Lift Rental"
      />

      {/* Final Call to Action */}
      <CtaBand />
    </>
  );
}
