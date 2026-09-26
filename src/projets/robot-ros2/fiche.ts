import type { Projet } from "../types";
import piloteAutomatique from "./pilote-automatique.webp";
import pilotageManuel from "./pilotage-manuel.webp";
import suiveurDeCible from "./suiveur-de-cible.webp";

const fiche: Projet = {
  slug: "robot-ros2",
  ordre: 70,
  titre: "Robot mobile ROS 2",
  accroche: "Un robot qui voit et suit une cible : micro-ROS sur STM32, vision OpenCV sur Raspberry Pi.",
  resume:
    "Base robotique pilotée par un STM32 sous FreeRTOS, reliée à ROS 2 par micro-ROS. Une Raspberry Pi filme, isole une cible verte, calcule son barycentre et sa surface, et publie le tout ; le robot s'y abonne pour se diriger. Une interface PyQt supervise l'ensemble.",
  categorie: "robotique",
  // En ligne : l'atelier reprend les trois modes dans un navigateur.
  statut: "en-ligne",
  annee: "2026",
  cadre: "ENIB · projet pluridisciplinaire",
  equipe: "Projet d'équipe",
  couleur: "#0e8fa8",
  puce: "micro-ROS",
  stack: ["c", "stm32", "freertos", "ros", "raspberrypi", "python", "opencv", "qt"],
  role: [
    "Base temps réel : STM32F411 sous FreeRTOS, nœud micro-ROS qui publie capteurs et vitesses",
    "Motorisation : PWM à 50 kHz, commandes de déplacement et de vitesse reçues de ROS 2",
    "Capteurs : temps de vol VL53L0X, infrarouges, vitesse de chaque moteur",
    "Vision sur Raspberry Pi : OpenCV, seuillage HSV, barycentre et surface de la cible publiés",
    "Architecture ROS 2 : qualité de service par flux, fils d'exécution et files bornées",
    "Intégration et essais du robot complet, du capteur à la décision de trajectoire",
  ],
  sections: [
    {
      titre: "La base, en temps réel",
      texte: "STM32F411 sous FreeRTOS, nœud micro-ROS « STM32_Node ».",
      points: [
        "Publie la distance arrière (VL53L0X), les deux capteurs infrarouges et la vitesse de chaque moteur",
        "S'abonne aux commandes de déplacement et de vitesse, et aux données de vision",
        "Moteurs pilotés en PWM à 50 kHz sur le TIMER 3",
        "Transport micro-ROS par DMA, allocateurs dédiés",
      ],
    },
    {
      titre: "La vision, distribuée",
      texte: "La Raspberry Pi publie sur ROS 2, le robot et l'interface s'abonnent.",
      points: [
        "Passage en HSV et seuillage du vert, ouverture morphologique pour éliminer le bruit",
        "Barycentre et surface de la cible publiés sur /camera/bary_x et /camera/surface",
        "Qualité de service différenciée : images en best-effort, données en reliable",
        "Un fil d'exécution et une file bornée par flux, pour ne jamais bloquer la capture",
      ],
    },
  ],
  extraits: [
    {
      fichier: "RASPISEND/send_camera.py",
      langage: "python",
      commentaire: "Isoler la cible verte et calculer son barycentre. L'ouverture morphologique remplace dilatation puis érosion : même résultat, en une passe.",
      code: `hsv = cv2.cvtColor(rgb_frame, cv2.COLOR_BGR2HSV)

lower_green = np.array([35, 60, 60])
upper_green = np.array([85, 255, 255])
thresh_img = cv2.inRange(hsv, lower_green, upper_green)

kernel = np.ones((5, 5), dtype=np.uint8)
eroded_image = cv2.morphologyEx(thresh_img, cv2.MORPH_OPEN, kernel)

y_black, x_black = np.where(eroded_image == 255)
if len(y_black) > 0:
    bary_x = round(np.mean(x_black))
    bary_y = round(np.mean(y_black))`,
    },
    {
      fichier: "RASPISEND/send_camera.py",
      langage: "python",
      commentaire: "Deux profils de qualité de service : on peut perdre une image, pas une mesure.",
      code: `qos_profile = QoSProfile(
    reliability=ReliabilityPolicy.BEST_EFFORT,
    durability=DurabilityPolicy.VOLATILE,
    history=HistoryPolicy.KEEP_LAST,
    depth=1,
)

qos_data = QoSProfile(
    reliability=ReliabilityPolicy.RELIABLE,
    durability=DurabilityPolicy.VOLATILE,
    history=HistoryPolicy.KEEP_LAST,
    depth=10,
)`,
    },
    {
      fichier: "base_robot/Core/Src/main.c",
      langage: "c",
      commentaire: "Le nœud micro-ROS du STM32 : il publie ses capteurs et écoute la vision.",
      code: `rclc_node_init_default(&node, "STM32_Node", "", &support);

rclc_publisher_init_default(&publisher_dist_back, &node,
    ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, String), "/sensor/dist_back");
rclc_publisher_init_default(&publisher_speed_left, &node,
    ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, String), "/motor/speed_left");

rclc_subscription_init_default(&subscriber_bary, &node,
    ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, String), "/camera/bary_x");

rclc_executor_add_subscription(&executor, &subscriber_bary, &bary_msg,
    &bary_callback, ON_NEW_DATA);`,
    },
  ],
  demos: [
    {
      libelle: "L'atelier, à manipuler dans le navigateur",
      url: "https://atelier-robot-ros2.vercel.app",
      detail:
        "Les trois modes du projet, sans rien à installer : on conduit le robot au clavier, on le laisse éviter les obstacles avec ses trois capteurs, ou on lui fait poursuivre le bloc vert de l'arène. En mode suiveur, le panneau de gauche montre l'image de la caméra embarquée, celle que le traitement analyse vraiment. La chaîne de vision est celle du projet, avec les mêmes fonctions OpenCV et les mêmes seuils",
    },
  ],
  couverture: {
    src: suiveurDeCible,
    alt: "L'atelier : la caméra embarquée détecte le bloc vert, et le robot tourne vers lui",
  },
  galerie: [
    {
      src: suiveurDeCible,
      alt: "Mode suiveur : l'image de la caméra embarquée et son masque à gauche, le robot qui poursuit le bloc vert à droite",
      legende:
        "À gauche, ce que voit vraiment le robot : un second rendu de l'arène pris depuis son châssis, et au-dessous le masque qui ne retient que le vert. Les obstacles ocre en sont écartés, le bloc vert reste. À droite, la même scène vue de haut. Les deux vitesses de roue diffèrent parce que le barycentre est décalé, et c'est tout ce qui fait tourner le robot. Le bloc se prend à la souris, dérive seul, ou se laisse mener par un objet vert montré à la webcam.",
      format: "ecran",
    },
    {
      src: piloteAutomatique,
      alt: "Mode automatique : le robot évite les obstacles avec ses trois capteurs",
      legende:
        "Les trois faisceaux partent du robot : deux devant, écartés comme des phares, un derrière au centre. Un obstacle vu à droite se contourne par la gauche, vu par les deux il barre la route et on recule, vu par l'arrière on accélère.",
      format: "ecran",
    },
    {
      src: pilotageManuel,
      alt: "Mode manuel : la croix de pilotage, les capteurs qui réagissent, et les seuils du vert réglables",
      legende:
        "Les flèches du clavier publient sur /command/move, le même message que l'interface du projet envoie au STM32. Le capteur avant droit lit 393 mm parce que le robot longe le mur : en manuel, rien ne l'empêche d'approcher, les capteurs se contentent de mesurer. Les quatre seuils du vert sont ceux de send_camera.py, et on peut les déplacer pour voir le masque changer.",
      format: "ecran",
    },
  ],
  depots: [{ libelle: "Base, vision et interface", url: "https://github.com/rivaldopiaplle-boop/robot-ros2-vision", visibilite: "public" }],
};

export default fiche;
