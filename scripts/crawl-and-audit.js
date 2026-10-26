const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad';
const SCREENSHOT_DIR = path.join(ARTIFACT_DIR, 'rental_audit_screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const routes = [
  '/',
  '/brand-new',
  '/brand-new/scissor-lifts',
  '/brand-new/scissor-lifts/gtjz06',
  '/brand-new/scissor-lifts/gtjz08',
  '/brand-new/scissor-lifts/gtjz10',
  '/brand-new/scissor-lifts/gtjz12',
  '/brand-new/scissor-lifts/gtjz14',
  '/brand-new/boom-lifts',
  '/brand-new/boom-lifts/sl28t',
  '/brand-new/boom-lifts/articulating-boom',
  '/used',
  '/used/scissor-lifts',
  '/used/boom-lifts',
  '/about',
  '/contact',
];

const screenshotRoutes = [
  { path: '/', name: 'home', fullPage: true },
  { path: '/brand-new', name: 'brand-new', fullPage: false },
  { path: '/brand-new/scissor-lifts', name: 'brand-new-scissor-lifts', fullPage: false },
  { path: '/brand-new/scissor-lifts/gtjz12', name: 'model-gtjz12', fullPage: false },
  { path: '/brand-new/boom-lifts', name: 'brand-new-boom-lifts', fullPage: false },
  { path: '/used', name: 'used', fullPage: false },
  { path: '/used/scissor-lifts', name: 'used-scissor-lifts', fullPage: false },
  { path: '/about', name: 'about', fullPage: false },
  { path: '/contact', name: 'contact', fullPage: false },
];

const bannedWords = [
  'warranty',
  'guarantee',
  'factory',
  'manufacturer',
  'direct from',
  'catalogue',
  'buy',
  'purchase',
  'sale',
  'sell',
  'dealer',
  'distributor',
  'price',
  'stock',
  'inventory',
  'after-sales',
  'free maintenance',
  'zero-hour',
  'factory-fresh',
  'certified used',
  'battle-tested',
  '2-year',
  '2 year',
  '1-year',
  '1 year'
];

async function run() {
  console.log('Launching browser for crawl and audit...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  let dumpOutput = '';
  const findings = [];

  // 1. CRAWL & DUMP ALL ROUTES
  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    console.log(`Crawling: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0' });

    const data = await page.evaluate(() => {
      const title = document.title;
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      
      const jsonLds = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .map(s => s.textContent || '');

      const alts = Array.from(document.querySelectorAll('img[alt]'))
        .map(img => img.getAttribute('alt') || '')
        .filter(Boolean);

      const bodyText = document.body.innerText || '';

      return { title, metaDesc, jsonLds, alts, bodyText };
    });

    dumpOutput += `\n========================================\nROUTE: ${route}\n========================================\n`;
    dumpOutput += `TITLE: ${data.title}\n`;
    dumpOutput += `META DESCRIPTION: ${data.metaDesc}\n`;
    dumpOutput += `JSON-LD:\n${data.jsonLds.join('\n')}\n`;
    dumpOutput += `IMAGE ALTS:\n${data.alts.join(' | ')}\n`;
    dumpOutput += `BODY TEXT:\n${data.bodyText}\n`;

    // Check banned words on this route
    const textPool = [
      { type: 'TITLE', text: data.title },
      { type: 'META_DESC', text: data.metaDesc },
      ...data.jsonLds.map(j => ({ type: 'JSON_LD', text: j })),
      ...data.alts.map(a => ({ type: 'ALT_TEXT', text: a })),
      { type: 'BODY_TEXT', text: data.bodyText }
    ];

    for (const item of textPool) {
      const lower = item.text.toLowerCase();
      for (const word of bannedWords) {
        if (lower.includes(word)) {
          // Check for allowed exception: About page caption
          if (route === '/about' && word === 'manufacturer') {
            // Check if only matches the allowed caption
            const lines = item.text.split('\n');
            for (const line of lines) {
              if (line.toLowerCase().includes('manufacturer')) {
                if (line.includes("Our team at the manufacturer's facility.")) {
                  console.log(`[ALLOWED EXCEPTION] ${route} -> ${line.trim()}`);
                } else {
                  findings.push({ route, type: item.type, word, snippet: line.trim() });
                }
              }
            }
          } else {
            // Find snippet
            const lines = item.text.split('\n');
            for (const line of lines) {
              if (line.toLowerCase().includes(word)) {
                findings.push({ route, type: item.type, word, snippet: line.trim() });
              }
            }
          }
        }
      }
    }
  }

  // Write dump file
  const dumpFilePath = path.join(ARTIFACT_DIR, 'scratch', 'crawl_dump.txt');
  fs.writeFileSync(dumpFilePath, dumpOutput, 'utf8');
  console.log(`Wrote full crawl dump to: ${dumpFilePath}`);

  console.log('\n--- AUDIT FINDINGS FOR BANNED WORDS ---');
  if (findings.length === 0) {
    console.log('✅ AUDIT PASSED: 0 violations found! Only allowed exception on About exists.');
  } else {
    console.log(`❌ AUDIT FAILED: ${findings.length} violations found:`);
    findings.forEach(f => {
      console.log(`  - [${f.word}] at ${f.route} (${f.type}): "${f.snippet}"`);
    });
  }

  // 2. CAPTURE SCREENSHOTS AT 1536x1024 AND 390x844
  const viewports = [
    { width: 1536, height: 1024, label: '1536x1024' },
    { width: 390, height: 844, label: '390x844', isMobile: true, hasTouch: true }
  ];

  console.log('\nCapturing screenshots across required routes and viewports...');
  for (const vp of viewports) {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: !!vp.isMobile,
      hasTouch: !!vp.hasTouch,
      deviceScaleFactor: 2
    });

    for (const r of screenshotRoutes) {
      const url = `http://localhost:3000${r.path}`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      await new Promise(res => setTimeout(res, 500)); // wait for layout/animations

      const filename = `${r.name}_${vp.label}.png`;
      const filePath = path.join(SCREENSHOT_DIR, filename);
      await page.screenshot({ path: filePath, fullPage: r.fullPage });
      console.log(`Captured: ${filename}`);
    }
  }

  await browser.close();
  console.log('\nAudit and screenshot process completed.');
}

run().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
