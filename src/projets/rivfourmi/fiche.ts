import type { Projet } from "../types";
import plateau from "./plateau.webp";
import validation from "./validation.webp";
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
      src: validation,
      alt: "Le volet de la perte, et les deux exactitudes",
      legende:
        "La courbe de perte, le nombre de poids, et les deux exactitudes l'une sous l'autre : sur les points appris, et sur les points gardés de côté. L'écart entre elles dit si le réseau a appris la règle ou les points par coeur",
      format: "ecran",
    },
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
    { valeur: 95, suffixe: " %", libelle: "sur le ou exclusif sans couche cachée, grâce au seul produit x·y" },
    { valeur: 26, libelle: "points de mieux que le même réseau privé de ce trait, mesuré sur cinq essais" },
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
      titre: "Le réseau se montre, et ce qui coule dedans",
      texte:
        "Le reproche était juste : on ne voyait pas le réseau, seulement son résultat. Il est maintenant l'objet central, dessiné tel qu'il est.",
      points: [
        "L'**épaisseur** d'un trait est le poids appris, sa **couleur** le signe de ce poids",
        "Ses **tirets défilent** à la vitesse de l'activation moyenne qui passe par lui : un lien éteint est un lien par lequel rien ne passe, et avec relu c'est la mort d'un neurone qu'on voit en direct",
        "Le nombre de couches et le nombre de neurones de chacune se règlent **sur le dessin lui-même**, pas dans un formulaire à côté",
        "Tracé à la main plutôt qu'avec une bibliothèque de graphes : la disposition se calcule en deux lignes, rien n'est déplaçable, et le débit d'un lien n'existe dans aucune bibliothèque",
      ],
    },
    {
      titre: "Un point sur trois n'est jamais appris",
      texte:
        "C'est la validation du sujet, rendue manipulable, et c'est le seul chiffre honnête.",
      points: [
        "Sans elle, un réseau de quatre couches sur cent points affiche cent pour cent et le visiteur croit avoir gagné : il a seulement appris les points par coeur",
        "Les points gardés de côté portent un **anneau blanc** : on voit lesquels le réseau n'a jamais vus",
        "Le volet affiche les deux exactitudes l'une sous l'autre. L'écart entre elles est le seul chiffre qui compte",
      ],
    },
    {
      titre: "Trois fonctions d'activation, et l'initialisation qui va avec",
      points: [
        "**tanh**, centrée, la plus sûre sur un petit réseau ; **sigmoïde**, qui sature et fait disparaître le gradient ; **relu**, rapide, mais un neurone peut mourir",
        "La dérivée est écrite en fonction de l'activation déjà calculée, pas de la somme pondérée : la rétropropagation n'a rien d'autre à garder",
        "L'échelle d'initialisation suit la fonction : Xavier pour tanh, **He pour relu**, parce que la moitié des sorties est à zéro et que Xavier éteindrait le signal couche après couche",
      ],
    },
    {
      titre: "Ce qui est écrit à la main, et pourquoi",
      points: [
        "L'initialisation de Xavier : des poids tirés trop grands saturent la tangente hyperbolique dès le premier pas, et le réseau n'apprend plus rien. Défaut classique, et invisible si on ne l'a jamais vu",
        "L'entropie croisée et non l'erreur quadratique : avec une sortie sigmoïde, l'erreur quadratique rend le gradient minuscule quand le réseau se trompe avec assurance, et l'apprentissage s'arrête là où il faudrait qu'il reparte",
        "La frontière est évaluée sur une grille grossière puis étirée : l'oeil ne voit pas la différence, et le calcul est cent fois moins cher",
      ],
    },
    {
      titre: "Un trait bien choisi remplace une couche",
      texte:
        "C'est l'etape 4 du sujet, et elle vaut l'etape 5. Un bouton ajoute aux entrees le carre de chaque coordonnee et leur produit.",
      points: [
        "Sans aucune couche cachee, le reseau ne trace qu'une droite et plafonne sur le ou exclusif, mesure autour de 60 pour cent",
        "Avec le produit des deux coordonnees parmi les entrees, **toujours sans couche cachee**, il monte a 96 pour cent",
        "Ce produit est positif dans deux quadrants et negatif dans les deux autres : une droite suffit alors",
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
