# Citizen Construction Rentals — Keyword Strategy & Governance

This document establishes the keyword strategy, maintenance protocol, and search query review process for **Citizen Construction Rentals**.

---

## 1. Single Source of Truth: `src/data/seo-keywords.ts`

The canonical mapping of search terms to website routes is defined in:
[`src/data/seo-keywords.ts`](file:///d:/Desktop/Citizen%20rentals%20website1313/src/data/seo-keywords.ts)

Every indexable URL on the website possesses a dedicated entry in `SEO_KEYWORD_MAP`:

```typescript
export interface PageKeywords {
  path: string;
  primary: string;         // Unique across the entire site (zero cannibalization)
  secondary: string[];     // Supporting semantically-related variations
  longTail: string[];      // Informational & conversational queries (e.g., FAQs)
  intent: "commercial" | "local" | "informational";
}
```

### Governing Rules
1. **Zero Duplicate Primary Keywords**: No two pages may target the identical primary search phrase.
2. **Strict Rental Intent**: Citizen Construction Rentals is strictly an equipment rental business. Transactional sales phrases are forbidden.
3. **Natural Integration**: Keyword placement must remain fluid, reader-friendly, and professional.

---

## 2. Keyword Placement Standards

Each route must fulfill this placement matrix:

| Element | Requirement | Example |
| :--- | :--- | :--- |
| `<title>` | Contains primary keyword (verbatim or near-verbatim) | `12 m Scissor Lift on Rent (Straightline GTJZ12) \| Citizen Construction Rentals` |
| `<meta name="description">` | Contains primary keyword within first 120 characters | `Get 12 m scissor lift on rent with Straightline GTJZ12 on rent across India...` |
| `<h1>` or first 100 words | Contains primary keyword | `12 m Scissor Lift on Rent (Straightline GTJZ12)` |
| `<h2>` Headings | At least one H2 contains primary keyword | `12 m Scissor Lift on Rent — Detailed Specifications` |
| Image `alt` Text | At least one image alt contains primary keyword | `alt="12 m scissor lift on rent - Straightline GTJZ12"` |
| Body / FAQ Copy | Every secondary keyword appears at least once | `12 meter scissor lift rental`, `12m scissor lift on hire`, etc. |
| Keyword Density | Max 3 exact matches of primary keyword per 500 words | Maintains organic, natural copy flow without spamming |

---

## 3. Linguistic Variations & Localization

Indian industrial buyers and contractors query access equipment using diverse terminologies. Our pages deliberately incorporate:

### Unit & Measurement Spellings
- **Spaced Metric**: `6 m`, `8 m`, `10 m`, `12 m`, `14 m`
- **Compressed Metric**: `6m`, `8m`, `10m`, `12m`, `14m`
- **Full Meter (American)**: `6 meter`, `8 meter`, `10 meter`, `12 meter`, `14 meter`
- **Full Metre (Commonwealth / Indian Standard)**: `6 metre`, `8 metre`, `10 metre`, `12 metre`, `14 metre`

### Synonyms & Equipment Categories
- `scissor lift`, `man lift`, `aerial work platform (AWP)`, `slab scissor lift`, `cherry picker`, `boom lift`, `aerial lift`
- `on rent`, `on hire`, `rental`, `rent per day`, `rent per month`

### Hindi & Hinglish Search Patterns
On primary pillar pages and the FAQ section, we include dedicated FAQ entries marked with `lang="hi"` and Hinglish variations:
- `"scissor lift kiraye par"`
- `"boom lift kiraye par"`
- `"सिज़र लिफ्ट किराये पर"`

---

## 4. Policy on Banned Transactional Words

Citizen Construction Rentals **never sells, acts as a dealer for, or brokers equipment**. The following terms are strictly banned from commercial and marketing copy:

- `buy`
- `purchase`
- `sale` / `for sale` / `price to buy`
- `sell`
- `dealer` / `dealers` / `dealership`
- `distributor` / `distributors`
- `catalogue` (use `specification sheet` or `reach chart`)
- `warranty` / `guarantee`

> [!CAUTION]
> The automated keyword audit script (`scripts/keyword-audit.mjs`) automatically scans all HTML responses and fails with an exit code of 1 if any banned sales word is found in visible content.

---

## 5. Workflow: Adding or Updating Keywords

When adding a new model or updating targeted queries:

1. **Update `src/data/seo-keywords.ts`**:
   Add or modify the entry under `SEO_KEYWORD_MAP`.
2. **Update Page Content**:
   Integrate the primary keyword into the `<title>`, meta description, `<h1>`, `<h2>`, and an image `alt`. Add secondary keywords into body copy or FAQs.
3. **Execute the Verification Audit**:
   ```bash
   node scripts/keyword-audit.mjs
   ```
4. **Review Report**:
   Inspect `KEYWORD-COVERAGE.csv` to confirm 100% pass status.
5. **Commit & Deploy**.

---

## 6. Quarterly Keyword Review Cadence

Every quarter, perform this review:
1. Open **Google Search Console** > **Performance** > **Search Results**.
2. Filter by non-branded queries (exclude "Citizen").
3. Identify queries with high impressions but low click-through rates (opportunity keywords).
4. Identify emerging city-level queries (e.g., "scissor lift on rent in Pune", "boom lift rental in Gujarat").
5. Add relevant long-tail search queries into `src/data/seo-keywords.ts` and deploy updated FAQs.
