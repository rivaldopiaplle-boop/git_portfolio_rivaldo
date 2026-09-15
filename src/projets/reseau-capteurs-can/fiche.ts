import type { Projet } from "../types";

const fiche: Projet = {
  slug: "reseau-capteurs-can",
  ordre: 72,
  titre: "Réseau de capteurs sur bus CAN",
  accroche: "Des cartes STM32 qui mesurent, un bus CAN qui transporte, une interface qui montre l'orientation en 3D.",
  resume:
    "Des nœuds STM32 lisent humidité, température, pression, distance, vitesse du vent et centrale inertielle, puis publient leurs mesures sur un bus CAN — le réseau des automobiles, où chaque trame porte un identifiant plutôt qu'une adresse. Une interface PyQt les affiche en direct, avec l'orientation reconstituée par fusion des capteurs.",
  categorie: "robotique",
  statut: "termine",
  annee: "2025 — 2026",
  cadre: "ENIB · réseaux et systèmes embarqués",
  couleur: "#2f8f6b",
  puce: "STM32F1 · CAN",
  stack: ["c", "stm32", "can", "python", "qt"],
  chiffres: [
    { valeur: 6, libelle: "capteurs interrogés" },
    { valeur: 1400, libelle: "lignes pour l'interface" },
    { valeur: 4, libelle: "bus pilotés : CAN, I²C, SPI, UART" },
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
  ],
  extraits: [
    {
      fichier: "rescapt/src/main.c",
      langage: "c",
      commentaire: "Chaque capteur a son rythme : le vent se compte toutes les 100 ms, l'environnement bien plus lentement. Une seule boucle, des échéances séparées — pas d'attente bloquante.",
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
      commentaire: "Sur un bus CAN, il n'y a pas de destinataire : une trame porte un identifiant, et chaque nœud décide si elle le concerne.",
      code: `CanHandle.pTxMsg->IDE = msg.format == CANStandard ? CAN_ID_STD : CAN_ID_EXT;

/* à la réception : l'identifiant dit quelle mesure arrive */
msg->id     = CanHandle.pRxMsg->IDE == CAN_ID_STD
              ? CanHandle.pRxMsg->StdId : CanHandle.pRxMsg->ExtId;
msg->format = CanHandle.pRxMsg->IDE == CAN_ID_STD ? CANStandard : CANExtended;`,
    },
  ],
  depots: [{ libelle: "Micrologiciel et interface", url: null, visibilite: "public" }],
};

export default fiche;
