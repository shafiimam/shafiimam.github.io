// Shafi Imam — portfolio interactions. Dependency-free.
(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // smooth anchor scrolling (konpo-style float on nav jumps)
  if (!reduced) document.documentElement.classList.add("smooth");

  // ---- preloader (counting intro) ---------------------------------------
  const loader = document.getElementById("loader");
  const countEl = document.getElementById("count");
  function pad3(n) { return String(Math.round(n)).padStart(3, "0"); }
  function finishLoader() {
    if (!loader) { startReveals(); return; }
    if (countEl) countEl.textContent = "100";
    loader.classList.add("done");
    document.body.classList.remove("lock");
    startReveals();
  }
  if (loader) {
    if (reduced) { finishLoader(); }
    else {
      document.body.classList.add("lock");
      const dur = 1500;
      const start = performance.now();
      (function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        if (countEl) countEl.textContent = pad3(eased * 100);
        if (t < 1) requestAnimationFrame(tick);
        else finishLoader();
      })(start);
      // Failsafe: never trap the page behind the loader.
      setTimeout(finishLoader, 3500);
    }
  }

  // ---- hero stagger + reveals (started after loader) ---------------------
  let revealsStarted = false;
  function startReveals() {
    if (revealsStarted) return;
    revealsStarted = true;

    // hero stagger
    const staggerEls = Array.from(document.querySelectorAll("[data-stagger]"));
    if (reduced) { staggerEls.forEach((el) => el.classList.add("played")); }
    else {
      staggerEls.forEach((el, i) => {
        el.style.transitionDelay = (0.07 * i) + "s";
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("played")));
      });
      // Failsafe: rAF is paused on hidden tabs — never leave the hero invisible.
      setTimeout(() => staggerEls.forEach((el) => el.classList.add("played")), 2200);
    }

    // scroll reveals
    const revealSel = [
      ".aicard", ".svc", ".tl", ".step", ".more__col",
      ".section-head", ".qrow", ".story__media", ".story__intro"
    ];
    const nodes = Array.from(document.querySelectorAll(revealSel.join(",")));
    nodes.forEach((n, i) => {
      n.setAttribute("data-reveal", "");
      n.style.transitionDelay = (Math.min(i % 3, 2) * 0.07) + "s";
    });
    function revealAll() { nodes.forEach((n) => n.classList.add("is-in")); }
    if (reduced || !("IntersectionObserver" in window)) { revealAll(); }
    else {
      const io = new IntersectionObserver((ents, obs) => {
        ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); } });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
      nodes.forEach((n) => io.observe(n));
      setTimeout(revealAll, 2600); // content must never stay invisible
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") revealAll();
      });
    }

    // count-ups
    document.querySelectorAll("[data-roll]").forEach((el) => whenVisible(el, () => animateCount(el)));
  }

  function whenVisible(el, cb) {
    if (!("IntersectionObserver" in window)) { cb(); return; }
    const io = new IntersectionObserver((ents, obs) => {
      ents.forEach((e) => { if (e.isIntersecting) { cb(); obs.disconnect(); } });
    }, { threshold: 0.4 });
    io.observe(el);
  }
  function animateCount(el) {
    const target = parseFloat(el.dataset.roll);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    if (Number.isNaN(target)) return;
    if (reduced) { el.textContent = target.toFixed(decimals); return; }
    const duration = 1400;
    const start = performance.now();
    (function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals);
    })(start);
  }

  // ---- custom cursor ----------------------------------------------------
  if (finePointer && !reduced) {
    const cur = document.getElementById("cursor");
    if (cur) {
      document.body.classList.add("cursor-on");
      let x = window.innerWidth / 2, y = window.innerHeight / 2;
      let cx = x, cy = y, active = false;
      window.addEventListener("pointermove", (e) => {
        x = e.clientX; y = e.clientY;
        if (!active) { active = true; cur.classList.add("is-active"); }
      });
      const hoverSel = "a, button, .btn, .taglist li, .svc";
      document.addEventListener("pointerover", (e) => {
        if (e.target.closest(hoverSel)) cur.classList.add("is-hover");
      });
      document.addEventListener("pointerout", (e) => {
        if (e.target.closest(hoverSel)) cur.classList.remove("is-hover");
      });
      (function follow() {
        cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
        cur.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
        requestAnimationFrame(follow);
      })();
    }
  }

  // ---- magnetic buttons -------------------------------------------------
  if (finePointer && !reduced) {
    document.querySelectorAll(".magnetic").forEach((btn) => {
      const strength = 0.3;
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        btn.style.transform = "translate(" + dx + "px," + dy + "px)";
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  // ---- timeline scroll-fill (line pulls up as you scroll) ----------------
  if (!reduced) {
    const tl = document.querySelector(".timeline");
    if (tl) {
      let ticking = false;
      function updateTl() {
        const r = tl.getBoundingClientRect();
        const ref = window.innerHeight * 0.55;
        const p = (ref - r.top) / r.height;
        tl.style.setProperty("--tl-progress", Math.max(0, Math.min(1, p)).toFixed(3));
        ticking = false;
      }
      function onScroll() {
        if (!ticking) { ticking = true; requestAnimationFrame(updateTl); }
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      updateTl();
    }
  }

  // ---- interactive dot field + title parallax ----------------------------
  document.querySelectorAll("[data-dotfield]").forEach((field) => {
    const canvas = field.querySelector(".dotfield__canvas");
    const title = field.querySelector("[data-parallax]");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const GAP = 26, RADIUS = 150, MAXR = 4.6, BASER = 1.1, BASE_ALPHA = 0.14;
    let dots = [], w = 0, h = 0;
    let mx = -9999, my = -9999, tmx = -9999, tmy = -9999;
    let active = false, raf = null;

    function build() {
      const rect = field.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < h; y += GAP)
        for (let x = GAP / 2; x < w; x += GAP) dots.push({ x: x, y: y, r: BASER });
    }
    function dot(d, r, a) {
      ctx.beginPath();
      ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(17,17,16," + a + ")";
      ctx.fill();
    }
    function drawStatic() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) dot(dots[i], BASER, BASE_ALPHA);
    }
    function frame() {
      mx += (tmx - mx) * 0.18;
      my += (tmy - my) * 0.18;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = d.x - mx, dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let tr = BASER, a = BASE_ALPHA;
        if (dist < RADIUS) {
          const f = 1 - dist / RADIUS;
          tr = BASER + f * (MAXR - BASER);
          a = BASE_ALPHA + f * 0.7;
        }
        d.r += (tr - d.r) * 0.2;
        dot(d, d.r, a.toFixed(3));
      }
      const settled = Math.abs(tmx - mx) < 0.5 && Math.abs(tmy - my) < 0.5;
      if (!active && settled) { raf = null; drawStatic(); return; }
      raf = requestAnimationFrame(frame);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(frame); }

    build(); drawStatic();

    if (!reduced) {
      field.addEventListener("pointermove", (e) => {
        const rect = field.getBoundingClientRect();
        tmx = e.clientX - rect.left; tmy = e.clientY - rect.top;
        active = true; kick();
        if (title) {
          const px = tmx / w - 0.5, py = tmy / h - 0.5;
          title.style.transform = "translate(" + (px * 42).toFixed(1) + "px," + (py * 14).toFixed(1) + "px)";
        }
      });
      field.addEventListener("pointerleave", () => {
        active = false; tmx = -9999; tmy = -9999;
        if (title) title.style.transform = "";
        kick();
      });
    }
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { build(); drawStatic(); }, 150); }, { passive: true });
  });
})();
