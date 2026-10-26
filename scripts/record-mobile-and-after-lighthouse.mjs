#!/usr/bin/env node

import { execSync } from "child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join } from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const QA_DIR = resolve(process.cwd(), "qa");

if (!existsSync(QA_DIR)) {
  mkdirSync(QA_DIR, { recursive: true });
}

const TARGET_PAGES = [
  { name: "home", url: `${BASE_URL}/`, path: "/" },
  { name: "listing", url: `${BASE_URL}/brand-new/scissor-lifts`, path: "/brand-new/scissor-lifts" },
  { name: "model", url: `${BASE_URL}/brand-new/scissor-lifts/gtjz10`, path: "/brand-new/scissor-lifts/gtjz10" },
  { name: "pillar", url: `${BASE_URL}/scissor-lift-on-rent`, path: "/scissor-lift-on-rent" },
];

async function runLighthouse(formFactor) {
  console.log(`\n==================================================`);
  console.log(`RECORDING LIGHTHOUSE BENCHMARK: ${formFactor.toUpperCase()}`);
  console.log(`==================================================\n`);

  const results = {
    timestamp: new Date().toISOString(),
    formFactor,
    pages: {},
  };

  const presetFlag = formFactor === "desktop" ? "--preset=desktop" : "";

  for (const target of TARGET_PAGES) {
    if (formFactor === "desktop" && target.name === "pillar") continue; // Desktop only tracks home, listing, model

    console.log(`Running ${formFactor} Lighthouse on ${target.name} (${target.url})...`);
    const tempOutputFile = resolve(QA_DIR, `temp_${formFactor}_${target.name}.json`);

    try {
      execSync(
        `npx.cmd lighthouse "${target.url}" ${presetFlag} --chrome-flags="--headless" --output=json --output-path="${tempOutputFile}" --only-categories=performance --quiet`,
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

      console.log(`  ✓ ${target.name} ${formFactor} Score: ${perfScore}/100 | LCP: ${results.pages[target.name].metrics.largestContentfulPaint} | CLS: ${results.pages[target.name].metrics.cumulativeLayoutShift}`);
    } catch (err) {
      console.error(`  ✗ Error running ${formFactor} lighthouse on ${target.name}:`, err.message);
    }
  }

  const filename = formFactor === "desktop" ? "lighthouse-desktop-after.json" : "lighthouse-mobile.json";
  const finalPath = join(QA_DIR, filename);
  writeFileSync(finalPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`Saved: ${finalPath}`);
}

async function main() {
  await runLighthouse("mobile");
  await runLighthouse("desktop");
}

main();
