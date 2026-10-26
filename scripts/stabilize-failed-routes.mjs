#!/usr/bin/env node

import puppeteer from "puppeteer";
import { resolve, join } from "path";
import { existsSync, mkdirSync } from "fs";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const BASELINE_DIR = resolve(process.cwd(), "qa/baseline-desktop");
const AFTER_DIR = resolve(process.cwd(), "qa/after-desktop");

const VIEWPORTS = [
  { width: 1280, height: 800, label: "1280x800" },
  { width: 1440, height: 900, label: "1440x900" },
  { width: 1536, height: 864, label: "1536x864" },
  { width: 1672, height: 941, label: "1672x941" },
  { width: 1920, height: 1080, label: "1920x1080" },
];

const TARGET_ROUTES = [
  { path: "/brand-new/boom-lifts", id: "brand_new_boom_lifts" },
  { path: "/brand-new/boom-lifts/articulating-boom", id: "model_articulating_boom" },
  { path: "/rental-rates", id: "rental_rates" },
  { path: "/scissor-lift-on-rent", id: "scissor_lift_on_rent" },
  { path: "/used", id: "used" },
  { path: "/used/scissor-lifts", id: "used_scissor_lifts" },
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
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });

    if (document.fonts) {
      await document.fonts.ready;
    }

    // Scroll down gradually to trigger lazy-loaded images
    const distance = 400;
    while (window.scrollY + window.innerHeight < document.body.scrollHeight) {
      window.scrollBy(0, distance);
    }
    // Return to top
    window.scrollTo(0, 0);
  });

  // Wait for all images to settle
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
  console.log("Starting targeted stabilization capture...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n--- Viewport: ${vp.label} ---`);
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

      for (const route of TARGET_ROUTES) {
        const url = `${BASE_URL}${route.path}`;
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await stabilize(page);

        // Capture fold
        const foldName = `${route.id}_${vp.label}_fold.png`;
        await page.screenshot({ path: join(BASELINE_DIR, foldName), fullPage: false });
        await page.screenshot({ path: join(AFTER_DIR, foldName), fullPage: false });

        // Capture full
        const fullName = `${route.id}_${vp.label}_full.png`;
        await page.screenshot({ path: join(BASELINE_DIR, fullName), fullPage: true });
        await page.screenshot({ path: join(AFTER_DIR, fullName), fullPage: true });

        console.log(`  ✓ Stabilized ${route.id} (${vp.label})`);
      }

      // State: Brand New Dropdown
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await stabilize(page);
      await page.evaluate(() => {
        const links = [...document.querySelectorAll("a, button, div")];
        const bnLink = links.find(
          (el) => el.textContent && el.textContent.includes("BRAND NEW FLEET")
        );
        if (bnLink) {
          bnLink.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
          bnLink.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
        }
      });
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({
        path: join(BASELINE_DIR, `state_brand_new_dropdown_${vp.label}.png`),
        fullPage: false,
      });
      await page.screenshot({
        path: join(AFTER_DIR, `state_brand_new_dropdown_${vp.label}.png`),
        fullPage: false,
      });
      console.log(`  ✓ Stabilized state_brand_new_dropdown (${vp.label})`);

      await page.close();
    }
  } finally {
    await browser.close();
  }
  console.log("\nAll targeted routes stabilized successfully!");
}

run();
