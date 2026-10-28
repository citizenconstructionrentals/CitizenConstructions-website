import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { scissorLiftsData } from "@/data/scissor-lifts";
import { CITIES } from "@/data/cities";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Factory,
  Warehouse,
  Flame,
  Truck,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqSection } from "@/components/home/FaqSection";
import { FaqJsonLd } from "@/components/shared/JsonLd";
import { SCISSOR_FAQS } from "@/data/faq";

export const metadata: Metadata = {
  title: "Scissor Lift on Rent in India | Citizen Construction Rentals",
  description:
    "Rent brand new CE-certified Straightline electric scissor lifts and trusted used JLG & Genie machines with fast delivery to your site across India.",
  alternates: {
    canonical: `${siteConfig.url}/scissor-lift-on-rent`,
  },
  openGraph: {
    title: "Scissor Lift on Rent in India | Citizen Construction Rentals",
    description:
      "Rent brand new CE-certified Straightline electric scissor lifts and trusted used JLG & Genie machines with fast delivery to your site across India.",
    url: `${siteConfig.url}/scissor-lift-on-rent`,
    images: [{ url: `${siteConfig.url}/images/hero/hero-boom-lot.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scissor Lift on Rent in India | Citizen Construction Rentals",
    description:
      "Rent brand new CE-certified Straightline electric scissor lifts and trusted used JLG & Genie machines with fast delivery to your site across India.",
    images: [`${siteConfig.url}/images/hero/hero-boom-lot.jpg`],
  },
};

export default function ScissorLiftOnRentPage() {
  return (
    <>
      <FaqJsonLd items={SCISSOR_FAQS} />

      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-amber/10 -skew-x-12 translate-x-16 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: "Scissor Lift on Rent" }]} />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-amber my-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Pan-India Dispatch • CE Certified Electric Fleet</span>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white max-w-4xl leading-tight">
            Scissor Lift on Rent in India
          </h1>

          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-3xl leading-relaxed font-sans">
            Citizen Construction Rentals provides electric scissor lift on rent across all industrial corridors and urban commercial centers in India. Rent brand new CE-certified Straightline machines (GTJZ06 through GTJZ14) and trusted used JLG and Genie units with fast mobilization directly from our New Delhi headquarters to your project site.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 pt-2">
            <Link
              href="/brand-new/scissor-lifts"
              className="btn-pill btn-pill-amber h-12 text-sm font-bold uppercase"
            >
              <span>Explore Brand New Scissor Lifts</span>
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

      {/* Explanatory Pillar Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="eyebrow-label mb-2">
              <span className="slash-accent" />
              <span>Reliable Access Equipment</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 uppercase">
              Electric Self-Propelled Scissor Lifts
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Scissor lifts provide safe vertical elevation for warehouse high-bay installation, facility maintenance, HVAC ducting, and commercial construction fit-outs. Our modern fleet features quiet electric drives, zero exhaust emissions, and durable non-marking tyres that safeguard sensitive industrial flooring.
            </p>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Whether your project requires equipment for a short shutdown or an extended monthly contract, Citizen Construction Rentals provides flexible rental terms with rapid delivery directly to your job site across India.
            </p>
          </div>

          {/* Model Cards Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scissorLiftsData.map((model) => (
              <div
                key={model.slug}
                className="card-premium flex flex-col justify-between overflow-hidden border border-slate-200/90 hover:border-brand-navy transition-all"
              >
                <div>
                  <div className="relative h-56 w-full bg-slate-50 border-b border-slate-100">
                    <Image
                      src={model.images[0]}
                      alt={`${model.name} electric scissor lift, ${model.platformHeight} platform height`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-brand-navy border border-slate-200">
                      Nominal: {model.nominalHeight}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold uppercase text-slate-900 font-heading">
                      {model.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                      {model.powerType} • CE Certified
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 bg-brand-offwhite p-3.5 rounded-xl text-xs">
                      <div>
                        <span className="text-slate-500 block">Working Height:</span>
                        <span className="font-bold text-slate-900 text-sm">{model.workingHeight}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Platform Height:</span>
                        <span className="font-bold text-slate-900 text-sm">{model.platformHeight}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Lift Capacity:</span>
                        <span className="font-bold text-slate-900 text-sm">{model.safeWorkingLoad}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Extension Deck:</span>
                        <span className="font-bold text-slate-900 text-sm">{model.dimensions.tableExtensionSize}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/brand-new/scissor-lifts/${model.slug}`}
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

      {/* Industry Applications Breakdown */}
      <section className="py-16 sm:py-20 bg-brand-offwhite border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow-label mb-2">
              <span className="slash-accent" />
              <span>Where Scissor Lifts Excel</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 uppercase font-heading">
              Application Breakdown by Industry
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Straight vertical elevation with large platform decks and roll-out extensions makes scissor lifts the primary choice across varied industrial operations:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-premium p-6 bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-navy flex items-center justify-center mb-4">
                  <Warehouse className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 uppercase font-heading mb-2">
                  Warehousing &amp; Fulfillment
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pallet racking installation, barcode shelf labeling, overhead sprinkler maintenance, and high-density inventory audit inside large distribution logistics parks.
                </p>
              </div>
            </div>

            <div className="card-premium p-6 bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand-navy flex items-center justify-center mb-4">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 uppercase font-heading mb-2">
                  Automotive &amp; Manufacturing
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Conveyor line installation, overhead busway electrical power tracks, pneumatic airline routing, and machinery ceiling servicing on plant floors.
                </p>
              </div>
            </div>

            <div className="card-premium p-6 bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-navy flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 uppercase font-heading mb-2">
                  Commercial MEP &amp; HVAC
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  HVAC spiral ducting, electrical cable tray mounting, fire suppression piping, and acoustic false ceiling installations in commercial office towers.
                </p>
              </div>
            </div>

            <div className="card-premium p-6 bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-brand-navy flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 uppercase font-heading mb-2">
                  Airports, Hangars &amp; Data Centers
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Cleanroom server containment structures, terminal display rigging, lighting retrofits, and aircraft exterior maintenance in hangars.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Height Selection Guide & Measurement Table */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 uppercase font-heading">
              Which Scissor Lift Height Do I Need?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Working height is calculated by taking the platform height and adding approximately 2 meters for the standing operator reach.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-card border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-navy text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-4 px-6">Model</th>
                  <th className="py-4 px-6">Nominal Height</th>
                  <th className="py-4 px-6">Platform Height</th>
                  <th className="py-4 px-6">Working Height</th>
                  <th className="py-4 px-6">Rated Capacity</th>
                  <th className="py-4 px-6">Common Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 px-6 font-bold text-brand-navy">GTJZ06</td>
                  <td className="py-3.5 px-6">6 m</td>
                  <td className="py-3.5 px-6">6 m</td>
                  <td className="py-3.5 px-6 font-semibold">8 m</td>
                  <td className="py-3.5 px-6">500 kg</td>
                  <td className="py-3.5 px-6">Low-bay lighting &amp; retail fit-outs</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-brand-navy">GTJZ08</td>
                  <td className="py-3.5 px-6">8 m</td>
                  <td className="py-3.5 px-6">8 m</td>
                  <td className="py-3.5 px-6 font-semibold">10 m</td>
                  <td className="py-3.5 px-6">450 kg</td>
                  <td className="py-3.5 px-6">Standard logistics &amp; warehouse racking</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-brand-navy">GTJZ10</td>
                  <td className="py-3.5 px-6">10 m</td>
                  <td className="py-3.5 px-6">10 m</td>
                  <td className="py-3.5 px-6 font-semibold">12 m</td>
                  <td className="py-3.5 px-6">320 kg</td>
                  <td className="py-3.5 px-6">High-bay electrical cabling &amp; ductwork</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-brand-navy">GTJZ12</td>
                  <td className="py-3.5 px-6">12 m</td>
                  <td className="py-3.5 px-6">11.8 m</td>
                  <td className="py-3.5 px-6 font-semibold">13.8 m</td>
                  <td className="py-3.5 px-6">320 kg</td>
                  <td className="py-3.5 px-6">Industrial plant retrofitting &amp; sprinklers</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-brand-navy">GTJZ14</td>
                  <td className="py-3.5 px-6">14 m</td>
                  <td className="py-3.5 px-6">13.7 m</td>
                  <td className="py-3.5 px-6 font-semibold">15.7 m</td>
                  <td className="py-3.5 px-6">227 kg</td>
                  <td className="py-3.5 px-6">Tall warehouse maintenance &amp; heavy facilities</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Electric vs Diesel & Technical Comparison */}
      <section className="py-16 sm:py-20 bg-brand-offwhite border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="eyebrow-label">
                <span className="slash-accent" />
                <span>Power System &amp; Floor Protection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase text-slate-900 font-heading">
                Why Electric Scissor Lifts are the Indoor Standard
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Modern industrial warehouses, commercial facilities, and cleanrooms enforce strict air quality and floor preservation regulations. Our Straightline electric scissor lifts utilize high-capacity deep-cycle traction batteries driving dual front-wheel electric motors. This architecture produces zero exhaust fumes, low operational noise, and eliminates oil leak risks on finished floors.
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Non-Marking Solid Rubber Tyres:</strong> Prevents tyre scuffs on epoxy, polished concrete, and tiles.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Turning Radius Maneuverability:</strong> Differential front-wheel drive pivots easily in tight 2-meter racking aisles.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Folding Guardrails for Low Clearance:</strong> Guardrails fold down easily to navigate through standard doorways and elevators.</span>
                </li>
              </ul>
            </div>

            <div className="card-premium p-8 bg-white border border-slate-200/90 shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-slate-900 uppercase font-heading">
                Rental Mobilization &amp; Support Checklist
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Citizen Construction Rentals ensures complete peace of mind with every scissor lift dispatched across India:
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">CE Certified &amp; Pre-Tested:</strong>
                    Every lift undergoes comprehensive pre-delivery inspection covering tilt sensors, descent alarms, pothole protection, and emergency lowering valves.
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <Truck className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Direct Site Mobilization:</strong>
                    Dispatched from our New Delhi base to sites across India on dedicated transport trailers with comprehensive insurance coverage.
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Responsive Technical Assistance:</strong>
                    Our maintenance desk provides swift phone and on-site support to guarantee uninterrupted operation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Grid Linking to City Landing Pages */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="eyebrow-label mb-2">
              <span className="slash-accent" />
              <span>Pan-India Coverage</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 uppercase font-heading">
              Service Areas for Scissor Lift Rental Across India
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              We deliver brand new Straightline electric scissor lifts and certified used JLG and Genie machines to project sites in key industrial cities:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/scissor-lift-on-rent-in-${c.slug}`}
                className="p-5 rounded-2xl border border-slate-200 bg-brand-offwhite hover:bg-white hover:border-brand-navy hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 group-hover:text-brand-navy text-base">
                      {c.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                      {c.tier === 1 ? "NCR" : "Pan-India"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {c.industrialHubs.slice(0, 3).join(", ")} &amp; more.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-navy group-hover:text-brand-amber transition-colors">
                  <span>View {c.name} Rental</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs on Scissor Lifts */}
      <FaqSection
        items={SCISSOR_FAQS}
        layout="centered"
        title="Frequently Asked Questions: Scissor Lift on Hire"
      />

      {/* Final Call to Action */}
      <CtaBand />
    </>
  );
}
