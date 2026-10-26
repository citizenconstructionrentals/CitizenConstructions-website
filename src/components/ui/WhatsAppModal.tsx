"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/config/site";
import { formatWhatsAppUrl } from "@/lib/utils";
import { MessageCircle, Phone, X, ShieldCheck } from "lucide-react";

export interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Citizen Construction Rentals, I need a scissor/boom lift on rent. Please share availability and rental rates. Site location: , Duration: , Working height: ";

export function WhatsAppModal({
  isOpen,
  onClose,
  message = DEFAULT_WHATSAPP_MESSAGE,
  title = "Chat With Our Rental Desk",
}: WhatsAppModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const urlPhone1 = formatWhatsAppUrl(siteConfig.phones.primary.raw, message);
  const urlPhone2 = formatWhatsAppUrl(siteConfig.phones.secondary.raw, message);

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#0A2A66]/65 backdrop-blur-sm transition-opacity cursor-pointer animate-in fade-in duration-150 select-none"
      onClick={(e) => {
        // Close if clicked anywhere on the backdrop outside the modal dialog box
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 sm:p-7 pb-[max(1.5rem,env(safe-area-inset-bottom))] border border-[#E6EEF8] overflow-hidden cursor-default transform transition-all animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag indicator */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E6EEF8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#16A34A]/15 flex items-center justify-center text-[#16A34A] shrink-0">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 id="whatsapp-modal-title" className="font-condensed font-bold uppercase tracking-wide text-[20px] text-[#0A2A66] leading-tight">
                {title}
              </h3>
              <p className="text-[12px] text-slate-500 font-sans mt-0.5">Quick response • Pan-India mobilization</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2A66] shrink-0"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Message preview snippet */}
        <div className="mt-4 p-3 rounded-xl bg-[#F6F8FB] border border-[#E6EEF8] text-[12px] text-slate-600 font-sans">
          <span className="font-bold text-[#0A2A66] block mb-1">Pre-filled Message:</span>
          <span className="italic line-clamp-2">"{message}"</span>
        </div>

        {/* Option 1 & Option 2 Phone Number Choices */}
        <div className="mt-4 space-y-3">
          {/* Number 1: Primary Rental Desk */}
          <a
            href={urlPhone1}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border-2 border-[#16A34A]/30 bg-[#F0FDF4] hover:bg-[#16A34A] hover:border-[#16A34A] text-[#0A2A66] hover:text-white group transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-[#16A34A] group-hover:bg-white text-white group-hover:text-[#16A34A] flex items-center justify-center font-bold shrink-0 shadow-sm transition-colors">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div className="min-w-0 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803D] group-hover:text-emerald-100 block">
                  Primary Rental Desk
                </span>
                <span className="font-condensed font-bold text-[20px] sm:text-[22px] tracking-wide block leading-tight text-[#0A2A66] group-hover:text-white truncate">
                  +91 98112 03530
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-[#16A34A]/15 group-hover:bg-white/20 text-[#15803D] group-hover:text-white rounded-full shrink-0 uppercase tracking-wider">
              Fastest
            </span>
          </a>

          {/* Number 2: Support Desk */}
          <a
            href={urlPhone2}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-[#E6EEF8] bg-[#F8FAFC] hover:bg-[#16A34A] hover:border-[#16A34A] text-[#0A2A66] hover:text-white group transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-slate-200 group-hover:bg-white text-slate-700 group-hover:text-[#16A34A] flex items-center justify-center font-bold shrink-0 transition-colors">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div className="min-w-0 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-100 block">
                  Support & Dispatch Desk
                </span>
                <span className="font-condensed font-bold text-[20px] sm:text-[22px] tracking-wide block leading-tight text-[#0A2A66] group-hover:text-white truncate">
                  +91 81783 86750
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-200 group-hover:bg-white/20 text-slate-600 group-hover:text-white rounded-full shrink-0 uppercase tracking-wider">
              Online
            </span>
          </a>
        </div>

        {/* Or Direct Phone Calling Options */}
        <div className="mt-5 pt-3.5 border-t border-[#E6EEF8] flex items-center justify-between text-[12px] text-slate-500 font-sans">
          <span className="flex items-center gap-1.5 text-slate-600 font-medium">
            <Phone className="w-3.5 h-3.5 text-[#0A2A66]" /> Or direct call:
          </span>
          <div className="flex gap-2.5 font-bold text-[#0A2A66]">
            <a
              href={`tel:${siteConfig.phones.primary.raw}`}
              className="hover:underline"
            >
              +91 98112 03530
            </a>
            <span>•</span>
            <a
              href={`tel:${siteConfig.phones.secondary.raw}`}
              className="hover:underline"
            >
              +91 81783 86750
            </a>
          </div>
        </div>

        {/* Trust badge footer */}
        <div className="mt-3.5 pt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-sans">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0A2A66]" />
          <span>Serving Indian Industry Since 2000 • Direct Rates</span>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
