#!/usr/bin/env node

import puppeteer from "puppeteer";
import { resolve, join } from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = resolve(process.cwd(), "qa/baseline-desktop");

const VIEWPORTS = [
  { width: 1280, height: 800, label: "1280x800" },
  { width: 1440, height: 900, label: "1440x900" },
  { width: 1536, height: 864, label: "1536x864" },
  { width: 1672, height: 941, label: "1672x941" },
  { width: 1920, height: 1080, label: "1920x1080" },
];

async function stabilize(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });
  await page.evaluate(() => {
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });
  });
  if (page.evaluate) {
    await page.evaluate(async () => {
      if (document.fonts) await document.fonts.ready;
    });
  }
  await new Promise((r) => setTimeout(r, 400));
}

async function run() {
  console.log("Capturing missing baseline states: Used dropdown & Quote modal...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const vp of VIEWPORTS) {
      console.log(`Processing ${vp.label}...`);
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

      // Used Dropdown
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await stabilize(page);
      await page.evaluate(() => {
        const links = [...document.querySelectorAll("a, button")];
        const usedLink = links.find((el) => el.textContent && el.textContent.includes("USED FLEET"));
        if (usedLink) {
          usedLink.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
          usedLink.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
        }
      });
      await new Promise((r) => setTimeout(r, 400));
      await stabilize(page);
      await page.screenshot({
        path: join(OUTPUT_DIR, `state_used_dropdown_${vp.label}.png`),
        fullPage: false,
      });
      console.log(`  ✓ state_used_dropdown_${vp.label}.png`);

      // Quote Modal
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await stabilize(page);
      await page.evaluate(() => {
        const btns = [...document.querySelectorAll("button, a")];
        const qBtn = btns.find(
          (b) =>
            (b.textContent && (b.textContent.includes("GET A QUOTE") || b.textContent.includes("GET RENTAL QUOTE"))) ||
            b.getAttribute("aria-label")?.includes("Quote")
        );
        if (qBtn) {
          qBtn.click();
        }
      });
      await new Promise((r) => setTimeout(r, 500));
      await stabilize(page);
      await page.screenshot({
        path: join(OUTPUT_DIR, `state_quote_modal_${vp.label}.png`),
        fullPage: false,
      });
      console.log(`  ✓ state_quote_modal_${vp.label}.png`);

      await page.close();
    }
    console.log("All missing baseline states captured!");
  } finally {
    await browser.close();
  }
}

run();
