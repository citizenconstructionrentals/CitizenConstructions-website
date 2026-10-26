import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScissorLiftModel } from "@/data/scissor-lifts";
import { BoomLiftModel } from "@/data/boom-lifts";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ShieldCheck, FileText, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScissorCardProps {
  type: "scissor";
  model: ScissorLiftModel;
  featured?: boolean;
  imageAlt?: string;
}

interface BoomCardProps {
  type: "boom";
  model: BoomLiftModel;
  featured?: boolean;
  imageAlt?: string;
}

type MachineCardProps = ScissorCardProps | BoomCardProps;

export function MachineCard(props: MachineCardProps) {
  if (props.type === "scissor") {
    const { model } = props;
    const isTallStudio = model.images[0]?.includes("tall-studio");
    const primaryImg = model.images[0] || "/images/machines/scissor/scissor-compact-warehouse.webp";
    const waMessage = `Hello Citizen Construction Rentals, I'm interested in renting the Brand New Straightline ${model.modelCode} Scissor Lift. Please share rental rates and availability. My location: `;

    return (
      <div className="card-premium flex flex-col justify-between group overflow-hidden">
        <div>
          {/* Card Header & Badges */}
          <div className="p-5 pb-0 flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available on Rent</span>
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200/80 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-slate-700" />
                <span>CE Certified</span>
              </span>
            </div>
            <span className="text-[11px] font-bold text-brand-navy bg-brand-navy/10 px-2 py-0.5 rounded-full">
              {model.modelCode}
            </span>
          </div>

          {/* Image Slot */}
          <Link
            href={`/brand-new/scissor-lifts/${model.slug}`}
            className="relative h-56 sm:h-60 mx-4 mt-4 rounded-xl overflow-hidden bg-brand-offwhite flex items-center justify-center p-3 group-hover:scale-[1.02] transition-transform duration-300"
          >
            <Image
              src={primaryImg}
              alt={props.imageAlt || `${model.name} brand new scissor lift on rent`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "object-contain p-2 transition-transform duration-300",
                isTallStudio && "mix-blend-multiply"
              )}
            />
          </Link>

          {/* Body Content */}
          <div className="p-5">
            <div className="flex items-center gap-1 text-[12px] font-semibold text-brand-navy mb-1.5">
              <Zap className="w-3.5 h-3.5 fill-current text-brand-amber" />
              <span>Electric Self-Propelled</span>
            </div>

            <Link href={`/brand-new/scissor-lifts/${model.slug}`}>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-navy transition-colors">
                {model.name}
              </h3>
            </Link>

            {/* Key figures strip */}
            <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-brand-offwhite rounded-xl text-center border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-500 font-medium block">
                  Working H
                </span>
                <span className="font-bold text-[15px] text-brand-navy">
                  {model.workingHeight}
                </span>
              </div>
              <div className="border-x border-slate-200">
                <span className="text-[10px] text-slate-500 font-medium block">
                  Platform H
                </span>
                <span className="font-bold text-[15px] text-slate-900">
                  {model.platformHeight}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-medium block">
                  SWL Capacity
                </span>
                <span className="font-bold text-[15px] text-slate-900">
                  {model.safeWorkingLoad}
                </span>
              </div>
            </div>

            {/* Rental rate on request */}
            <div className="mt-3 text-center text-xs font-semibold text-brand-navy bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-100">
              Rental rate on request
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="p-5 pt-0 border-t border-slate-100 space-y-2 mt-2">
          <WhatsAppCTA
            variant="whatsapp"
            size="sm"
            className="w-full justify-center text-xs sm:text-sm"
            message={waMessage}
          >
            Get Rental Quote
          </WhatsAppCTA>

          <div className="flex items-center justify-between gap-2 pt-1">
            <Link
              href={`/brand-new/scissor-lifts/${model.slug}`}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-full border border-slate-200 hover:border-brand-navy hover:text-brand-navy text-slate-700 bg-white transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            {model.specSheetUrl ? (
              <a
                href={model.specSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 py-1 text-xs font-medium text-slate-500 hover:text-brand-navy underline underline-offset-2 transition-colors"
              >
                <FileText className="w-3 h-3" />
                <span>Spec Sheet</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  // Boom Lift Card
  const { model } = props;
  const waMessage = `Hello Citizen Construction Rentals, I'm interested in renting the Brand New ${model.name}. Please share rental rates and availability. My location: `;

  return (
    <div className="card-premium flex flex-col justify-between group overflow-hidden">
      <div>
        {/* Card Header & Badges */}
        <div className="p-5 pb-0 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available on Rent</span>
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200/80 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-slate-700" />
              <span>CE Certified</span>
            </span>
          </div>
          <span className="text-[11px] font-bold text-brand-navy bg-brand-navy/10 px-2 py-0.5 rounded-full">
            {model.modelCode}
          </span>
        </div>

        {/* Image Slot */}
        <Link
          href={`/brand-new/boom-lifts/${model.slug}`}
          className="relative h-56 sm:h-60 mx-4 mt-4 rounded-xl overflow-hidden bg-brand-offwhite flex items-center justify-center p-3 group-hover:scale-[1.02] transition-transform duration-300"
        >
          <Image
            src={model.images[0]}
            alt={props.imageAlt || `${model.name} brand new boom lift on rent`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2"
          />
        </Link>

        {/* Body Content */}
        <div className="p-5">
          <span className="text-[12px] font-semibold text-brand-navy block mb-1.5">
            {model.type}
          </span>

          <Link href={`/brand-new/boom-lifts/${model.slug}`}>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-navy transition-colors">
              {model.name}
            </h3>
          </Link>

          <p className="text-[13px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {model.summary}
          </p>

          {/* Clean Specs on Request Strip */}
          <div className="mt-4 p-3 rounded-xl text-xs flex items-center justify-between border bg-brand-offwhite border-slate-100 text-slate-600">
            <span>Full technical reach specs:</span>
            <span className="font-bold text-brand-navy">
              On Request
            </span>
          </div>

          {/* Rental rate on request */}
          <div className="mt-3 text-center text-xs font-semibold text-brand-navy bg-slate-50 py-1.5 px-3 rounded-lg border border-slate-100">
            Rental rate on request
          </div>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="p-5 pt-0 border-t border-slate-100 space-y-2 mt-2">
        <WhatsAppCTA
          variant="whatsapp"
          size="sm"
          className="w-full justify-center text-xs sm:text-sm"
          message={waMessage}
        >
          Get Rental Quote
        </WhatsAppCTA>

        <div className="flex items-center justify-between gap-2 pt-1">
          <Link
            href={`/brand-new/boom-lifts/${model.slug}`}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-full border border-slate-200 hover:border-brand-navy hover:text-brand-navy text-slate-700 bg-white transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          {model.specSheetUrl ? (
            <a
              href={model.specSheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 py-1 text-xs font-medium text-slate-500 hover:text-brand-navy underline underline-offset-2 transition-colors"
            >
              <FileText className="w-3 h-3" />
              <span>Spec Sheet</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
