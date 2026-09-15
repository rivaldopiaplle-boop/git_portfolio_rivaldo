import type { Projet } from "../types";
import adminJournal from "./admin-journal-audit.webp";
import adminTableau from "./admin-tableau-de-bord.webp";
import clientCartes from "./client-cartes.webp";
import clientOperations from "./client-operations.webp";
import clientTableau from "./client-tableau-de-bord.webp";
import clientVirements from "./client-virements.webp";
import connexion from "./connexion.webp";
import logo from "./logo.svg";
import simulateur from "./simulateur-reseau.webp";

const GH = "https://github.com/rivaldopiaplle-boop";

const fiche: Projet = {
  slug: "banque",
  ordre: 10,
  titre: "Banque App",
  accroche: "Une banque complète — du distributeur de billets au journal d'audit — prouvée par 994 vérifications à chaque poussée.",
  resume:
    "Application bancaire à trois espaces cloisonnés : les clients consultent leurs comptes, virent, gèrent leurs cartes et déposent des demandes ; les conseillers instruisent le portefeuille qui leur est confié ; les administrateurs organisent l'établissement et surveillent le système. Un serveur, un front web, une application mobile et un simulateur de réseau monétique, montés en une commande et vérifiés par une chaîne d'intégration continue. Le projet continue d'évoluer : sa feuille de route est publique.",
  categorie: "devops",
  statut: "en-ligne",
  annee: "2026",
  cadre: "Formation DevOps · projet personnel",
  couleur: "#2b7fd4",
  phare: true,
  logo,
  couverture: { src: clientTableau, alt: "Tableau de bord de l'espace client : soldes, flux mensuels, dernières opérations", format: "ecran" },
  galerie: [
    { src: clientTableau, alt: "Espace client : synthèse des comptes", legende: "Espace client — synthèse, flux mensuels, répartition", format: "ecran" },
    { src: clientCartes, alt: "Espace client : gestion des cartes", legende: "Cartes — plafonds, opposition, carte virtuelle", format: "ecran" },
    { src: clientVirements, alt: "Espace client : virements", legende: "Virements — immédiats, différés, permanents", format: "ecran" },
    { src: clientOperations, alt: "Espace client : historique des opérations", legende: "Opérations — historique filtrable", format: "ecran" },
    { src: adminTableau, alt: "Espace administrateur : pilotage", legende: "Administration — pilotage des conseillers et des portefeuilles", format: "ecran" },
    { src: adminJournal, alt: "Espace administrateur : journal d'audit", legende: "Journal d'audit — chaque geste sensible est tracé", format: "ecran" },
    { src: simulateur, alt: "Simulateur de réseau monétique : distributeur", legende: "Simulateur de réseau — distributeur, guichet, terminal, SEPA", format: "ecran" },
    { src: connexion, alt: "Écran de connexion de la banque", legende: "Connexion — comptes de démonstration par rôle", format: "ecran" },
  ],
  stack: ["nestjs", "typescript", "prisma", "postgresql", "react", "mui", "reactquery", "expo", "docker", "githubactions", "render", "supabase", "nginx", "caddy", "jwt"],
  chiffres: [
    { valeur: 994, libelle: "preuves rejouées à chaque poussée" },
    { valeur: 21, libelle: "domaines d'API" },
    { valeur: 29, libelle: "écrans web" },
    { valeur: 13, libelle: "écrans mobiles" },
    { valeur: 5, libelle: "tâches d'intégration en parallèle" },
    { valeur: 3, libelle: "espaces cloisonnés" },
  ],
  probleme:
    "Une banque de démonstration ment presque toujours : l'argent y apparaît d'un clic, les règles vivent dans les formulaires, et personne ne sait si la dernière correction a cassé autre chose. Le défi : construire l'inverse, et le prouver automatiquement.",
  solution:
    "Un monorepo à quatre pièces — API NestJS, front React, application Expo, simulateur de réseau monétique — qui partagent leurs types. Chaque règle métier vit côté serveur. Un banc de 994 preuves parle à l'API en HTTP, comme un navigateur, et GitHub Actions le rejoue contre une vraie base à chaque poussée.",
  sections: [
    {
      titre: "Trois métiers, un serveur qui dispose",
      texte: "Le formulaire propose, le serveur dispose : un attribut min sur un champ de date ne protège de rien dès qu'on appelle l'API directement.",
      points: [
        "Identité gelée : nom et date de naissance ne changent que par une demande approuvée",
        "Gestes sensibles — opposition, plafonds, virement au-delà de 1 000 € — : mot de passe redemandé côté serveur",
        "Principe des quatre yeux : un administrateur n'approuve jamais sa propre demande",
        "Numéro de carte physique jamais stocké ; carte virtuelle chiffrée en AES-256",
        "Journal d'audit filtrable par action, criticité et période",
      ],
    },
    {
      titre: "L'argent n'entre que par un tiers",
      texte: "Un client ne crédite pas son propre compte. Dépôts, retraits et paiements arrivent d'un équipement du réseau, par une porte signée et idempotente.",
      points: [
        "Simulateur : distributeur, guichet, terminal marchand, compensation SEPA",
        "Chaque équipement a une identité et une clé, et signe ses envois",
        "Deux pannes qu'on ne confond pas : réseau arrêté, la banque va bien ; API arrêtée, les automates affichent « centre injoignable »",
      ],
    },
    {
      titre: "Une chaîne qui enlève la décision",
      texte: "Un banc de preuves qu'on ne lance que quand on y pense finit par ne plus être lancé. La chaîne le relance à chaque poussée.",
      points: [
        "API éprouvée contre PostgreSQL 17 et Mailpit réels, en fuseau Europe/Paris — le jour bancaire est une règle métier",
        "Concordance schéma Prisma ↔ migrations, ESLint à zéro avertissement",
        "Tâche « secrets » : l'historique Git entier passé au crible, npm audit",
        "Tâche « déploiement » : le serveur doit refuser de démarrer mal configuré, puis la pile entière monte et répond",
        "Images publiées sur GitHub Container Registry, étiquetées par hash de commit — jamais latest",
      ],
    },
    {
      titre: "En ligne, sans rien payer",
      texte: "Supabase pour la base, Render pour les trois conteneurs : site, API et simulateur.",
      points: [
        "Tâche planifiée qui réveille les services toutes les dix minutes, et reveiller.mjs pour voir l'état avant une démonstration",
        "Courriels par l'API HTTP de Brevo : l'hébergeur ferme les ports SMTP sortants",
        "Adresses lues au démarrage du conteneur : changer une URL ne demande pas de reconstruire l'image",
        "Poste de travail en une commande : node demarrer.mjs attend réellement que chaque service réponde",
      ],
    },
  ],
  lecons: [
    { titre: "Étiqueter par hash, jamais latest", texte: "« Redéployer latest » redéploie exactement ce qui vient de casser. Nommer la version qui tourne rend le retour arrière possible." },
    { titre: "La vigilance ne protège pas un secret", texte: "La tâche « secrets » existe à cause d'un incident réel. Elle vérifie ce que l'attention finit par oublier." },
    { titre: "Le banc parle au conteneur", texte: "Tester sans reconstruire l'image, c'est éprouver la version d'avant et conclure, à tort, que rien n'est cassé." },
    { titre: "Refuser de démarrer, en disant pourquoi", texte: "Un refus qu'on ne comprend pas est un refus qu'on contourne : le serveur nomme le drapeau fautif." },
  ],
  feuilleDeRoute: [
    { titre: "Traduction complète, web et mobile", detail: "Le catalogue de langues descend dans le paquet partagé : une phrase écrite une fois sert aux deux fronts.", etat: "en-cours" },
    { titre: "Notifications poussées", detail: "Prévenir le client hors de l'application : opposition, virement reçu, demande tranchée.", etat: "prevu" },
    { titre: "Export CSV de l'historique", detail: "Ce qu'un client qui tient un budget réclame avant tout le reste.", etat: "prevu" },
    { titre: "Graphiques sur le mobile", detail: "La répartition par catégorie, aujourd'hui réservée au web.", etat: "prevu" },
    { titre: "Écran des anomalies de fraude", detail: "Les quatre règles de surveillance détectent déjà ; il manque la vue qui les montre.", etat: "prevu" },
  ],
  pipeline: [
    { genre: "declencheur", titre: "git push", taches: [{ nom: "main ou pull request", controles: ["Cinq tâches lancées en parallèle"] }] },
    {
      genre: "verification",
      titre: "Intégration",
      taches: [
        { nom: "API", controles: ["PostgreSQL 17 + Mailpit réels", "Types, ESLint à 0 avertissement", "Schéma ↔ migrations", "Banc : 994 / 994"] },
        { nom: "Fronts", controles: ["Web : linter, types, build", "Mobile : banc de preuves", "Empaquetage Metro"] },
        { nom: "Secrets", controles: ["Historique Git passé au crible", "npm audit, niveau high"] },
        { nom: "Déploiement", controles: ["Refus de démarrer mal configuré", "Pile montée, /sante répond"] },
        { nom: "Images", controles: ["Dockerfile construits"] },
      ],
    },
    { genre: "publication", titre: "Registre", taches: [{ nom: "GHCR", controles: ["API + front web", "Étiquette = hash du commit"] }] },
    { genre: "hebergement", titre: "En ligne", taches: [{ nom: "Render + Supabase", controles: ["Site, API, simulateur", "PostgreSQL géré"] }] },
    { genre: "surveillance", titre: "Réveil", taches: [{ nom: "Tâche planifiée", controles: ["Sonde toutes les 10 min", "reveiller.mjs avant démo"] }] },
  ],
  demos: [],
  depots: [
    { libelle: "Front web et une partie du serveur", url: `${GH}/git_banque-app`, visibilite: "public" },
    { libelle: "Projet complet : serveur, mobile, simulateur, documents", url: `${GH}/git_banque-app_v2`, visibilite: "prive" },
  ],
};

export default fiche;
