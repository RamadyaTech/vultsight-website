// VultSight site — shared interactions across all pages.
// Header/footer are embedded here (not fetched) so the site works when opened
// directly from the file system (file://) as well as over HTTP.

const HEADER_HTML = `
<div class="utilbar">
  <div class="container utilbar__inner">
    <span class="utilbar__tag">Security &amp; Network Operations</span>
    <nav class="utilbar__links">
      <a href="resources.html">Resources</a>
      <a href="company.html">Company</a>
      <a href="contact.html">Contact</a>
      <a href="contact.html" class="utilbar__signin">Sign in</a>
    </nav>
  </div>
</div>

<header class="header" id="header">
  <div class="container header__inner">
    <a href="index.html" class="brand" aria-label="VultSight home">
      <img src="assets/vultsight-mark-dark.svg" alt="" class="brand__mark" width="32" height="32" />
      <span class="brand__name">Vult<span class="brand__name-accent">Sight</span></span>
    </a>

    <nav class="nav" aria-label="Primary">
      <div class="nav__item has-mega">
        <a class="nav__link" href="index.html#products" data-nav="products">Products <svg class="caret" viewBox="0 0 12 12"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></a>
        <div class="mega">
          <div class="mega__inner container">
            <p class="mega__head">Products</p>
            <div class="mega-products">
              <a href="soc.html" class="mprod soc">
                <span class="mprod__top"></span>
                <div class="mprod__row"><span class="chip">SOC</span><span class="mprod__badge">Entry security</span></div>
                <strong>VultSight SOC</strong>
                <p>SIEM detection, alerts, cases &amp; native ITSM, SOAR and threat intel.</p>
                <span class="mprod__link">Explore SOC →</span>
              </a>
              <a href="platform.html" class="mprod xdr">
                <span class="mprod__top"></span>
                <div class="mprod__row"><span class="chip chip--gold">XDR</span><span class="mprod__badge">Premium · includes SOC</span></div>
                <strong>VultSight XDR</strong>
                <p>Everything in SOC, plus correlation, UEBA, entity graph and hunting.</p>
                <span class="mprod__link">Explore XDR →</span>
              </a>
              <a href="noc.html" class="mprod noc">
                <span class="mprod__top"></span>
                <div class="mprod__row"><span class="chip">NOC</span><span class="mprod__badge">Network ops</span></div>
                <strong>VultSight NOC</strong>
                <p>Monitor every device and service — topology, SLA and a live wallboard.</p>
                <span class="mprod__link">Explore NOC →</span>
              </a>
            </div>
            <div class="mega-links">
              <span class="mega-links__label">Explore</span>
              <a href="platform.html#ingest">Data ingestion</a>
              <a href="platform.html#detect">Detection engine</a>
              <a href="zero-day.html">Zero-day defence</a>
              <a href="platform.html#correlate">XDR correlation</a>
              <a href="platform.html#ueba">UEBA</a>
              <a href="platform.html#soar">SOAR &amp; ITSM</a>
              <a href="platform.html#intel">Threat intel</a>
              <a href="platform.html#compliance">Compliance</a>
              <a href="platform.html#integrations">Integrations</a>
            </div>
          </div>
        </div>
      </div>
      <a href="services.html" class="nav__link" data-nav="services.html">Services</a>
      <a href="solutions.html" class="nav__link" data-nav="solutions.html">Solutions</a>
      <a href="resources.html" class="nav__link" data-nav="resources.html">Resources</a>
      <a href="company.html" class="nav__link" data-nav="company.html">Company</a>
    </nav>

    <div class="header__cta">
      <a href="contact.html" class="btn btn--ghost">Sign in</a>
      <a href="contact.html" class="btn btn--primary">Talk to us</a>
    </div>

    <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</header>

<div class="mobile" id="mobile">
  <a href="soc.html">VultSight SOC</a>
  <a href="platform.html">VultSight XDR</a>
  <a href="noc.html">VultSight NOC</a>
  <a href="zero-day.html">Zero-Day Defence</a>
  <a href="services.html">Managed Services</a>
  <a href="solutions.html">Solutions</a>
  <a href="resources.html">Resources</a>
  <a href="company.html">Company</a>
  <a href="contact.html" class="btn btn--primary mobile__cta">Talk to us</a>
</div>`;

