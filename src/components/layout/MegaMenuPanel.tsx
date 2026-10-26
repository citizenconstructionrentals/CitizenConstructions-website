"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Truck } from "lucide-react";
import { scissorLiftsData } from "@/data/scissor-lifts";
import { boomLiftsData } from "@/data/boom-lifts";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.07 16.31C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.32 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.37C16.31 14.25 15.09 13.65 14.86 13.56C14.64 13.48 14.47 13.44 14.31 13.69C14.14 13.94 13.66 14.51 13.51 14.68C13.37 14.85 13.22 14.87 12.97 14.75C12.72 14.62 11.92 14.36 10.97 13.52C10.23 12.86 9.73 12.04 9.59 11.79C9.44 11.54 9.57 11.41 9.7 11.28C9.81 11.17 9.94 11 10.07 10.85C10.2 10.7 10.24 10.59 10.32 10.43C10.41 10.26 10.37 10.12 10.3 10C10.24 9.87 9.75 8.67 9.54 8.18C9.34 7.69 9.14 7.76 8.99 7.75C8.84 7.74 8.68 7.74 8.51 7.74C8.35 7.74 8.08 7.8 7.85 8.05C7.63 8.3 7 8.89 7 10.09C7 11.29 7.87 12.45 8 12.61C8.12 12.78 9.72 15.25 12.18 16.31C12.76 16.56 13.22 16.71 13.57 16.82C14.16 17.01 14.69 16.98 15.12 16.92C15.6 16.85 16.59 16.32 16.8 15.74C17 15.17 17 14.68 16.94 14.58C16.87 14.48 16.72 14.42 16.56 14.37Z" />
    </svg>
  );
}

interface MegaMenuPanelProps {
  type: "brand-new" | "used";
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void;
  left: number;
  top: number;
  notchLeft: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  firstLinkRef?: React.Ref<HTMLAnchorElement>;
  panelRef?: React.Ref<HTMLDivElement>;
}

