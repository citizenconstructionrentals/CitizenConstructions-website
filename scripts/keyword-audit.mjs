#!/usr/bin/env node

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = process.env.AUDIT_BASE_URL || "http://localhost:3000";

// Import SEO Keyword Map and Banned Words
const SEO_KEYWORD_MAP = {
  "/": {
    path: "/",
    primary: "scissor lift on rent",
    secondary: [
      "boom lift on rent",
      "scissor lift rental India",
      "boom lift rental India",
      "aerial work platform rental",
      "man lift on rent",
      "aerial lift on hire",
      "Citizen Construction Rentals",
    ],
  },
  "/scissor-lift-on-rent": {
    path: "/scissor-lift-on-rent",
    primary: "scissor lift on rent in India",
    secondary: [
      "scissor lift rental",
      "scissor lift on hire",
      "electric scissor lift on rent",
      "self-propelled scissor lift rental",
      "man lift on rent",
      "scissor lift rent per month",
      "scissor lift rent per day",
    ],
  },
  "/boom-lift-on-rent": {
    path: "/boom-lift-on-rent",
    primary: "boom lift on rent in India",
    secondary: [
      "boom lift rental",
      "boom lift on hire",
      "cherry picker on rent",
      "aerial work platform on rent",
      "boom lift for high reach work",
    ],
  },
  "/rental-rates": {
    path: "/rental-rates",
    primary: "scissor lift rental rate",
    secondary: [
      "boom lift rental cost",
      "scissor lift rent per day",
      "scissor lift rent per month",
      "aerial work platform rental charges",
      "how much does it cost to rent a scissor lift",
    ],
  },
  "/brand-new": {
    path: "/brand-new",
    primary: "brand new lift on rent",
    secondary: [
      "new scissor lift on rent",
      "new boom lift on rent",
      "CE certified lift on rent",
      "Straightline lift rental",
    ],
  },
  "/brand-new/scissor-lifts": {
    path: "/brand-new/scissor-lifts",
    primary: "brand new scissor lift on rent",
    secondary: [
      "Straightline scissor lift rental",
      "CE certified scissor lift on rent",
      "electric scissor lift rental",
      "6m 8m 10m 12m 14m scissor lift on rent",
    ],
  },
  "/brand-new/boom-lifts": {
    path: "/brand-new/boom-lifts",
    primary: "brand new boom lift on rent",
    secondary: [
      "Straightline boom lift rental",
      "CE certified boom lift on rent",
      "boom lift for high reach work on rent",
    ],
  },
  "/brand-new/scissor-lifts/gtjz06": {
    path: "/brand-new/scissor-lifts/gtjz06",
    primary: "6 m scissor lift on rent",
    secondary: [
      "Straightline GTJZ06 on rent",
      "6 meter scissor lift rental",
      "6m scissor lift on hire",
      "electric scissor lift 6m",
    ],
  },
  "/brand-new/scissor-lifts/gtjz08": {
    path: "/brand-new/scissor-lifts/gtjz08",
    primary: "8 m scissor lift on rent",
    secondary: [
      "Straightline GTJZ08 on rent",
      "8 meter scissor lift rental",
      "8m scissor lift on hire",
      "electric scissor lift 8m",
    ],
  },
  "/brand-new/scissor-lifts/gtjz10": {
    path: "/brand-new/scissor-lifts/gtjz10",
    primary: "10 m scissor lift on rent",
    secondary: [
      "Straightline GTJZ10 on rent",
      "10 meter scissor lift rental",
      "10m scissor lift on hire",
      "electric scissor lift 10m",
    ],
  },
  "/brand-new/scissor-lifts/gtjz12": {
    path: "/brand-new/scissor-lifts/gtjz12",
    primary: "12 m scissor lift on rent",
    secondary: [
      "Straightline GTJZ12 on rent",
      "12 meter scissor lift rental",
      "12m scissor lift on hire",
      "electric scissor lift 12m",
    ],
  },
  "/brand-new/scissor-lifts/gtjz14": {
    path: "/brand-new/scissor-lifts/gtjz14",
    primary: "14 m scissor lift on rent",
    secondary: [
      "Straightline GTJZ14 on rent",
      "14 meter scissor lift rental",
      "14m scissor lift on hire",
      "electric scissor lift 14m",
    ],
  },
  "/brand-new/boom-lifts/sl28t": {
    path: "/brand-new/boom-lifts/sl28t",
    primary: "Straightline SL28T boom lift on rent",
    secondary: [
      "SL28T boom lift rental",
      "boom lift on rent",
      "28m working height boom lift hire",
      "high reach boom lift rental India",
    ],
  },
  "/brand-new/boom-lifts/articulating-boom": {
    path: "/brand-new/boom-lifts/articulating-boom",
    primary: "Straightline articulating boom lift on rent",
    secondary: [
      "articulating boom lift rental",
      "boom lift on rent",
      "up and over boom lift hire",
      "16m working height boom lift rental",
    ],
  },
  "/used": {
    path: "/used",
    primary: "JLG and Genie lift on rent",
    secondary: [
      "used lift on rent",
      "JLG lift rental",
      "Genie lift rental",
      "trusted aerial platform hire",
    ],
  },
  "/used/scissor-lifts": {
    path: "/used/scissor-lifts",
    primary: "JLG scissor lift on rent",
    secondary: [
      "Genie scissor lift on rent",
      "used scissor lift on rent",
      "Genie scissor lift rental India",
      "JLG electric scissor rental",
    ],
  },
  "/used/boom-lifts": {
    path: "/used/boom-lifts",
    primary: "JLG boom lift on rent",
    secondary: [
      "Genie boom lift on rent",
      "used boom lift on rent",
      "Genie boom lift rental India",
      "JLG rough terrain boom rental",
    ],
  },
  "/about": {
    path: "/about",
    primary: "scissor lift rental company in India",
    secondary: [
      "aerial work platform rental company",
      "boom lift rental company since 2000",
      "Citizen Construction Rentals",
      "pan India lift rental operations",
    ],
  },
  "/contact": {
    path: "/contact",
    primary: "scissor lift rental quote",
    secondary: [
      "boom lift rental contact",
      "scissor lift on rent contact number",
      "Citizen Construction Rentals contact",
      "instant rental quote on WhatsApp",
    ],
  },
};

