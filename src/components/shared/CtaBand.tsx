import React from "react";
import { siteConfig } from "@/config/site";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { Phone, MapPin, ShieldCheck, Calendar } from "lucide-react";

interface CtaBandProps {
  heading?: string;
  subheading?: string;
  customMessage?: string;
}

export function CtaBand({
  heading = "Need a lift on rent? Get your rental quote in minutes.",
  subheading = "Fast, competitive rental rates shared on WhatsApp with pan-India dispatch and full technical guidance.",
  customMessage = "Hello Citizen Construction Rentals, I need a rental quote for an aerial lift. Please share rates and availability.",
}: CtaBandProps) {
  const years = new Date().getFullYear() - 2000;

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0B1B3A] via-[#16388F] to-[#0B1B3A] py-16 sm:py-20 text-white">
      {/* Decorative Slanted Amber Slash Accents */}
      <div className="absolute top-0 right-1/4 w-8 h-full bg-brand-amber/15 -skew-x-[24deg] pointer-events-none" />
      <div className="absolute top-0 right-1/4 -mr-12 w-2 h-full bg-brand-amber/25 -skew-x-[24deg] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust Badges Pill */}
        <div className="inline-flex items-center gap-2 sm:gap-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs sm:text-sm font-semibold mb-6 border border-white/15">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-amber" /> Since 2000 ({years}+ Yrs)
          </span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-amber" /> Pan-India Service
          </span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-amber" /> CE Certified
          </span>
        </div>

        {/* H2 Headline */}
        <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">
          {heading}
        </h2>

        <p className="mt-4 text-[16px] sm:text-[18px] text-white/85 max-w-2xl mx-auto leading-relaxed">
          {subheading}
        </p>

        {/* Action Buttons: WhatsApp Pill + Both Phone Numbers */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <WhatsAppCTA
            variant="amber"
            size="lg"
            className="w-full sm:w-auto shadow-xl"
            message={customMessage}
          >
            Get Rental Quote on WhatsApp
          </WhatsAppCTA>

          <a
            href={`tel:+${siteConfig.phones.primary.raw}`}
            className="btn-pill btn-pill-outline-white w-full sm:w-auto h-12 px-6 text-[15px]"
            aria-label={`Call: ${siteConfig.phones.primary.display}`}
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Call: {siteConfig.phones.primary.display}</span>
          </a>

          <a
            href={`tel:+${siteConfig.phones.secondary.raw}`}
            className="btn-pill btn-pill-outline-white w-full sm:w-auto h-12 px-6 text-[15px]"
            aria-label={`Call: ${siteConfig.phones.secondary.display}`}
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Call: {siteConfig.phones.secondary.display}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