export function MegaMenuPanel({
  type,
  isOpen,
  onClose,
  onOpenModal,
  left,
  top,
  notchLeft,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  firstLinkRef,
  panelRef,
}: MegaMenuPanelProps) {
  const isUsed = type === "used";

  // Dynamic calculations from data files (Brand New Fleet only)
  const scissorCount = scissorLiftsData.length;
  const minScissorHeight = Math.min(...scissorLiftsData.map((m) => m.platformHeightNum));
  const maxScissorHeight = Math.max(...scissorLiftsData.map((m) => m.platformHeightNum));
  const boomCount = boomLiftsData.length;

  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const cards = isUsed
    ? [
        {
          id: "used-scissor",
          title: "Scissor Lifts",
          image: "/images/used/jlg-scissor.jpg",
          description: "Trusted JLG and Genie scissor lifts on rent. Ask us for available heights.",
          chips: ["JLG", "Genie"],
          linkText: "View Used Scissor Lifts",
          href: "/used/scissor-lifts",
        },
        {
          id: "used-boom",
          title: "Boom Lifts",
          image: "/images/used/jlg-boom.jpg",
          description: "Trusted JLG and Genie boom lifts on rent. Ask us for available reach.",
          chips: ["JLG", "Genie"],
          linkText: "View Used Boom Lifts",
          href: "/used/boom-lifts",
        },
      ]
    : [
        {
          id: "brand-new-scissor",
          title: "Scissor Lifts",
          image: "/images/machines/scissor/scissor-tall-studio.jpg",
          description: "Brand new Straightline electric scissor lifts on rent, delivered to your site.",
          chips: [`${scissorCount} models`, `${minScissorHeight}–${maxScissorHeight} m platform height`],
          linkText: "View Scissor Lifts",
          href: "/brand-new/scissor-lifts",
        },
        {
          id: "brand-new-boom",
          title: "Boom Lifts",
          image: "/images/machines/boom/sl28t.png",
          description: "Brand new Straightline boom lifts on rent for high-reach work, delivered to your site.",
          chips: [`${boomCount} models`],
          linkText: "View Boom Lifts",
          href: "/brand-new/boom-lifts",
        },
      ];

  return (
    <div
      ref={panelRef}
      id={`mega-menu-${type}`}
      role="region"
      aria-label={`${isUsed ? "Used Fleet" : "Brand New Fleet"} Navigation Menu`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
      className={cn(
        "fixed z-50 w-[calc(660*var(--s))] max-w-[calc(100vw-32px)] bg-white rounded-[calc(18*var(--s))] border border-[#E6EEF8] shadow-[0_24px_60px_rgba(11,27,58,0.18)] p-[calc(24*var(--s))] select-none animate-mega-menu pointer-events-auto"
      )}
    >
      {/* Invisible hover bridge connecting trigger to panel over the 10px gap */}
      <div
        className="absolute -top-[16px] inset-x-0 h-[16px] pointer-events-auto bg-transparent"
        aria-hidden="true"
      />

      {/* Triangular 12px notch pointing directly at the trigger */}
      <svg
        className="absolute -top-[10px] w-4 h-[10px] pointer-events-none z-10"
        style={{ left: `${notchLeft}px`, transform: "translateX(-50%)" }}
        viewBox="0 0 16 10"
        fill="none"
        aria-hidden="true"
      >
        <polygon points="0,10 8,0 16,10" fill="#FFFFFF" />
        <polyline
          points="0,10 8,0 16,10"
          stroke="#E6EEF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Panel Header Row */}
      <div className="flex items-center justify-between pb-[calc(16*var(--s))] mb-[calc(16*var(--s))] border-b border-[#E6EEF8]">
        <div className="flex items-center gap-[calc(7*var(--s))]">
          <span className="w-[calc(6*var(--s))] h-[calc(18*var(--s))] bg-[#F5A800] -skew-x-12 rounded-[1px]" aria-hidden="true" />
          <span className="font-condensed font-semibold text-[calc(18*var(--s))] uppercase tracking-[0.18em] text-[#0A2A66]">
            {isUsed ? "USED FLEET" : "BRAND NEW FLEET"}
          </span>
        </div>
        <span className="font-sans font-medium text-[calc(13*var(--s))] text-slate-500 tracking-tight">
          {isUsed ? "JLG · Genie" : "Straightline · CE Certified"}
        </span>
      </div>

      {/* Option Cards: 2 Columns */}
      <div className="grid grid-cols-2 gap-[calc(16*var(--s))] items-stretch">
        {cards.map((card, idx) => (
          <Link
            key={card.id}
            href={card.href}
            ref={idx === 0 ? firstLinkRef : undefined}
            onClick={onClose}
            className="group flex flex-col bg-white rounded-[calc(14*var(--s))] border border-[#E6EEF8] hover:border-[#0A2A66] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(11,27,58,0.12)] motion-reduce:hover:translate-y-0 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2A66]"
          >
            {/* Image Area: 306x170 with Soft Gradient and Soft Floor Shadow */}
            <div className="relative w-full h-[calc(170*var(--s))] bg-gradient-to-b from-[#F3F7FC] to-[#E9F0FA] flex items-center justify-center overflow-hidden border-b border-[#E6EEF8]/80">
              {/* Floor Shadow */}
              <div
                className="absolute bottom-2.5 inset-x-8 h-3 bg-black/15 rounded-full blur-[4px]"
                aria-hidden="true"
              />

              {/* Top-Left Chip: Green Dot + "Available on Rent" */}
              <div className="absolute top-[calc(10*var(--s))] left-[calc(10*var(--s))] z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-slate-200/80 shadow-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span className="font-sans font-semibold text-[calc(12*var(--s))] text-[#0A2A66] tracking-tight whitespace-nowrap">
                  Available on Rent
                </span>
              </div>

              {/* Machine Photo */}
              {!imgError[card.id] ? (
                <div className="relative w-full h-full p-[calc(12*var(--s))] flex items-center justify-center">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1100px) 100vw, 306px"
                    className="object-contain p-[calc(12*var(--s))] mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                    onError={() => setImgError((prev) => ({ ...prev, [card.id]: true }))}
                  />
                </div>
              ) : (
                /* Branded Placeholder if missing */
                <div className="flex flex-col items-center justify-center gap-2 text-[#0A2A66]">
                  <div className="w-12 h-12 rounded-xl bg-[#0A2A66]/10 flex items-center justify-center">
                    {idx === 0 ? <Layers className="w-6 h-6" /> : <Truck className="w-6 h-6" />}
                  </div>
                  <span className="font-condensed font-bold text-[14px] uppercase tracking-wide">
                    {card.title}
                  </span>
                </div>
              )}
            </div>

            {/* Card Body */}
            <div className="p-[calc(16*var(--s))] flex flex-col flex-1 justify-between bg-white text-left">
              <div>
                <h3 className="font-condensed font-bold uppercase text-[calc(22*var(--s))] text-[#0A2A66] tracking-tight whitespace-nowrap leading-tight">
                  {card.title}
                </h3>
                <p className="mt-1 text-[calc(14*var(--s))] leading-[1.5] text-slate-600 font-sans line-clamp-2">
                  {card.description}
                </p>

                {/* Meta Chips */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  {card.chips.map((chip, cIdx) => (
                    <span
                      key={cIdx}
                      className="inline-flex items-center px-2 py-0.5 rounded-[calc(5*var(--s))] bg-[#F3F7FC] text-[#0A2A66] font-sans font-medium text-[calc(12*var(--s))] border border-[#E6EEF8] whitespace-nowrap"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link Row at Bottom */}
              <div className="mt-4 pt-3 border-t border-[#E6EEF8] flex items-center justify-between">
                <span className="font-condensed font-bold text-[calc(16*var(--s))] uppercase text-[#0A2A66] tracking-wide whitespace-nowrap">
                  {card.linkText}
                </span>
                <span className="w-6 h-6 rounded-full bg-[#F5A800] text-[#0A2A66] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-1 shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Panel Footer Bar */}
      <div className="mt-[calc(16*var(--s))] bg-[#F3F7FC] rounded-[calc(12*var(--s))] p-[calc(14*var(--s))] sm:px-[calc(18*var(--s))] border border-[#E6EEF8] flex flex-col gap-[calc(10*var(--s))]">
        {/* Helper text: Never wraps */}
        <p className="font-sans font-medium text-[calc(14*var(--s))] text-slate-600 whitespace-nowrap leading-tight">
          Not sure which lift you need? Share your height and location.
        </p>

        {/* Action bar: Quote button on left, Fleet link on right */}
        <div className="flex items-center justify-between gap-4 pt-[calc(2*var(--s))]">
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 px-[calc(14*var(--s))] py-[calc(7*var(--s))] rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-sans font-semibold text-[calc(13*var(--s))] shadow-sm transition-all active:scale-95 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
          >
            <WhatsAppIcon className="w-[calc(16*var(--s))] h-[calc(16*var(--s))] shrink-0" />
            <span>Get Rental Quote</span>
          </button>

          <Link
            href={isUsed ? "/used" : "/brand-new"}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-condensed font-bold text-[calc(16*var(--s))] text-[#0A2A66] hover:text-[#F5A800] uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2A66] rounded"
          >
            <span>{isUsed ? "View all used fleet →" : "View all brand new fleet →"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
