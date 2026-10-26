import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const ARTIFACTS_DIR = 'C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const viewports = [
    { width: 1672, height: 941, name: 'fleet_1672' },
    { width: 1920, height: 1080, name: 'fleet_1920' },
    { width: 1440, height: 900, name: 'fleet_1440' },
    { width: 768, height: 1024, name: 'fleet_768' },
    { width: 390, height: 844, name: 'fleet_390' },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // Wait for images to load
    await page.evaluate(async () => {
      const selectors = Array.from(document.querySelectorAll('img'));
      await Promise.all(selectors.map(img => {
        if (img.complete) return;
        return new Promise((resolve) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      }));
    });

    // Locate the #machines section
    const section = await page.$('#machines');
    if (section) {
      const outPath = path.join(ARTIFACTS_DIR, `${vp.name}.png`);
      await section.screenshot({ path: outPath });
      console.log(`Saved screenshot: ${outPath}`);
    } else {
      console.log(`Section #machines not found for ${vp.name}`);
    }

    await page.close();
  }

  await browser.close();

  // Create side-by-side comparison with target image at 1672
  const targetPath = path.join(ARTIFACTS_DIR, '.user_uploaded/media_1792832015747.jpg');
  const renderedPath = path.join(ARTIFACTS_DIR, 'fleet_1672.png');
  
  if (fs.existsSync(targetPath) && fs.existsSync(renderedPath)) {
    const targetMeta = await sharp(targetPath).metadata();
    const renderedMeta = await sharp(renderedPath).metadata();

    const targetResized = await sharp(targetPath)
      .resize({ width: 1200 })
      .toBuffer();
    const targetResizedMeta = await sharp(targetResized).metadata();

    const renderedResized = await sharp(renderedPath)
      .resize({ width: 1200 })
      .toBuffer();
    const renderedResizedMeta = await sharp(renderedResized).metadata();

    const canvasWidth = 2440;
    const canvasHeight = Math.max(targetResizedMeta.height, renderedResizedMeta.height) + 80;

    await sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels: 4,
        background: { r: 240, g: 242, b: 246, alpha: 1 }
      }
    })
    .composite([
      { input: targetResized, top: 40, left: 15 },
      { input: renderedResized, top: 40, left: 1225 }
    ])
    .png()
    .toFile(path.join(ARTIFACTS_DIR, 'fleet_side_by_side.png'));

    console.log('Saved fleet_side_by_side.png!');
  }
}

main().catch(console.error);
