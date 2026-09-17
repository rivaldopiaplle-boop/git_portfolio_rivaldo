import type { Projet } from "../types";
import administration from "./administration.webp";

const DEPOT = "https://github.com/rivaldopiaplle-boop/git_api_rest_rivaldo";
const CHAINE = `${DEPOT}/actions/workflows/ci.yml`;

const fiche: Projet = {
  slug: "api-rest-prisma",
  ordre: 35,
  titre: "API REST avec Next.js et Prisma",
  accroche: "Une API protégée par clé, sur PostgreSQL, avec son interface d'administration et sept tests qui l'interrogent en HTTP.",
  resume:
    "Un projet d'abord construit en Express, avec les données dans un fichier JSON, puis refondu en une seule application Next.js : routes d'API protégées par l'en-tête x-api-key, Prisma sur PostgreSQL, migrations versionnées, jeu de démonstration, et une interface d'administration qui parle directement à Prisma par des actions serveur. Une chaîne d'intégration rejoue les tests contre une vraie base à chaque poussée.",
  categorie: "devops",
  statut: "termine",
  annee: "2026",
  cadre: "Formation déploiement",
  couleur: "#1f9d6e",
  couverture: { src: administration, alt: "Interface d'administration de l'API : liste des plats et formulaire de création", format: "ecran" },
  galerie: [
    {
      src: administration,
      alt: "Interface d'administration de l'API",
      legende: "L'administration : actions serveur sur Prisma, et l'API qui garde son contrat par clé",
      format: "ecran",
    },
  ],
  stack: ["nextjs", "prisma", "postgresql", "node", "githubactions", "docker"],
  chiffres: [
    { valeur: 7, libelle: "routes, de la sonde de santé au CRUD complet" },
    { valeur: 7, libelle: "tests qui interrogent l'API en HTTP" },
    { valeur: 1, libelle: "commande pour tout lancer en local" },
  ],
  probleme:
    "La première version gardait les données dans un fichier JSON. Parfait pour apprendre, intenable dès que deux écritures se croisent, et impossible à tenir en ligne.",
  solution:
    "Une seule application Next.js : les routes d'API d'un côté, l'administration de l'autre, Prisma et PostgreSQL en dessous. Les migrations sont versionnées, et les tests parlent à l'API en HTTP, comme son client.",
  sections: [
    {
      titre: "Ce qui compte en production",
      texte: "Deux chaînes de connexion, deux usages.",
      points: [
        "Requêtes par le regroupeur de connexions, migrations par la connexion directe",
        "Client Prisma en singleton : pas de nouvelle connexion à chaque rechargement",
        "Routes /api/foods en CRUD complet, sonde /api/health qui interroge vraiment la base",
        "Refonte assumée : d'Express et JSON à Next.js et Prisma, l'historique du dépôt garde la première version",
      ],
    },
    {
      titre: "Deux défauts trouvés en écrivant les tests",
      texte: "Le code semblait complet. Les tests ont montré le contraire.",
      points: [
        "La validation existait, mais son erreur traversait les routes sans être attrapée : le client recevait un 500 muet au lieu d'un 400 qui dit ce qui manque",
        "PATCH n'existait pas : toute modification partielle répondait 405. PATCH ne touche plus que les champs envoyés, PUT continue de remplacer la ressource",
        "Les deux corrections sont couvertes par un test, pour qu'elles ne reviennent pas",
      ],
    },
    {
      titre: "La chaîne, du moins cher au plus cher",
      points: [
        "Le schéma Prisma est valide et le client se génère",
        "L'application se construit",
        "Migrations appliquées sur un PostgreSQL réel, base amorcée, application démarrée, tests en HTTP",
        "La clé d'API des tests est fabriquée dans la chaîne : aucun secret du dépôt n'est nécessaire",
      ],
    },
  ],
  lecons: [
    {
      titre: "Une validation qu'on n'attrape pas ne sert à rien",
      texte: "Le code de validation était écrit, testé de tête, jamais exercé. Le client, lui, ne voyait qu'un 500 sans explication.",
    },
    {
      titre: "PUT et PATCH ne disent pas la même chose",
      texte: "PUT remplace, PATCH complète. Les confondre, c'est obliger le client à renvoyer tout l'objet pour changer une calorie.",
    },
    {
      titre: "Un projet qui dort sur un poste de travail n'existe pas",
      texte: "La refonte était finie depuis des mois, mais jamais poussée : le dépôt public montrait encore la version au fichier JSON.",
    },
  ],
  pipeline: [
    { genre: "declencheur", titre: "git push", taches: [{ nom: "main ou pull request", controles: ["Node 20, dépendances verrouillées"] }] },
    {
      genre: "verification",
      titre: "Schéma et construction",
      taches: [
        { nom: "Prisma", controles: ["prisma validate", "prisma generate"] },
        { nom: "Next.js", controles: ["npm run build"] },
      ],
    },
    {
      genre: "verification",
      titre: "API réelle",
      taches: [{ nom: "PostgreSQL 17 en service", controles: ["migrate deploy", "db seed", "application démarrée", "7 tests en HTTP"] }],
    },
  ],
  extraits: [
    {
      fichier: "lib/reponses.js",
      langage: "javascript",
      commentaire: "Le correctif du 500 muet : une erreur de validation devient un 400 qui dit ce qui manque, une erreur imprévue reste un 500 sans détail.",
      code: `export function reponseErreur(erreur) {
  if (erreur instanceof ValidationError) {
    return NextResponse.json({ error: "Validation error", details: erreur.details }, { status: 400 });
  }

  if (erreur instanceof SyntaxError) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  console.error("Erreur non prévue :", erreur);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}`,
    },
    {
      fichier: "lib/foods.js",
      langage: "javascript",
      commentaire: "PUT remplace, PATCH complète : sans cette fusion, changer une seule calorie échouait sur la validation des champs absents.",
      code: `export async function updateFood(id, input, { fusionner = false } = {}) {
  const existing = await prisma.food.findUnique({ where: { id } });

  if (!existing) return null;

  const aNormaliser = fusionner
    ? { name: existing.name, category: existing.category, description: existing.description, calories: existing.calories, tags: existing.tags, ...input }
    : input;

  const normalized = normalizeFoodInput(aNormaliser);
  if (normalized.errors) raiseValidationError(normalized.errors);

  return prisma.food.update({ where: { id }, data: normalized.data });
}`,
    },
    {
      fichier: "tests/api.test.mjs",
      langage: "javascript",
      commentaire: "Le test parle à l'application démarrée, en HTTP : création, lecture, modification partielle, suppression, puis 404.",
      code: `const creation = await fetch(\`\${BASE}/api/foods\`, {
  method: "POST",
  headers: entetes(),
  body: JSON.stringify({ name: nom, category: "tests", calories: 120, tags: "ci, integration" }),
});
assert.equal(creation.status, 201);

const modification = await fetch(\`\${BASE}/api/foods/\${cree.id}\`, {
  method: "PATCH",
  headers: entetes(),
  body: JSON.stringify({ calories: 240 }),
});
assert.equal(modification.status, 200);`,
    },
    {
      fichier: "lib/auth.js",
      langage: "javascript",
      commentaire: "Une clé absente côté serveur est une erreur de configuration (500), pas un refus d'accès (401) : les deux ne se confondent pas.",
      code: `export function requireApiKey(request) {
  const expectedKey = process.env.API_KEY?.trim();

  if (!expectedKey) {
    return NextResponse.json({ error: "API_KEY is not configured" }, { status: 500 });
  }

  const providedKey = request.headers.get("x-api-key")?.trim();

  if (!providedKey || providedKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}`,
    },
  ],
  feuilleDeRoute: [
    {
      titre: "En ligne sur Vercel, avec une base Neon",
      detail: "Le README donne les quatre étapes. Neon réveille sa base seule à la première requête : la panne de la banque ne peut pas s'y reproduire.",
      etat: "prevu",
    },
  ],
  preuves: [
    {
      libelle: "Les exécutions de la chaîne",
      url: `${CHAINE}?query=branch%3Amain`,
      detail: "Schéma, construction, puis l'API interrogée en HTTP contre un vrai PostgreSQL",
      badge: `${CHAINE}/badge.svg?branch=main`,
    },
  ],
  depots: [{ libelle: "Dépôt de l'API", url: DEPOT, visibilite: "public" }],
};

export default fiche;
