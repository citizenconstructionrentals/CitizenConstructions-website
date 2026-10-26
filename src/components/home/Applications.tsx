"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import {
  Warehouse,
  Factory,
  Building2,
  ShoppingBag,
  HardHat,
  Megaphone,
  ShieldCheck,
  Wrench,
  Clock,
  Headset,
  ArrowRight,
} from "lucide-react";
import { useRentalQuote } from "@/components/ui/RentalQuoteContext";
import { getEnabledApplications, INFO_BAR_FEATURES, ApplicationItem } from "@/data/applications";

function ApplicationIcon({
  name,
  className = "w-6 h-6",
  strokeWidth = 2,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  switch (name) {
    case "warehouse":
      return <Warehouse className={className} strokeWidth={strokeWidth} />;
    case "factory":
      return <Factory className={className} strokeWidth={strokeWidth} />;
    case "building-2":
      return <Building2 className={className} strokeWidth={strokeWidth} />;
    case "shopping-bag":
      return <ShoppingBag className={className} strokeWidth={strokeWidth} />;
    case "hard-hat":
      return <HardHat className={className} strokeWidth={strokeWidth} />;
    case "megaphone":
      return <Megaphone className={className} strokeWidth={strokeWidth} />;
    case "wrench-screwdriver":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Screwdriver */}
          <path d="m14 7 3-3 3 3-3 3" />
          <path d="m14 7-8 8" />
          <path d="M4 17l-1 4 4-1 1-1-3-3-1 1z" />
          {/* Wrench */}
          <path d="M19 15l-3 3" />
          <path d="M12.5 8.5 7 14a3 3 0 1 0 4.2 4.2l5.5-5.5" />
          <path d="m15.5 11.5 2-2a2 2 0 1 0-2.8-2.8l-2 2" />
        </svg>
      );
    default:
      return <Wrench className={className} strokeWidth={strokeWidth} />;
  }
}

function FeatureIcon({
  name,
  className = "w-6 h-6",
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case "shield-check":
      return <ShieldCheck className={className} strokeWidth={1.8} />;
    case "wrench":
      return <Wrench className={className} strokeWidth={1.8} />;
    case "clock":
      return <Clock className={className} strokeWidth={1.8} />;
    case "headset":
      return <Headset className={className} strokeWidth={1.8} />;
    default:
      return <ShieldCheck className={className} strokeWidth={1.8} />;
  }
}

