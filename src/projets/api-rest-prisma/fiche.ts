import type { Projet } from "../types";

const fiche: Projet = {
  slug: "api-rest-prisma",
  ordre: 35,
  titre: "API REST avec Next.js et Prisma",
  accroche: "Une API protégée par clé, branchée sur PostgreSQL Supabase, avec son interface d'administration.",
  resume:
    "Un projet d'abord construit en Express avec un stockage JSON, puis refondu en une application Next.js unique : routes d'API protégées par l'en-tête x-api-key, Prisma sur Supabase, jeu de données initial et requêtes rejouables.",
  categorie: "devops",
  statut: "termine",
  annee: "2026",
  cadre: "Formation déploiement",
  couleur: "#1f9d6e",
  stack: ["nextjs", "prisma", "supabase", "postgresql", "node"],
  sections: [
    {
      titre: "Ce qui compte en production",
      texte: "Deux chaînes de connexion, deux usages.",
      points: [
        "Requêtes par le pooler Supabase (pgbouncer), migrations par la connexion directe",
        "Client Prisma en singleton : pas de nouvelle connexion à chaque rechargement",
        "Routes /api/foods en CRUD complet, sonde /api/health",
        "Refonte assumée : d'Express + JSON à Next.js + Prisma",
      ],
    },
  ],
  extraits: [
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
    {
      fichier: "prisma/schema.prisma",
      langage: "prisma",
      commentaire: "directUrl pour les migrations, url (pooler) pour les requêtes.",
      code: `datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Food {
  id        String   @id @default(uuid())
  name      String
  category  String
  tags      String[] @default([])
  apiKey    String   @unique
  createdAt DateTime @default(now())

  @@index([category])
}`,
    },
  ],
  depots: [{ libelle: "Dépôt de l'API", url: "https://github.com/rivaldopiaplle-boop/git_api_rest_rivaldo", visibilite: "public" }],
};

export default fiche;
