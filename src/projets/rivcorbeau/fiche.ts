import type { Projet } from "../types";
import confusion from "./confusion.webp";
import endurci from "./endurci.webp";
import matrice from "./matrice.webp";
import mesures from "./mesures.webp";

const fiche: Projet = {
  slug: "rivcorbeau",
  ordre: 30,
  titre: "RivCorbeau",
  accroche:
    "Une matrice de huit figures, une case manquante : un réseau lit les symboles dans les pixels, un raisonnement en déduit la règle.",
  resume:
    "Le projet du module IAS, et le seul où la machine doit découvrir seule une représentation symbolique à partir d'images. Le travail se coupe en deux moitiés qui ne font pas le même métier : un réseau à convolution nomme ce qu'il voit sur un panneau, forme, taille et niveau de gris, et un programme symbolique de cinquante lignes induit la règle puis choisit la réponse. Les deux sont montrées séparément, parce que c'est cette séparation qui fait tout l'intérêt : la machine ne devine pas, elle nomme puis elle raisonne.",
  categorie: "ia-donnees",
  statut: "en-ligne",
  annee: "2026",
  cadre: "ENIB · module IAS, projet de représentation symbolique",
  couleur: "#7f4ac4",
  stack: ["pytorch", "python", "onnx", "typescript", "react", "vite", "tailwind", "vercel"],
  couverture: {
    src: matrice,
    alt: "Une matrice de Raven, les huit candidats, et ce que le réseau a lu",
    format: "ecran",
  },
  galerie: [
    {
      src: matrice,
      alt: "Une matrice résolue, et la lecture du réseau",
      legende:
        "À gauche la matrice et ses huit candidats, où le visiteur répond avant la machine. À droite ce que le réseau a lu dans chacun des seize panneaux, et la règle induite pour chaque attribut, comparée à celle du générateur",
      format: "ecran",
    },
    {
      src: endurci,
      alt: "Les deux lecteurs, face au même flou",
      legende:
        "Deux modèles dans la barre : l'un n'a vu que des images nettes, l'autre a été entraîné sur des images abîmées. Sous le même flou, le second résout 60 pour cent du lot contre 28,3 pour le premier. C'est le seul endroit de la plateforme où le visiteur répare un modèle au lieu de le casser",
      format: "ecran",
    },
    {
      src: confusion,
      alt: "La campagne sous épreuve, et la matrice de confusion",
      legende:
        "On abîme l'entrée exprès et on rejoue les quarante-huit matrices. Sous un flou de soixante pour cent, les formes ne sont plus lues qu'à 37 pour cent et la résolution tombe de 100 à 18,8. La matrice de confusion dit l'erreur systématique : quand les contours se perdent, tout s'effondre vers le triangle",
      format: "ecran",
    },
    {
      src: mesures,
      alt: "Les quatre chiffres de la chaîne",
      legende:
        "Quatre chiffres qui ne disent pas la même chose : ce que le réseau lit, ce que la chaîne complète résout, ce que le raisonnement atteindrait avec des attributs parfaits, et le hasard. Sans le dernier, les trois premiers ne voudraient rien dire",
      format: "ecran",
    },
  ],
  chiffres: [
    { valeur: 99.8, suffixe: " %", libelle: "de matrices résolues, sur 440 problèmes jamais vus" },
    { valeur: 4.2, suffixe: " %", libelle: "le raccourci qui gagnait sur le RAVEN d'origine, mesuré ici sur I-RAVEN" },
    { valeur: 35, libelle: "points gagnés sous le flou par le lecteur entraîné sur des images abîmées" },
    { valeur: 268, libelle: "milliers de poids, et le modèle tient dans un mégaoctet" },
    { valeur: 42, suffixe: " ms", libelle: "pour lire les seize panneaux, dans le navigateur" },
  ],
  probleme:
    "Une matrice de Raven montre huit figures et en cache une neuvième. La règle n'est écrite nulle part : elle est dans les images. Le sujet ne demande pas de deviner la bonne case, il demande d'apprendre une **représentation symbolique** à partir des pixels, puis d'en tirer les règles abstraites. C'est toute la différence entre un modèle qui reconnaît et un modèle qui explique.",
  solution:
    "Deux moitiés, et une seule apprend. Un réseau à convolution regarde **un panneau** et rend trois choses : sa forme, sa taille, son niveau de gris. Il ne voit jamais la matrice, jamais les règles, jamais la réponse. Le raisonnement vient après et il est symbolique : les quatre règles du sujet sont essayées sur les deux premières lignes, celle qui tient prédit la case manquante, et chaque attribut vote pour les candidats compatibles.",
  sections: [
    {
      titre: "Pourquoi couper en deux plutôt qu'un seul réseau",
      texte:
        "Un réseau unique qui recevrait la matrice entière et désignerait un candidat obtiendrait peut-être un bon chiffre, et n'apprendrait rien à personne.",
      points: [
        "Coupé en deux, chaque moitié se mesure **séparément** : la vision à 1,000, le raisonnement à 0,998",
        "L'écart entre « résolu avec les attributs vrais » et « résolu avec les attributs lus » est **le prix exact de la vision**. Ici il est nul, donc la vision ne coûte rien et le plafond vient du raisonnement",
        "Et l'atelier peut montrer ce que la machine a lu, panneau par panneau, avant de montrer ce qu'elle en déduit. Un réseau unique n'aurait rien à montrer entre les deux",
      ],
    },
    {
      titre: "La moyenne globale efface la forme",
      texte:
        "Premier réseau, terminé par une moyenne de sa carte de traits, comme on l'écrit par réflexe. Les chiffres ont dit que c'était faux.",
      points: [
        "Couleur **0,991**, taille **0,853**, et type bloqué à **0,419**",
        "La cause, évidente après coup : moyenner la carte entière ne garde que la quantité d'encre. Cela suffit à dire le gris et la taille, et cela efface précisément ce qui distingue un triangle d'un hexagone",
        "En gardant la carte spatiale avant les têtes, les trois attributs passent à **1,000**. Le réseau est plus gros, 268 000 poids au lieu de 62 000, et il tient toujours dans un mégaoctet",
      ],
    },
    {
      titre: "Un décalage de un, et treize points de résolution",
      texte:
        "La règle arithmétique n'était retrouvée qu'une fois sur deux. Le défaut n'était pas dans le modèle mais dans ma lecture du générateur.",
      points: [
        "L'arithmétique ne porte pas sur la valeur affichée mais sur **l'indice** de l'attribut",
        "Et pour la taille, l'indice zéro vaut déjà une taille réelle : le générateur écrit `v3 = v1 + v2 + 1`, là où la couleur s'écrit `v3 = v1 + v2`",
        "Ce seul décalage a fait passer la résolution de **0,866 à 0,998**, et la règle arithmétique de 0,484 à 0,996",
      ],
    },
    {
      titre: "Pourquoi I-RAVEN et pas RAVEN, et la preuve est dans la page",
      texte:
        "C'est la critique la plus connue du jeu d'origine, et elle est habituellement citée. Ici elle est recalculée dans le navigateur à chaque campagne.",
      points: [
        "Dans le jeu d'origine, les sept mauvaises réponses étaient fabriquées en modifiant **un seul** attribut de la bonne. Un modèle qui ne regardait même pas la matrice retrouvait donc la réponse en prenant la plus « moyenne » des huit",
        "Ce raccourci est implémenté dans l'atelier : il ne reçoit que les huit candidats, jamais le contexte",
        "Mesuré sur les quarante-huit matrices d'I-RAVEN : **4,2 pour cent**, donc en dessous même du hasard. Les distracteurs ne sont plus exploitables, et le 99,8 pour cent du modèle vaut quelque chose",
      ],
    },
    {
      titre: "Réparer un modèle, et ce que la réparation coûte",
      texte:
        "Un lecteur entraîné sur des images nettes s'effondre dès qu'on abîme l'entrée : il n'a jamais rien vu d'autre que du propre. La correction porte un nom, l'augmentation de données, et elle se paie.",
      points: [
        "Le second lecteur a vu, pendant son entraînement, du bruit, du flou et des décalages mélangés aux images nettes",
        "Mesuré sur 240 problèmes des trois configurations : **sur images propres il perd cinq points**, parce qu'il a dépensé une partie de sa capacité à tenir sous le bruit",
        "Sous le flou il en gagne trente-cinq, et sous le décalage le lecteur propre ne lit plus que **un pour cent** des cases",
        "Au-delà de ce qu'il a vu, il s'effondre aussi : l'augmentation protège dans la plage qu'elle a montrée, pas au-delà, et l'atelier le dit",
      ],
    },
    {
      titre: "Quand elle rate, elle dit pourquoi",
      texte:
        "Un échec a trois causes possibles, et elles ne se corrigent pas de la même façon. L'atelier refait donc le raisonnement sur les attributs exacts pour savoir laquelle est en jeu.",
      points: [
        "**La vision a fauté** : avec les attributs exacts le raisonnement trouvait. Les panneaux mal lus sont entourés de rouge",
        "**La règle n'a pas été trouvée** : même avec les attributs exacts, aucune règle ne tient pour tel attribut, qui n'a donc pas voté",
        "**L'item ne tranche pas** : plusieurs candidats récoltent le même nombre de votes, et ce n'est la faute ni de la vision ni de la règle",
      ],
    },
    {
      titre: "L'épreuve, et l'erreur systématique qu'elle révèle",
      texte:
        "Un modèle qui lit parfaitement des images propres ne prouve rien : les images propres, c'est lui qui les a vues. La question est où il se casse, et dans quel ordre.",
      points: [
        "Trois épreuves réglables : du bruit, un flou, un décalage. La campagne rejoue les quarante-huit matrices sous le réglage choisi, et chaque campagne s'inscrit au banc d'essais",
        "Sous un flou de soixante pour cent : gris lus à 71 pour cent, tailles à 55, **formes à 37**, et la résolution tombe à 18,8. Les trois attributs ne lâchent pas ensemble, et la forme lâche la première",
        "La matrice de confusion nomme l'erreur : **484 erreurs sur 768 panneaux, toutes vers le triangle**. Quand les contours disparaissent, le réseau répond la forme la plus simple, il ne répond pas au hasard",
      ],
    },
  ],
  lecons: [
    {
      titre: "Une métrique par moitié, sinon on ne sait pas qui échoue",
      texte:
        "Mesurer seulement « a-t-il trouvé la bonne case » aurait donné 0,866 au premier essai, et rien pour savoir d'où venait le manque. En mesurant la lecture et le raisonnement séparément, le coupable est apparu en une ligne : la vision était parfaite, et c'était l'arithmétique qui se trompait.",
    },
    {
      titre: "Le générateur est la vérité, pas l'intuition",
      texte:
        "J'ai d'abord écrit l'arithmétique comme elle se raconte, la somme des deux premières. Elle tombait juste une fois sur deux et j'aurais pu accuser le modèle. La réponse était dans le code du générateur, à dix lignes de distance : il fallait lire plutôt que supposer.",
    },
  ],
  demos: [
    {
      libelle: "Ouvrir RivCorbeau",
      url: "https://rivarche.vercel.app/corbeau",
      detail: "Répondez avant la machine : quarante-huit matrices qu'elle n'a jamais vues",
    },
  ],
  depots: [
    { libelle: "RivArche", url: null, visibilite: "prive", detail: "Le dossier `src/ateliers/corbeau`" },
  ],
};

export default fiche;
