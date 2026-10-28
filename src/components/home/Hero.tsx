"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useRentalQuote } from "@/components/ui/RentalQuoteContext";
import {
  Calendar,
  MapPin,
  ShieldCheck,
  Truck,
  ArrowRight,
  Phone,
} from "lucide-react";

function WhatsAppIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.07 16.31C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.32 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.37C16.31 14.25 15.09 13.65 14.86 13.56C14.64 13.48 14.47 13.44 14.31 13.69C14.14 13.94 13.66 14.51 13.51 14.68C13.37 14.85 13.22 14.87 12.97 14.75C12.72 14.62 11.92 14.36 10.97 13.52C10.23 12.86 9.73 12.04 9.59 11.79C9.44 11.54 9.57 11.41 9.7 11.28C9.81 11.17 9.94 11 10.07 10.85C10.2 10.7 10.24 10.59 10.32 10.43C10.41 10.26 10.37 10.12 10.3 10C10.24 9.87 9.75 8.67 9.54 8.18C9.34 7.69 9.14 7.76 8.99 7.75C8.84 7.74 8.68 7.74 8.51 7.74C8.35 7.74 8.08 7.8 7.85 8.05C7.63 8.3 7 8.89 7 10.09C7 11.29 7.87 12.45 8 12.61C8.12 12.78 9.72 15.25 12.18 16.31C12.76 16.56 13.22 16.71 13.57 16.82C14.16 17.01 14.69 16.98 15.12 16.92C15.6 16.85 16.59 16.32 16.8 15.74C17 15.17 17 14.68 16.94 14.58C16.87 14.48 16.72 14.42 16.56 14.37Z" />
    </svg>
  );
}

