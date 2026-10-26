import React from "react";
import Image from "next/image";
import Link from "next/link";
import { boomLiftsData } from "@/data/boom-lifts";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ShieldCheck, ArrowRight } from "lucide-react";

export function BrandNewBoomSection() {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="eyebrow-label justify-center mb-2.5">
            <span className="slash-accent" />
            <span>Straightline Boom Lifts</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-bold tracking-tight text-slate-900">
            Brand New Boom Lifts
          </h2>
          <p className="mt-2 text-[16px] sm:text-[17px] text-slate-600">
            Heavy-duty telescopic and articulating reach platforms engineered for expansive high-altitude safety.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {boomLiftsData.map((model) => (
            <div
              key={model.slug}
              className="card-premium p-6 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Image Area: Light off-white */}
                <div className="relative h-56 w-full rounded-xl bg-brand-offwhite p-4 mb-5 border border-slate-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={model.images[0]}
                    alt={model.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Top Meta Chips */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold text-brand-navy">
                    {model.type}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>CE Certified</span>
                  </span>
                </div>

                {/* Model Name */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-navy transition-colors mb-2">
                  {model.name}
                </h3>

                {/* Short Summary (No guessed spec numbers) */}
                <p className="text-[14px] text-slate-600 leading-relaxed line-clamp-2 mb-6">
                  {model.summary}
                </p>
              </div>

              {/* Card Actions: View Details & Get Quote */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                <Link
                  href={`/brand-new/boom-lifts/${model.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[14px] font-semibold transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <WhatsAppCTA
                  variant="whatsapp"
                  size="sm"
                  className="flex-1 h-10 py-2.5 px-3 text-[14px]"
                  message={`Hello Citizen Construction Rentals, I need a rental quote for the ${model.name}. Please share availability and rates.`}
                  modalTitle={`Inquire: ${model.name}`}
                >
                  Get Quote
                </WhatsAppCTA>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer Link */}
        <div className="mt-12 text-center">
          <Link
            href="/brand-new/boom-lifts"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-navy hover:text-brand-navy-dark"
          >
            <span>Explore All Straightline Boom Lifts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
