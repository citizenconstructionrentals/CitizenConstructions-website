import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { boomLiftsData } from "@/data/boom-lifts";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Gallery } from "@/components/machine/Gallery";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { CtaBand } from "@/components/shared/CtaBand";
import {
  ShieldCheck,
  Phone,
  FileQuestion,
  ArrowRight,
  Clock,
  MapPin,
  Truck,
  FileText,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return boomLiftsData.map((m) => ({
    slug: m.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = boomLiftsData.find((m) => m.slug === slug);
  if (!model) return {};

  const isSl28t = slug === "sl28t";
  const primaryKeyword = isSl28t
    ? "Straightline SL28T boom lift on rent"
    : "Straightline articulating boom lift on rent";

  const description = isSl28t
    ? "Get Straightline SL28T boom lift on rent across India. SL28T boom lift rental with 28m working height boom lift hire and high reach boom lift rental India for demanding boom lift on rent sites."
    : "Get Straightline articulating boom lift on rent across India. Articulating boom lift rental with up and over boom lift hire and 16m working height boom lift rental for versatile boom lift on rent sites.";

  return {
    title: `${primaryKeyword} | Citizen Construction Rentals`,
    description,
    alternates: {
      canonical: `${siteConfig.url}/brand-new/boom-lifts/${slug}`,
    },
    keywords: isSl28t
      ? [
          "Straightline SL28T boom lift on rent",
          "SL28T boom lift rental",
          "boom lift on rent",
          "28m working height boom lift hire",
          "high reach boom lift rental India",
        ]
      : [
          "Straightline articulating boom lift on rent",
          "articulating boom lift rental",
          "boom lift on rent",
          "up and over boom lift hire",
          "16m working height boom lift rental",
        ],
  };
}

export default async function BoomModelPage({ params }: PageProps) {
  const { slug } = await params;
  const model = boomLiftsData.find((m) => m.slug === slug);

  if (!model) {
    notFound();
  }

  const isSl28t = slug === "sl28t";
  const primaryKeyword = isSl28t
    ? "Straightline SL28T boom lift on rent"
    : "Straightline articulating boom lift on rent";

  const otherModels = boomLiftsData.filter((m) => m.slug !== slug);
  const waMessage = `Hello Citizen Construction Rentals, I'd like a rental quote for the ${primaryKeyword}. Site location: , Duration: `;
  const isDark = model.theme === "dark";

  const hasSpecs =
    Boolean(model.workingHeight) ||
    Boolean(model.platformHeight) ||
    Boolean(model.horizontalOutreach) ||
    Boolean(model.capacity) ||
    Boolean(model.weight) ||
    Boolean(model.powerType) ||
    (model.specs && model.specs.length > 0);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Brand New", href: "/brand-new" },
              { label: "Boom Lifts", href: "/brand-new/boom-lifts" },
              { label: model.name },
            ]}
          />
        </div>
      </div>

      {/* Product Hero & Gallery */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Gallery */}
            <div className="lg:col-span-7">
              <Gallery
                images={model.images}
                title={primaryKeyword}
                isDarkTheme={isDark}
              />
            </div>

            {/* Product Meta */}
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

              {/* Title */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-navy block mb-1">
                  {model.type}
                </span>
                <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-brand-ink leading-tight">
                  {primaryKeyword}
                </h1>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed font-sans">
                  {isSl28t
                    ? "Looking for a Straightline SL28T boom lift on rent? Citizen Construction Rentals provides professional SL28T boom lift rental and 28m working height boom lift hire across India. Our high reach boom lift rental India fleet ensures reliable performance for any boom lift on rent deployment."
                    : "Looking for a Straightline articulating boom lift on rent? Citizen Construction Rentals offers articulating boom lift rental with up and over boom lift hire and 16m working height boom lift rental. Perfect for clearing structural obstacles on your boom lift on rent projects."}
                </p>
              </div>

              {/* Key stats row */}
              {hasSpecs ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 bg-brand-offwhite rounded-2xl border border-gray-200/90 text-center">
                  {model.workingHeight && (
                    <div className="p-2">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block">
                        Work Height
                      </span>
                      <span className="font-heading font-bold text-xl text-brand-navy">
                        {model.workingHeight}
                      </span>
                    </div>
                  )}
                  {model.platformHeight && (
                    <div className="p-2 border-l border-gray-200">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block">
                        Deck Height
                      </span>
                      <span className="font-heading font-bold text-xl text-brand-ink">
                        {model.platformHeight}
                      </span>
                    </div>
                  )}
                  {model.horizontalOutreach && (
                    <div className="p-2 border-l border-gray-200">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block">
                        Outreach
                      </span>
                      <span className="font-heading font-bold text-xl text-brand-ink">
                        {model.horizontalOutreach}
                      </span>
                    </div>
                  )}
                  {model.capacity && (
                    <div className="p-2 border-l border-gray-200">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block">
                        Capacity
                      </span>
                      <span className="font-heading font-bold text-xl text-brand-ink">
                        {model.capacity}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-brand-offwhite border border-gray-200/90 shadow-soft space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center">
                      <FileQuestion className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base uppercase text-brand-ink">
                        Full Technical Specifications on Request
                      </h3>
                      <p className="text-xs text-gray-500">
                        Official technical envelope diagrams &amp; reach charts
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    Reach charts, exact working height, platform capacity, and gradeability data are shared directly by our engineering desk.
                  </p>
                  <WhatsAppCTA
                    variant="amber"
                    size="sm"
                    className="w-full justify-center"
                    message={`Hello Citizen Construction Rentals, please share the technical specification sheet and reach chart for the ${model.name}. My location: `}
                  >
                    Download Spec Sheet
                  </WhatsAppCTA>
                </div>
              )}

              {/* Rental Details Card */}
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

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <WhatsAppCTA
                  variant="whatsapp"
                  size="lg"
                  className="w-full justify-center text-base"
                  message={waMessage}
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

                  {model.specSheetUrl ? (
                    <a
                      href={model.specSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-offwhite hover:bg-gray-200/80 text-brand-ink font-heading font-bold uppercase tracking-wider text-sm border border-gray-200 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-brand-navy" />
                      <span>Spec Sheet</span>
                    </a>
                  ) : (
                    <WhatsAppCTA
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      message={`Hello Citizen Construction Rentals, please share the spec sheet for ${model.name}.`}
                    >
                      Spec Sheet
                    </WhatsAppCTA>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Why Citizen" Strip */}
      <section className="py-12 bg-brand-offwhite border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-tight text-brand-ink">
              {primaryKeyword} — Specifications &amp; Working Reach
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-gray-200 flex items-start gap-3.5">
              <Clock className="w-6 h-6 text-brand-amber shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold uppercase text-base text-brand-ink">
                  Serving Since 2000
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Over two decades of dependable aerial work platform equipment rentals.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-200 flex items-start gap-3.5">
              <MapPin className="w-6 h-6 text-brand-amber shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold uppercase text-base text-brand-ink">
                  Pan-India Delivery
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Reliable logistics delivering directly to your infrastructure or industrial project site.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-200 flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-brand-amber shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold uppercase text-base text-brand-ink">
                  CE Certified Fleet
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Brand new Straightline units available on rent meeting stringent safety standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Models Row */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-navy block">
                Explore Other Options
              </span>
              <h3 className="font-heading font-bold text-2xl uppercase tracking-tight text-brand-ink">
                Other Straightline Boom Lifts on Rent
              </h3>
            </div>
            <Link
              href="/brand-new/boom-lifts"
              className="text-xs font-heading font-bold uppercase tracking-wider text-brand-navy hover:underline flex items-center gap-1"
            >
              <span>View All Booms</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {otherModels.map((other) => (
              <Link
                key={other.slug}
                href={`/brand-new/boom-lifts/${other.slug}`}
                className="p-5 rounded-2xl bg-brand-offwhite border border-gray-200 hover:border-brand-navy hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-navy px-2 py-0.5 rounded bg-brand-navy/10 inline-block mb-2">
                    {other.type}
                  </span>
                  <h4 className="font-heading font-bold text-xl uppercase text-brand-ink group-hover:text-brand-navy transition-colors">
                    {other.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {other.summary}
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
        heading={`Rent the ${model.name}`}
        subheading="Chat with our rental desk for exact availability, mobilization, and rental rates."
        customMessage={waMessage}
      />
    </>
  );
}
