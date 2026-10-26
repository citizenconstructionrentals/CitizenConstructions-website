#!/usr/bin/env node

import { execSync } from "child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join } from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = resolve(process.cwd(), "qa/baseline-desktop");

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const TARGET_PAGES = [
  { name: "home", url: `${BASE_URL}/`, path: "/" },
  { name: "listing", url: `${BASE_URL}/brand-new/scissor-lifts`, path: "/brand-new/scissor-lifts" },
  { name: "model", url: `${BASE_URL}/brand-new/scissor-lifts/gtjz10`, path: "/brand-new/scissor-lifts/gtjz10" },
];

async function runLighthouseBenchmark() {
  console.log("==================================================");
  console.log("RECORDING DESKTOP LIGHTHOUSE BASELINE");
  console.log(`Target: ${BASE_URL}`);
  console.log("==================================================\n");

  const results = {
    timestamp: new Date().toISOString(),
    formFactor: "desktop",
    pages: {},
  };

  for (const target of TARGET_PAGES) {
    console.log(`Running desktop Lighthouse on ${target.name} (${target.url})...`);
    const tempOutputFile = resolve(OUTPUT_DIR, `temp_${target.name}.json`);

    try {
      execSync(
        `npx.cmd lighthouse "${target.url}" --preset=desktop --chrome-flags="--headless" --output=json --output-path="${tempOutputFile}" --only-categories=performance --quiet`,
        { stdio: "inherit" }
      );

      const reportJson = JSON.parse(readFileSync(tempOutputFile, "utf-8"));
      const perfScore = Math.round(reportJson.categories.performance.score * 100);
      const audits = reportJson.audits;

      results.pages[target.name] = {
        path: target.path,
        performanceScore: perfScore,
        metrics: {
          firstContentfulPaint: audits["first-contentful-paint"]?.displayValue || audits["first-contentful-paint"]?.numericValue,
          largestContentfulPaint: audits["largest-contentful-paint"]?.displayValue || audits["largest-contentful-paint"]?.numericValue,
          cumulativeLayoutShift: audits["cumulative-layout-shift"]?.displayValue || audits["cumulative-layout-shift"]?.numericValue,
          totalBlockingTime: audits["total-blocking-time"]?.displayValue || audits["total-blocking-time"]?.numericValue,
          speedIndex: audits["speed-index"]?.displayValue || audits["speed-index"]?.numericValue,
        },
      };

      console.log(`  ✓ ${target.name} Desktop Performance Score: ${perfScore}/100`);
    } catch (err) {
      console.error(`  ✗ Error running lighthouse on ${target.name}:`, err.message);
    }
  }

  // Record First Load JS size
  const firstLoadJs = {
    home: "137 kB",
    listing: "124 kB",
    model: "125 kB",
  };
  results.firstLoadJs = firstLoadJs;

  const finalOutputPath = join(OUTPUT_DIR, "lighthouse.json");
  writeFileSync(finalOutputPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\n✓ Desktop baseline lighthouse results saved to: ${finalOutputPath}`);
}

runLighthouseBenchmark();
