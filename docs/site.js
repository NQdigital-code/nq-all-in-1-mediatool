// release details shown on the page. `node release.js path\to\exe version` rewrites this block.
const RELEASE = { version: '1.3.1', sha256: 'cc323c434f40701f1be9f892d8194736cfe540310599e10aa0ec95c7c2d2f1d6', url: 'https://github.com/NQdigital-code/nq-all-in-1-mediatool/releases/latest/download/NQ-All-in-1-MediaTool-portable.exe', published: true };
document.getElementById('ver').textContent = RELEASE.version;
document.getElementById('dlbtn').href = RELEASE.url;
if (RELEASE.published) document.getElementById('sha').textContent = RELEASE.sha256;

// mobile menu
const menu = document.getElementById('menu'), nav = document.getElementById('nav');
menu.addEventListener('click', () => { const o = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', o); });
nav.addEventListener('click', (e) => { if (e.target.tagName === 'A') { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); } });

// before / after sliders (every .cmp), with one small sweep hint on first view unless the visitor prefers reduced motion
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.cmp').forEach((c) => {
  const r = c.querySelector('input'), set = (v) => { c.style.setProperty('--p', v + '%'); r.value = v; };
  r.addEventListener('input', () => set(r.value));
  if (still || !('IntersectionObserver' in window)) return;
  new IntersectionObserver((es, o) => { if (!es[0].isIntersecting) return; o.disconnect(); let t = 0; const id = setInterval(() => { t += 0.045; set(50 + Math.sin(t * Math.PI * 2) * 22 * (1 - t)); if (t >= 1) { clearInterval(id); set(50); } }, 16); }, { threshold: 0.6 }).observe(c);
});

// screenshot tabs (arrow keys move between tabs)
const tabs = [...document.querySelectorAll('.tabs [role=tab]')];
function pick(t) { tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; const p = document.getElementById(x.getAttribute('aria-controls')); p.hidden = !on; p.classList.toggle('on', on); }); }
tabs.forEach((t, i) => { t.addEventListener('click', () => pick(t)); t.addEventListener('keydown', (e) => { const j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null; if (j !== null) { const n = tabs[(j + tabs.length) % tabs.length]; n.focus(); pick(n); } }); });
pick(tabs[0]);
