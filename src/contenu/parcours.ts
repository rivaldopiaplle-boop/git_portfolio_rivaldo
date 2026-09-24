/**
 * Le parcours, repris du CV. Les `projets` renvoient aux slugs de
 * `src/projets/` : un lien n'apparaît que si le projet est publié.
 */
export interface ElementParcours {
  periode: string;
  titre: string;
  lieu: string;
  mention?: string;
  details?: string[];
  projets?: string[];
}

export const FORMATION: ElementParcours[] = [
  {
    periode: "Depuis septembre 2025",
    titre: "Diplôme d'ingénieur en informatique",
    lieu: "ENIB, École nationale d'ingénieurs de Brest",
    details: [
      "4ᵉ année : systèmes embarqués numériques, conception d'applications interactives, réseaux et systèmes, gestion de projet, projet pluridisciplinaire",
      "5ᵉ année : ingénierie logicielle et patrons de conception, projet d'études et de recherche",
    ],
    projets: ["donvie", "hopital-java", "robot-guitariste", "robot-ros2"],
  },
  {
    periode: "2023-2024",
    titre: "Licence en sciences de l'ingénieur, option mécatronique",
    lieu: "École nationale supérieure polytechnique de Yaoundé (ENSPY), Cameroun",
    mention: "Très bien · MGP 3,41 / 4",
    details: [
      "Grande école d'ingénieurs de référence en Afrique centrale, admission sur concours national",
      "Mécatronique : électronique, automatique, mécanique et informatique industrielle",
    ],
  },
  {
    periode: "2020-2021",
    titre: "Baccalauréat scientifique, série C",
    lieu: "Lycée bilingue de Toungue 2, Bafoussam, Cameroun",
    mention: "Bien · 15,13 / 20",
  },
];

export const EXPERIENCES: ElementParcours[] = [
  {
    periode: "2026",
    titre: "Deux plateformes complètes, du serveur à la mise en ligne",
    lieu: "Formation et projets personnels",
    details: [
      "Banque App : NestJS, React, Expo, chaîne d'intégration à cinq tâches, Render et Supabase",
      "RivDinde : Django, Vue, Ionic, Vercel, Render et Neon",
      "Chaînes CI/CD en conteneurs, API REST, mise en ligne",
    ],
    projets: ["banque", "rivdinde", "chaine-cicd-conteneurs", "api-rest-prisma"],
  },
  {
    periode: "Février à avril 2026",
    titre: "Développement full-stack web et mobile",
    lieu: "ENIB, Brest · en équipe",
    details: ["Application de gestion des dons de sang", "Interface React et TypeScript, conçue sur maquettes Figma"],
    projets: ["donvie"],
  },
  {
    periode: "Janvier à février 2026",
    titre: "Développeur Java, application hospitalière",
    lieu: "ENIB, Brest",
    details: ["JavaFX, Maven, SQLite", "Architecture en couches, gestion des patients, du personnel et des rendez-vous"],
    projets: ["hopital-java"],
  },
  {
    periode: "Mai à septembre 2023",
    titre: "Développeur full-stack, application e-commerce",
    lieu: "Juddev Corporation, Yaoundé, Cameroun",
    details: ["Front JavaScript : produits, panier, interactions", "API Node.js modulaire sur MongoDB, validée avec Postman"],
  },
  {
    periode: "Mars à juin 2023",
    titre: "Développeur full-stack, gestion de bibliothèque",
    lieu: "ENSPY, Yaoundé, Cameroun",
    details: ["Logique métier en Java, interface en JavaScript, base SQL"],
  },
];

export const ATOUTS = [
  "Créativité et curiosité scientifique",
  "Rigueur et sens des responsabilités",
  "Autonomie dans la conduite de projets",
];
