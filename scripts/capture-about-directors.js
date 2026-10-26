const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad';

const viewports = [
  { width: 1920, height: 1080, name: 'about_1920x1080.png', sectionName: 'about_section_1920x1080.png' },
  { width: 1536, height: 1024, name: 'about_1536x1024.png', sectionName: 'about_section_1536x1024.png' },
  { width: 768, height: 1024, name: 'about_768x1024.png', sectionName: 'about_section_768x1024.png' },
  { width: 390, height: 844, name: 'about_390x844.png', sectionName: 'about_section_390x844.png' },
];

async function capture() {
  console.log('Launching browser for About page screenshots...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const vp of viewports) {
    console.log(`Processing ${vp.width}x${vp.height}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/about', { waitUntil: 'load', timeout: 15000 });

    // Scroll down gradually to trigger lazy images
    await page.evaluate(async () => {
      window.scrollTo(0, 600);
      await new Promise(r => setTimeout(r, 600));
      window.scrollTo(0, 1200);
      await new Promise(r => setTimeout(r, 600));
    });

    // Scroll directly to the "Meet Our Directors" heading so it is visible in the viewport
    await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      const target = headings.find(h => h.textContent.includes('Meet Our Directors'));
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    });
    await new Promise(r => setTimeout(r, 800));

    // Capture viewport screenshot showing directors block in context
    const vpPath = path.join(ARTIFACT_DIR, vp.name);
    await page.screenshot({ path: vpPath });
    console.log(`Saved viewport screenshot: ${vp.name}`);

    // Section specific screenshot
    const sectionElement = await page.evaluateHandle(() => {
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      const target = headings.find(h => h.textContent.includes('Two Decades') || h.textContent.includes('Meet Our Directors'));
      return target ? target.closest('section') : null;
    });

    if (sectionElement && sectionElement.asElement()) {
      const secPath = path.join(ARTIFACT_DIR, vp.sectionName);
      await sectionElement.asElement().screenshot({ path: secPath });
      console.log(`Saved section screenshot: ${vp.sectionName}`);
    }

    // Scroll to top and take full page screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 500));
    const fullPath = path.join(ARTIFACT_DIR, 'full_' + vp.name);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved full page screenshot: full_${vp.name}`);

    await page.close();
  }

  await browser.close();
  console.log('All screenshots completed successfully!');
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
