import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { scissorLiftsData } from "@/data/scissor-lifts";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Check, ArrowRight, ShieldCheck, Zap, Building2, HelpCircle } from "lucide-react";
import { CtaBand } from "@/components/shared/CtaBand";

export const metadata: Metadata = {
  title: "Scissor Lift on Rent in India | Electric Self-Propelled Rental Fleet",
  description:
    "Scissor lift on rent in India from Citizen Construction Rentals. Rent brand new CE-certified Straightline electric scissor lifts & used JLG & Genie man lifts on hire.",
  alternates: {
    canonical: `${siteConfig.url}/scissor-lift-on-rent`,
  },
  openGraph: {
    title: "Scissor Lift on Rent in India | Citizen Construction Rentals",
    description:
      "Electric self-propelled scissor lift rental across India. 6m to 14m platform heights available on rent per day and rent per month.",
    url: `${siteConfig.url}/scissor-lift-on-rent`,
    images: [{ url: `${siteConfig.url}/images/hero/hero-boom-lot.jpg` }],
  },
};

export default function ScissorLiftOnRentPage() {
  return (
    <>
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
            Citizen Construction Rentals delivers electric scissor lift on rent across all industrial regions in India. Rent brand new CE-certified Straightline machines and trusted JLG and Genie units with fast mobilization directly to your project site.
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
              Scissor Lift on Rent in India — Electric Self-Propelled Fleet
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              Scissor lifts (also called man lifts or aerial work platforms) provide safe, vertical elevation for warehouse high-bay installation, facility maintenance, HVAC ducting, and construction fit-outs. Whether you require a reliable man lift on rent or a self-propelled scissor lift rental, our modern inventory features quiet electric scissor lift on rent drives, zero exhaust emissions, and durable non-marking tyres that safeguard sensitive industrial flooring.
            </p>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Whether your project demands scissor lift on hire units for a quick shutdown or extended monthly hire, Citizen Construction Rentals structures flexible terms for scissor lift rent per day and scissor lift rent per month with our comprehensive scissor lift rental service.
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
                      alt={`Straightline ${model.name} ${model.nominalHeight} scissor lift on rent in India`}
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

      {/* Height Guide & Measurement Variants */}
      <section className="py-16 sm:py-20 bg-brand-offwhite border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 uppercase font-heading">
              Which Scissor Lift Height Do I Need?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Working height is always calculated as platform height plus approximately 2 m (around 2 meter / 2 metre reach).
            </p>
          </div>

          <div className="mt-10 overflow-x-auto bg-white rounded-2xl shadow-card border border-slate-200">
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
                  <td className="py-3.5 px-6">6 m (6m)</td>
                  <td className="py-3.5 px-6">6 m (6 meter)</td>
                  <td className="py-3.5 px-6 font-semibold">8 m (8 metre)</td>
                  <td className="py-3.5 px-6">500 kg</td>
                  <td className="py-3.5 px-6">Low-bay lighting &amp; retail fit-outs</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-brand-navy">GTJZ08</td>
                  <td className="py-3.5 px-6">8 m (8m)</td>
                  <td className="py-3.5 px-6">8 m (8 meter)</td>
                  <td className="py-3.5 px-6 font-semibold">10 m (10 metre)</td>
                  <td className="py-3.5 px-6">450 kg</td>
                  <td className="py-3.5 px-6">Standard logistics &amp; warehouse racking</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-brand-navy">GTJZ10</td>
                  <td className="py-3.5 px-6">10 m (10m)</td>
                  <td className="py-3.5 px-6">10 m (10 meter)</td>
                  <td className="py-3.5 px-6 font-semibold">12 m (12 metre)</td>
                  <td className="py-3.5 px-6">320 kg</td>
                  <td className="py-3.5 px-6">High-bay electrical cabling &amp; ductwork</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-brand-navy">GTJZ12</td>
                  <td className="py-3.5 px-6">12 m (12m)</td>
                  <td className="py-3.5 px-6">11.8 m (12 meter class)</td>
                  <td className="py-3.5 px-6 font-semibold">13.8 m</td>
                  <td className="py-3.5 px-6">320 kg</td>
                  <td className="py-3.5 px-6">Industrial plant retrofitting &amp; sprinklers</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-brand-navy">GTJZ14</td>
                  <td className="py-3.5 px-6">14 m (14m)</td>
                  <td className="py-3.5 px-6">13.7 m (14 meter class)</td>
                  <td className="py-3.5 px-6 font-semibold">15.7 m</td>
                  <td className="py-3.5 px-6">227 kg</td>
                  <td className="py-3.5 px-6">Tall warehouse maintenance &amp; heavy facilities</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs on Scissor Lifts */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-slate-900 font-heading text-center mb-8">
            Frequently Asked Questions: Scissor Lift on Hire
          </h2>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                Can scissor lifts be used indoors?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Yes. Our brand new Straightline electric scissor lifts are specifically engineered with non-marking solid tyres and battery-powered electric drivetrains that produce zero exhaust emissions, making them fully compliant for indoor warehouse and commercial showroom operations.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                What is the difference between a scissor lift and a boom lift?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Scissor lifts elevate vertically directly upward with a large deck and high payload capacity, ideal for tasks along flat ceilings and straight walls. Boom lifts (or cherry pickers) feature an arm that extends up and out over obstacles for high-reach outdoor and structural work.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50" lang="hi">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                क्या आप भारत भर में सिज़र लिफ्ट किराये पर देते हैं?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                हाँ, Citizen Construction Rentals पूरे भारत में सिज़र लिफ्ट किराये पर (scissor lift kiraye par) उपलब्ध कराता है। हमारी सेवा में नई स्ट्रैटलाइन और प्रमाणित यूज़्ड मशीनें त्वरित डिलीवरी के साथ शामिल हैं।
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
