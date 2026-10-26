#!/usr/bin/env node

import fs from "fs";
import path from "path";
import sharp from "sharp";
import pixelmatch from "pixelmatch";

const BASELINE_DIR = path.resolve("qa/baseline-wide");
const AFTER_DIR = path.resolve("qa/after-wide");
const DIFF_DIR = path.resolve("qa/diff-wide");
const REPORT_PATH = path.resolve("qa/wide-diff-report.html");

if (!fs.existsSync(DIFF_DIR)) {
  fs.mkdirSync(DIFF_DIR, { recursive: true });
}

async function run() {
  console.log("==================================================");
  console.log("STARTING PIXELMATCH WIDE COMPARISON (>= 768px)");
  console.log(`Baseline: ${BASELINE_DIR}`);
  console.log(`After:    ${AFTER_DIR}`);
  console.log("Threshold: 0.1, Max allowed diff: 0.02%");
  console.log("==================================================\n");

  const files = fs.readdirSync(BASELINE_DIR).filter((f) => f.endsWith(".png"));
  console.log(`Found ${files.length} screenshots to compare.`);

  const results = [];
  let totalPass = 0;
  let totalFail = 0;

  for (const file of files) {
    const baselinePath = path.join(BASELINE_DIR, file);
    const afterPath = path.join(AFTER_DIR, file);
    const diffPath = path.join(DIFF_DIR, file);

    if (!fs.existsSync(afterPath)) {
      console.error(`✗ Missing after screenshot: ${file}`);
      results.push({ file, status: "FAIL", error: "Missing after file" });
      totalFail++;
      continue;
    }

    try {
      const baseMeta = await sharp(baselinePath).metadata();
      const afterMeta = await sharp(afterPath).metadata();

      const width = Math.min(baseMeta.width, afterMeta.width);
      const height = Math.min(baseMeta.height, afterMeta.height);

      const baseBuf = await sharp(baselinePath)
        .extract({ left: 0, top: 0, width, height })
        .ensureAlpha()
        .raw()
        .toBuffer();

      const afterBuf = await sharp(afterPath)
        .extract({ left: 0, top: 0, width, height })
        .ensureAlpha()
        .raw()
        .toBuffer();

      const diffBuf = Buffer.alloc(width * height * 4);

      const numDiffPixels = pixelmatch(
        baseBuf,
        afterBuf,
        diffBuf,
        width,
        height,
        { threshold: 0.1 }
      );

      const totalPixels = width * height;
      const diffPercent = (numDiffPixels / totalPixels) * 100;
      const passed = diffPercent <= 0.02;

      if (passed) {
        totalPass++;
      } else {
        totalFail++;
        // Write diff image
        await sharp(diffBuf, { raw: { width, height, channels: 4 } })
          .png()
          .toFile(diffPath);
      }

      const status = passed ? "PASS" : "FAIL";
      results.push({
        file,
        status,
        diffPercent: diffPercent.toFixed(4),
        diffPixels: numDiffPixels,
        totalPixels,
        width,
        height,
      });

      console.log(
        `[${status}] ${file}: ${numDiffPixels} / ${totalPixels} diff pixels (${diffPercent.toFixed(4)}%)`
      );
    } catch (err) {
      console.error(`✗ Error comparing ${file}:`, err.message);
      results.push({ file, status: "FAIL", error: err.message });
      totalFail++;
    }
  }

  // Generate HTML Report
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Wide Viewports Diff Report (≥ 768px)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; background: #0B192C; color: #FFFFFF; }
    h1 { margin-bottom: 8px; }
    .summary { font-size: 18px; margin-bottom: 24px; }
    .pass { color: #10B981; font-weight: bold; }
    .fail { color: #EF4444; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; background: #1E293B; border-radius: 8px; overflow: hidden; }
    th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #334155; }
    th { background: #0F172A; }
    tr:hover { background: #334155; }
    .badge-pass { background: #065F46; color: #34D399; padding: 4px 8px; border-radius: 4px; font-weight: 600; }
    .badge-fail { background: #7F1D1D; color: #F87171; padding: 4px 8px; border-radius: 4px; font-weight: 600; }
  </style>
</head>
<body>
  <h1>Wide Viewport Pixelmatch Verification Report</h1>
  <p class="summary">
    Total Screens: <strong>${files.length}</strong> | 
    Passed (≤ 0.02%): <span class="pass">${totalPass}</span> | 
    Failed: <span class="${totalFail === 0 ? "pass" : "fail"}">${totalFail}</span>
  </p>
  <table>
    <thead>
      <tr>
        <th>Screenshot File</th>
        <th>Dimensions</th>
        <th>Diff Pixels</th>
        <th>Diff %</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${results
        .map(
          (r) => `
        <tr>
          <td><code>${r.file}</code></td>
          <td>${r.width ? `${r.width}×${r.height}` : "N/A"}</td>
          <td>${r.diffPixels !== undefined ? r.diffPixels : "Error"}</td>
          <td>${r.diffPercent !== undefined ? `${r.diffPercent}%` : "Error"}</td>
          <td><span class="${r.status === "PASS" ? "badge-pass" : "badge-fail"}">${r.status}</span></td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
</body>
</html>`;

  fs.writeFileSync(REPORT_PATH, html, "utf8");
  console.log(`\n✓ HTML report saved to ${REPORT_PATH}`);
  console.log(`==================================================`);
  console.log(`SUMMARY: ${totalPass} PASSED, ${totalFail} FAILED`);
  console.log(`==================================================`);

  if (totalFail > 0) {
    process.exit(1);
  }
}

run();
