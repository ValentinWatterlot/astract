# Astract — Studio d'architecture

Site vitrine (vanilla HTML/CSS/JS + GSAP). Mood StudioSowa, police Poppins, palette de marque (#242322 / blanc / accent #0099E7).

## Lancer le site
Le site est 100 % statique, **aucune installation requise** :
- Double-cliquez sur `index.html` (s'ouvre directement dans le navigateur), **ou**
- Servez le dossier (recommandé pour le cache propre) :
  ```
  npx serve .
  ```

## Structure
```
astract/
├── index.html        Accueil (hero, projets, studio, services, CTA)
├── projects.html     Liste filtrable
├── project.html      Page projet (?id=...) — avant/après, narration, galerie
├── studio.html       À propos / philosophie
├── contact.html      Formulaire
├── css/style.css     Design system complet
└── js/
    ├── data.js          Données projets (source unique)
    ├── render.js        Rendu dynamique des pages
    ├── hero.js          Galerie auto-scroll + draggable
    ├── before-after.js  Slider avant/après + filtres
    └── main.js          Preloader, curseur, nav, transitions de page, reveals
```

## Composants signature
- **Preloader** compteur 0→100 % (1ʳᵉ visite, mémorisé en sessionStorage)
- **Hero** carrousel plein écran : 1 image à la fois, titre + lieu, grand chiffre
  de slide, pastilles, flèches, swipe, clavier, autoplay (fondu + Ken Burns)
- **Slider avant/après** (drag, clic, clavier)
- **Transitions de page** fluides (voile noir)

## Personnaliser
- **Projets** : éditez `js/data.js` (titres, textes concept/process/réalisé, images).
- **Images** : remplacez les URLs Unsplash par vos photos (`assets/...`).
- **Couleurs / typo** : variables CSS en haut de `css/style.css`.
