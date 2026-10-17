// release details shown on the page. `node release.js path\to\exe version` rewrites this block.
const RELEASE = { version: '1.3.1', sha256: 'cc323c434f40701f1be9f892d8194736cfe540310599e10aa0ec95c7c2d2f1d6', url: 'https://pub-11a273028580433f93076091768a328a.r2.dev/NQ-All-in-1-MediaTool-portable.exe', published: true };
document.getElementById('ver').textContent = RELEASE.version;
document.getElementById('dlbtn').href = RELEASE.url;
if (RELEASE.published) document.getElementById('sha').textContent = RELEASE.sha256;
document.getElementById('tagver').textContent = RELEASE.version;

// ---------------------------------------------------------------------------------------------------------------------
// Motion layer (apple-design). Springs keep position AND velocity when re-targeted, so anything can be grabbed or
// redirected mid-flight. Everything honours prefers-reduced-motion: springs jump straight to their target.
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

// response = seconds to reach the target (not a duration), damping 1 = no overshoot
function spring(init, draw, { response = .38, damping = 1 } = {}) {
  const w = 2 * Math.PI / response, k = w * w, c = 2 * damping * w;
  let x = init, v = 0, goal = init, raf = 0, t0 = 0;
  const tick = (now) => {
    const dt = Math.min(.032, Math.max(0, (now - t0) / 1000)); t0 = now;
    v += (-k * (x - goal) - c * v) * dt; x += v * dt; draw(x);
    if (Math.abs(x - goal) < .05 && Math.abs(v) < .05) { x = goal; draw(x); raf = 0; } else raf = requestAnimationFrame(tick);
  };
  return {
    to(g) { goal = g; if (reduce.matches) { x = g; v = 0; draw(x); return; } if (!raf) { t0 = performance.now(); raf = requestAnimationFrame(tick); } },
    set(g) { cancelAnimationFrame(raf); raf = 0; x = goal = g; v = 0; draw(x); },
    stop() { cancelAnimationFrame(raf); raf = 0; v = 0; goal = x; },
  };
}
// a pill that slides under a row of controls: x and width are two independent springs
function slider(el, { response = .38 } = {}) {
  let x = 0, w = 0; const paint = () => { el.style.width = w + 'px'; el.style.transform = 'translateX(' + x + 'px)'; };
  const sx = spring(0, (v) => { x = v; paint(); }, { response }), sw = spring(0, (v) => { w = v; paint(); }, { response: response * .8 });
  return { to(t) { sx.to(t.offsetLeft); sw.to(t.offsetWidth); }, snap(t) { sx.set(t.offsetLeft); sw.set(t.offsetWidth); } };
}

// header material + the product rising into place, both driven by one passive scroll listener
const bar = $('.top'), shot = $('.shot'); let queued = false, spyReset = () => {};   // not "top": that is a reserved browser global
function frame() {
  queued = false;
  if (bar) bar.classList.toggle('scrolled', scrollY > 8);
  if (shot && !reduce.matches) {
    let y = 0; for (let e = shot; e; e = e.offsetParent) y += e.offsetTop;     // layout position, ignores the transform we apply
    const p = Math.min(1, Math.max(0, (innerHeight - (y - scrollY)) / (innerHeight * .55)));
    shot.style.setProperty('--hp', p.toFixed(3));
  }
  if (scrollY < 240) spyReset();
}
addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(frame); } }, { passive: true });
addEventListener('resize', frame); frame();

// mobile menu: a sheet that grows from its button, with a scrim that dims the page behind it
const menu = $('#menu'), nav = $('#nav'), scrim = $('#scrim');
if (menu && nav) {
  const setMenu = (o) => { nav.classList.toggle('open', o); document.body.classList.toggle('menu-open', o); menu.setAttribute('aria-expanded', o); };
  menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  if (scrim) scrim.addEventListener('click', () => setMenu(false));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menu.focus(); } });
}

