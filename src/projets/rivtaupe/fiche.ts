import type { Projet } from "../types";
import pieges from "./pieges.webp";
import regression from "./regression.webp";
import sansFuite from "./sans-fuite.webp";

const fiche: Projet = {
  slug: "rivtaupe",
  ordre: 28,
  titre: "RivTaupe",
  accroche:
    "Déposez un tableau : il dit ce qu'on peut en apprendre, la référence qu'il faut battre, et les pièges qu'il cache.",
  resume:
    "Le troisième atelier de RivArche, tiré du travail pratique de fouille de données. Il ne cherche pas à battre un record : il répond à la seule question qui compte devant un tableau inconnu. Entraîner un modèle est facile ; ce qui fait perdre des mois, c'est une fuite qu'on n'a pas vue, une classe rare qu'on a écrasée, ou un identifiant qu'on a donné au modèle. Lecture du CSV, profilage, trois modèles et quatre détecteurs de pièges, tout écrit à la main et exécuté dans le navigateur.",
  categorie: "ia-donnees",
  statut: "en-ligne",
  annee: "2026",
  cadre: "ENIB · module IAS, travail pratique de fouille de données",
  couleur: "#d9922c",
  stack: ["typescript", "react", "vite", "tailwind", "vercel"],
  couverture: {
    src: pieges,
    alt: "Les quatre pièges trouvés dans un tableau",
    format: "ecran",
  },
  galerie: [
    {
      src: pieges,
      alt: "Les pièges d'un tableau",
      legende:
        "Le troisième exemple est piégé exprès. L'atelier trouve la fuite, la classe à 6 pour cent, les échelles qui varient d'un facteur 19 000, et la colonne constante. L'exactitude affiche 1,000 : un modèle parfait est une alarme, pas un succès",
      format: "ecran",
    },
    {
      src: sansFuite,
      alt: "Le même tableau, la fuite exclue",
      legende:
        "Un bouton exclut la colonne fautive et relance. Le chiffre retombe, et c'est la démonstration : ce que le modèle avait appris, c'était la réponse elle-même",
      format: "ecran",
    },
    {
      src: regression,
      alt: "Une régression et ses résidus",
      legende:
        "Sur un autre tableau, la tâche change toute seule : prédire une grandeur. La référence devient « répondre toujours la moyenne », et le nuage dit où le modèle se trompe. Erreur de 2,67 contre 6,96 pour la moyenne",
      format: "ecran",
    },
  ],
  chiffres: [
    { valeur: 4, libelle: "pièges détectés : identifiant, classe rare, fuite, échelles" },
    { valeur: 3, libelle: "tâches reconnues à partir de la colonne visée" },
    { valeur: 0, libelle: "octet envoyé : un tableau peut contenir des données personnelles" },
    { valeur: 70, suffixe: " %", libelle: "des lignes pour apprendre, le reste pour juger" },
  ],
  probleme:
    "Devant un tableau inconnu, la première erreur n'est pas de choisir le mauvais modèle : c'est de croire un chiffre. Quatre-vingt-quinze pour cent de bonnes réponses sur un tableau où la classe majoritaire fait quatre-vingt-quatorze pour cent, c'est un échec complet. Et un modèle qui atteint cent pour cent a presque toujours reçu la réponse dans ses entrées.",
  solution:
    "Afficher le résultat et sa référence côte à côte, toujours. Nommer les pièges avant d'entraîner quoi que ce soit, et donner le bouton qui les retire pour que le visiteur voie le chiffre retomber. Sur le tableau piégé : 1,000 avec la fuite, 0,983 sans.",
  sections: [
    {
      titre: "Ce que les détecteurs cherchent",
      points: [
        "**La fuite** : une colonne dont la corrélation avec la cible dépasse 95 pour cent. Elle contient déjà la réponse, et le modèle sera parfait jusqu'au jour où cette colonne n'existe pas encore",
        "**L'identifiant** : une colonne de texte presque unique par ligne. Le modèle apprend les réponses par coeur et s'effondre sur une ligne neuve",
        "**La classe rare** : moins de quinze pour cent. L'exactitude ne dit plus rien, et le signaler vaut mieux que d'afficher un score flatteur",
        "**Les échelles** : un rapport d'écarts types supérieur à cent. Sans mise à l'échelle, la grande colonne écrase la petite, qui cesse d'exister pour le modèle",
      ],
    },
    {
      titre: "Deux pièges que j'ai créés moi-même",
      points: [
        "Le détecteur d'identifiant marquait une grandeur continue : une mesure a naturellement presque une valeur par ligne. Il ne regarde plus que les colonnes de texte, sinon il faisait exclure une vraie donnée",
        "La mise à l'échelle doit être calculée **après** le découpage et sur la partie d'entraînement seulement. La calculer sur tout le tableau fait passer de l'information de la partie d'essai vers l'entraînement : le résultat est plus beau, et faux",
      ],
    },
  ],
  lecons: [
    {
      titre: "Un modèle parfait est une alarme",
      texte:
        "Sur le tableau piégé, le modèle atteint 1,000 d'exactitude. Un débutant est content. En réalité une colonne contenait le coût de la réparation, qui ne vaut zéro que lorsqu'il n'y a pas eu de panne. L'atelier le dit avant d'entraîner, et le bouton d'exclusion fait tomber le chiffre à 0,983.",
    },
  ],
  demos: [
    {
      libelle: "Ouvrir RivTaupe",
      url: "https://rivarche.vercel.app/taupe",
      detail: "Prenez le troisième exemple : c'est celui qui apprend le plus",
    },
  ],
  depots: [{ libelle: "RivArche", url: null, visibilite: "prive", detail: "Le dossier `src/ateliers/taupe`" }],
};

export default fiche;
