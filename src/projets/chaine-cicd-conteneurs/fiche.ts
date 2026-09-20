import type { Projet } from "../types";
import interfaceApp from "./interface.webp";

const DEPOT = "https://github.com/rivaldopiaplle-boop/git-demo-cicd-rivaldo";
const CHAINE = `${DEPOT}/actions/workflows/ci.yml`;

const fiche: Projet = {
  slug: "chaine-cicd-conteneurs",
  ordre: 30,
  titre: "Chaîne CI/CD multi-conteneurs",
  accroche: "Cinq étages, du git push à la production : 22 tests, pile montée en conteneurs, charge k6 avec seuils, parcours rejoué dans Chrome, puis mise en ligne de l'image vérifiée.",
  resume:
    "Une chaîne GitHub Actions en cinq étages, et l'application qu'elle vérifie : un suivi de tâches complet, front statique servi par nginx, API .NET 10 et base MySQL. On y crée, coche, filtre et supprime, et les compteurs sont calculés par la base. Chaque étage de la chaîne ne part que si le précédent est vert, l'intégration monte la pile entière par docker compose, et les images ne sont publiées que depuis main, étiquetées par le hash du commit. La pile se lance en une commande sur n'importe quel poste (node demarrer.mjs), et tourne en ligne sur Render, avec une base MySQL chez Aiven.",
  categorie: "devops",
  statut: "en-ligne",
  annee: "2026",
  cadre: "Formation déploiement",
  couleur: "#6d5bd0",
  couverture: { src: interfaceApp, alt: "Interface de l'application de démonstration : suivi de tâches", format: "ecran" },
  galerie: [
    {
      src: interfaceApp,
      alt: "Interface de l'application de démonstration",
      legende: "L'application vérifiée par la chaîne : la page annonce l'état de l'API et de la base",
      format: "ecran",
    },
  ],
  stack: ["githubactions", "docker", "dotnet", "mysql", "nginx", "k6", "puppeteer", "node", "render", "aiven"],
  chiffres: [
    { valeur: 5, libelle: "étages, du git push à la production" },
    { valeur: 22, libelle: "tests : 16 contre une vraie base, 6 sur les règles du front" },
    { valeur: 10, libelle: "utilisateurs simultanés sous k6" },
    { valeur: 1, libelle: "commande pour monter la pile entière" },
  ],
  probleme:
    "Une chaîne d'intégration peut passer au vert sans rien vérifier : un test qui affiche « rien à lancer » a la même couleur qu'un test qui protège. Le squelette de départ était dans ce cas, et tout le travail a consisté à donner à chaque étage quelque chose de réel à vérifier.",
  solution:
    "Donner à chaque étage un travail réel : des règles testées côté front, des tests d'API contre une vraie base MySQL, la pile entière montée en conteneurs puis mise sous charge avec des seuils, et le parcours d'un visiteur rejoué dans un vrai Chrome.",
  sections: [
    {
      titre: "Cinq étages, chacun conditionné au précédent",
      points: [
        "Front : les règles d'affichage sous node --test",
        "Back : tests des règles, puis tests d'API contre un service MySQL doté d'une sonde de santé",
        "Intégration : pile montée par docker compose, schéma appliqué, charge k6 avec seuils, parcours Chrome",
        "Images front et back construites en matrice, poussées sur GHCR uniquement depuis main",
        "Mise en ligne : Render tire l'image exacte du commit par ses crochets de déploiement",
        "Mot de passe de la base injecté par les secrets GitHub, jamais écrit dans le dépôt",
      ],
    },
    {
      titre: "L'application, assez complète pour être vérifiable",
      texte: "Une liste où tout reste à faire ne prouve rien : il faut des écritures, des lectures filtrées et des suppressions.",
      points: [
        "Créer, cocher, décocher, supprimer une tâche",
        "Filtrer entre « toutes », « à faire » et « faites », depuis l'adresse de l'API",
        "Compteurs calculés par la base, pas par la page : trois nombres ne demandent pas de tout télécharger",
        "PATCH ne change que ce qui est envoyé : cocher une tâche n'oblige pas à renvoyer son titre",
        "Un filtre inconnu montre tout, plutôt que de répondre par une erreur",
      ],
    },
    {
      titre: "Ce que la chaîne refuse de laisser passer",
      texte: "Les seuils font échouer la chaîne d'eux-mêmes : sans seuil, un test de charge affiche des chiffres que personne ne lit.",
      points: [
        "Moins de 1 % de requêtes en échec, et 95 % des réponses sous 500 ms",
        "Un titre vide refusé par le serveur, formulaire contourné : le test l'appelle directement en HTTP",
        "Le parcours complet d'un visiteur dans Chrome : créer, cocher, voir la tâche quitter le filtre « À faire », la supprimer",
        "Une sonde de santé qui interroge vraiment la base, par un SELECT 1",
        "Jamais d'étiquette latest : le hash du commit nomme exactement l'image qui tourne",
      ],
    },
    {
      titre: "Une seule source pour la structure des données",
      texte: "Le schéma vit dans un seul fichier, appliqué par la migration de la pile comme par les tests d'API.",
      points: [
        "mysql/schema.sql : la table des tâches",
        "La migration attend MySQL par une sonde TCP, car pendant son initialisation MySQL démarre un serveur temporaire sans réseau qu'une sonde par socket croirait prêt",
      ],
    },
  ],
  lecons: [
    {
      titre: "Un test vide est pire qu'aucun test",
      texte: "Il donne la couleur verte de la confiance sans le travail de la vérification. Les scripts du squelette de départ affichaient « placeholder: nothing to run » : la chaîne était verte, et ne protégeait rien.",
    },
    {
      titre: "Un seuil transforme une mesure en garde-fou",
      texte: "k6 affichait des chiffres ; avec des seuils sur le taux d'échec et le p95, il fait échouer la chaîne quand l'API ralentit.",
    },
    {
      titre: "Attendre une base, ce n'est pas attendre son port",
      texte: "MySQL répond sur son socket local bien avant d'accepter le réseau. La sonde interroge donc 127.0.0.1, sans quoi la migration part trop tôt.",
    },
    {
      titre: "Une règle de style trop large déforme un composant",
      texte: "La règle des champs de saisie s'appliquait aussi aux cases à cocher, étirées sur 220 pixels. Le parcours navigateur l'a rendue visible avant un visiteur.",
    },
  ],
  pipeline: [
    { genre: "declencheur", titre: "git push", taches: [{ nom: "main ou pull request", controles: ["Front et back en parallèle"] }] },
    {
      genre: "verification",
      titre: "Tests",
      taches: [
        { nom: "Front", controles: ["Node 20", "node --test"] },
        { nom: "Back", controles: [".NET 10", "MySQL en service", "Règles et API"] },
      ],
    },
    {
      genre: "verification",
      titre: "Intégration",
      taches: [{ nom: "Pile complète", controles: ["docker compose up --wait", "Schéma appliqué", "k6 : création, coche, filtre, compteurs, suppression", "Chrome : le parcours entier d'un visiteur"] }],
    },
    { genre: "publication", titre: "Images", taches: [{ nom: "Matrice", controles: ["frontend + backend", "GHCR, depuis main", "Étiquette = hash du commit"] }] },
    { genre: "hebergement", titre: "En ligne", taches: [{ nom: "Render et Aiven", controles: ["Image du commit redéployée", "MySQL géré, en TLS", "Schéma appliqué au démarrage"] }] },
  ],
  extraits: [
    {
      fichier: "k6/charge.js",
      langage: "javascript",
      commentaire: "Les seuils sont la partie utile : ils font échouer la chaîne sans qu'un humain ait à lire les chiffres.",
      code: `export const options = {
  vus: 10,
  duration: "20s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    "http_req_duration{expected_response:true}": ["p(95)<500"],
    checks: ["rate>0.99"],
  },
};`,
    },
    {
      fichier: "k6/navigateur.mjs",
      langage: "javascript",
      commentaire: "Le seul test qui prouve que le front, le proxy nginx, l'API et la base fonctionnent ensemble. Il vérifie aussi que le serveur refuse ce que le formulaire refuse.",
      code: `await page.type("#titre", titre);
await page.click("button[type=submit]");
await page.waitForFunction(
  (attendu) => [...document.querySelectorAll("#liste li")].some((li) => li.textContent.includes(attendu)),
  { timeout: 15000 },
  titre,
);

const refus = await page.evaluate(async () => {
  const reponse = await fetch("/api/taches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titre: "   " }),
  });
  return reponse.status;
});
if (refus !== 400) throw new Error(\`Le serveur a répondu \${refus} au lieu de 400.\`);`,
    },
    {
      fichier: ".github/workflows/ci.yml",
      langage: "yaml",
      commentaire: "Les images ne partent que si l'intégration est verte, ne sont poussées que depuis main, et portent le hash du commit. Ce sont elles que Render exécute en production.",
      code: `build-image:
  needs: [integration-test]
  strategy:
    matrix:
      composant: ["frontend", "backend"]
  steps:
    - uses: docker/build-push-action@v6
      with:
        context: \${{ matrix.composant == 'backend' && '.' || './frontend' }}
        file: ./\${{ matrix.composant }}/Dockerfile
        push: \${{ github.event_name == 'push' && github.ref_name == 'main' }}
        tags: |
          ghcr.io/\${{ github.repository_owner }}/spm-\${{ matrix.composant }}:\${{ github.sha }}
          ghcr.io/\${{ github.repository_owner }}/spm-\${{ matrix.composant }}:main`,
    },
  ],
  film: {
    src: "/videos/chaine-cicd.mp4",
    affiche: "/videos/chaine-cicd.webp",
    duree: "2 min 20, commenté à la voix",
    legende:
      "L'application, puis la chaîne qui la met en ligne : la sonde de santé en JSON, la liste des exécutions, et une exécution ouverte où l'on voit les six étages s'enchaîner jusqu'au déploiement de l'image du commit vérifié.",
    chapitres: [
      { instant: 0, titre: "Une chaîne de mise en ligne, de bout en bout" },
      { instant: 6, titre: "L'application est simple, exprès" },
      { instant: 14, titre: "L'interface dit si le serveur répond" },
      { instant: 22, titre: "Une vraie API .NET, une vraie base MySQL" },
      { instant: 31, titre: "Comptée, filtrée, sans recharger la page" },
      { instant: 37, titre: "La sonde de santé, en JSON" },
      { instant: 45, titre: "Surveillée chaque jour" },
      { instant: 56, titre: "Une exécution par poussée de code" },
      { instant: 65, titre: "Six étages, dans un ordre qui compte" },
      { instant: 72, titre: "D'abord les essais, séparément" },
      { instant: 79, titre: "Puis la pile entière, montée et parcourue" },
      { instant: 88, titre: "Une image par commit, publiée" },
      { instant: 96, titre: "Déployer l'image exacte du commit vérifié" },
      { instant: 106, titre: "Pourquoi ce détail compte" },
      { instant: 119, titre: "Le dépôt, ouvert et documenté" },
      { instant: 127, titre: "cicd-taches-web.onrender.com" },
    ],
  },
  demos: [
    {
      libelle: "L'application en ligne",
      url: "https://cicd-taches-web.onrender.com",
      detail: "Les images publiées par la chaîne, exécutées par Render, avec une base MySQL chez Aiven. Premier chargement lent : le service gratuit se réveille",
      support: "web",
    },
  ],
  preuves: [
    {
      libelle: "Les exécutions de la chaîne",
      url: `${CHAINE}?query=branch%3Amain`,
      detail: "Chaque étage, ses journaux et sa durée, sur GitHub Actions",
      badge: `${CHAINE}/badge.svg?branch=main`,
    },
    {
      libelle: "La sonde de santé en production",
      url: "https://cicd-taches-api.onrender.com/api/sante",
      detail: "Elle interroge vraiment la base MySQL à chaque appel",
    },
  ],
  depots: [{ libelle: "Dépôt de la chaîne", url: DEPOT, visibilite: "public" }],
};

export default fiche;