const FOOTER_HTML = `
<footer class="footer band--dark">
  <div class="container footer__grid">
    <div class="footer__brand">
      <a href="index.html" class="brand">
        <img src="assets/vultsight-mark.svg" alt="" class="brand__mark" width="30" height="30" />
        <span class="brand__name">Vult<span class="brand__name-accent">Sight</span></span>
      </a>
      <p>Unified security operations for the modern threat landscape. Detect, investigate and respond — all from a single pane of glass.</p>
    </div>
    <div class="footer__col">
      <h5>Security</h5>
      <a href="soc.html">VultSight SOC</a>
      <a href="platform.html">VultSight XDR</a>
      <a href="zero-day.html">Zero-day defence</a>
      <a href="platform.html#detect">Detection engine</a>
      <a href="platform.html#soar">SOAR &amp; cases</a>
    </div>
    <div class="footer__col">
      <h5>Network · NOC</h5>
      <a href="noc.html#monitor">Monitoring</a>
      <a href="noc.html#topology">Network topology</a>
      <a href="noc.html#sla">SLA &amp; thresholds</a>
      <a href="noc.html#wall">NOC wallboard</a>
      <a href="noc.html#incidents">Alerts &amp; incidents</a>
    </div>
    <div class="footer__col">
      <h5>Managed services</h5>
      <a href="services.html#soc">Managed SOC</a>
      <a href="services.html#noc">Managed NOC</a>
      <a href="services.html#vuln">Vulnerability Assessment</a>
      <a href="services.html#darkweb">Dark Web Monitoring</a>
      <a href="services.html">All services</a>
    </div>
    <div class="footer__col">
      <h5>Resources</h5>
      <a href="resources.html">Resource hub</a>
      <a href="product-tour-soc.html">SOC console tour</a>
      <a href="product-tour-xdr.html">XDR console tour</a>
      <a href="product-tour-noc.html">NOC console tour</a>
    </div>
    <div class="footer__col">
      <h5>Company</h5>
      <a href="company.html">About</a>
      <a href="solutions.html">Why VultSight</a>
      <a href="solutions.html#mssp">For MSSPs</a>
      <a href="contact.html">Contact</a>
      <a href="contact.html">Sign in</a>
    </div>
  </div>
  <div class="container footer__bottom">
    <span>© 2026 VultSight. All rights reserved.</span>
    <div class="footer__legal">
      <a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="security.html">Security</a>
    </div>
  </div>
</footer>`;

const PARTIALS = { header: HEADER_HTML, footer: FOOTER_HTML };

/* ── Inject shared header/footer (no network — works on file://) ── */
function injectPartials() {
  document.querySelectorAll('[data-include]').forEach((slot) => {
    const html = PARTIALS[slot.dataset.include];
    if (html) slot.outerHTML = html;
  });
}

/* ── Header: active link, scroll shadow, mobile menu ── */
function initChrome() {
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () =>
      header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // normalize so it works with both /x.html and clean-URL /x hosts
  const norm = (s) => (s || '').split('/').pop().replace(/\.html$/, '') || 'index';
  const page = norm(location.pathname);
  document.querySelectorAll('[data-nav]').forEach((a) => {
    if (norm(a.dataset.nav) === page) a.classList.add('active');
  });

  const burger = document.getElementById('hamburger');
  const mobile = document.getElementById('mobile');
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobile.classList.toggle('open');
    });
    mobile.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobile.classList.remove('open');
      })
    );
  }
}

/* ── Animated counters ── */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const dur = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = eased * target;
    el.textContent = Number.isInteger(target)
      ? Math.round(val).toLocaleString()
      : val.toFixed(1);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ── Reveal-on-scroll + counter triggers ── */
function initReveal() {
  const els = document.querySelectorAll(
    '.section, .pillar, .cap, .stat, .dcard, .tg, .strip, .rcard, .ucard, .timeline-item'
  );
  els.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        entry.target.querySelectorAll('[data-count]').forEach((c) => {
          if (!c.dataset.done) {
            c.dataset.done = '1';
            animateCount(c);
          }
        });
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));

  document.querySelectorAll('.console [data-count]').forEach((c) => {
    c.dataset.done = '1';
    animateCount(c);
  });
}

/* ── Contact / demo form ── */
function initForm() {
  const form = document.getElementById('demo-form');
  if (!form) return;

  const setError = (field, msg) => {
    const wrap = field.closest('.field');
    wrap.classList.toggle('field--err', !!msg);
    const err = wrap.querySelector('.field__err');
    if (err) err.textContent = msg || '';
  };

  const validators = {
    name: (v) => (v.trim().length < 2 ? 'Please enter your name' : ''),
    email: (v) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        ? 'Enter a valid work email'
        : '',
    company: (v) => (v.trim().length < 2 ? 'Please enter your company' : ''),
    message: () => '',
  };

  form.querySelectorAll('input, textarea, select').forEach((f) => {
    f.addEventListener('blur', () => {
      if (validators[f.name]) setError(f, validators[f.name](f.value));
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('input, textarea, select').forEach((f) => {
      if (validators[f.name]) {
        const msg = validators[f.name](f.value);
        setError(f, msg);
        if (msg) ok = false;
      }
    });
    if (!ok) return;

    // NOTE: wire this to your backend (e.g. POST /v1/leads or a form service).
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      form.classList.add('is-sent');
      document.getElementById('form-success').hidden = false;
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send message';
    }, 700);
  });
}

