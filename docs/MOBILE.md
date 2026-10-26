# Mobile & Tablet Optimization Architecture & Decision Record

## 1. Executive Summary & Golden Rule

This document defines the responsive architecture, design decisions, and safety guarantees implemented for the **Citizen Construction Rentals** website across all device viewports:
- **Phones**: 320px – 767.98px
- **Tablets**: 768px – 1099.98px
- **Desktop (FROZEN)**: $\ge 1100\text{px}$

### The Golden Rule: Desktop Is Frozen
Per project requirements, **any viewport 1100px wide or wider is completely frozen**: not one pixel, spacing value, font size, image asset, or interactive behavior has changed.

Before writing any mobile CSS or markup, a complete baseline capture was taken across 20 routes at 5 desktop viewports (1280×800, 1440×900, 1536×864, 1672×941, 1920×1080) for both above-the-fold and full-page views, plus 4 special interactive states (Brand New dropdown, Used dropdown, Scrolled sticky header, WhatsApp Quote modal). An automated `pixelmatch` verification suite runs against the post-optimization build to ensure zero visual regression ($\le 0.02\%$ strict diff threshold).

---

## 2. Breakpoint Architecture & CSS Scoping System

To strictly isolate mobile and tablet rules without altering desktop rendering, all overrides are scoped to `< 1100px`:

```
┌─────────────────────────────────┬───────────────────────────────┬──────────────────────────────┐
│ Phone (320px – 767.98px)        │ Tablet (768px – 1099.98px)    │ Desktop (>= 1100px) [FROZEN] │
├─────────────────────────────────┼───────────────────────────────┼──────────────────────────────┤
│ 1-col layouts, swipe carousels, │ 2-col grids, responsive cards,│ Original 1672px design scale │
│ bottom sticky bar, bottom-sheet │ floating WhatsApp button,     │ Inline calc(N * var(--s))    │
│ modal, 82% peek cards           │ tablet navigation drawer      │ Mega-menu hover dropdowns    │
└─────────────────────────────────┴───────────────────────────────┴──────────────────────────────┘
```

### Safety Principles:
1. **No Edits to Unprefixed Base Classes**: Base CSS classes (`.card-premium`, `.eyebrow-label`, typography scales) and the scaling tokens (`--s`, `--w`, `--f`) remain identical.
2. **Explicit Tailwind Screen**: `desktop: "1100px"` was added to Tailwind's `theme.extend.screens`, enabling clean scoping via `max-[1099px]:` or `desktop:`.
3. **Pure CSS DOM Toggling (No JS Branching)**: No `useMediaQuery` or client-side DOM branching is used. All layout shifts are achieved via CSS grid/flex or CSS-hidden companion nodes (`md:hidden`, `hidden md:block`), ensuring 100% search-engine indexability and zero hydration mismatches.

---

## 3. Header & Navigation Architecture

### Desktop Header ($\ge 1100\text{px}$)
- Height: `calc(90 * var(--s))`
- Brand New & Used Fleet mega-menus with 10px floating gap, triangular pointer notch, and hover intent delay.
- Direct desktop quote button & primary phone.

### Mobile & Tablet Header (< 1100px)
- **Sticky Height**: Standardized at `72px` (`h-[72px] min-[1100px]:h-[calc(90*var(--s))]`).
- **Brand Logo**: Compact `150px` width (`w-[150px] h-[48px]`), ensuring strong branding without encroaching on touch triggers.
- **Touch Triggers**:
  - Compact WhatsApp button: `h-11 px-3.5` ($\ge 44\text{px}$ touch target).
  - Hamburger menu button: `w-11 h-11` ($44\times 44\text{px}$ touch target).

### Mobile Slide-In Navigation Drawer
- **Dimensions**: Clamped at `88vw` with `max-w-[380px]`.
- **Accessibility & UX**:
  - Full backdrop scrim (`bg-slate-900/60 backdrop-blur-sm`).
  - Automatic `document.body.style.overflow = "hidden"` body scroll lock when open.
  - Keyboard listener closes drawer on `Escape`.
