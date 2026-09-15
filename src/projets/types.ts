import type { Techno } from "../contenu/technos";

export type Categorie = "devops" | "applications" | "robotique";

/** `en-ligne` : on peut l'utiliser. `termine` : livré, hors ligne. `en-cours` : en construction. */
export type Statut = "en-ligne" | "termine" | "en-cours";

export interface Chiffre {
  valeur: number;
  suffixe?: string;
  libelle: string;
}

export interface Media {
  /** Adresse fournie par Vite : `import capture from "./capture.webp"`. */
  src: string;
  alt: string;
  legende?: string;
  /** Écran de téléphone : affiché étroit, sans être étiré. */
  format?: "ecran" | "mobile" | "photo" | "schema";
}

export interface LienDemo {
  libelle: string;
  url: string;
  detail?: string;
}

/**
 * Un dépôt. `prive` : il existe mais un visiteur tomberait sur une 404 :
 * on l'affiche sans lien ni QR code. `url: null` : pas encore poussé.
 */
export interface Depot {
  libelle: string;
  url: string | null;
  visibilite: "public" | "prive";
}

export interface SectionEtude {
  titre: string;
  texte?: string;
  points?: string[];
}

export interface Lecon {
  titre: string;
  texte: string;
}

export interface EtapeFeuilleDeRoute {
  titre: string;
  detail: string;
  etat: "en-cours" | "prevu";
}

export interface Extrait {
  fichier: string;
  langage: string;
  code: string;
  commentaire?: string;
}

export type GenreEtape = "declencheur" | "verification" | "publication" | "hebergement" | "surveillance";

export interface TachePipeline {
  nom: string;
  controles: string[];
}

export interface EtapePipeline {
  genre: GenreEtape;
  titre: string;
  taches: TachePipeline[];
}

/**
 * Une fiche projet. Elle vit dans `src/projets/<slug>/fiche.ts`, à côté de ses
 * images : tout ce qui concerne un projet est au même endroit.
 */
export interface Projet {
  slug: string;
  /** Ordre d'affichage : plus petit = plus haut. */
  ordre: number;
  titre: string;
  accroche: string;
  resume: string;
  categorie: Categorie;
  statut: Statut;
  annee: string;
  cadre: string;
  couleur: string;
  stack: Techno[];
  depots: Depot[];

  /**
   * `false` : brouillon. La fiche existe et se remplit au fil du projet, mais
   * le site ne la montre pas. Passer à `true` (ou retirer la ligne) suffit à la
   * publier : toutes les vues la prennent en compte sans rien toucher d'autre.
   */
  publie?: boolean;
  phare?: boolean;
  equipe?: string;
  logo?: string;
  /** Image de la vignette. Sans elle, un visuel est dessiné aux couleurs du projet. */
  couverture?: Media;
  /** Libellé gravé sur la puce du visuel dessiné des projets de robotique. */
  puce?: string;
  galerie?: Media[];
  chiffres?: Chiffre[];
  probleme?: string;
  solution?: string;
  role?: string[];
  sections?: SectionEtude[];
  lecons?: Lecon[];
  pipeline?: EtapePipeline[];
  /** Sa présence dit que le projet continue : la fiche affiche « En évolution ». */
  feuilleDeRoute?: EtapeFeuilleDeRoute[];
  extraits?: Extrait[];
  demos?: LienDemo[];
}
