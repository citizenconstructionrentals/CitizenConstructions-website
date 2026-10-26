import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { VideoCropped } from "@/components/home/VideoCropped";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { CtaBand } from "@/components/shared/CtaBand";
import { DIRECTORS } from "@/data/team";
import {
  ShieldCheck,
  Clock,
  Zap,
  Target,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Scissor Lift Rental Company in India | Citizen Construction Rentals",
  description:
    "Citizen Construction Rentals is a leading scissor lift rental company in India and aerial work platform rental company. Dedicated boom lift rental company since 2000 with pan India lift rental operations.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  keywords: [
    "scissor lift rental company in India",
    "aerial work platform rental company",
    "boom lift rental company since 2000",
    "Citizen Construction Rentals",
    "pan India lift rental operations",
  ],
};

export default function AboutPage() {
  const values = [
    {
      title: "Safety",
      description:
        "Every lift in our fleet undergoes multi-point safety testing, hydraulic load verification, and CE standard compliance before site mobilization.",
      icon: ShieldCheck,
    },
    {
      title: "Reliability",
      description:
        "We offer brand new Straightline lifts and trusted JLG & Genie lifts to ensure dependable uptime for your project.",
      icon: Clock,
    },
    {
      title: "Responsiveness",
      description:
        "Direct WhatsApp and phone assistance with quick rental quotes, rapid mobilization logistics, and ongoing operational support across all of India.",
      icon: Zap,
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-brand-navy text-white py-14 sm:py-20 relative overflow-hidden">
        {/* Slanted Amber Slash Accent */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-amber/15 -skew-x-12 translate-x-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: "About Us" }]} />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-amber my-5">
            <Clock className="w-3.5 h-3.5" />
            <span>Serving Customers Across India Since 2000</span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white max-w-3xl leading-none">
            Scissor Lift Rental Company in India
          </h1>

          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed font-sans">
            Citizen Construction Rentals is an experienced scissor lift rental company in India and aerial work platform rental company. Dedicated boom lift rental company since 2000 offering comprehensive pan India lift rental operations for industrial and infrastructure sites.
          </p>
        </div>
      </section>

      {/* Factual Story Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 min-[1100px]:grid-cols-12 gap-10 min-[1100px]:gap-12 items-center">
            <div className="min-[1100px]:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-heading font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                <span>Our Heritage &amp; Fleet</span>
              </div>

              <h2 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-brand-ink leading-tight">
                Scissor Lift Rental Company in India — Two Decades of Excellence
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                <p>
                  Established in 2000, <strong>Citizen Construction Rentals</strong> has grown to provide comprehensive aerial work platform solutions across India. We specialize in renting both <strong>Scissor Lifts</strong> and <strong>Boom Lifts</strong> to meet the distinct challenges of construction sites, warehouse logistics, industrial facilities, signage installation, and exterior facade work.
                </p>
                <p>
                  Our rental lineup features <strong>Brand New CE-certified Straightline lifts</strong>, engineered with modern electric proportional drives, advanced tilt and pothole protection, delivered to your site ready for work.
                </p>
                <p>
                  In addition to brand new lifts, our fleet also includes dependable <strong>Used JLG and Genie lifts on rent</strong>, offering contractors flexible, cost-effective equipment choices without compromising on safety or reliability.
                </p>
              </div>

              {/* Quick Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pan-India Equipment Logistics</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CE-Certified Safety Standard</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Brand New &amp; Used Rental Fleet</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct Rental Quotes on WhatsApp</span>
                </div>
              </div>

              <div className="pt-4">
                <WhatsAppCTA
                  variant="whatsapp"
                  size="md"
                  message="Hello Citizen Construction Rentals, I would like to enquire about renting aerial lifts. My location: "
                >
                  Connect with Our Rental Desk
                </WhatsAppCTA>
              </div>
            </div>

            {/* Meet Our Directors Block */}
            <div className="min-[1100px]:col-span-6 w-full max-w-[640px] mx-auto min-[1100px]:max-w-[634px]">
              {/* Eyebrow: amber slanted slash + navy text, Barlow Condensed 600, 20px, letter-spacing 0.2em */}
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="font-condensed font-semibold text-[#F5A800] text-[20px] tracking-[0.2em] select-none"
                  aria-hidden="true"
                >
                  /
                </span>
                <span className="font-condensed font-semibold uppercase text-[#0A2A66] text-[20px] tracking-[0.2em]">
                  LEADERSHIP
                </span>
              </div>

              {/* Heading: "Meet Our Directors" (Barlow Condensed 800, uppercase, deep navy, about 36px) */}
              <h3 className="font-condensed font-extrabold uppercase text-[#0A2A66] text-[28px] sm:text-[36px] tracking-tight leading-tight mb-5 sm:mb-6">
                Meet Our Directors
              </h3>

              {/* Two cards side by side */}
              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3.5 sm:gap-6">
                {DIRECTORS.map((director) => (
                  <figure
                    key={director.name}
                    className="group bg-white rounded-[20px] border border-[#E6EEF8] shadow-[0_10px_40px_rgba(20,60,140,0.08)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(20,60,140,0.16)] motion-reduce:hover:translate-y-0 flex flex-col"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAEFF5]">
                      <Image
                        src={director.image}
                        alt={`${director.name} - Director at Citizen Construction Rentals, scissor lift rental company in India`}
                        fill
                        sizes="(min-width: 1100px) 305px, (min-width: 768px) 305px, (min-width: 360px) 48vw, 100vw"
                        className="object-cover object-[50%_15%] transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                      />
                    </div>
                    <figcaption className="p-3.5 min-[360px]:p-[14px] sm:p-[18px_20px] bg-white flex flex-col justify-center flex-1">
                      <div
                        className="w-10 h-[3px] bg-[#F5A800] rounded-[2px] mb-2 sm:mb-2.5"
                        aria-hidden="true"
                      />
                      <h4 className="font-condensed font-bold uppercase text-[#0A2A66] text-[18px] sm:text-[22px] min-[1100px]:text-[24px] leading-tight tracking-tight">
                        {director.name}
                      </h4>
                      <div className="mt-1 flex items-center gap-1.5 text-[13px] sm:text-[14px] font-sans font-medium text-[#1B3B82]">
                        <span
                          className="text-[#F5A800] font-bold select-none text-[13px] sm:text-[14px]"
                          aria-hidden="true"
                        >
                          /
                        </span>
                        <span>{director.role}</span>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Row: Safety, Reliability, Responsiveness */}
      <section className="py-16 sm:py-20 bg-brand-offwhite border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-tight text-brand-ink">
              Core Rental Values
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              The principles guiding our equipment operations and client partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-brand-navy" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl uppercase tracking-wide text-brand-ink mb-3">
                      {val.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-sans">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* "Our Fleet" Video Section */}
      <section className="py-16 sm:py-24 bg-brand-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-amber text-xs font-heading font-bold uppercase tracking-wider border border-white/10 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quality Verification &amp; Operations</span>
            </div>

            <h2 className="font-heading font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white">
              Our Fleet In Action
            </h2>

            <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
              Our leadership team inspects equipment quality and safety systems firsthand to ensure that every brand new Straightline lift deployed on your project satisfies international CE safety criteria and robust durability standards.
            </p>
          </div>

          {/* Dual Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {/* Video 1: Citizen Visit */}
            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col items-center shadow-xl">
              <div className="w-full max-w-[280px]">
                <VideoCropped
                  src="/video/Citizen-visit.mp4"
                  poster="/video/Citizen-visit-poster.webp"
                  title="Leadership Fleet Inspection"
                  caption="Citizen leadership inspecting boom lift fleet."
                />
              </div>
              <h3 className="mt-4 font-heading font-bold uppercase text-lg text-white">
                Leadership Fleet Inspection
              </h3>
              <p className="mt-1 text-xs text-gray-300 text-center font-sans">
                Hands-on safety and quality verification of our high-reach fleet.
              </p>
            </div>

            {/* Video 2: Citizen In Action */}
            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col items-center shadow-xl">
              <div className="w-full max-w-[280px]">
                <VideoCropped
                  src="/video/Citizen.mp4"
                  poster="/video/Citizen-poster.webp"
                  title="Fleet Operations On Site"
                  caption="Straightline scissor lifts in operation."
                />
              </div>
              <h3 className="mt-4 font-heading font-bold uppercase text-lg text-white">
                Fleet Operations On Site
              </h3>
              <p className="mt-1 text-xs text-gray-300 text-center font-sans">
                Reliable scissor lifts mobilized across project sites in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA band */}
      <CtaBand
        heading="Work With Citizen Construction Rentals"
        subheading="Serving Indian industries with reliable access equipment rentals since 2000."
        customMessage="Hello Citizen Construction Rentals, I'd like to discuss renting aerial equipment. My location: "
      />
    </>
  );
}
