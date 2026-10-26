"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { useRentalQuote } from "@/components/ui/RentalQuoteContext";
import { MegaMenuPanel } from "./MegaMenuPanel";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.07 16.31C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.32 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.37C16.31 14.25 15.09 13.65 14.86 13.56C14.64 13.48 14.47 13.44 14.31 13.69C14.14 13.94 13.66 14.51 13.51 14.68C13.37 14.85 13.22 14.87 12.97 14.75C12.72 14.62 11.92 14.36 10.97 13.52C10.23 12.86 9.73 12.04 9.59 11.79C9.44 11.54 9.57 11.41 9.7 11.28C9.81 11.17 9.94 11 10.07 10.85C10.2 10.7 10.24 10.59 10.32 10.43C10.41 10.26 10.37 10.12 10.3 10C10.24 9.87 9.75 8.67 9.54 8.18C9.34 7.69 9.14 7.76 8.99 7.75C8.84 7.74 8.68 7.74 8.51 7.74C8.35 7.74 8.08 7.8 7.85 8.05C7.63 8.3 7 8.89 7 10.09C7 11.29 7.87 12.45 8 12.61C8.12 12.78 9.72 15.25 12.18 16.31C12.76 16.56 13.22 16.71 13.57 16.82C14.16 17.01 14.69 16.98 15.12 16.92C15.6 16.85 16.59 16.32 16.8 15.74C17 15.17 17 14.68 16.94 14.58C16.87 14.48 16.72 14.42 16.56 14.37Z" />
    </svg>
  );
}