export function Hero() {
  const { openQuoteModal } = useRentalQuote();

  return (
    <section className="relative w-full overflow-hidden bg-[#08225C] md:bg-[#0B2A63] text-white min-h-[max(calc(700*var(--m)),calc(100svh-71px))] h-[max(calc(700*var(--m)),calc(100svh-71px))] md:h-auto md:min-h-[calc(100svh-72px)] sm:md:min-h-[calc(100vh-72px)] min-[1100px]:min-h-[calc(816*var(--s))] min-[1100px]:h-[calc(816*var(--s))] flex flex-col justify-start select-none md:select-auto py-0 md:py-8 sm:md:py-12 min-[1100px]:py-0 min-[1100px]:pt-[calc(90*var(--s))]">
      {/* Responsive Full-bleed Hero Background Picture */}
      <picture className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <source media="(max-width: 767.98px)" srcSet="/images/hero/hero-mobile.jpg" />
        <source media="(min-width: 768px)" srcSet="/images/hero/hero-scissor-lift-hd.jpg" />
        <img
          src="/images/hero/hero-scissor-lift-hd.jpg"
          alt="Citizen Construction Rentals - Scissor Lift & Boom Lift Fleet"
          className="w-full h-full object-cover object-[50%_72.5%] md:object-[100%_50%] pointer-events-none"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </picture>

      {/* Mobile-only Navy Gradient Overlay on top ~60% (< 768px) */}
      <div
        className="md:hidden absolute top-0 inset-x-0 h-[60%] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(0,32,75,0.98) 0%, rgba(0,32,75,0.95) 40%, rgba(5,55,125,0.72) 60%, rgba(20,95,185,0.18) 78%, rgba(20,95,185,0) 88%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
        }}
      />

      {/* Mobile-only Diagonal Light Streaks (< 768px) */}
      <div className="md:hidden absolute top-0 right-0 w-[calc(200*var(--m))] h-[calc(280*var(--m))] pointer-events-none overflow-hidden z-[2]">
        <div
          className="absolute -top-[calc(40*var(--m))] -right-[calc(10*var(--m))] w-[calc(260*var(--m))] h-[calc(65*var(--m))] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[-32deg]"
          style={{ mixBlendMode: "screen" }}
        />
        <div
          className="absolute top-[calc(45*var(--m))] -right-[calc(25*var(--m))] w-[calc(260*var(--m))] h-[calc(40*var(--m))] bg-gradient-to-r from-transparent via-white/8 to-transparent rotate-[-32deg]"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      {/* Mobile-only Brand Corner Shapes (Inline SVG Overlays) */}
      {/* Bottom-left: Navy triangle with dot-grid pattern and amber diagonal accent line */}
      <div className="md:hidden absolute bottom-0 left-0 w-[calc(86*var(--m))] h-[calc(85*var(--m))] pointer-events-none z-[4]">
        <svg
          viewBox="0 0 86 85"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="phone-hero-dot-grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#FFFFFF" opacity="0.14" />
            </pattern>
          </defs>
          <polygon points="0,4 0,85 82,85" fill="#0A2A66" />
          <polygon points="0,4 0,85 82,85" fill="url(#phone-hero-dot-grid)" />
          <line
            x1="0"
            y1="0"
            x2="86"
            y2="85"
            stroke="#FFC21A"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Bottom-right: Yellow diagonal band and navy corner triangle */}
      <div className="md:hidden absolute bottom-0 right-0 w-[calc(92.5*var(--m))] h-[calc(100*var(--m))] pointer-events-none z-[4]">
        <svg
          viewBox="0 0 202 219"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="202,0 202,71 113,219 0,219" fill="#FFC21A" />
          <polygon points="202,71 202,219 113,219" fill="#0A2A66" />
        </svg>
      </div>

      {/* Tablet Only Readability Gradient (768px - 1099px) */}
      <div className="hidden md:block min-[1100px]:hidden absolute inset-0 bg-gradient-to-r from-[#0B2A63] via-[#0B2A63]/85 to-transparent pointer-events-none z-[1]" />

      {/* Content Column */}
      <div className="relative z-10 w-full pl-[calc(22*var(--m))] pr-[calc(22*var(--m))] md:px-5 sm:md:px-10 min-[1100px]:px-0 min-[1100px]:pl-[calc(66*var(--s))] flex flex-col items-start text-left">
        {/* 1. Badge Pill: Single unified element in the DOM */}
        <div className="mt-[calc(30*var(--m))] md:mt-0 inline-flex items-center gap-0 md:gap-[calc(10*var(--s))] w-[calc(307*var(--m))] md:w-auto min-[1100px]:min-w-[calc(402*var(--s))] h-[calc(24*var(--m))] md:h-[36px] min-[1100px]:h-[calc(37*var(--s))] px-0 md:px-4 min-[1100px]:px-[calc(18*var(--s))] rounded-full border-[1.4px] md:border-[1.5px] border-[#F5B400] md:border-[rgba(94,129,200,0.65)] bg-[rgba(10,35,90,0.55)] md:bg-[rgba(10,35,90,0.6)] shadow-sm shrink-0">
          <span className="w-[calc(10*var(--m))] h-[calc(10*var(--m))] md:w-2.5 md:h-2.5 min-[1100px]:w-[calc(10*var(--s))] min-[1100px]:h-[calc(10*var(--s))] rounded-full bg-[#F5B400] md:bg-[#F5A800] ml-[calc(10*var(--m))] md:ml-0 mr-[calc(8*var(--m))] md:mr-0 shrink-0" />
          <span className="font-condensed font-semibold text-[calc(13*var(--m))] md:text-[15px] sm:md:text-[18px] min-[1100px]:text-[calc(18.5*var(--s))] text-white md:text-[#F5A800] uppercase tracking-[0.06em] md:tracking-[0.04em] whitespace-nowrap leading-none">
            SCISSOR LIFT &amp; BOOM LIFT RENTAL · SINCE 2000
          </span>
        </div>

        {/* Exactly ONE H1 on the entire page */}
        <h1 className="sr-only">Scissor Lift &amp; Boom Lift on Rent in India</h1>

        {/* 2. Decorative Tagline: rendered as <p> styled like current heading */}
        {/* Mobile Tagline (< 768px): Barlow Condensed 800 Italic on two lines */}
        <p className="md:hidden mt-[calc(16*var(--m))] font-condensedItalic font-extrabold uppercase leading-[0.82] text-[calc(65*var(--m))] tracking-[0.005em]">
          <span className="block bg-gradient-to-b from-white via-white to-[#E6EEFF] bg-clip-text text-transparent [filter:drop-shadow(0_2px_10px_rgba(0,0,0,0.25))]">
            REACH NEW
          </span>
          <span className="block bg-gradient-to-r from-[#FFD23A] to-[#F59E0B] bg-clip-text text-transparent tracking-[0.035em]">
            HEIGHTS.
          </span>
        </p>

        {/* Desktop Tagline (>= 768px): Barlow Condensed on desktop */}
        <p className="hidden md:block mt-4 sm:mt-5 min-[1100px]:mt-[calc(37*var(--s))] font-condensed font-extrabold uppercase leading-[0.95] text-white text-[42px] sm:text-[62px] md:text-[76px] min-[1100px]:text-[calc(97.5*var(--s))] tracking-tight whitespace-normal min-[1100px]:whitespace-nowrap">
          <span>REACH NEW </span>
          <span className="text-[#F5A800]">HEIGHTS.</span>
        </p>

        {/* 3. Supporting Paragraph: Rendered ONCE only */}
        <p className="mt-[calc(8*var(--m))] md:mt-3 sm:md:mt-4 min-[1100px]:mt-[calc(20*var(--s))] font-sans font-normal text-[rgba(255,255,255,0.94)] md:text-white text-[calc(14*var(--m))] md:text-[15px] sm:md:text-[18px] min-[1100px]:text-[calc(21.5*var(--s))] leading-[1.28] md:leading-[1.45] min-[1100px]:leading-[1.55] max-w-[calc(346*var(--m))] md:max-w-[780px]">
          Citizen Construction Rentals provides scissor lift on rent and boom lift on rent across India. Brand new Straightline<br className="hidden min-[1100px]:inline" /> and trusted JLG and Genie fleet, delivered directly to your site.
        </p>

        {/* 4. Action Buttons */}
        {/* Mobile ONE Button "GET RENTAL QUOTE →" (< 768px) */}
        <button
          type="button"
          onClick={() => openQuoteModal()}
          className="md:hidden mt-[calc(9.5*var(--m))] w-[calc(246*var(--m))] h-[calc(44*var(--m))] rounded-[calc(8*var(--m))] bg-gradient-to-b from-[#12B84D] to-[#02A337] border-t border-white/40 shadow-[0_4px_16px_rgba(2,163,55,0.45)] text-white inline-flex items-center active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#12B84D] shrink-0"
          aria-label="Get Rental Quote via WhatsApp"
        >
          <div className="w-[calc(26*var(--m))] h-[calc(26*var(--m))] text-white ml-[calc(14*var(--m))] mr-[calc(10*var(--m))] shrink-0 flex items-center justify-center">
            <WhatsAppIcon className="w-full h-full" />
          </div>
          <div className="w-[1.5px] h-[calc(22*var(--m))] bg-white/50 mr-[calc(12*var(--m))] shrink-0" />
          <span className="font-condensed font-bold text-[calc(18*var(--m))] uppercase tracking-[0.02em] text-white whitespace-nowrap">
            GET RENTAL QUOTE
          </span>
          <ArrowRight className="w-[calc(15*var(--m))] h-[calc(15*var(--m))] text-white stroke-[2.5] ml-auto mr-[calc(14*var(--m))] shrink-0" />
        </button>

        {/* Desktop Button Row (>= 768px): Green button, Outline button, CALL NOW link */}
        <div className="hidden md:flex mt-6 sm:mt-7 min-[1100px]:mt-[calc(50*var(--s))] flex-col sm:flex-row items-stretch sm:items-center w-full">
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="w-full sm:w-auto min-[1100px]:w-auto min-[1100px]:px-[calc(32*var(--s))] h-[56px] sm:h-[62px] min-[1100px]:h-[calc(73*var(--s))] rounded-[12px] min-[1100px]:rounded-[calc(14*var(--s))] bg-[#16A34A] hover:bg-[#15803D] text-white font-condensed font-bold text-[20px] sm:text-[22px] min-[1100px]:text-[calc(25*var(--s))] uppercase tracking-wide inline-flex items-center justify-center gap-[calc(12*var(--s))] shadow-[0_4px_20px_rgba(22,163,74,0.4)] active:scale-95 transition-all shrink-0"
          >
            <WhatsAppIcon className="w-6 h-6 min-[1100px]:w-[calc(34*var(--s))] min-[1100px]:h-[calc(34*var(--s))] shrink-0" />
            <span>GET RENTAL QUOTE</span>
          </button>

          <Link
            href="#machines"
            className="mt-3 sm:mt-0 sm:ml-3 min-[1100px]:ml-[calc(17*var(--s))] w-full sm:w-auto min-[1100px]:w-auto min-[1100px]:px-[calc(24*var(--s))] h-[56px] sm:h-[62px] min-[1100px]:h-[calc(72*var(--s))] rounded-[12px] min-[1100px]:rounded-[calc(14*var(--s))] border-2 border-white bg-transparent hover:bg-white/10 text-white font-condensed font-bold text-[19px] sm:text-[21px] min-[1100px]:text-[calc(22*var(--s))] uppercase tracking-wide inline-flex items-center justify-center gap-[calc(8*var(--s))] shadow-sm active:scale-95 transition-all shrink-0"
          >
            <span>BROWSE FLEET</span>
            <ArrowRight className="w-5 h-5 min-[1100px]:w-[calc(22*var(--s))] min-[1100px]:h-[calc(22*var(--s))] stroke-[2.5]" />
          </Link>

          <a
            href={`tel:${siteConfig.phones.primary.raw}`}
            className="mt-3 sm:mt-0 sm:ml-4 min-[1100px]:ml-[calc(33*var(--s))] inline-flex items-center justify-center sm:justify-start gap-[calc(8*var(--s))] text-white hover:text-[#F5A800] font-condensed font-bold text-[20px] min-[1100px]:text-[calc(22*var(--s))] uppercase underline decoration-2 underline-offset-[5px] transition-colors shrink-0 whitespace-nowrap min-h-[44px] py-1 sm:py-0"
            aria-label={`Call Now: ${siteConfig.phones.primary.display}`}
          >
            <Phone className="w-5 h-5 min-[1100px]:w-[calc(24*var(--s))] min-[1100px]:h-[calc(24*var(--s))] text-[#F5A800] stroke-[2] shrink-0" />
            <span>CALL NOW</span>
          </a>
        </div>

        {/* Divider Line on desktop (>= 1100px) */}
        <div className="hidden min-[1100px]:block mt-[calc(61*var(--s))] w-[calc(928*var(--s))] h-[1px] bg-white/16" />

        {/* 5. Trust Chips: Rendered ONCE in the DOM */}
        <div className="mt-[calc(18*var(--m))] md:mt-6 sm:md:mt-7 min-[1100px]:mt-[calc(36*var(--s))] w-[calc(346*var(--m))] md:w-full grid grid-cols-2 min-[1100px]:flex items-center gap-[calc(9*var(--m))] md:gap-2 min-[1100px]:gap-[calc(11*var(--s))]">
          {/* Chip 1: Since 2000 */}
          <div className="h-[calc(36*var(--m))] md:h-[46px] sm:md:h-[48px] min-[1100px]:h-[calc(55*var(--s))] min-[1100px]:w-auto px-[calc(10*var(--m))] md:px-3 min-[1100px]:px-[calc(16*var(--s))] rounded-[calc(8*var(--m))] md:rounded-[10px] min-[1100px]:rounded-[calc(10*var(--s))] border border-[rgba(120,160,230,0.5)] md:border-[rgba(94,129,200,0.45)] bg-[rgba(10,40,100,0.45)] md:bg-[rgba(10,35,90,0.65)] flex items-center justify-start md:justify-center min-[1100px]:justify-start gap-[calc(8*var(--m))] md:gap-2 min-[1100px]:gap-[calc(10*var(--s))] shrink-0 whitespace-nowrap shadow-sm">
            <Calendar className="w-[calc(18*var(--m))] h-[calc(18*var(--m))] md:w-4 md:h-4 sm:md:w-5 sm:md:h-5 min-[1100px]:w-[calc(26*var(--s))] min-[1100px]:h-[calc(26*var(--s))] text-[#F5B400] md:text-[#F5A800] stroke-[1.75] shrink-0" />
            <span className="font-sans font-medium text-[calc(12.5*var(--m))] md:text-[13px] sm:md:text-[15px] min-[1100px]:text-[calc(16.5*var(--s))] text-white whitespace-nowrap">
              Since 2000
            </span>
          </div>

          {/* Chip 2: Pan-India Delivery */}
          <div className="h-[calc(36*var(--m))] md:h-[46px] sm:md:h-[48px] min-[1100px]:h-[calc(55*var(--s))] min-[1100px]:w-auto px-[calc(10*var(--m))] md:px-3 min-[1100px]:px-[calc(16*var(--s))] rounded-[calc(8*var(--m))] md:rounded-[10px] min-[1100px]:rounded-[calc(10*var(--s))] border border-[rgba(120,160,230,0.5)] md:border-[rgba(94,129,200,0.45)] bg-[rgba(10,40,100,0.45)] md:bg-[rgba(10,35,90,0.65)] flex items-center justify-start md:justify-center min-[1100px]:justify-start gap-[calc(8*var(--m))] md:gap-2 min-[1100px]:gap-[calc(10*var(--s))] shrink-0 whitespace-nowrap shadow-sm">
            <MapPin className="w-[calc(18*var(--m))] h-[calc(18*var(--m))] md:w-4 md:h-4 sm:md:w-5 sm:md:h-5 min-[1100px]:w-[calc(26*var(--s))] min-[1100px]:h-[calc(26*var(--s))] text-[#F5B400] md:text-[#F5A800] stroke-[1.75] shrink-0" />
            <span className="font-sans font-medium text-[calc(12.5*var(--m))] md:text-[13px] sm:md:text-[15px] min-[1100px]:text-[calc(16.5*var(--s))] text-white whitespace-nowrap">
              Pan-India Delivery
            </span>
          </div>

          {/* Chip 3: CE Certified Fleet */}
          <div className="h-[calc(36*var(--m))] md:h-[46px] sm:md:h-[48px] min-[1100px]:h-[calc(55*var(--s))] min-[1100px]:w-auto px-[calc(10*var(--m))] md:px-3 min-[1100px]:px-[calc(16*var(--s))] rounded-[calc(8*var(--m))] md:rounded-[10px] min-[1100px]:rounded-[calc(10*var(--s))] border border-[rgba(120,160,230,0.5)] md:border-[rgba(94,129,200,0.45)] bg-[rgba(10,40,100,0.45)] md:bg-[rgba(10,35,90,0.65)] flex items-center justify-start md:justify-center min-[1100px]:justify-start gap-[calc(8*var(--m))] md:gap-2 min-[1100px]:gap-[calc(10*var(--s))] shrink-0 whitespace-nowrap shadow-sm">
            <ShieldCheck className="w-[calc(18*var(--m))] h-[calc(18*var(--m))] md:w-4 md:h-4 sm:md:w-5 sm:md:h-5 min-[1100px]:w-[calc(26*var(--s))] min-[1100px]:h-[calc(26*var(--s))] text-[#F5B400] md:text-[#F5A800] stroke-[1.75] shrink-0" />
            <span className="font-sans font-medium text-[calc(12.5*var(--m))] md:text-[13px] sm:md:text-[15px] min-[1100px]:text-[calc(16.5*var(--s))] text-white whitespace-nowrap">
              CE Certified Fleet
            </span>
          </div>

          {/* Chip 4: Delivered to Your Site */}
          <div className="h-[calc(36*var(--m))] md:h-[46px] sm:md:h-[48px] min-[1100px]:h-[calc(55*var(--s))] min-[1100px]:w-auto px-[calc(10*var(--m))] md:px-3 min-[1100px]:px-[calc(16*var(--s))] rounded-[calc(8*var(--m))] md:rounded-[10px] min-[1100px]:rounded-[calc(10*var(--s))] border border-[rgba(120,160,230,0.5)] md:border-[rgba(94,129,200,0.45)] bg-[rgba(10,40,100,0.45)] md:bg-[rgba(45,85,175,0.45)] flex items-center justify-start md:justify-center min-[1100px]:justify-start gap-[calc(8*var(--m))] md:gap-1.5 min-[1100px]:gap-[calc(10*var(--s))] shrink-0 whitespace-nowrap shadow-sm">
            <Truck className="w-[calc(18*var(--m))] h-[calc(18*var(--m))] md:w-4 md:h-4 sm:md:w-5 sm:md:h-5 min-[1100px]:w-[calc(26*var(--s))] min-[1100px]:h-[calc(26*var(--s))] text-[#F5B400] md:text-[#F5A800] stroke-[1.75] shrink-0" />
            <span className="font-sans font-medium text-[calc(12.5*var(--m))] md:text-[13px] sm:md:text-[15px] min-[1100px]:text-[calc(16.5*var(--s))] text-white whitespace-nowrap">
              Delivered to Your Site
            </span>
          </div>
        </div>
      </div>

      {/* Sentinel at hero bottom for MobileStickyBar IntersectionObserver */}
      <div
        id="hero-bottom-sentinel"
        className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
      />
    </section>
  );
}
