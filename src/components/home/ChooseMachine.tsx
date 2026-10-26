import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Truck,
  Users,
  ArrowRight,
} from "lucide-react";

export function ChooseMachine() {
  return (
    <section id="machines" className="pt-20 sm:pt-28 pb-16 sm:pb-24 bg-[#F4F8FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Block: Left title & subtitle, Right 4 feature badges */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 sm:mb-14">
          {/* Left Column */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 mb-2.5">
              <span className="text-[#F5A800] font-black text-xl leading-none">/</span>
              <span className="text-[#0B1E48] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase font-sans">
                OUR FLEET
              </span>
            </div>
            <h2 className="text-[36px] sm:text-[46px] lg:text-[50px] font-extrabold uppercase tracking-tight text-[#0B1E48] font-condensed leading-[1.05]">
              Choose Your Scissor Lift on Rent &amp; Boom Lift Fleet
            </h2>
            <p className="mt-2.5 text-[15px] sm:text-[16px] text-slate-600 font-sans leading-relaxed">
              Citizen Construction Rentals provides dependable scissor lift rental India and boom lift rental India. Select from brand new Straightline aerial work platform rental equipment or trusted used man lift on rent choices and aerial lift on hire delivered directly to your site.
            </p>
          </div>

          {/* Right Column: 4 Header Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-slate-200/90 pt-2 lg:pt-0">
            {/* Badge 1: ON RENT ACROSS INDIA */}
            <div className="flex flex-col items-center justify-start text-center px-2 sm:px-3 lg:px-4">
              <div className="w-10 h-10 flex items-center justify-center mb-2">
                <MapPin className="w-7 h-7 text-[#0B1E48] stroke-[1.8]" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0B1E48] uppercase tracking-wider leading-tight">
                ON RENT<br />ACROSS INDIA
              </span>
            </div>

            {/* Badge 2: BRAND NEW & USED FLEET */}
            <div className="flex flex-col items-center justify-start text-center px-2 sm:px-3 lg:px-4">
              <div className="w-10 h-10 flex items-center justify-center mb-2">
                <Layers className="w-7 h-7 text-[#0B1E48] stroke-[1.8]" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0B1E48] uppercase tracking-wider leading-tight">
                BRAND NEW &amp;<br />USED FLEET
              </span>
            </div>

            {/* Badge 3: CE CERTIFIED MACHINES */}
            <div className="flex flex-col items-center justify-start text-center px-2 sm:px-3 lg:px-4">
              <div className="w-10 h-10 flex items-center justify-center mb-2">
                <ShieldCheck className="w-7 h-7 text-[#0B1E48] stroke-[1.8]" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0B1E48] uppercase tracking-wider leading-tight">
                CE CERTIFIED<br />MACHINES
              </span>
            </div>

            {/* Badge 4: SERVING SINCE 2000 */}
            <div className="flex flex-col items-center justify-start text-center px-2 sm:px-3 lg:px-4">
              <div className="w-10 h-10 flex items-center justify-center mb-2">
                <Calendar className="w-7 h-7 text-[#0B1E48] stroke-[1.8]" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0B1E48] uppercase tracking-wider leading-tight">
                SERVING<br />SINCE 2000
              </span>
            </div>
          </div>
        </div>

        {/* Two Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Brand New Fleet on Rent */}
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/90 shadow-[0_12px_40px_rgba(11,30,72,0.06)] relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 lg:p-10 min-h-[480px]">
            {/* Top / Left Content */}
            <div className="relative z-10 max-w-full sm:max-w-[62%] lg:max-w-[58%]">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5A800] text-[#0A162D] font-bold text-xs uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 fill-[#0A162D] text-[#0A162D]" />
                <span>BRAND NEW FLEET</span>
              </div>

              {/* Title */}
              <h3 className="mt-3.5 font-condensed font-extrabold text-[32px] sm:text-[36px] lg:text-[40px] uppercase text-[#0B1E48] leading-[1.05]">
                BRAND NEW<br />LIFTS ON RENT
              </h3>

              {/* Amber Accent Bar */}
              <div className="w-12 h-1.5 bg-[#F5A800] rounded-full mt-3 mb-3.5" />

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-slate-600 font-sans leading-relaxed">
                Brand new Straightline scissor lifts and boom lifts on rent, CE certified and delivered to your site.
              </p>

              {/* Features List */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EBF3FF] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0B1E48] stroke-[2.2]" />
                  </div>
                  <span className="text-[13.5px] font-medium text-slate-800">
                    CE Certified Fleet
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EBF3FF] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B1E48] stroke-[2.2]" />
                  </div>
                  <span className="text-[13.5px] font-medium text-slate-800">
                    Scissor &amp; Boom Lifts Available
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EBF3FF] flex items-center justify-center shrink-0">
                    <Truck className="w-3.5 h-3.5 text-[#0B1E48] stroke-[2.2]" />
                  </div>
                  <span className="text-[13.5px] font-medium text-slate-800">
                    Delivered to Your Site
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EBF3FF] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B1E48] stroke-[2.2]" />
                  </div>
                  <span className="text-[13.5px] font-medium text-slate-800">
                    Quick Rental Quote on WhatsApp
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="/brand-new"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0B1E48] hover:bg-[#071536] text-white font-condensed font-bold text-[15px] sm:text-[16px] uppercase tracking-wider transition-all shadow-sm hover:shadow-md group"
                >
                  <span>RENT BRAND NEW LIFTS</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Machine Cutout - HD Straightline GTJZ12 */}
            <div className="mt-6 sm:mt-0 sm:absolute sm:right-2 sm:bottom-6 sm:top-10 sm:w-[42%] lg:w-[44%] max-w-[270px] flex items-end justify-center pointer-events-none">
              <div className="relative w-full h-[280px] sm:h-full">
                <Image
                  src="/images/machines/scissor/straightline-gtjz12-hd.png"
                  alt="Straightline GTJZ12 Scissor Lift on rent"
                  fill
                  sizes="(max-width: 640px) 260px, 300px"
                  className="object-contain object-bottom"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Bottom Right Corner Straightline Badge */}
            <div className="absolute bottom-0 right-0 h-12 sm:h-14 w-40 sm:w-48 pointer-events-none z-10">
              <Image
                src="/images/machines/scissor/straightline-corner-badge.png"
                alt="Straightline Aerial Work Platforms"
                fill
                className="object-contain object-right-bottom"
                unoptimized
              />
            </div>
          </div>

          {/* Card 2: JLG & Genie Used Fleet */}
          <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/90 shadow-[0_12px_40px_rgba(11,30,72,0.06)] relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 lg:p-10 min-h-[480px]">
            {/* Top / Left Content */}
            <div className="relative z-10 max-w-full sm:max-w-[62%] lg:max-w-[58%]">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF2FF] border border-[#CDE0FD] text-[#0B1E48] font-bold text-xs uppercase tracking-wide">
                <Settings className="w-3.5 h-3.5 text-[#0B1E48]" />
                <span>USED FLEET</span>
              </div>

              {/* Title */}
              <h3 className="mt-3.5 font-condensed font-extrabold text-[32px] sm:text-[36px] lg:text-[40px] uppercase text-[#0B1E48] leading-[1.05]">
                JLG &amp; GENIE<br />LIFTS ON RENT
              </h3>

              {/* Amber Accent Bar */}
              <div className="w-12 h-1.5 bg-[#F5A800] rounded-full mt-3 mb-3.5" />

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] text-slate-600 font-sans leading-relaxed">
                Trusted JLG and Genie scissor lifts and boom lifts on rent. A cost-effective choice for your project.
              </p>

              {/* Features List */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EBF3FF] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0B1E48] stroke-[2.2]" />
                  </div>
                  <span className="text-[13.5px] font-medium text-slate-800">
                    JLG &amp; Genie Machines
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EBF3FF] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B1E48] stroke-[2.2]" />
                  </div>
                  <span className="text-[13.5px] font-medium text-slate-800">
                    Scissor &amp; Boom Lifts Available
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EBF3FF] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B1E48] stroke-[2.2]" />
                  </div>
                  <span className="text-[13.5px] font-medium text-slate-800">
                    Cost-Effective Rentals
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EBF3FF] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B1E48] stroke-[2.2]" />
                  </div>
                  <span className="text-[13.5px] font-medium text-slate-800">
                    Quick Rental Quote on WhatsApp
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="/used"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border-2 border-[#0B1E48] hover:bg-slate-50 text-[#0B1E48] font-condensed font-bold text-[15px] sm:text-[16px] uppercase tracking-wider transition-all group"
                >
                  <span>RENT USED LIFTS</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Machine Cutout - HD JLG 2646ES */}
            <div className="mt-6 sm:mt-0 sm:absolute sm:right-2 sm:bottom-6 sm:top-10 sm:w-[42%] lg:w-[44%] max-w-[270px] flex items-end justify-center pointer-events-none">
              <div className="relative w-full h-[280px] sm:h-full">
                <Image
                  src="/images/machines/scissor/jlg-2646es-hd.png"
                  alt="JLG 2646ES Scissor Lift on rent"
                  fill
                  sizes="(max-width: 640px) 260px, 300px"
                  className="object-contain object-bottom"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Bottom Right JLG | Genie Badge */}
            <div className="absolute bottom-4 sm:bottom-5 right-5 sm:right-7 h-7 sm:h-8 w-28 sm:w-32 pointer-events-none z-10">
              <Image
                src="/images/machines/scissor/jlg-genie-badge.png"
                alt="JLG | Genie"
                fill
                className="object-contain object-right-bottom"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-8 sm:mt-10 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_25px_rgba(11,30,72,0.04)] px-4 sm:px-6 py-4 sm:py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-slate-200/90">
            {/* Item 1 */}
            <div className="flex items-center gap-3.5 lg:justify-center px-2 sm:px-4">
              <ShieldCheck className="w-7 h-7 text-[#0B1E48] stroke-[1.8] shrink-0" />
              <div className="text-[13px] leading-snug">
                <p className="font-semibold text-slate-800">Trusted by Leading</p>
                <p className="text-slate-500">Industries Across India</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3.5 lg:justify-center px-2 sm:px-4">
              <Truck className="w-7 h-7 text-[#0B1E48] stroke-[1.8] shrink-0" />
              <div className="text-[13px] leading-snug">
                <p className="font-semibold text-slate-800">On-Time Delivery</p>
                <p className="text-slate-500">&amp; Support</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-3.5 lg:justify-center px-2 sm:px-4">
              <Users className="w-7 h-7 text-[#0B1E48] stroke-[1.8] shrink-0" />
              <div className="text-[13px] leading-snug">
                <p className="font-semibold text-slate-800">Experienced &amp;</p>
                <p className="text-slate-500">Trained Team</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-3.5 lg:justify-center px-2 sm:px-4">
              <MapPin className="w-7 h-7 text-[#0B1E48] stroke-[1.8] shrink-0" />
              <div className="text-[13px] leading-snug">
                <p className="font-semibold text-slate-800">Pan-India Service</p>
                <p className="text-slate-500">Network</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
