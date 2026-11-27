import type { Projet } from "../types";
import atelier from "./atelier.webp";
import banc from "./banc.webp";
import compromis from "./compromis.webp";
import epreuve from "./epreuve.webp";
import loupe from "./loupe.webp";

const fiche: Projet = {
  slug: "rivcameleon",
  ordre: 26,
  titre: "RivCaméléon",
  accroche:
    "Une photo prend les couleurs et les motifs d'un tableau en gardant sa forme, en quelques secondes au lieu de quatre minutes, et sans quitter le navigateur.",
  resume:
    "Le premier atelier de RivArche. Une boutique doit sortir quarante visuels dans une seule identité, sans payer un graphiste par image et sans confier les photos de ses clients à un service en ligne. Chaque question du sujet est devenue un bouton à tourner : la dose de style, le grain auquel la référence est lue, la conservation des couleurs, le mélange de deux références. Et chaque réglage touché s'inscrit au banc d'essais avec sa mesure, pour que le visiteur reparte avec celui qu'il a choisi.",
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
      alt: "La bande de réglages et l'image, plein écran",
      legende:
        "Une bande de réglages, l'image en grand, et la page ne défile jamais. La mesure est dans la même bande que les commandes qui la déplacent : une commande à gauche et son chiffre à l'extrême droite sont à mille deux cents pixels l'un de l'autre, et personne ne voit le lien",
      format: "ecran",
    },
    {
      src: compromis,
      alt: "La courbe du compromis, mesurée",
      legende:
        "Six rendus et six mesures sur les images déposées, pas sur un exemple choisi d'avance. L'écart au style tombe de 90 à 39 pour cent quand la dose monte, l'écart au contenu monte en sens inverse. Il n'y a pas de meilleur point, il y a celui du visiteur, et le trait vertical est son réglage",
      format: "ecran",
    },
    {
      src: banc,
      alt: "Le banc d'essais et son tableau",
      legende:
        "Chaque réglage touché s'inscrit tout seul avec sa mesure. Le visiteur remet un essai d'un clic, garde celui qu'il préfère, et emporte l'image et le journal. C'est la réponse à « comment être sûr que c'est le bon réglage » : il ne le croit pas, il le lit",
      format: "ecran",
    },
    {
      src: epreuve,
      alt: "Le modèle mis à l'épreuve",
      legende:
        "Décaler la photo de seize pixels ne remplace pas le résultat : il se dédouble, et l'écart se mesure. Ici 19,6 pour cent, affiché en clair. Deux images presque identiques, posées côte à côte, laisseraient croire que l'épreuve n'a rien fait",
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
    { valeur: 90, suffixe: " %", libelle: "d'écart au style à dose nulle, 39 % à pleine dose : la courbe du compromis" },
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
      titre: "Les six questions du sujet, rendues au visiteur",
      texte:
        "Vingt-six images calculees par la methode d'origine, chacune avec sa question et un curseur. Aucune ne pourrait etre calculee en direct : c'est pour cela qu'elles sont la.",
      points: [
        "**Ce que chaque couche retient** : la photo reconstruite depuis les seules activations. conv_1 la rend presque intacte, conv_13 n'en garde qu'une silhouette dans le bruit",
        "**Style local contre style global** : le tableau reconstruit en ajoutant les couches une a une, du grain aux grandes formes",
        "**L'architecture** : ResNet18 est cinq fois plus rapide, 53 secondes contre 254, et nettement moins bon",
        "**LBFGS contre Adam**, avec la courbe de perte en echelle logarithmique, et **le poids du style** de mille a dix milliards",
      ],
    },
    {
      titre: "Le banc d'essais, et pourquoi il change tout",
      texte:
        "Une démonstration montre un résultat juste. Un outil laisse essayer, comparer, et repartir avec le meilleur. La différence tient dans un seul composant, le même dans les neuf ateliers.",
      points: [
        "Chaque réglage qui produit un résultat **écrit une ligne** : les réglages, la mesure, la référence. Deux réglages identiques ne font qu'une ligne",
        "Le visiteur **remet** un essai d'un clic, et **garde** celui qu'il préfère : ici personne ne peut trancher à sa place, parce que le résultat est un compromis et non un score. L'écart au style le plus faible serait toujours la dose maximale, et ce serait un faux gagnant",
        "Il repart avec **l'image et le journal**, un fichier qui dit ce qui a été essayé et ce que cela donnait",
      ],
    },
    {
      titre: "La courbe du compromis remplace les questions",
      texte:
        "Les réponses du sujet étaient des images fixes. Elles deviennent une mesure que le visiteur produit lui-même, sur ses propres images.",
      points: [
        "Six vraies passes suivies de six vraies mesures, en aperçu à 192 pixels : trois secondes au lieu de vingt",
        "L'écart au style est **rapporté à la distance de départ de la photo** : cent pour cent veut dire aussi loin que la photo d'origine, zéro veut dire que les statistiques du tableau sont atteintes. Un chiffre absolu ne voudrait rien dire",
        "Mesuré, et ce n'était pas attendu : à dose nulle la courbe part de **90 pour cent et non de cent**. Même sans style, le décodeur ne reconstruit pas la photo à l'identique",
      ],
    },
    {
      titre: "Deux tableaux mélangés, sans un calcul de plus",
      points: [
        "AdaIN ne retient d'un style que ses moyennes et ses écarts types par canal",
        "Mélanger deux références ne demande donc pas de mélanger deux images : il suffit d'**interpoler ces deux poignées de nombres**",
        "Le visiteur obtient un style qui n'existe dans aucun des deux tableaux, et le curseur coûte le même temps de calcul qu'avant",
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
      titre: "La commande et son chiffre dans le même regard",
      texte:
        "La première version mettait les entrées à gauche, le résultat au centre et les commandes à droite. Elle avait l'air rangée et elle ne marchait pas : on bougeait un curseur d'un côté de l'écran et le chiffre changeait de l'autre, mille deux cents pixels plus loin. Personne ne voit ce lien. Les réglages, leur valeur et la mesure qu'ils déplacent tiennent maintenant dans une seule bande, et ce qui demande de la place s'ouvre en fenêtre au lieu de pousser le résultat hors de l'écran.",
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