- **Navigation Links**:
  - Primary links: minimum `56px` touch height (`min-h-[56px] flex items-center px-4 rounded-xl`).
  - Interactive Accordions for "Brand New Fleet" and "Used Fleet":
    - Smooth CSS grid expand/collapse (`grid-rows-[0fr] → grid-rows-[1fr]`).
    - 64px image cards (`w-16 h-16`) for scissor lifts and boom lifts with category badges and subtitles.
    - Direct "View all..." category links.
- **Drawer Bottom Action Bar**:
  - Two prominent 52px high action buttons:
    1. Direct Phone Call (`bg-[#F5A800] text-[#14285A]`).
    2. WhatsApp Inquiry (`bg-[#16A34A] text-white`).
  - Bottom padding respects `env(safe-area-inset-bottom)`.

---

## 4. Sticky Bottom Action Bar & Floating WhatsApp

- **Phone Only (< 768px)**:
  - Fixed sticky bottom bar (`MobileStickyBar.tsx`): 52px buttons ("WhatsApp" in `#16A34A`, "Call" in `#F5A800`).
  - Safe area inset handling: `pb-[max(0.625rem,env(safe-area-inset-bottom))]`.
  - Floating circular WhatsApp button is hidden below 768px (`hidden md:block`) to eliminate visual clutter and touch conflicts.
  - Page & footer content padding: Footer applies `pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] md:pb-12` so content is never hidden behind the fixed bar.
- **Tablet & Desktop ($\ge 768\text{px}$)**:
  - Sticky bottom bar is hidden.
  - Circular floating WhatsApp button displays with hover tooltip on desktop.

---

## 5. WhatsApp Quote Modal (Bottom Sheet on Mobile)

- **Presentation**:
  - On phones (< 768px): bottom-sheet presentation with `rounded-t-2xl`, drag indicator handle, and `pb-[max(1.5rem,env(safe-area-inset-bottom))]`.
  - On tablet & desktop ($\ge 768\text{px}$): centered modal dialog with `sm:rounded-2xl` and `sm:max-w-md`.
- **Dismissal**:
  - Tapping the backdrop outside the modal dialog closes it immediately.
  - Prominent 44×44px close button in top right.
  - Keyboard `Escape` closes the modal.
- **Selection**:
  - Both numbers presented as high-contrast 56px action cards (Primary Rental Desk `+91 98112 03530` and Support Desk `+91 81783 86750`).

---

## 6. Section-by-Section Responsive Optimizations

### 1. Hero Section
- **Art-Directed Mobile Image**:
  - Created `/public/images/hero/hero-composite-mobile.jpg` (1170×1500) via `sharp`/OpenCV from the original 4K asset.
  - The scissor lift machine is positioned majestically in the lower ~55% of the frame (y=620–1500), while the upper half features deep navy gradient, ensuring text contrast without heavy muddy filters.
  - Preloaded conditionally in `<head>` for phones only:
    `<link rel="preload" as="image" href="/images/hero/hero-composite-mobile.jpg" media="(max-width: 767.98px)" />`
  - Desktop retains the 3840×1874 HD background with zero changes.
- **Mobile Hero Sizing & CTAs**:
  - `min-h-[calc(100svh-72px)]` with compact vertical padding.
  - Stacked action buttons on phones: 56px Green WhatsApp CTA, 56px Browse Fleet button, and CALL NOW link ($\ge 44\text{px}$ touch target).
  - 2×2 grid of 46px trust chips ("Since 2000", "Pan-India", "CE Certified", "Delivered to Your Site").

### 2. Choose Machine Section
- 2×2 grid for header trust badges on mobile.
- Clean responsive machine cutout cards: stacked on mobile, side-by-side on tablet/desktop.
- 2×2 grid for bottom trust strip on phones.

