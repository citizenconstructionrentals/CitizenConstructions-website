# Citizen Construction Rentals — Search Engine Optimization Architecture

This document outlines the SEO architecture, canonical domain standards, structured data schema, and crawler guidelines for **Citizen Construction Rentals**.

---

## 1. Production Canonical Domain

- **Canonical URL**: `https://citizenconstructions.com`
- **Protocol**: HTTPS (enforced)
- **Subdomain**: None (apex domain; `www` permanently redirects to apex)
- **Trailing Slash**: No trailing slash on internal pages (e.g., `/scissor-lift-on-rent`)

```typescript
// src/config/site.ts
export const siteConfig = {
  name: "Citizen Construction Rentals",
  alternateName: ["Citizen Constructions"],
  domain: "citizenconstructions.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://citizenconstructions.com",
  // ...
};
```

---

## 2. Redirection Architecture (301 Permanent, Single-Hop)

To preserve crawl equity and prevent link dilution, all redirects are configured to execute in exactly **one hop**:

| Incoming Request | Target URL | Status Code |
| :--- | :--- | :--- |
| `http://citizenconstructions.com/*` | `https://citizenconstructions.com/*` | 301 Permanent |
| `http://www.citizenconstructions.com/*` | `https://citizenconstructions.com/*` | 301 Permanent |
| `https://www.citizenconstructions.com/*` | `https://citizenconstructions.com/*` | 301 Permanent |
| `/scissor-lifts` (legacy) | `/brand-new/scissor-lifts` | 301 Permanent |
| `/boom-lifts` (legacy) | `/brand-new/boom-lifts` | 301 Permanent |
| `/fleet` (legacy) | `/brand-new` | 301 Permanent |

### Redirection Implementation
1. **Next.js Middleware (`src/middleware.ts`)**:
   Intercepts incoming `host` headers containing `www.` or `http:` and returns an immediate 301 redirect before page processing.
2. **Next.js Config (`next.config.ts`)**:
   Registers permanent path-level redirects.

---

## 3. Metadata and OpenGraph Standards

Every indexable page configures:
- `metadataBase: new URL(siteConfig.url)`
- Specific `alternates.canonical` matching its exact path.
- `title` incorporating the page's primary target keyword and brand.
- `description` adhering to 140–160 character limits, containing primary and secondary keywords naturally.
- `openGraph` and `twitter` tags pointing to absolute production image assets (e.g. `https://citizenconstructions.com/images/hero/hero-boom-lot.jpg`).

---

## 4. Structured Data Schema (JSON-LD)

Citizen Construction Rentals utilizes Schema.org `@graph` syntax rendered on all pages (`src/components/shared/JsonLd.tsx`):

- **Organization**:
  - `@id`: `https://citizenconstructions.com/#organization`
  - `name`: `"Citizen Construction Rentals"`
  - `alternateName`: `["Citizen Constructions"]`
  - `url`: `https://citizenconstructions.com`
  - `logo`: `https://citizenconstructions.com/brand/logo.png`
- **LocalBusiness**:
  - `@id`: `https://citizenconstructions.com/#localbusiness`
  - `name`: `"Citizen Construction Rentals"`
  - `alternateName`: `["Citizen Constructions"]`
  - `priceRange`: `"₹₹"`
  - `currenciesAccepted`: `"INR"`
  - `address`: Country `"IN"` (Pan-India operations)
- **WebSite**:
  - `@id`: `https://citizenconstructions.com/#website`
  - `url`: `https://citizenconstructions.com`
  - `publisher`: `{"@id": "https://citizenconstructions.com/#organization"}`

Individual product pages also render `Product` and `Offer` schema with `itemCondition: "NewCondition" | "UsedCondition"` and `availability: "InStock"`.

---

## 5. Crawler & Indexing Directives

- **Robots Configuration (`src/app/robots.ts`)**:
  - Production: Allows all standard user-agents, disallows `/private/` and internal debug paths, references `https://citizenconstructions.com/sitemap.xml`.
  - Staging / Preview (`NEXT_PUBLIC_ENV=preview`): Disallows `/` completely.
- **Sitemap Generation (`src/app/sitemap.ts`)**:
  - Emits all 19 indexable pages with `weekly` change frequency and prioritized weights (`1.0` for Home, `0.9` for Pillar and Listing pages, `0.8` for Product detail pages).
