import React from "react";
import { MessageSquare, FileText, Truck, ShieldCheck } from "lucide-react";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: MessageSquare,
      title: "Tell Us Your Requirements",
      description: "Tell us your working height, site location and rental duration.",
    },
    {
      num: "02",
      icon: FileText,
      title: "Get Rental Quote",
      description: "Get your rental quote on WhatsApp with transparent rates and availability.",
    },
    // CONFIRM WITH OWNER
    {
      num: "03",
      icon: Truck,
      title: "Confirm & Mobilize",
      description: "Confirm and we deliver the lift to your site ready for work.",
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "Work Safely at Height",
      description: "Complete your work at height safely with reliable equipment support.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-brand-offwhite border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="eyebrow-label justify-center mb-2.5">
            <span className="slash-accent" />
            <span>Simple Rental Process</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-bold tracking-tight text-slate-900">
            How Renting Works
          </h2>
          <p className="mt-2 text-[16px] sm:text-[17px] text-slate-600">
            Rent an aerial lift in 4 straightforward steps with prompt delivery to your project.
          </p>
        </div>

        {/* 4 Steps Row with Connecting Dashed Line */}
        <div className="relative">
          {/* Connecting Dashed Line on Desktop */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 border-t-2 border-dashed border-slate-300 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="card-premium p-6 sm:p-7 flex flex-col justify-between bg-white relative"
                >
                  {/* Top: Amber Circle Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-amber text-brand-ink font-extrabold text-base flex items-center justify-center shadow-sm shrink-0">
                      {step.num}
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-brand-navy flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-navy" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-14 text-center">
          <WhatsAppCTA
            variant="whatsapp"
            size="lg"
            message="Hello Citizen Construction Rentals, I am ready to rent an aerial lift. Please share rates."
          >
            Get Rental Quote on WhatsApp
          </WhatsAppCTA>
        </div>
      </div>
    </section>
  );
}
