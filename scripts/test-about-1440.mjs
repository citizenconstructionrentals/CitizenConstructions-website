import puppeteer from 'puppeteer';
import { resolve, join } from 'path';
import sharp from 'sharp';
import pixelmatch from 'pixelmatch';

const BASE_URL = 'http://localhost:3000';

async function testCapture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  await page.goto(`${BASE_URL}/about`, { waitUntil: "domcontentloaded", timeout: 30000 });

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
      html {
        scroll-behavior: auto !important;
      }
    `,
  });

  await page.evaluate(async () => {
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
      v.load();
    });

    if (document.fonts) {
      await document.fonts.ready;
    }

    const distance = 400;
    while (window.scrollY + window.innerHeight < document.body.scrollHeight) {
      window.scrollBy(0, distance);
    }
    window.scrollTo(0, 0);
  });

  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 800);
        });
      })
    );
  });

  await new Promise((r) => setTimeout(r, 400));

  const testPath = resolve('qa/diff-wide/test_about_1440_full.png');
  await page.screenshot({ path: testPath, fullPage: true });
  await browser.close();

  // Compare with baseline
  const baseMeta = await sharp('qa/baseline-wide/about_1440x900_full.png').metadata();
  const baseBuf = await sharp('qa/baseline-wide/about_1440x900_full.png').ensureAlpha().raw().toBuffer();
  const testBuf = await sharp(testPath).ensureAlpha().raw().toBuffer();

  const diffBuf = Buffer.alloc(baseMeta.width * baseMeta.height * 4);
  const diff = pixelmatch(baseBuf, testBuf, diffBuf, baseMeta.width, baseMeta.height, { threshold: 0.1 });
  const pct = (diff / (baseMeta.width * baseMeta.height)) * 100;
  console.log(`Diff: ${diff} pixels (${pct.toFixed(4)}%)`);

  if (pct <= 0.02) {
    console.log('PASS!');
  } else {
    console.log('Diff is above 0.02%');
  }
}

testCapture();
