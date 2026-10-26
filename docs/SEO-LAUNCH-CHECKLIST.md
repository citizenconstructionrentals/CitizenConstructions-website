# Citizen Construction Rentals — Production SEO Launch Checklist

This document is the definitive launch runbook for deploying **Citizen Construction Rentals** under the canonical domain **`https://citizenconstructions.com`**.

---

## 1. Domain & DNS Configuration

1. **Apex Domain (`citizenconstructions.com`)**:
   - Add the A/CNAME DNS records provided by your hosting provider (Vercel, Cloudflare, Netlify, AWS, etc.).
   - Enable SSL/TLS with automatic HTTPS redirection.
2. **Subdomain (`www.citizenconstructions.com`)**:
   - Add the CNAME record pointing `www` to your host.
   - Configure a single-hop 301 permanent redirect from `www.citizenconstructions.com` to `https://citizenconstructions.com`.
3. **Verify Propagation**:
   - Both `citizenconstructions.com` and `www.citizenconstructions.com` must resolve with valid SSL certificates.

---

## 2. Environment Variables Configuration

Set these environment variables in your hosting provider's production dashboard:

```env
NEXT_PUBLIC_SITE_URL=https://citizenconstructions.com
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GSC_VERIFICATION=
NEXT_PUBLIC_BING_VERIFICATION=
```

> [!NOTE]
> For preview and staging environments, set `NEXT_PUBLIC_ENV=preview` so Next.js automatically emits `noindex, nofollow` meta tags and serves a `robots.txt` that disallows all crawlers.

---

## 3. Search Engine Webmaster Setup

### Google Search Console (GSC)
1. **Domain Property**:
   - Add a new **Domain property** for `citizenconstructions.com`.
   - Verify via DNS TXT record at your domain registrar.
2. **URL-Prefix Property**:
   - Also add the URL-prefix property: `https://citizenconstructions.com/`.
3. **Submit Sitemap**:
   - Go to **Sitemaps** and submit: `https://citizenconstructions.com/sitemap.xml`.
4. **Request Priority Indexing**:
   - Inspect and request indexing for key target pages:
     - `https://citizenconstructions.com/`
     - `https://citizenconstructions.com/scissor-lift-on-rent`
     - `https://citizenconstructions.com/boom-lift-on-rent`
     - `https://citizenconstructions.com/rental-rates`
     - `https://citizenconstructions.com/brand-new`
     - `https://citizenconstructions.com/brand-new/scissor-lifts`
     - `https://citizenconstructions.com/brand-new/boom-lifts`
     - `https://citizenconstructions.com/used`
     - `https://citizenconstructions.com/about`
     - `https://citizenconstructions.com/contact`

### Bing Webmaster Tools
1. Sign in with the same Google Account and select **"Import from Google Search Console"**.
2. Or add `https://citizenconstructions.com/` manually, verify via meta tag (`NEXT_PUBLIC_BING_VERIFICATION`), and submit `https://citizenconstructions.com/sitemap.xml`.

### Google Business Profile (GBP)
When setting up or updating Google Business Profile:
- **Official Name**: Citizen Construction Rentals
- **Website URL**: `https://citizenconstructions.com?utm_source=gbp&utm_medium=organic&utm_campaign=profile`
- **Primary Category**: Equipment rental agency / Construction machine rental service
- **Service Area**: Pan-India

---

## 4. Production Redirect & Canonical Verification

Execute these verification commands against the live production server:

```bash
# 1. HTTP apex redirects 301 to HTTPS apex
curl -I http://citizenconstructions.com/
# Must return: HTTP/1.1 301 Moved Permanently -> Location: https://citizenconstructions.com/

# 2. HTTP www redirects 301 to HTTPS apex (single hop)
curl -I http://www.citizenconstructions.com/
# Must return: HTTP/1.1 301 Moved Permanently -> Location: https://citizenconstructions.com/

# 3. HTTPS www redirects 301 to HTTPS apex (single hop)
curl -I https://www.citizenconstructions.com/
# Must return: HTTP/2 301 -> Location: https://citizenconstructions.com/

# 4. HTTPS apex loads directly
curl -I https://citizenconstructions.com/
# Must return: HTTP/2 200 OK

# 5. robots.txt validation
curl -s https://citizenconstructions.com/robots.txt
# Must contain: Sitemap: https://citizenconstructions.com/sitemap.xml

# 6. sitemap.xml validation
curl -s https://citizenconstructions.com/sitemap.xml | grep -c '<loc>'
# Must return >= 19 entries, each starting with https://citizenconstructions.com/

# 7. Automated CLI Audits
node scripts/seo-audit.mjs
# Must exit code 0

node scripts/keyword-audit.mjs
# Must exit code 0 and generate KEYWORD-COVERAGE.csv
```
