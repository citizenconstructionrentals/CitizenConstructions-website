import React from "react";
import {
  Calendar,
  MapPin,
  Layers,
  ShieldCheck,
  Truck,
  MessageCircle,
} from "lucide-react";

export function WhyCitizen() {
  const verifiedClaims = [
    {
      icon: Calendar,
      title: "Serving Since 2000",
      description: "Over two decades of dependable aerial work platform rental support across India.",
    },
    {
      icon: MapPin,
      title: "Rent Across All India",
      description: "Dispatch and on-site delivery for warehouses, commercial hubs, EPC, and industrial plants across India.",
    },
    {
      icon: Layers,
      title: "Brand New & Used Fleet",
      description: "Choose between brand new Straightline lifts or reliable used JLG and Genie lifts to suit your project.",
    },
    {
      icon: ShieldCheck,
      title: "CE Certified Machines",
      description: "Stringent European CE safety standards across our brand new fleet for safe working at height.",
    },
    // CONFIRM WITH OWNER
    {
      icon: Truck,
      title: "Delivered to Your Site",
      description: "Prompt transport and safe handover directly to your project location anywhere in India.",
    },
    {
      icon: MessageCircle,
      title: "Quick Rental Quote on WhatsApp",
      description: "Transparent rental rates and immediate availability shared in minutes by our responsive rental desk.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="eyebrow-label justify-center mb-2.5">
            <span className="slash-accent" />
            <span>Proven Reliability</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-bold tracking-tight text-slate-900">
            Why Rent From Citizen
          </h2>
          <p className="mt-2 text-[16px] sm:text-[17px] text-slate-600">
            No capital investment. Rent the right lift for the duration of your project.
          </p>
        </div>

        {/* 3×2 Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {verifiedClaims.map((claim) => {
            const Icon = claim.icon;
            return (
              <div
                key={claim.title}
                className="card-premium p-6 sm:p-7 flex flex-col justify-start"
              >
                {/* Navy icon in amber-tinted circle */}
                <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center text-brand-navy mb-5 shrink-0">
                  <Icon className="w-5 h-5 text-brand-navy" />
                </div>

                <h3 className="text-[19px] font-bold text-slate-900 mb-2 leading-snug">
                  {claim.title}
                </h3>
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  {claim.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
