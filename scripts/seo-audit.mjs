#!/usr/bin/env node

import { readdirSync, readFileSync } from "fs";
import { resolve, join } from "path";

const BASE_URL = process.env.AUDIT_BASE_URL || "http://localhost:3000";
const PRODUCTION_HOST = "https://citizenconstructions.com";

const ROUTES = [
  "/",
  "/scissor-lift-on-rent",
  "/boom-lift-on-rent",
  "/rental-rates",
  "/brand-new",
  "/brand-new/scissor-lifts",
  "/brand-new/boom-lifts",
  "/brand-new/scissor-lifts/gtjz06",
  "/brand-new/scissor-lifts/gtjz08",
  "/brand-new/scissor-lifts/gtjz10",
  "/brand-new/scissor-lifts/gtjz12",
  "/brand-new/scissor-lifts/gtjz14",
  "/brand-new/boom-lifts/sl28t",
  "/brand-new/boom-lifts/articulating-boom",
  "/used",
  "/used/scissor-lifts",
  "/used/boom-lifts",
  "/about",
  "/contact",
];

const BANNED_URL_PATTERNS = [
  /localhost:\d+/i,
  /[a-z0-9-]+\.vercel\.app/i,
  /[a-z0-9-]+\.netlify\.app/i,
  /https?:\/\/www\.citizenconstructions\.com/i,
];

let totalChecks = 0;
let passedChecks = 0;
let failures = [];

function check(desc, passed, detail = "") {
  totalChecks++;
  if (passed) {
    passedChecks++;
    console.log(`  ✓ ${desc}`);
  } else {
    failures.push({ desc, detail });
    console.error(`  ✗ ${desc} - ${detail}`);
  }
}

