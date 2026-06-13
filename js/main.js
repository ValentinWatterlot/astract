/* ============================================================
   ASTRACT — main.js
   Preloader · curseur · nav · transitions de page · reveals
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ---------------- Curseur personnalisé ---------------- */
function initCursor() {
  if (window.matchMedia("(hover: none)").matches) return;
  const cur = document.createElement("div");
  cur.className = "c-cursor";
  document.body.appendChild(cur);

  const xTo = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" });
  const yTo = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });

  window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  const hoverables = "a, button, .hero__track-wrap, .ba, [data-cursor]";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverables)) cur.classList.add("hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverables)) cur.classList.remove("hover");
  });
}

/* ---------------- Preloader ---------------- */
function initPreloader(done) {
  const el = document.querySelector(".preloader");
  const seen = sessionStorage.getItem("astract_seen");

  if (!el || seen) {
    if (el) el.remove();
    document.body.classList.remove("is-loading");
    done(false); // pas de preloader -> jouer l'entrée de transition
    return;
  }

  document.body.classList.add("is-loading");
  const countEl = el.querySelector(".preloader__count .num");
  const bar = el.querySelector(".preloader__bar");
  const brandSpans = el.querySelectorAll(".preloader__brand span");

  const counter = { v: 0 };
  const tl = gsap.timeline({
    onComplete: () => {
      sessionStorage.setItem("astract_seen", "1");
      document.body.classList.remove("is-loading");
      done(true); // preloader affiché -> pas d'entrée de transition
      el.remove();
    },
  });

  gsap.set(brandSpans, { yPercent: 110 });
  tl.to(brandSpans, { yPercent: 0, duration: 0.8, stagger: 0.04, ease: "power3.out" });

  tl.to(
    counter,
    {
      v: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(counter.v);
        countEl.textContent = v;
        bar.style.width = v + "%";
      },
    },
    0
  );

  tl.to(el, { yPercent: -100, duration: 1, ease: "power4.inOut" }, "+=0.25");
}

/* ---------------- Header drawer ---------------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".drawer");
  const close = document.querySelector(".drawer__close");
  if (!toggle || !drawer) return;
  const open = () => drawer.classList.add("open");
  const shut = () => drawer.classList.remove("open");
  toggle.addEventListener("click", open);
  if (close) close.addEventListener("click", shut);
  drawer.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", shut)
  );
}

/* ---------------- Transitions de page ---------------- */
function initTransitions(playEntrance) {
  // L'overlay est statique dans le HTML : il couvre déjà la page entrante
  // dès la première frame (aucun flash). Fallback si absent.
  let overlay = document.querySelector(".transition");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "transition";
    overlay.innerHTML = '<span class="transition__label">Astract</span>';
    document.body.appendChild(overlay);
  }
  const label = overlay.querySelector(".transition__label");

  if (playEntrance) {
    // Entrée : l'overlay couvre déjà -> on le retire en glissant vers le haut.
    gsap.set(overlay, { yPercent: 0 });
    gsap.set(label, { opacity: 1, y: 0 });
    gsap
      .timeline()
      .to(label, { opacity: 0, y: -18, duration: 0.3, ease: "power2.in" })
      .to(overlay, { yPercent: -100, duration: 0.65, ease: "power4.inOut" }, "-=0.05")
      .set(overlay, { yPercent: 100 })
      .set(label, { opacity: 0 });
  } else {
    // Preloader affiché : c'est lui qui couvre -> on neutralise l'overlay.
    gsap.set(overlay, { yPercent: 100 });
    gsap.set(label, { opacity: 0 });
  }

  // Sortie : délégation -> couvre TOUS les liens internes, y compris injectés.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("tel") ||
      a.target === "_blank"
    )
      return;

    e.preventDefault();
    // un vrai glissé sur le hero ne doit pas naviguer
    if (window.__heroDragGuard) {
      window.__heroDragGuard = false;
      return;
    }
    if (window.__navigating) return;
    window.__navigating = true;

    gsap
      .timeline({ onComplete: () => (window.location.href = href) })
      .set(overlay, { yPercent: 100 })
      .set(label, { opacity: 0, y: 18 })
      .to(overlay, { yPercent: 0, duration: 0.55, ease: "power4.inOut" })
      .to(label, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.3");
  });
}

