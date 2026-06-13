/* ============================================================
   ASTRACT — before-after.js
   Slider avant/après (drag + clic) accessible
   ============================================================ */

window.initBeforeAfter = function () {
  document.querySelectorAll(".ba").forEach((ba) => {
    const after = ba.querySelector(".ba__img--after");
    const handle = ba.querySelector(".ba__handle");
    let active = false;

    function setPos(clientX) {
      const r = ba.getBoundingClientRect();
      let pct = ((clientX - r.left) / r.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = pct + "%";
    }

    ba.addEventListener("pointerdown", (e) => {
      active = true;
      ba.setPointerCapture(e.pointerId);
      setPos(e.clientX);
    });
    ba.addEventListener("pointermove", (e) => {
      if (active) setPos(e.clientX);
    });
    const stop = () => (active = false);
    ba.addEventListener("pointerup", stop);
    ba.addEventListener("pointercancel", stop);

    // clavier
    ba.tabIndex = 0;
    let kb = 50;
    ba.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") kb = Math.max(0, kb - 4);
      else if (e.key === "ArrowRight") kb = Math.min(100, kb + 4);
      else return;
      after.style.clipPath = `inset(0 0 0 ${kb}%)`;
      handle.style.left = kb + "%";
    });

    // petite animation d'amorçage quand visible
    gsap.fromTo(
      handle,
      { left: "62%" },
      {
        left: "50%",
        duration: 1.4,
        ease: "elastic.out(1,0.6)",
        scrollTrigger: { trigger: ba, start: "top 75%", once: true },
        onUpdate: () => {
          const pct = parseFloat(handle.style.left);
          after.style.clipPath = `inset(0 0 0 ${pct}%)`;
        },
      }
    );
  });
};

/* ---------------- Filtres liste projets ---------------- */
window.initFilters = function () {
  const btns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".pj-card");
  if (!btns.length) return;

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;

      items.forEach((it) => {
        const show = cat === "all" || it.dataset.cat === cat;
        if (show) {
          it.classList.remove("hide");
          gsap.fromTo(
            it,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        } else {
          it.classList.add("hide");
        }
      });
      ScrollTrigger.refresh();
    });
  });
};