export function Applications() {
  const { openQuoteModal } = useRentalQuote();

  const applications = useMemo(() => {
    return getEnabledApplications();
  }, []);

  const count = applications.length;
  // If count is 4 (the default), scale inner card elements by k = 1.3
  const isScale13 = count === 4 || count <= 2;

  return (
    <section
      id="applications"
      className="relative bg-white overflow-hidden"
      style={
        {
          "--w": "clamp(0.7px, calc(100vw / 1821), 1.3px)",
          paddingTop: "72px",
          paddingBottom: "72px",
          background: "linear-gradient(180deg, #E9F2FD 0%, #FFFFFF 45%)",
        } as React.CSSProperties
      }
    >
      {/* Background Skyline Silhouettes (faint navy at 7-9% opacity, faded downward) */}
      {/* Left Skyline: Lattice Tower / Headframe with crane jib (x 45-330, y 40-200) */}
      <div
        className="hidden lg:block absolute pointer-events-none select-none left-[calc(45*var(--w))] top-[calc(40*var(--w))] w-[calc(285*var(--w))] h-[calc(160*var(--w))] z-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
        }}
      >
        <svg
          viewBox="0 0 285 160"
          fill="#0A2A66"
          className="w-full h-full opacity-[0.08]"
          preserveAspectRatio="none"
        >
          {/* Main vertical lattice tower */}
          <path d="M70 160 L85 10 L105 10 L120 160 Z" />
          {/* Horizontal and diagonal bracing on tower */}
          <path d="M85 30 L105 30 M83 60 L107 60 M80 95 L110 95 M77 130 L113 130" stroke="#0A2A66" strokeWidth="2" />
          <path d="M85 10 L107 60 M105 10 L83 60 M83 60 L110 95 M107 60 L80 95 M80 95 L113 130 M110 95 L77 130 M77 130 L120 160 M113 130 L70 160" stroke="#0A2A66" strokeWidth="1.5" />
          {/* Crane jib extending right */}
          <path d="M95 20 L275 35 L275 40 L95 40 Z" />
          <path d="M95 10 L95 20 L20 30 L20 35 L95 40 Z" />
          {/* Counterweight */}
          <rect x="25" y="32" width="22" height="15" rx="2" />
          {/* Hoist cable & trolley */}
          <line x1="210" y1="40" x2="210" y2="90" stroke="#0A2A66" strokeWidth="1.5" />
          <rect x="204" y="90" width="12" height="10" rx="1" />
          {/* Top peak & guy wires */}
          <polygon points="95,0 88,20 102,20" />
          <line x1="95" y1="0" x2="275" y2="35" stroke="#0A2A66" strokeWidth="1" />
          <line x1="95" y1="0" x2="20" y2="30" stroke="#0A2A66" strokeWidth="1" />
        </svg>
      </div>

      {/* Right Skyline: Buildings with two tower cranes (x 1500-1821, y 80-200) */}
      <div
        className="hidden lg:block absolute pointer-events-none select-none right-0 top-[calc(80*var(--w))] w-[calc(321*var(--w))] h-[calc(120*var(--w))] z-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
        }}
      >
        <svg
          viewBox="0 0 321 120"
          fill="#0A2A66"
          className="w-full h-full opacity-[0.08]"
          preserveAspectRatio="none"
        >
          {/* Building silhouettes */}
          <rect x="30" y="45" width="45" height="75" />
          <rect x="75" y="30" width="55" height="90" />
          <rect x="130" y="55" width="40" height="65" />
          <rect x="170" y="20" width="60" height="100" />
          <rect x="230" y="40" width="45" height="80" />
          <rect x="275" y="15" width="46" height="105" />
          {/* Stepped roofs & architectural accents */}
          <polygon points="170,20 200,5 230,20" />
          <rect x="198" y="0" width="4" height="6" />
          <rect x="90" y="22" width="25" height="8" />
          {/* Tower Crane 1 (over left buildings) */}
          <line x1="60" y1="45" x2="60" y2="5" stroke="#0A2A66" strokeWidth="2" />
          <line x1="30" y1="12" x2="110" y2="12" stroke="#0A2A66" strokeWidth="1.5" />
          <polygon points="60,2 57,12 63,12" />
          <line x1="60" y1="2" x2="110" y2="12" stroke="#0A2A66" strokeWidth="0.8" />
          {/* Tower Crane 2 (over right buildings) */}
          <line x1="255" y1="40" x2="255" y2="0" stroke="#0A2A66" strokeWidth="2" />
          <line x1="220" y1="8" x2="310" y2="8" stroke="#0A2A66" strokeWidth="1.5" />
          <polygon points="255,-3 252,8 258,8" />
          <line x1="255" y1="-3" x2="310" y2="8" stroke="#0A2A66" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[calc(1745*var(--w))] mx-auto px-4 sm:px-6 lg:px-0">
        {/* SECTION HEADER (centred; exact IMAGE 3 coordinates) */}
        <div className="text-center mb-[calc(26*var(--w))]">
          {/* Eyebrow with side rules */}
          <div className="flex items-center justify-center mb-[calc(8*var(--w))]">
            <span className="hidden sm:inline-block w-[calc(57*var(--w))] h-[1.5px] bg-[#0A2A66] mr-[calc(24*var(--w))]" />
            <span className="font-sans font-bold text-[13px] sm:text-[14px] lg:text-[calc(16*var(--w))] tracking-[0.22em] text-[#0A2A66] uppercase">
              OUR LIFTS. YOUR PROJECTS. OUR SUPPORT.
            </span>
            <span className="hidden sm:inline-block w-[calc(87*var(--w))] h-[1.5px] bg-[#0A2A66] ml-[calc(24*var(--w))]" />
          </div>

          {/* H2 Title with bright blue "LIFTS" */}
          <h2 className="font-heading font-extrabold uppercase text-[32px] sm:text-[44px] lg:text-[calc(52*var(--w))] leading-tight tracking-tight mt-[calc(4*var(--w))]">
            <span className="text-[#0A2A66]">WHERE OUR </span>
            <span className="text-[#1E5BE0]">LIFTS </span>
            <span className="text-[#0A2A66]">WORK</span>
          </h2>

          {/* Balanced 2-line Sub-text */}
          <p className="mt-[calc(6*var(--w))] font-sans font-normal text-[15px] sm:text-[18px] lg:text-[calc(22*var(--w))] leading-relaxed lg:leading-[calc(29*var(--w))] text-[#3B4A63] max-w-4xl mx-auto [text-wrap:balance]">
            Delivering safe height access across industrial plants, logistics hubs, and
            <br className="hidden sm:inline" /> commercial projects.
          </p>
        </div>

        {/* CARDS GRID (Adapts cleanly to 4 cards, 6 cards, 3, or 5 cards) */}
        {count === 4 ? (
          // 4 CARDS (2x2 Grid with k = 1.3 scaling for all inner card elements)
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[calc(20*var(--w))] gap-x-[calc(22*var(--w))]">
            {applications.map((app, index) => (
              <ApplicationCard
                key={app.id}
                app={app}
                index={index}
                isScale13={true}
                aspectClass="aspect-[1.55/1] sm:aspect-[1.9/1] lg:aspect-[2.15/1]"
                onQuote={openQuoteModal}
              />
            ))}
          </div>
        ) : count === 6 ? (
          // 6 CARDS (3x2 Grid with k = 1.0)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[calc(20*var(--w))] gap-x-[calc(22*var(--w))]">
            {applications.map((app, index) => (
              <ApplicationCard
                key={app.id}
                app={app}
                index={index}
                isScale13={false}
                aspectClass="aspect-[1.55/1] sm:aspect-[1.9/1] lg:aspect-[2.15/1]"
                onQuote={openQuoteModal}
              />
            ))}
          </div>
        ) : count === 5 ? (
          // 5 CARDS (3 columns, centered last row with k = 1.0)
          <div className="flex flex-wrap justify-center gap-[calc(20*var(--w))] gap-x-[calc(22*var(--w))]">
            {applications.map((app, index) => (
              <div
                key={app.id}
                className="w-full md:w-[calc((100%-calc(22*var(--w)))/2)] lg:w-[calc((100%-calc(44*var(--w)))/3)]"
              >
                <ApplicationCard
                  app={app}
                  index={index}
                  isScale13={false}
                  aspectClass="aspect-[1.55/1] sm:aspect-[1.9/1] lg:aspect-[2.15/1]"
                  onQuote={openQuoteModal}
                />
              </div>
            ))}
          </div>
        ) : (
          // 1-3 CARDS
          <div className="flex flex-wrap justify-center gap-[calc(20*var(--w))] gap-x-[calc(22*var(--w))]">
            {applications.map((app, index) => (
              <div
                key={app.id}
                className="w-full max-w-[calc(861*var(--w))]"
              >
                <ApplicationCard
                  app={app}
                  index={index}
                  isScale13={isScale13}
                  aspectClass="aspect-[1.55/1] sm:aspect-[1.9/1] lg:aspect-[2.15/1]"
                  onQuote={openQuoteModal}
                />
              </div>
            ))}
          </div>
        )}

        {/* INFO BAR (under cards, 20px gap; navy gradient with yellow access partner CTA) */}
        <div className="mt-[calc(20*var(--w))] rounded-[calc(10*var(--w))] bg-gradient-to-r from-[#0A2A66] via-[#0B3182] to-[#0B3A9A] shadow-[0_8px_24px_rgba(10,42,102,0.12)] overflow-hidden">
          {/* Desktop single row layout (>= 1100px) */}
          <div className="hidden lg:flex items-center justify-between h-[calc(69*var(--w))] relative">
            {/* Left section: Shield + SAFE | RELIABLE | EFFICIENT */}
            <div className="flex items-center pl-[calc(24*var(--w))] pr-[calc(22*var(--w))] shrink-0">
              <ShieldCheck
                className="w-[calc(34*var(--w))] h-[calc(34*var(--w))] text-white mr-[calc(14*var(--w))] shrink-0"
                strokeWidth={1.8}
              />
              <div className="flex items-center font-heading font-bold uppercase text-[calc(20*var(--w))] tracking-[0.08em] text-white whitespace-nowrap">
                <span>SAFE</span>
                <span className="mx-[calc(10*var(--w))] h-[calc(18*var(--w))] w-[1px] bg-white/35" />
                <span>RELIABLE</span>
                <span className="mx-[calc(10*var(--w))] h-[calc(18*var(--w))] w-[1px] bg-white/35" />
                <span>EFFICIENT</span>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="h-[calc(38*var(--w))] w-[1px] bg-white/35 shrink-0" />

            {/* 4 Feature Items */}
            <div className="flex items-center justify-around flex-1 px-[calc(12*var(--w))]">
              {INFO_BAR_FEATURES.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center px-[calc(10*var(--w))]">
                    <FeatureIcon
                      name={item.icon}
                      className="w-[calc(30*var(--w))] h-[calc(30*var(--w))] text-white mr-[calc(12*var(--w))] shrink-0"
                    />
                    <div className="font-sans font-medium text-[calc(13*var(--w))] leading-[calc(17*var(--w))] text-white whitespace-nowrap">
                      <div>{item.line1}</div>
                      <div>{item.line2}</div>
                    </div>
                  </div>
                  {idx < INFO_BAR_FEATURES.length - 1 && (
                    <div className="h-[calc(38*var(--w))] w-[1px] bg-white/35 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Right Slanted Yellow Button */}
            <button
              type="button"
              onClick={() => openQuoteModal()}
              aria-label="Contact Citizen Construction Rentals for quote"
              className="relative h-full w-[calc(303*var(--w))] bg-[#FFC21A] hover:bg-[#F2B30D] transition-colors flex items-center justify-between pl-[calc(36*var(--w))] pr-[calc(24*var(--w))] text-left shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              style={{
                clipPath: "polygon(calc(22 * var(--w)) 0, 100% 0, 100% 100%, 0 100%)",
              }}
            >
              <div className="font-heading font-bold uppercase text-[calc(20*var(--w))] leading-[1.05] text-[#0A2A66]">
                <div>YOUR VERTICAL</div>
                <div>ACCESS PARTNER</div>
              </div>
              <ArrowRight
                className="w-[calc(26*var(--w))] h-[calc(26*var(--w))] text-[#0A2A66] shrink-0 transform group-hover:translate-x-1 transition-transform"
                strokeWidth={2.5}
              />
            </button>
          </div>

          {/* Tablet 2-row layout (768px – 1099px) */}
          <div className="hidden md:flex lg:hidden flex-col">
            {/* Top row: Safe | Reliable | Efficient */}
            <div className="flex items-center justify-center py-3.5 border-b border-white/20">
              <ShieldCheck className="w-6 h-6 text-white mr-2.5 shrink-0" strokeWidth={1.8} />
              <div className="flex items-center font-heading font-bold uppercase text-lg tracking-[0.08em] text-white">
                <span>SAFE</span>
                <span className="mx-3 h-4 w-[1px] bg-white/35" />
                <span>RELIABLE</span>
                <span className="mx-3 h-4 w-[1px] bg-white/35" />
                <span>EFFICIENT</span>
              </div>
            </div>

            {/* Middle row: 4 features evenly spaced */}
            <div className="grid grid-cols-4 divide-x divide-white/20 py-3 px-2">
              {INFO_BAR_FEATURES.map((item, idx) => (
                <div key={idx} className="flex items-center justify-center px-2">
                  <FeatureIcon name={item.icon} className="w-5 h-5 text-white mr-2 shrink-0" />
                  <div className="font-sans font-medium text-xs leading-tight text-white">
                    <div>{item.line1}</div>
                    <div>{item.line2}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row: Full-width yellow button */}
            <button
              type="button"
              onClick={() => openQuoteModal()}
              aria-label="Contact Citizen Construction Rentals for quote"
              className="w-full bg-[#FFC21A] hover:bg-[#F2B30D] py-3.5 px-6 transition-colors flex items-center justify-center gap-3 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <span className="font-heading font-bold uppercase text-lg text-[#0A2A66]">
                YOUR VERTICAL ACCESS PARTNER
              </span>
              <ArrowRight className="w-5 h-5 text-[#0A2A66]" strokeWidth={2.5} />
            </button>
          </div>

          {/* Mobile stacked block (< 768px) */}
          <div className="flex md:hidden flex-col">
            {/* Top row: Words */}
            <div className="flex items-center justify-center py-3 px-3 border-b border-white/15">
              <ShieldCheck className="w-5 h-5 text-white mr-2 shrink-0" strokeWidth={1.8} />
              <div className="flex items-center font-heading font-bold uppercase text-sm tracking-[0.08em] text-white">
                <span>SAFE</span>
                <span className="mx-2 h-3.5 w-[1px] bg-white/35" />
                <span>RELIABLE</span>
                <span className="mx-2 h-3.5 w-[1px] bg-white/35" />
                <span>EFFICIENT</span>
              </div>
            </div>

            {/* 2x2 grid for 4 features */}
            <div className="grid grid-cols-2 divide-x divide-y divide-white/15 p-2">
              {INFO_BAR_FEATURES.map((item, idx) => (
                <div key={idx} className="flex items-center p-2.5">
                  <FeatureIcon name={item.icon} className="w-5 h-5 text-white mr-2.5 shrink-0" />
                  <div className="font-sans font-medium text-xs leading-snug text-white">
                    <div>{item.line1}</div>
                    <div>{item.line2}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Full-width 56px yellow button */}
            <button
              type="button"
              onClick={() => openQuoteModal()}
              aria-label="Contact Citizen Construction Rentals for quote"
              className="w-full h-14 bg-[#FFC21A] hover:bg-[#F2B30D] transition-colors flex items-center justify-center gap-2.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <span className="font-heading font-bold uppercase text-base text-[#0A2A66] tracking-wide">
                YOUR VERTICAL ACCESS PARTNER
              </span>
              <ArrowRight className="w-5 h-5 text-[#0A2A66]" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ApplicationCardProps {
  app: ApplicationItem;
  index: number;
  isScale13: boolean;
  aspectClass: string;
  onQuote: (msg?: string) => void;
}

function ApplicationCard({
  app,
  index,
  isScale13,
  aspectClass,
  onQuote,
}: ApplicationCardProps) {
  return (
    <button
      type="button"
      onClick={() => onQuote(app.whatsappMessage)}
      aria-label={`Get a rental quote for ${app.title}`}
      className={`group relative w-full ${aspectClass} rounded-[calc(12*var(--w))] overflow-hidden shadow-[0_8px_24px_rgba(10,42,102,0.12)] cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-[#FFC21A] focus-visible:outline-none`}
    >
      {/* Photo (crisp, bright, full bleed, hover zoom 1.04) */}
      <Image
        src={app.image}
        alt={app.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={88}
        priority={index < 2}
        className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-400 ease-out"
      />

      {/* Gradient Overlay: transparent top 40% -> rich navy at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 40%, rgba(11,47,120,0.88) 72%, rgba(10,42,102,0.96) 100%)",
        }}
      />

      {/* Bottom Content Area */}
      <div
        className={`absolute inset-x-0 bottom-0 pointer-events-none ${
          isScale13
            ? "p-4 sm:p-5 lg:p-[calc(27*var(--w))]"
            : "p-3 sm:p-4 lg:p-[calc(21*var(--w))]"
        }`}
      >
        {/* Top Content Row: Solid Amber Icon Tile + Barlow Condensed Title */}
        <div className="flex items-center">
          {/* Amber Icon Tile with navy glyph */}
          <div
            className={`flex items-center justify-center shrink-0 bg-[#FFC21A] text-[#0A2A66] shadow-sm ${
              isScale13
                ? "w-10 h-10 sm:w-12 sm:h-12 lg:w-[calc(73*var(--w))] lg:h-[calc(73*var(--w))] rounded-lg lg:rounded-[calc(14*var(--w))]"
                : "w-9 h-9 sm:w-11 sm:h-11 lg:w-[calc(56*var(--w))] lg:h-[calc(56*var(--w))] rounded-lg lg:rounded-[calc(12*var(--w))]"
            }`}
          >
            <ApplicationIcon
              name={app.icon}
              className={
                isScale13
                  ? "w-5 h-5 sm:w-6 sm:h-6 lg:w-[calc(39*var(--w))] lg:h-[calc(39*var(--w))]"
                  : "w-4 h-4 sm:w-5 sm:h-5 lg:w-[calc(30*var(--w))] lg:h-[calc(30*var(--w))]"
              }
              strokeWidth={2}
            />
          </div>

          {/* Title */}
          <h3
            className={`font-heading font-bold uppercase text-white whitespace-nowrap tracking-wide ${
              isScale13
                ? "ml-3 sm:ml-4 lg:ml-[calc(21*var(--w))] text-lg sm:text-xl lg:text-[calc(29*var(--w))]"
                : "ml-2.5 sm:ml-3 lg:ml-[calc(16*var(--w))] text-base sm:text-lg lg:text-[calc(22*var(--w))]"
            }`}
          >
            {app.title}
          </h3>
        </div>

        {/* Bottom Content Row: Description (aligned to title's left edge, leaves gap for corner arrow) */}
        <p
          className={`font-sans font-normal text-white/92 line-clamp-2 ${
            isScale13
              ? "mt-2 sm:mt-2.5 lg:mt-[calc(12*var(--w))] ml-[52px] sm:ml-[64px] lg:ml-[calc(94*var(--w))] mr-16 sm:mr-20 lg:mr-[calc(156*var(--w))] max-w-[calc(100%-calc(156*var(--w)))] text-xs sm:text-sm lg:text-[calc(18*var(--w))] lg:leading-[calc(25*var(--w))]"
              : "mt-1.5 sm:mt-2 lg:mt-[calc(9*var(--w))] ml-[46px] sm:ml-[56px] lg:ml-[calc(72*var(--w))] mr-14 sm:mr-16 lg:mr-[calc(120*var(--w))] max-w-[calc(100%-calc(120*var(--w)))] text-xs sm:text-xs lg:text-[calc(14*var(--w))] lg:leading-[calc(19*var(--w))]"
          }`}
        >
          {app.description}
        </p>
      </div>

      {/* Bottom-Right Corner Wedge (Right-angled triangle in bright blue #1E5BE0) */}
      <div
        className={`absolute right-0 bottom-0 pointer-events-none bg-[#1E5BE0] group-hover:bg-[#2868F0] transition-colors ${
          isScale13
            ? "w-[72px] h-[60px] sm:w-[90px] sm:h-[76px] lg:w-[calc(120*var(--w))] lg:h-[calc(101*var(--w))]"
            : "w-[56px] h-[48px] sm:w-[70px] sm:h-[60px] lg:w-[calc(92*var(--w))] lg:h-[calc(78*var(--w))]"
        }`}
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        }}
      >
        {/* Circular Arrow Button on wedge */}
        <div
          className={`absolute rounded-full border-2 border-white bg-transparent flex items-center justify-center ${
            isScale13
              ? "w-7 h-7 sm:w-8 sm:h-8 lg:w-[calc(44*var(--w))] lg:h-[calc(44*var(--w))] right-2.5 bottom-2.5 sm:right-3.5 sm:bottom-3.5 lg:right-[calc(22*var(--w))] lg:bottom-[calc(22*var(--w))]"
              : "w-6 h-6 sm:w-7 sm:h-7 lg:w-[calc(34*var(--w))] lg:h-[calc(34*var(--w))] right-2 bottom-2 sm:right-3 sm:bottom-3 lg:right-[calc(17*var(--w))] lg:bottom-[calc(17*var(--w))]"
          }`}
        >
          <ArrowRight
            className={`text-white transform group-hover:translate-x-[3px] transition-transform duration-200 ${
              isScale13
                ? "w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-[calc(23*var(--w))] lg:h-[calc(23*var(--w))]"
                : "w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-[calc(18*var(--w))] lg:h-[calc(18*var(--w))]"
            }`}
            strokeWidth={2.5}
          />
        </div>
      </div>
    </button>
  );
}
