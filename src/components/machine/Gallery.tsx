"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  title: string;
  isDarkTheme?: boolean;
}

export function Gallery({ images, title, isDarkTheme = false }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = images[activeIndex] || images[0] || "/images/machines/scissor/scissor-compact-warehouse.jpg";
  const isTallStudio = currentImage.includes("tall-studio");

  return (
    <div className="space-y-3">
      {/* Main Image Frame */}
      <div
        className={cn(
          "relative h-72 sm:h-96 lg:h-[460px] rounded-2xl overflow-hidden border p-4 flex items-center justify-center transition-colors",
          isDarkTheme
            ? "bg-brand-ink border-gray-800"
            : "bg-brand-offwhite border-gray-200/80 shadow-soft"
        )}
      >
        <Image
          src={currentImage}
          alt={`${title} - View ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={cn(
            "object-contain p-4 transition-all duration-300",
            isTallStudio && !isDarkTheme && "mix-blend-multiply"
          )}
        />

        {/* Counter badge if multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-brand-ink/80 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails row - gracefully rendered only when > 1 image */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all p-1 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy",
                activeIndex === idx
                  ? "border-brand-navy ring-2 ring-brand-navy/20 scale-105"
                  : "border-gray-200 opacity-70 hover:opacity-100"
              )}
              aria-label={`Show image ${idx + 1} of ${title}`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className={cn(
                  "object-contain p-1",
                  img.includes("tall-studio") && "mix-blend-multiply"
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
