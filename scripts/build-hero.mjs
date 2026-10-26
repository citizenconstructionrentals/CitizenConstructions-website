import sharp from "sharp";
import path from "path";
import fs from "fs";

async function buildHero() {
  const canvasWidth = 3840;
  const canvasHeight = 1874;

  // Source clean photo
  const rawPath = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/.user_uploaded/media_1792759403967.jpg";
  if (!fs.existsSync(rawPath)) {
    throw new Error(`Raw photo not found at ${rawPath}`);
  }

  // Target photo scale & position
  const photoWidth = 2458;
  const photoHeight = Math.round(photoWidth * (576 / 1024)); // 1383
  const photoLeft = 1540;
  const photoTop = 232;
  const photoBottom = photoTop + photoHeight; // 1615

  console.log(`Scaling photo to ${photoWidth}x${photoHeight}, placing at left:${photoLeft}, top:${photoTop}`);

  // 1. Resize photo with Lanczos3
  const scaledPhoto = await sharp(rawPath)
    .resize(photoWidth, photoHeight, {
      kernel: "lanczos3",
      fit: "fill",
    })
    .toBuffer();

  // 2. Extract top rows to get sky color gradient and bottom rows for asphalt
  // Let's create an extended canvas for the photo with sky extended upwards and asphalt downwards
  // Photo extended: width = photoWidth, height = canvasHeight (1874)
  // Top 232px: sky, Mid 1383px: photo, Bottom 259px: asphalt
  // We feather top 140px and bottom 140px
  const photoRaw = await sharp(scaledPhoto).raw().toBuffer({ resolveWithObject: true });

  // Create an RGBA buffer of size photoWidth x canvasHeight
  const extWidth = photoWidth;
  const extHeight = canvasHeight;
  const extBuffer = Buffer.alloc(extWidth * extHeight * 4);

  // Sample sky columns from top 10 rows of photo
  const skyCol = new Array(extWidth);
  for (let x = 0; x < extWidth; x++) {
    let r = 0, g = 0, b = 0;
    for (let y = 0; y < 15; y++) {
      const idx = (y * extWidth + x) * photoRaw.info.channels;
      r += photoRaw.data[idx];
      g += photoRaw.data[idx + 1];
      b += photoRaw.data[idx + 2];
    }
    skyCol[x] = [Math.round(r / 15), Math.round(g / 15), Math.round(b / 15)];
  }

  // Sample asphalt columns from bottom 15 rows of photo
  const asphaltCol = new Array(extWidth);
  for (let x = 0; x < extWidth; x++) {
    let r = 0, g = 0, b = 0;
    for (let y = photoHeight - 15; y < photoHeight; y++) {
      const idx = (y * extWidth + x) * photoRaw.info.channels;
      r += photoRaw.data[idx];
      g += photoRaw.data[idx + 1];
      b += photoRaw.data[idx + 2];
    }
    asphaltCol[x] = [Math.round(r / 15), Math.round(g / 15), Math.round(b / 15)];
  }

  const featherY = 140;
  const featherX = 520; // 500-520px left feather

  for (let y = 0; y < extHeight; y++) {
    for (let x = 0; x < extWidth; x++) {
      let r, g, b;

      if (y < photoTop) {
        // Sky above photo: reflect photo's top sky region
        const dy = photoTop - y;
        const py = Math.min(dy % photoHeight, featherY);
        const pidx = (py * extWidth + x) * photoRaw.info.channels;
        r = photoRaw.data[pidx];
        g = photoRaw.data[pidx + 1];
        b = photoRaw.data[pidx + 2];
      } else if (y >= photoBottom) {
        // Asphalt below photo: reflect photo's bottom asphalt region
        const dy = y - photoBottom;
        const py = photoHeight - 1 - (dy % (photoHeight / 4));
        const pidx = (py * extWidth + x) * photoRaw.info.channels;
        r = photoRaw.data[pidx];
        g = photoRaw.data[pidx + 1];
        b = photoRaw.data[pidx + 2];
      } else {
        // Inside photo region
        const py = y - photoTop;
        const pidx = (py * extWidth + x) * photoRaw.info.channels;
        r = photoRaw.data[pidx];
        g = photoRaw.data[pidx + 1];
        b = photoRaw.data[pidx + 2];
      }

      // Calculate horizontal alpha feather on the left edge (0 to featherX)
      let alpha = 255;
      if (x < featherX) {
        const t = x / featherX;
        // Smoothstep curve for seamless blend
        const s = t * t * (3 - 2 * t);
        alpha = Math.round(s * 255);
      }

      const outIdx = (y * extWidth + x) * 4;
      extBuffer[outIdx] = r;
      extBuffer[outIdx + 1] = g;
      extBuffer[outIdx + 2] = b;
      extBuffer[outIdx + 3] = alpha;
    }
  }

  // 3. Create the 3840x1874 base canvas filled with #0B2A63 (RGB: 11, 42, 99)
  // With subtle vertical tone matching target hero background
  const baseBuffer = Buffer.alloc(canvasWidth * canvasHeight * 3);
  for (let y = 0; y < canvasHeight; y++) {
    // Top is #0E3275 (14, 50, 117), bottom is #08204F (8, 32, 79)
    const t = y / canvasHeight;
    const r = Math.round(14 * (1 - t) + 8 * t);
    const g = Math.round(48 * (1 - t) + 32 * t);
    const b = Math.round(108 * (1 - t) + 79 * t);

    for (let x = 0; x < canvasWidth; x++) {
      const idx = (y * canvasWidth + x) * 3;
      baseBuffer[idx] = r;
      baseBuffer[idx + 1] = g;
      baseBuffer[idx + 2] = b;
    }
  }

  const extendedPhotoImg = await sharp(extBuffer, {
    raw: {
      width: extWidth,
      height: extHeight,
      channels: 4,
    },
  })
    .png()
    .toBuffer();

  const finalComposite = await sharp(baseBuffer, {
    raw: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 3,
    },
  })
    .composite([
      {
        input: extendedPhotoImg,
        left: photoLeft,
        top: 0,
      },
    ])
    .jpeg({ quality: 92, progressive: true })
    .toBuffer();

  const outputPath = "public/images/hero/hero-composite.jpg";
  fs.writeFileSync(outputPath, finalComposite);
  console.log(`Saved hero composite to ${outputPath}`);
}

buildHero().catch(console.error);
