import type { Projet } from "../types";
import chemin from "./chemin.webp";
import impossible from "./impossible.webp";
import mesure from "./mesure.webp";

const fiche: Projet = {
  slug: "niveaux-procedures",
  ordre: 29,
  titre: "Les niveaux",
  accroche:
    "Engendrer un niveau de jeu de plateforme, prouver qu'il se termine, et y jouer tout de suite.",
  resume:
    "Le quatrième atelier de RivArche, tiré du travail pratique de génération procédurale. Les deux voies du sujet sont là, côte à côte : une approche constructive qui pose ses éléments selon des règles, et un effondrement de fonction d'onde dont les contraintes d'adjacence viennent de la physique du saut. Mais le vrai sujet est ailleurs : un niveau engendré n'est pas forcément finissable, et c'est ce qu'il faut prouver.",
  categorie: "ia-donnees",
  statut: "en-ligne",
  annee: "2026",
  cadre: "ENIB · module IAS, travail pratique de génération procédurale",
  couleur: "#2fa3d4",
  stack: ["typescript", "react", "vite", "tailwind", "vercel"],
  couverture: {
    src: mesure,
    alt: "Un niveau engendré, son chemin de solveur et la comparaison des deux méthodes",
    format: "ecran",
  },
  galerie: [
    {
      src: mesure,
      alt: "Les deux méthodes mesurées",
      legende:
        "Cent tirages par méthode, sans garantie, et on compte ceux qui se terminent : 100 pour cent pour l'approche constructive, 98 pour celle par contraintes. La première borne ses trous par la hauteur du saut, la seconde varie davantage et échoue plus souvent",
      format: "ecran",
    },
    {
      src: chemin,
      alt: "Le chemin trouvé par le solveur",
      legende:
        "Le solveur explore les états atteignables avec exactement la physique du jeu, et trace le chemin qu'il a trouvé. Ici 729 états explorés. Un solveur plus généreux que le jeu garantirait des niveaux où le joueur reste bloqué",
      format: "ecran",
    },
    {
      src: impossible,
      alt: "Un niveau impossible, garantie coupée",
      legende:
        "La garantie se coupe : le premier tirage est rendu tel quel. À difficulté maximale, un niveau infranchissable finit par sortir, et l'atelier le dit avec le nombre d'états explorés en vain",
      format: "ecran",
    },
  ],
  chiffres: [
    { valeur: 100, suffixe: " %", libelle: "de niveaux jouables, approche constructive, sur 100 tirages" },
    { valeur: 98, suffixe: " %", libelle: "par contraintes : plus varié, et plus souvent faux" },
    { valeur: 94, suffixe: " %", libelle: "à difficulté maximale et en 96 de large : six tirages sur cent sont infranchissables" },
    { valeur: 5, libelle: "nombres suffisent à décrire la physique, partagée par le jeu et le solveur" },
    { valeur: 0, libelle: "image téléchargée : le décor est dessiné au trait" },
  ],
  probleme:
    "Engendrer un niveau de plateforme est facile : on pose du sol, des trous et des piques. Le problème commence après. Un niveau engendré au hasard peut être infranchissable, et rien ne le dit tant que personne n'a essayé d'y jouer. Vérifier à la main ne passe pas à l'échelle.",
  solution:
    "Un solveur qui explore les états atteignables par parcours en largeur, avec **exactement le même pas de simulation que le jeu**. La génération tire, le solveur vérifie, et on recommence tant que le niveau ne se termine pas. Le nombre de tirages nécessaires devient la mesure qui compare les deux méthodes.",
  sections: [
    {
      titre: "Une seule mesure se truque",
      texte:
        "Au seul critère de jouabilité, le meilleur générateur est celui qui pose du sol plat : cent pour cent jouable, et parfaitement ennuyeux. Il fallait donc un second axe.",
      points: [
        "La **variété** est l'entropie des profils de colonnes, rapportée à l'entropie maximale : un niveau d'un seul profil vaut zéro, un niveau qui les utilise tous également vaut un",
        "Mesuré sur cent tirages : l'approche par règles donne **100 pour cent de jouables pour une variété de 0,44**, celle par contraintes **98 pour cent pour 0,59**",
        "Le banc d'essais les place sur deux axes, et le choix d'un réglage se défend alors au lieu de se décréter",
      ],
    },
    {
      titre: "Pourquoi le solveur et le jeu partagent leur physique",
      texte:
        "C'est la décision qui structure tout le reste, et elle n'est pas évidente au premier abord.",
      points: [
        "Un solveur plus **généreux** que le jeu valide des niveaux où le joueur reste bloqué : la garantie devient un mensonge",
        "Un solveur plus **strict** rejette des niveaux jouables : on jette du bon travail et la génération paraît mauvaise",
        "La seule sortie est de n'écrire la physique qu'une fois : cinq nombres, une fonction `avancer`, et les deux s'en servent",
      ],
    },
    {
      titre: "Les deux voies du sujet",
      points: [
        "**Constructive** : on avance colonne par colonne en tenant une hauteur de sol, et on ne s'autorise un trou ou une marche que dans les limites du saut. Presque toujours jouable, mais elle se répète",
        "**Par contraintes** : un effondrement de fonction d'onde en une dimension. Chaque colonne prend un profil parmi un jeu, et deux voisines doivent être compatibles. On effondre toujours la colonne la moins libre, ce qui évite de se peindre dans un coin",
        "Les règles d'adjacence ne viennent pas d'un exemple dessiné à la main mais de la physique : deux colonnes dont les sols diffèrent de plus que le saut ne peuvent pas se suivre",
        "En cas de contradiction, la méthode par contraintes retombe sur la constructive plutôt que de rendre un niveau vide",
      ],
    },
    {
      titre: "Un lissage déclaré, et pas caché",
      points: [
        "L'effondrement produisait des plateformes d'une seule case, et le niveau ressemblait à une pluie de cubes au lieu d'un décor",
        "Elles sont prolongées sur deux ou trois colonnes, après l'effondrement : les contraintes décident de l'ossature, pas de la lisibilité",
        "Effet mesuré : le taux de niveaux jouables de cette méthode est passé de 96 à 98 pour cent",
      ],
    },
  ],
  lecons: [
    {
      titre: "La vérification n'est pas une option du projet, c'est le projet",
      texte:
        "La première version engendrait de jolis niveaux et n'en vérifiait aucun. À difficulté maximale, un niveau infranchissable sort régulièrement, et rien à l'écran ne le disait. Le chiffre qui compare vraiment deux générateurs n'est pas l'esthétique de leurs niveaux, c'est la part de ceux qui se terminent.",
    },
  ],
  demos: [
    {
      libelle: "Ouvrir Les niveaux",
      url: "https://rivarche.vercel.app/niveaux",
      detail: "Flèches pour marcher, flèche haut ou espace pour sauter",
    },
  ],
  depots: [{ libelle: "RivArche", url: null, visibilite: "prive", detail: "Le dossier `src/ateliers/niveaux`" }],
};

export default fiche;
