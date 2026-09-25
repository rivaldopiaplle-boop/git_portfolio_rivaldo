import type { Projet } from "../types";
import disposition from "./disposition.webp";
import centrale from "./centrale-a-la-main.webp";
import tempsDeVol from "./temps-de-vol.webp";
import luminosite from "./luminosite.webp";
import anemometre from "./anemometre.webp";
import courbes from "./courbes.webp";

const fiche: Projet = {
  slug: "reseau-capteurs-can",
  ordre: 72,
  titre: "Réseau de capteurs sur bus CAN",
  accroche: "Des cartes STM32 qui mesurent, un bus CAN qui transporte, une interface qui montre l'orientation en 3D.",
  resume:
    "Des nœuds STM32 lisent humidité, température, pression, distance, vitesse du vent et centrale inertielle, puis publient leurs mesures sur un bus CAN, le réseau des automobiles, où chaque trame porte un identifiant plutôt qu'une adresse. Une interface PyQt les affiche en direct, avec l'orientation reconstituée par fusion des capteurs.",
  categorie: "robotique",
  statut: "termine",
  annee: "2026",
  cadre: "ENIB · réseaux et systèmes embarqués",
  equipe: "Projet d'équipe",
  role: [
    "Le programme principal du micrologiciel, `main.c` : l'ordonnancement des six capteurs, chacun à son rythme et sans attente bloquante",
    "Le plan d'identifiants CAN, et la composition de chaque trame à partir des mesures",
    "L'interface PyQt5 : écoute du bus avec python-can, orientation affichée en 3D avec OpenGL",
    "La reprise de 2026 : mode de démonstration sans matériel, banc réglable, courbes en temps réel, disposition en panneaux ancrables",
    "Les pilotes de bus et les bibliothèques de capteurs fournis par le cours sont appelés, non écrits",
  ],
  couleur: "#2f8f6b",
  puce: "STM32F1 · CAN",
  couverture: {
    src: centrale,
    alt: "La centrale inertielle : on attrape le solide à la souris et on le tourne",
  },
  galerie: [
    {
      src: centrale,
      alt: "Le solide 3D tourné à la souris, et les angles mesurés qui suivent",
      legende:
        "On attrape le solide et on le tourne. La centrale lit son orientation, compose sa trame et l'envoie sur le bus ; ce qui s'affiche, les trois angles et la cadence de 47 trames par seconde, vient du bus. Le geste n'écrit rien dans un afficheur.",
      format: "ecran",
    },
    {
      src: tempsDeVol,
      alt: "Le capteur de temps de vol, et la cible qu'on éloigne à la souris",
      legende:
        "La cible s'attrape et s'éloigne du capteur : la distance mesurée suit le geste, bornée à la portée réelle du VL6180X. Les réglages de l'objet sélectionné apparaissent à gauche, pour faire la même chose sans souris.",
      format: "ecran",
    },
    {
      src: luminosite,
      alt: "Le même capteur en luminosité : une main masque la lampe et l'éclairement tombe",
      legende:
        "Le même composant bascule en mesure d'éclairement. La lampe éclaire en 1/d², et la main qu'on interpose projette une ombre d'autant plus large qu'elle est proche de la lampe. Ici, 60 lux au lieu de 1400.",
      format: "ecran",
    },
    {
      src: anemometre,
      alt: "L'anémomètre : un soufflet qu'on agite, une hélice qui tourne, une réserve qui se remplit",
      legende:
        "Le vent ne se règle pas, il se produit : on approche le soufflet de l'hélice et on l'agite. L'énergie récoltée s'accumule, et le moteur ne démarre que lorsque la réserve le permet. C'est la seule commande à qui la scène peut dire non.",
      format: "ecran",
    },
    {
      src: courbes,
      alt: "Les courbes en temps réel portent la trace des trois gestes",
      legende:
        "Les quatre tracés sur les soixante dernières secondes : les rafales produites au soufflet, l'orientation imposée à la main, l'ambiance, et la mesure du temps de vol qui saute au moment du basculement. Les tracés viennent de pyqtgraph.",
      format: "ecran",
    },
    {
      src: disposition,
      alt: "La disposition complète : réglages à gauche, scène au centre, mesures à droite, trames en bas",
      legende:
        "La disposition d'un logiciel de conception, en miniature. Chaque panneau s'attrape par son titre, se pose ailleurs, se détache en fenêtre, se referme et se rouvre depuis le menu Affichage. C'est l'ancrage fourni avec Qt.",
      format: "ecran",
    },
  ],
  stack: ["c", "stm32", "can", "python", "qt"],
  chiffres: [
    { valeur: 6, libelle: "capteurs interrogés" },
    { valeur: 527, libelle: "lignes du programme principal, la part personnelle" },
    { valeur: 4, libelle: "bus pilotés : CAN, I²C, SPI, UART" },
    { valeur: 1, suffixe: " commande", libelle: "pour lancer la démonstration, sans matériel" },
  ],
  probleme:
    "Chaque capteur parle sa propre langue : l'un sur I²C, l'autre sur SPI, un troisième par impulsions. Il faut les lire sans se bloquer, puis faire tenir toutes ces mesures sur un même bus partagé.",
  solution:
    "Un pilote par bus, un module par capteur, et une boucle qui interroge chacun à son propre rythme. Les mesures partent en trames CAN, qu'une interface de bureau écoute et affiche.",
  sections: [
    {
      titre: "Les nœuds",
      points: [
        "Pilotes CAN, I²C, SPI et UART écrits pour la carte",
        "HTS221 (humidité, température), LPS22HB (pression), VL6180X (distance), anémomètre par impulsions",
        "Centrale MPU9250, orientation calculée par l'algorithme de Madgwick",
        "Servomoteur Dynamixel commandé sur la liaison série",
      ],
    },
    {
      titre: "L'interface",
      points: [
        "PyQt5 pour les écrans, python-can pour écouter le bus, OpenGL pour l'orientation en 3D",
        "Chaque mesure est associée à l'identifiant de trame qui la porte",
      ],
    },
    {
      titre: "Le montrer sans carte ni bus",
      texte:
        "L'interface ouvrait socketcan sur can0 : il fallait Linux et un vrai bus, donc le projet ne se lançait nulle part ailleurs, et personne ne pouvait le voir tourner. Une reprise l'a rendu démontrable sur n'importe quelle machine, en appelant ce qui existait déjà plutôt qu'en réécrivant le transport.",
      points: [
        "Le bus se choisit par deux variables d'environnement, et garde son comportement d'origine par défaut",
        "python-can fournit une interface en mémoire, sans pilote ni matériel : c'est elle qui porte la démonstration",
        "Les trames sont décrites une fois dans un fichier DBC, le format standard du métier, que le banc et les outils lisent tous les deux",
        "Une commande lance le réseau simulé et l'interface ensemble, déroule la démonstration seule et photographie le résultat",
        "Une capture prise sur le vrai bus se rejoue dans l'interface, à la cadence où elle a été prise",
      ],
    },
    {
      titre: "Les trois mondes manipulables",
      texte:
        "Une première version proposait des curseurs : on réglait « vent = 9 m/s » et la jauge affichait 9 m/s. Une tautologie, qui ne prouve rien. Ce qu'on manipule maintenant, c'est une scène physique ; le capteur la lit, compose sa trame, l'envoie sur le bus, et l'interface affiche ce qu'elle reçoit. La chaîne entière est exercée à chaque geste.",
      points: [
        "La centrale : on attrape le solide et on le tourne, au bouton gauche pour le roulis et le tangage, au bouton droit pour le lacet",
        "Le temps de vol : on éloigne une cible du capteur, ou on masque une lampe avec une main dont on règle la taille et la position",
        "L'anémomètre : on agite un soufflet devant l'hélice, l'énergie s'accumule, et le moteur ne démarre que si la réserve le permet",
        "Sélectionner un objet fait apparaître ses réglages à gauche : le même contrôle, sans souris",
        "Les scènes 2D sont des QGraphicsScene de Qt, avec ses objets déplaçables et sélectionnables : le glisser-déposer vient du cadre, pas d'un mécanisme réécrit",
      ],
    },
  ],
  lecons: [
    {
      titre: "Un projet qui ne se lance que sur le poste de son auteur ne se montre pas",
      texte:
        "Le code était complet et le montage avait fonctionné, mais l'adresse du bus était écrite en dur au milieu du fichier. Il a suffi de deux variables d'environnement pour que le projet redevienne démontrable, sans rien changer à ce qu'il fait sur le vrai réseau.",
    },
    {
      titre: "Un bouton qui ne fait rien est pire qu'un bouton absent",
      texte:
        "La page des réglages affichait un bus imaginaire, proposait des thèmes qui n'existaient pas et un bouton « Sauvegarder » relié à rien. Elle a disparu : ce qu'elle prétendait régler est maintenant dans la barre d'état, ou dans les scènes, ou nulle part parce que cela n'existait pas.",
    },
    {
      titre: "Simuler n'est pas afficher ce qu'on vient de saisir",
      texte:
        "Régler un curseur pour voir une jauge afficher la même valeur ne démontre rien : c'est une tautologie. Ce qui démontre quelque chose, c'est un geste sur une scène dont un capteur tire une mesure, qui devient une trame, qui traverse le bus, et que l'interface affiche. La même exigence qu'une démonstration sur le vrai matériel, à ceci près que le monde est dessiné.",
    },
    {
      titre: "Une démonstration qu'on regarde à l'oeil se croit sur parole",
      texte:
        "Le déroulé de la démonstration est écrit dans le programme : il ouvre chaque page, presse chaque bouton, photographie, et refuse une capture qui pèse moins de dix kilo-octets, parce qu'une page restée noire pèse ce poids-là. Les images de cette fiche sortent de là.",
    },
  ],
  extraits: [
    {
      fichier: "rescapt/src/main.c",
      langage: "c",
      commentaire: "Le programme principal, la part personnelle du micrologiciel. Chaque capteur a son rythme : le vent se compte toutes les 100 ms, l'ambiance bien plus lentement. Une seule boucle, des échéances séparées, sans attente bloquante.",
      code: `hts221_activate();          /* humidité et température */
hts221_storeCalibration();
lps22hb_setup();            /* pression */
anemo_Timer1Init();         /* anémomètre : comptage d'impulsions */
mpu9250_InitMPU9250();      /* centrale inertielle */
mpu9250_CalibrateMPU9250();
mpu9250_InitAK8963(magCalibration);

while (1) {
    uint32_t now = tickTimer_getTick();

    if ((now - last_anemo_tick) >= 100) {
        last_anemo_tick = now;
        /* lecture du vent, puis envoi de la trame CAN */
    }
}`,
    },
    {
      fichier: "rescapt/src/drv_can.c",
      langage: "c",
      commentaire: "Ce pilote vient du cours, et il est montré pour ce qu'il explique : sur un bus CAN, il n'y a pas de destinataire. Une trame porte un identifiant, et chaque nœud décide si elle le concerne.",
      code: `CanHandle.pTxMsg->IDE = msg.format == CANStandard ? CAN_ID_STD : CAN_ID_EXT;

/* à la réception : l'identifiant dit quelle mesure arrive */
msg->id     = CanHandle.pRxMsg->IDE == CAN_ID_STD
              ? CanHandle.pRxMsg->StdId : CanHandle.pRxMsg->ExtId;
msg->format = CanHandle.pRxMsg->IDE == CAN_ID_STD ? CANStandard : CANExtended;`,
    },
  ],
  depots: [{ libelle: "Micrologiciel et interface", url: "https://github.com/rivaldopiaplle-boop/git_reseau-capteurs", visibilite: "prive", detail: "Dépôt privé : il mêle du code fourni par le cours. La part personnelle est le programme principal `main.c`, le plan de trames et toute l'interface" }],
};

export default fiche;
