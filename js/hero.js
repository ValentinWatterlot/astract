/* ============================================================
   ASTRACT — hero.js
   Carrousel plein écran : 1 image à la fois, titre + lieu,
   grand chiffre, pastilles, flèches, swipe, autoplay.
   ============================================================ */

window.initHero = function () {
  const hero = document.querySelector("[data-hero]");
  if (!hero || !window.PROJECTS) return;

  const data = PROJECTS;
  const slidesWrap = hero.querySelector(".hero__slides");
  const titleEl = hero.querySelector(".hero__title");
  const locEl = hero.querySelector(".hero__loc");
  const dotsWrap = hero.querySelector(".hero__dots");

  /* ----- Construction du DOM ----- */
  slidesWrap.innerHTML = data
    .map(
      (p, i) =>
        `<div class="hero__slide" data-s="${i}"><img src="${p.cover}" alt="${p.title}" draggable="false"/></div>`
    )
    .join("");
  dotsWrap.innerHTML = data
    .map(
      (_, i) =>
        `<button class="hero__dot" data-i="${i}" aria-label="Projet ${i + 1}"></button>`
    )
    .join("");

  const slides = [...slidesWrap.children];
  const dots = [...dotsWrap.children];
  const EASE = "power3.inOut";
  let cur = 0;
  let busy = false;
  let timer = null;
  const DELAY = 5500;

  /* ----- État initial ----- */
  gsap.set(slides, { autoAlpha: 0 });
  gsap.set(slides[0], { autoAlpha: 1 });
  kenBurns(slides[0]);
  titleEl.textContent = data[0].title;
  locEl.textContent = data[0].location;
  dots[0].classList.add("is-active");

  function kenBurns(slide) {
    gsap.fromTo(
      slide.querySelector("img"),
      { scale: 1.12 },
      { scale: 1, duration: 7, ease: "none" }
    );
  }

  /* ----- Transition de légende (effet masque) ----- */
  function swapCaption(n) {
    gsap
      .timeline()
      .to([titleEl, locEl], {
        yPercent: -120,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05,
      })
      .add(() => {
        titleEl.textContent = data[n].title;
        locEl.textContent = data[n].location;
      })
      .fromTo(
        [titleEl, locEl],
        { yPercent: 120 },
        { yPercent: 0, duration: 0.75, ease: "power3.out", stagger: 0.07 }
      );
  }

  /* ----- Aller à une slide ----- */
  function go(n) {
    n = (n + slides.length) % slides.length;
    if (n === cur || busy) return;
    busy = true;

    gsap.to(slides[cur], { autoAlpha: 0, duration: 1.1, ease: EASE });
    gsap.to(slides[n], {
      autoAlpha: 1,
      duration: 1.1,
      ease: EASE,
      onComplete: () => (busy = false),
    });
    kenBurns(slides[n]);
    swapCaption(n);

    dots[cur].classList.remove("is-active");
    dots[n].classList.add("is-active");
    cur = n;
  }

  const next = () => go(cur + 1);
  const prev = () => go(cur - 1);

  /* ----- Autoplay ----- */
  function play() {
    stop();
    timer = setInterval(next, DELAY);
  }
  function stop() {
    if (timer) clearInterval(timer);
  }
  function restart() {
    stop();
    play();
  }
  play();

  /* ----- Contrôles ----- */
  dots.forEach((d) =>
    d.addEventListener("click", () => {
      go(+d.dataset.i);
      restart();
    })
  );
  hero.querySelector("[data-hero-next]").addEventListener("click", () => {
    next();
    restart();
  });
  hero.querySelector("[data-hero-prev]").addEventListener("click", () => {
    prev();
    restart();
  });

  // clavier
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      next();
      restart();
    } else if (e.key === "ArrowLeft") {
      prev();
      restart();
    }
  });

  /* ----- Swipe / drag ----- */
  let startX = null;
  hero.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    stop();
  });
  hero.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (dx < -50) next();
    else if (dx > 50) prev();
    startX = null;
    play();
  });
  hero.addEventListener("pointercancel", () => {
    startX = null;
    play();
  });

  // Pause quand l'onglet est masqué
  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : play()
  );
};
