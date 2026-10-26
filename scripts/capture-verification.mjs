import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Capture Header & Hero at 1672px
  const p1 = await browser.newPage();
  await p1.setViewport({ width: 1672, height: 941, deviceScaleFactor: 2 });
  await p1.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await p1.screenshot({ path: path.join(ARTIFACTS_DIR, 'decreased_header_1672.png') });
  await p1.close();

  // 2. Capture Header on mobile 390px
  const p2 = await browser.newPage();
  await p2.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await p2.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await p2.screenshot({ path: path.join(ARTIFACTS_DIR, 'decreased_header_390.png') });
  await p2.close();

  // 3. Capture Brand New Boom Lifts listing (now 2 models, no ZT-45J)
  const p3 = await browser.newPage();
  await p3.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await p3.goto('http://localhost:3000/brand-new/boom-lifts', { waitUntil: 'networkidle2' });
  await p3.screenshot({ path: path.join(ARTIFACTS_DIR, 'boom_lifts_2_models.png') });
  await p3.close();

  // 4. Capture Brand New page with HD scissor lift
  const p4 = await browser.newPage();
  await p4.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });
  await p4.goto('http://localhost:3000/brand-new', { waitUntil: 'networkidle2' });
  await p4.screenshot({ path: path.join(ARTIFACTS_DIR, 'brand_new_page_hd.png') });
  await p4.close();

  // 5. Capture Used page with HD boom & scissor lifts
  const p5 = await browser.newPage();
  await p5.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });
  await p5.goto('http://localhost:3000/used', { waitUntil: 'networkidle2' });
  await p5.screenshot({ path: path.join(ARTIFACTS_DIR, 'used_page_hd.png') });
  await p5.close();

  await browser.close();
  console.log('All verification screenshots captured!');
}

main().catch(console.error);
