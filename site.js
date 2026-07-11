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
        <a class="nav__link" href="platform.html" data-nav="platform.html">Platform <svg class="caret" viewBox="0 0 12 12"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></a>
        <div class="mega">
          <div class="mega__inner container">
            <div class="mega__col">
              <p class="mega__head">Detect</p>
              <a href="platform.html#ingest"><strong>Data Ingestion</strong><span>Syslog, edge collectors, cloud API polling</span></a>
              <a href="platform.html#detect"><strong>Detection Engine</strong><span>Flexible rules · sub-second streaming</span></a>
              <a href="zero-day.html"><strong>Zero-day Defence</strong><span>Behavioural detection &amp; frameworks</span></a>
              <a href="platform.html#intel"><strong>Threat Intelligence</strong><span>13 feeds · real-time IOC matching</span></a>
            </div>
            <div class="mega__col">
              <p class="mega__head">Investigate</p>
              <a href="platform.html#correlate"><strong>XDR Correlation</strong><span>Cross-domain incident grouping</span></a>
              <a href="platform.html#ueba"><strong>UEBA</strong><span>Behavioral baselines &amp; risk scoring</span></a>
              <a href="platform.html#ai"><strong>AI Investigation</strong><span>Natural-language hunting &amp; triage</span></a>
            </div>
            <div class="mega__col">
              <p class="mega__head">Respond</p>
              <a href="platform.html#soar"><strong>SOAR Playbooks</strong><span>Tiered response actions</span></a>
              <a href="platform.html#soar"><strong>Case &amp; ITSM</strong><span>Native ticketing &amp; SLA tracking</span></a>
              <a href="platform.html#compliance"><strong>Compliance &amp; Audit</strong><span>Hash-chain audit trail</span></a>
            </div>
            <div class="mega__col mega__col--feature">
              <p class="mega__head">Products</p>
              <a href="soc.html" class="mega__feature" style="margin-bottom:10px">
                <span class="chip">SOC</span>
                <strong>VultSight SOC</strong>
                <span>Entry security — detect, ticket &amp; respond.</span>
              </a>
              <a href="platform.html" class="mega__feature" style="margin-bottom:10px">
                <span class="chip chip--gold">XDR</span>
                <strong>VultSight XDR</strong>
                <span>Premium security — correlate, investigate &amp; hunt.</span>
              </a>
              <a href="noc.html" class="mega__feature">
                <span class="chip">NOC</span>
                <strong>VultSight NOC</strong>
                <span>Network operations — monitor &amp; maintain.</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <a href="zero-day.html" class="nav__link" data-nav="zero-day.html">Zero-Day</a>
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
  <a href="platform.html">Platform · XDR</a>
  <a href="noc.html">Platform · NOC</a>
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
      <a href="services.html#command">Command Center</a>
      <a href="services.html#mdr">MDR &amp; hunting</a>
      <a href="services.html">All services</a>
    </div>
    <div class="footer__col">
      <h5>Resources</h5>
      <a href="resources.html">Resource hub</a>
      <a href="product-tour-soc.html">SOC console tour</a>
      <a href="product-tour-noc.html">NOC console tour</a>
      <a href="resource.html">SIEM vs XDR guide</a>
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

/* ── Boot ── */
injectPartials();
initChrome();
initReveal();
initForm();
