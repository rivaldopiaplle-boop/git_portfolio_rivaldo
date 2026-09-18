import type { Projet } from "../types";
import carteMentale from "./carte-mentale.webp";
import croquis from "./croquis-accueil.webp";
import ecranAccueil from "./ecran-accueil.webp";
import ecranBienvenue from "./ecran-bienvenue.webp";
import enLigne from "./en-ligne.webp";
import logo from "./logo.webp";
import prototype from "./prototype-parcours.jpg";

const DEPOT = "https://github.com/rivaldopiaplle-boop/donvie";
const CHAINE = `${DEPOT}/actions/workflows/ci.yml`;

const fiche: Projet = {
  slug: "donvie",
  ordre: 40,
  titre: "DonVie",
  accroche: "Connecter les donneurs de sang aux centres de collecte, de la carte mentale à l'interface mobile, en ligne.",
  resume:
    "Application de don de sang, web et mobile, menée en équipe à l'ENIB. Tout part d'une question : comment rapprocher des donneurs et des centres qui ont besoin d'eux, au bon moment ? La conception a précédé le code (idéation, personas, croquis, maquettes, prototype Figma évalué), puis l'interface a été développée en React et TypeScript, et mise en ligne sur Vercel. Le service qui la fera vivre, API et base de données, reste à écrire : la feuille de route le dit.",
  categorie: "applications",
  statut: "en-ligne",
  annee: "2025-2026",
  cadre: "ENIB · conception puis développement",
  equipe: "Projet d'équipe",
  couleur: "#c62f3b",
  logo,
  couverture: { src: ecranBienvenue, alt: "Écran d'accueil de DonVie : inscription et chiffres clés", format: "mobile" },
  galerie: [
    { src: ecranBienvenue, alt: "Écran de bienvenue", legende: "Bienvenue : la promesse, les chiffres, l'inscription", format: "mobile" },
    { src: ecranAccueil, alt: "Accueil du donneur", legende: "Accueil : urgence à proximité, prochain don, centres proches", format: "mobile" },
    { src: enLigne, alt: "DonVie en ligne sur ordinateur, dans un cadre de téléphone", legende: "En ligne : sur ordinateur, l'application dans un cadre de téléphone, à côté du projet et de ses liens", format: "ecran" },
    { src: croquis, alt: "Croquis papier de l'accueil", legende: "Croquis : le même écran, au crayon, avant toute maquette", format: "mobile" },
    { src: carteMentale, alt: "Carte mentale d'idéation", legende: "Idéation : six axes autour de la question de départ", format: "schema" },
    { src: prototype, alt: "Parcours du prototype Figma", legende: "Prototype : les écrans reliés par leurs interactions", format: "schema" },
  ],
  stack: ["figma", "react", "typescript", "vite", "tailwind", "githubactions", "vercel"],
  probleme:
    "Les centres de collecte manquent de sang au moment où ils en ont besoin, et les donneurs ne savent ni où aller, ni quand ils peuvent redonner. Entre les deux, aucun outil simple.",
  solution:
    "Une application qui dit au donneur ce qui compte, dès l'accueil : une urgence proche, son prochain don possible, les centres ouverts autour de lui. Des rappels, un historique, et des points pour donner envie de revenir.",
  sections: [
    {
      titre: "La conception, sans sauter d'étape",
      texte: "Du besoin à l'écran : chaque maquette répond à un axe de la carte mentale.",
      points: [
        "Idéation : organisation du don, accès aux centres, sensibilisation, notifications, communauté, expérience",
        "Personas, dont un persona secondaire",
        "Croquis papier, puis maquettes filaires",
        "Prototype Figma cliquable, évalué avec une grille de contrôle",
      ],
    },
    {
      titre: "Le développement, en équipe",
      texte: "De février à avril 2026, en équipe, sous Git.",
      points: [
        "Interface React et TypeScript, dessinée d'abord pour le téléphone",
        "Six parcours : bienvenue, inscription, carte des centres, profil, parrainage, assistant de conversation",
        "Composants réutilisables et thème partagé, repris des maquettes Figma",
        "Données encore simulées côté navigateur, en attendant le service",
      ],
    },
    {
      titre: "La mise en ligne, et le ménage avant",
      texte: "L'export de Figma Make livrait bien plus de code que l'application n'en utilise.",
      points: [
        "48 composants d'interface, 14 images et une trentaine de dépendances jamais importés, retirés : 89 paquets à installer",
        "Sur téléphone, l'application en plein écran ; sur ordinateur, dans un cadre de téléphone, à côté du projet et de ses liens",
        "Une chaîne GitHub Actions construit chaque poussée avec les dépendances verrouillées, comme Vercel",
      ],
    },
  ],
  feuilleDeRoute: [
    {
      titre: "L'API et la base de données",
      detail: "Rendez-vous, notifications et historique des dons demandent un service et une base : ils n'existent pas encore. Node.js et MySQL sont la piste retenue.",
      etat: "prevu",
    },
  ],
  demos: [
    {
      libelle: "L'application en ligne",
      url: "https://donvie-rivaldo.vercel.app",
      detail: "Maquette interactive aux données simulées : tous les écrans se parcourent",
      support: "mobile",
    },
    {
      libelle: "Maquettes Figma",
      url: "https://www.figma.com/design/cNvRlmTJ7wb7oPUTZOipEt/Don-de-Sang-Project?node-id=0-1&p=f&t=CrjfAaLaU0w3zXCx-0",
      detail: "Écrans, flux et prototype",
    },
  ],
  preuves: [
    {
      libelle: "La chaîne de construction",
      url: `${CHAINE}?query=branch%3Amain`,
      detail: "Installation verrouillée et construction, à chaque poussée",
      badge: `${CHAINE}/badge.svg?branch=main`,
    },
  ],
  depots: [{ libelle: "Application mobile (React)", url: DEPOT, visibilite: "public" }],
};

export default fiche;
