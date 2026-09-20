import type { Projet } from "../types";
import ficheProduit from "./fiche-produit.webp";
import logo from "./logo.webp";
import mobileAccueil from "./mobile-accueil.webp";
import mobileConnexion from "./mobile-connexion.webp";
import vitrine from "./vitrine.webp";

const GH = "https://github.com/rivaldopiaplle-boop";
const SITE = "https://git-e-commerce-livraison-v2.vercel.app";

const fiche: Projet = {
  slug: "rivdinde",
  ordre: 20,
  titre: "RivDinde",
  accroche: "Commander, livrer, suivre : une place de marché à deux circuits de livraison, cinq rôles et un seul paiement.",
  resume:
    "Plateforme de commerce et de livraison à deux régimes : Express (restauration, trajet direct) et Standard (colis, entrepôt, tournées groupées). Client, vendeur, gestionnaire, livreur et administrateur ont chacun leur espace, sur le support qui correspond à leur métier. Conçue avant d'être codée (200 décisions motivées, 33 entités, sept contrats), et en ligne sur Vercel, Render et Neon. La vitrine tourne ; le produit, lui, avance encore.",
  categorie: "devops",
  statut: "en-ligne",
  annee: "2026",
  cadre: "Formation DevOps · projet personnel",
  couleur: "#d46f1d",
  phare: true,
  logo,
  couverture: { src: vitrine, alt: "Vitrine publique de RivDinde : catalogue, QR codes Android et iPhone", format: "ecran" },
  galerie: [
    { src: vitrine, alt: "Vitrine publique", legende: "Vitrine publique : accessible sans compte", format: "ecran" },
    { src: ficheProduit, alt: "Fiche produit", legende: "Fiche produit : circuit de livraison, boutique, avis", format: "ecran" },
    { src: mobileAccueil, alt: "Application mobile : accueil de la cliente", legende: "Mobile : accueil client, boutiques Express à proximité", format: "mobile" },
    { src: mobileConnexion, alt: "Application mobile : connexion", legende: "Mobile : comptes de démonstration par rôle", format: "mobile" },
  ],
  stack: ["django", "python", "postgresql", "vue", "typescript", "pinia", "primevue", "tailwind", "ionic", "capacitor", "docker", "githubactions", "vercel", "render", "neon", "stripe", "leaflet", "mistral", "pytest", "ruff", "vitest"],
  chiffres: [
    { valeur: 537, libelle: "tests automatisés" },
    { valeur: 200, libelle: "décisions motivées et écrites" },
    { valeur: 33, libelle: "entités en base" },
    { valeur: 5, libelle: "rôles, chacun son espace" },
    { valeur: 4, libelle: "tâches d'intégration" },
    { valeur: 59, libelle: "produits de démonstration" },
  ],
  probleme:
    "Une vraie place de marché mélange deux logistiques qui ne se ressemblent pas : un plat doit partir d'une boutique proche en quelques minutes, un colis transite par un entrepôt et une tournée. Les deux dans le même panier, payés en une fois, suivis par cinq métiers différents.",
  solution:
    "Un monolithe Django bien découpé plutôt que des microservices, un front Vue et une application Ionic qui partagent leur paquet de types, et un simulateur derrière chaque service payant (paiement, courriels, IA, itinéraires) pour que tout se démontre sans compte ni carte bancaire.",
  sections: [
    {
      titre: "Deux circuits, un seul panier",
      texte: "Le panier se découpe tout seul au passage en caisse.",
      points: [
        "Express : le catalogue est filtré par rayon, et une boutique hors de portée n'apparaît jamais",
        "Standard : réception à l'entrepôt, tournées ordonnées au plus proche voisin",
        "Un panier mixte donne N commandes et un seul règlement, réparti par Stripe Connect",
        "Stock revérifié sous verrou transactionnel au moment du paiement",
        "Distances calculées en local (haversine), géocodage Nominatim appelé une seule fois par adresse",
      ],
    },
    {
      titre: "Cinq rôles, chacun sur son support",
      texte: "Le livreur a une main sur le guidon ; le vendeur a un clavier et un grand écran.",
      points: [
        "Client sur web et mobile, livreur sur mobile, vendeur, gestionnaire et administrateur sur web",
        "Une couleur d'accent par rôle, propagée jusque dans les fenêtres et les notifications",
        "Masquer n'est pas une permission : le chiffre d'affaires ne quitte pas le serveur pour le personnel",
        "Une suspension coupe l'accès à la requête suivante, pas à l'expiration du jeton",
      ],
    },
    {
      titre: "Un simulateur derrière chaque service payant",
      texte: "Aucune clé n'est nécessaire pour démarrer : chaque service externe a son double local, et la vraie implémentation prend le relais dès qu'une clé est posée.",
      points: [
        "Paiement simulé, cartes d'essai refusées avec leur raison",
        "Assistant IA qui appelle de vrais outils (commandes, catalogue, courses) via Mistral, ou simulé sans clé",
        "Itinéraires OpenRouteService, repli à vol d'oiseau",
        "Un test ne touche jamais le réseau, même quand des clés sont présentes",
      ],
    },
    {
      titre: "Une vitrine en ligne qui se répare seule",
      texte: "Front sur Vercel, API Django en conteneur sur Render, base PostgreSQL sur Neon.",
      points: [
        "CORS autorisé par motif : les prévisualisations Vercel fonctionnent sans liste tenue à la main",
        "Peuplement de démonstration commité étape par étape : un conteneur tué ne vide plus la base",
        "Sonde /sante qui annonce la révision servie et l'état du jeu de démonstration",
        "Application mobile publiée sous /mobile/ par le même déploiement, avec QR Android et iPhone",
      ],
    },
  ],
  lecons: [
    { titre: "Une variable mal nommée ne lève aucune erreur", texte: "DJANGO_ALLOWED_HOSTS au lieu d'ALLOWED_HOSTS : la valeur par défaut s'applique, le front reste vide, les journaux sont propres." },
    { titre: "Une longue transaction est une bombe", texte: "Sur une offre gratuite, le conteneur manque de mémoire et PostgreSQL annule tout : déploiement réussi, base vide, aucune erreur." },
    { titre: "Expliquer ce qu'on a refusé", texte: "Celery, Redis, Elasticsearch, PostGIS, GraphQL, microservices, Kubernetes : chaque refus est écrit, avec sa raison." },
    { titre: "Une erreur invisible appelle un test", texte: "Une classe CSS vers un jeton absent ne produit ni style ni erreur. Un test lit le thème et tous les écrans, et échoue à sa place." },
  ],
  feuilleDeRoute: [
    { titre: "Encaissement réel avec Stripe Connect", detail: "Le parcours complet tourne en simulation ; basculer demande les comptes vendeurs et le cadre contractuel.", etat: "prevu" },
    { titre: "Suivi en temps réel", detail: "Passer de l'interrogation périodique aux WebSockets (Django Channels), sans changer les charges utiles.", etat: "prevu" },
    { titre: "Tournées optimisées par solveur", detail: "Google OR-Tools après le plus proche voisin, pour les tournées longues.", etat: "prevu" },
    { titre: "Images sur stockage objet", detail: "Cloudinary est prévu dans le code ; en ligne, les vignettes sont encore redessinées au démarrage.", etat: "prevu" },
    { titre: "Notifications poussées", detail: "Firebase Cloud Messaging pour le livreur et le client.", etat: "prevu" },
  ],
  pipeline: [
    { genre: "declencheur", titre: "git push", taches: [{ nom: "main ou pull request", controles: ["Quatre tâches en parallèle"] }] },
    {
      genre: "verification",
      titre: "Vérification",
      taches: [
        { nom: "Backend", controles: ["ruff", "Aucune migration manquante", "pytest sur PostgreSQL 16", "Démo peuplée, couverture stricte"] },
        { nom: "Web", controles: ["Types stricts", "Tests, dont jetons CSS", "Build"] },
        { nom: "Mobile", controles: ["Types du paquet partagé", "Gardes qualité", "Build Ionic"] },
        { nom: "Qualité", controles: ["Aucun .env versionné", "Journal des décisions bien formé"] },
      ],
    },
    {
      genre: "hebergement",
      titre: "En ligne",
      taches: [
        { nom: "Vercel", controles: ["Web + /mobile/"] },
        { nom: "Render", controles: ["API Django en conteneur"] },
        { nom: "Neon", controles: ["PostgreSQL sans serveur"] },
      ],
    },
    { genre: "surveillance", titre: "Réveil", taches: [{ nom: "Tâche planifiée", controles: ["Toutes les 10 min, de 5 h à 20 h", "/sante : révision servie"] }] },
  ],
  demos: [
    { libelle: "Site web", url: SITE, detail: "Vitrine publique, comptes de démonstration fournis", support: "web" },
    { libelle: "Application mobile", url: `${SITE}/mobile/`, detail: "À ouvrir sur un téléphone", support: "mobile" },
  ],
  depots: [
    {
      libelle: "Code publié",
      url: `${GH}/git_rivdinde`,
      visibilite: "public",
      detail:
        "Une version antérieure, volontairement allégée, qui n'évolue plus : vitrine, catalogue filtré et panier, avec son API Django. Elle existe pour montrer du code sans livrer le projet entier",
    },
    {
      libelle: "Projet complet, celui qui est en ligne",
      url: `${GH}/git_e_commerce_livraison_v2`,
      visibilite: "prive",
      detail:
        "Cinq métiers et leurs écrans, application mobile, paiement partagé entre les vendeurs, tournées de livraison, mise en ligne automatisée. Privé pour que le projet ne soit pas récupérable ; l'accès en lecture peut être ouvert le temps d'un entretien",
    },
  ],
};

export default fiche;