### 3. Scissor Lift Cards (Horizontal Swipe Carousel)
- On phones (< 768px): transformed from an overwhelming 5-card vertical stack into a smooth CSS scroll-snap horizontal carousel:
  - `w-[82vw] max-w-[320px] shrink-0 snap-center` with peek effect showing the next card.
  - Dot indicators underneath.
- On desktop ($\ge 1100\text{px}$): exactly 5 columns in the desktop grid (`desktop:grid-cols-5`).

### 4. Where Our Lifts Work (Applications)
- Single column on mobile with 1.55/1 card aspect ratio.
- 2-row layout on tablet, compact stacked info bar on phones.
- Background skyline silhouette hidden on mobile for maximum legibility and speed.

### 5. Technical Specification & Comparison Table
- Horizontally scrollable container with sticky first column (`sticky left-0`).
- Model specs remain legible with horizontal scroll cues.

### 6. Model Detail Pages
- Swipeable gallery with thumbnail selector.
- 2×2 key stats grid (Working Height, Platform Height, SWL Capacity, Weight).
- 56px full-width CTA buttons.

### 7. About & Contact Pages
- **Directors**: side-by-side down to 360px viewport width (`grid-cols-1 min-[360px]:grid-cols-2`).
- **Contact Form**: all inputs set to `text-[16px] min-[1100px]:text-sm` to strictly prevent iOS Safari auto-zoom on focus. Tap targets $\ge 44\text{px}$.

### 8. Footer
- 2-column link grid on mobile phones (Quick Links and Our Fleet side-by-side).
- Safe area bottom padding for fixed mobile action bar.

---

## 7. Performance Budget & Verification Results

### Bundle Size Budget
- First Load JS Budget: < 170 kB gzipped on Home
- Actual Measured:
  - **Home**: `137 kB` (PASS - 33 kB below budget)
  - **Listing**: `124 kB` (PASS)
  - **Model Detail**: `125 kB` (PASS)
  - **Shared Chunks**: `103 kB`

### Mobile Audit Matrix (9 Devices Tested)
1. iPhone SE (375×667) - 0 overflow, tap targets $\ge 44\text{px}$, inputs $\ge 16\text{px}$
2. iPhone 14 (390×844) - 0 overflow, safe area respected
3. iPhone 14 Pro Max (430×932) - 0 overflow
4. Google Pixel 7 (412×915) - 0 overflow
5. Samsung Galaxy S8 (360×740) - 0 overflow
6. Small Phone (320×568) - 0 overflow down to minimum width
7. iPad Mini (768×1024) - clean 2-col tablet layout
8. iPad Pro 11 (834×1194) - clean tablet layout
9. Landscape Phone (844×390) - zero overflow, responsive header & hero

### Desktop Freeze Verification
- 20 routes × 5 desktop viewports (1280×800, 1440×900, 1536×864, 1672×941, 1920×1080) fold and full page (220 screenshots).
- 4 interactive states (Brand New dropdown, Used dropdown, Scrolled sticky header, Quote modal).
- Tested via `scripts/compare-desktop.mjs` using `pixelmatch` threshold 0.1 and strict $\le 0.02\%$ difference allowance.
- Result: **100% PASS - 0 REGRESSIONS on Desktop** (220 / 220 matched, 0 failures).

### Lighthouse Benchmark Results (Desktop Baseline vs After & Mobile)

| Route / Page | Desktop Baseline | Desktop After | Mobile Performance | Mobile CLS | Mobile LCP |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Home (`/`)** | 52 / 100 | **91 / 100** | 47 / 100 | **0.003** (CLS < 0.05) | 10.8s (Moto G slow 4G) |
| **Listing (`/brand-new/scissor-lifts`)** | 99 / 100 | **99 / 100** | **86 / 100** | **0.019** (CLS < 0.05) | 3.4s |
| **Model Detail (`.../gtjz10`)** | 98 / 100 | **99 / 100** | **69 / 100** | 0.111 | 3.6s |
| **Pillar (`/scissor-lift-on-rent`)** | — | — | **89 / 100** | **0.001** (CLS < 0.05) | 3.5s |

