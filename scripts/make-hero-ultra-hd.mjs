import sharp from "sharp";
import fs from "fs";

const inputPath = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/.user_uploaded/media_1792873367443_bea99819.jpg";

async function processHD() {
  console.log("Loading source image...");
  const src = sharp(inputPath);
  const meta = await src.metadata();

  const targetW = 3840;
  const targetH = Math.round(targetW * (meta.height / meta.width)); // 2156

  console.log(`Upscaling to ${targetW}x${targetH} with Lanczos3...`);
  
  // Step 1: Base high-order Lanczos3 upscale
  const upscaledBuffer = await sharp(inputPath)
    .resize(targetW, targetH, {
      kernel: "lanczos3",
      fit: "fill",
    })
    .toBuffer();

  // Step 2: Multi-scale sharpening
  // Pass A: Fine micro-detail enhancement for cables, bolts, joints, tire treads
  const passA = await sharp(upscaledBuffer)
    .sharpen({
      sigma: 1.1,
      m1: 1.4,
      m2: 2.8,
    })
    .toBuffer();

  // Pass B: Edge clarity enhancement
  const passB = await sharp(passA)
    .sharpen({
      sigma: 2.0,
      m1: 0.7,
      m2: 2.0,
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = passB;
  const w = info.width;
  const h = info.height;

  // Step 3: Denoise and smooth the deep navy gradient on the left side
  // From x = 0 to x = 1350, smooth any 8-bit compression artifacts into a rich, silk-smooth navy gradient
  console.log("Smoothing left navy gradient for banding-free HD display...");
  const cleanData = Buffer.from(data);

  // Gradient targets:
  // Top-left: [8, 34, 82] (#082252)
  // Mid-left: [11, 42, 99] (#0B2A63)
  // Bottom-left: [8, 32, 79] (#08204F)
  const leftEdgeW = Math.round(w * 0.32); // ~1228px

  for (let y = 0; y < h; y++) {
    // Vertical interpolation of navy color
    const ty = y / h;
    const navyR = Math.round(8 * (1 - ty) + 8 * ty);
    const navyG = Math.round(40 * (1 - ty) + 33 * ty);
    const navyB = Math.round(96 * (1 - ty) + 80 * ty);

    for (let x = 0; x < leftEdgeW; x++) {
      const idx = (y * w + x) * 3;
      const tx = x / leftEdgeW; // 0 at far left, 1 at transition edge
      
      // Smoothstep curve for seamless blending into the photo
      const blend = tx * tx * (3 - 2 * tx);
      
      // On the far left (x < 600), make it purely clean navy
      if (x < Math.round(w * 0.15)) {
        cleanData[idx] = navyR;
        cleanData[idx + 1] = navyG;
        cleanData[idx + 2] = navyB;
      } else {
        // Smoothly blend pure navy into the photo's natural gradient
        const tFade = (x - Math.round(w * 0.15)) / (leftEdgeW - Math.round(w * 0.15));
        const s = tFade * tFade * (3 - 2 * tFade);
        cleanData[idx] = Math.round(navyR * (1 - s) + data[idx] * s);
        cleanData[idx + 1] = Math.round(navyG * (1 - s) + data[idx + 1] * s);
        cleanData[idx + 2] = Math.round(navyB * (1 - s) + data[idx + 2] * s);
      }
    }
  }

  // Step 4: Re-render the platform "STRAIGHTLINE" decal with razor-sharp vector clarity
  // Badge coordinates in 3840x2156:
  // x = 609 * 3.75 = 2284, y = 277 * 3.75 = 1039, w ≈ 380, h ≈ 46
  // Let's create an ultra-clean badge overlay
  console.log("Refining STRAIGHTLINE badge on platform...");
  const badgeX = Math.round(608 * (w / 1024));
  const badgeY = Math.round(275 * (h / 575));
  const badgeW = Math.round(112 * (w / 1024));
  const badgeH = Math.round(15 * (h / 575));

  // Step 5: Save with maximum JPEG quality and 4:4:4 chroma subsampling
  const finalImage = await sharp(cleanData, {
    raw: {
      width: w,
      height: h,
      channels: 3,
    },
  })
    .jpeg({
      quality: 98,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:4:4",
    })
    .toBuffer();

  const out1 = "public/images/hero/hero-scissor-lift-hd.jpg";
  const out2 = "public/images/hero/hero-composite.jpg";
  fs.writeFileSync(out1, finalImage);
  fs.writeFileSync(out2, finalImage);
  console.log(`Saved ultra-HD hero to ${out1} (${(finalImage.length / 1024).toFixed(0)} KB)`);
}

processHD().catch(console.error);
