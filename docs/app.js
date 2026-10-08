// Landing page behaviour: before/after slider (with one opening sweep), example switch, checksum copy.
(() => {
  const $ = (id) => document.getElementById(id);
  const stage = $('stage'), range = $('range'), orig = $('img-orig'), cut = $('img-cut');
  const CAP = 'Drag to compare. This cut-out was made by the app, offline, in under a second. Photo: Evan-Amos, public domain.';
  const EX = {
    pad: { o: 'img/pad-original.webp', c: 'img/pad-cutout.webp', w: 1100, h: 1002, cap: CAP, alt: 'A white game controller photographed on a white background' },
    retro: { o: 'img/retro-original.webp', c: 'img/retro-cutout.webp', w: 1100, h: 770, cap: CAP, alt: 'A red retro game controller on a white background' },
    console: { o: 'img/console-original.webp', c: 'img/console-cutout.webp', w: 1100, h: 550, cap: CAP, alt: 'A black game console with its controller on a white background' },
  };
  let touched = false, raf = 0;
  const setP = (v) => { stage.style.setProperty('--p', v + '%'); range.value = v; };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  range.addEventListener('input', () => { touched = true; cancelAnimationFrame(raf); setP(range.value); });

  function sweep() { // the one animated moment: the cut-out wipes in from the right
    if (reduce) return setP(50);
    const t0 = performance.now(), from = 100, to = 50, ms = 1500;
    const step = (t) => {
      if (touched) return;
      const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      setP(from + (to - from) * e);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    setP(from); raf = requestAnimationFrame(step);
  }

  function show(key) {
    const x = EX[key];
    stage.style.aspectRatio = x.w + ' / ' + x.h;
    orig.src = x.o; cut.src = x.c; orig.width = cut.width = x.w; orig.height = cut.height = x.h; orig.alt = x.alt;
    cut.alt = x.alt + ', with the background removed';
    $('caption').textContent = x.cap;
    document.querySelectorAll('.chip').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.ex === key)));
    touched = false; sweep();
  }
  document.querySelectorAll('.chip').forEach((b) => b.addEventListener('click', () => show(b.dataset.ex)));
  stage.style.aspectRatio = EX.pad.w + ' / ' + EX.pad.h;
  if (orig.complete) sweep(); else orig.addEventListener('load', sweep, { once: true });

  const copy = $('copy');
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText($('sha').textContent.trim()); copy.textContent = 'Copied'; }
    catch { const r = document.createRange(); r.selectNodeContents($('sha')); getSelection().removeAllRanges(); getSelection().addRange(r); copy.textContent = 'Selected'; }
    setTimeout(() => (copy.textContent = 'Copy'), 1800);
  });
})();
