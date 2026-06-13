/* ============================================================
   ASTRACT — Données projets
   Source unique partagée par : hero, grille accueil,
   liste filtrable, et page projet (lecture via ?id=).
   ============================================================ */

const U = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const PROJECTS = [
  {
    id: "villa-horizon",
    title: "Villa Horizon",
    location: "Lacanau, FR",
    year: "2024",
    category: "Rénovation",
    cover: U("photo-1600585154340-be6161a56a0c"),
    before: U("photo-1503174971373-b1f69850bded"),
    after: U("photo-1600585154340-be6161a56a0c"),
    intro:
      "Réhabilitation complète d'une maison balnéaire des années 70 en résidence ouverte sur l'océan.",
    concept:
      "Effacer les cloisons d'origine pour laisser entrer la lumière rasante de l'Atlantique. Le projet pense la maison comme un seul volume traversant, du jardin à la dune.",
    process:
      "Démolition sélective, reprise de structure en acier pour libérer la façade sud, et calepinage d'un sol béton ciré continu unifiant l'ensemble des pièces de vie.",
    result:
      "Un plateau de 120 m² entièrement décloisonné, une baie de 6 mètres, et une palette minérale qui laisse l'horizon devenir le seul décor.",
    gallery: [
      U("photo-1600210492486-724fe5c67fb0"),
      U("photo-1600607687939-ce8a6c25118c"),
      U("photo-1600566753086-00f18fb6b3ea"),
      U("photo-1600585154526-990dced4db0d"),
    ],
  },
  {
    id: "atelier-noir",
    title: "Atelier Noir",
    location: "Bordeaux, FR",
    year: "2024",
    category: "Architecture intérieure",
    cover: U("photo-1505691938895-1758d7feb511"),
    before: U("photo-1556909212-d5b604d0c90d"),
    after: U("photo-1505691938895-1758d7feb511"),
    intro:
      "Transformation d'un ancien atelier d'imprimerie en loft de travail et de réception.",
    concept:
      "Garder la mémoire industrielle du lieu — fonte, brique, verrière — et y injecter une couche contemporaine sombre et précise.",
    process:
      "Sablage des structures métalliques, création d'une mezzanine suspendue, et intégration d'un mobilier sur mesure en chêne fumé.",
    result:
      "Un contraste maîtrisé entre la rugosité conservée des murs et la netteté des nouvelles interventions noires.",
    gallery: [
      U("photo-1567767292278-a4f21aa2d36e"),
      U("photo-1493809842364-78817add7ffb"),
      U("photo-1586023492125-27b2c045efd7"),
      U("photo-1600121848594-d8644e57abab"),
    ],
  },
  {
    id: "maison-claire",
    title: "Maison Claire",
    location: "Arcachon, FR",
    year: "2023",
    category: "Rénovation",
    cover: U("photo-1600047509807-ba8f99d2cdde"),
    before: U("photo-1484154218962-a197022b5858"),
    after: U("photo-1600047509807-ba8f99d2cdde"),
    intro:
      "Une villa familiale repensée autour de la lumière et d'un patio central.",
    concept:
      "Inverser la logique de la maison : ramener le séjour au cœur du plan, autour d'un patio planté qui distribue toutes les pièces.",
    process:
      "Ouverture de la toiture, création d'un patio, reprise des sols en travertin et menuiseries fines en aluminium blanc.",
    result:
      "Une maison qui respire, où chaque pièce emprunte sa lumière au jardin intérieur.",
    gallery: [
      U("photo-1600210492486-724fe5c67fb0"),
      U("photo-1600585154526-990dced4db0d"),
      U("photo-1600566753086-00f18fb6b3ea"),
      U("photo-1600607687939-ce8a6c25118c"),
    ],
  },
  {
    id: "duplex-meridien",
    title: "Duplex Méridien",
    location: "Paris, FR",
    year: "2023",
    category: "Architecture intérieure",
    cover: U("photo-1600566753086-00f18fb6b3ea"),
    before: U("photo-1505693416388-ac5ce068fe85"),
    after: U("photo-1600566753086-00f18fb6b3ea"),
    intro:
      "Réunion de deux appartements en un duplex traversant sous les toits.",
    concept:
      "Un escalier sculpture comme pièce maîtresse, reliant deux ambiances : le jour en bas, la nuit en haut.",
    process:
      "Percement de dalle, conception d'un escalier en acier plié, et travail sur une enfilade de perspectives traversantes.",
    result:
      "150 m² fluides où le regard file d'une façade à l'autre, ponctué par la verticalité de l'escalier.",
    gallery: [
      U("photo-1493809842364-78817add7ffb"),
      U("photo-1567767292278-a4f21aa2d36e"),
      U("photo-1600121848594-d8644e57abab"),
      U("photo-1586023492125-27b2c045efd7"),
    ],
  },
  {
    id: "pavillon-foret",
    title: "Pavillon Forêt",
    location: "Fontainebleau, FR",
    year: "2022",
    category: "Conception",
    cover: U("photo-1600607687939-ce8a6c25118c"),
    before: U("photo-1416339306562-f3d12fefd36f"),
    after: U("photo-1600607687939-ce8a6c25118c"),
    intro: "Construction neuve d'un pavillon en lisière de forêt.",
    concept:
      "Une boîte de bois et de verre posée délicatement sur le sol forestier, pensée pour disparaître dans les arbres.",
    process:
      "Ossature bois préfabriquée, large débord de toiture, et façades en mélèze laissé grisé naturellement.",
    result:
      "Une maison-belvédère qui cadre la forêt comme un tableau, été comme hiver.",
    gallery: [
      U("photo-1416339306562-f3d12fefd36f"),
      U("photo-1502672260266-1c1ef2d93688"),
      U("photo-1484154218962-a197022b5858"),
      U("photo-1600585154526-990dced4db0d"),
    ],
  },
  {
    id: "loft-quai",
    title: "Loft Quai",
    location: "Nantes, FR",
    year: "2022",
    category: "Rénovation",
    cover: U("photo-1600585154526-990dced4db0d"),
    before: U("photo-1497366216548-37526070297c"),
    after: U("photo-1600585154526-990dced4db0d"),
    intro: "Reconversion d'un entrepôt portuaire en loft d'habitation.",
    concept:
      "Préserver la hauteur monumentale et la trame des poteaux, y glisser des volumes habités comme du mobilier.",
    process:
      "Curage complet, isolation par l'intérieur, et insertion de boîtes en bois abritant les espaces servants.",
    result:
      "Un grand vide habité de 5 mètres sous plafond, où l'on lit encore l'échelle industrielle d'origine.",
    gallery: [
      U("photo-1497366216548-37526070297c"),
      U("photo-1505691938895-1758d7feb511"),
      U("photo-1600047509807-ba8f99d2cdde"),
      U("photo-1567767292278-a4f21aa2d36e"),
    ],
  },
];

window.PROJECTS = PROJECTS;
