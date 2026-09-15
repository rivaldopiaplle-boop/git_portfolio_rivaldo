import type { Projet } from "../types";

const fiche: Projet = {
  slug: "serveur-http-sockets-cpp",
  ordre: 38,
  titre: "Serveur HTTP écrit sur les sockets",
  accroche: "Des datagrammes UDP au serveur HTTP multi-clients qui sert pages, formulaires et WebSocket — sans aucune bibliothèque web.",
  resume:
    "Progression en C++ sur l'API des sockets : échanges UDP puis TCP, en texte et en binaire, client HTTP, puis un serveur HTTP qui lit lui-même les en-têtes, sert des fichiers, traite des formulaires GET et POST et ouvre une connexion WebSocket. C'est ce qui rend lisible tout le reste : derrière une requête d'API, il y a une socket et un protocole texte.",
  categorie: "devops",
  statut: "termine",
  annee: "2025",
  cadre: "ENIB · communication réseau et systèmes",
  couleur: "#4f5fd6",
  stack: ["cpp", "linux"],
  chiffres: [
    { valeur: 6, libelle: "paliers, de l'UDP au WebSocket" },
    { valeur: 4, libelle: "méthodes HTTP traitées à la main" },
  ],
  probleme:
    "On utilise HTTP tous les jours sans jamais le lire. Tant qu'on n'a pas écrit le serveur qui découpe les en-têtes et compte les octets annoncés par « Content-Length », un blocage réseau reste un mystère.",
  solution:
    "Construire le protocole couche par couche, du datagramme perdu au serveur qui tient plusieurs clients simultanément, chacun dans son fil d'exécution.",
  sections: [
    {
      titre: "Les six paliers",
      points: [
        "UDP : adresse, serveur et client, en texte puis en binaire",
        "TCP : serveur mono-client, puis multi-clients, et son client",
        "Protocole binaire : entraînement avec solution de référence",
        "Client HTTP : requête, en-têtes, lecture de la réponse",
        "Serveur HTTP : fichiers statiques, formulaires GET et POST, WebSocket",
        "Application servie par ce serveur, avec son client dans le navigateur",
      ],
    },
  ],
  extraits: [
    {
      fichier: "05-serveur-http/prog_http_server.cpp",
      langage: "cpp",
      commentaire: "Le cœur d'un serveur : on écoute, on accepte, et chaque client part dans son propre fil d'exécution — sinon le deuxième visiteur attend le départ du premier.",
      code: `SOCKET listen_socket = crs::socket(PF_INET, SOCK_STREAM, 0); // TCP
crs::bind(listen_socket, portNumber);
crs::listen(listen_socket);                                  // mode écoute

for(;;) {
  auto [dialogSocket, fromIpAddr, fromPort] = crs::acceptfrom(listen_socket);

  std::thread th{dialogThread, dialogSocket};
  th.detach();   // le fil vit sa vie : le serveur retourne écouter
}

crs::close(listen_socket);`,
    },
    {
      fichier: "05-serveur-http/prog_http_server.cpp",
      langage: "cpp",
      commentaire: "Une réponse HTTP n'est que du texte, et le corps ne se devine pas : il faut annoncer sa longueur exacte, sinon le navigateur attend indéfiniment.",
      code: `crs::extract(l, "Content-Length:", contentLength);

if((requestMethod == "POST") && (requestUri == "/txt")) {
  // lire exactement contentLength octets après l'en-tête, puis répondre
  crs::sendString(dialogSocket, crs::txtFormat(
    "HTTP/1.1 200 OK\\r\\n"
    "Content-Type: text/plain; charset=utf-8\\r\\n"
    "Content-Length: %\\r\\n"
    "\\r\\n", reponse.size()));
}`,
    },
  ],
  depots: [{ libelle: "Les six paliers", url: null, visibilite: "public" }],
};

export default fiche;
