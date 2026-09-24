import type { Projet } from "../types";
import animationBras from "./animation-bras.gif";
import angleDistance from "./angle-selon-distance.png";
import gesteMesure from "./geste-mesure.png";
import gesteVitesse from "./geste-vitesse.png";
import assemblage from "./assemblage.jpg";
import chariot from "./chariot-lineaire.jpg";
import distanceCordes from "./distance-cordes.png";
import mediator from "./mediator-imprime.jpg";
import simulation from "./simulation-cinematique.png";
import supportMoteur from "./support-moteur.jpg";
import tendeur from "./tendeur-courroie.jpg";
import trajectoireOutil from "./trajectoire-outil.png";
import vitesses from "./vitesses-accelerations.png";

const DEPOT = "https://github.com/rivaldopiaplle-boop/git_robot-guitariste";
const CHAINE = `${DEPOT}/actions/workflows/ci.yml`;

const fiche: Projet = {
  slug: "robot-guitariste",
  ordre: 60,
  titre: "Robot guitariste",
  accroche: "Un robot qui joue de la guitare : modélisé, simulé, puis piloté par un STM32.",
  resume:
    "Projet pluridisciplinaire d'équipe : concevoir un mécanisme capable de se placer sur les frettes et d'attaquer la corde en rythme. Du geste humain filmé et analysé à la cinématique simulée, jusqu'au micrologiciel temps réel et à l'interface de pilotage. Contribution personnelle : la modélisation des mécanismes, les outils de simulation et l'intégration du système.",
  categorie: "robotique",
  statut: "termine",
  annee: "2025",
  cadre: "ENIB · projet pluridisciplinaire",
  equipe: "Projet d'équipe",
  couleur: "#c96a17",
  puce: "STM32F411",
  couverture: { src: assemblage, alt: "Assemblage mécanique du robot guitariste", format: "photo" },
  film: {
    src: "/videos/robot-guitariste.mp4",
    affiche: "/videos/robot-guitariste.webp",
    duree: "22 secondes, sans commentaire",
    legende:
      "La simulation de mouvement sortie de SolidWorks : le bras pivote au-dessus des cordes et le médiator vient les attaquer. C'est cette animation qui a servi à vérifier que le mécanisme ne se heurtait pas lui-même avant d'usiner les pièces.",
  },
  galerie: [
    {
      src: gesteMesure,
      alt: "Le geste du médiator relevé image par image",
      legende:
        "Le point de départ : le geste d'un guitariste filmé à cinquante images par seconde, puis suivi point par point. Étalonnage pris sur l'écart de onze millimètres entre deux cordes",
      format: "schema",
    },
    {
      src: gesteVitesse,
      alt: "Vitesse et accélération du geste mesuré",
      legende:
        "Ce que le mécanisme doit reproduire : 33,3 mm de balayage, 465 mm/s en pointe. Ces chiffres sont la cible ; les courbes de la simulation disent ce que le bras sait faire",
      format: "schema",
    },
    {
      src: animationBras,
      alt: "Animation de la cinématique du bras, avec les courbes de theta et de d",
      legende:
        "La simulation rejouée : le bras suit trois mouvements, et les deux courbes de droite montrent l'angle et la translation à chaque instant",
      format: "schema",
    },
    {
      src: vitesses,
      alt: "Position, vitesse et accélération des deux axes",
      legende:
        "Ce que ces courbes servent à décider : le mouvement adouci demande la moitié de l'accélération de l'aller-retour entretenu, pour une vitesse presque égale",
      format: "schema",
    },
    {
      src: trajectoireOutil,
      alt: "Chemin parcouru par l'outil dans le plan de la corde",
      legende: "Le chemin de l'outil dans le plan de la corde, pour les trois mouvements",
      format: "schema",
    },
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
  chiffres: [
    { valeur: 272, libelle: "points du geste suivis image par image" },
    { valeur: 33, suffixe: " mm", libelle: "de balayage à reproduire, soit trois cordes" },
    { valeur: 465, suffixe: " mm/s", libelle: "en pointe, la vitesse visée" },
    { valeur: 3, libelle: "mouvements simulés, comparés avant de choisir" },
  ],
  role: [
    "Modélisation complète des mécanismes : construction et ajustement des modèles cinématiques des articulations",
    "Outils de simulation : scripts Python pour les trajectoires, vitesses et accélérations, courbes de validation",
    "Analyse critique : comparaison des configurations mécaniques, points faibles, modifications justifiées",
    "Intégration globale : cohérence mécanique, électronique et logicielle, vérification des interactions",
    "Fiabilisation : précision, répétabilité et robustesse, vérifiées par simulation et essais",
    "Documentation technique : schémas, diagrammes de flux, tableaux de résultats, présentations",
    "Analyse du geste humain : prise de médiator filmée et décomposée image par image avec Kinovea",
    "Conception mécanique sous SolidWorks : translation le long du manche, bras de médiator, tendeur",
    "Micrologiciel STM32F411 : moteur pas-à-pas en micro-pas, solénoïde, tempo, mode accordage par DSP",
    "Interface de pilotage en Python sur liaison série : morceau, accordage, état du moteur",
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
  preuves: [
    {
      libelle: "Le micrologiciel compile hors de son atelier",
      url: `${CHAINE}?query=branch%3Amain`,
      detail:
        "À chaque poussée de code, une machine vierge installe le compilateur ARM, construit le micrologiciel STM32 avec les options du poste de travail, et affiche la place occupée en mémoire. Un projet embarqué qui ne compile que dans l'atelier de son auteur n'est pas reprenable",
      badge: `${CHAINE}/badge.svg?branch=main`,
    },
    {
      libelle: "La simulation rejouée par la chaîne",
      url: `${CHAINE}?query=branch%3Amain`,
      detail:
        "Le même passage rejoue la simulation cinématique et dépose ses images en résultat : elles se téléchargent sans rien installer",
    },
  ],
  demos: [
    {
      libelle: "Le médiator, à régler soi-même",
      url: "https://git-simulateur-mediator.vercel.app",
      detail:
        "Le modèle cinématique du porte-médiator, porté depuis les scripts du projet et rendu manipulable : la hauteur de la potence, la longueur du médiator, son inclinaison en fin de course et le diamètre de la corde se règlent, et le chemin de la pointe se redessine avec les instants de contact marqués. Site autonome, tout est calculé dans le navigateur",
    },
  ],
  depots: [
    {
      libelle: "Micrologiciel, simulation et interface",
      url: DEPOT,
      visibilite: "public",
      detail:
        "Le micrologiciel STM32 avec sa chaîne de compilation, le modèle cinématique et les scripts qui produisent les images, les pièces SolidWorks et les documents de l'équipe",
    },
    {
      libelle: "Le simulateur du médiator",
      url: "https://github.com/rivaldopiaplle-boop/git_simulateur-mediator",
      visibilite: "public",
      detail:
        "Le site autonome qui rend le modèle manipulable : la cinématique portée en TypeScript, le tracé du chemin de la pointe et la recherche du diamètre limite",
    },
  ],
};

export default fiche;
