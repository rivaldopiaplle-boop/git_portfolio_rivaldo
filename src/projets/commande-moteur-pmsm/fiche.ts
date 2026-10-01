import type { Projet } from "../types";
import frein from "./frein.webp";
import regulation from "./regulation.webp";

const fiche: Projet = {
  slug: "commande-moteur-pmsm",
  ordre: 76,
  titre: "Commande d'un moteur synchrone",
  accroche: "Un moteur synchrone piloté par un STM32F446 : modulation vectorielle, schémas-blocs et interface de pilotage sur bus CAN.",
  resume:
    "Travaux sur la commande d'un moteur synchrone à aimants permanents : micrologiciel temps réel sur carte Nucleo F446 avec son étage de puissance, modélisation de la commande par schémas-blocs, et interface de bureau qui pilote le moteur par le bus CAN. La base de commande est fournie par l'enseignant ; l'étude, l'intégration sur la carte et l'interface de pilotage constituent le travail réalisé.",
  categorie: "robotique",
  // En ligne : la commande embarquée du projet tourne dans un navigateur.
  statut: "en-ligne",
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
      titre: "Le code embarqué, exécuté dans un navigateur",
      texte:
        "Le banc a été rendu à l'école. L'atelier ne rejoue pas le projet : il l'exécute.",
      points: [
        "Le schéma-blocs produit le code embarqué par pysimCoder, et ce code est compilé en WebAssembly par Emscripten",
        "La compilation pose le drapeau __STM32__ : c'est la branche de la carte qui s'exécute, celle qui lit Ia_pysim et écrit duty1_pysim",
        "Seuls le sinus et le cosinus en virgule fixe de CMSIS-DSP sont remplacés, à moins d'un bit près : ils ne se compilent pas hors d'un coeur ARM",
        "Le moteur, l'onduleur et la charge sont calculés à côté, avec des constantes plausibles et affichées, la machine ayant été rendue",
        "Le calage du codeur a été retrouvé en balayant trois cent soixante degrés : la commande ne tient sa consigne qu'entre cent quatre-vingts et deux cent cinquante-cinq",
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
  demos: [
    {
      libelle: "L'atelier, à manipuler dans le navigateur",
      url: "https://atelier-moteur-pmsm.vercel.app",
      detail:
        "La commande embarquée du projet, compilée en WebAssembly, pilote un moteur simulé. On tire le frein contre le disque et le courant de couple monte pendant que la vitesse ne bouge pas, on accroche des masses, on tourne la consigne, on coupe une phase, et l'on peut dérégler le calage du codeur pour voir la commande produire du flux au lieu du couple",
    },
  ],
  couverture: {
    src: regulation,
    alt: "L'atelier : la commande tient mille deux cents tours par minute, et le schéma du projet est dessiné à droite",
  },
  galerie: [
    {
      src: regulation,
      alt: "La commande du projet régule la vitesse, et le schéma-blocs est dessiné depuis son propre fichier",
      legende:
        "À gauche, les trois correcteurs du schéma : leurs gains ne sont pas recopiés, ils sont lus et écrits dans la commande compilée, là où elle les range. Au centre, le banc qu'on manipule. À droite, le schéma-blocs du projet, dessiné depuis le fichier pmsm_target.dgm lui-même, ses trente-six blocs et ses quarante-huit liaisons.",
      format: "ecran",
    },
    {
      src: frein,
      alt: "Le frein posé contre le disque : le courant de couple monte, la vitesse ne bouge pas",
      legende:
        "Le geste qui prouve la régulation. On tire le frein contre le disque, le couple résistant passe à trente-huit millinewtons mètre, le courant de couple monte de zéro virgule zéro cinq à zéro virgule huit cinq ampère, et la vitesse reste à mille deux cents tours par minute. C'est la commande du projet qui tient, pas une aiguille qu'on aurait poussée.",
      format: "ecran",
    },
  ],
  depots: [{ libelle: "Micrologiciel, schémas et interface", url: "https://github.com/rivaldopiaplle-boop/git_commande-moteur", visibilite: "prive", detail: "Dépôt privé : il mêle du code fourni par le cours. Les extraits de la fiche montrent le travail personnel" }],
};

export default fiche;