/* ── Branded line icons (replace emoji) ── */
const ICONS = {
  '🔎': '<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>',
  '🔍': '<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>',
  '🔭': '<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>',
  '⚙': '<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  '🧩': '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>',
  '📊': '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  '📈': '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
  '🌐': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  '🤖': '<rect x="4" y="8" width="16" height="11" rx="2"/><path d="M12 8V4.5M9 13h.01M15 13h.01M9.5 16h5M2.5 12H4M20 12h1.5"/>',
  '📥': '<path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4M8 11l4 4 4-4M12 3v12"/>',
  '🎯': '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3"/>',
  '🕸': '<circle cx="6" cy="6" r="2.3"/><circle cx="18" cy="6" r="2.3"/><circle cx="12" cy="18" r="2.3"/><path d="M7.6 7.7l3.2 8.4M16.4 7.7l-3.2 8.4M8.3 6h7.4"/>',
  '🔬': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 9h6"/>',
  '🗺': '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  '🧭': '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/>',
  '🔗': '<path d="M9.5 14.5l5-5M10 6.5l1-1a3.5 3.5 0 0 1 5 5l-1 1M14 17.5l-1 1a3.5 3.5 0 0 1-5-5l1-1"/>',
  '🔌': '<path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0V8zM12 16v6"/>',
  '📡': '<path d="M5 12a7 7 0 0 1 7-7M5 16a11 11 0 0 1 11-11"/><circle cx="6" cy="18" r="1.8"/><path d="M7.4 16.6L12 12"/>',
  '📶': '<path d="M4 20v-3M9 20v-7M14 20v-11M19 20V4"/>',
  '🔤': '<path d="M4 7V5h16v2M9 5v14M7 19h4"/>',
  '✨': '<path d="M12 3l1.7 5.1L19 10l-5.3 1.9L12 17l-1.7-5.1L5 10l5.3-1.9L12 3z"/>',
  '🧠': '<path d="M3 12h4l2 6 4-14 2 8h6"/>',
  '⚡': '<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>',
  '🛡': '<path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  '🚨': '<path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
  '🔔': '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  '🗃': '<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4"/>',
  '🗂': '<path d="M3 7a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"/>',
  '🎫': '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M9 6v12"/>',
  '📑': '<path d="M6 3h9l4 4v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM9 12h6M9 16h4"/>',
  '📜': '<path d="M6 3h9l4 4v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM9 8h6M9 12h6M9 16h4"/>',
  '📋': '<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
  '📢': '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15 8a5 5 0 0 1 0 8"/>',
  '✅': '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  '🏢': '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h6"/>',
  '🏛': '<path d="M4 9l8-5 8 5M5 9v9M19 9v9M9 9v9M15 9v9M3 21h18"/>',
  '🔐': '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  '📍': '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  '🖥': '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  '🔧': '<path d="M14.5 6.5a3.5 3.5 0 0 1-4.6 4.6L4 17l3 3 5.9-5.9a3.5 3.5 0 0 0 4.6-4.6l-2.3 2.3-2-2 2.3-2.3z"/>',
  '🔄': '<path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M18 4v5h-5M6 20v-5h5"/>',
  '🕵': '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  '⚖': '<path d="M12 3v18M7 21h10M6 7h12M6 7l-3 6a3 3 0 0 0 6 0zM18 7l-3 6a3 3 0 0 0 6 0z"/>',
  '🚀': '<path d="M12 2c3 2 4.5 5 4.5 8.5L14 14h-4l-2.5-3.5C7.5 7 9 4 12 2z"/><circle cx="12" cy="8" r="1.2"/><path d="M8.5 14c-2 1-3 3.5-3 5.5 2 0 4.5-1 5.5-3M15.5 14c2 1 3 3.5 3 5.5-2 0-4.5-1-5.5-3"/>',
  '✉': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
};
function renderIcons() {
  const wrap = (p) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>';
  document.querySelectorAll('.cap__ic,.pillar__ic,.tg__ic,.ucard__ic,.fc__icon,.zi,.ci').forEach((el) => {
    if (el.querySelector('svg')) return; // already an icon
    const key = el.textContent.trim().replace(/️/g, '');
    if (ICONS[key]) el.innerHTML = wrap(ICONS[key]);
  });
}

/* ── Boot ── */
injectPartials();
initChrome();
initReveal();
renderIcons();
initForm();
