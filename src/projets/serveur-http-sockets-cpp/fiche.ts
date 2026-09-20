import type { Projet } from "../types";

const fiche: Projet = {
  slug: "serveur-http-sockets-cpp",
  ordre: 38,
  titre: "Serveur HTTP écrit sur les sockets",
  accroche: "Des datagrammes UDP au serveur HTTP multi-clients qui sert pages, formulaires et WebSocket, sans aucune bibliothèque web. Mis en image Docker et vérifié par 15 tests en HTTP et une charge k6.",
  resume:
    "Progression en C++ sur l'API des sockets : échanges UDP puis TCP, en texte et en binaire, client HTTP, puis un serveur HTTP qui lit lui-même les en-têtes, sert des fichiers, traite des formulaires GET et POST et ouvre une connexion WebSocket. C'est ce qui rend lisible tout le reste : derrière une requête d'API, il y a une socket et un protocole texte. À la reprise : une image Docker, des tests en curl, une mesure de charge, et une faille de chemin trouvée puis corrigée.",
  categorie: "devops",
  statut: "termine",
  annee: "2025",
  cadre: "ENIB · communication réseau et systèmes",
  couleur: "#4f5fd6",
  stack: ["cpp", "linux", "docker", "k6"],
  chiffres: [
    { valeur: 6, libelle: "paliers, de l'UDP au WebSocket" },
    { valeur: 15, libelle: "vérifications en HTTP, WebSocket compris" },
    { valeur: 20, libelle: "clients simultanés sous k6, p95 sous 100 ms" },
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
    {
      titre: "La reprise : le rendre vérifiable",
      texte: "Un serveur qui ne tourne que sur le poste de son auteur ne prouve rien.",
      points: [
        "Image Docker en deux étapes : compilation par GCC 14, puis une image sans compilateur, lancée par un utilisateur sans privilège",
        "15 vérifications en curl : types des fichiers, listing, 404, POST texte et binaire, poignée de main WebSocket contrôlée avec l'exemple de la RFC 6455, connexion persistante, 20 clients simultanés",
        "Charge k6 : 20 utilisateurs virtuels, et des seuils sur le taux d'échec et le 95e centile",
        "make : construire, lancer, tester et mettre sous charge en une commande",
      ],
    },
    {
      titre: "Une faille trouvée en écrivant les tests",
      texte: "Le chemin du fichier se construisait par « TopDir » suivi de l'adresse demandée.",
      points: [
        "GET /../../etc/passwd renvoyait le fichier des comptes du système, et /../serveur le binaire lui-même",
        "Toute requête qui remonte l'arborescence est désormais refusée en 400, et deux tests le vérifient",
        "Le correctif est marqué dans le code comme ajout de la reprise, distinct des exercices",
      ],
    },
    {
      titre: "Ce qui vient du cours, ce qui est personnel",
      points: [
        "Fournis par le cours : la bibliothèque utilitaire (sockets, lecture de lignes, WebSocket bas niveau) et le squelette de chaque programme",
        "Personnel : 18 blocs sur 20 du serveur HTTP, du serveur TCP multi-clients au WebSocket complet",
        "Non traité : l'exécution de programmes CGI (2 blocs)",
      ],
    },
  ],
  extraits: [
    {
      fichier: "05-serveur-http/prog_http_server.cpp",
      langage: "cpp",
      commentaire: "Le cœur d'un serveur : on écoute, on accepte, et chaque client part dans son propre fil d'exécution : sinon le deuxième visiteur attend le départ du premier.",
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
      commentaire: "Une réponse HTTP n'est que du texte, et le corps ne se devine pas : il faut lire exactement les octets annoncés, puis annoncer la longueur de sa propre réponse.",
      code: `if((requestMethod=="POST")&&(requestUri=="/txt"))
{
  auto txt = crs::recvAll(dialogSocket, length); // Content-Length octets
  auto content = crs::txt("server received <%> bytes
", crs::len(txt));
  auto header = crs::txt(
    "HTTP/1.1 200 OK
"
    "Connection: %
"
    "Content-Type: text/plain
"
    "Content-Length: %
"
    "
",
    connection, crs::len(content));
  crs::sendAll(dialogSocket, header);
  crs::sendAll(dialogSocket, content);
}`,
    },
    {
      fichier: "tests/routes.sh",
      langage: "bash",
      commentaire: "La clé et la réponse d'exemple de la RFC 6455 : si le serveur calcule mal Sec-WebSocket-Accept, aucun navigateur n'ouvrira la connexion.",
      code: `entetes=$(curl -s -m 3 -D - -o /dev/null   -H 'Connection: Upgrade' -H 'Upgrade: websocket' -H 'Sec-WebSocket-Version: 13'   -H 'Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==' "$BASE/" | tr -d '
')
verifier "la poignée de main répond 101"   "$(echo "$entetes" | head -1 | cut -d' ' -f2)" "101"
verifier "Sec-WebSocket-Accept est conforme à la RFC 6455"   "$(echo "$entetes" | grep -i '^Sec-WebSocket-Accept:' | cut -d' ' -f2)" "s3pPLMBiTxaQ9kYGzzhZRbK+xOo="`,
    },
  ],
  depots: [{ libelle: "Les six paliers", url: "https://github.com/rivaldopiaplle-boop/git_serveur-http-sockets", visibilite: "prive", detail: "Dépôt privé : il mêle du code fourni par le cours. Les extraits de la fiche montrent le travail personnel" }],
};

export default fiche;
