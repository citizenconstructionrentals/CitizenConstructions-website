"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/data/faq";
import { siteConfig } from "@/config/site";
import { useRentalQuote } from "@/components/ui/RentalQuoteContext";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const { openQuoteModal } = useRentalQuote();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <>
      <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Heading + CTA Box */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="eyebrow-label mb-2.5">
                  <span className="slash-accent" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-bold tracking-tight text-slate-900 leading-[1.15]">
                  Rental FAQ
                </h2>
                <p className="mt-3 text-[16px] text-slate-600 leading-relaxed">
                  Transparent details on equipment delivery, CE certification, rental rates, and hire terms across India.
                </p>
              </div>

              {/* Assistance Card */}
              <div className="card-premium p-6 sm:p-7 bg-brand-offwhite">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Need Help Choosing a Lift?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  Send your site height requirement and location. Our rental desk will share the ideal machine recommendation within minutes.
                </p>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => openQuoteModal("Hello Citizen Construction Rentals, I need help choosing the right aerial lift for my site. Working height: , Location: ")}
                    className="btn-pill btn-pill-whatsapp h-11 text-[14px] w-full justify-center"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Ask on WhatsApp</span>
                  </button>

                  <a
                    href={`tel:+${siteConfig.phones.primary.raw}`}
                    className="btn-pill btn-pill-amber h-11 text-[14px] w-full justify-center"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>Call: {siteConfig.phones.primary.display}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Accordion */}
            <div className="lg:col-span-7 space-y-3">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="card-premium overflow-hidden border border-slate-200/90"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-semibold text-[16px] sm:text-[17px] text-slate-900 hover:text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy transition-colors"
                    >
                      <span className="pr-4" lang={item.lang}>{item.question}</span>
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200",
                          isOpen && "rotate-180 bg-brand-navy text-white"
                        )}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        lang={item.lang}
                        className="px-5 sm:px-6 pb-6 pt-1 text-[15px] text-slate-600 leading-relaxed border-t border-slate-100"
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
