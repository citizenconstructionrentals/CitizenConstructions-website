import React from "react";
import Link from "next/link";
import { scissorLiftsData } from "@/data/scissor-lifts";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ArrowRight, Check } from "lucide-react";

export function ComparisonTable() {
  const rows = [
    { label: "Working Height", getter: (m: (typeof scissorLiftsData)[0]) => m.workingHeight, highlight: true },
    { label: "Platform Height", getter: (m: (typeof scissorLiftsData)[0]) => m.platformHeight },
    { label: "Safe Working Load (SWL)", getter: (m: (typeof scissorLiftsData)[0]) => m.safeWorkingLoad, highlight: true },
    { label: "Platform Size (L × W × H)", getter: (m: (typeof scissorLiftsData)[0]) => m.dimensions.platformSize },
    { label: "Platform Extension Length", getter: (m: (typeof scissorLiftsData)[0]) => m.dimensions.tableExtensionSize },
    { label: "Extended Platform SWL", getter: (m: (typeof scissorLiftsData)[0]) => m.specs.extendedPlatformSwl },
    { label: "Wheelbase", getter: (m: (typeof scissorLiftsData)[0]) => m.dimensions.wheelbase },
    { label: "Turning Radius (In / Out)", getter: (m: (typeof scissorLiftsData)[0]) => m.dimensions.turningRadiusInOut },
    { label: "Drive Speed (Stowed)", getter: (m: (typeof scissorLiftsData)[0]) => m.specs.driveSpeedStowed },
    { label: "Drive Speed (Raised)", getter: (m: (typeof scissorLiftsData)[0]) => m.specs.maxDriveSpeedRaised },
    { label: "Lifting Speed", getter: (m: (typeof scissorLiftsData)[0]) => m.specs.liftingSpeed },
    { label: "Gradeability", getter: (m: (typeof scissorLiftsData)[0]) => m.specs.gradeability },
    { label: "Electric Motor Power", getter: (m: (typeof scissorLiftsData)[0]) => m.specs.motor },
    { label: "Ground Clearance (Raised/Stowed)", getter: (m: (typeof scissorLiftsData)[0]) => m.dimensions.minGroundClearance },
    { label: "Height (Folded / Unfolded Rails)", getter: (m: (typeof scissorLiftsData)[0]) => m.dimensions.overallHeightFoldedUnfolded },
    { label: "Overall Dimensions (L × W)", getter: (m: (typeof scissorLiftsData)[0]) => `${m.dimensions.overallLength} × ${m.dimensions.overallWidth}` },
    { label: "Total Machine Weight", getter: (m: (typeof scissorLiftsData)[0]) => m.weight },
    { label: "Solid Tyres", getter: (m: (typeof scissorLiftsData)[0]) => m.specs.solidTyres },
    { label: "Battery & Charger", getter: (m: (typeof scissorLiftsData)[0]) => `${m.specs.battery} (${m.specs.charger})` },
    { label: "CE Certified", getter: (_m: (typeof scissorLiftsData)[0]) => "Yes (CE Certified)", isBadge: true },
    { label: "Rental Availability", getter: (_m: (typeof scissorLiftsData)[0]) => "Available on Rent", isBadge: true },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200/90 shadow-card overflow-hidden">
      {/* Table Header Banner */}
      <div className="p-5 sm:p-6 bg-brand-ink text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-brand-amber uppercase tracking-wider block">
            Technical Specification Matrix
          </span>
          <h3 className="font-heading font-bold text-xl sm:text-2xl uppercase tracking-wide text-white">
            Compare All 5 Straightline Scissor Lift Models
          </h3>
        </div>
        <div className="text-xs text-gray-400">
          Scroll horizontally on mobile devices ➔
        </div>
      </div>

      {/* Responsive Horizontal Scroll Container */}
      <div className="relative overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-brand-offwhite border-b border-gray-200">
              {/* Sticky first column */}
              <th
                scope="col"
                className="sticky left-0 z-20 bg-brand-offwhite p-4 font-heading font-bold text-sm uppercase tracking-wider text-brand-ink border-r border-gray-200 min-w-[200px]"
              >
                Model Specification
              </th>

              {scissorLiftsData.map((model) => (
                <th
                  key={model.slug}
                  scope="col"
                  className="p-4 text-center min-w-[130px] border-r border-gray-100 last:border-r-0"
                >
                  <span className="font-heading font-bold text-lg text-brand-navy block uppercase">
                    {model.modelCode}
                  </span>
                  <span className="text-[11px] text-gray-500 block font-sans">
                    {model.workingHeight} Work Height
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {rows.map((row, idx) => (
              <tr
                key={row.label}
                className={idx % 2 === 0 ? "bg-white" : "bg-brand-offwhite/40"}
              >
                {/* Sticky First Column */}
                <th
                  scope="row"
                  className={`sticky left-0 z-10 p-3.5 sm:p-4 text-xs sm:text-sm font-semibold border-r border-gray-200 ${
                    idx % 2 === 0 ? "bg-white" : "bg-brand-offwhite"
                  } ${row.highlight ? "text-brand-navy font-bold" : "text-gray-700"}`}
                >
                  {row.label}
                </th>

                {/* Model values */}
                {scissorLiftsData.map((model) => (
                  <td
                    key={model.slug}
                    className={`p-3.5 sm:p-4 text-center text-xs sm:text-sm border-r border-gray-100 last:border-r-0 ${
                      row.highlight
                        ? "font-bold text-brand-navy font-heading text-base"
                        : "text-gray-600"
                    }`}
                  >
                    {row.isBadge ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{row.getter(model)}</span>
                      </span>
                    ) : (
                      row.getter(model)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          {/* Action Footer row */}
          <tfoot>
            <tr className="bg-brand-offwhite border-t-2 border-gray-200">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-brand-offwhite p-4 font-heading font-bold text-xs uppercase tracking-wider text-brand-ink border-r border-gray-200"
              >
                Instant Quotation
              </th>

              {scissorLiftsData.map((model) => (
                <td key={model.slug} className="p-3 text-center border-r border-gray-100 last:border-r-0">
                  <WhatsAppCTA
                    variant="whatsapp"
                    size="sm"
                    showIcon={false}
                    className="w-full text-xs py-2 px-2"
                    message={`Hello Citizen Construction Rentals, I'm interested in renting the Straightline ${model.modelCode} Scissor Lift. Please share rental rates and availability.`}
                  >
                    Rental Quote
                  </WhatsAppCTA>
                  <Link
                    href={`/brand-new/scissor-lifts/${model.slug}`}
                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-navy hover:underline"
                  >
                    <span>View</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
