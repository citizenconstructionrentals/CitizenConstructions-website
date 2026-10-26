import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { Clock, Phone, ArrowLeft, ShieldCheck } from "lucide-react";

interface ComingSoonProps {
  categoryName: string;
  expectedDate?: string;
  description?: string;
}

export function ComingSoon({
  categoryName,
  expectedDate = "Upcoming Fleet Addition",
  description,
}: ComingSoonProps) {
  const defaultDesc = `Our new fleet of ${categoryName} is currently being prepared and tested to our rigorous safety standards. Chat with our dispatch desk on WhatsApp for early reservations or current alternative models.`;

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-gray-200 shadow-card p-8 sm:p-12 text-center relative overflow-hidden">
        {/* Angled amber decorative slash accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-amber/15 rotate-45 pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-brand-amber/20 text-amber-900 mx-auto flex items-center justify-center mb-6">
          <Clock className="w-8 h-8" />
        </div>

        <span className="text-xs font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy inline-block mb-3">
          {expectedDate}
        </span>

        <h1 className="font-heading font-bold text-3xl sm:text-4xl uppercase tracking-wide text-brand-ink mb-4">
          {categoryName}
        </h1>

        <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
          {description || defaultDesc}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <WhatsAppCTA
            variant="whatsapp"
            size="md"
            className="w-full sm:w-auto"
            message={`Hello Citizen Construction Rentals, I noticed ${categoryName} is coming soon. Please notify me about availability and rates. My project location: `}
          >
            Check Advance Availability
          </WhatsAppCTA>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-heading uppercase tracking-wider font-bold hover:border-brand-navy hover:text-brand-navy transition-colors min-h-[48px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Active Fleet</span>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-brand-navy" />
          <span>Need immediate equipment? Call {siteConfig.phones.primary.display}</span>
        </div>
      </div>
    </div>
  );
}
