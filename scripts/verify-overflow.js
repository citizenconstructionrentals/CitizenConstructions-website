const puppeteer = require('puppeteer');

async function checkOverflow() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const routes = ['/', '/brand-new', '/brand-new/scissor-lifts', '/brand-new/scissor-lifts/gtjz12', '/brand-new/boom-lifts', '/used', '/used/scissor-lifts', '/about', '/contact'];
  const viewports = [{ w: 1536, h: 1024 }, { w: 390, h: 844 }];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.w, height: vp.h });
    for (const r of routes) {
      await page.goto('http://localhost:3000' + r, { waitUntil: 'networkidle2' });
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      if (scrollWidth > vp.w) {
        console.log(`OVERFLOW at ${r} (${vp.w}px): ${scrollWidth} > ${vp.w}`);
      } else {
        console.log(`OK: ${r} at ${vp.w}px (scrollWidth = ${scrollWidth}px)`);
      }
    }
  }
  await browser.close();
  console.log('All overflow checks completed.');
}

checkOverflow().catch(console.error);
