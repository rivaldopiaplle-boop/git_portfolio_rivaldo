import { TECHNOS, type Techno } from "../contenu/technos";
import type { Categorie, Projet, Statut } from "./types";

export interface Filtres {
  categorie: Categorie | null;
  statut: Statut | null;
  techno: Techno | null;
  recherche: string;
}

type Facette = "categorie" | "statut" | "techno";

const normaliser = (texte: string) =>
  texte
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export function correspond(projet: Projet, filtres: Filtres): boolean {
  if (filtres.categorie && projet.categorie !== filtres.categorie) return false;
  if (filtres.statut && projet.statut !== filtres.statut) return false;
  if (filtres.techno && !projet.stack.includes(filtres.techno)) return false;

  const mots = normaliser(filtres.recherche).split(/\s+/).filter(Boolean);
  if (mots.length === 0) return true;
  const botte = normaliser(
    [projet.titre, projet.accroche, projet.resume, projet.cadre, ...projet.stack.map((t) => TECHNOS[t].nom)].join(" "),
  );
  return mots.every((mot) => botte.includes(mot));
}

/**
 * Ce qu'on verrait en choisissant la facette, les autres filtres restant posés.
 * Un compteur qui ignore les filtres actifs ment (leçon reprise de RivDinde).
 */
export function compter(projets: Projet[], filtres: Filtres, facette: Facette, valeur: string | null): number {
  const hypothese = { ...filtres, [facette]: valeur } as Filtres;
  return projets.filter((p) => correspond(p, hypothese)).length;
}

export function technosFrequentes(projets: Projet[], limite = Infinity): { techno: Techno; nombre: number }[] {
  const occurrences = new Map<Techno, number>();
  for (const projet of projets) {
    for (const techno of projet.stack) occurrences.set(techno, (occurrences.get(techno) ?? 0) + 1);
  }
  return [...occurrences.entries()]
    .sort((a, b) => b[1] - a[1] || TECHNOS[a[0]].nom.localeCompare(TECHNOS[b[0]].nom))
    .slice(0, limite)
    .map(([techno, nombre]) => ({ techno, nombre }));
}

export function lireFiltres(params: URLSearchParams): Filtres {
  return {
    categorie: params.get("categorie") as Categorie | null,
    statut: params.get("statut") as Statut | null,
    techno: params.get("techno") as Techno | null,
    recherche: params.get("q") ?? "",
  };
}
