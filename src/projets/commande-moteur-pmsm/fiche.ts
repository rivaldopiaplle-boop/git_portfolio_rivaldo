import type { Projet } from "../types";

const fiche: Projet = {
  slug: "commande-moteur-pmsm",
  ordre: 76,
  titre: "Commande d'un moteur synchrone",
  accroche: "Un moteur synchrone piloté par un STM32F446 : modulation vectorielle, schémas-blocs et interface de pilotage sur bus CAN.",
  resume:
    "Travaux sur la commande d'un moteur synchrone à aimants permanents : micrologiciel temps réel sur carte Nucleo F446 avec son étage de puissance, modélisation de la commande par schémas-blocs, et interface de bureau qui pilote le moteur par le bus CAN. La base de commande est fournie par l'enseignant ; l'étude, l'intégration sur la carte et l'interface de pilotage constituent le travail réalisé.",
  categorie: "robotique",
  statut: "termine",
  annee: "2026",
  cadre: "ENIB · commande des machines",
  equipe: "Projet d'équipe",
  role: [
    "Étude des schémas de commande du moteur synchrone et de la modulation vectorielle",
    "Modélisation de la commande par schémas-blocs sous pysimCoder",
    "Intégration sur carte Nucleo STM32F446 : mesure des courants, codeur incrémental, découpage",
    "Interface de pilotage en Qt reliée par le bus CAN, avec une version à bus simulé",
    "Essais sur l'étage de puissance triphasé",
  ],
  couleur: "#b5542b",
  puce: "STM32F446",
  stack: ["c", "stm32", "freertos", "can", "qt", "python"],
  probleme:
    "Faire tourner un moteur synchrone régulièrement demande de calculer, à chaque période de découpage, trois tensions qui composent le bon champ tournant. Le calcul doit tenir dans quelques dizaines de microsecondes, sans virgule flottante.",
  solution:
    "Un micrologiciel temps réel qui échantillonne les courants et calcule la modulation vectorielle en virgule fixe, et une interface séparée qui donne les consignes par le bus CAN : le moteur ne dépend jamais de l'interface pour tourner.",
  sections: [
    {
      titre: "Qui a écrit quoi",
      texte: "Un projet d'école honnête dit ce qui lui est fourni.",
      points: [
        "Base de commande (modulation vectorielle en virgule fixe) : fournie par l'enseignant",
        "pysimCoder, l'éditeur de schémas-blocs : outil libre tiers",
        "Travail réalisé : étude des schémas de commande, intégration sur la carte, interface de pilotage sur bus CAN",
      ],
    },
    {
      titre: "La chaîne complète",
      points: [
        "Carte Nucleo STM32F446 et étage de puissance triphasé",
        "Mesure des courants, codeur incrémental, découpage par timer",
        "Interface de bureau en Qt, reliée par le bus CAN, avec une version à bus simulé pour travailler sans matériel",
      ],
    },
  ],
  extraits: [
    {
      fichier: "PMSM_PYSIM/ihm_clean/mainwindow.cpp",
      langage: "cpp",
      commentaire: "L'interface s'ouvre sur le bus CAN comme sur un fichier. Le bus simulé permet de développer les écrans sans le banc moteur.",
      code: `if (socket_can.open("can0") == SocketCanMock::STATUS_OK) {
    // bus ouvert : les consignes partent vers la carte
} else {
    // bus absent : on reste en mode simulé, l'interface fonctionne quand même
}

SocketCanMock::CanFrame frame;   // consigne de vitesse ou de couple`,
    },
  ],
  depots: [{ libelle: "Micrologiciel, schémas et interface", url: "https://github.com/rivaldopiaplle-boop/git_commande-moteur", visibilite: "prive" }],
};

export default fiche;
