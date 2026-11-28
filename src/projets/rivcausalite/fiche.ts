import type { Projet } from "../types";
import ablation from "./ablation.webp";
import mesures from "./mesures.webp";
import phrase from "./phrase.webp";

const fiche: Projet = {
  slug: "rivcausalite",
  ordre: 31,
  titre: "La causalité",
  accroche:
    "Une phrase de presse énonce-t-elle une cause, ou la refuse-t-elle ? Et les traits écrits à la main servent-ils vraiment à quelque chose à côté d'un modèle de langue ?",
  resume:
    "Sous-tâche 1 du défi Touché 2026, sur le Countercausal News Corpus. Un encodeur de phrases produit une représentation du contexte, dix-neuf traits linguistiques sont calculés à la main, et un classifieur fusionne les deux. Mais le sujet ne demande pas un score : il demande de décider si ces traits apportent quelque chose, et d'en faire la mesure plutôt que l'hypothèse. La réponse est inattendue, et elle est dans la page.",
  categorie: "ia-donnees",
  statut: "en-ligne",
  annee: "2026",
  cadre: "ENIB · module IAS, projet d'extraction de causalité",
  couleur: "#d6485f",
  stack: ["pytorch", "python", "onnx", "typescript", "react", "vite", "tailwind", "vercel"],
  couverture: {
    src: phrase,
    alt: "Une phrase analysée, sa probabilité causale et les jetons reçus par le modèle",
    format: "ecran",
  },
  galerie: [
    {
      src: phrase,
      alt: "Une phrase causale, jugée dans le navigateur",
      legende:
        "« The strike was called off because the government agreed to the demands » : 93,8 pour cent. À droite, les traits linguistiques déclenchés et les jetons réellement envoyés au modèle. Rien n'est caché de ce qu'il reçoit",
      format: "ecran",
    },
    {
      src: ablation,
      alt: "L'ablation sur une phrase de démenti",
      legende:
        "« The minister denied that the new tax caused the price increase » : avec les traits, 87,5 pour cent ; les traits coupés, 60,4. L'ablation du sujet cesse d'être un tableau dans un rapport et devient un interrupteur sur une phrase choisie par le visiteur",
      format: "ecran",
    },
    {
      src: mesures,
      alt: "Les trois montages comparés sur trois graines",
      legende:
        "Trois montages, trois graines chacun, et l'écart affiché à côté de la moyenne. Sur 340 phrases de validation, une phrase vaut 0,3 point : deux montages qui diffèrent de moins d'un point ne diffèrent pas vraiment, et le dire fait partie du travail",
      format: "ecran",
    },
  ],
  chiffres: [
    { valeur: 77.1, suffixe: " %", libelle: "d'exactitude avec le modèle et les traits, sur 340 phrases gardées" },
    { valeur: 74.1, suffixe: " %", libelle: "pour les dix-neuf traits seuls, sans aucun modèle de langue" },
    { valeur: 60.9, suffixe: " %", libelle: "la réponse la plus bête : répondre toujours « causale »" },
    { valeur: 21.8, suffixe: " Mo", libelle: "le modèle quantifié, contre 86 en flottant, et il tourne dans le navigateur" },
  ],
  probleme:
    "Dans un flot de dépêches, « la grève a été levée parce que le gouvernement a cédé » énonce une cause ; « le ministre a nié que la taxe ait causé la hausse » la refuse. Les deux phrases contiennent les mêmes mots. Le corpus ajoute exprès ces **contre-causes**, et c'est ce qui rend la tâche difficile : un détecteur qui repère le mot « causé » se trompe une fois sur deux.",
  solution:
    "L'architecture du sujet, à la lettre : la représentation d'un encodeur de phrases et un vecteur de dix-neuf traits linguistiques, projetés puis combinés, et un petit perceptron au bout. Mais le livrable n'est pas le score : c'est la **comparaison**. Le modèle seul, le modèle avec les traits, les traits seuls, et chaque famille de traits retirée à son tour.",
  sections: [
    {
      titre: "Le résultat qui n'était pas attendu",
      texte:
        "Trois montages, trois graines chacun, sur 3 075 phrases apprises et 340 gardées de côté.",
      points: [
        "Le **modèle seul** : 74,6 pour cent d'exactitude",
        "Le **modèle et les traits** : 77,1 pour cent, soit deux points et demi de mieux",
        "Les **traits seuls, sans aucun modèle de langue** : 74,1 pour cent. Dix-neuf nombres écrits à la main font donc presque aussi bien qu'un encodeur de vingt-deux millions de poids sur cette tâche",
        "Et le trait qui porte le plus d'information n'est pas un connecteur causal mais la **négation**, à 0,060 bit : c'est elle qui sépare « a causé » de « n'a pas causé », et c'est précisément ce que le corpus ajoute",
      ],
    },
    {
      titre: "Un premier résultat faux, et comment il a été attrapé",
      texte:
        "La première mesure disait que les traits n'apportaient rien, et même qu'ils étaient muets : seuls, ils retombaient exactement sur la réponse la plus bête.",
      points: [
        "C'était une **seule graine**, et le classifieur avait convergé vers la classe majoritaire. Un résultat négatif tiré d'un seul essai n'est pas un résultat",
        "Vérifié avec une simple régression logistique, sans réseau : les traits seuls obtiennent 71,2 pour cent contre 60,9 pour la réponse la plus bête. Ils n'étaient donc pas muets, c'était le montage qui les étouffait",
        "Depuis, chaque montage tourne sur trois graines et affiche son écart. Publier un résultat négatif demande plus de preuves qu'un résultat positif, pas moins",
      ],
    },
    {
      titre: "Tout tourne dans le navigateur, et ce que ça coûte",
      points: [
        "L'encodeur est quantifié sur huit bits : **21,8 mégaoctets au lieu de 86**, chargés une seule fois puis gardés par le navigateur",
        "Le découpeur en jetons est réécrit en quarante lignes plutôt qu'importé : une bibliothèque aurait pesé des centaines de kilooctets, et l'algorithme tient en une boucle, le plus long morceau connu à chaque pas",
        "Les dix-neuf traits sont recalculés dans la page **à l'identique** du script d'entraînement. C'est une duplication assumée : le modèle a appris sur ces nombres-là, dans cet ordre, et une divergence enverrait au classifieur autre chose que ce qu'il connaît",
        "Les poids du classifieur partent en binaire et non en JSON : neuf cent quarante mille nombres écrits en texte faisaient un manifeste de vingt mégaoctets, soit plus que le modèle lui-même",
      ],
    },
    {
      titre: "L'ablation devient un interrupteur",
      points: [
        "Chaque famille de traits se coupe dans la barre, et le verdict se recalcule sur **la phrase du visiteur**",
        "Sur une phrase de démenti, couper les traits fait tomber le verdict de 87,5 à 60,4 pour cent",
        "Chaque essai s'inscrit au banc avec sa phrase et ses réglages : l'ablation cesse d'être un tableau dans un rapport",
      ],
    },
  ],
  lecons: [
    {
      titre: "Un résultat négatif se vérifie deux fois",
      texte:
        "Ma première conclusion était que les traits linguistiques n'apportaient rien. C'était faux, et il aurait suffi de l'écrire pour passer à côté du vrai résultat, qui est plus intéressant : ils apportent peu à côté du modèle, mais ils font presque aussi bien que lui tout seuls. La vérification a coûté vingt lignes de régression logistique.",
    },
    {
      titre: "L'architecture de l'énoncé peut cacher ce qu'on cherche",
      texte:
        "La figure du sujet projette la représentation du modèle et le vecteur de traits chacun vers mille vingt-quatre dimensions, puis les additionne. Dix-neuf nombres additionnés à trois cent quatre-vingt-quatre, c'est un murmure dans une foule. L'implémenter était l'exercice ; mesurer ce qu'elle coûte était le travail.",
    },
  ],
  demos: [
    {
      libelle: "Ouvrir La causalité",
      url: "https://rivarche.vercel.app/causalite",
      detail: "Écrivez une phrase en anglais, puis coupez une famille de traits et regardez le verdict bouger",
    },
  ],
  depots: [
    { libelle: "RivArche", url: null, visibilite: "prive", detail: "Le dossier `src/ateliers/causalite`" },
  ],
};

export default fiche;
