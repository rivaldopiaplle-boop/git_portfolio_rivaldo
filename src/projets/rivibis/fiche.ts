import type { Projet } from "../types";
import agenda from "./agenda.webp";
import connexion from "./connexion.webp";
import dossier from "./dossier.webp";
import journal from "./journal.webp";
import pharmacie from "./pharmacie.webp";
import supervision from "./supervision.webp";

const DEPOT = "https://github.com/rivaldopiaplle-boop/git_rivibis";

const fiche: Projet = {
  slug: "rivibis",
  ordre: 22,
  titre: "RivIbis",
  accroche:
    "Un dossier hospitalier où l'on n'efface rien, où lire laisse une trace, et où les droits suivent le lien de soin — pas le rôle.",
  resume:
    "Dossier médical miniature mais construit sur le modèle du métier, avec le vocabulaire de HL7 FHIR. Trois idées le séparent des « hospital management system » qu'on trouve par dizaines : une correction est un amendement signé et l'ancienne valeur reste lisible ; toute lecture de dossier est journalisée, parce que la curiosité interne est le vrai risque d'un hôpital ; et un médecin voit les dossiers de ses patients, pas de tous — le dépassement, le bris de glace, est motivé, limité à une heure, et signalé. Le parcours suit celui d'un hôpital camerounais : on paie avant d'être reçu, sauf aux urgences, où rien ne bloque jamais.",
  categorie: "applications",
  statut: "termine",
  annee: "2026",
  cadre: "Projet personnel · reprise complète de MyHopital",
  couleur: "#0f6e56",
  couverture: {
    src: dossier,
    alt: "RivIbis : un dossier médical, son bandeau d'allergies et l'histoire d'une écriture corrigée",
    format: "ecran",
  },
  galerie: [
    {
      src: dossier,
      alt: "Le dossier médical",
      legende:
        "Le bandeau de sécurité — allergies, traitements, antécédents — est en haut, jamais replié : c'est la seule information de l'application dont l'absence peut tuer quelqu'un. À droite, l'histoire d'une ligne corrigée : l'ancienne valeur reste lisible, avec son auteur et son motif",
      format: "ecran",
    },
    {
      src: pharmacie,
      alt: "La pharmacie et ses trois jalons",
      legende:
        "Le médecin prescrit, la pharmacie dispense, l'infirmier administre. Chaque ligne porte ses trois jalons dans l'ordre, et « Administrer » n'apparaît pas avant la dispensation : c'est exactement là que l'erreur médicamenteuse se produit",
      format: "ecran",
    },
    {
      src: supervision,
      alt: "Le tableau de bord de la direction",
      legende:
        "Six compteurs, et pas une courbe de processeur. Chacun porte la phrase qui dit ce qu'il veut dire quand il monte : un nombre sans sa lecture ne sert à personne",
      format: "ecran",
    },
    {
      src: journal,
      alt: "Le journal des lectures",
      legende:
        "Qui a ouvert quel dossier, accordé ou refusé. Un refus isolé n'est pas un indice — tout le monde se trompe d'onglet ; c'est la répétition qui en est un",
      format: "ecran",
    },
    {
      src: agenda,
      alt: "L'agenda et les séjours",
      legende:
        "Le séjour est le pivot, pas le rendez-vous : le rendez-vous n'était qu'une intention. Admettre un patient dans un service ouvre son dossier aux soignants de ce service, et le clore les referme",
      format: "ecran",
    },
    {
      src: connexion,
      alt: "L'écran de connexion",
      legende:
        "Six comptes de démonstration, et aucun n'a tous les droits : la direction voit la supervision et le journal, et ne peut pas ouvrir un dossier",
      format: "ecran",
    },
  ],
  stack: ["java", "spring", "angular", "postgresql", "redis", "docker", "kubernetes", "githubactions"],
  chiffres: [
    { valeur: 54, libelle: "tests, contre une vraie PostgreSQL" },
    { valeur: 4, libelle: "portes seulement ouvrent un dossier, et pas une de plus" },
    { valeur: 1, libelle: "commande lève tout : base, mémoire, serveur, client" },
  ],
  probleme:
    "Les logiciels d'hôpital qu'on trouve en exemple traitent le dossier médical comme un formulaire : on modifie une ligne, elle remplace l'ancienne ; on se connecte comme « médecin », on voit tout. Les deux sont faux, et c'est par là que les vrais incidents arrivent — une valeur corrigée sans qu'on sache laquelle était la bonne, et un dossier consulté par curiosité sans que personne ne le sache jamais.",
  solution:
    "Reprendre les trois mécanismes que les vrais systèmes de santé ont et que les exemples n'ont pas : l'amendement signé plutôt que la modification, le journal des lectures, et le lien de soin — le droit vient de la relation entre un soignant et un patient, pour la durée du soin, et il se referme à la fin.",
  sections: [
    {
      titre: "Les trois mécanismes du métier",
      points: [
        "**On n'efface jamais** : l'entité du dossier n'a aucun modificateur de contenu. Corriger insère une ligne qui en remplace une autre, avec auteur et motif ; l'ancienne reste lisible",
        "**Lire laisse une trace**, accordée ou refusée, et le journal s'écrit dans sa propre transaction : un refus qui disparaîtrait avec l'erreur qui l'a causé est un refus que personne ne verrait jamais",
        "**Quatre portes ouvrent un dossier** : un rendez-vous, une orientation acceptée, une affectation de service, un bris de glace. Rien d'autre",
        "**Une orientation n'ouvre rien** : c'est son acceptation qui ouvre le lien. Le piège serait de donner le dossier à tout un service dès qu'un confrère y pense",
        "**Le patient ne porte pas son papier à la main** : une orientation prévient le service visé, un résultat remonte chez celui qui l'a demandé",
      ],
    },
    {
      titre: "La logique camerounaise, et ce qu'elle change",
      texte:
        "La première version de ce projet décrivait un hôpital français, où l'argent suit le soin. Ici le médecin ne reçoit le patient que s'il a d'abord pris un ticket à la caisse.",
      points: [
        "Le passage à la caisse produit un bon de prise en charge, qui ouvre le séjour et ne sert qu'une fois",
        "**L'urgence n'est jamais bloquée**, quoi qu'il arrive, et la dette reste au compte : un système qui bloque tout sans exception tue des gens, un système qui ne bloque rien ne tient pas la caisse",
        "Les montants sont des entiers, en francs CFA. Un flottant finit par donner un solde faux de quelques unités, et une caisse qui ne tombe jamais juste perd la confiance de tout le monde",
        "Le solde n'est jamais stocké : il est recalculé. Une colonne de solde finit toujours par diverger de ses lignes",
      ],
    },
    {
      titre: "Ce que la sécurité veut dire ici",
      points: [
        "Le mot de passe est redemandé pour les gestes sensibles : une session dure huit heures, et un poste laissé sans surveillance dans un couloir permettrait sinon n'importe quoi. Sur un téléphone, le gestionnaire propose l'empreinte",
        "Une lecture hors des heures du service **ressort sans être refusée** : une garde existe. C'est bout à bout que la liste raconte une habitude",
        "Cocher « médecin » ne fait pas un médecin : un rôle soignant exige un titre constaté, et ce geste est séparé de l'embauche",
        "Le port de supervision est séparé du port public : les mesures disent le nombre de connexions refusées et les routes appelées, c'est-à-dire la carte interne du serveur",
        "Rien qui identifie un patient dans une mesure ni dans un journal technique : ils partent vers un agrégateur, sont lus par des développeurs sans lien de soin, et conservés bien au-delà de la requête",
      ],
    },
    {
      titre: "Comment on vérifie, et ce que la vérification a trouvé",
      texte:
        "Cinq familles de contrôles, les mêmes que celles du code : analyse à l'arrêt, attaque de l'application qui tourne, examen des bibliothèques, inventaire de ce qu'on embarque, modèle de menaces. Chacune a trouvé quelque chose de réel.",
      points: [
        "Les trois en-têtes de sécurité avaient disparu des pages : dans nginx, un `add_header` dans un bloc enfant **efface** ceux du parent au lieu de s'y ajouter",
        "Le serveur web tournait en root. L'image non privilégiée écoute sur 8080 — seul root peut ouvrir un port sous 1024",
        "La lecture des ordonnances ne contrôlait aucun accès, alors que prescrire et administrer l'exigeaient : n'importe quel agent connecté voyait le traitement de n'importe qui, et un traitement en cours dit la maladie",
        "**Admettre un patient n'ouvrait l'accès à personne** : trouvé par la sonde, pas par un test. Un patient sans rendez-vous n'était le patient de personne, et il fallait briser la glace pour le soigner — ce qui ferait du bris de glace la norme",
        "Un tirage au hasard sur la caisse a trouvé deux défauts qu'aucun scénario écrit à la main n'aurait vus : annuler un frais déjà payé rendait le solde négatif, et le compte se soldait à zéro en plein séjour",
      ],
    },
    {
      titre: "La plateforme, et ce qu'elle ne prétend pas être",
      points: [
        "Un seul service découpé en modules métier, pas des microservices : six services demandent six déploiements et une panne distribuée à déboguer, pour un seul développeur",
        "Les manifestes Kubernetes se vérifient **sans cluster** — 46 règles, chacune nommant la panne qu'elle évite : un contrôle qui exige un cluster est un contrôle qui ne tourne jamais",
        "Le canari est joué par le nombre de copies, et c'est écrit comme tel : un vrai canari se pilote au pourcentage avec un maillage de services. Le retour en arrière tient en une commande, parce qu'un retour en arrière qui en demande trois est un retour en arrière qu'on n'ose pas faire à trois heures du matin",
        "Les règles réseau ferment tout par défaut — dans Kubernetes, par défaut, n'importe quel conteneur peut joindre la base — et leur limite est écrite dans le fichier : elles n'ont d'effet que si le cluster installe un greffon qui les applique",
      ],
    },
  ],
  extraits: [
    {
      fichier: "dossier/EntreeDossier.java",
      langage: "java",
      commentaire:
        "La règle « on n'efface pas » n'est pas un commentaire : l'entité n'a aucun modificateur de contenu. Titre, valeur et mesure sont posés à la construction, et il n'existe aucun chemin pour les changer. Corriger insère une autre ligne qui dépasse celle-ci.",
      code: `/** Dépassée par une correction : elle reste lisible, elle ne fait plus foi. */
public void depasser() {
  this.courante = false;
}

/** Cette ligne corrige une autre, avec son motif. L'ancienne n'est pas touchée. */
public void corrige(UUID remplacee, String motif) {
  this.remplace = remplacee;
  this.motifAmendement = motif;
}`,
    },
    {
      fichier: "securite/ServiceAcces.java",
      langage: "java",
      commentaire:
        "Le verdict est un type scellé : un appelant ne peut pas oublier le cas du refus, le compilateur le lui refuse. Et la trace est écrite dans les deux cas — un accès refusé qui ne laisserait rien derrière lui est un accès refusé que personne ne verrait.",
      code: `public sealed interface Verdict {
  record Accorde(Porte porte, Instant jusqua) implements Verdict {}
  record Refuse(String raison, boolean brisPossible) implements Verdict {}
}`,
    },
    {
      fichier: "agenda/ServiceAgenda.java",
      langage: "java",
      commentaire:
        "Le trou que la sonde a trouvé. Admettre un patient dans un service, c'est le confier aux soignants de ce service. Sans ces trois lignes, un patient sans rendez-vous n'était le patient de personne, et la clôture refermait ce que rien n'ouvrait.",
      code: `int ouverts = acces.ouvrirPourLeService(serviceId, patientId, Porte.AFFECTATION, par);
journal.ecriture(
    par, patientId, "ouverture du séjour", genre + " — " + ouverts + " accès ouverts", null);`,
    },
    {
      fichier: "pharmacie/ServicePharmacie.java",
      langage: "java",
      commentaire:
        "Le contrôle est dans le service et pas dans l'écran, parce qu'un écran se contourne et qu'une deuxième interface arrivera un jour. C'est le scénario exact de l'erreur médicamenteuse : une ligne cochée « donnée » sur un médicament dont la pharmacie n'a jamais sorti la boîte.",
      code: `boolean dispensee =
    gestes.findByLigneIdOrderByInstant(ligneId).stream()
        .anyMatch(g -> "dispensation".equals(g.genre()) && g.fait());
if (!dispensee) {
  mesures.administrationImpossible();
  throw new IllegalStateException(
      "ce médicament n'a pas été dispensé par la pharmacie : rien à administrer");
}`,
    },
  ],
  lecons: [
    {
      titre: "Une sonde qui joue le parcours dans un vrai navigateur voit ce qu'aucun test ne regarde",
      texte:
        "Le défaut le plus grave du projet — admettre un patient n'ouvrait l'accès à personne — n'a été trouvé ni par les 54 tests ni par une relecture. Il a été trouvé parce qu'un programme a joué le parcours complet, dans Chrome, et a buté là où un soignant aurait buté.",
    },
    {
      titre: "Un contrôle qu'on n'a pas vu échouer n'est pas un contrôle",
      texte:
        "Une de mes règles de vérification affirmait que le port de supervision n'était publié nulle part. Elle passait alors que la faute était plantée exprès : une suite d'échappement avait transformé le motif de recherche en caractère de contrôle invisible. Verte, et fausse. Depuis, toute règle est éprouvée en plantant d'abord la faute qu'elle doit attraper.",
    },
    {
      titre: "Un nombre sans sa lecture ne sert à personne",
      texte:
        "Un tableau de bord qui montre la charge du processeur dit que la machine va bien pendant que l'hôpital va mal. Les six compteurs retenus portent, écrite à côté du chiffre, la phrase qui dit ce qu'il veut dire quand il monte — et une hausse des bris de glace n'est pas un problème de sécurité, c'est un problème d'organisation.",
    },
    {
      titre: "Chercher le métier avant d'écrire le code",
      texte:
        "Deux de mes propres décisions étaient fausses parce qu'elles décrivaient un hôpital français : l'argent suit le soin, et un médecin est créé en cochant une case. Au Cameroun on paie avant d'être reçu ; et le droit d'exercer ne vient pas de l'établissement, l'établissement le constate. Les deux ont été corrigées à la racine, pas contournées.",
    },
  ],
  feuilleDeRoute: [
    {
      titre: "Une vraie clé d'appareil pour les gestes sensibles",
      detail:
        "WebAuthn, à la place du mot de passe redemandé : l'empreinte du téléphone déverrouille une clé liée à l'appareil, et rien de réutilisable ne circule. Écrit comme prochaine étape plutôt que fait à moitié.",
      etat: "prevu",
    },
    {
      titre: "Le glisser-déposer des rendez-vous",
      detail:
        "DayPilot Lite pour Angular, sous licence Apache 2.0 : la bibliothèque fait le geste, les règles restent à nous — vérifier que le créneau est libre, refuser si quelqu'un l'a pris pendant qu'on glissait, garder l'ancien horaire.",
      etat: "prevu",
    },
    {
      titre: "Prometheus et Grafana branchés pour de vrai",
      detail:
        "Les mesures sortent déjà au format attendu et les règles d'alerte sont écrites, avec la conduite à tenir pour chacune. Il manque les deux conteneurs, et ils coûtent deux gigaoctets de mémoire en permanence : c'est pourquoi le tableau de bord lit les mesures directement.",
      etat: "prevu",
    },
  ],
  depots: [
    {
      libelle: "Dépôt du projet",
      url: DEPOT,
      visibilite: "prive",
      detail: "Projet complet : serveur Java, client Angular, manifestes, contrôles de sécurité",
    },
  ],
};

export default fiche;
