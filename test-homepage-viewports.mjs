import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { name: "mobile_375px", width: 375, height: 812 },
  { name: "tablet_768px", width: 768, height: 1024 },
  { name: "desktop_1280px", width: 1280, height: 900 },
  { name: "desktop_1920px", width: 1920, height: 1080 },
];

async function run() {
  console.log("Launching Puppeteer Chrome...");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const screenshotsDir = path.resolve("screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const issues = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });

    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    try {
      console.log(`Checking http://localhost:3000/ at ${vp.name} (${vp.width}x${vp.height})...`);
      const response = await page.goto("http://localhost:3000/", {
        waitUntil: "networkidle2",
        timeout: 25000,
      });

      const status = response ? response.status() : 0;
      if (status !== 200 && status !== 304) {
        issues.push({
          vp: vp.name,
          issue: `HTTP status: ${status}`,
        });
      }

      // Scroll smoothly down the page to trigger all lazy-loaded images
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 400;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              setTimeout(resolve, 500);
            }
          }, 80);
        });
      });

      // Wait a moment for any lazy images to paint
      await new Promise((r) => setTimeout(r, 1000));

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        const maxScroll = Math.max(scrollWidth, bodyScrollWidth);
        const hasOverflow = maxScroll > docWidth + 1;

        let overflowingElement = null;
        if (hasOverflow) {
          const all = document.querySelectorAll("*");
          for (const el of all) {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 2) {
              overflowingElement = `${el.tagName}.${el.className} (right: ${rect.right}, docWidth: ${docWidth})`;
              break;
            }
          }
        }
        return { hasOverflow, maxScroll, docWidth, overflowingElement };
      });

      if (overflow.hasOverflow) {
        issues.push({
          vp: vp.name,
          issue: `Horizontal overflow: maxScroll=${overflow.maxScroll} > docWidth=${overflow.docWidth}. Element: ${overflow.overflowingElement}`,
        });
      }

      // Check broken images after scrolling
      const brokenImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll("img"));
        return imgs
          .filter((img) => img.complete && img.naturalWidth === 0 && img.src && !img.src.startsWith("data:"))
          .map((img) => img.src);
      });

      if (brokenImages.length > 0) {
        issues.push({
          vp: vp.name,
          issue: `Broken images: ${brokenImages.join(", ")}`,
        });
      }

      if (consoleErrors.length > 0) {
        issues.push({
          vp: vp.name,
          issue: `Console errors: ${consoleErrors.join("; ")}`,
        });
      }

      // Save screenshot
      const shotPath = path.join(screenshotsDir, `homepage_${vp.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: false });
      console.log(`✓ Saved screenshot to ${shotPath}`);

    } catch (err) {
      issues.push({
        vp: vp.name,
        issue: `Exception: ${err.message}`,
      });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log("\n=============================================");
  console.log(`VIEWPORT AUDIT RESULTS:`);
  console.log(`Checked 4 viewports (375px, 768px, 1280px, 1920px)`);
  console.log(`Issues found: ${issues.length}`);
  if (issues.length > 0) {
    issues.forEach((i) => console.log(`- [${i.vp}]: ${i.issue}`));
  } else {
    console.log("ALL 4 VIEWPORTS PASSED WITH ZERO BUGS!");
  }
  console.log("=============================================\n");

  if (issues.length > 0) {
    process.exit(1);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
