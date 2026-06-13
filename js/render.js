/* ============================================================
   ASTRACT — render.js
   Construit le contenu dynamique à partir de window.PROJECTS
   ============================================================ */

function qp(name) {
  return new URLSearchParams(location.search).get(name);
}

/* ---- Hero : items défilants ---- */
function renderHero(track) {
  track.innerHTML = PROJECTS.map(
    (p) => `
    <a class="hero__item" href="project.html?id=${p.id}" data-cursor>
      <img src="${p.cover}" alt="${p.title}" draggable="false" loading="eager"/>
      <div class="hero__cap">
        <div class="t">${p.title}</div>
        <div class="m">${p.category} — ${p.location}</div>
      </div>
    </a>`
  ).join("");
}

/* ---- Grille éditoriale (accueil) ---- */
function renderSelectedGrid(grid) {
  const layout = ["a", "b", "c", "d", "full"];
  const items = PROJECTS.slice(0, 5);
  grid.innerHTML = items
    .map(
      (p, i) => `
    <a class="proj-card proj-card--${layout[i] || "full"}" href="project.html?id=${p.id}">
      <div class="proj-card__media" data-parallax>
        <span class="card-tag">${p.category}</span>
        <img src="${p.cover}" alt="${p.title}" loading="lazy"/>
      </div>
      <div class="proj-card__foot">
        <span class="proj-card__title">${p.title}</span>
        <span class="proj-card__meta">${p.location} · ${p.year}</span>
      </div>
    </a>`
    )
    .join("");
}

/* ---- Showcase accueil (zoom + stack plein écran) ---- */
function renderShowcase(root) {
  const items = PROJECTS.slice(0, 5);
  const lead = items[0];
  const rest = items.slice(1);
  const pad = (n) => String(n).padStart(2, "0");

  const cap = (p, n) => `
    <span class="show-card__idx">${pad(n)}</span>
    <h3 class="show-card__title">${p.title}</h3>
    <p class="show-card__meta">${p.category} — ${p.location} · ${p.year}</p>`;

  const panels = rest
    .map(
      (p, i) => `
      <a class="show-panel" href="project.html?id=${p.id}" data-cursor>
        <img class="show-panel__img" src="${p.cover}" alt="${p.title}" loading="lazy"/>
        <div class="show-card__cap show-panel__cap">${cap(p, i + 2)}</div>
      </a>`
    )
    .join("");

  root.innerHTML = `
    <div class="show-stack" data-show-stack>
      <div class="show-lead__stage" data-show-stage>
        <span class="show-lead__eyebrow" data-show-eyebrow><i class="led"></i>Projets sélectionnés</span>
        <a class="show-card--lead" href="project.html?id=${lead.id}" data-cursor>
          <div class="show-card__media" data-show-media>
            <img src="${lead.cover}" alt="${lead.title}"/>
          </div>
          <div class="show-card__cap" data-show-leadcap>${cap(lead, 1)}</div>
        </a>
      </div>
      <div class="show-runway" aria-hidden="true"></div>
      ${panels}
    </div>
    <div class="show-outro">
      <a href="projects.html" class="c-btn">Tous les projets <span class="arrow">↗</span></a>
    </div>`;
}

/* ---- Liste filtrable ---- */
function renderList(grid) {
  grid.innerHTML = PROJECTS.map(
    (p) => `
    <a class="list-item" href="project.html?id=${p.id}" data-cat="${p.category}">
      <div class="list-item__media">
        <span class="card-tag">${p.category}</span>
        <img src="${p.cover}" alt="${p.title}" loading="lazy"/>
      </div>
      <div class="proj-card__foot">
        <span class="proj-card__title">${p.title}</span>
        <span class="proj-card__meta">${p.location} · ${p.year}</span>
      </div>
    </a>`
  ).join("");
}

/* ---- Page projet ---- */
function renderProject(root) {
  const id = qp("id");
  const idx = Math.max(0, PROJECTS.findIndex((p) => p.id === id));
  const p = PROJECTS[idx];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  document.title = `${p.title} — Astract`;

  root.querySelector("[data-pj-hero]").src = p.cover;
  root.querySelector("[data-pj-title]").textContent = p.title;
  root.querySelector("[data-pj-cat]").textContent = p.category;
  root.querySelector("[data-pj-loc]").textContent = p.location;
  root.querySelector("[data-pj-year]").textContent = p.year;
  root.querySelector("[data-pj-intro]").textContent = p.intro;

  // before / after
  root.querySelector("[data-ba-before] img").src = p.before;
  root.querySelector("[data-ba-after] img").src = p.after;

  // narration
  root.querySelector("[data-pj-concept]").textContent = p.concept;
  root.querySelector("[data-pj-process]").textContent = p.process;
  root.querySelector("[data-pj-result]").textContent = p.result;

  // gallery
  root.querySelector("[data-pj-gallery]").innerHTML = p.gallery
    .map(
      (src) =>
        `<div data-parallax><img src="${src}" alt="${p.title}" loading="lazy"/></div>`
    )
    .join("");

  // next project
  const nx = root.querySelector("[data-next]");
  nx.href = `project.html?id=${next.id}`;
  nx.querySelector("[data-next-bg]").src = next.cover;
  nx.querySelector("[data-next-title]").textContent = next.title;
  nx.querySelector("[data-next-meta]").textContent = `${next.category} — ${next.location}`;
}

/* ---- Routeur de rendu ---- */
window.renderPage = function () {
  const track = document.querySelector("[data-hero-track]");
  if (track) renderHero(track);

  const grid = document.querySelector("[data-selected-grid]");
  if (grid) renderSelectedGrid(grid);

  const showcase = document.querySelector("[data-showcase]");
  if (showcase) renderShowcase(showcase);

  const list = document.querySelector("[data-list-grid]");
  if (list) renderList(list);

  const pj = document.querySelector("[data-project]");
  if (pj) renderProject(pj);
};
