const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad';

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Home page video section
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const target = sections.find(s => s.textContent && s.textContent.includes('See Our Lifts At Work'));
    if (target) {
      target.scrollIntoView({ block: 'center' });
    }
  });

  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'home_video_section_1920.png') });
  console.log('Saved home_video_section_1920.png');

  // Mobile home video section
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const target = sections.find(s => s.textContent && s.textContent.includes('See Our Lifts At Work'));
    if (target) {
      target.scrollIntoView({ block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'home_video_section_390.png') });
  console.log('Saved home_video_section_390.png');

  // 2. About page video section
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const target = sections.find(s => s.textContent && s.textContent.includes('Our Fleet Operations'));
    if (target) {
      target.scrollIntoView({ block: 'center' });
    }
  });

  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'about_video_section_1920.png') });
  console.log('Saved about_video_section_1920.png');

  await browser.close();
  console.log('Finished capturing video sections');
}

run().catch(console.error);
