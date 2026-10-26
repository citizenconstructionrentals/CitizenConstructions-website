"use client";

import React from "react";
import { useRentalQuote } from "@/components/ui/RentalQuoteContext";

function WhatsAppIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.07 16.31C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.32 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.37C16.31 14.25 15.09 13.65 14.86 13.56C14.64 13.48 14.47 13.44 14.31 13.69C14.14 13.94 13.66 14.51 13.51 14.68C13.37 14.85 13.22 14.87 12.97 14.75C12.72 14.62 11.92 14.36 10.97 13.52C10.23 12.86 9.73 12.04 9.59 11.79C9.44 11.54 9.57 11.41 9.7 11.28C9.81 11.17 9.94 11 10.07 10.85C10.2 10.7 10.24 10.59 10.32 10.43C10.41 10.26 10.37 10.12 10.3 10C10.24 9.87 9.75 8.67 9.54 8.18C9.34 7.69 9.14 7.76 8.99 7.75C8.84 7.74 8.68 7.74 8.51 7.74C8.35 7.74 8.08 7.8 7.85 8.05C7.63 8.3 7 8.89 7 10.09C7 11.29 7.87 12.45 8 12.61C8.12 12.78 9.72 15.25 12.18 16.31C12.76 16.56 13.22 16.71 13.57 16.82C14.16 17.01 14.69 16.98 15.12 16.92C15.6 16.85 16.59 16.32 16.8 15.74C17 15.17 17 14.68 16.94 14.58C16.87 14.48 16.72 14.42 16.56 14.37Z" />
    </svg>
  );
}

export function FloatingWhatsApp() {
  const { openQuoteModal } = useRentalQuote();

  return (
    <div className="hidden md:block fixed bottom-4 right-4 sm:bottom-6 sm:right-6 min-[1100px]:bottom-[calc(57*var(--s))] min-[1100px]:right-[calc(29*var(--s))] z-40">
      <button
        type="button"
        onClick={() => openQuoteModal()}
        className="group relative flex items-center justify-center w-[60px] h-[60px] min-[1100px]:w-[calc(76*var(--s))] min-[1100px]:h-[calc(76*var(--s))] rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white shadow-[0_8px_30px_rgba(22,163,74,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
        aria-label="Instant WhatsApp Rental Inquiry"
      >
        {/* Subtle circular pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#16A34A] opacity-20 group-hover:opacity-35 animate-ping pointer-events-none" />

        <WhatsAppIcon className="w-[32px] h-[32px] min-[1100px]:w-[calc(40*var(--s))] min-[1100px]:h-[calc(40*var(--s))] relative z-10" />

        {/* Desktop tooltip badge on hover */}
        <span className="hidden min-[1100px]:block absolute right-full mr-3.5 px-3 py-1.5 bg-[#14285A] text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap font-sans">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
}
