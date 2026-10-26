const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(`
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 20px;">
      <div id="container" style="width: 612px; border: 1px solid red;">
        <div id="footer" style="display: flex; justify-content: space-between; align-items: center; font-family: Inter, sans-serif;">
          <div id="left" style="display: flex; align-items: center; gap: 8px;">
            <span id="text" style="font-size: 14px; font-weight: 500; white-space: nowrap;">Not sure which lift you need? Share your height and location.</span>
            <button id="btn" style="font-size: 13px; font-weight: 600; padding: 6px 12px; white-space: nowrap;">Get Rental Quote</button>
          </div>
          <a id="link" style="font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; white-space: nowrap;">View all brand new fleet →</a>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.evaluateHandle('document.fonts.ready');
  const dims = await page.evaluate(() => {
    return {
      text: document.getElementById('text').offsetWidth,
      btn: document.getElementById('btn').offsetWidth,
      left: document.getElementById('left').offsetWidth,
      link: document.getElementById('link').offsetWidth,
      total: document.getElementById('left').offsetWidth + document.getElementById('link').offsetWidth
    };
  });
  console.log('Dims at 14px:', dims);

  // What if left is a 2-line column: text on top, button on bottom? Or flex-col?
  await page.setContent(`
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 20px;">
      <div id="container" style="width: 612px; border: 1px solid red;">
        <div id="footer" style="display: flex; justify-content: space-between; align-items: center; font-family: Inter, sans-serif;">
          <div id="left" style="display: flex; flex-direction: column; gap: 4px;">
            <span id="text" style="font-size: 14px; font-weight: 500; white-space: nowrap;">Not sure which lift you need? Share your height and location.</span>
            <div>
              <button id="btn" style="font-size: 13px; font-weight: 600; padding: 6px 14px; white-space: nowrap;">Get Rental Quote</button>
            </div>
          </div>
          <a id="link" style="font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; white-space: nowrap;">View all brand new fleet →</a>
        </div>
      </div>
    </body>
    </html>
  `);
  await page.evaluateHandle('document.fonts.ready');
  const dims2 = await page.evaluate(() => {
    return {
      container: document.getElementById('container').offsetWidth,
      left: document.getElementById('left').offsetWidth,
      link: document.getElementById('link').offsetWidth,
      scrollWidth: document.getElementById('footer').scrollWidth,
      clientWidth: document.getElementById('footer').clientWidth,
      fits: document.getElementById('footer').scrollWidth <= document.getElementById('footer').clientWidth
    };
  });
  console.log('Dims with column/two-tier left:', dims2);

  await browser.close();
})();
