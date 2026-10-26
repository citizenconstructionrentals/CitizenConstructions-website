import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import fs from "fs";

async function audit(url, isDesktop = false) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--disable-gpu", "--no-sandbox"],
    chromePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

  const opts = {
    logLevel: "error",
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    port: chrome.port,
    ...(isDesktop ? { preset: "desktop" } : {}),
  };

  const res = await lighthouse(url, opts);
  await chrome.kill();
  return res;
}

async function run() {
  const url = "http://localhost:3000/";
  try {
    await fetch(url);
  } catch (e) {}

  console.log(`Running Mobile Lighthouse audit on ${url}...`);
  const mobileResult = await audit(url, false);

  console.log(`Running Desktop Lighthouse audit on ${url}...`);
  const desktopResult = await audit(url, true);

  const mCat = JSON.parse(mobileResult.report).categories;
  const dCat = JSON.parse(desktopResult.report).categories;

  console.log("\n=======================================================");
  console.log("LIGHTHOUSE AUDIT SCORES (TARGET: 90+):");
  console.log("-------------------------------------------------------");
  console.log("CATEGORY              | MOBILE      | DESKTOP");
  console.log("-------------------------------------------------------");
  for (const key of Object.keys(mCat)) {
    const mScore = Math.round(mCat[key].score * 100);
    const dScore = Math.round(dCat[key].score * 100);
    console.log(`${mCat[key].title.padEnd(21)} | ${String(mScore).padStart(3)}/100   | ${String(dScore).padStart(3)}/100`);
  }
  console.log("=======================================================\n");

  fs.writeFileSync("lighthouse-report-mobile.json", mobileResult.report);
  fs.writeFileSync("lighthouse-report-desktop.json", desktopResult.report);
  fs.writeFileSync("lighthouse-report.json", desktopResult.report);
}

run().catch((err) => {
  console.error("Lighthouse error:", err);
  process.exit(1);
});
