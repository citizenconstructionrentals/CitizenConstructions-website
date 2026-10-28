import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { CtaBand } from "@/components/shared/CtaBand";
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Brand New Fleet on Rent | Citizen Construction Rentals",
  description:
    "Rent brand new CE-certified Straightline electric scissor lifts and boom lifts from Citizen Construction Rentals. Delivered to your site across India.",
  alternates: {
    canonical: `${siteConfig.url}/brand-new`,
  },
  openGraph: {
    title: "Brand New Fleet on Rent | Citizen Construction Rentals",
    description:
      "Rent brand new CE-certified Straightline electric scissor lifts and boom lifts from Citizen Construction Rentals. Delivered to your site across India.",
    url: `${siteConfig.url}/brand-new`,
    images: [{ url: `${siteConfig.url}/images/hero/hero-boom-lot.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand New Fleet on Rent | Citizen Construction Rentals",
    description:
      "Rent brand new CE-certified Straightline electric scissor lifts and boom lifts from Citizen Construction Rentals. Delivered to your site across India.",
    images: [`${siteConfig.url}/images/hero/hero-boom-lot.jpg`],
  },
};

export default function BrandNewPage() {
  // Category status check
  const isScissorLive = siteConfig.categoryStatus.brandNewScissor === "live";
  const isBoomLive = siteConfig.categoryStatus.brandNewBoom === "live";

  if (!isScissorLive && !isBoomLive) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Brand New" }]} />
        <ComingSoon categoryName="Brand New Fleet" />
      </div>
    );
  }

  const checklist = [
    "Safety-inspected and job-ready lift condition",
    "Full European CE safety certification compliance",
    "Available on rent across all states in India",
    "Self-propelled electric drive with proportional controls",
    "Non-marking solid rubber tyres suitable for indoor and outdoor floors",
    "Automatic pothole protection and dynamic tilt safety sensors",
    "Dual emergency descent controls on platform and base chassis",
    "Prompt mobilization and delivery directly to your project site",
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy text-white py-14 sm:py-20 relative overflow-hidden">
        {/* Slanted Amber Slash Accent */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-amber/15 -skew-x-12 translate-x-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: "Brand New Fleet" }]} />

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-6">
            <span className="px-3 py-1 rounded-md bg-white/10 text-white text-xs font-heading font-bold uppercase tracking-wider border border-white/15">
              Straightline
            </span>
            <span className="px-3 py-1 rounded-md bg-brand-amber text-brand-navy text-xs font-heading font-bold uppercase tracking-wider">
              CE Certified
            </span>
            <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-heading font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available on Rent</span>
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white max-w-3xl leading-none">
            Brand New Lift on Rent
          </h1>

          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed font-sans">
            Citizen Construction Rentals provides brand new CE-certified Straightline electric scissor lifts and boom lifts on rent across India. Each machine is delivered directly to your project site ready for immediate operation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <WhatsAppCTA
              variant="amber"
              size="md"
              message="Hello Citizen Construction Rentals, I'm interested in renting a Brand New Straightline lift. Please share availability and rental rates."
            >
              Get Rental Quote on WhatsApp
            </WhatsAppCTA>
          </div>
        </div>
      </section>

      {/* Two Subcategory Cards */}
      <section className="py-16 sm:py-20 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-brand-ink">
              Brand New Fleet — Scissor &amp; Boom Series
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Select a brand new scissor lift or boom lift backed by full technical support and maintenance assistance across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Scissor Lifts */}
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-card p-6 sm:p-8 flex flex-col justify-between group hover:shadow-card-hover transition-all">
              <div>
                <div className="relative h-60 w-full mb-6 rounded-2xl overflow-hidden bg-brand-offwhite p-4">
                  <Image
                    src="/images/machines/scissor/straightline-gtjz12-hd.png"
                    alt="Straightline GTJZ12 electric scissor lift, 12 m platform height"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                    priority
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-navy/10 text-brand-navy">
                    6m to 14m Platform Height
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    5 Models
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-brand-ink group-hover:text-brand-navy transition-colors">
                  Electric Scissor Lifts on Rent
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Compact footprint, self-propelled electric drive, 0.9m roll-out extension deck, and tight turning radiuses for warehouses, commercial buildings, and industrial facilities.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/brand-new/scissor-lifts"
                  className="font-heading font-bold uppercase tracking-wider text-brand-navy inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>View All 5 Scissor Models</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <WhatsAppCTA
                  variant="whatsapp"
                  size="sm"
                  message="Hello Citizen Construction Rentals, I need a Brand New Scissor Lift on rent. Please share rental rates."
                >
                  Get Rental Quote
                </WhatsAppCTA>
              </div>
            </div>

            {/* Boom Lifts */}
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-card p-6 sm:p-8 flex flex-col justify-between group hover:shadow-card-hover transition-all">
              <div>
                <div className="relative h-60 w-full mb-6 rounded-2xl overflow-hidden bg-brand-offwhite p-4">
                  <Image
                    src="/images/machines/boom/sl28t.png"
                    alt="Straightline SL28T telescopic boom lift, 28 m working height"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-amber/20 text-amber-900">
                    High-Reach &amp; Articulated
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    2 Models
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-brand-ink group-hover:text-brand-navy transition-colors">
                  Boom Lifts on Rent
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Straightline telescopic (SL28T) and articulating boom lifts designed for high elevation access over obstacles on industrial and infrastructure jobs.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/brand-new/boom-lifts"
                  className="font-heading font-bold uppercase tracking-wider text-brand-navy inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>View All 2 Boom Models</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <WhatsAppCTA
                  variant="whatsapp"
                  size="sm"
                  message="Hello Citizen Construction Rentals, I need a Brand New Boom Lift on rent. Please share rental rates."
                >
                  Get Rental Quote
                </WhatsAppCTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "What You Get" Checklist Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-heading font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Brand New Advantage</span>
            </div>

            <h2 className="font-heading font-bold text-3xl sm:text-5xl uppercase tracking-tight text-brand-ink">
              CE Certified Lift on Rent Standards
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
              When critical project timelines demand zero downtime, our Straightline lift rental fleet ensures CE certified lift on rent compliance and optimal productivity on every shift.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {checklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-4 rounded-xl bg-brand-offwhite border border-gray-200/70 text-xs sm:text-sm text-gray-700"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-10 text-center">
            <WhatsAppCTA
              variant="whatsapp"
              size="md"
              message="Hello Citizen Construction Rentals, I want to rent a Brand New Straightline lift. Please share rental rates."
            >
              Check Brand New Rental Rates on WhatsApp
            </WhatsAppCTA>
          </div>
        </div>
      </section>

      {/* Final CTA band */}
      <CtaBand
        heading="Need Brand New Straightline Lifts on Rent?"
        subheading="Get instant availability, technical guidance, and direct rental quotes on WhatsApp."
        customMessage="Hello Citizen Construction Rentals, I need a Brand New Straightline lift on rent. My location: "
      />
    </>
  );
}
