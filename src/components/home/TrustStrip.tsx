import React from "react";
import { Sparkles, ShieldCheck, Zap, Clock } from "lucide-react";

export function TrustStrip() {
  const trustItems = [
    {
      icon: Sparkles,
      title: "Brand New",
      subtitle: "Available on rent",
    },
    {
      icon: ShieldCheck,
      title: "CE Certified",
      subtitle: "Safety assured",
    },
    {
      icon: Zap,
      title: "Electric",
      subtitle: "Self-propelled drive on scissor lifts",
    },
    {
      icon: Clock,
      title: "Since 2000",
      subtitle: "Trusted rental partner",
    },
  ];

  return (
    <section className="bg-brand-navy border-y border-brand-navy-light py-6 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 sm:gap-4 justify-start sm:justify-center p-2"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 text-brand-amber">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-heading font-bold text-lg uppercase tracking-wider text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-blue-100 font-sans">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
