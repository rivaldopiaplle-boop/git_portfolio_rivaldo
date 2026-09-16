import type { Projet } from "../types";
import carteMentale from "./carte-mentale.webp";
import croquis from "./croquis-accueil.webp";
import ecranAccueil from "./ecran-accueil.webp";
import ecranBienvenue from "./ecran-bienvenue.webp";
import logo from "./logo.webp";
import prototype from "./prototype-parcours.jpg";

const fiche: Projet = {
  slug: "donvie",
  ordre: 40,
  titre: "DonVie",
  accroche: "Connecter les donneurs de sang aux centres de collecte, de la carte mentale à l'interface mobile.",
  resume:
    "Application de don de sang, web et mobile, menée en équipe à l'ENIB. Tout part d'une question : comment rapprocher des donneurs et des centres qui ont besoin d'eux, au bon moment ? La conception a précédé le code (idéation, personas, croquis, maquettes, prototype Figma évalué), puis l'interface a été développée en React et TypeScript. Le service qui la fera vivre, API et base de données, reste à écrire : la feuille de route le dit.",
  categorie: "applications",
  statut: "en-cours",
  annee: "2025-2026",
  cadre: "ENIB · conception puis développement",
  equipe: "Projet d'équipe",
  couleur: "#c62f3b",
  logo,
  couverture: { src: ecranBienvenue, alt: "Écran d'accueil de DonVie : inscription et chiffres clés", format: "mobile" },
  galerie: [
    { src: ecranBienvenue, alt: "Écran de bienvenue", legende: "Bienvenue : la promesse, les chiffres, l'inscription", format: "mobile" },
    { src: ecranAccueil, alt: "Accueil du donneur", legende: "Accueil : urgence à proximité, prochain don, centres proches", format: "mobile" },
    { src: croquis, alt: "Croquis papier de l'accueil", legende: "Croquis : le même écran, au crayon, avant toute maquette", format: "mobile" },
    { src: carteMentale, alt: "Carte mentale d'idéation", legende: "Idéation : six axes autour de la question de départ", format: "schema" },
    { src: prototype, alt: "Parcours du prototype Figma", legende: "Prototype : les écrans reliés par leurs interactions", format: "schema" },
  ],
  stack: ["figma", "react", "typescript", "vite", "tailwind", "mui"],
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
  ],
  feuilleDeRoute: [
    {
      titre: "L'API et la base de données",
      detail: "Rendez-vous, notifications et historique des dons demandent un service et une base : ils n'existent pas encore. Node.js et MySQL sont la piste retenue.",
      etat: "prevu",
    },
    {
      titre: "Mise en ligne de l'interface",
      detail: "Déployer le front sur Vercel pour qu'il s'ouvre sans rien installer, comme les deux plateformes DevOps.",
      etat: "prevu",
    },
  ],
  demos: [
    {
      libelle: "Maquettes Figma",
      url: "https://www.figma.com/design/cNvRlmTJ7wb7oPUTZOipEt/Don-de-Sang-Project?node-id=0-1&p=f&t=CrjfAaLaU0w3zXCx-0",
      detail: "Écrans, flux et prototype",
    },
  ],
  depots: [{ libelle: "Application mobile (React) et conception", url: "https://github.com/rivaldopiaplle-boop/donvie", visibilite: "public" }],
};

export default fiche;
