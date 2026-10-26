import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Target table at 1672x941
const TARGETS = {
  header: { desc: "Header container", x: 0, y: 0, w: 1672, h: 125, tol: { x: 2, y: 2, w: 2, h: 4 } },
  logo: { desc: "Logo image", x: 72, y: 22, w: 254, h: 81, tol: { x: 4, y: 6, w: 6, h: 6 } },
  homePill: { desc: "HOME pill", x: 453, y: 42, w: 83, h: 40, tol: { x: 6, y: 6, w: 6, h: 6 } },
  brandNew: { desc: "BRAND NEW MACHINES nav", x: 580, y: 48, w: 177, h: 28, tol: { x: 8, y: 10, w: 16, h: 10 } },
  used: { desc: "USED MACHINES nav", x: 803, y: 48, w: 135, h: 28, tol: { x: 10, y: 10, w: 16, h: 10 } },
  about: { desc: "ABOUT nav", x: 986, y: 48, w: 47, h: 28, tol: { x: 12, y: 10, w: 10, h: 10 } },
  contact: { desc: "CONTACT nav", x: 1079, y: 48, w: 64, h: 28, tol: { x: 12, y: 10, w: 10, h: 10 } },
  phone: { desc: "Phone number link", x: 1238, y: 48, w: 175, h: 28, tol: { x: 14, y: 10, w: 20, h: 10 } },
  quoteBtn: { desc: "GET A QUOTE button", x: 1443, y: 30, w: 191, h: 64, tol: { x: 6, y: 6, w: 6, h: 6 } },

  // Hero section
  heroBadge: { desc: "Serving Indian Industry badge", x: 63, y: 236, w: 402, h: 37, tol: { x: 6, y: 6, w: 10, h: 6 } },
  h1: { desc: "H1 REACH NEW HEIGHTS", x: 66, y: 310, w: 709, h: 90, tol: { x: 6, y: 14, w: 25, h: 15 } },
  subtext: { desc: "Sub-text paragraph", x: 66, y: 428, w: 693, h: 68, tol: { x: 6, y: 12, w: 30, h: 12 } },
  heroWhatsAppBtn: { desc: "GET QUOTE ON WHATSAPP button", x: 66, y: 545, w: 358, h: 73, tol: { x: 6, y: 6, w: 8, h: 6 } },
  browseBtn: { desc: "BROWSE MACHINES button", x: 441, y: 545, w: 223, h: 72, tol: { x: 8, y: 6, w: 8, h: 6 } },
  callNow: { desc: "CALL NOW link", x: 697, y: 565, w: 114, h: 32, tol: { x: 10, y: 10, w: 15, h: 10 } },

  // Chips
  chip1: { desc: "Since 2000 chip", x: 66, y: 710, w: 181, h: 55, tol: { x: 6, y: 6, w: 8, h: 6 } },
  chip2: { desc: "Pan-India Service chip", x: 258, y: 710, w: 226, h: 55, tol: { x: 8, y: 6, w: 8, h: 6 } },
  chip3: { desc: "CE Certified chip", x: 495, y: 710, w: 168, h: 55, tol: { x: 8, y: 6, w: 8, h: 6 } },
  chip4: { desc: "2-Year Warranty chip", x: 675, y: 710, w: 319, h: 55, tol: { x: 8, y: 6, w: 10, h: 6 } },

  // Floating WhatsApp
  floatingWhatsApp: { desc: "Floating WhatsApp button", x: 1567, y: 808, w: 76, h: 76, tol: { x: 6, y: 6, w: 6, h: 6 } },
};