// nav: the highlight follows your pointer and focus, and rests on the section you are reading
const links = nav ? $$('a:not(.btn)', nav) : [], ind = nav && $('.nav-ind', nav);
if (ind && links.length) {
  const pill = slider(ind, { response: .34 }); let active = null, hovering = false, shown = false;
  const goTo = (a) => {
    if (!a) { shown = false; ind.classList.remove('show'); return; }
    if (!shown) { pill.snap(a); shown = true; requestAnimationFrame(() => ind.classList.add('show')); } else pill.to(a);
  };
  links.forEach((a) => { a.addEventListener('pointerenter', () => { hovering = true; goTo(a); }); a.addEventListener('focus', () => goTo(a)); });
  nav.addEventListener('pointerleave', () => { hovering = false; goTo(active); });
  nav.addEventListener('focusout', (e) => { if (!nav.contains(e.relatedTarget)) goTo(active); });
  const map = new Map(links.map((a) => [document.querySelector(a.getAttribute('href')), a]).filter(([s]) => s));
  const setActive = (a) => { active = a; links.forEach((l) => l.classList.toggle('on', l === a)); if (!hovering) goTo(a); };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(map.get(e.target)); }), { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((a, s) => io.observe(s));
  }
  spyReset = () => { if (active) setActive(null); };
}

// scroll reveal: a short rise and fade, staggered inside a group. Reduced motion gets a plain cross-fade (see CSS).
if ('IntersectionObserver' in window) {
  const sel = '.head, .group, .rs > *, .rs2 > *, .rs3 > *, .rs4 figure, .honest, .ledger > div, .note-line, .plan, .step, .priceNote, .nc, .strip .wrap > div, .info, .who, .faq details, .tabs, .dlwrap > div:first-child, .about .wrap > div:first-child, .final .wrap > *';
  const io = new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$(sel).forEach((el) => { el.classList.add('rv'); el.style.setProperty('--i', Math.min(5, [...el.parentElement.children].indexOf(el))); io.observe(el); });
}

// before / after sliders: 1:1 with the pointer. The one intro nudge is a spring and yields the instant the visitor touches it.
$$('.cmp').forEach((c) => {
  const r = $('input', c), paint = (v) => c.style.setProperty('--p', v + '%');
  const hint = spring(50, (v) => { paint(v); r.value = v; }, { response: .34, damping: .85 }); let t = 0;
  ['pointerdown', 'keydown', 'input'].forEach((ev) => r.addEventListener(ev, () => { clearTimeout(t); hint.stop(); }));
  r.addEventListener('input', () => paint(r.value));
  if (reduce.matches || !('IntersectionObserver' in window)) return;
  new IntersectionObserver((es, o) => { if (!es[0].isIntersecting) return; o.disconnect(); hint.to(26); t = setTimeout(() => hint.to(50), 380); }, { threshold: .6 }).observe(c);
});

// screenshot tabs: segmented control. Arrow keys move between tabs; the selection slides on a spring and can be redirected mid-slide.
const tabs = $$('.tabs [role=tab]'), segEl = $('.tabs .seg-ind'), seg = segEl && slider(segEl, { response: .4 });
function pick(t, instant) {
  tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; const p = document.getElementById(x.getAttribute('aria-controls')); p.hidden = !on; p.classList.toggle('on', on); });
  if (seg) { instant ? seg.snap(t) : seg.to(t); }
  const box = t.parentElement; if (box.scrollWidth > box.clientWidth) box.scrollTo({ left: t.offsetLeft - 24, behavior: reduce.matches ? 'auto' : 'smooth' });
}
tabs.forEach((t, i) => { t.addEventListener('click', () => pick(t)); t.addEventListener('keydown', (e) => { const j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null; if (j !== null) { const n = tabs[(j + tabs.length) % tabs.length]; n.focus(); pick(n); } }); });
const current = () => tabs.find((x) => x.getAttribute('aria-selected') === 'true') || tabs[0];
pick(tabs[0], true);
addEventListener('resize', () => seg && seg.snap(current())); addEventListener('load', () => seg && seg.snap(current()));
