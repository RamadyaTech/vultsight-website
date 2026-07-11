#!/usr/bin/env node
/**
 * Generate the public web product tours from the same source as the PDF
 * (product-tour.html). One source of truth for the console screens.
 *
 *   node _pdf/build-web.mjs
 *     -> ../product-tour-soc.html  (SOC product)
 *     -> ../product-tour-xdr.html  (XDR product)
 *     -> ../product-tour-noc.html  (NOC product)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(dir, 'product-tour.html'), 'utf8');

const consoleCss = src.match(/<style>([\s\S]*?)<\/style>/)[1];
const allScreens = [...src.matchAll(/<section class="screen[^"]*">[\s\S]*?<\/section>/g)].map((m) => m[0]);
// allScreens[0] = cover, last = closing. Console screens (0-indexed after cover):
//  0 SOC Command Center · 1 Investigation · 2 Alerts · 3 UEBA · 4 SOAR
//  5 Cases & ITSM · 6 Threat Hunting · 7 NOC Wallboard · 8 Device · 9 Topology · 10 SLA
const screens = allScreens.slice(1, -1).map((s) =>
  s.replace(/\.\.\/assets\//g, 'assets/')
   .replace(/<h1>/g, '<div class="scrh1">')
   .replace(/<\/h1>/g, '</div>')
);
const pick = (idx) => idx.map((i) => screens[i]);

const TOURS = [
  { file: 'product-tour-soc.html', domain: 'SOC', label: 'SOC' },
  { file: 'product-tour-xdr.html', domain: 'XDR', label: 'XDR' },
  { file: 'product-tour-noc.html', domain: 'NOC', label: 'NOC' },
];

const socCaps = [
  ['01', 'SOC Command Center', 'The whole security estate in real time.', ['Live KPIs', 'MITRE heatmap', 'Threat feed']],
  ['02', 'Alert Queue + AI Triage', 'Every alert auto-triaged — false positives close themselves.', ['TP / FP verdicts', 'MITRE mapping', 'Auto-close']],
  ['03', 'Cases & ITSM', 'Native ticketing with SLA tracking and auto-escalation.', ['Case lifecycle', 'SLA tracking', 'Auto-escalation']],
  ['04', 'SOAR Playbooks', 'Drag-and-drop response orchestration with approval gates.', ['Visual flows', 'Approval gates', 'Execution log']],
];
const xdrCaps = [
  ['01', 'Investigation Workbench', 'Related signals correlated into one incident, with an AI-written attack story.', ['Entity graph', 'Kill chain', 'AI assistant']],
  ['02', 'UEBA & Risk Scoring', 'Behavioural baselines and a 0–100 risk score that catch what rules miss.', ['Entity risk', 'Baselines', 'Anomalies']],
  ['03', 'Threat Hunting', 'Hypothesis-driven, retroactive IOC sweeps across history.', ['IOC sweeps', 'TTP hunts', 'Promote to rule']],
];
const nocCaps = [
  ['01', 'NOC Command Center', 'Device and service health, SLA tracking and a live wallboard.', ['Device grid', 'SLA tracking', 'NOC alerts']],
  ['02', 'Device Monitoring', 'Per-device availability and performance via SNMP and ICMP.', ['Availability', 'CPU · mem · latency', 'Interface stats']],
  ['03', 'Network Topology', 'Live link-state map with fault impact analysis.', ['Live link state', 'Auto-discovered', 'Impact analysis']],
  ['04', 'Services & SLA', 'Service health with SLA targets, compliance and uptime.', ['SLA tiers', 'Compliance', 'Uptime reports']],
];

const galleryCss = `
  /* ── web tour gallery (added) ── */
  body{background:radial-gradient(900px 600px at 80% -5%, rgba(99,102,241,.16), transparent 60%),radial-gradient(700px 500px at 5% 0%, rgba(6,182,212,.10), transparent 60%),var(--bg)}
  .scrh1{font-family:var(--display);font-size:16px;font-weight:700;color:#fff}
  .topnav{position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:24px;padding:0 30px;height:62px;
    background:rgba(8,12,24,.72);backdrop-filter:blur(14px);border-bottom:1px solid var(--border)}
  .topnav .lg{display:flex;align-items:center;gap:9px;font-family:var(--display);font-weight:800;font-size:18px;color:#fff;text-decoration:none}
  .topnav .lg img{width:26px;height:26px;filter:drop-shadow(0 0 8px rgba(227,195,115,.45))}
  .topnav .lg i{color:var(--gold);font-style:normal}
  .topnav .lk{display:flex;gap:18px;margin-left:14px}
  .topnav a.n{color:var(--muted);text-decoration:none;font-size:13.5px;font-weight:500}
  .topnav a.n:hover{color:#fff}
  .topnav .cta{margin-left:auto;display:flex;gap:10px}
  .btn{display:inline-flex;align-items:center;justify-content:center;font-weight:600;font-size:13.5px;border-radius:9px;padding:9px 16px;text-decoration:none;border:1px solid transparent}
  .btn.p{background:linear-gradient(120deg,var(--primary),var(--accent));color:#fff}
  .btn.o{border-color:var(--border2);color:#fff}
  .tour-hero{text-align:center;padding:60px 24px 22px;max-width:760px;margin:0 auto}
  .tour-hero .eb{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:14px}
  .tour-hero h1{font-family:var(--display);font-weight:800;font-size:clamp(34px,5vw,54px);letter-spacing:-.02em;line-height:1.05;
    background:linear-gradient(120deg,#fff 30%,var(--primary-l) 70%,var(--accent));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
  .tour-hero p{color:var(--muted);font-size:17px;margin-top:16px}
  .tour-switch{display:inline-flex;gap:6px;margin-top:22px;padding:5px;border-radius:999px;border:1px solid var(--border);background:rgba(255,255,255,.03)}
  .tour-switch a{font-size:13px;font-weight:700;text-decoration:none;padding:8px 18px;border-radius:999px}
  .tour-switch a.on{background:linear-gradient(120deg,var(--primary),var(--accent));color:#fff}
  .tour-switch a.off{color:var(--muted)}
  .tour-switch a.off:hover{color:#fff}
  .tour-about{max-width:860px;margin:0 auto;padding:6px 24px 8px}
  .tour-about .box{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:20px 24px}
  .tour-about h2{font-family:var(--display);font-size:15px;font-weight:700;color:#fff;margin-bottom:8px;display:flex;align-items:center;gap:9px}
  .tour-about h2 img{width:18px;height:18px}
  .tour-about p{font-size:14.5px;color:var(--muted);line-height:1.6}
  .tour-about p b{color:var(--ink);font-weight:600}
  .tour-list{max-width:1200px;margin:0 auto;padding:18px 24px 40px;display:flex;flex-direction:column;gap:0}
  .tour-item{padding-top:54px;margin-top:54px;border-top:3px solid rgba(255,255,255,.92);box-shadow:0 -1px 0 rgba(255,255,255,.92)}
  .tour-item:first-child{border-top:none;margin-top:0;padding-top:14px;box-shadow:none}
  .tour-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
  .tour-tag{font-size:11.5px;font-weight:600;color:var(--muted);padding:5px 11px;border-radius:7px;border:1px solid var(--border2);background:rgba(255,255,255,.03)}
  .tour-cap{display:flex;gap:16px;align-items:flex-start;margin-bottom:16px;max-width:780px}
  .tour-num{font-family:var(--display);font-weight:800;font-size:15px;color:#fff;background:linear-gradient(135deg,var(--primary),var(--accent));
    width:38px;height:38px;border-radius:11px;display:grid;place-items:center;flex:none}
  .tour-cap h2{font-family:var(--display);font-size:22px;font-weight:700;color:#fff;letter-spacing:-.01em}
  .tour-cap p{color:var(--muted);font-size:14.5px;margin-top:4px}
  .tour-frame{border-radius:15px;overflow:hidden;border:1px solid var(--border2);box-shadow:0 40px 80px rgba(0,0,0,.55);background:#0b1224}
  .tour-bar{height:36px;display:flex;align-items:center;gap:7px;padding:0 14px;background:rgba(0,0,0,.4);border-bottom:1px solid var(--border)}
  .tour-bar i{width:11px;height:11px;border-radius:50%;background:#3a4358}
  .tour-bar i:nth-child(1){background:#ff5f57}.tour-bar i:nth-child(2){background:#febc2e}.tour-bar i:nth-child(3){background:#28c840}
  .tour-bar span{margin-left:8px;font-size:11.5px;color:var(--faint);font-weight:600}
  .tour-canvas{position:relative;width:100%;overflow:hidden}
  .tour-canvas .screen{transform-origin:top left}
  .tourfoot{text-align:center;padding:58px 24px 80px;border-top:1px solid var(--border);margin-top:30px;background:rgba(8,12,24,.4)}
  .tourfoot h2{font-family:var(--display);font-weight:800;font-size:clamp(26px,3.6vw,40px);color:#fff;letter-spacing:-.02em}
  .tourfoot p{color:var(--muted);font-size:16px;margin:14px auto 26px;max-width:520px}
  .tourfoot .row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  @media (max-width:760px){.topnav .lk{display:none}.tour-list{gap:40px}}
`;

function buildPage({ file, domain, title, desc, eyebrow, h1, sub, about, screens: scr, caps, footH2, footP }) {
  const items = scr.map((s, i) => {
    const [n, t, d, tags] = caps[i];
    const tagHtml = tags.map((x) => `<span class="tour-tag">${x}</span>`).join('');
    return `      <div class="tour-item">
        <div class="tour-cap">
          <span class="tour-num">${n}</span>
          <div><h2>${t}</h2><p>${d}</p><div class="tour-tags">${tagHtml}</div></div>
        </div>
        <div class="tour-frame">
          <div class="tour-bar"><i></i><i></i><i></i><span>VultSight Console · ${domain}</span></div>
          <div class="tour-canvas">${s}</div>
        </div>
      </div>`;
  }).join('\n');

  const switchHtml = TOURS.map((tt) =>
    `<a class="${tt.file === file ? 'on' : 'off'}" href="${tt.file}">${tt.label}</a>`).join('');
  const productHref = domain === 'SOC' ? 'soc.html' : domain === 'XDR' ? 'platform.html' : 'noc.html';

  const out = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<meta name="description" content="${desc}" />
<link rel="canonical" href="https://www.vultsight.com/${file}" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#0b1020" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="VultSight" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:url" content="https://www.vultsight.com/${file}" />
<meta property="og:image" content="https://www.vultsight.com/assets/vultsight-lockup.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="https://www.vultsight.com/assets/vultsight-lockup.png" />
<link rel="icon" type="image/png" href="assets/favicon.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />
<style>${consoleCss}${galleryCss}</style>
</head>
<body>
<nav class="topnav">
  <a href="index.html" class="lg"><img src="assets/vultsight-mark.svg" alt="" />Vult<i>Sight</i></a>
  <span class="lk">
    <a href="soc.html" class="n">SOC</a>
    <a href="platform.html" class="n">XDR</a>
    <a href="noc.html" class="n">NOC</a>
    <a href="services.html" class="n">Services</a>
  </span>
  <span class="cta"><a href="index.html" class="btn o">← Back to site</a><a href="contact.html" class="btn p">Talk to us</a></span>
</nav>

<header class="tour-hero">
  <span class="eb">${eyebrow}</span>
  <h1>${h1}</h1>
  <p>${sub}</p>
  <div class="tour-switch">${switchHtml}</div>
</header>

<section class="tour-about">
  <div class="box">
    <h2><img src="assets/vultsight-mark.svg" alt="" /> About this tour</h2>
    <p>${about}</p>
  </div>
</section>

<main class="tour-list">
${items}
</main>

<footer class="tourfoot">
  <h2>${footH2}</h2>
  <p>${footP}</p>
  <div class="row">
    <a href="contact.html" class="btn p">Talk to us</a>
    <a href="${productHref}" class="btn o">Explore VultSight ${domain}</a>
  </div>
</footer>

<script>
  function fitTour(){
    document.querySelectorAll('.tour-canvas').forEach(function(c){
      var s = Math.min(c.clientWidth / 1280, 1);
      c.style.height = (800 * s) + 'px';
      var sc = c.querySelector('.screen');
      if (sc) sc.style.transform = 'scale(' + s + ')';
    });
  }
  window.addEventListener('resize', fitTour);
  window.addEventListener('load', fitTour);
  fitTour();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTour);
</script>
</body>
</html>
`;
  writeFileSync(join(dir, '..', file), out);
}

buildPage({
  file: 'product-tour-soc.html', domain: 'SOC',
  title: 'SOC Console Tour — VultSight',
  desc: 'A guided, in-browser tour of the VultSight SOC console: command center, alert triage, cases & ITSM and SOAR playbooks.',
  eyebrow: 'Product Tour · SOC',
  h1: 'See the SOC console',
  sub: 'Entry-level security operations — detect, triage, ticket and respond, all in one console.',
  about: 'VultSight SOC is entry security — <b>SIEM detection, alerting, cases with native ITSM, SOAR and threat intel</b>. The four screens below follow the workflow: <b>see, triage, manage, respond.</b>',
  screens: pick([0, 2, 5, 4]), caps: socCaps,
  footH2: 'Stand up your SOC on one platform',
  footP: "Detection, alerting, cases and response — owned by you, or run by our team.",
});

buildPage({
  file: 'product-tour-xdr.html', domain: 'XDR',
  title: 'XDR Console Tour — VultSight',
  desc: 'A guided, in-browser tour of the VultSight XDR console: investigation workbench, UEBA and threat hunting.',
  eyebrow: 'Product Tour · XDR',
  h1: 'See the XDR console',
  sub: 'Premium security — everything in SOC, plus correlation, behaviour analytics and hunting.',
  about: 'VultSight XDR <b>includes everything in SOC</b> and adds the analyst-grade layer: <b>cross-domain incident correlation, UEBA and threat hunting</b>. The three screens below show that layer.',
  screens: pick([1, 3, 6]), caps: xdrCaps,
  footH2: 'Go beyond alerts with XDR',
  footP: "Correlate signals into incidents, score behaviour and hunt what rules miss.",
});

buildPage({
  file: 'product-tour-noc.html', domain: 'NOC',
  title: 'NOC Console Tour — VultSight',
  desc: 'A guided, in-browser tour of the VultSight NOC console: command center, device monitoring, network topology and SLA tracking.',
  eyebrow: 'Product Tour · NOC',
  h1: 'See the NOC console',
  sub: 'Network operations — monitor every device and service beside your SOC.',
  about: 'VultSight runs network operations in the same console — monitoring every device and service via <b>SNMP, ICMP and HTTP</b>. The four screens below: <b>command, monitor, map, measure.</b>',
  screens: pick([7, 8, 9, 10]), caps: nocCaps,
  footH2: 'Run SOC and NOC from one console',
  footP: "Monitor your infrastructure and defend it from the same pane of glass — owned by you, or run by our team.",
});

console.log('✓ Generated SOC (4), XDR (3), NOC (4) tours');
