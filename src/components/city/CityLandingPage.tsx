import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CITIES, CityInfo, getCityFaqs } from "@/data/cities";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { FaqSection } from "@/components/home/FaqSection";
import { FaqJsonLd } from "@/components/shared/JsonLd";
import { CtaBand } from "@/components/shared/CtaBand";
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  MapPin,
  MessageCircle,
  Phone,
  ArrowRight,
  Zap,
  Building2,
  Factory,
} from "lucide-react";

interface CityLandingPageProps {
  citySlug: string;
  liftType: "scissor" | "boom";
}

export function generateCityMetadata(
  citySlug: string,
  liftType: "scissor" | "boom"
): Metadata {
  const city = CITIES.find((c) => c.slug === citySlug);
  if (!city) {
    return {
      title: "Equipment Rental | Citizen Construction Rentals",
    };
  }

  const isScissor = liftType === "scissor";
  const path = isScissor
    ? `scissor-lift-on-rent-in-${city.slug}`
    : `boom-lift-on-rent-in-${city.slug}`;
  const title = isScissor
    ? `Scissor Lift on Rent in ${city.name} | Citizen Construction Rentals`
    : `Boom Lift on Rent in ${city.name} | Citizen Construction Rentals`;
  const description = isScissor
    ? `Rent brand new CE-certified Straightline electric scissor lifts and used JLG & Genie machines in ${city.name}. Working heights from 8 m to 15.7 m with fast site delivery across ${city.name}.`
    : `Rent Straightline telescopic (28 m) and articulating (16 m) boom lifts and used Genie & JLG machines in ${city.name}. High-reach aerial work platforms delivered to your site.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${path}`,
      images: [{ url: `${siteConfig.url}/images/hero/hero-boom-lot.jpg` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/images/hero/hero-boom-lot.jpg`],
    },
  };
}

export function CityLandingPage({ citySlug, liftType }: CityLandingPageProps) {
  const city = CITIES.find((c) => c.slug === citySlug);
  if (!city) return null;

  const isScissor = liftType === "scissor";
  const pagePath = isScissor
    ? `scissor-lift-on-rent-in-${city.slug}`
    : `boom-lift-on-rent-in-${city.slug}`;
  const pageUrl = `${siteConfig.url}/${pagePath}`;
  const parentPath = isScissor ? "/scissor-lift-on-rent" : "/boom-lift-on-rent";
  const parentName = isScissor ? "Scissor Lift on Rent" : "Boom Lift on Rent";
  const h1Title = isScissor
    ? `Scissor Lift on Rent in ${city.name}`
    : `Boom Lift on Rent in ${city.name}`;

  const faqs = getCityFaqs(city, liftType);

  // Schema: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: parentName,
        item: `${siteConfig.url}${parentPath}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${parentName} in ${city.name}`,
        item: pageUrl,
      },
    ],
  };

  // Schema: Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: h1Title,
    description: isScissor
      ? `Brand new CE-certified Straightline electric scissor lift and inspected used JLG/Genie rental services for construction, warehousing, and industrial projects in ${city.name}, India.`
      : `High-reach Straightline telescopic and articulating boom lift rental services for structural installation, facade maintenance, and industrial construction in ${city.name}, India.`,
    provider: {
      "@id": "https://citizenconstructions.com/#localbusiness",
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: city.state,
      },
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <FaqJsonLd items={faqs} />

      {/* Hero Section */}
      <section className="bg-brand-navy text-white pt-10 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: parentName, href: parentPath },
              { label: city.name, href: `/${pagePath}` },
            ]}
          />

          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-amber text-xs font-semibold uppercase tracking-wider mb-4 border border-white/15">
              <MapPin className="w-3.5 h-3.5" />
              <span>Rental Mobilization: {city.name}, {city.state}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white font-heading tracking-tight leading-[1.15]">
              {h1Title}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed">
              {isScissor ? city.scissorIntro : city.boomIntro}
            </p>

            {/* Quick Feature Badges */}
            <div className="mt-6 flex flex-wrap gap-3 text-xs sm:text-sm text-slate-200 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">
                <ShieldCheck className="w-4 h-4 text-brand-amber" /> CE-Certified Fleet
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">
                <Truck className="w-4 h-4 text-brand-amber" /> Direct Site Transport
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">
                <Zap className="w-4 h-4 text-emerald-400" /> Operating Since 2000
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${siteConfig.phones.primary.raw}?text=${encodeURIComponent(
                  `Hello Citizen Construction Rentals, I need a rental quote for a ${isScissor ? "scissor lift" : "boom lift"} in ${city.name}. Working height: , Duration: `
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-whatsapp h-12 text-[15px] justify-center px-6"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Get Instant Quote on WhatsApp</span>
              </a>

              <a
                href={`tel:+${siteConfig.phones.primary.raw}`}
                className="btn-pill btn-pill-amber h-12 text-[15px] justify-center px-6"
              >
                <Phone className="w-5 h-5 fill-current" />
                <span>Call: {siteConfig.phones.primary.display}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Logistics & Delivery Highlights */}
      <section className="py-12 bg-brand-offwhite border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="eyebrow-label">
                <span className="slash-accent" />
                <span>Site Mobilization &amp; Logistics</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
                Direct Equipment Dispatch to Sites in {city.name}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {city.deliveryWording}
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Citizen Construction Rentals manages end-to-end transport mobilization. Every machine dispatched to {city.name} is pre-commissioned, battery-charged, CE-certified, and accompanied by comprehensive equipment health certificates to ensure zero downtime upon delivery.
              </p>
            </div>

            <div className="md:col-span-4 card-premium p-6 bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/10 flex items-center justify-center text-brand-navy">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-slate-500">Dispatch Base</p>
                  <p className="text-sm font-bold text-slate-900">Moti Nagar, New Delhi</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-amber/20 flex items-center justify-center text-brand-navy">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-semibold text-slate-500">Delivery Destination</p>
                  <p className="text-sm font-bold text-slate-900">{city.name}, {city.state}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-snug">
                  {city.distanceBase}. Fast quotation and dedicated road transport logistics across {city.name}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Hubs Covered in City */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="eyebrow-label mb-2">
              <span className="slash-accent" />
              <span>Coverage Areas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-slate-900 font-heading">
              Key Industrial &amp; Commercial Zones Served in {city.name}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              We mobilize aerial work platforms across manufacturing clusters, supply chain hubs, tech corridors, and infrastructure developments throughout {city.name} and neighboring industrial belts:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {city.industrialHubs.map((hub, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-brand-navy/30 hover:shadow-sm transition-all flex items-start gap-3"
              >
                <Factory className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">{hub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet & Model Specification Table */}
      <section className="py-16 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="eyebrow-label mb-2 justify-center">
              <span className="slash-accent" />
              <span>Available Fleet Specifications</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-slate-900 font-heading">
              {isScissor ? "Scissor Lift" : "Boom Lift"} Models Available in {city.name}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {isScissor
                ? "Choose between brand new CE-certified Straightline electric scissor lifts and thoroughly inspected used JLG and Genie units, all supplied with comprehensive pre-dispatch maintenance."
                : "Choose between brand new Straightline SL28T telescopic and articulating boom lifts alongside tested used Genie and JLG machines for outdoor and high-reach structural projects."}
            </p>
          </div>

          {isScissor ? (
            <div className="overflow-x-auto card-premium bg-white border border-slate-200/90 shadow-sm">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-900 text-white font-heading uppercase text-xs tracking-wider">
                  <tr>
                    <th className="py-4 px-5">Model</th>
                    <th className="py-4 px-5">Platform Height</th>
                    <th className="py-4 px-5">Working Height</th>
                    <th className="py-4 px-5">Payload Capacity</th>
                    <th className="py-4 px-5">Power / Drive</th>
                    <th className="py-4 px-5">Primary Applications in {city.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Straightline GTJZ06</td>
                    <td className="py-3.5 px-5">6 m</td>
                    <td className="py-3.5 px-5 font-semibold text-brand-navy">8 m</td>
                    <td className="py-3.5 px-5">230 kg</td>
                    <td className="py-3.5 px-5">Battery Electric / Non-Marking</td>
                    <td className="py-3.5 px-5">Retail lighting, low-bay ceilings, indoor shop floors</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Straightline GTJZ08</td>
                    <td className="py-3.5 px-5">8 m</td>
                    <td className="py-3.5 px-5 font-semibold text-brand-navy">10 m</td>
                    <td className="py-3.5 px-5">230 kg</td>
                    <td className="py-3.5 px-5">Battery Electric / Non-Marking</td>
                    <td className="py-3.5 px-5">Warehouse racking, MEP conduit, commercial fit-outs</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Straightline GTJZ10</td>
                    <td className="py-3.5 px-5">10 m</td>
                    <td className="py-3.5 px-5 font-semibold text-brand-navy">12 m</td>
                    <td className="py-3.5 px-5">230 kg</td>
                    <td className="py-3.5 px-5">Battery Electric / Non-Marking</td>
                    <td className="py-3.5 px-5">Factory lighting, sprinkler pipe installation, HVAC</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Straightline GTJZ12</td>
                    <td className="py-3.5 px-5">11.8 m</td>
                    <td className="py-3.5 px-5 font-semibold text-brand-navy">13.8 m</td>
                    <td className="py-3.5 px-5">320 kg</td>
                    <td className="py-3.5 px-5">Battery Electric / Heavy Payload</td>
                    <td className="py-3.5 px-5">High-bay logistics centers, 2-operator duct installation</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Straightline GTJZ14</td>
                    <td className="py-3.5 px-5">13.7 m</td>
                    <td className="py-3.5 px-5 font-semibold text-brand-navy">15.7 m</td>
                    <td className="py-3.5 px-5">227 kg</td>
                    <td className="py-3.5 px-5">Battery Electric / Tall Reach</td>
                    <td className="py-3.5 px-5">Tall industrial sheds, overhead crane rail maintenance</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Used JLG &amp; Genie</td>
                    <td className="py-3.5 px-5">6 m to 12 m</td>
                    <td className="py-3.5 px-5 font-semibold text-brand-navy">8 m to 14 m</td>
                    <td className="py-3.5 px-5">227 kg to 350 kg</td>
                    <td className="py-3.5 px-5">Electric / Hydraulic</td>
                    <td className="py-3.5 px-5">Economical short-term or long-term plant maintenance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto card-premium bg-white border border-slate-200/90 shadow-sm">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-900 text-white font-heading uppercase text-xs tracking-wider">
                  <tr>
                    <th className="py-4 px-5">Model</th>
                    <th className="py-4 px-5">Type</th>
                    <th className="py-4 px-5">Working Height</th>
                    <th className="py-4 px-5">Horizontal Outreach</th>
                    <th className="py-4 px-5">Capacity</th>
                    <th className="py-4 px-5">Primary Applications in {city.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Straightline SL28T</td>
                    <td className="py-3.5 px-5">Telescopic (Straight Boom)</td>
                    <td className="py-3.5 px-5 font-semibold text-brand-navy">28 m</td>
                    <td className="py-3.5 px-5 font-semibold">21.8 m</td>
                    <td className="py-3.5 px-5">250 kg</td>
                    <td className="py-3.5 px-5">Industrial sheds, high-rise facade installation, outdoor steelwork</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Straightline Articulating</td>
                    <td className="py-3.5 px-5">Articulating (Knuckle Boom)</td>
                    <td className="py-3.5 px-5 font-semibold text-brand-navy">16 m</td>
                    <td className="py-3.5 px-5 font-semibold">7.5 m</td>
                    <td className="py-3.5 px-5">230 kg</td>
                    <td className="py-3.5 px-5">Up-and-over access around pipe racks, factory machinery, plant maintenance</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3.5 px-5 font-bold text-slate-900">Used Genie &amp; JLG Booms</td>
                    <td className="py-3.5 px-5">Telescopic / Articulating</td>
                    <td className="py-3.5 px-5 font-semibold text-brand-navy">15 m to 43 m</td>
                    <td className="py-3.5 px-5 font-semibold">Up to 24 m</td>
                    <td className="py-3.5 px-5">227 kg to 454 kg</td>
                    <td className="py-3.5 px-5">Large infrastructure, chemical plant maintenance, shipyard rigging</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Comprehensive Operational & Selection Guide */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <div className="eyebrow-label mb-2">
              <span className="slash-accent" />
              <span>Rental Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-slate-900 font-heading">
              Selecting the Right {isScissor ? "Scissor Lift" : "Boom Lift"} for Projects in {city.name}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              When planning aerial access in {city.name}, evaluating your job site conditions ensures you choose the most productive and cost-effective machine. For indoor tasks inside warehouses, cleanrooms, and retail complexes, battery-powered electric scissor lifts provide whisper-quiet operation, zero emissions, and non-marking tyres that preserve epoxy and tile floors. Their compact width allows effortless transit through standard double doors and along tight warehouse aisles.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading pt-2">
              Working Height vs. Platform Height Calculation
            </h3>
            <p>
              Platform height measures the elevation of the machine deck floor, while working height is calculated by adding approximately 2 meters (representing the upward reach of an adult operator). For example, reaching ceiling fixtures at 10 meters requires an 8-meter platform lift (such as our Straightline GTJZ08). For higher commercial ceilings or overhead crane bays reaching up to 15.7 meters, our GTJZ14 delivers the necessary elevation while preserving stability.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading pt-2">
              Mobilization and Site Access in {city.name}
            </h3>
            <p>
              Equipment mobilized to {city.name} travels from our New Delhi base via dedicated carrier transport. Before delivery, ensure that your site entrance accommodates flatbed tilt-truck access and that designated unloading areas have firm, level ground. For indoor deployments, verify doorway heights, floor load ratings, and elevator dimensions where applicable. Our rental coordinators assist you throughout the process to guarantee seamless mobilization.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading pt-2">
              Why Partner with Citizen Construction Rentals?
            </h3>
            <p>
              With continuous aerial equipment operations since 2000, Citizen Construction Rentals delivers tested, reliable machinery with rapid response times. We provide brand new CE-certified Straightline machines with factory warranties, as well as dependable used JLG and Genie units. Every rental includes comprehensive pre-delivery inspections, clear operational briefing, and dedicated technical assistance to keep your site running safely.
            </p>
          </div>

          {/* Internal Links to Sister Categories */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 text-sm font-semibold">
            <Link
              href={parentPath}
              className="inline-flex items-center gap-1.5 text-brand-navy hover:text-brand-amber transition-colors"
            >
              <span>Explore All {parentName} Models</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={isScissor ? `/boom-lift-on-rent-in-${city.slug}` : `/scissor-lift-on-rent-in-${city.slug}`}
              className="inline-flex items-center gap-1.5 text-brand-navy hover:text-brand-amber transition-colors"
            >
              <span>Need {isScissor ? "Boom Lifts" : "Scissor Lifts"} in {city.name}?</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/rental-rates"
              className="inline-flex items-center gap-1.5 text-brand-navy hover:text-brand-amber transition-colors"
            >
              <span>View Rental Rates &amp; Charges Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FaqSection
        items={faqs}
        layout="centered"
        title={`Frequently Asked Questions: ${city.name} Rental`}
        subtitle={`Common questions on ${isScissor ? "scissor lift" : "boom lift"} hiring, delivery timelines, and rental terms for sites in ${city.name}.`}
      />

      {/* Final Call to Action Band */}
      <CtaBand />
    </>
  );
}