async function verify() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1672, height: 941, deviceScaleFactor: 1 });

  console.log("Navigating to http://localhost:3000 at 1672x941...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));

  // Extract bounding rects
  const rects = await page.evaluate(() => {
    function getRect(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    }

    const header = document.querySelector("header");
    const logo = header ? header.querySelector("a[href='/'] > div") : null;
    const nav = header ? header.querySelector("nav") : null;
    const navLinks = nav ? Array.from(nav.children) : [];
    const homePill = navLinks[0] || null;
    const brandNew = navLinks[1] || null;
    const used = navLinks[2] || null;
    const about = navLinks[3] || null;
    const contact = navLinks[4] || null;

    const phone = header ? header.querySelector("a[href^='tel:']") : null;
    const rightSec = phone ? phone.parentElement : null;
    const quoteBtn = rightSec ? rightSec.querySelector("button") : null;

    const heroSection = document.querySelector("section");
    const heroBadge = heroSection ? heroSection.querySelector(".rounded-full.border-\\[1\\.5px\\]") : null;
    const h1 = heroSection ? heroSection.querySelector("h1") : null;
    const subtext = heroSection ? heroSection.querySelector("p") : null;

    // Buttons
    const buttonsContainer = subtext ? subtext.nextElementSibling : null;
    const heroWhatsAppBtn = buttonsContainer ? buttonsContainer.querySelector("button") : null;
    const browseBtn = buttonsContainer ? buttonsContainer.querySelector("a[href='#fleet']") : null;
    const callNow = buttonsContainer ? buttonsContainer.querySelector("a[href^='tel:']") : null;

    // Chips
    const chipsContainer = heroSection ? heroSection.querySelector(".grid.grid-cols-2") : null;
    const chips = chipsContainer ? Array.from(chipsContainer.children) : [];

    // Floating WhatsApp
    const floatingWhatsApp = document.querySelector("button[aria-label='Instant WhatsApp Rental Inquiry']");

    return {
      header: getRect(header),
      logo: getRect(logo),
      homePill: getRect(homePill),
      brandNew: getRect(brandNew),
      used: getRect(used),
      about: getRect(about),
      contact: getRect(contact),
      phone: getRect(phone),
      quoteBtn: getRect(quoteBtn),
      heroBadge: getRect(heroBadge),
      h1: getRect(h1),
      subtext: getRect(subtext),
      heroWhatsAppBtn: getRect(heroWhatsAppBtn),
      browseBtn: getRect(browseBtn),
      callNow: getRect(callNow),
      chip1: getRect(chips[0]),
      chip2: getRect(chips[1]),
      chip3: getRect(chips[2]),
      chip4: getRect(chips[3]),
      floatingWhatsApp: getRect(floatingWhatsApp),
    };
  });

  console.log("\n=== BOUNDING RECT MEASUREMENT RESULTS (1672x941) ===");
  console.log(
    "Element".padEnd(20) +
    "Actual (x, y, w, h)".padEnd(28) +
    "Target (x, y, w, h)".padEnd(28) +
    "Status"
  );
  console.log("-".repeat(85));

  let passedAll = true;
  for (const [key, target] of Object.entries(TARGETS)) {
    const actual = rects[key];
    if (!actual) {
      console.log(`${key.padEnd(20)}: NOT FOUND!`);
      passedAll = false;
      continue;
    }

    const dx = Math.abs(actual.x - target.x);
    const dy = Math.abs(actual.y - target.y);
    const dw = Math.abs(actual.w - target.w);
    const dh = Math.abs(actual.h - target.h);

    const xOk = dx <= target.tol.x;
    const yOk = dy <= target.tol.y;
    const wOk = dw <= target.tol.w;
    const hOk = dh <= target.tol.h;

    const ok = xOk && yOk && wOk && hOk;
    if (!ok) passedAll = false;

    const actStr = `(${actual.x}, ${actual.y}, ${actual.w}, ${actual.h})`;
    const tgtStr = `(${target.x}, ${target.y}, ${target.w}, ${target.h})`;
    const diffStr = ok ? "✓ PASS" : `✗ FAIL (Δx:${dx}, Δy:${dy}, Δw:${dw}, Δh:${dh})`;

    console.log(`${target.desc.padEnd(20)} ${actStr.padEnd(28)} ${tgtStr.padEnd(28)} ${diffStr}`);
  }

  // Save screenshot
  const outDir = path.resolve("screenshots/comparisons");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const shotPath = path.join(outDir, "target_1672x941.png");
  await page.screenshot({ path: shotPath, fullPage: false });
  console.log(`\nSaved actual screenshot: ${shotPath}`);

  // Create side-by-side comparison with target
  const targetPath = "public/design-reference/home-target-1672.png";
  if (fs.existsSync(targetPath)) {
    const sideBySidePath = path.join(outDir, "side_by_side_1672.png");
    const tBuf = await sharp(targetPath).resize(836, 470).toBuffer();
    const aBuf = await sharp(shotPath).resize(836, 470).toBuffer();

    await sharp({
      create: {
        width: 1672,
        height: 520,
        channels: 4,
        background: { r: 11, g: 42, b: 99, alpha: 1 },
      },
    })
      .composite([
        { input: tBuf, left: 0, top: 40 },
        { input: aBuf, left: 836, top: 40 },
      ])
      .png()
      .toFile(sideBySidePath);

    console.log(`Saved side-by-side comparison: ${sideBySidePath}`);

    // Create 50% opacity overlay diff
    const overlayDiffPath = path.join(outDir, "overlay_diff_1672.png");
    const actualSemi = await sharp(shotPath)
      .ensureAlpha(0.5)
      .toBuffer();

    await sharp(targetPath)
      .composite([{ input: actualSemi, blend: "over" }])
      .png()
      .toFile(overlayDiffPath);

    console.log(`Saved 50% overlay diff: ${overlayDiffPath}`);
  }

  await browser.close();
  return passedAll;
}

verify().then((ok) => {
  console.log(ok ? "\n>>> ALL TARGET MEASUREMENTS PASSED! <<<" : "\n>>> Some measurements exceeded tolerance <<<");
  process.exit(ok ? 0 : 1);
}).catch(console.error);
