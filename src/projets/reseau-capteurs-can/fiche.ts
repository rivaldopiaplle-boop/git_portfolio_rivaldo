import type { Projet } from "../types";
import dispositionComplete from "./disposition-complete.webp";
import orientation3d from "./orientation-3d.webp";
import courbes from "./courbes-en-temps-reel.webp";
import bancReglable from "./banc-reglable.webp";
import panneauDetache from "./panneau-detache.webp";

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
    src: dispositionComplete,
    alt: "L'atelier du réseau de capteurs : banc de réglage, courbes en temps réel, mesures et trames",
  },
  galerie: [
    {
      src: dispositionComplete,
      alt: "La disposition complète : banc à gauche, courbes au centre, mesures à droite, trames en bas",
      legende:
        "La disposition d'un logiciel de conception, en miniature : les réglages à gauche, la vue qui compte au centre, les mesures à droite, les trames en bas. Chaque panneau se déplace à la souris, se détache en fenêtre, se referme et se rouvre depuis le menu Affichage.",
      format: "ecran",
    },
    {
      src: bancReglable,
      alt: "Le banc d'essai : consignes de vent, d'angles, d'ambiance et de proximité",
      legende:
        "Le banc répond à une question simple : d'où sortent ces chiffres ? Sans capteur branché, ils sortent d'ici, et le panneau le dit avant le premier curseur. Chaque consigne agit dans la seconde sur la courbe et sur la jauge.",
      format: "ecran",
    },
    {
      src: courbes,
      alt: "Courbes en temps réel : la vitesse du vent suit sa consigne en trapèze",
      legende:
        "Le régime en rampe montre ce qu'une jauge seule ne montre pas : la vitesse monte à accélération bornée, tient la consigne, redescend. La consigne est en pointillés orange, la mesure en bleu. Les tracés viennent de pyqtgraph, la bibliothèque de tracé en temps réel de l'écosystème Qt.",
      format: "ecran",
    },
    {
      src: orientation3d,
      alt: "L'orientation en 3D, et les trois angles d'Euler lus en direct",
      legende:
        "L'orientation reconstituée par la fusion de capteurs, en OpenGL, avec les trois angles lus sous la vue et la cadence réelle des trames : le repère tourne parce qu'une trame arrive, et non parce qu'une animation tourne toute seule.",
      format: "ecran",
    },
    {
      src: panneauDetache,
      alt: "Un panneau détaché de la fenêtre, posé au-dessus des courbes",
      legende:
        "Un panneau s'attrape par son titre et se pose ailleurs, ou sort en fenêtre à lui. C'est l'ancrage fourni avec Qt, celui des logiciels de conception, et non un mécanisme réécrit pour l'occasion.",
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
        "Une commande lance le réseau simulé et l'interface ensemble, ouvre chaque page, presse chaque bouton et photographie le résultat",
        "Une capture prise sur le vrai bus se rejoue dans l'interface, à la cadence où elle a été prise",
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
        "La page des réglages affichait un bus imaginaire, proposait des thèmes qui n'existaient pas et un bouton « Sauvegarder » relié à rien. Elle montre maintenant l'état réel du bus, et ses deux boutons agissent. Le banc simulé, lui, obéit aux commandes que l'interface envoie : presser « Démarrer moteur » fait vraiment monter la vitesse du vent.",
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
