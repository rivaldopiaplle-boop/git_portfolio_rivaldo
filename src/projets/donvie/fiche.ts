import type { Projet } from "../types";
import carteMentale from "./carte-mentale.webp";
import croquis from "./croquis-accueil.webp";
import ecranAccueil from "./ecran-accueil.webp";
import enLigne from "./en-ligne.webp";
import logo from "./logo.webp";
import prototype from "./prototype-parcours.jpg";
import appAccueil from "./app-accueil.webp";
import appCarte from "./app-carte.webp";
import appFiche from "./app-fiche-lieu.webp";
import appRdv from "./app-rendez-vous.webp";

// Le dépôt complet, celui qui est déployé, est privé : le projet est trop avancé
// pour être récupérable en entier. Le dépôt public porte une version antérieure,
// figée, qui montre du code sans donner l'application.
const DEPOT_PRIVE = "https://github.com/rivaldopiaplle-boop/donvie";
const DEPOT_PUBLIC = "https://github.com/rivaldopiaplle-boop/git_donvie";
const CHAINE = `${DEPOT_PUBLIC}/actions/workflows/ci.yml`;
const VEILLE = "https://github.com/rivaldopiaplle-boop/git_portfolio_rivaldo/actions/workflows/veille-bases.yml";

const fiche: Projet = {
  slug: "donvie",
  ordre: 40,
  titre: "DonVie",
  accroche: "Les vraies collectes de sang de l'EFS autour de soi, la date de son prochain don, ses rendez-vous : une application installable, de la carte mentale à la production.",
  resume:
    "Application de don de sang menée en équipe à l'ENIB. La conception a précédé le code (idéation, personas, croquis, maquettes, prototype Figma évalué). L'application réelle s'appuie sur les données ouvertes de l'Établissement français du sang : lieux et dates de collecte, places restantes, lien de réservation. Elle calcule la date du prochain don possible, garde les rendez-vous dans l'agenda, se partage, s'installe sur un téléphone, et répond aux questions par un assistant Mistral. Interface React, API serveur sur Vercel, base PostgreSQL chez Neon.",
  categorie: "applications",
  statut: "en-ligne",
  annee: "2025-2026",
  cadre: "ENIB · conception puis développement",
  equipe: "Projet d'équipe",
  couleur: "#c62f3b",
  logo,
  couverture: { src: appCarte, alt: "DonVie : la carte des collectes de l'EFS autour de Brest", format: "mobile" },
  galerie: [
    { src: appCarte, alt: "Carte des collectes", legende: "La carte : les vraies collectes de l'EFS autour de soi, avec les places restantes", format: "mobile" },
    { src: appFiche, alt: "Fiche d'un lieu de collecte", legende: "Un lieu : prochaines collectes, réservation EFS, itinéraire, partage, rendez-vous gardé", format: "mobile" },
    { src: appAccueil, alt: "Accueil d'un donneur connecté", legende: "L'accueil : prochain don possible, prochain rendez-vous, collectes qui manquent de donneurs", format: "mobile" },
    { src: appRdv, alt: "Mes rendez-vous", legende: "Les rendez-vous : confirmation sur le site de l'EFS, agenda avec rappel, itinéraire", format: "mobile" },
    { src: enLigne, alt: "DonVie sur ordinateur, dans un cadre de téléphone, avec un QR code", legende: "Sur ordinateur : l'application dans un cadre de téléphone, et un QR code pour l'ouvrir au téléphone", format: "ecran" },
    { src: ecranAccueil, alt: "Maquette de l'accueil", legende: "La maquette d'origine, avant les vraies données", format: "mobile" },
    { src: croquis, alt: "Croquis papier de l'accueil", legende: "Croquis : le même écran, au crayon, avant toute maquette", format: "mobile" },
    { src: carteMentale, alt: "Carte mentale d'idéation", legende: "Idéation : six axes autour de la question de départ", format: "schema" },
    { src: prototype, alt: "Parcours du prototype Figma", legende: "Prototype : les écrans reliés par leurs interactions", format: "schema" },
  ],
  stack: ["figma", "react", "typescript", "vite", "tailwind", "leaflet", "postgresql", "neon", "vercel", "mistral", "vitest", "githubactions"],
  chiffres: [
    { valeur: 8, libelle: "routes d'API : comptes, dons, rendez-vous, collectes, HemoBot" },
    { valeur: 11, libelle: "essais de bout en bout rejoués sur la production à chaque déploiement" },
    { valeur: 1, libelle: "heure : la fraîcheur des données de l'EFS" },
  ],
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
      titre: "De la maquette à une vraie application",
      texte: "La première version, issue de Figma Make, affichait des données écrites en dur. Chaque bouton fait désormais ce pour quoi il a été dessiné.",
      points: [
        "Les collectes réelles de l'EFS, interrogées côté serveur, normalisées et gardées une heure en cache",
        "Carte OpenStreetMap, recherche d'adresse par la Base adresse nationale, localisation du téléphone, filtres",
        "Date du prochain don selon les délais de l'EFS (8 semaines entre deux dons de sang, plafond annuel, plasma, plaquettes), testée",
        "Rendez-vous gardés, fichier d'agenda avec rappel, itinéraire, partage par la feuille native du téléphone",
        "HemoBot par Mistral AI, parrainage avec code, lien et QR code, suppression du compte en un geste",
        "Installable sur un téléphone (manifeste, service worker) ; sur ordinateur, un QR code pour l'ouvrir au téléphone",
      ],
    },
    {
      titre: "Sécurité et vérification",
      points: [
        "Mots de passe hachés par scrypt, session dans un cookie HttpOnly signé, requêtes SQL paramétrées et limitées à leur auteur",
        "Limitation de débit sur l'inscription, la connexion et l'assistant ; politique de contenu stricte et HSTS",
        "Chaque poussée : imports, types, tests des règles de don et des données de l'EFS, construction",
        "Chaque déploiement en production : l'API parcourue de bout en bout sur l'adresse publique, compte d'essai créé puis supprimé",
        "Deux défauts trouvés ainsi et corrigés : un import sans extension qui ne cassait qu'en production, une requête SQL ambiguë",
      ],
    },
  ],
  demos: [
    {
      libelle: "L'application en ligne",
      url: "https://donvie-rivaldo.vercel.app",
      detail: "Les vraies collectes de l'EFS ; avec ou sans compte. Sur téléphone, elle s'installe",
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
      detail: "Types et construction à chaque poussée, sur le dépôt public",
      badge: `${CHAINE}/badge.svg?branch=main`,
    },
    {
      libelle: "La veille quotidienne de la production",
      url: VEILLE,
      detail: "Chaque matin : un compte de découverte est créé puis supprimé sur l'adresse publique, pour vérifier que l'API et la base répondent",
      badge: `${VEILLE}/badge.svg`,
    },
  ],
  depots: [
    {
      libelle: "Code publié",
      url: DEPOT_PUBLIC,
      visibilite: "public",
      detail:
        "Une version antérieure, volontairement allégée, qui n'évolue plus : interface React et TypeScript, treize écrans, données simulées. Elle existe pour montrer du code sans livrer le projet entier",
    },
    {
      libelle: "Projet complet, celui qui est en ligne",
      url: DEPOT_PRIVE,
      visibilite: "prive",
      detail:
        "API, base PostgreSQL, comptes, collectes réelles de l'EFS, itinéraires, essais de bout en bout. Privé pour que le projet ne soit pas récupérable ; l'accès en lecture peut être ouvert le temps d'un entretien",
    },
  ],
};

export default fiche;
