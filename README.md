# VultSight — Marketing Website

A standalone, zero-build multi-page marketing site for VultSight XDR.
Enterprise corporate structure (OpenText-style) with the VultSight brand:
**light theme with dark hero / stats / CTA / footer bands**, gold mark + indigo/cyan accents.

## Pages
- `index.html` — home (hero, pillars, capabilities, why, stats, AI, integrations, CTA)
- `platform.html` — XDR / security-operations deep-dive (ingestion, detection, correlation, UEBA, AI, SOAR, compliance, integrations)
- `noc.html` — NOC / network-operations deep-dive (monitoring pipeline, device & service health, topology, SLA, discovery, telemetry, wallboard, incidents)
- `services.html` — Managed services (managed SOC / NOC / command center, MDR, onboarding, compliance) + engagement models (fully managed / co-managed / MSSP enablement)
- `solutions.html` — Why VultSight / by-audience (MSSP, enterprise, compliance) + differentiators
- `company.html` — mission, values, journey timeline, deployment models
- `resources.html` — resource hub with client-side type filtering (guides / datasheets / blog)
- `resource.html` — article: "SIEM vs XDR: what actually changes in the SOC"
- `xdr-vs-siem-soar.html` — SEO article: "XDR vs SIEM vs SOAR" (comparison table + FAQ schema)
- `contact.html` — "Talk to us" page with a **working form** (client-side validation + success state)
- `404.html` — branded not-found page (`noindex`; most static hosts serve it automatically — on Nginx set `error_page 404 /404.html;`)

## Shared infrastructure
- `site.js` — embeds the shared header/footer (as strings) and injects them into every page's `[data-include]` slots with **no network request**, so the site works when opened directly from disk. Also handles active-nav highlight, mobile menu, animated counters, scroll reveal, and contact-form handling.
- `styles.css` — design system (light theme + `.band--dark` feature bands) and responsive layout
- `assets/` — `vultsight-mark.svg` (light, for dark bands), `vultsight-mark-dark.svg` (dark, for the light header), lockup, favicon

## Run locally
No build step, no server required — just **double-click `index.html`** to open it in a browser.

To serve it over HTTP instead (e.g. for deployment testing):

```bash
npx serve . -l 4321
# or
python3 -m http.server 4321
```

## Wiring the demo form
`site.js` → `initForm()` currently simulates submission. Replace the `setTimeout`
block with a real `fetch('POST', …)` to your backend (e.g. a `/v1/leads` endpoint
or a form service) to capture leads.

## SEO

On-page SEO is built in: per-page `<title>`, meta description, canonical URL,
Open Graph + Twitter cards, and JSON-LD structured data (Organization, WebSite,
SoftwareApplication, Service, Article, FAQPage). Plus `robots.txt` and
`sitemap.xml`.

**Set your real domain.** Everything uses `https://www.vultsight.com` as the
base. If your domain differs, find-and-replace it across the `.html` files,
`robots.txt`, and run the script with `SITE_URL` set (below).

### Audit + sitemap automation
```bash
node scripts/seo.mjs          # audit every page (CI-friendly; non-zero exit on errors)
node scripts/seo.mjs --fix    # also regenerate sitemap.xml
SITE_URL=https://your.domain node scripts/seo.mjs --fix
```
`.github/workflows/seo.yml` runs this automatically: it audits on every
push to the repo (failing the build on SEO errors) and regenerates +
commits `sitemap.xml` weekly. Set a repo **variable** `SITE_URL` to your domain.

### To actually rank
No tool can directly change Google rankings — the technical foundation here is
necessary but not sufficient. After deploy:
1. Submit `sitemap.xml` in **Google Search Console** and **Bing Webmaster Tools**.
2. Publish content regularly (the `resources/` articles are the engine).
3. Earn backlinks (listings, partners, PR, guest posts).
4. Keep Core Web Vitals green (this site is static + light, so it starts strong).

## Product-tour PDF (sales asset)

`_pdf/` holds a client-facing **product tour** — a cover plus six full-screen,
high-fidelity mockups of the VultSight console (SOC Command Center, Investigation
Workbench, Alert Queue + AI triage, UEBA, SOAR playbook, NOC wallboard) and a
closing page, in the product's real dark glassmorphism design with realistic
sample data.

- Source: `_pdf/product-tour.html` (each `.screen` = one landscape PDF page)
- Output: `_pdf/VultSight-Product-Tour.pdf`
- Rebuild PDF after edits: `bash _pdf/build.sh` (renders via Google Chrome headless)

Public, in-browser tours are generated from the **same screen source** — split by domain:
- `node _pdf/build-web.mjs` → writes `product-tour-soc.html` (5 SOC screens) and
  `product-tour-noc.html` (4 NOC screens) at the site root. Both are scrollable,
  responsive galleries that cross-link to each other and are linked from the footer.
- The screens live once in `_pdf/product-tour.html` (cover + 9 console screens + closing).
  `build-web.mjs` slices them: screens 1–5 → SOC tour, 6–9 → NOC tour. Edit there, then
  regenerate the web tours (`build-web.mjs`) and the PDF (`build.sh`).

This is a **sales asset to email to prospects**, not a public download — the
cover is marked "Confidential — for evaluation", so it is intentionally **not**
linked from the site and is excluded from the sitemap (it lives in a subfolder).
The data shown is illustrative; for literal screenshots, run the live console.

Content is sourced from `VULTSIGHT_XDR_PRODUCT.md`.