export function Header() {
  const { openQuoteModal } = useRentalQuote();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandNewAccordionOpen, setBrandNewAccordionOpen] = useState(false);
  const [usedAccordionOpen, setUsedAccordionOpen] = useState(false);
  const pathname = usePathname();

  // Mega-menu state and refs
  const [activeMenu, setActiveMenu] = useState<"brand-new" | "used" | null>(null);
  const [menuPos, setMenuPos] = useState({ left: 16, top: 100, notchLeft: 330 });

  const headerRef = useRef<HTMLElement | null>(null);
  const brandNewTriggerRef = useRef<HTMLDivElement | null>(null);
  const usedTriggerRef = useRef<HTMLDivElement | null>(null);
  const brandNewLinkRef = useRef<HTMLAnchorElement | null>(null);
  const usedLinkRef = useRef<HTMLAnchorElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLAnchorElement | null>(null);

  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasPreloaded = useRef<{ "brand-new": boolean; "used": boolean }>({
    "brand-new": false,
    "used": false,
  });

  // Body scroll lock and escape key handler for mobile drawer
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  // Compute position for the mega menu panel
  const updateMenuPosition = (menu: "brand-new" | "used") => {
    const trigger = menu === "brand-new" ? brandNewTriggerRef.current : usedTriggerRef.current;
    if (!trigger || !headerRef.current) return;

    const headerRect = headerRef.current.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const triggerCenter = triggerRect.left + triggerRect.width / 2;

    const s = Math.min(1.35, Math.max(0.78, window.innerWidth / 1672));
    const panelWidth = panelRef.current ? panelRef.current.getBoundingClientRect().width : 660 * s;

    // Centred on its trigger but clamped to stay at least 16px inside the viewport
    let left = triggerCenter - panelWidth / 2;
    left = Math.max(16, Math.min(left, window.innerWidth - panelWidth - 16));

    // Opens below the header with a strict 10px gap
    const top = headerRect.bottom + 10;

    // Notch points directly at the trigger center
    const notchLeft = triggerCenter - left;

    setMenuPos({ left, top, notchLeft });
  };

  // Keep menu position synced on resize or scroll
  useEffect(() => {
    if (!activeMenu) return;

    const handleUpdate = () => {
      updateMenuPosition(activeMenu);
    };

    window.addEventListener("resize", handleUpdate);
    window.addEventListener("scroll", handleUpdate, { passive: true });
    return () => {
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate);
    };
  }, [activeMenu]);

  // Preload images on first hover or focus
  const preloadImages = (menu: "brand-new" | "used") => {
    if (hasPreloaded.current[menu]) return;
    hasPreloaded.current[menu] = true;

    const urls =
      menu === "brand-new"
        ? [
            "/images/machines/scissor/scissor-tall-studio.jpg",
            "/images/machines/boom/sl28t.png",
          ]
        : [
            "/images/used/jlg-scissor.jpg",
            "/images/used/jlg-boom.jpg",
          ];

    urls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  };

  // Hover intent: open after 80ms, switch instantly between triggers
  const handleTriggerMouseEnter = (menu: "brand-new" | "used") => {
    preloadImages(menu);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    // Instant switch between dropdown triggers
    if (activeMenu !== null && activeMenu !== menu) {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }
      setActiveMenu(menu);
      updateMenuPosition(menu);
      return;
    }

    if (activeMenu === menu) return;

    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    openTimerRef.current = setTimeout(() => {
      setActiveMenu(menu);
      updateMenuPosition(menu);
      openTimerRef.current = null;
    }, 80);
  };

  // Hover intent: close 220ms after pointer leaves trigger & panel
  const handleTriggerMouseLeave = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
      closeTimerRef.current = null;
    }, 220);
  };

  const handlePanelMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handlePanelMouseLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
      closeTimerRef.current = null;
    }, 220);
  };

  // Touch device behavior: first tap opens, second tap navigates
  const handleTriggerClick = (
    e: React.MouseEvent,
    menu: "brand-new" | "used"
  ) => {
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);

    if (isTouch && activeMenu !== menu) {
      e.preventDefault();
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      setActiveMenu(menu);
      updateMenuPosition(menu);
    }
  };

  // Keyboard navigation on trigger
  const handleTriggerKeyDown = (
    e: React.KeyboardEvent,
    menu: "brand-new" | "used"
  ) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      preloadImages(menu);
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      setActiveMenu(menu);
      updateMenuPosition(menu);
      setTimeout(() => {
        firstCardRef.current?.focus();
      }, 40);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setActiveMenu(null);
    }
  };

  // Keyboard navigation on panel: Escape closes and returns focus to trigger
  const handlePanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      const currentMenu = activeMenu;
      setActiveMenu(null);
      if (currentMenu === "brand-new") {
        brandNewLinkRef.current?.focus();
      } else if (currentMenu === "used") {
        usedLinkRef.current?.focus();
      }
    }
  };

  const handleOpenQuoteModal = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveMenu(null);
    openQuoteModal();
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 w-full bg-white transition-all duration-200",
          isScrolled
            ? "shadow-[0_2px_14px_rgba(20,40,90,0.06)]"
            : ""
        )}
      >
        <div className="w-full px-[calc(18*var(--m))] md:px-4 min-[1100px]:px-0 min-[1100px]:pl-[calc(56*var(--s))] min-[1100px]:pr-[calc(36*var(--s))]">
          <div className="flex items-center justify-between min-[1100px]:justify-start h-[calc(71*var(--m))] md:h-[72px] min-[1100px]:h-[calc(90*var(--s))]">
            {/* Logo: Compact & crisp */}
            <Link
              href="/"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14285A] rounded-lg shrink-0"
              aria-label="Citizen Construction Rentals Homepage"
            >
              <div className="relative w-[calc(154*var(--m))] h-[calc(49*var(--m))] md:w-[160px] md:h-[50px] min-[1100px]:w-[calc(200*var(--s))] min-[1100px]:h-[calc(64*var(--s))]">
                <Image
                  src="/brand/logo-on-white.png"
                  alt="Citizen Construction Rentals - Since 2000"
                  fill
                  priority
                  fetchPriority="high"
                  decoding="sync"
                  quality={95}
                  sizes="(max-width: 767px) 154px, (max-width: 1100px) 160px, 200px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden min-[1100px]:flex items-center ml-[calc(80*var(--s))]">
              {/* HOME Pill */}
              <Link
                href="/"
                className={cn(
                  "font-condensed font-semibold text-[calc(17*var(--s))] uppercase tracking-[0.02em] transition-colors whitespace-nowrap flex items-center justify-center shrink-0",
                  pathname === "/"
                    ? "bg-[#E8EDF7] text-[#14285A] w-[calc(76*var(--s))] h-[calc(36*var(--s))] rounded-[calc(8*var(--s))]"
                    : "text-[#14285A] hover:text-[#1B3B82] py-2 px-1.5"
                )}
              >
                HOME
              </Link>

              {/* Brand New Dropdown Trigger */}
              <div
                ref={brandNewTriggerRef}
                className="relative flex items-center ml-[calc(36*var(--s))] shrink-0 h-[calc(26*var(--s))]"
                onMouseEnter={() => handleTriggerMouseEnter("brand-new")}
                onMouseLeave={handleTriggerMouseLeave}
              >
                <Link
                  ref={brandNewLinkRef}
                  href="/brand-new"
                  onClick={(e) => handleTriggerClick(e, "brand-new")}
                  onKeyDown={(e) => handleTriggerKeyDown(e, "brand-new")}
                  onFocus={() => preloadImages("brand-new")}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === "brand-new"}
                  aria-controls="mega-menu-brand-new"
                  className={cn(
                    "relative font-condensed font-semibold text-[calc(17*var(--s))] uppercase tracking-[0.02em] inline-flex items-center gap-[calc(5*var(--s))] transition-colors whitespace-nowrap h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2A66] rounded",
                    activeMenu === "brand-new"
                      ? "text-[#0A2A66] font-bold after:absolute after:-bottom-[calc(4*var(--s))] after:inset-x-0 after:h-[2px] after:bg-[#F5A800]"
                      : pathname.startsWith("/brand-new")
                      ? "text-[#0A2A66] font-bold"
                      : "text-[#0A2A66] hover:text-[#1B3B82]"
                  )}
                >
                  <span>BRAND NEW FLEET</span>
                  <ChevronDown
                    className={cn(
                      "w-[calc(16*var(--s))] h-[calc(16*var(--s))] text-[#0A2A66] stroke-[1.75] transition-transform duration-200",
                      activeMenu === "brand-new" ? "rotate-180" : ""
                    )}
                  />
                </Link>
              </div>

              {/* Used Fleet Dropdown Trigger */}
              <div
                ref={usedTriggerRef}
                className="relative flex items-center ml-[calc(36*var(--s))] shrink-0 h-[calc(26*var(--s))]"
                onMouseEnter={() => handleTriggerMouseEnter("used")}
                onMouseLeave={handleTriggerMouseLeave}
              >
                <Link
                  ref={usedLinkRef}
                  href="/used"
                  onClick={(e) => handleTriggerClick(e, "used")}
                  onKeyDown={(e) => handleTriggerKeyDown(e, "used")}
                  onFocus={() => preloadImages("used")}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === "used"}
                  aria-controls="mega-menu-used"
                  className={cn(
                    "relative font-condensed font-semibold text-[calc(17*var(--s))] uppercase tracking-[0.02em] inline-flex items-center gap-[calc(5*var(--s))] transition-colors whitespace-nowrap h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2A66] rounded",
                    activeMenu === "used"
                      ? "text-[#0A2A66] font-bold after:absolute after:-bottom-[calc(4*var(--s))] after:inset-x-0 after:h-[2px] after:bg-[#F5A800]"
                      : pathname.startsWith("/used")
                      ? "text-[#0A2A66] font-bold"
                      : "text-[#0A2A66] hover:text-[#1B3B82]"
                  )}
                >
                  <span>USED FLEET</span>
                  <ChevronDown
                    className={cn(
                      "w-[calc(16*var(--s))] h-[calc(16*var(--s))] text-[#0A2A66] stroke-[1.75] transition-transform duration-200",
                      activeMenu === "used" ? "rotate-180" : ""
                    )}
                  />
                </Link>
              </div>

              {/* ABOUT */}
              <Link
                href="/about"
                className={cn(
                  "font-condensed font-semibold text-[calc(17*var(--s))] uppercase tracking-[0.02em] transition-colors whitespace-nowrap h-[calc(26*var(--s))] flex items-center ml-[calc(36*var(--s))] shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2A66] rounded",
                  pathname === "/about"
                    ? "bg-[#E8EDF7] text-[#14285A] rounded-[calc(8*var(--s))] px-2.5"
                    : "text-[#14285A] hover:text-[#1B3B82]"
                )}
              >
                ABOUT
              </Link>

              {/* CONTACT */}
              <Link
                href="/contact"
                className={cn(
                  "font-condensed font-semibold text-[calc(17*var(--s))] uppercase tracking-[0.02em] transition-colors whitespace-nowrap h-[calc(26*var(--s))] flex items-center ml-[calc(36*var(--s))] shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2A66] rounded",
                  pathname === "/contact"
                    ? "bg-[#E8EDF7] text-[#14285A] rounded-[calc(8*var(--s))] px-2.5"
                    : "text-[#14285A] hover:text-[#1B3B82]"
                )}
              >
                CONTACT
              </Link>
            </nav>

            {/* Desktop Right: Phone + Green Button */}
            <div className="hidden min-[1100px]:flex items-center ml-[calc(60*var(--s))] shrink-0">
              {/* Phone link */}
              <a
                href={`tel:${siteConfig.phones.primary.raw}`}
                className="whitespace-nowrap flex items-center gap-[calc(7*var(--s))] text-[#14285A] hover:text-[#1B3B82] font-condensed font-semibold text-[calc(18.5*var(--s))] tracking-wide transition-colors h-[calc(26*var(--s))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2A66] rounded"
                aria-label={`Call: ${siteConfig.phones.primary.display}`}
              >
                <Phone className="w-[calc(22*var(--s))] h-[calc(22*var(--s))] text-[#14285A] stroke-[1.6] shrink-0" />
                <span>+91 98112 03530</span>
              </a>

              {/* Green GET A QUOTE Button */}
              <button
                type="button"
                onClick={handleOpenQuoteModal}
                className="whitespace-nowrap ml-[calc(30*var(--s))] w-[calc(160*var(--s))] h-[calc(46*var(--s))] rounded-[calc(10*var(--s))] bg-[#16A34A] hover:bg-[#15803D] text-white font-condensed font-bold text-[calc(17*var(--s))] uppercase tracking-wider inline-flex items-center justify-center gap-[calc(8*var(--s))] shadow-sm active:scale-95 transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                aria-label="Get a Quote via WhatsApp"
              >
                <WhatsAppIcon className="w-[calc(22*var(--s))] h-[calc(22*var(--s))] shrink-0" />
                <span>GET A QUOTE</span>
              </button>
            </div>

            {/* Phone Actions: per IMAGE 3 design (< 768px) */}
            <div className="flex md:hidden items-center gap-[calc(6*var(--m))] shrink-0">
              <button
                type="button"
                onClick={handleOpenQuoteModal}
                className="w-[calc(103*var(--m))] h-[calc(39*var(--m))] rounded-[calc(10*var(--m))] bg-gradient-to-b from-[#22B14C] to-[#14883A] shadow-[0_2px_6px_rgba(20,136,58,0.35)] text-white font-condensed font-bold text-[calc(18*var(--m))] uppercase tracking-[0.02em] inline-flex items-center justify-center gap-[calc(6*var(--m))] active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14883A] shrink-0"
                aria-label="Open WhatsApp number selector"
              >
                <WhatsAppIcon className="w-[calc(22*var(--m))] h-[calc(22*var(--m))] shrink-0" />
                <span>WHATSAPP</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-[44px] h-[44px] flex items-center justify-center text-[#0A2A66] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2A66] rounded-lg shrink-0"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#0A2A66]" />
                ) : (
                  <div className="w-[calc(21*var(--m))] flex flex-col justify-between h-[calc(17.9*var(--m))] pointer-events-none">
                    <span className="block w-full h-[calc(2.3*var(--m))] bg-[#0A2A66] rounded-full" />
                    <span className="block w-full h-[calc(2.3*var(--m))] bg-[#0A2A66] rounded-full" />
                    <span className="block w-full h-[calc(2.3*var(--m))] bg-[#0A2A66] rounded-full" />
                  </div>
                )}
              </button>
            </div>

            {/* Tablet Actions (768px - 1099px) */}
            <div className="hidden md:flex min-[1100px]:hidden items-center gap-2">
              <button
                type="button"
                onClick={handleOpenQuoteModal}
                className="h-11 px-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-condensed font-bold text-[15px] uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                aria-label="Open WhatsApp number selector"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-[#14285A] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14285A]"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Background Scrim below the header */}
      {activeMenu !== null && (
        <div
          className="fixed inset-x-0 bottom-0 bg-[#0B1B3A]/10 z-40 transition-opacity duration-160 pointer-events-auto"
          style={{ top: `${menuPos.top - 10}px` }}
          onClick={() => setActiveMenu(null)}
          aria-hidden="true"
        />
      )}

      {/* Desktop Mega-Menu Panel */}
      {activeMenu !== null && (
        <MegaMenuPanel
          type={activeMenu}
          isOpen={true}
          onClose={() => setActiveMenu(null)}
          onOpenModal={handleOpenQuoteModal}
          left={menuPos.left}
          top={menuPos.top}
          notchLeft={menuPos.notchLeft}
          onMouseEnter={handlePanelMouseEnter}
          onMouseLeave={handlePanelMouseLeave}
          onKeyDown={handlePanelKeyDown}
          firstLinkRef={firstCardRef}
          panelRef={panelRef}
        />
      )}

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 min-[1100px]:hidden bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-[88vw] max-w-[380px] bg-white shadow-2xl p-5 sm:p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="relative h-11 w-36">
                  <Image
                    src="/brand/logo-on-white.png"
                    alt="Citizen Construction Rentals"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14285A]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="mt-5 space-y-1.5">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[56px] flex items-center px-4 rounded-xl hover:bg-slate-50 transition-colors font-condensed font-bold text-[20px] uppercase tracking-wider text-[#14285A]"
                >
                  Home
                </Link>

                {/* Brand New Accordion */}
                <div className="border-t border-b border-slate-100 py-1">
                  <button
                    type="button"
                    onClick={() => setBrandNewAccordionOpen(!brandNewAccordionOpen)}
                    className="w-full min-h-[56px] flex items-center justify-between px-4 text-left font-condensed font-bold text-[20px] uppercase tracking-wider text-[#0A2A66] hover:text-[#1B3B82] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2A66] rounded-xl"
                    aria-expanded={brandNewAccordionOpen}
                  >
                    <span>Brand New Fleet</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-slate-400 transition-transform duration-200",
                        brandNewAccordionOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-250 ease-out",
                      brandNewAccordionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-1 pb-3 px-1 space-y-2">
                        {/* Card 1: Scissor Lifts */}
                        <Link
                          href="/brand-new/scissor-lifts"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl bg-[#F6F8FB] border border-[#E6EEF8] hover:border-[#0A2A66] transition-all min-h-[56px] group"
                        >
                          <div className="relative w-16 h-16 rounded-lg bg-white p-1 border border-[#E6EEF8] shrink-0 flex items-center justify-center overflow-hidden">
                            <Image
                              src="/images/machines/scissor/scissor-tall-studio.jpg"
                              alt="Scissor Lifts"
                              fill
                              sizes="64px"
                              className="object-contain p-1 mix-blend-multiply"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-condensed font-bold text-[20px] uppercase text-[#0A2A66] whitespace-nowrap leading-tight">
                              Scissor Lifts
                            </h4>
                            <p className="font-sans text-[13px] text-slate-600 truncate mt-0.5">
                              Brand new Straightline electric scissor lifts on rent
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0A2A66] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>

                        {/* Card 2: Boom Lifts */}
                        <Link
                          href="/brand-new/boom-lifts"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl bg-[#F6F8FB] border border-[#E6EEF8] hover:border-[#0A2A66] transition-all min-h-[56px] group"
                        >
                          <div className="relative w-16 h-16 rounded-lg bg-white p-1 border border-[#E6EEF8] shrink-0 flex items-center justify-center overflow-hidden">
                            <Image
                              src="/images/machines/boom/sl28t.png"
                              alt="Boom Lifts"
                              fill
                              sizes="64px"
                              className="object-contain p-1 mix-blend-multiply"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-condensed font-bold text-[20px] uppercase text-[#0A2A66] whitespace-nowrap leading-tight">
                              Boom Lifts
                            </h4>
                            <p className="font-sans text-[13px] text-slate-600 truncate mt-0.5">
                              Brand new Straightline boom lifts on rent
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0A2A66] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>

                        {/* View All Link Underneath */}
                        <div className="pt-1 px-2">
                          <Link
                            href="/brand-new"
                            onClick={() => setMobileMenuOpen(false)}
                            className="inline-flex items-center gap-1.5 font-condensed font-bold text-[16px] uppercase tracking-wider text-[#0A2A66] hover:text-[#F5A800] transition-colors"
                          >
                            <span>View all brand new fleet →</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Used Accordion */}
                <div className="border-b border-slate-100 py-1">
                  <button
                    type="button"
                    onClick={() => setUsedAccordionOpen(!usedAccordionOpen)}
                    className="w-full min-h-[56px] flex items-center justify-between px-4 text-left font-condensed font-bold text-[20px] uppercase tracking-wider text-[#0A2A66] hover:text-[#1B3B82] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2A66] rounded-xl"
                    aria-expanded={usedAccordionOpen}
                  >
                    <span>Used Fleet</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-slate-400 transition-transform duration-200",
                        usedAccordionOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-250 ease-out",
                      usedAccordionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-1 pb-3 px-1 space-y-2">
                        {/* Card 1: Scissor Lifts */}
                        <Link
                          href="/used/scissor-lifts"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl bg-[#F6F8FB] border border-[#E6EEF8] hover:border-[#0A2A66] transition-all min-h-[56px] group"
                        >
                          <div className="relative w-16 h-16 rounded-lg bg-white p-1 border border-[#E6EEF8] shrink-0 flex items-center justify-center overflow-hidden">
                            <Image
                              src="/images/used/jlg-scissor.jpg"
                              alt="Used Scissor Lifts"
                              fill
                              sizes="64px"
                              className="object-contain p-1 mix-blend-multiply"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-condensed font-bold text-[20px] uppercase text-[#0A2A66] whitespace-nowrap leading-tight">
                              Scissor Lifts
                            </h4>
                            <p className="font-sans text-[13px] text-slate-600 truncate mt-0.5">
                              Trusted JLG and Genie scissor lifts on rent
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0A2A66] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>

                        {/* Card 2: Boom Lifts */}
                        <Link
                          href="/used/boom-lifts"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl bg-[#F6F8FB] border border-[#E6EEF8] hover:border-[#0A2A66] transition-all min-h-[56px] group"
                        >
                          <div className="relative w-16 h-16 rounded-lg bg-white p-1 border border-[#E6EEF8] shrink-0 flex items-center justify-center overflow-hidden">
                            <Image
                              src="/images/used/jlg-boom.jpg"
                              alt="Used Boom Lifts"
                              fill
                              sizes="64px"
                              className="object-contain p-1 mix-blend-multiply"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-condensed font-bold text-[20px] uppercase text-[#0A2A66] whitespace-nowrap leading-tight">
                              Boom Lifts
                            </h4>
                            <p className="font-sans text-[13px] text-slate-600 truncate mt-0.5">
                              Trusted JLG and Genie boom lifts on rent
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0A2A66] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>

                        {/* View All Link Underneath */}
                        <div className="pt-1 px-2">
                          <Link
                            href="/used"
                            onClick={() => setMobileMenuOpen(false)}
                            className="inline-flex items-center gap-1.5 font-condensed font-bold text-[16px] uppercase tracking-wider text-[#0A2A66] hover:text-[#F5A800] transition-colors"
                          >
                            <span>View all used fleet →</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[56px] flex items-center px-4 rounded-xl hover:bg-slate-50 transition-colors font-condensed font-bold text-[20px] uppercase tracking-wider text-[#14285A]"
                >
                  About Citizen
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[56px] flex items-center px-4 rounded-xl hover:bg-slate-50 transition-colors font-condensed font-bold text-[20px] uppercase tracking-wider text-[#14285A]"
                >
                  Contact & Locations
                </Link>
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 space-y-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <a
                href={`tel:+${siteConfig.phones.primary.raw}`}
                className="w-full h-[52px] rounded-xl bg-[#F5A800] hover:bg-[#df9800] text-[#14285A] font-condensed font-bold text-[18px] uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call: {siteConfig.phones.primary.display}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenQuoteModal();
                }}
                className="w-full h-[52px] rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-condensed font-bold text-[18px] uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
