"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { USED_TRADEMARK_DISCLAIMER } from "@/data/used";
import { useRentalQuote } from "@/components/ui/RentalQuoteContext";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Calendar,
  Globe,
} from "lucide-react";

export function Footer() {
  const { openQuoteModal } = useRentalQuote();
  const years = new Date().getFullYear() - 2000;

  return (
    <footer className="bg-brand-ink text-white/80 pt-16 pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Story */}
          <div className="space-y-4">
            {/* Logo in white rounded pill */}
            <div className="inline-block bg-white px-4 py-2 rounded-full shadow-md">
              <div className="relative h-9 w-40">
                <Image
                  src="/brand/logo.png"
                  alt="Citizen Construction Rentals"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-[14px] text-white/75 leading-relaxed">
              Scissor lift &amp; boom lift rental across India. Since 2000. Rent brand new Straightline lifts or trusted JLG &amp; Genie lifts, delivered to your site.
            </p>

            {/* Quick trust chips */}
            <div className="flex flex-wrap gap-2 text-[12px] pt-1">
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/90 flex items-center gap-1.5 border border-white/10 font-medium">
                <Calendar className="w-3.5 h-3.5 text-brand-amber" /> Since 2000
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/90 flex items-center gap-1.5 border border-white/10 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-amber" /> CE Certified
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-emerald-300 flex items-center gap-1.5 border border-white/10 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available on Rent
              </span>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-amber hover:text-brand-ink flex items-center justify-center text-white transition-colors"
                  aria-label="Citizen Construction Rentals Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}

              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-amber hover:text-brand-ink flex items-center justify-center text-white transition-colors"
                  aria-label="Citizen Construction Rentals Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Col 2 & 3: 2-col link grid on mobile, unwrapped on sm/desktop */}
          <div className="grid grid-cols-2 gap-6 sm:contents">
            {/* Col 2: Quick Links */}
            <div>
              <p className="font-bold text-white text-[16px] tracking-tight mb-4">
                Quick Links
              </p>
              <ul className="space-y-2.5 text-[14px]">
                <li>
                  <Link href="/" className="hover:text-brand-amber transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/scissor-lift-on-rent" className="hover:text-brand-amber transition-colors">
                    Scissor Lift on Rent
                  </Link>
                </li>
                <li>
                  <Link href="/boom-lift-on-rent" className="hover:text-brand-amber transition-colors">
                    Boom Lift on Rent
                  </Link>
                </li>
                <li>
                  <Link href="/rental-rates" className="hover:text-brand-amber transition-colors">
                    Rental Rates &amp; Charges
                  </Link>
                </li>
                <li>
                  <Link href="/brand-new" className="hover:text-brand-amber transition-colors">
                    Brand New Fleet
                  </Link>
                </li>
                <li>
                  <Link href="/used" className="hover:text-brand-amber transition-colors">
                    Used Fleet
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-brand-amber transition-colors">
                    About Citizen (Since 2000)
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openQuoteModal()}
                    className="hover:text-brand-amber transition-colors text-left"
                  >
                    Get Rental Quote
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Machine Fleet */}
            <div>
              <p className="font-bold text-white text-[16px] tracking-tight mb-4">
                Our Fleet
              </p>
              <ul className="space-y-2.5 text-[14px]">
                <li>
                  <Link href="/brand-new/scissor-lifts" className="hover:text-brand-amber transition-colors">
                    Brand New Scissor Lifts on Rent (GTJZ06–14)
                  </Link>
                </li>
                <li>
                  <Link href="/brand-new/boom-lifts" className="hover:text-brand-amber transition-colors">
                    Brand New Boom Lifts on Rent (SL28T &amp; Articulating)
                  </Link>
                </li>
                <li>
                  <Link href="/used/scissor-lifts" className="hover:text-brand-amber transition-colors">
                    Used JLG &amp; Genie Scissor Lifts on Rent
                  </Link>
                </li>
                <li>
                  <Link href="/used/boom-lifts" className="hover:text-brand-amber transition-colors">
                    Used JLG &amp; Genie Boom Lifts on Rent
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: Contact Details */}
          <div>
            <p className="font-bold text-white text-[16px] tracking-tight mb-4">
              Rental Desk
            </p>
            <address className="not-italic space-y-3 text-[14px]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-amber shrink-0 mt-1" />
                <div className="space-y-1">
                  <a
                    href={`tel:+${siteConfig.phones.primary.raw}`}
                    className="block text-white hover:text-brand-amber transition-colors font-semibold"
                  >
                    {siteConfig.phones.primary.display}
                  </a>
                  <a
                    href={`tel:+${siteConfig.phones.secondary.raw}`}
                    className="block text-white/80 hover:text-brand-amber transition-colors font-semibold"
                  >
                    {siteConfig.phones.secondary.display}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-brand-amber shrink-0" />
                <a
                  href={siteConfig.url}
                  className="hover:text-brand-amber transition-colors font-medium"
                >
                  {siteConfig.domain}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-amber shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-brand-amber transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <MapPin className="w-4 h-4 text-brand-amber shrink-0 mt-1" />
                <span className="text-white/75 leading-snug">
                  {siteConfig.address}
                </span>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Trademark Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/75 text-center md:text-left">
          <p className="text-white/75">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Operating since 2000.
          </p>

          <p className="max-w-xl text-[11px] leading-relaxed text-white/75">
            {USED_TRADEMARK_DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}
