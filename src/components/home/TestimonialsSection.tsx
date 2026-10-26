import React from "react";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  // Driven by src/data/testimonials.ts; hidden while empty to never show fake reviews
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24 bg-brand-offwhite border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="eyebrow-label justify-center mb-2.5">
            <span className="slash-accent" />
            <span>Client Feedback</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-bold tracking-tight text-slate-900">
            What Contractors Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="card-premium p-6 sm:p-8 flex flex-col justify-between">
              <p className="text-[15px] text-slate-600 italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="font-bold text-slate-900 text-[15px]">{t.author}</div>
                <div className="text-xs text-slate-500 mt-0.5">{t.company} {t.location ? `· ${t.location}` : ""}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
