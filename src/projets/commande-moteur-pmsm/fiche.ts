import type { Projet } from "../types";

/**
 * Brouillon : la base de commande est fournie par l'enseignant et pysimCoder
 * est un outil tiers. À publier seulement quand la part personnelle est
 * écrite noir sur blanc, avec des courbes de réponse.
 */
const fiche: Projet = {
  slug: "commande-moteur-pmsm",
  ordre: 76,
  publie: false,
  titre: "Commande d'un moteur synchrone",
  accroche: "Un moteur synchrone piloté par un STM32F446 : modulation vectorielle, schémas-blocs et interface Qt sur bus CAN.",
  resume:
    "Travaux sur la commande d'un moteur synchrone à aimants permanents : micrologiciel temps réel sur Nucleo F446 et shield IHM07M1, modélisation par schémas-blocs avec pysimCoder, et interface de pilotage Qt reliée par bus CAN.",
  categorie: "robotique",
  statut: "termine",
  annee: "2025 — 2026",
  cadre: "ENIB · commande des machines",
  couleur: "#b5542b",
  puce: "STM32F446",
  stack: ["c", "stm32", "freertos", "can", "qt", "python"],
  sections: [
    {
      titre: "Ce qu'il faut savoir",
      points: [
        "Base de commande fournie par l'enseignant : modulation vectorielle en virgule fixe",
        "pysimCoder est un outil libre tiers ; seuls les schémas pmsm*.dgm sont propres au projet",
        "Interface Qt de pilotage sur bus CAN, avec une version à bus simulé",
      ],
    },
  ],
  depots: [{ libelle: "Micrologiciel, schémas et interface", url: null, visibilite: "public" }],
};

export default fiche;
