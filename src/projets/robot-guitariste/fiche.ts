import type { Projet } from "../types";
import angleDistance from "./angle-selon-distance.png";
import assemblage from "./assemblage.jpg";
import chariot from "./chariot-lineaire.jpg";
import distanceCordes from "./distance-cordes.png";
import mediator from "./mediator-imprime.jpg";
import simulation from "./simulation-cinematique.png";
import supportMoteur from "./support-moteur.jpg";
import tendeur from "./tendeur-courroie.jpg";

const fiche: Projet = {
  slug: "robot-guitariste",
  ordre: 60,
  titre: "Robot guitariste",
  accroche: "Un robot qui joue de la guitare : modélisé, simulé, puis piloté par un STM32.",
  resume:
    "Projet pluridisciplinaire d'équipe : concevoir un mécanisme capable de se placer sur les frettes et d'attaquer la corde en rythme. Du geste humain filmé et analysé à la cinématique simulée, jusqu'au micrologiciel temps réel et à l'interface de pilotage. Contribution personnelle : la modélisation des mécanismes, les outils de simulation et l'intégration du système.",
  categorie: "robotique",
  statut: "termine",
  annee: "2026",
  cadre: "ENIB · projet pluridisciplinaire",
  equipe: "Projet d'équipe",
  couleur: "#c96a17",
  puce: "STM32F411",
  couverture: { src: assemblage, alt: "Assemblage mécanique du robot guitariste", format: "photo" },
  galerie: [
    { src: assemblage, alt: "Assemblage du robot", legende: "L'assemblage : translation sur les frettes et bras de médiator", format: "photo" },
    { src: chariot, alt: "Chariot linéaire", legende: "Chariot linéaire : le déplacement le long du manche", format: "photo" },
    { src: supportMoteur, alt: "Support du moteur pas-à-pas", legende: "Support du moteur pas-à-pas", format: "photo" },
    { src: tendeur, alt: "Système tendeur de courroie", legende: "Tendeur de courroie : la précision de positionnement", format: "photo" },
    { src: mediator, alt: "Médiator imprimé en 3D", legende: "Médiator imprimé en 3D", format: "photo" },
    { src: simulation, alt: "Simulation cinématique du bras", legende: "Simulation : la chaîne cinématique du bras, en Python", format: "schema" },
    { src: angleDistance, alt: "Courbe de l'angle total selon la distance", legende: "Angle total en fonction de la distance", format: "schema" },
    { src: distanceCordes, alt: "Distances entre cordes", legende: "Distances corde à corde", format: "schema" },
  ],
  stack: ["python", "c", "stm32", "arm", "solidworks"],
  role: [
    "Modélisation complète des mécanismes : construction et ajustement des modèles cinématiques des articulations",
    "Outils de simulation : scripts Python pour les trajectoires, vitesses et accélérations, courbes de validation",
    "Analyse critique : comparaison des configurations mécaniques, points faibles, modifications justifiées",
    "Intégration globale : cohérence mécanique, électronique et logicielle, vérification des interactions",
    "Fiabilisation : précision, répétabilité et robustesse, vérifiées par simulation et essais",
    "Documentation technique : schémas, diagrammes de flux, tableaux de résultats, présentations",
  ],
  sections: [
    {
      titre: "Le micrologiciel",
      texte: "Une carte STM32F411 pilote l'ensemble.",
      points: [
        "Moteur pas-à-pas en micro-pas (1/32) sur poulie, avec prise d'origine",
        "Solénoïde pour attaquer la corde",
        "Séquences de frettes et tempo en BPM, chargés par morceau",
        "Acquisition ADC par DMA et bibliothèque CMSIS-DSP pour le mode accordage",
        "Codes d'erreur explicites : frette hors plage, prise d'origine non faite, BPM invalide",
      ],
    },
    {
      titre: "Comprendre avant de construire",
      points: [
        "Geste du médiator filmé et analysé image par image avec Kinovea",
        "Mécanisme de translation et de rotation modélisé sous SolidWorks",
        "Interface Python en terminal sur liaison série : morceau, accordage, état du moteur",
      ],
    },
  ],
  extraits: [
    {
      fichier: "hmi_guitarra.py",
      langage: "python",
      commentaire: "La fréquence de chaque note, calculée depuis le La 440 Hz, pour l'accordage.",
      code: `NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
A4_INDEX = NOTE_NAMES.index('A') + 12 * 4  # indice MIDI du La 4

def note_freq(note, octave):
    n = NOTE_NAMES.index(note) + 12 * octave
    return 440.0 * (2 ** ((n - A4_INDEX) / 12))`,
    },
  ],
  depots: [{ libelle: "Micrologiciel, simulation et interface", url: null, visibilite: "public" }],
};

export default fiche;
