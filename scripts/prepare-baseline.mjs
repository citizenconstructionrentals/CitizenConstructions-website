import { execSync } from "child_process";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { resolve, join } from "path";
import puppeteer from "puppeteer";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const QA_DIR = resolve(process.cwd(), "qa", "task-baseline");

if (!existsSync(QA_DIR)) {
  mkdirSync(QA_DIR, { recursive: true });
}

const ROUTES = [
  { name: "home", path: "/" },
  { name: "scissor-lift-on-rent", path: "/scissor-lift-on-rent" },
  { name: "brand-new-scissor-lifts", path: "/brand-new/scissor-lifts" },
  { name: "contact", path: "/contact" },
];

async function captureScreenshots() {
  console.log("\n📸 Capturing baseline screenshots at 390px and 1440px...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  for (const r of ROUTES) {
    const url = `${BASE_URL}${r.path}`;
    // 390px width
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.screenshot({
      path: join(QA_DIR, `${r.name}-390px.png`),
      fullPage: true,
    });
    console.log(`  ✓ Captured ${r.name} @ 390px`);

    // 1440px width
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.screenshot({
      path: join(QA_DIR, `${r.name}-1440px.png`),
      fullPage: true,
    });
    console.log(`  ✓ Captured ${r.name} @ 1440px`);
  }

  await browser.close();
}

async function runLighthouse() {
  console.log("\n🚀 Running baseline mobile Lighthouse on targets...");
  const targets = [
    { name: "home", path: "/" },
    { name: "pillar", path: "/scissor-lift-on-rent" },
    { name: "listing", path: "/brand-new/scissor-lifts" },
  ];

  const results = {
    timestamp: new Date().toISOString(),
    pages: {},
  };

  for (const t of targets) {
    const url = `${BASE_URL}${t.path}`;
    const tempFile = resolve(QA_DIR, `temp_lh_${t.name}.json`);
    console.log(`  Running Lighthouse on ${t.path}...`);
    try {
      execSync(
        `npx.cmd lighthouse "${url}" --chrome-flags="--headless" --output=json --output-path="${tempFile}" --only-categories=performance --quiet`,
        { stdio: "inherit" }
      );
      const data = JSON.parse(readFileSync(tempFile, "utf-8"));
      const perfScore = Math.round(data.categories.performance.score * 100);
      const audits = data.audits;
      results.pages[t.name] = {
        path: t.path,
        performance: perfScore,
        lcp: audits["largest-contentful-paint"]?.displayValue || audits["largest-contentful-paint"]?.numericValue,
        cls: audits["cumulative-layout-shift"]?.displayValue || audits["cumulative-layout-shift"]?.numericValue,
        tbt: audits["total-blocking-time"]?.displayValue || audits["total-blocking-time"]?.numericValue,
      };
      console.log(`  ✓ ${t.path} -> Perf: ${perfScore}, LCP: ${results.pages[t.name].lcp}, CLS: ${results.pages[t.name].cls}, TBT: ${results.pages[t.name].tbt}`);
    } catch (e) {
      console.error(`  ✗ Error:`, e.message);
    }
  }

  writeFileSync(join(QA_DIR, "baseline-metrics.json"), JSON.stringify(results, null, 2));
}

async function main() {
  await captureScreenshots();
  await runLighthouse();
  console.log("\nBaseline preparation complete!\n");
}

main().catch(console.error);
