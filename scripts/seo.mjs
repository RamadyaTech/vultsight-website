#!/usr/bin/env node
/**
 * VultSight website — SEO automation.
 *
 *   node scripts/seo.mjs           # audit every page, print a report
 *   node scripts/seo.mjs --fix     # also (re)generate sitemap.xml
 *
 * What it does (and what it can't):
 *   - Regenerates sitemap.xml from the HTML files on disk.
 *   - Audits each page for the on-page SEO basics: title length, meta
 *     description, a single <h1>, canonical URL, Open Graph tags, image alt
 *     text, and at least one JSON-LD block.
 *   - Exits non-zero if any ERROR-level issue is found, so CI fails the build.
 *
 * It does NOT (and no honest tool can) directly change your Google ranking.
 * Rankings come from this technical foundation + content + backlinks + domain
 * authority over time. This keeps the foundation green and the sitemap fresh.
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

const SITE_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = (process.env.SITE_URL || 'https://www.vultsight.com').replace(/\/$/, '');
const FIX = process.argv.includes('--fix');

// Per-page sitemap hints. Anything not listed gets the default.
const HINTS = {
  'index.html':            { loc: '/', priority: '1.0', changefreq: 'weekly' },
  'platform.html':         { priority: '0.9', changefreq: 'monthly' },
  'noc.html':              { priority: '0.9', changefreq: 'monthly' },
  'services.html':         { priority: '0.9', changefreq: 'monthly' },
  'solutions.html':        { priority: '0.8', changefreq: 'monthly' },
  'resources.html':        { priority: '0.7', changefreq: 'weekly' },
  'xdr-vs-siem-soar.html': { priority: '0.7', changefreq: 'monthly' },
  'resource.html':         { priority: '0.6', changefreq: 'monthly' },
  'company.html':          { priority: '0.6', changefreq: 'monthly' },
  'contact.html':          { priority: '0.6', changefreq: 'yearly' },
};
const DEFAULT_HINT = { priority: '0.5', changefreq: 'monthly' };

// Exclude noindex pages (e.g. 404.html) from both the audit and the sitemap.
const isNoIndex = (f) =>
  /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(readFileSync(join(SITE_DIR, f), 'utf8'));
const htmlFiles = readdirSync(SITE_DIR)
  .filter((f) => f.endsWith('.html'))
  .filter((f) => !isNoIndex(f))
  .sort();

const between = (s, a, b) => {
  const i = s.indexOf(a);
  if (i === -1) return null;
  const j = s.indexOf(b, i + a.length);
  return j === -1 ? null : s.slice(i + a.length, j);
};
const has = (s, re) => re.test(s);

const C = { red: '\x1b[31m', yellow: '\x1b[33m', green: '\x1b[32m', dim: '\x1b[2m', reset: '\x1b[0m' };

let errors = 0;
let warnings = 0;
const report = [];

for (const file of htmlFiles) {
  const html = readFileSync(join(SITE_DIR, file), 'utf8');
  const issues = [];

  const title = (between(html, '<title>', '</title>') || '').trim();
  if (!title) issues.push(['ERROR', 'missing <title>']);
  else if (title.length < 10 || title.length > 65)
    issues.push(['WARN', `title is ${title.length} chars (aim 10–65)`]);

  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const desc = descMatch ? descMatch[1] : '';
  if (!desc) issues.push(['ERROR', 'missing meta description']);
  else if (desc.length < 50 || desc.length > 165)
    issues.push(['WARN', `description is ${desc.length} chars (aim 50–160)`]);

  const h1count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1count === 0) issues.push(['ERROR', 'no <h1>']);
  else if (h1count > 1) issues.push(['WARN', `${h1count} <h1> tags (use exactly one)`]);

  if (!has(html, /<link\s+rel=["']canonical["']/i)) issues.push(['ERROR', 'missing canonical link']);
  if (!has(html, /property=["']og:title["']/i)) issues.push(['WARN', 'missing Open Graph tags']);
  if (!has(html, /application\/ld\+json/i)) issues.push(['WARN', 'no JSON-LD structured data']);

  // images without alt (ignore self-closing decorative with alt="")
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const noAlt = imgs.filter((t) => !/\salt=/.test(t));
  if (noAlt.length) issues.push(['WARN', `${noAlt.length} <img> without alt attribute`]);

  for (const [sev] of issues) sev === 'ERROR' ? errors++ : warnings++;
  report.push({ file, title, issues });
}

// ── Print report ──
console.log(`\nVultSight SEO audit — ${htmlFiles.length} pages · base ${BASE_URL}\n`);
for (const { file, issues } of report) {
  if (!issues.length) {
    console.log(`  ${C.green}✓${C.reset} ${file}`);
  } else {
    const worst = issues.some((i) => i[0] === 'ERROR') ? C.red : C.yellow;
    console.log(`  ${worst}•${C.reset} ${file}`);
    for (const [sev, msg] of issues) {
      const col = sev === 'ERROR' ? C.red : C.yellow;
      console.log(`      ${col}${sev}${C.reset} ${msg}`);
    }
  }
}
console.log(`\n${errors} error(s), ${warnings} warning(s).`);

// ── (Re)generate sitemap ──
if (FIX) {
  const urls = htmlFiles
    .map((f) => {
      const hint = HINTS[f] || DEFAULT_HINT;
      const path = hint.loc || `/${f}`;
      return `  <url><loc>${BASE_URL}${path}</loc><changefreq>${hint.changefreq}</changefreq><priority>${hint.priority}</priority></url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/seo.mjs — do not edit by hand. Run: node scripts/seo.mjs --fix -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  writeFileSync(join(SITE_DIR, 'sitemap.xml'), xml);
  console.log(`${C.green}✓${C.reset} sitemap.xml regenerated (${htmlFiles.length} URLs)`);
}

if (errors > 0) {
  console.log(`\n${C.red}SEO audit failed.${C.reset} Fix the errors above.\n`);
  process.exit(1);
}
console.log(`\n${C.green}SEO audit passed.${C.reset}\n`);
