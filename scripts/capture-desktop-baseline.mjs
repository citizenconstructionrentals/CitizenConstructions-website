#!/usr/bin/env node

import puppeteer from "puppeteer";
import { mkdirSync, existsSync } from "fs";
import { resolve, join } from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = resolve(process.cwd(), "qa/baseline-desktop");

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { width: 1280, height: 800, label: "1280x800" },
  { width: 1440, height: 900, label: "1440x900" },
  { width: 1536, height: 864, label: "1536x864" },
  { width: 1672, height: 941, label: "1672x941" },
  { width: 1920, height: 1080, label: "1920x1080" },
];

const ROUTES = [
  { path: "/", id: "home" },
  { path: "/brand-new", id: "brand_new" },
  { path: "/brand-new/scissor-lifts", id: "brand_new_scissor_lifts" },
  { path: "/brand-new/scissor-lifts/gtjz06", id: "model_gtjz06" },
  { path: "/brand-new/scissor-lifts/gtjz08", id: "model_gtjz08" },
  { path: "/brand-new/scissor-lifts/gtjz10", id: "model_gtjz10" },
  { path: "/brand-new/scissor-lifts/gtjz12", id: "model_gtjz12" },
  { path: "/brand-new/scissor-lifts/gtjz14", id: "model_gtjz14" },
  { path: "/brand-new/boom-lifts", id: "brand_new_boom_lifts" },
  { path: "/brand-new/boom-lifts/sl28t", id: "model_sl28t" },
  { path: "/brand-new/boom-lifts/articulating-boom", id: "model_articulating_boom" },
  { path: "/used", id: "used" },
  { path: "/used/scissor-lifts", id: "used_scissor_lifts" },
  { path: "/used/boom-lifts", id: "used_boom_lifts" },
  { path: "/about", id: "about" },
  { path: "/contact", id: "contact" },
  { path: "/scissor-lift-on-rent", id: "scissor_lift_on_rent" },
  { path: "/boom-lift-on-rent", id: "boom_lift_on_rent" },
  { path: "/rental-rates", id: "rental_rates" },
  { path: "/non-existent-404", id: "not_found_404" },
];

async function stabilizePage(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition: none !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }
      html {
        scroll-behavior: auto !important;
      }
    `,
  });

  await page.evaluate(async () => {
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });

    if (document.fonts) {
      await document.fonts.ready;
    }

    const imgs = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete) return;
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      })
    );
  });

  await new Promise((r) => setTimeout(r, 400));
}

async function run() {
  console.log("==================================================");
  console.log("STARTING DESKTOP BASELINE SCREENSHOT CAPTURE");
  console.log(`Target: ${BASE_URL}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log("==================================================\n");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n>>> VIEWPORT: ${vp.label} (${vp.width}x${vp.height}) <<<`);
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

      for (const route of ROUTES) {
        const url = `${BASE_URL}${route.path}`;
        try {
          await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
          await stabilizePage(page);

          // 1. Above-the-fold screenshot
          const foldPath = join(OUTPUT_DIR, `${route.id}_${vp.label}_fold.png`);
          await page.screenshot({ path: foldPath, fullPage: false });

          // 2. Full-page screenshot
          const fullPath = join(OUTPUT_DIR, `${route.id}_${vp.label}_full.png`);
          await page.screenshot({ path: fullPath, fullPage: true });

          console.log(`  ✓ Captured ${route.id} (${vp.label})`);
        } catch (err) {
          console.error(`  ✗ Error capturing ${route.id} on ${vp.label}:`, err.message);
        }
      }

      // Capture special states at this viewport
      console.log(`  Capturing UI states at ${vp.label}...`);
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await stabilizePage(page);

      // State 1: Brand New Dropdown
      try {
        await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
        await stabilizePage(page);
        const bnLink = await page.$('header a[href="/brand-new"]');
        if (bnLink) {
          await bnLink.hover();
          await new Promise((r) => setTimeout(r, 400));
          await stabilizePage(page);
          await page.screenshot({
            path: join(OUTPUT_DIR, `state_brand_new_dropdown_${vp.label}.png`),
            fullPage: false,
          });
          console.log(`    ✓ State: Brand New Dropdown (${vp.label})`);
        }
      } catch (e) {
        console.warn(`    ! Could not capture Brand New dropdown: ${e.message}`);
      }

      // State 2: Used Dropdown
      try {
        await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
        await stabilizePage(page);
        const usedLink = await page.$('header a[href="/used"]');
        if (usedLink) {
          await usedLink.hover();
          await new Promise((r) => setTimeout(r, 400));
          await stabilizePage(page);
          await page.screenshot({
            path: join(OUTPUT_DIR, `state_used_dropdown_${vp.label}.png`),
            fullPage: false,
          });
          console.log(`    ✓ State: Used Dropdown (${vp.label})`);
        }
      } catch (e) {
        console.warn(`    ! Could not capture Used dropdown: ${e.message}`);
      }

      // State 3: Scrolled Sticky Header
      try {
        await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
        await stabilizePage(page);
        await page.evaluate(() => window.scrollTo(0, 600));
        await new Promise((r) => setTimeout(r, 300));
        await stabilizePage(page);
        await page.screenshot({
          path: join(OUTPUT_DIR, `state_scrolled_header_${vp.label}.png`),
          fullPage: false,
        });
        console.log(`    ✓ State: Scrolled Header (${vp.label})`);
      } catch (e) {
        console.warn(`    ! Could not capture Scrolled header: ${e.message}`);
      }

      // State 4: WhatsApp Quote Modal Open
      try {
        await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
        await stabilizePage(page);
        const quoteBtn = await page.$('button:has-text("GET RENTAL QUOTE"), [data-quote-trigger], header button:last-of-type');
        if (quoteBtn) {
          await quoteBtn.click();
          await new Promise((r) => setTimeout(r, 400));
          await stabilizePage(page);
          await page.screenshot({
            path: join(OUTPUT_DIR, `state_quote_modal_${vp.label}.png`),
            fullPage: false,
          });
          console.log(`    ✓ State: Quote Modal (${vp.label})`);
        }
      } catch (e) {
        console.warn(`    ! Could not capture Quote Modal: ${e.message}`);
      }

      await page.close();
    }

    console.log("\n==================================================");
    console.log("DESKTOP BASELINE CAPTURE COMPLETED SUCCESSFULLY!");
    console.log(`Files saved in: ${OUTPUT_DIR}`);
    console.log("==================================================");
  } finally {
    await browser.close();
  }
}

run();