async function runSeoAudit() {
  console.log("==================================================");
  console.log("CITIZEN CONSTRUCTIONS - SEO & DOMAIN AUDIT");
  console.log(`Auditing target: ${BASE_URL}`);
  console.log(`Production Host: ${PRODUCTION_HOST}`);
  console.log("==================================================\n");

  // 1. Audit robots.txt
  console.log("1. Checking /robots.txt...");
  try {
    const res = await fetch(`${BASE_URL}/robots.txt`);
    check("robots.txt returns status 200", res.status === 200, `status: ${res.status}`);
    const body = await res.text();

    const isPreview = process.env.NEXT_PUBLIC_ENV === "preview" || process.env.NEXT_PUBLIC_ENV === "staging";
    if (isPreview) {
      check("Preview robots.txt disallows /", body.includes("Disallow: /"));
    } else {
      check("robots.txt points to https://citizenconstructions.com/sitemap.xml", body.includes(`Sitemap: ${PRODUCTION_HOST}/sitemap.xml`));
      check("robots.txt allows public crawling", body.includes("Allow: /") || body.includes("Disallow: /private/"));
      check("robots.txt contains no localhost/vercel/netlify/www", !BANNED_URL_PATTERNS.some((p) => p.test(body)));
    }
  } catch (err) {
    check("robots.txt fetch", false, err.message);
  }

  // 2. Audit sitemap.xml
  console.log("\n2. Checking /sitemap.xml...");
  try {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    check("sitemap.xml returns status 200", res.status === 200, `status: ${res.status}`);
    const xml = await res.text();

    const locMatches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    check(`sitemap.xml has URLs (found ${locMatches.length})`, locMatches.length >= 15);

    let allLocProduction = true;
    let anyBanned = false;
    for (const loc of locMatches) {
      if (!loc.startsWith(PRODUCTION_HOST)) {
        allLocProduction = false;
      }
      if (BANNED_URL_PATTERNS.some((p) => p.test(loc))) {
        anyBanned = true;
      }
    }
    check("Every <loc> starts with https://citizenconstructions.com", allLocProduction);
    check("Zero banned domains (localhost/vercel/netlify/www) in sitemap", !anyBanned);

    // Verify key pillar routes in sitemap
    check("sitemap contains /scissor-lift-on-rent", locMatches.includes(`${PRODUCTION_HOST}/scissor-lift-on-rent`));
    check("sitemap contains /boom-lift-on-rent", locMatches.includes(`${PRODUCTION_HOST}/boom-lift-on-rent`));
    check("sitemap contains /rental-rates", locMatches.includes(`${PRODUCTION_HOST}/rental-rates`));
  } catch (err) {
    check("sitemap.xml fetch", false, err.message);
  }

  // 3. Audit all HTML routes
  console.log("\n3. Checking HTML routes canonicals, metadata, and JSON-LD...");
  for (const path of ROUTES) {
    const expectedCanonical = `${PRODUCTION_HOST}${path === "/" ? "" : path}`;
    try {
      const res = await fetch(`${BASE_URL}${path}`);
      check(`[${path}] returns status 200`, res.status === 200, `status: ${res.status}`);
      const html = await res.text();

      // Check canonical link
      const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
      const actualCanonical = canonicalMatch ? canonicalMatch[1] : null;

      check(
        `[${path}] canonical equals ${expectedCanonical}`,
        actualCanonical === expectedCanonical,
        `found: ${actualCanonical}`
      );

      // Check og:url
      const ogUrlMatch = html.match(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']*)["']/i);
      if (ogUrlMatch) {
        check(
          `[${path}] og:url starts with ${PRODUCTION_HOST}`,
          ogUrlMatch[1].startsWith(PRODUCTION_HOST),
          `found: ${ogUrlMatch[1]}`
        );
      }

      // Check banned domains in metadata tags
      const metaTags = [...html.matchAll(/<(meta|link)[^>]+>/gi)].map((m) => m[0]);
      let hasBannedInMeta = false;
      for (const tag of metaTags) {
        // Allow localhost in script bundles during dev if any, but not in canonical/meta
        if (tag.includes('rel="canonical"') || tag.includes('property="og:') || tag.includes('name="twitter:')) {
          if (BANNED_URL_PATTERNS.some((p) => p.test(tag))) {
            hasBannedInMeta = true;
          }
        }
      }
      check(`[${path}] meta tags contain zero localhost/vercel/netlify/www`, !hasBannedInMeta);

      // Check JSON-LD
      const jsonLdMatches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis)];
      let jsonLdValid = true;
      let jsonLdHasBanned = false;
      for (const match of jsonLdMatches) {
        try {
          const jsonText = match[1];
          if (BANNED_URL_PATTERNS.some((p) => p.test(jsonText))) {
            jsonLdHasBanned = true;
          }
          const data = JSON.parse(jsonText);
          if (data["@graph"]) {
            for (const item of data["@graph"]) {
              if (item["@id"] && !item["@id"].startsWith(PRODUCTION_HOST)) {
                jsonLdValid = false;
              }
            }
          }
        } catch (e) {
          // Ignore JSON parse errors in snippet
        }
      }
      check(`[${path}] JSON-LD graph IDs start with ${PRODUCTION_HOST}`, jsonLdValid);
      check(`[${path}] JSON-LD contains zero localhost/vercel/netlify/www`, !jsonLdHasBanned);
    } catch (err) {
      check(`[${path}] fetch error`, false, err.message);
    }
  }

  // 4. Audit Redirect Rules (Next.js middleware & next.config)
  console.log("\n4. Checking 301 Redirect Rules...");
  const redirectTests = [
    { from: "/scissor-lifts", expected: "/brand-new/scissor-lifts" },
    { from: "/boom-lifts", expected: "/brand-new/boom-lifts" },
    { from: "/fleet", expected: "/brand-new" },
  ];

  for (const { from, expected } of redirectTests) {
    try {
      const res = await fetch(`${BASE_URL}${from}`, { redirect: "manual" });
      const location = res.headers.get("location");
      check(
        `Redirect ${from} -> ${expected}`,
        (res.status === 301 || res.status === 308) && location === expected,
        `status: ${res.status}, location: ${location}`
      );
    } catch (err) {
      check(`Redirect ${from}`, false, err.message);
    }
  }

  // Middleware host header redirect check
  try {
    const res = await fetch(`${BASE_URL}/`, {
      redirect: "manual",
      headers: {
        "x-forwarded-host": "www.citizenconstructions.com",
        "host": "www.citizenconstructions.com",
      },
    });
    const location = res.headers.get("location");
    check(
      "Host: www.citizenconstructions.com redirects 301 to https://citizenconstructions.com",
      (res.status === 301 || res.status === 308) && (location === "https://citizenconstructions.com/" || location === "https://citizenconstructions.com"),
      `status: ${res.status}, location: ${location}`
    );
  } catch (err) {
    check("www host redirect", false, err.message);
  }

  // Summary
  console.log("\n==================================================");
  console.log(`TOTAL CHECKS: ${totalChecks}`);
  console.log(`PASSED: ${passedChecks}`);
  console.log(`FAILED: ${failures.length}`);
  console.log("==================================================");

  if (failures.length > 0) {
    console.error("\nFAILURES:");
    for (const f of failures) {
      console.error(`- ${f.desc} (${f.detail})`);
    }
    process.exit(1);
  } else {
    console.log("\n✓ ALL SEO AUDIT CHECKS PASSED PERFECTLY!");
    process.exit(0);
  }
}

runSeoAudit();
