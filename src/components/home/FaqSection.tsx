"use client";

import React from "react";
import { HOME_FAQS, type FaqItem } from "@/data/faq";
import { siteConfig } from "@/config/site";
import { useRentalQuote } from "@/components/ui/RentalQuoteContext";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqSectionProps {
  items?: FaqItem[];
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  layout?: "split" | "centered";
  defaultOpenFirst?: boolean;
  bg?: string;
}

export function FaqSection({
  items = HOME_FAQS,
  title,
  eyebrow = "Frequently Asked Questions",
  subtitle,
  layout = "split",
  defaultOpenFirst = true,
  bg = "bg-white",
}: FaqSectionProps) {
  const { openQuoteModal } = useRentalQuote();

  const renderedTitle = title || (layout === "split" ? "Rental FAQ" : "Frequently Asked Questions");
  const renderedSubtitle =
    subtitle !== undefined
      ? subtitle
      : layout === "split"
      ? "Transparent details on equipment delivery, CE certification, rental rates, and hire terms across India."
      : "Everything you need to know about aerial work platform rental, delivery across India, and hiring terms.";

  if (layout === "centered") {
    return (
      <section className={cn("py-16 sm:py-20", bg)}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            {eyebrow && (
              <div className="eyebrow-label mb-2.5 justify-center">
                <span className="slash-accent" />
                <span>{eyebrow}</span>
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-slate-900 font-heading">
              {renderedTitle}
            </h2>
            {renderedSubtitle && (
              <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
                {renderedSubtitle}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <details
                key={index}
                open={defaultOpenFirst && index === 0}
                className="group card-premium overflow-hidden border border-slate-200/90 bg-white"
              >
                <summary className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-semibold text-[16px] sm:text-[17px] text-slate-900 hover:text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="pr-4" lang={item.lang}>
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-180 group-open:bg-brand-navy group-open:text-white">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </summary>

                <div
                  lang={item.lang}
                  className="px-5 sm:px-6 pb-6 pt-1 text-[15px] text-slate-600 leading-relaxed border-t border-slate-100"
                >
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-20 sm:py-24 border-t border-slate-100", bg)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading + CTA Box */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {eyebrow && (
                <div className="eyebrow-label mb-2.5">
                  <span className="slash-accent" />
                  <span>{eyebrow}</span>
                </div>
              )}
              <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-bold tracking-tight text-slate-900 leading-[1.15]">
                {renderedTitle}
              </h2>
              {renderedSubtitle && (
                <p className="mt-3 text-[16px] text-slate-600 leading-relaxed">
                  {renderedSubtitle}
                </p>
              )}
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
                  onClick={() =>
                    openQuoteModal(
                      "Hello Citizen Construction Rentals, I need help choosing the right aerial lift for my site. Working height: , Location: "
                    )
                  }
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
            {items.map((item, index) => (
              <details
                key={index}
                open={defaultOpenFirst && index === 0}
                className="group card-premium overflow-hidden border border-slate-200/90"
              >
                <summary className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-semibold text-[16px] sm:text-[17px] text-slate-900 hover:text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="pr-4" lang={item.lang}>
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-180 group-open:bg-brand-navy group-open:text-white">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </summary>

                <div
                  lang={item.lang}
                  className="px-5 sm:px-6 pb-6 pt-1 text-[15px] text-slate-600 leading-relaxed border-t border-slate-100"
                >
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
