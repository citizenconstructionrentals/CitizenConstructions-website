import puppeteer from 'puppeteer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const QA_DIR = path.resolve('qa/mobile-hero');
if (!fs.existsSync(QA_DIR)) {
  fs.mkdirSync(QA_DIR, { recursive: true });
}

const PHONE_SIZES = [
  { width: 390, height: 845, dsf: 2.1846153846, label: '390x845_target_scale' },
  { width: 320, height: 568, dsf: 2, label: '320x568' },
  { width: 360, height: 740, dsf: 2, label: '360x740' },
  { width: 375, height: 667, dsf: 2, label: '375x667' },
  { width: 412, height: 915, dsf: 2, label: '412x915' },
  { width: 430, height: 932, dsf: 2, label: '430x932' },
  { width: 600, height: 900, dsf: 2, label: '600x900' },
];

async function stabilize(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition: none !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }
    `,
  });

  await page.evaluate(async () => {
    if (document.fonts) await document.fonts.ready;
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 1000);
        });
      })
    );
  });

  await new Promise((r) => setTimeout(r, 600));
}

async function run() {
  console.log('Testing Phone Hero across phone sizes...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const size of PHONE_SIZES) {
      console.log(`Processing ${size.label} (${size.width}x${size.height}, dsf: ${size.dsf.toFixed(2)})...`);
      const page = await browser.newPage();
      await page.setViewport({
        width: size.width,
        height: size.height,
        deviceScaleFactor: size.dsf,
      });

      await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
      await stabilize(page);

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      console.log(`  Horizontal overflow: ${overflow ? 'FAIL' : 'PASS (None)'}`);

      const outPath = path.join(QA_DIR, `phone_${size.label}.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`  ✓ Saved: ${outPath}`);

      await page.close();
    }

    // Now generate side-by-side and 50% overlay with target
    const targetPath = path.resolve('design-reference/hero-mobile-target.png');
    const actualPath = path.join(QA_DIR, 'phone_390x845_target_scale.png');

    if (fs.existsSync(targetPath) && fs.existsSync(actualPath)) {
      console.log('Generating side-by-side comparison...');
      const targetMeta = await sharp(targetPath).metadata();
      const actualMeta = await sharp(actualPath).metadata();
      console.log('Target meta:', targetMeta.width, targetMeta.height);
      console.log('Actual meta:', actualMeta.width, actualMeta.height);

      // Resize actual to exact target dimensions if slight rounding difference
      const actualBuf = await sharp(actualPath)
        .resize(targetMeta.width, targetMeta.height)
        .png()
        .toBuffer();

      // 1. Side by side
      const sbsWidth = targetMeta.width * 2;
      const sbsHeight = targetMeta.height;
      await sharp({
        create: {
          width: sbsWidth,
          height: sbsHeight,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
      })
        .composite([
          { input: targetPath, left: 0, top: 0 },
          { input: actualBuf, left: targetMeta.width, top: 0 },
        ])
        .png()
        .toFile(path.join(QA_DIR, 'side_by_side_target_vs_actual.png'));
      console.log('✓ Saved side_by_side_target_vs_actual.png');

      // 2. 50% Overlay
      const semiActual = await sharp(actualBuf)
        .ensureAlpha(0.5)
        .toBuffer();

      await sharp(targetPath)
        .composite([{ input: semiActual, blend: 'over' }])
        .png()
        .toFile(path.join(QA_DIR, 'overlay_50pct.png'));
      console.log('✓ Saved overlay_50pct.png');
    }
  } finally {
    await browser.close();
  }
}

run();
