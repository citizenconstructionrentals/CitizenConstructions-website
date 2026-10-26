const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleLogs = [];
  page.on("console", (msg) => consoleLogs.push(msg.text()));

  await page.setViewport({ width: 1672, height: 941 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // 1. Hover BRAND NEW FLEET to open mega-menu
  const brandNewTrigger = await page.evaluateHandle(() => {
    const links = Array.from(document.querySelectorAll("header nav a"));
    return links.find((l) => l.textContent.includes("BRAND NEW FLEET"));
  });
  const box = await brandNewTrigger.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise((r) => setTimeout(r, 300));

  // Find "Get Rental Quote" button in the mega-menu
  const quoteBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("#mega-menu-brand-new button"));
    return btns.find((b) => b.textContent.includes("Get Rental Quote"));
  });

  console.log("Found quote button in mega menu:", quoteBtn !== null);
  await quoteBtn.click();
  await new Promise((r) => setTimeout(r, 400));

  // Check modal state
  const modalState = await page.evaluate(() => {
    const dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return { open: false };
    const rect = dialog.getBoundingClientRect();
    const style = window.getComputedStyle(dialog);
    const zIndex = style.zIndex;
    const isVisible = rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    const title = dialog.querySelector("h3")?.textContent;
    const closeBtn = dialog.querySelector('button[aria-label="Close dialog"]');
    const header = document.querySelector("header");
    const headerZ = window.getComputedStyle(header).zIndex;
    return {
      open: true,
      isVisible,
      zIndex,
      headerZ,
      title,
      hasCloseBtn: !!closeBtn,
      dialogRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
    };
  });

  console.log("Modal state after clicking Get Rental Quote in mega menu:", modalState);

  // Take screenshot
  await page.screenshot({ path: "test_modal_click.png" });

  // Test clicking outside (at 100, 100 on the backdrop)
  console.log("Testing click outside at (100, 100)...");
  await page.mouse.click(100, 100);
  await new Promise((r) => setTimeout(r, 300));

  const afterClickOutside = await page.evaluate(() => {
    return document.querySelector('div[role="dialog"]') !== null;
  });
  console.log("Modal still exists after clicking outside:", afterClickOutside);

  await browser.close();
}

main().catch(console.error);
