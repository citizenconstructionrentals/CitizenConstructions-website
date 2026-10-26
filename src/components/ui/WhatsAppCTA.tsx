"use client";

import React from "react";
import { useRentalQuote } from "./RentalQuoteContext";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppCTAProps {
  message?: string;
  children?: React.ReactNode;
  variant?: "whatsapp" | "amber" | "navy" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
  modalTitle?: string;
  ariaLabel?: string;
}

export function WhatsAppCTA({
  message,
  children = "Get Quote on WhatsApp",
  variant = "whatsapp",
  size = "md",
  className,
  showIcon = true,
  modalTitle,
  ariaLabel,
}: WhatsAppCTAProps) {
  const { openQuoteModal } = useRentalQuote();

  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 select-none rounded-full active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const sizeStyles = {
    sm: "px-4 py-2 text-[14px] gap-2 min-h-[42px]",
    md: "px-6 py-2.5 text-[15px] sm:text-[16px] gap-2.5 min-h-[48px]",
    lg: "px-8 py-3.5 text-[16px] sm:text-[17px] gap-3 min-h-[52px]",
  };

  const variantStyles = {
    whatsapp:
      "bg-[#15803d] text-white hover:bg-[#166534] shadow-md hover:shadow-lg focus-visible:ring-[#15803d]",
    amber:
      "bg-brand-amber text-[#0B1B3A] hover:bg-brand-amber-hover shadow-md hover:shadow-lg focus-visible:ring-brand-amber",
    navy: "bg-brand-navy text-white hover:bg-brand-navy-dark shadow-md hover:shadow-lg focus-visible:ring-brand-navy",
    outline:
      "border-2 border-[#15803d] text-[#15803d] hover:bg-[#15803d] hover:text-white focus-visible:ring-[#15803d]",
    white:
      "bg-white text-brand-navy hover:bg-slate-100 shadow-md hover:shadow-lg focus-visible:ring-white",
  };

  return (
    <button
      type="button"
      onClick={() => openQuoteModal(message, modalTitle)}
      aria-label={ariaLabel || (typeof children === "string" ? children : "Contact via WhatsApp")}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {showIcon && <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
