import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const VIEWPORTS = [
  { name: "target_1672x941", width: 1672, height: 941 },
  { name: "desktop_1920x1080", width: 1920, height: 1080 },
  { name: "desktop_1440x900", width: 1440, height: 900 },
  { name: "tablet_768x1024", width: 768, height: 1024 },
  { name: "mobile_390x844", width: 390, height: 844 },
];

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const outDir = path.resolve("screenshots/comparisons");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
    });

    console.log(`Navigating to http://localhost:3000 at ${vp.width}x${vp.height}...`);
    await page.goto("http://localhost:3000", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for fonts and hero image to render completely
    await new Promise((r) => setTimeout(r, 2000));

    const shotPath = path.join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`Saved screenshot: ${shotPath}`);

    // If 1920x1080, also create a cropped zoom of the machine decal & wheels
    if (vp.name === "desktop_1920x1080") {
      const zoomPath = path.join(outDir, "desktop_1920_decal_zoom.png");
      // Boom lift Straightline decal & wheel area in 1920x1080
      await sharp(shotPath)
        .extract({ left: 1000, top: 450, width: 600, height: 400 })
        .toFile(zoomPath);
      console.log(`Saved machine sharpness crop: ${zoomPath}`);
    }

    await page.close();
  }

  // Generate side-by-side comparison for 1672x941 vs target
  const targetPath = "public/design-reference/home-target.png";
  const actualPath = path.join(outDir, "target_1672x941.png");

  if (fs.existsSync(targetPath) && fs.existsSync(actualPath)) {
    // Resize both to same dimensions (e.g. 1024x576 or 1672x941) and stitch side by side
    const targetMeta = await sharp(targetPath).metadata();
    console.log("Target meta:", targetMeta.width, "x", targetMeta.height);

    const actualResized = await sharp(actualPath)
      .resize(1024, 576, { fit: "fill" })
      .toBuffer();

    const targetResized = await sharp(targetPath)
      .resize(1024, 576, { fit: "fill" })
      .toBuffer();

    const comparisonPath = path.join(outDir, "side_by_side_1672.png");
    await sharp({
      create: {
        width: 2048,
        height: 620,
        channels: 4,
        background: { r: 10, g: 25, b: 50, alpha: 1 },
      },
    })
      .composite([
        { input: targetResized, left: 0, top: 44 },
        { input: actualResized, left: 1024, top: 44 },
      ])
      .png()
      .toFile(comparisonPath);

    console.log(`Saved side-by-side comparison: ${comparisonPath}`);
  }

  await browser.close();
  console.log("All viewport screenshots captured successfully!");
}

capture().catch((e) => {
  console.error(e);
  process.exit(1);
});
