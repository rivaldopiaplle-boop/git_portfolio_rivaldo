import type { Projet } from "../types";
import atelier from "./atelier.webp";
import epreuve from "./epreuve.webp";
import loupe from "./loupe.webp";

const fiche: Projet = {
  slug: "rivcameleon",
  ordre: 26,
  titre: "RivCaméléon",
  accroche:
    "Une photo prend les couleurs et les motifs d'un tableau en gardant sa forme, en quelques secondes au lieu de quatre minutes, et sans quitter le navigateur.",
  resume:
    "Le premier atelier de RivArche, tiré du travail pratique de transfert de style du module IAS. Le sujet ne demandait pas une jolie image : chacune de ses dix questions était un bouton à tourner, dosage du style, couches qui portent le style local contre le global, architecture, stabilité de l'optimisation. La démonstration rend donc ces boutons au visiteur, au lieu de les cacher derrière un résultat.",
  categorie: "ia-donnees",
  statut: "en-ligne",
  annee: "2026",
  cadre: "ENIB · module IAS, travail pratique de transfert de style",
  couleur: "#2fa3d4",
  stack: ["onnx", "pytorch", "python", "react", "typescript", "vite", "tailwind", "vercel"],
  couverture: {
    src: atelier,
    alt: "L'atelier : la photo, le tableau, le résultat et ses commandes",
    format: "ecran",
  },
  galerie: [
    {
      src: atelier,
      alt: "L'établi complet",
      legende:
        "Les entrées à gauche, le résultat au centre, les commandes à droite. Le résultat ne quitte jamais l'écran, même pendant un calcul : il reste affiché, voilé, plutôt que de laisser un blanc qui fait croire à une panne",
      format: "ecran",
    },
    {
      src: epreuve,
      alt: "Le modèle mis à l'épreuve",
      legende:
        "Décaler la photo de seize pixels ne remplace pas le résultat : il se dédouble, et l'écart se mesure. Ici 16,1 pour cent, affiché en clair. Deux images presque identiques, posées côte à côte, laisseraient croire que l'épreuve n'a rien fait",
      format: "ecran",
    },
    {
      src: loupe,
      alt: "La loupe et son rideau",
      legende:
        "Les deux images superposées derrière un rideau qu'on fait glisser, avec le zoom à la molette et une vue de leur différence amplifiée. C'est ce qui rend un écart de seize pour cent visible",
      format: "ecran",
    },
  ],
  chiffres: [
    { valeur: 254, suffixe: " s", libelle: "pour une image avec la méthode du cours, mesuré sur ma machine" },
    { valeur: 4, suffixe: " s", libelle: "pour la même image ici, sur un processeur, sans carte graphique" },
    { valeur: 28, suffixe: " Mo", libelle: "téléchargés une seule fois, puis gardés par le navigateur" },
    { valeur: 0, libelle: "octet envoyé : la photo du visiteur reste sur son appareil" },
  ],
  probleme:
    "La méthode du cours, celle de Gatys, modifie l'image elle-même trois cents fois. Mesuré : 1 404 mégaoctets au pic et 185 secondes pour une image de 256 pixels. Un hébergement gratuit offre 512 mégaoctets et un dixième de processeur, soit environ un quarantième de ma machine : la même image y demanderait près de deux heures. Elle ne sera jamais servie en direct gratuitement, et il valait mieux le mesurer que le découvrir.",
  solution:
    "AdaIN, qui reprend le **même encodeur VGG19 jusqu'à relu4_1** que le script du cours, remplace la matrice de Gram par l'alignement de la moyenne et de l'écart type, et reconstruit en une seule passe. Son paramètre d'interpolation est exactement le dosage du sujet : le curseur à l'écran est un vrai réglage, pas une décoration.",
  sections: [
    {
      titre: "Deux graphes, et la mesure dit pourquoi",
      texte:
        "Le réflexe est d'exporter un seul modèle qui prend la photo, le tableau et le dosage. Les chiffres disent le contraire.",
      points: [
        "Décrire une image coûte **1 551 ms** à 512 pixels, reconstruire en coûte **2 007 ms**",
        "Bouger le curseur ne change que le mélange : avec un graphe unique, chaque mouvement aurait redécrit les deux images, soit **3 102 ms perdues à chaque fois**",
        "Séparés, seule la reconstruction est rejouée, et le mélange lui-même, qui n'est que des moyennes et des écarts types, s'écrit en clair en quelques millisecondes",
      ],
    },
    {
      titre: "Trois moteurs, et aucun n'est cru sur parole",
      texte:
        "La cascade essaie la carte graphique, puis le processeur avec tous ses fils, puis le processeur avec un seul. Trois défauts l'ont façonnée, et tous ont été vus à l'écran avant d'être compris.",
      points: [
        "Créer les deux sessions en parallèle déclenche `multiple calls to initWasm` : elles sont créées l'une après l'autre",
        "Un fil de travail de type module empêche le moteur multi-fils de démarrer, sans jamais lever d'erreur : le fil est classique",
        "Un moteur déjà initialisé refuse de l'être une seconde fois dans le même fil, et l'essai suivant reste bloqué pour toujours : chaque barreau repart d'un **fil neuf**",
        "Et surtout : un navigateur peut ouvrir les deux modèles puis rester bloqué sur la première inférence. Chaque moteur passe donc une **vraie passe d'essai de soixante-quatre pixels**, bornée dans le temps",
      ],
    },
    {
      titre: "Quatre épreuves, et ce qu'elles montrent",
      texte:
        "La page qui convainc un ingénieur n'est pas celle du résultat, c'est celle où le modèle est mis en défaut exprès.",
      points: [
        "**Décaler la photo** de seize pixels : un réseau à convolution devrait à peine bouger, ses filtres glissent sur l'image",
        "**Bruiter la photo** : le bruit est invisible à l'oeil, mais les descriptions profondes le voient, et c'est leur statistique qui pilote le style",
        "**Vider le tableau de ses couleurs** : si le résultat reste coloré, le style n'était pas que de la couleur",
        "**Réduire le tableau** à soixante-quatre pixels : les motifs fins disparaissent, les grandes masses restent, et on voit ce que le modèle retient vraiment",
      ],
    },
    {
      titre: "Le calcul vit dans un fil de travail",
      points: [
        "Quatre secondes de calcul sur le fil principal gèlent la page entière : le curseur ne répond plus, les points d'attente s'arrêtent",
        "Le visiteur croit alors à une panne au moment précis où tout fonctionne",
        "Le fil de travail garde aussi les descriptions des deux images, pour que le curseur ne les refasse jamais",
      ],
    },
  ],
  lecons: [
    {
      titre: "Le TP ne voulait pas une jolie image",
      texte:
        "Ma première maquette prenait deux images et rendait la troisième. Elle jetait tout ce que le sujet demandait de comprendre, et n'aurait pas tenu trente secondes devant un ingénieur. Les dix questions du sujet sont des boutons : la démonstration les rend au visiteur au lieu de les cacher.",
    },
    {
      titre: "Un bon modèle ne sauve pas une mauvaise image",
      texte:
        "Le premier essai associait une vue aérienne de lac à une toile très marquée, et le résultat perdait complètement la photo. Le code était juste : je l'ai vérifié en rejouant le même calcul en Python, qui donnait la même image. C'était le choix des exemples qui était mauvais. Une façade ou une rue, avec leurs lignes, résistent ; une vue aérienne à faible contraste ne résiste pas.",
    },
  ],
  demos: [
    {
      libelle: "Ouvrir RivCaméléon",
      url: "https://rivarche.vercel.app/cameleon",
      detail: "Dix images du domaine public sont prêtes, ou déposez la vôtre",
    },
  ],
  depots: [{ libelle: "RivArche", url: null, visibilite: "prive", detail: "Le dossier `src/ateliers/cameleon`" }],
};

export default fiche;
