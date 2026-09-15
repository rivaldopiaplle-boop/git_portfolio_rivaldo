import type { Projet } from "../types";

/**
 * Brouillon : laboratoires à transformer en projet (Makefile, image Docker,
 * tests curl en CI). Retirer `publie: false` une fois ce travail fait.
 */
const fiche: Projet = {
  slug: "serveur-http-sockets-cpp",
  ordre: 38,
  publie: false,
  titre: "Serveur HTTP sur sockets en C++",
  accroche: "Des datagrammes UDP au serveur HTTP qui sert pages, formulaires et WebSocket — directement sur l'API des sockets.",
  resume:
    "Laboratoires du module communication réseau et systèmes : sockets UDP et TCP en texte et en binaire, client HTTP, puis serveur HTTP servant des fichiers statiques, des formulaires GET et POST et une application.",
  categorie: "devops",
  statut: "termine",
  annee: "2025",
  cadre: "ENIB · communication réseau et systèmes",
  couleur: "#4f5fd6",
  stack: ["cpp", "linux"],
  sections: [
    {
      titre: "Progression",
      points: [
        "Serveurs et clients UDP, puis TCP mono et multi-clients",
        "Protocole binaire client/serveur",
        "Client HTTP : requête, en-têtes, lecture de la réponse",
        "Serveur HTTP : fichiers statiques, formulaires GET et POST, page WebSocket",
      ],
    },
  ],
  depots: [{ libelle: "Laboratoires", url: null, visibilite: "public" }],
};

export default fiche;
