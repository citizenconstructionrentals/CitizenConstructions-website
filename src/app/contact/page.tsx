"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { formatWhatsAppUrl } from "@/lib/utils";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    liftType: "Scissor Lift",
    condition: "Brand New",
    workingHeightNeeded: "8m - 10m Working Height",
    rentalDuration: "Monthly Rental (1 to 3 Months)",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build formatted context-rich WhatsApp message
    const formattedMessage = `*New Rental Enquiry - Citizen Construction Rentals*
• *Name:* ${formData.name || "Not provided"}
• *Phone:* ${formData.phone || "Not provided"}
• *City / Site Location:* ${formData.city || "Not provided"}
• *Lift Type:* ${formData.liftType}
• *Fleet Condition:* ${formData.condition}
• *Working Height Needed:* ${formData.workingHeightNeeded}
• *Rental Duration:* ${formData.rentalDuration}
• *Message / Special Notes:* ${formData.message || "None"}`;

    const waUrl = formatWhatsAppUrl(siteConfig.phones.primary.raw, formattedMessage);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Header */}
      <section className="bg-brand-navy text-white py-14 sm:py-20 relative overflow-hidden">
        {/* Slanted Amber Slash Accent */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-amber/15 -skew-x-12 translate-x-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: "Contact Us" }]} />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-amber my-5">
            <Clock className="w-3.5 h-3.5" />
            <span>Fast Turnaround • Pan-India Mobilization</span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-6xl uppercase tracking-tight text-white max-w-3xl leading-none">
            Scissor Lift Rental Quote &amp; Direct Support
          </h1>

          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed font-sans">
            Request your scissor lift rental quote or boom lift rental contact directly with Citizen Construction Rentals contact desk. Call our scissor lift on rent contact number or receive an instant rental quote on WhatsApp for immediate site delivery across India.
          </p>
        </div>
      </section>

      {/* Main Grid: Direct Contact Cards & Enquiry Form */}
      <section className="py-16 sm:py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-navy block mb-1">
                  Direct Communications
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-tight text-brand-ink">
                  Scissor Lift Rental Quote &amp; Instant Communication
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Tap below to connect directly with our dispatch team.
                </p>
              </div>

              {/* Verified Visual Badge with image */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-brand-offwhite shrink-0">
                  <Image
                    src="/images/machines/scissor/straightline-cutout-hd.png"
                    alt="Citizen Construction Rentals - Scissor lift rental quote assistance"
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="text-xs text-gray-600">
                  <span className="font-bold text-brand-navy block text-sm font-heading uppercase">Direct Equipment Mobilization</span>
                  Fast delivery across India from certified rental yards.
                </div>
              </div>

              {/* WhatsApp Card 1 (Primary) */}
              <div className="p-6 rounded-2xl bg-white border-2 border-brand-whatsapp/30 shadow-soft hover:shadow-card transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-brand-whatsapp/20 text-emerald-900">
                    Primary Desk
                  </span>
                  <span className="text-xs text-gray-400">Available Daily</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-whatsapp text-white flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">Phone / WhatsApp 1</span>
                    <a
                      href={`tel:${siteConfig.phones.primary.raw}`}
                      className="font-heading font-bold text-xl sm:text-2xl text-brand-ink hover:text-brand-navy"
                    >
                      {siteConfig.phones.primary.display}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                  <a
                    href={`https://wa.me/${siteConfig.phones.primary.raw}?text=${encodeURIComponent("Hello Citizen Construction Rentals, I need a scissor/boom lift on rent. Please share availability and rental rates.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-white font-heading font-bold uppercase text-xs tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${siteConfig.phones.primary.raw}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 hover:border-brand-navy hover:text-brand-navy text-gray-700 font-heading font-bold uppercase text-xs tracking-wider transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>

              {/* WhatsApp Card 2 (Secondary) */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-soft hover:shadow-card transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-gray-100 text-gray-700">
                    Support Desk
                  </span>
                  <span className="text-xs text-gray-400">Online</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-navy/10 text-brand-navy flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">Phone / WhatsApp 2</span>
                    <a
                      href={`tel:${siteConfig.phones.secondary.raw}`}
                      className="font-heading font-bold text-xl sm:text-2xl text-brand-ink hover:text-brand-navy"
                    >
                      {siteConfig.phones.secondary.display}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                  <a
                    href={`https://wa.me/${siteConfig.phones.secondary.raw}?text=${encodeURIComponent("Hello Citizen Construction Rentals, I'm inquiring about aerial equipment rental availability.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-white font-heading font-bold uppercase text-xs tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${siteConfig.phones.secondary.raw}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 hover:border-brand-navy hover:text-brand-navy text-gray-700 font-heading font-bold uppercase text-xs tracking-wider transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>

              {/* Email & Socials Card */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-soft space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Official Email</span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-semibold text-sm text-brand-ink hover:text-brand-navy break-all"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Official Website</span>
                    <a
                      href={siteConfig.url}
                      className="font-semibold text-sm text-brand-ink hover:text-brand-navy"
                    >
                      {siteConfig.domain}
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                  <span>Connect on Social Media:</span>
                  <div className="flex gap-2">
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-brand-navy hover:text-white transition-colors font-semibold"
                    >
                      Facebook
                    </a>
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-brand-navy hover:text-white transition-colors font-semibold"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>

              {/* Physical Address & Map */}
              {siteConfig.address && (
                <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-soft space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold uppercase text-brand-ink">
                        Office &amp; Yard Location
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">{siteConfig.address}</p>
                    </div>
                  </div>
                  {siteConfig.mapEmbedUrl && (
                    <div className="w-full h-48 rounded-xl overflow-hidden mt-3 border">
                      <iframe
                        src={siteConfig.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        title="Citizen Construction Rentals Office Location"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Quick Quotation Form (Builds WhatsApp Message directly) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-card">
              <div className="mb-6">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-navy block mb-1">
                  Online Inquiry
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-tight text-brand-ink">
                  Instant Rental Quotation Request
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 font-sans">
                  Fill in your project requirements below. On submit, this automatically generates your formatted rental inquiry and opens WhatsApp for instant processing.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[16px] min-[1100px]:text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[16px] min-[1100px]:text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      City / Site Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Gurugram / Noida / Mumbai"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[16px] min-[1100px]:text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Lift Type *
                    </label>
                    <select
                      value={formData.liftType}
                      onChange={(e) => setFormData({ ...formData, liftType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[16px] min-[1100px]:text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white"
                    >
                      <option value="Scissor Lift">Scissor Lift</option>
                      <option value="Boom Lift">Boom Lift</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Brand New or Used *
                    </label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[16px] min-[1100px]:text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white"
                    >
                      <option value="Brand New">Brand New</option>
                      <option value="Used">Used</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Working Height Needed *
                    </label>
                    <select
                      value={formData.workingHeightNeeded}
                      onChange={(e) => setFormData({ ...formData, workingHeightNeeded: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[16px] min-[1100px]:text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white"
                    >
                      <option value="6m - 8m Working Height">6m - 8m (Compact Indoor)</option>
                      <option value="8m - 10m Working Height">8m - 10m (Standard Warehouse)</option>
                      <option value="10m - 12m Working Height">10m - 12m (Mid-Height Plant)</option>
                      <option value="12m - 14m Working Height">12m - 14m (High Bay / Structural)</option>
                      <option value="14m - 16m Working Height">14m - 16m (Heavy Industry)</option>
                      <option value="16m+ High-Reach Boom Lift">16m+ High Reach Boom Lift</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Rental Duration *
                    </label>
                    <select
                      value={formData.rentalDuration}
                      onChange={(e) => setFormData({ ...formData, rentalDuration: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[16px] min-[1100px]:text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none bg-white"
                    >
                      <option value="Weekly (1 to 3 Weeks)">Weekly (1 to 3 Weeks)</option>
                      <option value="Monthly (1 to 3 Months)">Monthly (1 to 3 Months)</option>
                      <option value="Long Term Project (6+ Months)">Long Term Project (6+ Months)</option>
                      <option value="Short Term / Emergency Backup">Short Term / Emergency Backup</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Floor surface type, indoor vs outdoor, doorway restrictions, etc."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-[16px] min-[1100px]:text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-white font-heading font-bold uppercase tracking-wider text-base shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Send Rental Enquiry on WhatsApp</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
                  <ShieldCheck className="w-4 h-4 text-brand-navy" />
                  <span>No spam • Opens directly in your official WhatsApp</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
