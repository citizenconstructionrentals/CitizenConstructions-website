import sharp from "sharp";
import fs from "fs";

const inputPath = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/.user_uploaded/media_1792877131264_522172b8.jpg";

async function testComposites() {
  const canvasW = 3840;
  const canvasH = 1874;

  // Let's upscale the photo with Lanczos3
  // Machine height in original is ~715px (y: 265 to 980).
  // In canvas 1874h, let's make machine ~1380px tall.
  const scale = 1380 / 715; // ~1.93
  const photoW = Math.round(577 * scale); // 1114
  const photoH = Math.round(1024 * scale); // 1976

  console.log(`Scaled photo: ${photoW}x${photoH}`);

  const scaledPhotoBuffer = await sharp(inputPath)
    .resize(photoW, photoH, { kernel: "lanczos3", fit: "fill" })
    .sharpen({ sigma: 1.2, m1: 1.2, m2: 2.5 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pData = scaledPhotoBuffer.data;
  const pW = scaledPhotoBuffer.info.width;
  const pH = scaledPhotoBuffer.info.height;

  // Create base canvas with the site's exact hero navy gradient
  // Top: #092252, Mid: #0B2A63, Bottom: #08204F
  const baseData = Buffer.alloc(canvasW * canvasH * 3);
  for (let y = 0; y < canvasH; y++) {
    const t = y / canvasH;
    const r = Math.round(9 * (1 - t) + 8 * t);
    const g = Math.round(38 * (1 - t) + 32 * t);
    const b = Math.round(92 * (1 - t) + 79 * t);
    for (let x = 0; x < canvasW; x++) {
      const idx = (y * canvasW + x) * 3;
      baseData[idx] = r;
      baseData[idx + 1] = g;
      baseData[idx + 2] = b;
    }
  }

  // Position of photo on canvas
  // We want the machine on the right side:
  // e.g. photo starts at x = canvasW - photoW - 200 = 2526
  const photoLeft = canvasW - photoW - 160; // 2566
  const photoTop = canvasH - pH + 30; // Tires sit right near bottom floor

  console.log(`Placing photo at left: ${photoLeft}, top: ${photoTop}`);

  // Test 1: Direct soft feather blend
  const blendData = Buffer.from(baseData);

  for (let py = 0; py < pH; py++) {
    const cy = photoTop + py;
    if (cy < 0 || cy >= canvasH) continue;

    for (let px = 0; px < pW; px++) {
      const cx = photoLeft + px;
      if (cx < 0 || cx >= canvasW) continue;

      const pIdx = (py * pW + px) * 3;
      const cIdx = (cy * canvasW + cx) * 3;

      // Calculate blend factor based on distance from edges of the photo
      // Left edge feather: 0 to 180px
      let alpha = 1.0;
      if (px < 180) {
        const t = px / 180;
        alpha = t * t * (3 - 2 * t);
      }
      // Top edge feather: 0 to 120px
      if (py < 120) {
        const t = py / 120;
        alpha = Math.min(alpha, t * t * (3 - 2 * t));
      }
      // Right edge feather: last 80px
      if (px > pW - 80) {
        const t = (pW - px) / 80;
        alpha = Math.min(alpha, t * t * (3 - 2 * t));
      }
      // Bottom edge feather: last 60px
      if (py > pH - 60) {
        const t = (pH - py) / 60;
        alpha = Math.min(alpha, t * t * (3 - 2 * t));
      }

      blendData[cIdx] = Math.round(blendData[cIdx] * (1 - alpha) + pData[pIdx] * alpha);
      blendData[cIdx + 1] = Math.round(blendData[cIdx + 1] * (1 - alpha) + pData[pIdx + 1] * alpha);
      blendData[cIdx + 2] = Math.round(blendData[cIdx + 2] * (1 - alpha) + pData[pIdx + 2] * alpha);
    }
  }

  const outJpg = await sharp(blendData, {
    raw: { width: canvasW, height: canvasH, channels: 3 },
  })
    .resize(1920, 937)
    .jpeg({ quality: 90 })
    .toFile("C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/test_blend_hero.jpg");

  console.log("Saved test_blend_hero.jpg");
}

testComposites().catch(console.error);
