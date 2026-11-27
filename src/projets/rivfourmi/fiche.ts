import type { Projet } from "../types";
import plateau from "./plateau.webp";
import sansCouche from "./sans-couche.webp";

const fiche: Projet = {
  slug: "rivfourmi",
  ordre: 27,
  titre: "RivFourmi",
  accroche:
    "Poser des points à la souris et voir la frontière se former, puis retirer la couche cachée et regarder le réseau échouer.",
  resume:
    "Le deuxième atelier de RivArche, tiré du travail pratique sur les réseaux de neurones. Le réseau est écrit à la main, deux cents lignes : propagation avant, rétropropagation, descente de gradient. Une bibliothèque cacherait exactement ce que le sujet demande de comprendre. L'entrée est la surface du résultat : on clique sur le plan et la frontière bouge au même endroit.",
  categorie: "ia-donnees",
  statut: "en-ligne",
  annee: "2026",
  cadre: "ENIB · module IAS, travail pratique sur les réseaux de neurones",
  couleur: "#16b07d",
  stack: ["typescript", "react", "vite", "tailwind", "vercel"],
  couverture: {
    src: plateau,
    alt: "Le plateau : des points posés et la frontière apprise",
    format: "ecran",
  },
  galerie: [
    {
      src: plateau,
      alt: "Avec deux couches cachées",
      legende:
        "Le ou exclusif, quatre quadrants en damier, résolu par un réseau de six puis quatre neurones. La frontière se dessine pendant l'entraînement, au même endroit que les points qu'on pose",
      format: "ecran",
    },
    {
      src: sansCouche,
      alt: "Sans couche cachée",
      legende:
        "Le même jeu de points sans aucune couche cachée : le réseau ne peut tracer qu'une droite, et il plafonne au niveau de la réponse la plus bête. C'est la limite qui a arrêté les réseaux pendant vingt ans",
      format: "ecran",
    },
  ],
  chiffres: [
    { valeur: 200, libelle: "lignes pour le réseau, sans aucune bibliothèque d'apprentissage" },
    { valeur: 0, libelle: "octet téléchargé : il n'y a pas de modèle, il s'entraîne devant vous" },
    { valeur: 4, libelle: "jeux de points, du séparable à la spirale" },
    { valeur: 10, libelle: "pas d'apprentissage par image affichée" },
  ],
  probleme:
    "Le sujet du cours demande de comprendre le neurone, la règle d'apprentissage, et surtout pourquoi un perceptron multicouche échoue sur certaines données. Lu dans un carnet, cela reste une affirmation. Il faut pouvoir le provoquer soi-même.",
  solution:
    "Un plateau où l'on pose les points et où la frontière apprise se dessine sous eux. Le nombre de couches cachées est un bouton : à zéro, le réseau ne peut tracer qu'une droite, et le ou exclusif le met à genoux. Mesuré en ligne : de l'ordre de 80 pour cent de points bien classés sans couche cachée, contre 99 avec deux.",
  sections: [
    {
      titre: "Ce qui est écrit à la main, et pourquoi",
      points: [
        "L'initialisation de Xavier : des poids tirés trop grands saturent la tangente hyperbolique dès le premier pas, et le réseau n'apprend plus rien. Défaut classique, et invisible si on ne l'a jamais vu",
        "L'entropie croisée et non l'erreur quadratique : avec une sortie sigmoïde, l'erreur quadratique rend le gradient minuscule quand le réseau se trompe avec assurance, et l'apprentissage s'arrête là où il faudrait qu'il reparte",
        "La frontière est évaluée sur une grille grossière puis étirée : l'oeil ne voit pas la différence, et le calcul est cent fois moins cher",
      ],
    },
    {
      titre: "Un chiffre seul ne veut rien dire",
      texte:
        "L'exactitude est affichée avec, juste en dessous, ce qu'obtient la réponse la plus bête : celle qui répond toujours la classe majoritaire.",
      points: [
        "Sur un jeu déséquilibré, 85 pour cent peut être un échec complet",
        "La tuile passe à l'ambre tant que le réseau ne bat pas cette référence",
      ],
    },
  ],
  lecons: [
    {
      titre: "Le plateau n'a ni colonne d'entrées ni bouton de calcul",
      texte:
        "C'est la forme la plus forte de visibilité simultanée : il n'y a pas deux zones, il y en a une. On clique sur le résultat et le résultat change. Les trois autres dispositions de la plateforme ont toutes besoin de séparer l'entrée de la sortie ; celle-ci n'en a pas besoin, et c'est ce qui la rend immédiate.",
    },
  ],
  demos: [
    {
      libelle: "Ouvrir RivFourmi",
      url: "https://rivarche.vercel.app/fourmi",
      detail: "Choisissez le ou exclusif, puis enlevez la couche cachée",
    },
  ],
  depots: [{ libelle: "RivArche", url: null, visibilite: "prive", detail: "Le dossier `src/ateliers/fourmi`" }],
};

export default fiche;
