import sharp from "sharp";
import fs from "fs";

const inputPath = "C:/Users/citiz/.gemini/antigravity/brain/83397a02-cf15-4b81-820d-6b5d86cb5aad/.user_uploaded/media_1792873367443_bea99819.jpg";

async function createHDHero() {
  console.log("Reading raw uploaded image...");
  const rawInput = sharp(inputPath);
  const meta = await rawInput.metadata();
  console.log(`Original dimensions: ${meta.width}x${meta.height}`);

  // Target 4K/Retina HD resolution
  const targetW = 3840;
  const targetH = Math.round(targetW * (meta.height / meta.width)); // 2156

  console.log(`Upscaling to ${targetW}x${targetH} with Lanczos3 and unsharp mask...`);

  // Step 1: High quality resize with Lanczos3
  const upscaledBuffer = await sharp(inputPath)
    .resize(targetW, targetH, {
      kernel: "lanczos3",
      fit: "fill",
    })
    // Fine-tuned unsharp masking for crisp machine details
    .sharpen({
      sigma: 1.25,
      m1: 1.0,
      m2: 2.5,
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = upscaledBuffer;
  const w = info.width;
  const h = info.height;

  // Step 2: Denoise and smooth the deep navy gradient on the left side
  // From x = 0 to x = 1100, smooth any 8-bit JPEG banding so it is perfectly clean
  // We can do a smooth horizontal blend of the gradient
  console.log("Refining navy gradient on left side for seamless HD look...");
  const cleanData = Buffer.from(data);

  // Sample the left edge average color per vertical region
  for (let y = 0; y < h; y++) {
    // Left edge (x = 0 to 50) average
    let rSum = 0, gSum = 0, bSum = 0;
    const sampleWidth = Math.round(w * 0.05); // 192px
    for (let x = 0; x < sampleWidth; x++) {
      const idx = (y * w + x) * 3;
      rSum += data[idx];
      gSum += data[idx + 1];
      bSum += data[idx + 2];
    }
    const edgeR = Math.round(rSum / sampleWidth);
    const edgeG = Math.round(gSum / sampleWidth);
    const edgeB = Math.round(bSum / sampleWidth);

    // Apply gentle smoothing from x = 0 to x = 0.25 * w (approx 960px)
    const blendEnd = Math.round(w * 0.25);
    for (let x = 0; x < blendEnd; x++) {
      const idx = (y * w + x) * 3;
      const t = x / blendEnd; // 0 at left edge, 1 at blendEnd
      const smoothFactor = (1 - t) * (1 - t); // quadratic ease-in from left
      cleanData[idx] = Math.round(data[idx] * (1 - smoothFactor * 0.6) + edgeR * (smoothFactor * 0.6));
      cleanData[idx + 1] = Math.round(data[idx + 1] * (1 - smoothFactor * 0.6) + edgeG * (smoothFactor * 0.6));
      cleanData[idx + 2] = Math.round(data[idx + 2] * (1 - smoothFactor * 0.6) + edgeB * (smoothFactor * 0.6));
    }
  }

  // Step 3: Save 3840x2156 version
  const hdFull = await sharp(cleanData, {
    raw: {
      width: w,
      height: h,
      channels: 3,
    },
  })
    .jpeg({
      quality: 96,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:4:4", // Full chroma resolution for ultra HD crispness
    })
    .toBuffer();

  const outPath1 = "public/images/hero/hero-scissor-lift-hd.jpg";
  const outPath2 = "public/images/hero/hero-composite.jpg";
  fs.writeFileSync(outPath1, hdFull);
  fs.writeFileSync(outPath2, hdFull);
  console.log(`Saved HD hero to ${outPath1} (${(hdFull.length / 1024).toFixed(0)} KB)`);
  console.log(`Saved HD hero to ${outPath2}`);

  // Step 4: Also create an exact 3840x1874 canvas version (aspect 2.05) if needed
  // In 3840x1874, the height is 1874 instead of 2156
  // Center crop vertically (extract from y = (2156-1874)/2 = 141)
  const cropTop = Math.round((h - 1874) / 2); // 141px
  const hd205 = await sharp(cleanData, {
    raw: {
      width: w,
      height: h,
      channels: 3,
    },
  })
    .extract({ left: 0, top: cropTop, width: w, height: 1874 })
    .jpeg({
      quality: 96,
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:4:4",
    })
    .toBuffer();

  const outPath3 = "public/images/hero/hero-scissor-lift-205.jpg";
  fs.writeFileSync(outPath3, hd205);
  console.log(`Saved 2.05 aspect hero to ${outPath3} (${(hd205.length / 1024).toFixed(0)} KB)`);
}

createHDHero().catch(console.error);
