import { AppWindow, Bot, Brain, Workflow } from "lucide-react";
import type { ComponentType, CSSProperties } from "react";
import type { Categorie, Statut } from "./types";

type Icone = ComponentType<{ className?: string; style?: CSSProperties }>;

/**
 * Quatre catégories, pas une de plus : un visiteur doit pouvoir les retenir
 * d'un coup d'œil, comme les rayons d'une boutique.
 */
export const CATEGORIES: Record<Categorie, { nom: string; court: string; description: string; icone: Icone; couleur: string }> = {
  devops: {
    nom: "DevOps et plateformes",
    court: "DevOps",
    description: "Projets dont le sujet est la livraison du logiciel : chaînes d'intégration, conteneurs, mise en ligne, serveurs et réseau.",
    icone: Workflow,
    couleur: "#0c9467",
  },
  applications: {
    nom: "Applications et logiciel",
    court: "Applications",
    description: "Projets dont le sujet est le produit lui-même : conception des écrans, parcours de l'utilisateur, architecture du logiciel.",
    icone: AppWindow,
    couleur: "#0a7fb0",
  },
  "ia-donnees": {
    nom: "IA et analyse de données",
    court: "IA et données",
    description: "Projets dont le sujet est ce que les données apprennent : prévision, apprentissage profond, vision, et la chaîne qui met un modèle en service.",
    icone: Brain,
    couleur: "#7f4ac4",
  },
  robotique: {
    nom: "Robotique et embarqué",
    court: "Robotique",
    description: "Projets dont le sujet est la machine : microcontrôleurs, capteurs, mécanique, temps réel.",
    icone: Bot,
    couleur: "#c96a17",
  },
};

export const ORDRE_CATEGORIES: Categorie[] = ["devops", "applications", "ia-donnees", "robotique"];

export const STATUTS: Record<Statut, { nom: string; couleur: string }> = {
  "en-ligne": { nom: "En ligne", couleur: "#0c9467" },
  termine: { nom: "Terminé", couleur: "#0a7fb0" },
  "en-cours": { nom: "En cours", couleur: "#6d5bd0" },
};

export const ORDRE_STATUTS: Statut[] = ["en-ligne", "termine", "en-cours"];
