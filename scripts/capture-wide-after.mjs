#!/usr/bin/env node

import puppeteer from "puppeteer";
import { resolve, join } from "path";
import { existsSync, mkdirSync } from "fs";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = resolve(process.cwd(), "qa/after-wide");

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const WIDE_VIEWPORTS = [
  { width: 768, height: 1024, label: "768x1024" },
  { width: 834, height: 1194, label: "834x1194" },
  { width: 1024, height: 768, label: "1024x768" },
  { width: 1100, height: 800, label: "1100x800" },
  { width: 1280, height: 800, label: "1280x800" },
  { width: 1440, height: 900, label: "1440x900" },
  { width: 1672, height: 941, label: "1672x941" },
  { width: 1920, height: 1080, label: "1920x1080" },
];

const ROUTES = [
  { path: "/", id: "home" },
  { path: "/brand-new", id: "brand_new" },
  { path: "/brand-new/scissor-lifts", id: "brand_new_scissor_lifts" },
  { path: "/brand-new/scissor-lifts/gtjz10", id: "model_gtjz10" },
  { path: "/used", id: "used" },
  { path: "/about", id: "about" },
  { path: "/contact", id: "contact" },
];

async function stabilize(page) {
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
    const videos = Array.from(document.querySelectorAll("video"));
    await Promise.all(
      videos.map((v) => {
        v.pause();
        v.currentTime = 0;
        return new Promise((resolve) => {
          if (v.seeking) {
            v.onseeked = resolve;
            setTimeout(resolve, 500);
          } else {
            resolve();
          }
        });
      })
    );

    if (document.fonts) {
      await document.fonts.ready;
    }

    // Scroll down gradually to trigger lazy images
    const distance = 400;
    while (window.scrollY + window.innerHeight < document.body.scrollHeight) {
      window.scrollBy(0, distance);
    }
    // Return to top
    window.scrollTo(0, 0);
  });

  // Wait for scroll back to top to settle
  await new Promise((r) => setTimeout(r, 500));

  // Settle all images
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 1000);
        });
      })
    );
  });

  await new Promise((r) => setTimeout(r, 600));
}

async function run() {
  console.log("==================================================");
  console.log("STARTING WIDE AFTER SCREENSHOT CAPTURE (>= 768px)");
  console.log(`Target: ${BASE_URL}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log("==================================================\n");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    for (const vp of WIDE_VIEWPORTS) {
      console.log(`\n>>> VIEWPORT: ${vp.label} (${vp.width}x${vp.height}) <<<`);
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

      for (const route of ROUTES) {
        const url = `${BASE_URL}${route.path}`;
        try {
          await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
          await stabilize(page);

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

      await page.close();
    }
  } finally {
    await browser.close();
  }
  console.log("\n==================================================");
  console.log("WIDE AFTER CAPTURE COMPLETE");
  console.log("==================================================");
}

run();
