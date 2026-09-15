import type { Projet } from "../types";

/**
 * Brouillon : manquent un Makefile commun, les chronogrammes des bancs de test
 * et un schéma du périphérique UART. Retirer `publie: false` ensuite.
 */
const fiche: Projet = {
  slug: "fpga-vhdl-icebreaker",
  ordre: 78,
  publie: false,
  titre: "Périphériques FPGA en VHDL",
  accroche: "Du comparateur 1 bit au périphérique UART complet et au microphone PDM, sur FPGA iCE40, chaque module avec son banc de test.",
  resume:
    "Conception matérielle en VHDL sur la carte iCEBreaker (horloge 12 MHz) : chenillard, chronomètre, périphérique UART avec générateur de débit à 230 400 bauds, et acquisition d'un microphone PDM renvoyée par UART. Environ 2 900 lignes de VHDL.",
  categorie: "robotique",
  statut: "termine",
  annee: "2025 — 2026",
  cadre: "ENIB · électronique numérique",
  couleur: "#6b4fb0",
  puce: "iCE40 · VHDL",
  stack: ["vhdl", "fpga"],
  sections: [
    {
      titre: "Les modules",
      points: [
        "Comparateur, chenillard et chronomètre à compteurs cascadés",
        "UART : générateur de débit, émission et réception",
        "Microphone PDM : acquisition et envoi par UART",
        "Un banc de test par module",
      ],
    },
  ],
  depots: [{ libelle: "Modules VHDL", url: null, visibilite: "public" }],
};

export default fiche;
