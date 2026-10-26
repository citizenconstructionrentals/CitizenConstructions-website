#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { resolve, join } from "path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const BASELINE_DIR = resolve(process.cwd(), "qa/baseline-desktop");
const AFTER_DIR = resolve(process.cwd(), "qa/after-desktop");
const DIFF_DIR = resolve(process.cwd(), "qa/diffs");
const REPORT_FILE = resolve(process.cwd(), "qa/desktop-diff-report.html");

if (!existsSync(DIFF_DIR)) {
  mkdirSync(DIFF_DIR, { recursive: true });
}

async function runComparison() {
  console.log("==================================================");
  console.log("COMPARING DESKTOP BASELINE VS AFTER SCREENSHOTS");
  console.log("==================================================\n");

  const baselineFiles = readdirSync(BASELINE_DIR).filter((f) => f.endsWith(".png"));
  console.log(`Found ${baselineFiles.length} baseline screenshots to compare.`);

  const results = [];
  let totalFailures = 0;
  const MAX_ALLOWED_DIFF_PERCENT = 0.02; // Strict 0.02% threshold

  for (const filename of baselineFiles) {
    const baselinePath = join(BASELINE_DIR, filename);
    const afterPath = join(AFTER_DIR, filename);
    const diffPath = join(DIFF_DIR, `diff_${filename}`);

    if (!existsSync(afterPath)) {
      console.warn(`  ! Missing after screenshot for ${filename}`);
      results.push({
        file: filename,
        status: "MISSING",
        diffPixels: -1,
        diffPercent: 100,
        diffImage: null,
      });
      totalFailures++;
      continue;
    }

    try {
      const img1 = PNG.sync.read(readFileSync(baselinePath));
      const img2 = PNG.sync.read(readFileSync(afterPath));

      if (img1.width !== img2.width || img1.height !== img2.height) {
        console.error(`  ✗ Size mismatch for ${filename}: baseline=${img1.width}x${img1.height}, after=${img2.width}x${img2.height}`);
        results.push({
          file: filename,
          status: "SIZE_MISMATCH",
          diffPixels: -1,
          diffPercent: 100,
          diffImage: null,
          details: `Baseline: ${img1.width}x${img1.height}, After: ${img2.width}x${img2.height}`,
        });
        totalFailures++;
        continue;
      }

      const { width, height } = img1;
      const totalPixels = width * height;
      const diff = new PNG({ width, height });

      const numDiffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        { threshold: 0.1 }
      );

      const diffPercent = (numDiffPixels / totalPixels) * 100;
      const passed = diffPercent <= MAX_ALLOWED_DIFF_PERCENT;

      if (!passed) {
        totalFailures++;
        writeFileSync(diffPath, PNG.sync.write(diff));
        console.error(`  ✗ FAIL: ${filename} - diff: ${diffPercent.toFixed(4)}% (${numDiffPixels} / ${totalPixels} px)`);
      } else {
        console.log(`  ✓ PASS: ${filename} - diff: ${diffPercent.toFixed(4)}% (${numDiffPixels} px)`);
      }

      results.push({
        file: filename,
        status: passed ? "PASS" : "FAIL",
        diffPixels: numDiffPixels,
        diffPercent: diffPercent,
        totalPixels,
        width,
        height,
        diffImage: !passed ? `diff_${filename}` : null,
      });
    } catch (err) {
      console.error(`  ✗ Error processing ${filename}:`, err.message);
      results.push({
        file: filename,
        status: "ERROR",
        diffPixels: -1,
        diffPercent: 100,
        diffImage: null,
        details: err.message,
      });
      totalFailures++;
    }
  }

  // Generate HTML Report
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Desktop Regression Diff Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0B162C; color: #E2E8F0; padding: 2rem; margin: 0; }
    h1 { color: #FFFFFF; font-size: 24px; margin-bottom: 0.5rem; }
    .summary-card { background: #132247; border: 1px solid #1E3A78; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-weight: bold; font-size: 12px; }
    .badge-pass { background: #16A34A; color: white; }
    .badge-fail { background: #DC2626; color: white; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 14px; }
    th { text-align: left; background: #0E1C38; padding: 12px; border-bottom: 2px solid #233876; }
    td { padding: 10px 12px; border-bottom: 1px solid #1A2B56; }
    tr:hover { background: #15254D; }
    .diff-link { color: #F5A800; text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Desktop Freeze Verification Report</h1>
  <div class="summary-card">
    <p><strong>Total Screenshots Compared:</strong> ${results.length}</p>
    <p><strong>Strict Diff Threshold:</strong> &le; ${MAX_ALLOWED_DIFF_PERCENT}% (0.0002) at pixelmatch threshold 0.1</p>
    <p><strong>Overall Status:</strong> ${
      totalFailures === 0
        ? '<span class="badge badge-pass">100% PASS - 0 DESKTOP REGRESSIONS</span>'
        : `<span class="badge badge-fail">${totalFailures} FAILURES DETECTED</span>`
    }</p>
  </div>

  <table>
    <thead>
      <tr>
        <th>Screenshot File</th>
        <th>Dimensions</th>
        <th>Status</th>
        <th>Diff Pixels</th>
        <th>Diff %</th>
        <th>Artifact</th>
      </tr>
    </thead>
    <tbody>
      ${results
        .map(
          (r) => `
        <tr>
          <td><code>${r.file}</code></td>
          <td>${r.width || "?"} × ${r.height || "?"}</td>
          <td><span class="badge ${r.status === "PASS" ? "badge-pass" : "badge-fail"}">${r.status}</span></td>
          <td>${r.diffPixels >= 0 ? r.diffPixels.toLocaleString() : "N/A"}</td>
          <td>${r.diffPercent.toFixed(4)}%</td>
          <td>${r.diffImage ? `<a class="diff-link" href="diffs/${r.diffImage}" target="_blank">View Diff</a>` : "Identical"}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
</body>
</html>`;

  writeFileSync(REPORT_FILE, html, "utf-8");
  console.log(`\n==================================================`);
  console.log(`Report generated: ${REPORT_FILE}`);
  console.log(`Total Compared: ${results.length} | Failures: ${totalFailures}`);
  console.log(`==================================================`);

  if (totalFailures > 0) {
    process.exitCode = 1;
  }
}

runComparison();
