import type { Projet } from "../types";
import cheminPointe from "./chemin-pointe.png";
import distanceALaCorde from "./distance-a-la-corde.png";
import coupeMediator from "./coupe-mediator.png";
import inclinaisonSelonD from "./inclinaison-selon-d.png";
import gesteReleve from "./geste-releve.png";
import assemblage from "./assemblage.jpg";
import chariot from "./chariot-lineaire.jpg";
import mediator from "./mediator-imprime.jpg";
import supportMoteur from "./support-moteur.jpg";
import tendeur from "./tendeur-courroie.jpg";

const DEPOT = "https://github.com/rivaldopiaplle-boop/git_robot-guitariste";
const CHAINE = `${DEPOT}/actions/workflows/ci.yml`;
const FIRMWARE = `${DEPOT}/blob/main/firmware/control_guitarra/Core/Src/main.c`;

const fiche: Projet = {
  slug: "robot-guitariste",
  ordre: 60,
  titre: "Robot guitariste",
  accroche: "Un robot qui joue de la guitare : modélisé, simulé, puis piloté par un STM32.",
  resume:
    "Projet pluridisciplinaire d'équipe : concevoir un mécanisme capable de se placer sur les frettes et d'attaquer la corde en rythme. Du geste humain filmé et analysé à la cinématique simulée, jusqu'au micrologiciel temps réel et à l'interface de pilotage. Contribution personnelle : la modélisation des mécanismes, les outils de simulation et l'intégration du système.",
  categorie: "robotique",
  // En ligne : l'atelier du médiator se manipule dans un navigateur. La fiche
  // portait encore « terminé, hors ligne », ce qui contredisait son propre
  // bouton « Voir en ligne ».
  statut: "en-ligne",
  annee: "2025",
  cadre: "ENIB · projet pluridisciplinaire",
  equipe: "Projet d'équipe, à deux",
  couleur: "#c96a17",
  puce: "STM32F411",
  couverture: { src: assemblage, alt: "Assemblage mécanique du robot guitariste", format: "photo" },
  film: {
    src: "/videos/mediator.mp4",
    affiche: "/videos/mediator.webp",
    duree: "7 min 43, commentée",
    legende:
      "L'atelier du médiator, en ligne : on règle la potence, la longueur de la lame et le diamètre de la corde, on lance, et on descend jusqu'au centième de la vitesse réelle pour voir la lame franchir la corde. Le film montre aussi le second espace, celui du chariot qui se déplace le long du manche, dont le profil de vitesse est celui du micrologiciel STM32.",
    chapitres: [
      { instant: 0, titre: "L'atelier" },
      { instant: 42, titre: "On déplace un panneau" },
      { instant: 61, titre: "On le rouvre depuis le rail" },
      { instant: 80, titre: "Le montage" },
      { instant: 112, titre: "La bascule en fin de course" },
      { instant: 138, titre: "La corde" },
      { instant: 160, titre: "Le diamètre limite" },
      { instant: 186, titre: "Le jeu" },
      { instant: 224, titre: "On lance" },
      { instant: 247, titre: "Quarante fois plus lent" },
      { instant: 285, titre: "L'inclinaison" },
      { instant: 310, titre: "La vitesse du médiator" },
      { instant: 342, titre: "Aller à une position" },
      { instant: 354, titre: "Le chariot du manche" },
      { instant: 379, titre: "Trapèze ou triangle" },
      { instant: 401, titre: "La table de minuterie" },
      { instant: 422, titre: "Les frettes" },
      { instant: 435, titre: "Le micrologiciel" },
      { instant: 448, titre: "L'adresse" },
    ],
  },
  films: [
    {
      src: "/videos/robot-guitariste.mp4",
      affiche: "/videos/robot-guitariste.webp",
      duree: "22 secondes, sans commentaire",
      legende:
        "La simulation de mouvement sortie de SolidWorks : le bras pivote au-dessus des cordes et le médiator vient les attaquer. C'est cette animation qui a servi à vérifier que le mécanisme ne se heurtait pas lui-même avant d'usiner les pièces.",
    },
  ],
  galerie: [
    {
      src: gesteReleve,
      alt: "Le geste d'un guitariste relevé image par image : chemin du médiator et vitesse",
      legende:
        "Le point de départ : le geste d'un guitariste filmé à cinquante images par seconde, puis suivi point par point, l'étalonnage étant pris sur l'écart de onze millimètres entre deux cordes. Le chemin à gauche, la vitesse à droite, et les deux chiffres qui fixent la cible : 33,3 mm de balayage, 465 mm/s en pointe, relevés sur la même prise",
      format: "schema",
    },
    {
      src: coupeMediator,
      alt: "Le mécanisme à l'instant où le médiator touche la corde",
      legende:
        "Le mécanisme dans le plan où la corde est un cercle, pris à un instant de contact : la potence à gauche, la translation en haut, puis le bras et le médiator dont la lame s'efface contre la corde. Les cotes sont en millimètres, et elles sortent du modèle du projet",
      format: "schema",
    },
    {
      src: cheminPointe,
      alt: "Chemin de la pointe du médiator sur une période, contacts marqués",
      legende:
        "Le chemin de la pointe sur une période entière. Les points orange sont les instants de contact : la lame ne traverse pas la corde, elle pivote jusqu'à lui rester tangente",
      format: "schema",
    },
    {
      src: inclinaisonSelonD,
      alt: "Inclinaison totale du médiator selon la translation",
      legende:
        "L'inclinaison totale en fonction de la translation. Les deux branches sont l'aller et le retour, et le décrochement de chacune est le contact",
      format: "schema",
    },
    { src: assemblage, alt: "Assemblage du robot", legende: "L'assemblage : translation sur les frettes et bras de médiator", format: "photo" },
    { src: chariot, alt: "Chariot linéaire", legende: "Chariot linéaire : le déplacement le long du manche", format: "photo" },
    { src: supportMoteur, alt: "Support du moteur pas-à-pas", legende: "Support du moteur pas-à-pas", format: "photo" },
    { src: tendeur, alt: "Système tendeur de courroie", legende: "Tendeur de courroie : la précision de positionnement", format: "photo" },
    { src: mediator, alt: "Médiator imprimé en 3D", legende: "Médiator imprimé en 3D", format: "photo" },
    {
      src: distanceALaCorde,
      alt: "Distance de la pointe du médiator à l'axe de la corde, au fil d'une période",
      legende:
        "Deux contacts par période : la pointe descend jusqu'au rayon de la corde, y reste le temps de l'attaque, puis s'en éloigne. Le palier au niveau de la bande orange est le contact lui-même.",
      format: "schema",
    },
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
      texte:
        "Une carte STM32F411 pilote l'ensemble, en un peu plus de mille huit cents lignes de C. Ce n'est pas un exercice de clignotement de diode : il y a une machine à états, un profil de vitesse calculé d'avance, une chaîne de traitement du signal et un protocole série.",
      points: [
        "Une machine à états en cinq positions : pas calibré, moteur alimenté, prise d'origine en cours, position référencée, déplacement en cours. Rien ne bouge tant que l'origine n'a pas été prise",
        "Un profil de vitesse trapézoïdal calculé avant le mouvement, avec repli sur un profil triangulaire quand la distance est trop courte pour atteindre la vitesse de croisière. Les bornes sont posées : 550 mm/s et 5000 mm/s²",
        "Une table de valeurs de minuterie précalculée pas par pas : l'interruption ne calcule rien, elle recopie deux registres. Tout le flottant est fait avant de lancer le mouvement",
        "Les positions des vingt-deux frettes en gamme tempérée, corrigées de 17,2 mm, la moitié du chariot porte-solénoïde : une formule de musique et une correction de mécanique dans la même ligne",
        "Un accordage par traitement du signal : acquisition à 8 kHz par accès direct à la mémoire, tampon de 8192 points, transformée de Fourier rapide de CMSIS-DSP pour en tirer la fréquence de la corde",
        "Un protocole série d'une lettre par commande, et une interface de pilotage en Python qui le parle depuis un terminal",
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
      fichier: "firmware/control_guitarra/Core/Src/main.c",
      langage: "c",
      commentaire:
        "Le profil de vitesse est calculé avant le mouvement et rangé dans une table, une entrée par pas. Pendant le déplacement, l'interruption ne fait plus que recopier deux registres : c'est ce qui évite de perdre des pas.",
      code: `// Precompute timer values for each step
for (uint16_t step = 0; step < total_steps; step++) {
  float t = (float)step / (float)total_steps * total_time;

  if (t < acceleration_time) {
    kinematic.velocity = (float)MAX_ACCELERATION * t;
  } else if (t < acceleration_time + cruise_time) {
    kinematic.velocity = MAX_VELOCITY;
  } else {
    kinematic.velocity = MAX_VELOCITY - MAX_ACCELERATION * (t - acceleration_time - cruise_time);
  }

  TimerValues values = calculate_arr_psc(kinematic.velocity * MICROSTEPS);
  arr_array[step] = values.arr;
  psc_array[step] = values.psc;
}`,
    },
    {
      fichier: "firmware/control_guitarra/Core/Src/main.c",
      langage: "c",
      commentaire:
        "Les frettes en gamme tempérée, corrigées de la moitié du chariot porte-solénoïde. La formule de musique et la correction de mécanique tiennent dans trois lignes.",
      code: `void calculate_fret_positions() {
  float offset = 17.2f; // moitie du chariot porte-solenoide [mm]

  for (int i = 0; i < NUM_FRETS; i++) {
    // gamme temperee : L * (1 - 2^(-i/12))
    float raw_position = string_length * (1.0f - 1.0f / powf(2.0f, i / 12.0f));
    fret_positions[i] = raw_position - offset;
    if (fret_positions[i] < 0.0f) fret_positions[i] = 0.0f;
  }
}`,
    },
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
      libelle: "La publication LinkedIn",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7509194904330207232/",
      detail: "Le projet raconté en public, avec le binôme et l'atelier du médiator",
    },
    {
      libelle: "Le profil de vitesse, calculé avant le mouvement",
      url: `${FIRMWARE}#L1026-L1085`,
      detail:
        "Trapèze, repli sur un triangle quand la distance est courte, puis la table de minuterie remplie pas par pas",
    },
    {
      libelle: "Les frettes en gamme tempérée",
      url: `${FIRMWARE}#L1119-L1134`,
      detail: "La formule de musique, et la correction de dix-sept millimètres deux du chariot",
    },
    {
      libelle: "L'accordage par transformée de Fourier",
      url: `${FIRMWARE}#L1385-L1426`,
      detail: "Acquisition à huit kilohertz, tampon de huit mille points, CMSIS-DSP pour la fréquence",
    },
    {
      libelle: "Le protocole série, une lettre par commande",
      url: `${FIRMWARE}#L1590-L1800`,
      detail: "Vitesse, prise d'origine, position, solénoïde, tempo, séquence de notes, longueur de corde",
    },
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
        "Un atelier à panneaux déplaçables : on règle la potence, la longueur du médiator, son inclinaison et le diamètre de la corde, on lance, on entend la corde, et on peut descendre jusqu'au centième de la vitesse réelle pour voir la lame franchir la corde. Site autonome, tout est calculé dans le navigateur",
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
        "Le code du site, dans une version antérieure et volontairement plus simple : la cinématique portée en TypeScript, le tracé du chemin de la pointe et la recherche du diamètre limite. La version en ligne, celle qui porte l'atelier à panneaux, le son et le manche, vit dans un dépôt privé",
    },
  ],
};

export default fiche;
