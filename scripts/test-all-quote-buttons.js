const puppeteer = require("puppeteer");
const path = require("path");

const ARTIFACT_DIR = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad";

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  await page.setViewport({ width: 1672, height: 941 });

  // TEST 1: MEGA MENU QUOTE BUTTON & CLOSE VIA CROSS BUTTON
  console.log("\n=== TEST 1: Mega-Menu Quote Button & Close Via Cross ===");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Hover Brand New Fleet
  const bnTrigger = await page.evaluateHandle(() => {
    const links = Array.from(document.querySelectorAll("header nav a"));
    return links.find((l) => l.textContent.includes("BRAND NEW FLEET"));
  });
  const bnBox = await bnTrigger.boundingBox();
  await page.mouse.move(bnBox.x + bnBox.width / 2, bnBox.y + bnBox.height / 2);
  await new Promise((r) => setTimeout(r, 300));

  // Find & click "Get Rental Quote" in MegaMenuPanel
  const mmQuoteBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("#mega-menu-brand-new button"));
    return btns.find((b) => b.textContent.includes("Get Rental Quote"));
  });
  console.log("  Found Mega-Menu quote button:", mmQuoteBtn !== null);
  await mmQuoteBtn.click();
  await new Promise((r) => setTimeout(r, 300));

  // Verify modal is open and inspect its numbers
  const modalInfo = await page.evaluate(() => {
    const dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return { open: false };
    const rect = dialog.getBoundingClientRect();
    const links = Array.from(dialog.querySelectorAll("a"));
    const phone1Link = links.find((l) => l.href.includes("919811203530"));
    const phone2Link = links.find((l) => l.href.includes("918178386750"));
    const text = dialog.textContent;
    const hasNum1 = text.includes("98112 03530");
    const hasNum2 = text.includes("81783 86750");
    const closeBtn = dialog.querySelector('button[aria-label="Close quote modal"]');
    const zIndex = window.getComputedStyle(dialog).zIndex;

    return {
      open: true,
      zIndex,
      hasNum1,
      hasNum2,
      hasPhone1Link: !!phone1Link,
      hasPhone2Link: !!phone2Link,
      hasCloseBtn: !!closeBtn,
      dialogRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
    };
  });
  console.log("  Modal open:", modalInfo.open);
  console.log("  Modal z-index:", modalInfo.zIndex, "(expected 99999)");
  console.log("  Option 1 (+91 98112 03530) present:", modalInfo.hasNum1 && modalInfo.hasPhone1Link);
  console.log("  Option 2 (+91 81783 86750) present:", modalInfo.hasNum2 && modalInfo.hasPhone2Link);
  console.log("  Close cross button present:", modalInfo.hasCloseBtn);

  // Take screenshot of open modal
  const modalScreenshotPath = path.join(ARTIFACT_DIR, "quote_modal_popup_verified.png");
  await page.screenshot({ path: modalScreenshotPath });
  console.log(`  Saved screenshot: ${modalScreenshotPath}`);

  // Click cross button to close
  const crossBtn = await page.waitForSelector('button[aria-label="Close quote modal"]', { visible: true });
  await crossBtn.click();
  await new Promise((r) => setTimeout(r, 200));

  const closedByCross = await page.evaluate(() => document.querySelector('div[role="dialog"]') === null);
  console.log("  Modal closed cleanly via cross button:", closedByCross);

  // TEST 2: HERO QUOTE BUTTON & CLOSE VIA CLICK OUTSIDE
  console.log("\n=== TEST 2: Hero Quote Button & Close Via Click Outside ===");
  const heroQuoteBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("section button"));
    return btns.find((b) => b.textContent.includes("GET RENTAL QUOTE"));
  });
  console.log("  Found Hero quote button:", heroQuoteBtn !== null);
  await heroQuoteBtn.click();
  await new Promise((r) => setTimeout(r, 300));

  const heroModalOpen = await page.evaluate(() => document.querySelector('div[role="dialog"]') !== null);
  console.log("  Hero modal opened:", heroModalOpen);

  // Click outside (at 100, 100 on the backdrop overlay)
  console.log("  Clicking outside the modal at (100, 100)...");
  await page.mouse.click(100, 100);
  await new Promise((r) => setTimeout(r, 250));

  const closedByClickOutside = await page.evaluate(() => document.querySelector('div[role="dialog"]') === null);
  console.log("  Modal closed cleanly via click outside:", closedByClickOutside);

  // TEST 3: HEADER "GET A QUOTE" BUTTON & ESCAPE KEY
  console.log("\n=== TEST 3: Header GET A QUOTE Button & Escape Key ===");
  const headerQuoteBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("header button"));
    return btns.find((b) => b.textContent.includes("GET A QUOTE"));
  });
  console.log("  Found Header GET A QUOTE button:", headerQuoteBtn !== null);
  await headerQuoteBtn.click();
  await new Promise((r) => setTimeout(r, 300));

  const headerModalOpen = await page.evaluate(() => document.querySelector('div[role="dialog"]') !== null);
  console.log("  Header modal opened:", headerModalOpen);

  // Press Escape
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 200));
  const closedByEscape = await page.evaluate(() => document.querySelector('div[role="dialog"]') === null);
  console.log("  Modal closed cleanly via Escape key:", closedByEscape);

  // TEST 4: MACHINE CARD ON /brand-new (Ensuring no CSS transform clipping!)
  console.log("\n=== TEST 4: Machine Card on /brand-new ===");
  await page.goto("http://localhost:3000/brand-new", { waitUntil: "networkidle0" });

  const cardQuoteBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    return btns.find((b) => b.textContent.includes("Get Rental Quote"));
  });
  console.log("  Found card quote button on /brand-new:", cardQuoteBtn !== null);
  await cardQuoteBtn.click();
  await new Promise((r) => setTimeout(r, 300));

  const cardModalInfo = await page.evaluate(() => {
    const dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return { open: false };
    const rect = dialog.getBoundingClientRect();
    // Verify it is not trapped inside a small card: width should be full viewport!
    const isFullViewport = rect.width === window.innerWidth && rect.height === window.innerHeight;
    return { open: true, isFullViewport, width: rect.width, height: rect.height };
  });
  console.log("  Card modal opened full viewport:", cardModalInfo);

  // Click outside to close
  await page.mouse.click(50, 50);
  await new Promise((r) => setTimeout(r, 200));
  const cardModalClosed = await page.evaluate(() => document.querySelector('div[role="dialog"]') === null);
  console.log("  Card modal closed on click outside:", cardModalClosed);

  // TEST 5: FOOTER QUOTE BUTTON
  console.log("\n=== TEST 5: Footer Quote Button ===");
  const footerQuoteBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("footer button"));
    return btns.find((b) => b.textContent.includes("Get Rental Quote"));
  });
  console.log("  Found footer quote button:", footerQuoteBtn !== null);
  await footerQuoteBtn.click();
  await new Promise((r) => setTimeout(r, 300));
  const footerModalOpen = await page.evaluate(() => document.querySelector('div[role="dialog"]') !== null);
  console.log("  Footer quote modal opened:", footerModalOpen);
  await page.mouse.click(50, 50);
  await new Promise((r) => setTimeout(r, 200));

  // TEST 6: MOBILE VIEWPORT (390x844)
  console.log("\n=== TEST 6: Mobile Viewport (390x844) ===");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Click mobile sticky bar WhatsApp button
  const mobileBarBtn = await page.waitForSelector('aside[aria-label="Quick contact bar"] button', { visible: true });
  await mobileBarBtn.click();
  await new Promise((r) => setTimeout(r, 300));

  const mobileModalOpen = await page.evaluate(() => document.querySelector('div[role="dialog"]') !== null);
  console.log("  Mobile sticky bar modal opened:", mobileModalOpen);

  const mobileModalScreenshot = path.join(ARTIFACT_DIR, "mobile_quote_modal_verified.png");
  await page.screenshot({ path: mobileModalScreenshot });
  console.log(`  Saved mobile modal screenshot: ${mobileModalScreenshot}`);

  // Tap outside at (50, 50)
  await page.mouse.click(50, 50);
  await new Promise((r) => setTimeout(r, 250));
  const mobileModalClosed = await page.evaluate(() => document.querySelector('div[role="dialog"]') === null);
  console.log("  Mobile modal closed via tap outside:", mobileModalClosed);

  console.log(`\nConsole errors encountered across all tests: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error("Errors:", consoleErrors);
  }

  await browser.close();
  console.log("\n=== ALL MODAL TESTS FINISHED ===");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
