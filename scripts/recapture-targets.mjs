import puppeteer from 'puppeteer';
import { resolve, join } from 'path';

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = resolve('qa/after-wide');

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
      html {
        scroll-behavior: auto !important;
      }
    `,
  });

  await page.evaluate(async () => {
    const videos = Array.from(document.querySelectorAll("video"));
    await Promise.all(
      videos.map((v) => {
        v.pause();
        v.currentTime = 0;
        return new Promise((resolve) => {
          if (v.seeking) {
            v.onseeked = resolve;
            setTimeout(resolve, 800);
          } else {
            resolve();
          }
        });
      })
    );

    if (document.fonts) {
      await document.fonts.ready;
    }

    const distance = 400;
    while (window.scrollY + window.innerHeight < document.body.scrollHeight) {
      window.scrollBy(0, distance);
    }
    window.scrollTo(0, 0);
  });

  await new Promise((r) => setTimeout(r, 800));

  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 1200);
        });
      })
    );
  });

  await new Promise((r) => setTimeout(r, 800));
}

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    // 1. brand_new_768x1024
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
      await page.goto(`${BASE_URL}/brand-new`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await stabilize(page);
      await page.screenshot({ path: join(OUTPUT_DIR, "brand_new_768x1024_fold.png"), fullPage: false });
      await page.screenshot({ path: join(OUTPUT_DIR, "brand_new_768x1024_full.png"), fullPage: true });
      console.log("Recaptured brand_new 768x1024");
      await page.close();
    }

    // 2. about_1440x900
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.goto(`${BASE_URL}/about`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await stabilize(page);
      await page.screenshot({ path: join(OUTPUT_DIR, "about_1440x900_fold.png"), fullPage: false });
      await page.screenshot({ path: join(OUTPUT_DIR, "about_1440x900_full.png"), fullPage: true });
      console.log("Recaptured about 1440x900");
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

run();
