const puppeteer = require("puppeteer");
const path = require("path");

const ARTIFACT_DIR = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad";

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Listen for console errors
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  const viewports = [
    { name: "1672x941", width: 1672, height: 941 },
    { name: "1920x1080", width: 1920, height: 1080 },
    { name: "1280x800", width: 1280, height: 800 },
  ];

  console.log("=== RUNNING DESKTOP CHECKS ===");

  for (const vp of viewports) {
    console.log(`\nTesting viewport ${vp.name}...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
    await page.waitForSelector("header", { visible: true });

    // 1. BRAND NEW FLEET
    console.log(`- Hovering Brand New Fleet at ${vp.name}...`);
    // Find Brand New link
    const brandNewTrigger = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll("header nav a"));
      return links.find((l) => l.textContent.includes("BRAND NEW FLEET"));
    });

    const triggerBox = await brandNewTrigger.boundingBox();
    // Hover trigger
    await page.mouse.move(triggerBox.x + triggerBox.width / 2, triggerBox.y + triggerBox.height / 2);
    // Wait for 80ms hover intent + 160ms animation
    await new Promise((r) => setTimeout(r, 400));

    // Wait for panel
    await page.waitForSelector("#mega-menu-brand-new", { visible: true });

    // Save screenshot
    const brandNewPath = path.join(ARTIFACT_DIR, `after_brand_new_dropdown_${vp.name}.png`);
    await page.screenshot({ path: brandNewPath, fullPage: false });
    console.log(`  Saved ${brandNewPath}`);

    // Verify Geometry and Single-Line Overflow
    const brandNewReport = await page.evaluate(() => {
      const panel = document.getElementById("mega-menu-brand-new");
      const panelRect = panel.getBoundingClientRect();
      const header = document.querySelector("header");
      const headerRect = header.getBoundingClientRect();

      // Check gap: top of panel - bottom of header
      const gap = panelRect.top - headerRect.bottom;
      const insideViewport =
        panelRect.left >= 0 &&
        panelRect.right <= window.innerWidth &&
        panelRect.top >= 0;

      // Check all titles, links, footer
      const titles = Array.from(panel.querySelectorAll("h3")).map((el) => ({
        text: el.textContent.trim(),
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        oneLine: el.scrollWidth <= el.clientWidth,
      }));

      const cardLinks = Array.from(panel.querySelectorAll("a.group div.border-t span")).map((el) => ({
        text: el.textContent.trim(),
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        oneLine: el.scrollWidth <= el.clientWidth,
      }));

      const footerHelper = panel.querySelector("div.border > p");
      const footerLink = panel.querySelector("div.border a");

      return {
        gap,
        panelRect: { left: panelRect.left, right: panelRect.right, width: panelRect.width },
        insideViewport,
        titles,
        cardLinks,
        footerHelper: footerHelper ? {
          text: footerHelper.textContent.trim(),
          scrollWidth: footerHelper.scrollWidth,
          clientWidth: footerHelper.clientWidth,
          oneLine: footerHelper.scrollWidth <= footerHelper.clientWidth,
        } : null,
        footerLink: footerLink ? {
          text: footerLink.textContent.trim(),
          scrollWidth: footerLink.scrollWidth,
          clientWidth: footerLink.clientWidth,
          oneLine: footerLink.scrollWidth <= footerLink.clientWidth,
        } : null,
      };
    });

    console.log(`  Brand New Panel gap: ${brandNewReport.gap}px (expected ~10px)`);
    console.log(`  Inside viewport: ${brandNewReport.insideViewport}`);
    console.log(`  Titles on one line:`, brandNewReport.titles.every((t) => t.oneLine));
    console.log(`  Card links on one line:`, brandNewReport.cardLinks.every((l) => l.oneLine));
    console.log(`  Footer helper on one line:`, brandNewReport.footerHelper ? brandNewReport.footerHelper.oneLine : false);
    console.log(`  Footer link on one line:`, brandNewReport.footerLink ? brandNewReport.footerLink.oneLine : false);

    // 2. SWITCH TO USED FLEET INSTANTLY
    console.log(`- Hovering Used Fleet at ${vp.name}...`);
    const usedTrigger = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll("header nav a"));
      return links.find((l) => l.textContent.includes("USED FLEET"));
    });

    const usedTriggerBox = await usedTrigger.boundingBox();
    await page.mouse.move(usedTriggerBox.x + usedTriggerBox.width / 2, usedTriggerBox.y + usedTriggerBox.height / 2);
    // Instant switch (0ms) + small animation wait
    await new Promise((r) => setTimeout(r, 300));

    await page.waitForSelector("#mega-menu-used", { visible: true });
    const usedPath = path.join(ARTIFACT_DIR, `after_used_dropdown_${vp.name}.png`);
    await page.screenshot({ path: usedPath, fullPage: false });
    console.log(`  Saved ${usedPath}`);

    const usedReport = await page.evaluate(() => {
      const panel = document.getElementById("mega-menu-used");
      const panelRect = panel.getBoundingClientRect();
      const header = document.querySelector("header");
      const headerRect = header.getBoundingClientRect();

      const gap = panelRect.top - headerRect.bottom;
      const insideViewport =
        panelRect.left >= 0 &&
        panelRect.right <= window.innerWidth &&
        panelRect.top >= 0;

      const titles = Array.from(panel.querySelectorAll("h3")).map((el) => ({
        text: el.textContent.trim(),
        oneLine: el.scrollWidth <= el.clientWidth,
      }));

      const cardLinks = Array.from(panel.querySelectorAll("a.group div.border-t span")).map((el) => ({
        text: el.textContent.trim(),
        oneLine: el.scrollWidth <= el.clientWidth,
      }));

      const footerHelper = panel.querySelector("div.border > p");
      const footerLink = panel.querySelector("div.border a");

      return {
        gap,
        insideViewport,
        titles,
        cardLinks,
        footerHelperOneLine: footerHelper ? footerHelper.scrollWidth <= footerHelper.clientWidth : false,
        footerLinkOneLine: footerLink ? footerLink.scrollWidth <= footerLink.clientWidth : false,
      };
    });

    console.log(`  Used Panel gap: ${usedReport.gap}px`);
    console.log(`  Inside viewport: ${usedReport.insideViewport}`);
    console.log(`  Titles on one line:`, usedReport.titles.every((t) => t.oneLine));
    console.log(`  Card links on one line:`, usedReport.cardLinks.every((l) => l.oneLine));
    console.log(`  Footer helper on one line:`, usedReport.footerHelperOneLine);
    console.log(`  Footer link on one line:`, usedReport.footerLinkOneLine);

    // Close panel by moving mouse to home link
    const homeLink = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll("header nav a"));
      return links.find((l) => l.textContent.trim() === "HOME");
    });
    const homeBox = await homeLink.boundingBox();
    await page.mouse.move(homeBox.x + homeBox.width / 2, homeBox.y + homeBox.height / 2);
    // Wait for 220ms close timer
    await new Promise((r) => setTimeout(r, 400));
  }

  // 3. TEST HOVER BRIDGE (Moving mouse from trigger down into panel and back)
  console.log("\n=== TESTING HOVER BRIDGE & MOUSE MOVEMENT ===");
  await page.setViewport({ width: 1672, height: 941 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  const bTrigger = await page.evaluateHandle(() => {
    const links = Array.from(document.querySelectorAll("header nav a"));
    return links.find((l) => l.textContent.includes("BRAND NEW FLEET"));
  });
  const bBox = await bTrigger.boundingBox();
  // Hover trigger
  await page.mouse.move(bBox.x + bBox.width / 2, bBox.y + bBox.height / 2);
  await new Promise((r) => setTimeout(r, 200));

  // Move mouse down through the 10px gap into the panel
  console.log("Moving mouse slowly down from trigger through gap into panel...");
  for (let dy = 0; dy <= 60; dy += 5) {
    await page.mouse.move(bBox.x + bBox.width / 2, bBox.y + bBox.height + dy);
    await new Promise((r) => setTimeout(r, 15));
  }
  // Check if panel is still open
  const isStillOpen = await page.evaluate(() => {
    return document.getElementById("mega-menu-brand-new") !== null;
  });
  console.log(`Panel remained open during traversal: ${isStillOpen}`);

  // Move back up to trigger
  console.log("Moving mouse back up into trigger...");
  for (let dy = 60; dy >= 0; dy -= 5) {
    await page.mouse.move(bBox.x + bBox.width / 2, bBox.y + bBox.height + dy);
    await new Promise((r) => setTimeout(r, 15));
  }
  const isStillOpenAfterReturn = await page.evaluate(() => {
    return document.getElementById("mega-menu-brand-new") !== null;
  });
  console.log(`Panel remained open after returning to trigger: ${isStillOpenAfterReturn}`);

  // 4. TEST KEYBOARD ACCESSIBILITY & ESCAPE
  console.log("\n=== TESTING KEYBOARD NAVIGATION ===");
  // Focus trigger via keyboard
  await page.evaluate(() => {
    const trigger = Array.from(document.querySelectorAll("header nav a")).find((l) =>
      l.textContent.includes("BRAND NEW FLEET")
    );
    trigger.focus();
  });
  // Press ArrowDown to open and focus first card
  await page.keyboard.press("ArrowDown");
  await new Promise((r) => setTimeout(r, 300));

  const focusedAfterArrowDown = await page.evaluate(() => {
    return document.activeElement ? document.activeElement.getAttribute("href") : null;
  });
  console.log(`Focused element after ArrowDown: ${focusedAfterArrowDown} (expected /brand-new/scissor-lifts)`);

  // Press Escape to close and refocus trigger
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 200));
  const panelClosedAfterEsc = await page.evaluate(() => {
    return document.getElementById("mega-menu-brand-new") === null;
  });
  const triggerRefocusedAfterEsc = await page.evaluate(() => {
    return document.activeElement ? document.activeElement.textContent.includes("BRAND NEW FLEET") : false;
  });
  console.log(`Panel closed on Escape: ${panelClosedAfterEsc}`);
  console.log(`Trigger refocused on Escape: ${triggerRefocusedAfterEsc}`);

  // 5. TEST MOBILE DRAWER ACCORDION (390x844)
  console.log("\n=== TESTING MOBILE DRAWER ACCORDION (390x844) ===");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  // Open mobile drawer
  const hamburger = await page.waitForSelector('button[aria-label="Toggle navigation menu"]', { visible: true });
  await hamburger.click();
  await new Promise((r) => setTimeout(r, 300));

  // Open Brand New Accordion
  const brandNewAccordionBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("nav button"));
    return btns.find((b) => b.textContent.includes("Brand New Fleet"));
  });
  await brandNewAccordionBtn.click();
  await new Promise((r) => setTimeout(r, 350));

  // Open Used Accordion
  const usedAccordionBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll("nav button"));
    return btns.find((b) => b.textContent.includes("Used Fleet"));
  });
  await usedAccordionBtn.click();
  await new Promise((r) => setTimeout(r, 350));

  // Capture screenshot of expanded mobile drawer
  const mobileDrawerPath = path.join(ARTIFACT_DIR, "mobile_drawer_accordions_390x844.png");
  await page.screenshot({ path: mobileDrawerPath, fullPage: false });
  console.log(`Saved mobile drawer screenshot: ${mobileDrawerPath}`);

  // Programmatically verify mobile card titles and min-height >= 56px
  const mobileCardCheck = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("nav a.min-h-\\[56px\\]"));
    return cards.map((c) => {
      const title = c.querySelector("h4");
      const rect = c.getBoundingClientRect();
      return {
        title: title ? title.textContent.trim() : "",
        height: rect.height,
        satisfies56px: rect.height >= 56,
        oneLine: title ? title.scrollWidth <= title.clientWidth : false,
      };
    });
  });
  console.log(`Mobile cards check:`, mobileCardCheck);

  console.log(`\nConsole errors encountered: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error("Errors:", consoleErrors);
  }

  await browser.close();
  console.log("\n=== ALL CHECKS FINISHED ===");
}

main().catch((err) => {
  console.error("Execution failed:", err);
  process.exit(1);
});
