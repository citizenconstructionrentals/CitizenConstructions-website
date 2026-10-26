import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const pagesToTest = [
    { url: 'http://localhost:3000/brand-new', name: 'page_brand_new_1440' },
    { url: 'http://localhost:3000/used', name: 'page_used_1440' },
    { url: 'http://localhost:3000/used/boom-lifts', name: 'page_used_boom_lifts_1440' },
  ];

  for (const p of pagesToTest) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });
    await page.goto(p.url, { waitUntil: 'networkidle2' });
    
    // Wait for all images to finish loading
    await page.evaluate(async () => {
      const imgs = Array.from(document.querySelectorAll('img'));
      await Promise.all(imgs.map(img => {
        if (img.complete) return;
        return new Promise(resolve => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      }));
    });

    const outPath = path.join(ARTIFACTS_DIR, `${p.name}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`Captured: ${outPath}`);

    await page.close();
  }

  await browser.close();
}

main().catch(console.error);
