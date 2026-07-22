# Deploying vultsight-website

Static, zero-build site. Two supported hosts:

- **GitHub Pages** — current, auto-deploys on push to `main` (`.github/workflows/deploy.yml`).
- **Cloudflare Pages** — direct upload (no Git connection).

The confidential sales PDF (`_pdf/*.pdf`) is gitignored and never committed. It is
excluded from every deploy path below. Regenerate it locally with `_pdf/build.sh`.

---

## Cloudflare Pages — direct upload

### 1. Build the bundle
```
./rebuild-bundle.sh
```
Produces `~/Downloads/vultsight-site/` and `~/Downloads/vultsight-site.zip`,
excluding `_pdf/`, `scripts/` and repo meta, adding the apex→www `_redirects`,
running the SEO/sitemap check, and aborting if anything confidential leaks in.

### 2. Upload
- **Dashboard:** Workers & Pages → Create → Pages → Upload assets → drag the zip → Deploy.
- **CLI:** `npx wrangler pages deploy ~/Downloads/vultsight-site --project-name=vultsight`

Live at `vultsight.pages.dev`. Re-run both steps to publish changes (no auto-deploy on direct upload).

---

## Custom domain: vultsight.com

**Registrar + DNS is Zoho. Zoho Mail and `demo.vultsight.com` (XDR UAT) live on this
domain.** Moving nameservers to Cloudflare moves ALL DNS — recreate the records below
BEFORE flipping nameservers, or email breaks.

### Records that must exist in Cloudflare before the nameserver cutover

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| MX | `vultsight.com` | `mx.zoho.in` (10) | DNS only |
| MX | `vultsight.com` | `mx2.zoho.in` (20) | DNS only |
| MX | `vultsight.com` | `mx3.zoho.in` (50) | DNS only |
| TXT | `vultsight.com` | `v=spf1 include:zoho.in ~all` | — |
| TXT | `vultsight.com` | `zoho-verification=zb93531124.zmverify.zoho.in` | — |
| TXT | `zoho._domainkey` | `v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDqoS3dunl1eF3dWTiyPFLAwB8FKYIqtiTFZ9kg0Dy3AAhVmpMBnZScTASioUoaSo94TygKBDnBGJd1pscUrkJwLk2WE9iSL+WWaPkr7sUC0TwVSvFDZFKwHexwWby33SnQjpCrlpC1xT+loPaVLF6bgD04dUyfGAToG8OaqcciWwIDAQAB` | — |
| A | `demo` | `13.234.74.88` | DNS only (grey cloud) |

### Sequence
1. Cloudflare → Add a site → `vultsight.com` (Free). It scans and imports records.
2. Compare against the table; add anything missing (DKIM is the usual gap). Keep `demo`
   and all mail records **DNS only** (grey cloud).
3. Pages project → Custom domains → add `www.vultsight.com` and `vultsight.com`
   (leave proxied). `_redirects` handles apex → www.
4. **Only now** change nameservers at the Zoho registrar to the two Cloudflare nameservers.
5. After propagation: `dig www.vultsight.com` resolves to the site; send a test email to a
   Zoho address (mail still flows); `dig demo.vultsight.com` still returns `13.234.74.88`.

Do 1–3 fully before 4 and email never has a gap.

Site canonicals/sitemap use `https://www.vultsight.com`, so www is primary.

---

## Verify current DNS (before you touch anything)
```
dig +short NS vultsight.com
dig +short MX vultsight.com
dig +short TXT vultsight.com
dig +short TXT zoho._domainkey.vultsight.com
dig +short A demo.vultsight.com
```
