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
      ".aicard", ".case", ".svc", ".tl", ".step", ".more__col",
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
})();
