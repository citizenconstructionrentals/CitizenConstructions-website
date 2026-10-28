import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  scissorLiftsData,
  COMMON_SCISSOR_FEATURES,
  SCISSOR_HIGHLIGHTS,
} from "@/data/scissor-lifts";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Gallery } from "@/components/machine/Gallery";
import { SpecTable } from "@/components/machine/SpecTable";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { CtaBand } from "@/components/shared/CtaBand";
import { ProductJsonLd } from "@/components/shared/JsonLd";
import {
  ShieldCheck,
  Zap,
  Phone,
  FileText,
  CheckCircle2,
  ArrowRight,
  Truck,
  MapPin,
  Clock,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return scissorLiftsData.map((m) => ({
    slug: m.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = scissorLiftsData.find((m) => m.slug === slug);
  if (!model) return {};

  const title = `${model.nominalHeight} Scissor Lift on Rent (${model.name}) | Citizen Construction Rentals`;
  const description = `Rent a ${model.nominalHeight} electric scissor lift (${model.name}) from Citizen Construction Rentals. Working height ${model.workingHeight}, platform height ${model.platformHeight}, rated capacity ${model.safeWorkingLoad}. CE certified.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/brand-new/scissor-lifts/${model.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/brand-new/scissor-lifts/${model.slug}`,
      images: [{ url: `${siteConfig.url}${model.images[0]}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}${model.images[0]}`],
    },
  };
}

export default async function ScissorModelPage({ params }: PageProps) {
  const { slug } = await params;
  const model = scissorLiftsData.find((m) => m.slug === slug);

  if (!model) {
    notFound();
  }

  const otherModels = scissorLiftsData.filter((m) => m.slug !== slug);
  const waModelMessage = `Hello Citizen Construction Rentals, I'd like a rental quote for the ${model.name} Scissor Lift. Site location: , Duration: `;
  const primaryKeyword = `${model.nominalHeight} scissor lift on rent`;
  const mClean = model.nominalHeight.replace(" ", "");
  const meterClean = model.nominalHeight.replace(" m", " meter");

  return (
    <>
      <ProductJsonLd model={model} />

      {/* Breadcrumb row */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Brand New", href: "/brand-new" },
              { label: "Scissor Lifts", href: "/brand-new/scissor-lifts" },
              { label: model.modelCode },
            ]}
          />
        </div>
      </div>

      {/* Main Product Header & Gallery Section */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-7">
              <Gallery images={model.images} title={`${primaryKeyword} - ${model.name}`} />
            </div>

            {/* Product Meta Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-heading font-bold uppercase tracking-wider border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available on Rent</span>
                </span>
                <span className="px-3 py-1 rounded-md bg-brand-navy/10 text-brand-navy text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-navy" /> CE Certified
                </span>
                <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  Brand New Fleet
                </span>
              </div>

              {/* Title H1 */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center gap-1.5 mb-1.5">
                  <Zap className="w-3.5 h-3.5 fill-current text-brand-amber" />
                  <span>Electric Self-Propelled Drive</span>
                </span>
                <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-brand-ink leading-tight">
                  {model.nominalHeight} Scissor Lift on Rent ({model.name})
                </h1>
                <p className="mt-2 text-sm text-gray-500 font-sans leading-relaxed">
                  Citizen Construction Rentals provides the Straightline {model.modelCode} electric scissor lift for indoor and outdoor access across India. Featuring an electric proportional drive, non-marking tyres, and CE-certified safety systems, delivered ready to operate at your site.
                </p>
              </div>

              {/* Key Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 bg-brand-offwhite rounded-2xl border border-gray-200/90 text-center">
                <div className="p-2">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block">
                    Working H
                  </span>
                  <span className="font-heading font-bold text-xl sm:text-2xl text-brand-navy">
                    {model.workingHeight}
                  </span>
                </div>
                <div className="p-2 border-l border-gray-200">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block">
                    Platform H
                  </span>
                  <span className="font-heading font-bold text-xl sm:text-2xl text-brand-ink">
                    {model.platformHeight}
                  </span>
                </div>
                <div className="p-2 border-l border-gray-200">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block">
                    SWL Capacity
                  </span>
                  <span className="font-heading font-bold text-xl sm:text-2xl text-brand-ink">
                    {model.safeWorkingLoad}
                  </span>
                </div>
                <div className="p-2 border-l border-gray-200">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block">
                    Total Weight
                  </span>
                  <span className="font-heading font-bold text-xl sm:text-2xl text-brand-ink">
                    {model.weight}
                  </span>
                </div>
              </div>

              {/* Rental Details Card as specified */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-sm text-slate-800">
                <div className="flex items-center gap-2 font-heading font-bold uppercase text-brand-ink text-base">
                  <Clock className="w-4 h-4 text-brand-amber" />
                  <span>Rental Details</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p>• <strong>Rental rate:</strong> on request</p>
                  <p>• <strong>Delivery:</strong> across India</p>
                  <p className="text-slate-600 pt-1">
                    Share your site location, rental duration and working height to get your quote on WhatsApp.
                  </p>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="space-y-3 pt-2">
                <WhatsAppCTA
                  variant="whatsapp"
                  size="lg"
                  className="w-full justify-center text-base"
                  message={waModelMessage}
                >
                  Get Rental Quote
                </WhatsAppCTA>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${siteConfig.phones.primary.raw}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-brand-navy text-brand-navy font-heading font-bold uppercase tracking-wider text-sm hover:bg-brand-navy hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>

                  {model.specSheetUrl && (
                    <a
                      href={model.specSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-offwhite hover:bg-gray-200/80 text-brand-ink font-heading font-bold uppercase tracking-wider text-sm border border-gray-200 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-brand-navy" />
                      <span>Download Spec Sheet</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Direct Support Note */}
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 flex items-center justify-between">
                <span>Immediate delivery available across India</span>
                <span className="font-semibold text-brand-navy">Since 2000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights in 4 Columns */}
      <section className="py-16 bg-brand-offwhite border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-brand-ink">
              Engineered for Highest Safety &amp; Uptime
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Straightline GTJZ design standards from official technical specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SCISSOR_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-4 font-heading font-bold text-lg">
                    0{idx + 1}
                  </div>
                  <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-brand-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Specification Tables: Technical Specifications & Dimensions */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-brand-ink">
              {primaryKeyword} — Detailed Specifications: {model.name}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Verified operational data, dimensions, and battery specs for site planning.
            </p>
          </div>

          <SpecTable model={model} />
        </div>
      </section>

      {/* Special Features Grid */}
      <section className="py-16 sm:py-20 bg-brand-offwhite border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-navy block mb-1">
              Standard Equipment
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-brand-ink">
              Special Features Included
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Every Straightline GTJZ machine includes this comprehensive safety &amp; operational suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 max-w-6xl mx-auto">
            {COMMON_SCISSOR_FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-xs text-xs sm:text-sm text-gray-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Models Row */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-navy block">
                Explore Alternative Heights
              </span>
              <h3 className="font-heading font-bold text-2xl uppercase tracking-tight text-brand-ink">
                Other Straightline Scissor Models on Rent
              </h3>
            </div>
            <Link
              href="/brand-new/scissor-lifts"
              className="text-xs font-heading font-bold uppercase tracking-wider text-brand-navy hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherModels.map((other) => (
              <Link
                key={other.slug}
                href={`/brand-new/scissor-lifts/${other.slug}`}
                className="p-4 rounded-2xl bg-brand-offwhite border border-gray-200 hover:border-brand-navy hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-navy px-2 py-0.5 rounded bg-brand-navy/10 inline-block mb-2">
                    {other.workingHeight} Working Height
                  </span>
                  <h4 className="font-heading font-bold text-lg uppercase text-brand-ink group-hover:text-brand-navy transition-colors">
                    {other.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Platform: {other.platformHeight} | SWL: {other.safeWorkingLoad}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-brand-navy">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA band */}
      <CtaBand
        heading={`Rent the Straightline ${model.modelCode} Today`}
        subheading="Chat with our rental desk for immediate dispatch, site suitability check, and rental rates."
        customMessage={waModelMessage}
      />
    </>
  );
}
