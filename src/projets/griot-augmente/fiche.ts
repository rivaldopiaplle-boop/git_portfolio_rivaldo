import type { Projet } from "../types";

/**
 * Brouillon : le projet est en cours (PER de 5ᵉ année). La fiche se remplit au
 * fil des semaines ; retirer `publie: false` la fera apparaître partout.
 */
const fiche: Projet = {
  slug: "griot-augmente",
  ordre: 80,
  publie: false,
  titre: "Le geste du griot",
  accroche: "Rendre la musique à un griot devenu aveugle : une canne qui joue, et un agent qui complète le geste.",
  resume:
    "Projet d'études et de recherche. Un géwël sénégalais, maître de musique, a perdu la vue mais pas son talent. La canne qu'il tient déjà devient à la fois capteur et instrument : elle déclenche un son de sabar immédiat, et alimente un avatar Godot qui complète le mouvement du corps entier.",
  categorie: "robotique",
  statut: "en-cours",
  annee: "2026 — 2027",
  cadre: "ENIB · projet d'études et de recherche",
  couleur: "#b03a7a",
  stack: ["godot", "python"],
  probleme:
    "« Il est devenu aveugle, donc il ne peut plus jouer » n'est pas une déduction valide : la percussion sénégalaise demande l'oreille, la main et la mémoire. Tant que l'empêchement réel n'est pas identifié, on risque de résoudre un problème qui n'existe pas.",
  solution:
    "Un seul capteur, deux chemins : un chemin court, embarqué, qui déclenche le son en moins de 20 ms ; un chemin long, qui reconstruit le mouvement complet par un modèle génératif et l'anime dans Godot en moins de 100 ms.",
  sections: [
    {
      titre: "Pourquoi la caméra ne peut pas porter le son",
      points: [
        "Une caméra à 30 images par seconde impose 33 ms rien qu'à l'acquisition",
        "Chaîne vision complète : environ 85 ms, gigue de ± 15 ms",
        "Chaîne embarquée (IMU et piézo) : environ 10 ms, gigue de ± 1 ms",
        "Limite jouable en percussion : 20 ms — et un musicien s'adapte à un retard constant, jamais à un retard qui varie",
      ],
    },
    {
      titre: "Mesurer « réaliste, robuste et humain »",
      points: [
        "Erreur de reconstruction des articulations masquées inférieure à 60 mm",
        "Latence au 95ᵉ centile sous 20 ms pour le son, 100 ms pour l'avatar",
        "Questionnaire d'agentivité et jugement de trois percussionnistes",
      ],
    },
  ],
  depots: [{ libelle: "Prototype", url: null, visibilite: "public" }],
};

export default fiche;
