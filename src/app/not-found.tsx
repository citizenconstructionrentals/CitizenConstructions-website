import React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 bg-brand-offwhite">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-gray-200 shadow-card p-8 sm:p-12 text-center relative overflow-hidden">
        {/* Slanted Amber Slash Accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-amber/15 rotate-45 pointer-events-none" />

        <span className="font-heading font-extrabold text-7xl sm:text-8xl text-brand-navy block leading-none mb-2">
          404
        </span>

        <h1 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-wide text-brand-ink mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-gray-600 max-w-md mx-auto mb-8 font-sans leading-relaxed">
          The machine or page you are looking for has moved or does not exist. Browse our active aerial fleet or chat with our rental desk directly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-navy text-white font-heading font-bold uppercase tracking-wider text-sm hover:bg-brand-navy-dark transition-colors min-h-[48px]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <WhatsAppCTA
            variant="whatsapp"
            size="md"
            className="w-full sm:w-auto text-sm"
            message="Hello Citizen Construction Rentals, I need assistance finding a lift on rent."
          >
            Ask on WhatsApp
          </WhatsAppCTA>
        </div>
      </div>
    </div>
  );
}
