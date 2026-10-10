// hero demo: plays a short tour on its own, and stops the moment the visitor touches it
(() => {
  const $ = (id) => document.getElementById(id), hd = $('hd'); if (!hd) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const T = { rb: ['Remove Background', 'Cut the subject out of a photo in one click.'], ps: ['Product Studio', 'A clean white listing photo with a soft shadow.'], wm: ['Watermark Printer', 'Stamp your name on your pictures. Move it, fade it.'], sm: ['Subtitle Maker', 'Captions that pop word by word, burned into your video.'] };
  const ORDER = ['rb', 'ps', 'wm', 'sm'], tabs = [...hd.querySelectorAll('.hd-side button')];
  const ba = $('ba2'), br = $('ba2r'), studio = $('studio'), wm = hd.querySelector('.wmbox'), wmt = $('wmt'), cap = $('cap2'), go = $('hdGo'), st = $('hdSt'), prog = $('hdP');
  let tool = 'rb', timers = [], raf = 0, auto = !reduce, capTimer = 0;
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
  const clearAll = () => { timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf); clearInterval(capTimer); };
  const setP = (v) => { ba.style.setProperty('--p', v + '%'); br.value = v; };
  function reset() {
    setP(100); studio.classList.remove('done'); wm.classList.remove('done'); cap.innerHTML = ''; prog.style.width = '0';
    st.textContent = 'Ready'; go.disabled = false; go.textContent = 'Start'; go.classList.add('hint');
  }
  function show(t) {
    clearAll(); tool = t; hd.dataset.tool = t;
    tabs.forEach((b) => b.setAttribute('aria-selected', b.dataset.tool === t));
    hd.querySelectorAll('.pn').forEach((p) => p.classList.toggle('on', p.classList.contains('pn-' + t)));
    $('hdT').textContent = T[t][0]; $('hdS').textContent = T[t][1]; reset();
  }
  function progress(ms, done) {
    const t0 = performance.now(); go.disabled = true; go.classList.remove('hint'); st.textContent = 'Working on this PC…';
    const step = (n) => {
      const k = Math.min(1, (n - t0) / ms); prog.style.width = k * 100 + '%';
      if (k < 1) raf = requestAnimationFrame(step); else { st.textContent = 'Done'; go.disabled = false; go.textContent = 'Run again'; done(); }
    };
    raf = requestAnimationFrame(step);
  }
  function anim(from, to, ms) {
    const t0 = performance.now(), e = (k) => 1 - Math.pow(1 - k, 3);
    const f = (n) => { const k = Math.min(1, (n - t0) / ms); setP(from + (to - from) * e(k)); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
  }
  const PH = ['Keeps your coffee hot', 'for twelve hours.'];
  function captions() {
    clearInterval(capTimer); let line = 0, w = 0;
    const draw = () => { const words = PH[line].split(' '); cap.innerHTML = words.map((x, i) => '<span class="' + (i === w ? 'now' : '') + '">' + x + '</span>').join(' '); };
    draw();
    capTimer = setInterval(() => { w++; if (w >= PH[line].split(' ').length) { w = 0; line = (line + 1) % PH.length; } draw(); }, 420);
  }
  function run() {
    const t = tool; reset();
    progress(t === 'sm' ? 1300 : 1500, () => {
      if (t === 'rb') anim(100, 50, 1000);
      if (t === 'ps') studio.classList.add('done');
      if (t === 'wm') wm.classList.add('done');
      if (t === 'sm') captions();
      if (auto) later(next, t === 'sm' ? 6500 : 4200);
    });
  }
  function next() { show(ORDER[(ORDER.indexOf(tool) + 1) % ORDER.length]); later(run, 900); }
  function stopAuto() { if (!auto) return; auto = false; timers.forEach(clearTimeout); timers = []; }
  hd.addEventListener('pointerdown', stopAuto);
  hd.addEventListener('keydown', stopAuto);
  tabs.forEach((b) => b.addEventListener('click', () => { stopAuto(); show(b.dataset.tool); }));
  go.addEventListener('click', () => { stopAuto(); run(); });
  br.addEventListener('input', () => ba.style.setProperty('--p', br.value + '%'));
  $('wmo').addEventListener('input', (e) => { wmt.style.opacity = e.target.value / 100; });
  $('wmg').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return; wmt.dataset.pos = b.dataset.p;
    $('wmg').querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b)); stopAuto();
  });
  // honest "offline" switch: nothing in this demo needs the internet, and the real tools do their work on your PC
  const net = $('net'), toast = $('hdToast'); let offline = false;
  net.addEventListener('click', () => {
    offline = !offline; net.setAttribute('aria-pressed', offline); $('netTxt').textContent = offline ? 'Internet off' : 'Internet on'; stopAuto();
    toast.textContent = offline ? 'No internet. This still works: your picture never leaves this PC.' : 'Internet back on. Nothing changes, the work is done on your PC.';
    toast.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => toast.classList.remove('show'), 3200);
  });
  show('rb');
  if (reduce) { setP(50); st.textContent = 'Done'; go.textContent = 'Run again'; go.classList.remove('hint'); }
  else if ('IntersectionObserver' in window) new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); if (auto) later(run, 900); } }, { threshold: 0.4 }).observe(hd);
  else later(run, 900);
})();