const BANNED_SALES_WORDS = [
  "buy",
  "purchase",
  "sale",
  "sell",
  "dealer",
  "dealers",
  "dealership",
  "distributor",
  "distributors",
  "catalogue",
  "warranty",
  "guarantee",
  "price to buy",
  "for sale",
];

function cleanHtml(html) {
  return html
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, "")
    .replace(/<svg[^>]*>([\s\S]*?)<\/svg>/gi, "");
}

function extractText(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : html;
  const noCode = cleanHtml(bodyHtml);
  return noCode.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

async function runKeywordAudit() {
  console.log("==================================================");
  console.log("CITIZEN CONSTRUCTIONS - KEYWORD COVERAGE AUDIT");
  console.log(`Auditing target: ${BASE_URL}`);
  console.log("==================================================\n");

  const paths = Object.keys(SEO_KEYWORD_MAP);
  const rows = [];
  let overallFailed = false;

  // Check 1: Duplicate Primary Keywords across pages
  const primaryCounts = {};
  for (const path of paths) {
    const p = SEO_KEYWORD_MAP[path].primary.toLowerCase().trim();
    primaryCounts[p] = (primaryCounts[p] || 0) + 1;
  }
  const duplicatePrimaries = Object.entries(primaryCounts).filter(([_, count]) => count > 1);
  if (duplicatePrimaries.length > 0) {
    console.error("✗ CRITICAL: Duplicate primary keywords detected across pages:");
    for (const [kw, count] of duplicatePrimaries) {
      console.error(`  - "${kw}" used on ${count} pages`);
    }
    overallFailed = true;
  } else {
    console.log("✓ Zero duplicate primary keywords across pages.\n");
  }

  // Audit each page
  for (const path of paths) {
    const { primary, secondary } = SEO_KEYWORD_MAP[path];
    const url = `${BASE_URL}${path}`;
    console.log(`Auditing ${path} (Primary: "${primary}")...`);

    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        console.error(`  ✗ HTTP Status ${res.status}`);
        overallFailed = true;
        rows.push({
          path,
          primary,
          title: "FAIL",
          metaDesc: "FAIL",
          h1: "FAIL",
          h2: "FAIL",
          alt: "FAIL",
          secCoverage: "0%",
          secMissing: "HTTP_ERROR",
          wordCount: 0,
          density: "FAIL",
          bannedWords: "N/A",
          status: "FAILED",
        });
        continue;
      }

      const html = await res.text();
      const rawText = extractText(html);
      const words = rawText.split(/\s+/).filter(Boolean);
      const wordCount = words.length;

      // 1. Title match
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const titleText = titleMatch ? titleMatch[1] : "";
      const hasTitle = titleText.toLowerCase().includes(primary.toLowerCase());

      // 2. Meta description match
      const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
      const descText = descMatch ? descMatch[1] : "";
      const hasMetaDesc = descText.toLowerCase().includes(primary.toLowerCase());

      // 3. H1 / First 100 words match
      const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
        m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().toLowerCase()
      );
      const first100Words = words.slice(0, 100).join(" ").toLowerCase();
      const hasH1 =
        h1Matches.some((h) => h.includes(primary.toLowerCase())) ||
        first100Words.includes(primary.toLowerCase());

      // 4. H2 match
      const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
        m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().toLowerCase()
      );
      const hasH2 = h2Matches.some((h) => h.includes(primary.toLowerCase()));

      // 5. Image Alt match
      const altMatches = [...html.matchAll(/<img[^>]+alt=["']([^"']*)["']/gi)].map((m) => m[1].toLowerCase());
      const hasAlt = altMatches.some((alt) => alt.includes(primary.toLowerCase()));

      // 6. Secondary keywords coverage
      const lowerText = rawText.toLowerCase();
      const missingSec = [];
      for (const sec of secondary) {
        if (!lowerText.includes(sec.toLowerCase())) {
          missingSec.push(sec);
        }
      }
      const secPassed = secondary.length - missingSec.length;
      const secCoverage = `${Math.round((secPassed / secondary.length) * 100)}%`;

      // 7. Density check (<= 3 exact matches per 500 words)
      const primaryRegex = new RegExp(primary.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      const primaryOccurrences = (rawText.match(primaryRegex) || []).length;
      const maxAllowedMatches = Math.max(3, Math.ceil((wordCount / 500) * 3));
      const densityPassed = primaryOccurrences <= maxAllowedMatches;
      const densityStatus = densityPassed ? `OK (${primaryOccurrences} / ${wordCount}w)` : `HIGH (${primaryOccurrences} / ${wordCount}w)`;

      // 8. Banned sales words check
      // Exclude text inside known legal disclaimers if needed, or scan clean text
      const bannedFound = [];
      for (const bw of BANNED_SALES_WORDS) {
        const bwRegex = new RegExp(`\\b${bw}\\b`, "i");
        if (bwRegex.test(rawText)) {
          // Check if it only occurs in disclaimer or footer
          bannedFound.push(bw);
        }
      }
      const bannedStatus = bannedFound.length === 0 ? "NONE" : bannedFound.join("; ");

      // Check results
      const pagePass =
        hasTitle &&
        hasMetaDesc &&
        hasH1 &&
        hasH2 &&
        hasAlt &&
        missingSec.length === 0 &&
        densityPassed &&
        bannedFound.length === 0;

      if (!pagePass) {
        overallFailed = true;
      }

      console.log(`  Title: ${hasTitle ? "✓" : "✗"}`);
      console.log(`  Meta Desc: ${hasMetaDesc ? "✓" : "✗"}`);
      console.log(`  H1/First 100w: ${hasH1 ? "✓" : "✗"}`);
      console.log(`  H2: ${hasH2 ? "✓" : "✗"}`);
      console.log(`  Image Alt: ${hasAlt ? "✓" : "✗"}`);
      console.log(`  Secondary Coverage: ${secCoverage} (Missing: ${missingSec.length ? missingSec.join(", ") : "None"})`);
      console.log(`  Density: ${densityPassed ? "✓" : "✗"} (${densityStatus})`);
      console.log(`  Banned Words: ${bannedFound.length === 0 ? "✓ (None)" : `✗ (${bannedStatus})`}\n`);

      rows.push({
        path,
        primary,
        title: hasTitle ? "PASS" : "FAIL",
        metaDesc: hasMetaDesc ? "PASS" : "FAIL",
        h1: hasH1 ? "PASS" : "FAIL",
        h2: hasH2 ? "PASS" : "FAIL",
        alt: hasAlt ? "PASS" : "FAIL",
        secCoverage,
        secMissing: missingSec.join("; ") || "NONE",
        wordCount,
        density: densityStatus,
        bannedWords: bannedStatus,
        status: pagePass ? "PASSED" : "FAILED",
      });
    } catch (err) {
      console.error(`  ✗ Error fetching ${path}: ${err.message}`);
      overallFailed = true;
      rows.push({
        path,
        primary,
        title: "ERROR",
        metaDesc: "ERROR",
        h1: "ERROR",
        h2: "ERROR",
        alt: "ERROR",
        secCoverage: "0%",
        secMissing: err.message,
        wordCount: 0,
        density: "ERROR",
        bannedWords: "ERROR",
        status: "ERROR",
      });
    }
  }

  // Write KEYWORD-COVERAGE.csv
  const csvHeaders = [
    "Path",
    "Primary Keyword",
    "Title Match",
    "Meta Desc Match",
    "H1 Match",
    "H2 Match",
    "Alt Match",
    "Secondary Coverage %",
    "Secondary Missing",
    "Word Count",
    "Density Status",
    "Banned Words Found",
    "Status",
  ];

  const csvRows = [
    csvHeaders.join(","),
    ...rows.map((r) =>
      [
        `"${r.path}"`,
        `"${r.primary}"`,
        `"${r.title}"`,
        `"${r.metaDesc}"`,
        `"${r.h1}"`,
        `"${r.h2}"`,
        `"${r.alt}"`,
        `"${r.secCoverage}"`,
        `"${r.secMissing.replace(/"/g, '""')}"`,
        r.wordCount,
        `"${r.density}"`,
        `"${r.bannedWords}"`,
        `"${r.status}"`,
      ].join(",")
    ),
  ];

  const csvPath = resolve(process.cwd(), "KEYWORD-COVERAGE.csv");
  writeFileSync(csvPath, csvRows.join("\n"), "utf-8");
  console.log(`\nWritten full coverage report to ${csvPath}`);

  if (overallFailed) {
    console.error("\n❌ KEYWORD AUDIT FAILED. Check the details above or in KEYWORD-COVERAGE.csv");
    process.exit(1);
  } else {
    console.log("\n✅ ALL KEYWORD COVERAGE AUDITS PASSED PERFECTLY!");
    process.exit(0);
  }
}

runKeywordAudit();
