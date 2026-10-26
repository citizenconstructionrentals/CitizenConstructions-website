import React from "react";
import fs from "fs";
import path from "path";
import Image from "next/image";
import { ShieldCheck, Award } from "lucide-react";

export function CertifiedBacked() {
  const certPath = path.join(process.cwd(), "public", "images", "certificates", "ce-certificate.jpg");
  const certExists = fs.existsSync(certPath);

  if (!certExists) {
    return null;
  }

  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-premium p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-brand-offwhite">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <ShieldCheck className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Certified & Backed</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Official CE Safety Certification
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                All brand new Straightline lifts meet European CE safety and conformity standards with strict quality controls.
              </p>
            </div>
          </div>

          <div className="relative w-36 h-48 rounded-lg overflow-hidden border border-slate-200 shadow-sm shrink-0">
            <Image
              src="/images/certificates/ce-certificate.jpg"
              alt="Official CE Safety Certificate"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
