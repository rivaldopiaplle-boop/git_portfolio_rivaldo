import type { Projet } from "../types";
import ingestion from "./ingestion.webp";
import metriques from "./metriques.webp";
import tableau from "./tableau.webp";

const fiche: Projet = {
  slug: "rivvigie",
  ordre: 23,
  titre: "RivVigie",
  accroche:
    "Surveiller la chaîne du froid d'un magasin, et prévenir avant la perte : une mesure toutes les cinq minutes au lieu de deux relevés par jour.",
  resume:
    "Dans un magasin alimentaire, les températures se relèvent à la main une ou deux fois par jour, sur une feuille. Entre deux relevés, personne ne voit rien : une panne à 21 h se découvre à 8 h, et la marchandise est perdue. Un seul épisode a coûté 21 000 euros au prix d'achat dans un Intermarché de Gradignan. RivVigie reçoit les mesures en continu, applique les seuils réglementaires, ouvre l'alerte, et tient le registre qu'un contrôle sanitaire demandera. Le projet sert aussi de support à une chaîne DevOps complète, construite étape par étape.",
  categorie: "devops",
  statut: "en-cours",
  annee: "2026",
  cadre: "Projet personnel · support de la chaîne DevOps",
  couleur: "#0f766e",
  stack: [
    "python",
    "fastapi",
    "django",
    "postgresql",
    "redis",
    "docker",
    "linux",
    "prometheus",
  ],
  couverture: {
    src: tableau,
    alt: "Le tableau de bord de RivVigie : le parc, les alertes et leurs seuils",
    format: "ecran",
  },
  galerie: [
    {
      src: tableau,
      alt: "Le parc et ses alertes",
      legende:
        "Six équipements de trois magasins, et l'alerte ouverte sur celui qui dérive : 6,84 degrés contre un maximum de 6. Une alerte acquittée veut dire « vu », pas « réglé » : elle ne se ferme que quand la température redescend",
      format: "ecran",
    },
    {
      src: ingestion,
      alt: "La documentation de l'ingestion",
      legende:
        "Le service d'entrée se décrit lui-même. Il est sans état et idempotent : un capteur qui perd le réseau puis réémet ne crée pas deux fois la même mesure",
      format: "ecran",
    },
    {
      src: metriques,
      alt: "Les mesures du service, au format Prometheus",
      legende:
        "Les compteurs que Prometheus viendra lire. Distinguer un équipement en panne d'un agent en panne est ce qui compte : confondre les deux fait perdre la marchandise",
      format: "ecran",
    },
  ],
  chiffres: [
    { valeur: 3, libelle: "services séparés : ingestion, règles d'alerte, API du parc" },
    { valeur: 5, libelle: "conteneurs levés par une seule commande" },
    { valeur: 24, libelle: "doublons refusés sur 24 envoyés, en rejouant les mêmes mesures" },
    { valeur: 9, libelle: "contrôles joués dans un vrai navigateur" },
  ],
  probleme:
    "Le règlement européen 852/2004 impose une surveillance des températures, et l'arrêté du 21 décembre 2009 fixe les seuils. Dans les faits, cette surveillance tient à un stylo : un ou deux relevés manuels par jour, notés sur une feuille qui se remplit après coup et ne prouve rien en cas de litige. Entre deux relevés, il y a jusqu'à douze heures d'aveuglement, et c'est là que la marchandise se perd.",
  solution:
    "Trois services qui se parlent, et chacun a une raison d'exister seul. L'ingestion reçoit les mesures, les valide et les met en file : sans état, c'est elle qu'on multiplie quand le débit monte. Le travailleur d'alertes lit la file, enregistre et applique les seuils. L'API porte le parc, l'historique et le registre. L'idempotence tient à deux étages, parce que le réseau d'une chambre froide tombe et qu'un agent réémet.",
  sections: [
    {
      titre: "Ce qui est fait, et ce qui ne l'est pas",
      texte:
        "Le projet avance par étapes, et chacune a sa preuve. Rien de ce qui n'est pas fait n'est annoncé comme fait, ici ou ailleurs.",
      points: [
        "**Fait** : les trois services en conteneurs, l'idempotence à deux étages, les seuils, l'ouverture et la fermeture d'alerte, un tableau de bord, un simulateur de parc, et les mesures exposées au format Prometheus",
        "**Fait** : une commande monte tout sur une machine vierge, le simulateur envoie des mesures, un équipement dérive, une alerte s'ouvre, et le bouton l'acquitte",
        "**À venir** : l'interface React, Jenkins, les manifestes Kubernetes, Prometheus et Grafana pour de vrai, Terraform et Ansible, Argo CD, et la portabilité sur un second cloud",
      ],
    },
    {
      titre: "Un chiffre faux qui avait l'air juste",
      texte:
        "La première capture de ce tableau affichait 88 alertes sur un équipement qui en avait une. Le nombre était exactement celui de ses mesures.",
      points: [
        "Deux annotations qui joignent deux tables différentes multiplient leurs lignes l'une par l'autre : le compte des alertes était multiplié par le nombre de mesures",
        "Le défaut ne se voit pas en lisant le code, il se voit en regardant l'écran. C'est pour cela qu'une capture se relit avant d'être publiée",
      ],
    },
  ],
  feuilleDeRoute: [
    { titre: "Les trois écrans métier", detail: "React : le technicien, le responsable qualité et son registre exportable, le responsable du parc.", etat: "en-cours" },
    { titre: "Jenkins construit, scanne et signe", detail: "Un magasin refuse une image non signée : c'est la réponse au piratage des systèmes de dégivrage de novembre 2026.", etat: "prevu" },
    { titre: "Un magasin est un petit cluster", detail: "Kubernetes, parce que trente magasins sont trente fois le même déploiement.", etat: "prevu" },
    { titre: "Prometheus, Grafana, et trois alertes qui sonnent", detail: "Distinguer un équipement en panne d'un agent muet.", etat: "prevu" },
    { titre: "Terraform, Ansible, le siège décrit", detail: "Détruire la machine et la refaire depuis rien.", etat: "prevu" },
    { titre: "Argo CD : les magasins tirent leur version", detail: "Pousser vers trente sites suppose de les atteindre ; tirer ne le suppose pas.", etat: "prevu" },
  ],
  lecons: [
    {
      titre: "L'idempotence n'était pas une précaution",
      texte:
        "Je l'avais posée par principe, en justifiant par un capteur qui réémet. Le vrai problème l'exige : le réseau est mauvais dans les chambres froides, un agent déconnecté garde ses mesures et les renvoie en bloc. Une précaution de confort est devenue une contrainte du métier, et le code n'a pas bougé.",
    },
    {
      titre: "Un outil sans contrainte qui l'appelle est une décoration",
      texte:
        "La première version de ce projet imposait onze outils d'avance. Un projet qui coche une liste n'impressionne pas un ingénieur d'exploitation, il l'inquiète. Ici chaque outil arrive avec la contrainte qui l'appelle, et ce sont les trente magasins et le mauvais réseau qui décident.",
    },
  ],
  depots: [],
};

export default fiche;
