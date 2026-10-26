#!/usr/bin/env node

import puppeteer from "puppeteer";
import { mkdirSync, existsSync, writeFileSync } from "fs";
import { resolve, join } from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = resolve(process.cwd(), "qa/mobile");

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const DEVICES = [
  { name: "iphone_se", label: "iPhone SE", width: 375, height: 667, isPhone: true },
  { name: "iphone_14", label: "iPhone 14", width: 390, height: 844, isPhone: true },
  { name: "iphone_14_pro_max", label: "iPhone 14 Pro Max", width: 430, height: 932, isPhone: true },
  { name: "pixel_7", label: "Google Pixel 7", width: 412, height: 915, isPhone: true },
  { name: "galaxy_s8", label: "Samsung Galaxy S8", width: 360, height: 740, isPhone: true },
  { name: "small_phone_320", label: "Small Phone 320px", width: 320, height: 568, isPhone: true },
  { name: "ipad_mini", label: "iPad Mini", width: 768, height: 1024, isTablet: true },
  { name: "ipad_pro_11", label: "iPad Pro 11", width: 834, height: 1194, isTablet: true },
  { name: "phone_landscape", label: "Phone Landscape 844x390", width: 844, height: 390, isLandscape: true },
];

const AUDIT_ROUTES = [
  { path: "/", id: "home" },
  { path: "/brand-new/scissor-lifts", id: "listing_scissor" },
  { path: "/brand-new/scissor-lifts/gtjz10", id: "model_gtjz10" },
  { path: "/about", id: "about" },
  { path: "/contact", id: "contact" },
  { path: "/rental-rates", id: "rental_rates" },
];

async function stabilizePage(page) {
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

  await page.evaluate(async () => {
    if (document.fonts) await document.fonts.ready;
  });

  await new Promise((r) => setTimeout(r, 400));
}

async function runMobileAudit() {
  console.log("==================================================");
  console.log("STARTING MOBILE & TABLET DEVICE AUDIT");
  console.log(`Target: ${BASE_URL}`);
  console.log(`Testing ${DEVICES.length} devices across ${AUDIT_ROUTES.length} key routes`);
  console.log("==================================================\n");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const auditResults = {
    timestamp: new Date().toISOString(),
    devices: {},
    summary: { totalTests: 0, passed: 0, failed: 0 },
  };

  try {
    for (const dev of DEVICES) {
      console.log(`\n>>> TESTING DEVICE: ${dev.label} (${dev.width}x${dev.height}) <<<`);
      auditResults.devices[dev.name] = { label: dev.label, width: dev.width, height: dev.height, routes: {} };

      const page = await browser.newPage();
      await page.setViewport({
        width: dev.width,
        height: dev.height,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      });

      for (const route of AUDIT_ROUTES) {
        const url = `${BASE_URL}${route.path}`;
        try {
          await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
          await stabilizePage(page);

          // Test 1: Horizontal Overflow Check
          const overflow = await page.evaluate(() => {
            const docWidth = document.documentElement.offsetWidth;
            const scrollWidth = document.documentElement.scrollWidth;
            const bodyWidth = document.body.scrollWidth;
            const windowWidth = window.innerWidth;
            const hasOverflow = scrollWidth > windowWidth || bodyWidth > windowWidth;
            return {
              hasOverflow,
              windowWidth,
              scrollWidth,
              bodyWidth,
            };
          });

          // Test 2: Tap targets size audit (buttons, links, inputs)
          const touchTargetAudit = await page.evaluate(() => {
            const elements = [...document.querySelectorAll("a, button, input, select, textarea")];
            const smallTargets = [];
            for (const el of elements) {
              // Ignore hidden elements or zero size
              const rect = el.getBoundingClientRect();
              if (rect.width === 0 || rect.height === 0) continue;
              const style = window.getComputedStyle(el);
              if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") continue;
              
              // Only check interactive elements that are in view
              if (rect.height < 40 && rect.width < 40 && !el.closest(".sr-only") && !el.closest("[aria-hidden='true']")) {
                smallTargets.push({
                  tag: el.tagName,
                  text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30),
                  width: Math.round(rect.width),
                  height: Math.round(rect.height),
                });
              }
            }
            return {
              totalInteractive: elements.length,
              smallTargetsCount: smallTargets.length,
              smallTargets: smallTargets.slice(0, 5),
            };
          });

          // Test 3: Input font size (must be >= 16px to prevent iOS auto-zoom)
          const inputFontSizeAudit = await page.evaluate(() => {
            const inputs = [...document.querySelectorAll("input, select, textarea")];
            const smallInputs = [];
            for (const inp of inputs) {
              const style = window.getComputedStyle(inp);
              const fontSize = parseFloat(style.fontSize);
              if (fontSize < 15.5) {
                smallInputs.push({
                  name: inp.getAttribute("name") || inp.getAttribute("placeholder") || inp.tagName,
                  fontSize: fontSize,
                });
              }
            }
            return {
              totalInputs: inputs.length,
              smallInputsCount: smallInputs.length,
            };
          });

          // Capture screenshot
          const screenshotName = `${dev.name}_${route.id}.png`;
          const screenshotPath = join(OUTPUT_DIR, screenshotName);
          await page.screenshot({ path: screenshotPath, fullPage: false });

          const routePassed = !overflow.hasOverflow && inputFontSizeAudit.smallInputsCount === 0;
          auditResults.summary.totalTests++;
          if (routePassed) auditResults.summary.passed++;
          else auditResults.summary.failed++;

          auditResults.devices[dev.name].routes[route.id] = {
            passed: routePassed,
            overflow,
            touchTargetAudit,
            inputFontSizeAudit,
            screenshot: screenshotName,
          };

          const statusBadge = routePassed ? "✓ PASS" : "✗ FAIL";
          console.log(`  ${statusBadge} ${route.id} | Overflow: ${overflow.hasOverflow ? "YES (FAILED)" : "None"} | Small Inputs: ${inputFontSizeAudit.smallInputsCount}`);
        } catch (err) {
          console.error(`  ✗ Error on ${dev.name} ${route.id}:`, err.message);
        }
      }

      await page.close();
    }

    const reportPath = join(OUTPUT_DIR, "mobile-audit-report.json");
    writeFileSync(reportPath, JSON.stringify(auditResults, null, 2), "utf-8");
    console.log(`\n==================================================`);
    console.log(`Mobile Audit Finished! Report saved: ${reportPath}`);
    console.log(`Total: ${auditResults.summary.totalTests} | Passed: ${auditResults.summary.passed} | Failed: ${auditResults.summary.failed}`);
    console.log(`==================================================`);
  } finally {
    await browser.close();
  }
}

runMobileAudit();
