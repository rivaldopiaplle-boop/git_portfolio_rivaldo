import type { Projet } from "../types";

/**
 * Brouillon : il manque la part personnelle précise, le format des trames CAN
 * et une capture de l'interface. Retirer `publie: false` ensuite.
 */
const fiche: Projet = {
  slug: "reseau-capteurs-can",
  ordre: 72,
  publie: false,
  titre: "Réseau de capteurs sur bus CAN",
  accroche: "Des cartes STM32 qui mesurent, un bus CAN qui transporte, une interface qui montre l'orientation en 3D.",
  resume:
    "Projet final de réseaux embarqués : des nœuds STM32 lisent humidité, température, pression, distance, vent et centrale inertielle, et publient leurs mesures sur un bus CAN. Une interface PyQt les affiche en temps réel, avec l'orientation calculée par fusion de Madgwick.",
  categorie: "robotique",
  statut: "termine",
  annee: "2025 — 2026",
  cadre: "ENIB · réseaux et systèmes embarqués",
  couleur: "#2f8f6b",
  puce: "STM32F1 · CAN",
  stack: ["c", "stm32", "can", "python", "qt"],
  sections: [
    {
      titre: "Les nœuds",
      points: [
        "Pilotes CAN, I²C, SPI et UART",
        "HTS221, LPS22HB, VL6180X, anémomètre, servomoteur Dynamixel",
        "Centrale MPU9250 fusionnée par l'algorithme de Madgwick",
      ],
    },
    {
      titre: "L'interface",
      points: ["PyQt5, python-can et OpenGL", "Environ 1 400 lignes : mesures en direct et orientation 3D"],
    },
  ],
  depots: [{ libelle: "Micrologiciel et interface", url: null, visibilite: "public" }],
};

export default fiche;
