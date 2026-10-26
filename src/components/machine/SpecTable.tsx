import React from "react";
import { ScissorLiftModel } from "@/data/scissor-lifts";

interface SpecTableProps {
  model: ScissorLiftModel;
}

export function SpecTable({ model }: SpecTableProps) {
  const keySpecs = [
    { label: "Rated Safe Working Load (SWL)", value: model.safeWorkingLoad },
    { label: "Working Height", value: model.workingHeight },
    { label: "Platform Height (Max)", value: model.platformHeight },
    { label: "Platform Extension SWL", value: model.specs.extendedPlatformSwl },
    { label: "Drive Speed (Stowed)", value: model.specs.driveSpeedStowed },
    { label: "Drive Speed (Raised)", value: model.specs.maxDriveSpeedRaised },
    { label: "Lifting Speed", value: model.specs.liftingSpeed },
    { label: "Gradeability", value: model.specs.gradeability },
    { label: "Electric Drive Motor", value: model.specs.motor },
    { label: "Total Weight", value: model.weight },
    { label: "Max Allowable Working Angle", value: model.specs.maxAllowableWorkingAngle },
    { label: "Battery Pack", value: model.specs.battery },
    { label: "Battery Charger", value: model.specs.charger },
    { label: "Tyre Specifications", value: `${model.specs.solidTyres} (Solid non-marking)` },
  ];

  const dimensions = [
    { label: "Platform Size (L × W × H)", value: model.dimensions.platformSize },
    { label: "Table Extension Size", value: model.dimensions.tableExtensionSize },
    { label: "Wheelbase", value: model.dimensions.wheelbase },
    { label: "Turning Radius (Inside / Outside)", value: model.dimensions.turningRadiusInOut },
    { label: "Overall Length (with ladder)", value: model.dimensions.overallLength },
    { label: "Overall Width", value: model.dimensions.overallWidth },
    { label: "Overall Height (Rails Folded / Unfolded)", value: model.dimensions.overallHeightFoldedUnfolded },
    { label: "Min Ground Clearance (Stowed / Raised)", value: model.dimensions.minGroundClearance },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Key Specifications Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-soft overflow-hidden">
        <div className="p-4 sm:p-5 bg-brand-navy text-white">
          <h3 className="font-heading font-bold text-lg sm:text-xl uppercase tracking-wider">
            Technical Specifications
          </h3>
          <p className="text-xs text-blue-100">Operational ratings &amp; mechanical parameters</p>
        </div>
        <div className="p-4 sm:p-5">
          <dl className="divide-y divide-gray-100 text-sm">
            {keySpecs.map((item, idx) => (
              <div
                key={item.label}
                className={`py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 ${
                  idx % 2 === 0 ? "bg-brand-offwhite/40 px-2 rounded" : "px-2"
                }`}
              >
                <dt className="text-xs text-gray-500 font-medium">{item.label}</dt>
                <dd className="font-semibold text-brand-ink text-sm sm:text-right">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Dimensions Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-soft overflow-hidden">
        <div className="p-4 sm:p-5 bg-brand-ink text-white">
          <h3 className="font-heading font-bold text-lg sm:text-xl uppercase tracking-wider">
            Machine Dimensions & Clearances
          </h3>
          <p className="text-xs text-gray-300">Physical envelope, reach platform & clearance</p>
        </div>
        <div className="p-4 sm:p-5">
          <dl className="divide-y divide-gray-100 text-sm">
            {dimensions.map((item, idx) => (
              <div
                key={item.label}
                className={`py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 ${
                  idx % 2 === 0 ? "bg-brand-offwhite/40 px-2 rounded" : "px-2"
                }`}
              >
                <dt className="text-xs text-gray-500 font-medium">{item.label}</dt>
                <dd className="font-semibold text-brand-ink text-sm sm:text-right">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
