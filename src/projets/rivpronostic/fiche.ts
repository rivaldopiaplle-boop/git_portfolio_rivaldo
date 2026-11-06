import type { Projet } from "../types";

const fiche: Projet = {
  slug: "rivpronostic",
  ordre: 24,
  titre: "RivPronostic",
  accroche:
    "Prévoir la courbe de température d'un équipement frigorifique à vingt-quatre heures, pour envoyer le technicien avant la perte et non après.",
  resume:
    "Le second axe de RivVigie. La plateforme constate la rupture quand le seuil est franchi, c'est-à-dire quand la marchandise se perd déjà : le préavis est de zéro heure. Ce projet le porte à six heures en prévoyant la trajectoire au lieu de classer un état. Trois modèles comparés : la prévision naïve comme référence, un réseau séquentiel entraîné en PyTorch, et un modèle de fondation de séries temporelles utilisé sans entraînement, parce qu'un magasin qui ouvre n'a aucun historique. Un autoencodeur attrape ce qu'un seuil ne verra jamais : un compresseur qui met chaque jour un peu plus longtemps à redescendre en froid.",
  categorie: "applications",
  statut: "en-cours",
  annee: "2026",
  cadre: "Projet personnel · second axe de RivVigie",
  couleur: "#7c3aed",
  puce: "Séries temporelles",
  stack: ["python", "pandas", "numpy", "pytorch", "scikitlearn", "mlflow", "fastapi", "docker"],
  chiffres: [
    { valeur: 0, suffixe: " h", libelle: "de préavis aujourd'hui : l'alerte et la perte sont simultanées" },
    { valeur: 6, suffixe: " h", libelle: "de préavis visé, assez pour déplacer un technicien" },
    { valeur: 3, libelle: "familles d'apprentissage travaillées sur un seul domaine" },
    { valeur: 300, libelle: "fois plus cher qu'une visite pour rien : un épisode subi" },
  ],
  probleme:
    "Un seuil ne prévient de rien : il constate. Et la tentation est de régler le problème en classant, panne ou pas panne, ce qui redonne exactement le projet de détection de faux billets que j'ai déjà fait. Le vrai besoin n'est pas une étiquette, c'est une trajectoire et une date : dans combien d'heures cette courbe croise-t-elle le seuil, et avec quelle incertitude.",
  solution:
    "Prévoir la courbe des vingt-quatre prochaines heures, avec son intervalle, et lire le préavis dedans. La référence n'est pas une exactitude mais la prévision naïve, qui capture toute la saisonnalité journalière et qu'il faut battre. Le seuil d'alerte se calcule à partir du coût des deux erreurs, dans un rapport de trois cents pour un : cent préavis inutiles coûtent moins cher qu'une seule perte.",
  sections: [
    {
      titre: "Pourquoi un modèle de fondation, et pas par curiosité",
      texte:
        "Un réseau entraîné demande des mois de mesures par équipement. Un magasin qui ouvre, un équipement remplacé, et il n'a rien à dire.",
      points: [
        "Un modèle de fondation de séries temporelles prévoit **dès la première journée de données**, sans entraînement : c'est la réponse au premier jour, pas une démonstration",
        "Le réseau entraîné prend le relais quand l'historique existe, et le projet mesure à partir de combien de semaines",
        "Les comparaisons publiques de 2026 ne désignent aucun gagnant : le classement change avec l'horizon, la métrique et le jeu. C'est notre mesure qui tranchera, pas un palmarès",
      ],
    },
    {
      titre: "Des données réelles, et leurs défauts sont le sujet",
      texte:
        "Un jeu de chambre froide commerciale relevé par capteurs connectés, publié sur Mendeley Data, et la charge horaire des compresseurs d'un supermarché danois.",
      points: [
        "Les auteurs annoncent eux-mêmes des trous de communication, des intervalles allongés par batterie faible et une dérive de capteur en forte humidité",
        "Un modèle qui exige une série régulière ne survivra pas au premier magasin : les trous se marquent, ils ne se bouchent pas en silence",
        "Le découpage se fait dans le temps et par équipement, jamais au hasard, et un test automatique vérifie qu'aucune valeur postérieure à la coupure n'entre dans l'entraînement",
      ],
    },
    {
      titre: "Ce que ce projet n'est pas",
      points: [
        "Pas une classification : ni matrice de confusion, ni précision, ni rappel. On juge sur MASE, sur la couverture de l'intervalle, et sur le préavis en heures",
        "Pas un grand modèle de langue : prévoir une température par un transformeur de texte coûterait cent fois plus cher pour un résultat moins bon",
        "Pas de SageMaker ni de Kubeflow : l'un facture à l'heure et cache ce qu'on cherche à apprendre, l'autre demande trois jours pour ce que MLflow couvre",
      ],
    },
  ],
  feuilleDeRoute: [
    { titre: "Le préavis utile, et pourquoi six heures", detail: "En dessous on ne déplace personne, au-delà la prévision d'un meuble froid ne vaut plus grand-chose.", etat: "en-cours" },
    { titre: "Des séries réelles, trous compris", detail: "Rééchantillonner, marquer les trous, voir la saisonnalité journalière, versionner le jeu.", etat: "prevu" },
    { titre: "Interdire au futur d'entrer dans le passé", detail: "Découpage temporel, normalisation sur le passé seulement, et la prévision naïve comme référence.", etat: "prevu" },
    { titre: "Le réseau séquentiel en PyTorch", detail: "Fenêtres glissantes, vingt-quatre pas en sortie, et des quantiles plutôt qu'une valeur unique.", etat: "prevu" },
    { titre: "Un modèle de fondation en zéro-coup", detail: "Mesurer à partir de combien de semaines le réseau entraîné prend le relais.", etat: "prevu" },
    { titre: "L'autoencodeur, pour ce qu'un seuil ne voit pas", detail: "Apprendre le cycle normal de dégivrage, signaler ce qu'il reconstruit mal.", etat: "prevu" },
    { titre: "Le préavis, mesuré en heures", detail: "Rejouer l'historique et compter les heures gagnées avant le franchissement réel.", etat: "prevu" },
    { titre: "La prévision devient un service", detail: "Une adresse, une courbe, son intervalle, et la naïve en secours quand le modèle est absent.", etat: "prevu" },
    { titre: "La dérive, et la chaîne qui refuse", detail: "Un été chaud décale toutes les températures ; un modèle moins bon que le précédent ne passe pas.", etat: "prevu" },
  ],
  lecons: [
    {
      titre: "Refaire ce qu'on sait déjà faire n'apprend rien",
      texte:
        "La première version de ce projet était une classification sur un jeu déséquilibré : matrice de confusion, précision, rappel, seuil calculé par le coût. Tout cela, mon projet de détection d'empoisonnement le faisait déjà, avec d'autres données. Un second projet qui répète le premier donne deux lignes de CV qui racontent la même chose.",
    },
    {
      titre: "La bonne référence n'est pas l'exactitude",
      texte:
        "En classification, la solution la plus bête atteint 96 pour cent quand les cas rares font 4 pour cent. En prévision, la solution la plus bête est la prévision naïve, demain sera comme hier à la même heure, et elle capture toute la saisonnalité : elle est bien plus difficile à battre. Changer de problème change la référence, et c'est la première chose à poser.",
    },
  ],
  depots: [],
};

export default fiche;
