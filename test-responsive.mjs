import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE_URL = "http://localhost:3000";

const VIEWPORTS = [
  { name: "mobile_375px", width: 375, height: 812 },
  { name: "tablet_768px", width: 768, height: 1024 },
  { name: "desktop_1440px", width: 1440, height: 900 },
];

const PAGES = [
  { route: "/", name: "home" },
  { route: "/brand-new", name: "brand-new" },
  { route: "/brand-new/scissor-lifts", name: "scissor-listing" },
  { route: "/brand-new/scissor-lifts/gtjz12", name: "scissor-gtjz12" },
  { route: "/brand-new/boom-lifts", name: "boom-listing" },
  { route: "/brand-new/boom-lifts/sl28t", name: "boom-sl28t" },
  { route: "/brand-new/boom-lifts/zt-45j", name: "boom-zt45j" },
  { route: "/used", name: "used" },
  { route: "/used/scissor-lifts", name: "used-scissor" },
  { route: "/used/boom-lifts", name: "used-boom" },
  { route: "/about", name: "about" },
  { route: "/contact", name: "contact" },
];

async function run() {
  fs.mkdirSync("screenshots", { recursive: true });
  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  const page = await browser.newPage();
  const issues = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log(`[Browser Console Error] ${msg.text()}`);
      issues.push(`Console Error: ${msg.text()}`);
    }
  });

  for (const p of PAGES) {
    for (const v of VIEWPORTS) {
      await page.setViewport({ width: v.width, height: v.height });
      const url = `${BASE_URL}${p.route}`;
      try {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });

        // Check for horizontal overflow (layout bug where page content spills past viewport)
        const overflow = await page.evaluate(() => {
          const docWidth = document.documentElement.offsetWidth;
          const bodyWidth = document.body.scrollWidth;
          const winWidth = window.innerWidth;
          return {
            hasOverflow: bodyWidth > winWidth + 2, // 2px margin for rounding
            docWidth,
            bodyWidth,
            winWidth,
          };
        });

        if (overflow.hasOverflow) {
          const bug = `[Layout Overflow Bug] ${p.route} at ${v.name}: body scrollWidth (${overflow.bodyWidth}px) exceeds window width (${overflow.winWidth}px)`;
          console.warn(bug);
          issues.push(bug);
        }

        // Check for broken images
        const brokenImages = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll("img"));
          return imgs
            .filter((img) => img.complete && img.naturalWidth === 0)
            .map((img) => img.src);
        });

        if (brokenImages.length > 0) {
          const bug = `[Broken Images] ${p.route} at ${v.name}: ${brokenImages.join(", ")}`;
          console.warn(bug);
          issues.push(bug);
        }

        // Capture screenshot
        const screenshotPath = `screenshots/${p.name}_${v.name}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`✓ Checked ${p.route} @ ${v.name} -> Saved ${screenshotPath}`);
      } catch (err) {
        console.error(`Failed ${url} at ${v.name}:`, err.message);
        issues.push(`Load error for ${p.route} at ${v.name}: ${err.message}`);
      }
    }
  }

  await browser.close();

  console.log("\n=============================");
  console.log(`Total checks: ${PAGES.length * VIEWPORTS.length}`);
  console.log(`Total issues found: ${issues.length}`);
  if (issues.length > 0) {
    console.log("Issues summary:");
    issues.forEach((i) => console.log(" - " + i));
  } else {
    console.log("ALL RESPONSIVE LAYOUT CHECKS PASSED WITH 0 BUGS!");
  }
  console.log("=============================\n");
}

run().catch(console.error);