/* ---------------- Reveals au scroll ---------------- */
function initReveals() {
  // Lignes / blocs avec [data-reveal]
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  // Groupes en cascade [data-reveal-stagger] > enfants
  gsap.utils.toArray("[data-reveal-stagger]").forEach((group) => {
    gsap.from(group.children, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: group, start: "top 85%" },
    });
  });

  // Parallax léger sur [data-parallax] (cartes, galerie)
  gsap.utils.toArray("[data-parallax] img").forEach((img) => {
    gsap.to(img, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Parallaxe vertical prononcé sur [data-parallax-strong] (grande image locaux) :
  // l'image de fond dérive vers le haut beaucoup plus lentement que la page,
  // comme si le contenu glissait au-dessus d'elle.
  // L'image fait 160% de haut (top:-30%) -> marge de ±30% pour translater
  // sans laisser apparaître de bord ; ±18% de l'image = ±28.8% du cadre.
  gsap.utils.toArray("[data-parallax-strong]").forEach((fig) => {
    const img = fig.querySelector("img");
    if (!img) return;
    gsap.fromTo(
      img,
      { yPercent: 18 },
      {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: fig,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}

/* ---------------- Showcase projets (zoom + stack) ---------------- */
function initShowcase() {
  const stack = document.querySelector("[data-show-stack]");
  if (!stack) return;
  const stage = stack.querySelector("[data-show-stage]");
  const media = stack.querySelector("[data-show-media]");
  const eyebrow = stack.querySelector("[data-show-eyebrow]");
  const leadcap = stack.querySelector("[data-show-leadcap]");
  if (!stage || !media) return;

  const startScale = window.innerWidth < 700 ? 0.66 : 0.46;

  // Le projet 1 : petit + centré -> grandit jusqu'au plein écran,
  // puis le texte du projet monte en bas à gauche.
  gsap.set(leadcap, { autoAlpha: 0, yPercent: 40 });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage,
      start: "top top",
      end: () => "+=" + window.innerHeight * 1.6,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  tl.fromTo(
    media,
    { scale: startScale, borderRadius: 10 },
    { scale: 1, borderRadius: 0, duration: 1 },
    0
  );
  tl.to(eyebrow, { autoAlpha: 0, duration: 0.3 }, 0);
  tl.fromTo(
    leadcap,
    { autoAlpha: 0, yPercent: 40 },
    { autoAlpha: 1, yPercent: 0, duration: 0.3 },
    0.7
  );

  // Projets suivants : le texte monte quand le panneau arrive du bas.
  gsap.utils.toArray(".show-panel").forEach((panel) => {
    const c = panel.querySelector(".show-panel__cap");
    if (!c) return;
    gsap.from(c, {
      yPercent: 60,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: panel, start: "top 65%" },
    });
  });
}

/* ---------------- Intro studio (word reveal) ---------------- */
function initStudioIntro() {
  const body = document.querySelector("[data-studio-body]");
  if (!body) return;

  const p = body.querySelector("p");
  const btn = body.querySelector(".c-btn");
  if (!p) return;

  // Split innerHTML en mots tout en préservant les balises HTML (<b>, etc.)
  const tokens = p.innerHTML.match(/<[^>]+>|[^\s<]+|\s+/g) || [];
  p.innerHTML = tokens.map((t) => {
    if (t.startsWith("<") || /^\s+$/.test(t)) return t;
    return `<span class="hw-o"><span class="hw-i">${t}</span></span>`;
  }).join("");

  const words = p.querySelectorAll(".hw-i");
  gsap.set(words, { yPercent: 115 });
  if (btn) gsap.set(btn, { autoAlpha: 0, y: 14 });

  ScrollTrigger.create({
    trigger: body,
    start: "top 82%",
    once: true,
    onEnter() {
      gsap.timeline()
        .to(words, { yPercent: 0, duration: 1.1, stagger: 0.022, ease: "power4.out" })
        .to(btn, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.4");
    },
  });
}

/* ---------------- Compteurs (preuve sociale) ---------------- */
function initStats() {
  gsap.utils.toArray("[data-count]").forEach((el) => {
    const end = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => (el.textContent = Math.round(obj.v) + suffix),
    });
  });
}

/* ---------------- Boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initNav();

  initPreloader((preloaderShown) => {
    initTransitions(!preloaderShown);
    // Rendu spécifique à la page si fonction présente
    if (typeof window.renderPage === "function") window.renderPage();
    if (typeof window.initHero === "function") window.initHero();
    if (typeof window.initBeforeAfter === "function") window.initBeforeAfter();
    if (typeof window.initFilters === "function") window.initFilters();
    initReveals();
    initStats();
    initStudioIntro();
    initShowcase();
    ScrollTrigger.refresh();
  });
});

window.addEventListener("load", () => ScrollTrigger.refresh());
