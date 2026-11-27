import type { Projet } from "../types";
import enLigne from "./en-ligne.webp";

const fiche: Projet = {
  slug: "rivarche",
  ordre: 25,
  titre: "RivArche",
  accroche:
    "Neuf ateliers d'intelligence artificielle sous une seule coquille, et les modèles tournent chez le visiteur : rien de ce qu'il dépose ne part ailleurs.",
  resume:
    "Une plateforme plutôt que neuf pages, et la raison n'est pas esthétique : neuf pages séparées, ce sont neuf navigations, neuf thèmes qui divergent, neuf mises en ligne et neuf politiques de confidentialité que personne n'écrit. Le seul vrai risque d'une plateforme est le poids de la première visite, et le chargement paresseux par route le règle : celui qui vient pour un atelier ne télécharge jamais les autres. Chaque atelier choisit sa disposition selon la forme de son échange, pas selon le goût.",
  categorie: "ia-donnees",
  statut: "en-ligne",
  annee: "2026",
  cadre: "ENIB · module Intelligence artificielle et simulation",
  couleur: "#7f4ac4",
  phare: true,
  stack: ["react", "typescript", "vite", "tailwind", "onnx", "pytorch", "python", "vercel"],
  couverture: {
    src: enLigne,
    alt: "RivArche : la barre des neuf ateliers et le premier d'entre eux",
    format: "ecran",
  },
  galerie: [
    {
      src: enLigne,
      alt: "La plateforme en ligne",
      legende:
        "Une seule barre en haut : les neuf ateliers et la recherche. Les ateliers qui ne sont pas encore ouverts sont annoncés en gris et ne s'ouvrent pas, plutôt que d'être cachés ou promis",
      format: "ecran",
    },
  ],
  chiffres: [
    { valeur: 3, libelle: "ateliers ouverts sur neuf, et aucun des six autres n'est promis" },
    { valeur: 0, libelle: "octet envoyé à un serveur : les modèles tournent chez le visiteur" },
    { valeur: 4, libelle: "dispositions pour neuf ateliers, choisies par la forme de l'échange" },
    { valeur: 3, libelle: "moteurs de calcul essayés en cascade, chacun vérifié par une vraie passe" },
  ],
  probleme:
    "Une démonstration de modèle se heurte toujours au même mur : le calcul coûte cher, et un hébergement gratuit donne 512 mégaoctets et un dixième de processeur. Mesuré sur la méthode du cours : 1 404 mégaoctets au pic et 185 secondes pour une seule image. Le réflexe est de payer, ou de ne rien montrer.",
  solution:
    "Déplacer le calcul chez le visiteur. Les modèles sont exportés en ONNX et exécutés par son navigateur, sur sa carte graphique quand elle répond. Zéro quota, zéro réveil de serveur, et une phrase qui vaut mieux que n'importe quelle case à cocher : ce que vous déposez ne quitte pas votre appareil.",
  sections: [
    {
      titre: "Pourquoi une plateforme, et pas neuf pages",
      texte:
        "La question s'est posée dans l'autre sens au départ : diviser semblait économiser le travail d'interface. C'est l'inverse.",
      points: [
        "Neuf pages, ce sont neuf navigations, neuf thèmes qui finiront par diverger, neuf jeux d'états de chargement et d'erreur, neuf mises en ligne à surveiller",
        "Le poids de la première visite, seul argument sérieux pour diviser, se règle par le **chargement paresseux par route** : chaque atelier ne télécharge son code et son modèle qu'à l'ouverture de son onglet",
        "Une seule page de confidentialité, et c'est la bonne : neuf pages en voudraient neuf, et personne n'en écrit neuf",
      ],
    },
    {
      titre: "Quatre dispositions, choisies par la forme de l'échange",
      texte:
        "Deux questions suffisent à trancher, et elles ne se discutent pas : l'échange s'accumule-t-il ou se remplace-t-il, et l'entrée est-elle courte ou lourde.",
      points: [
        "**Le dialogue** : l'échange s'accumule, l'entrée est courte. La saisie est une barre fine sous le fil, pas une colonne à côté",
        "**L'établi** : l'échange se remplace, l'entrée est lourde. Entrées, résultat, commandes, côte à côte, parce qu'on compare sa photo au résultat",
        "**Le plateau** : l'entrée est la surface du résultat. On pose un point et la frontière bouge au même endroit",
        "**La carte** : on explore, et le détail glisse sans chasser la carte",
      ],
    },
    {
      titre: "Une manipulation et son effet, visibles en même temps",
      texte:
        "La règle qui a défait ma première version. Mettre un modèle en défaut depuis un autre onglet ne prouve rien : le visiteur quitte le résultat, revient, et a déjà oublié l'avant.",
      points: [
        "L'épreuve est une commande à côté du résultat, jamais une destination séparée",
        "Elle ne remplace pas le résultat, elle le **dédouble** : avant à gauche, après à droite, avec le chiffre qui a bougé",
        "Et contre la densité, c'est la règle de retrait qui compte, pas celle d'apparition : ce qui a servi et ne sert plus s'efface",
      ],
    },
    {
      titre: "Ce qui sort de l'appareil du visiteur",
      points: [
        "Huit ateliers sur neuf : **rien**. Le calcul se fait dans la page, y compris quand il dépose un tableau qui peut contenir des données personnelles",
        "Aucune mesure d'audience, donc **aucune bannière de cookies** ; aucun compte, donc rien à conserver",
        "Un seul atelier demandera un consentement, celui qui interroge un modèle de langue distant, et c'est pour cela qu'il sera lu",
      ],
    },
  ],
  feuilleDeRoute: [
    { titre: "RivLimier, la recherche documentaire", detail: "Le seul atelier avec un service, et le seul écran de consentement.", etat: "prevu" },
    { titre: "RivCorbeau, les matrices de Raven", detail: "Produire des symboles avant de répondre, pas deviner la réponse.", etat: "prevu" },
    { titre: "Les quatre derniers", detail: "Causalité, génération de niveaux, décision visuelle, panorama de l'IA.", etat: "prevu" },
  ],
  lecons: [
    {
      titre: "Diviser ne divise pas le travail",
      texte:
        "Mon intuition de départ était que neuf pages séparées coûteraient moins cher qu'une plateforme. Elle était fausse, et d'un facteur neuf : ce qu'on divise, ce n'est pas le travail, c'est l'attention. Une coquille partagée se dessine une fois et se répare une fois.",
    },
    {
      titre: "Ouvrir une session ne prouve pas qu'un moteur calcule",
      texte:
        "Un navigateur dont l'accélération graphique est annoncée mais inutilisable a ouvert les deux modèles sans broncher, puis est resté bloqué sur la première inférence, sans erreur et sans fin. Depuis, chaque moteur passe une vraie passe d'essai de soixante-quatre pixels, bornée dans le temps, avant d'être accepté.",
    },
  ],
  demos: [
    {
      libelle: "Ouvrir RivArche",
      url: "https://rivarche.vercel.app",
      detail: "Les modèles se téléchargent une fois, puis le navigateur les garde",
    },
  ],
  depots: [{ libelle: "RivArche", url: null, visibilite: "prive", detail: "Un seul dépôt, un dossier par atelier" }],
};

export default fiche;
