const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad';

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1672, height: 941 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Hover BRAND NEW FLEET
  const brandNewTrigger = await page.$('a[href="/brand-new"]');
  if (brandNewTrigger) {
    await brandNewTrigger.hover();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'before_brand_new_dropdown_1672.png') });
    console.log('Saved before_brand_new_dropdown_1672.png');
  }

  // Hover USED FLEET
  const usedTrigger = await page.$('a[href="/used"]');
  if (usedTrigger) {
    await usedTrigger.hover();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'before_used_dropdown_1672.png') });
    console.log('Saved before_used_dropdown_1672.png');
  }

  await browser.close();
  console.log('Done before screenshots');
}

run().catch(console.error);
