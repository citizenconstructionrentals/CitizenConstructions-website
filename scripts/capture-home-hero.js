const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad';

const viewports = [
  { width: 1672, height: 941, name: 'home_hero_1672x941.png' },
  { width: 1920, height: 1080, name: 'home_hero_1920x1080.png' },
  { width: 1440, height: 900, name: 'home_hero_1440x900.png' },
  { width: 768, height: 1024, name: 'home_hero_768x1024.png' },
  { width: 390, height: 844, name: 'home_hero_390x844.png' },
];

async function capture() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/', { waitUntil: 'load', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));

    const vpPath = path.join(ARTIFACT_DIR, vp.name);
    await page.screenshot({ path: vpPath });
    console.log(`Saved: ${vp.name}`);

    await page.close();
  }

  await browser.close();
  console.log('Done captures');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
