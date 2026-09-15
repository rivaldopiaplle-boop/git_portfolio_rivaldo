import type { Projet } from "./types";

/**
 * Le registre. Chaque projet vit dans son dossier `src/projets/<slug>/`,
 * avec sa fiche et ses images. Ajouter un dossier avec un `fiche.ts` suffit à
 * le faire apparaître : rien à déclarer ici.
 *
 * Toutes les fiches suivent le même gabarit (`Projet`), et chaque vue n'affiche
 * que ce qu'une fiche contient. Un projet en cours peut donc rester en
 * brouillon (`publie: false`) : le jour où il est prêt, il prend sa place
 * partout (tableau de bord, catalogue, compteurs, barre latérale) sans
 * qu'aucun écran ne change.
 */
const fiches = import.meta.glob<{ default: Projet }>("./*/fiche.ts", { eager: true });

const TOUTES = Object.values(fiches)
  .map((module) => module.default)
  .sort((a, b) => a.ordre - b.ordre);

export const PROJETS: Projet[] = TOUTES.filter((p) => p.publie !== false);
export const BROUILLONS: Projet[] = TOUTES.filter((p) => p.publie === false);
export const PHARES = PROJETS.filter((p) => p.phare);

export function trouverProjet(slug: string | undefined) {
  return PROJETS.find((p) => p.slug === slug);
}

/** Ce qu'un visiteur peut ouvrir ou regarder sur un projet. Jamais vide. */
export function ceQuOnPeutVoir(projet: Projet) {
  return {
    demos: projet.demos?.length ?? 0,
    depotsPublics: projet.depots.filter((d) => d.visibilite === "public" && d.url).length,
    images: projet.galerie?.length ?? 0,
    extraits: projet.extraits?.length ?? 0,
  };
}

if (import.meta.env.DEV) {
  for (const projet of PROJETS) {
    const visible = Object.values(ceQuOnPeutVoir(projet)).some((n) => n > 0);
    if (!visible) console.error(`Projet « ${projet.slug} » : rien à montrer (démo, dépôt, image ou extrait).`);
  }
}
