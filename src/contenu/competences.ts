import { Brain, Container, Cpu, Database, Layers, Smartphone, Workflow } from "lucide-react";
import type { ComponentType } from "react";
import type { Techno } from "./technos";

export interface Competence {
  titre: string;
  texte: string;
  icone: ComponentType<{ className?: string }>;
  technos: Techno[];
}

export const COMPETENCES: Competence[] = [
  {
    titre: "CI/CD et qualité",
    texte: "Des chaînes qui testent contre de vraies bases, bloquent les secrets et ne publient que ce qui est vert.",
    icone: Workflow,
    technos: ["githubactions", "jenkins", "docker", "trivy", "pytest", "vitest", "eslint", "ruff", "k6", "puppeteer", "postman"],
  },
  {
    titre: "Conteneurs et mise en ligne",
    texte:
      "Piles Docker Compose, reverse proxy, variables de construction ou d'exécution, sondes de santé, hébergement gratuit maîtrisé.",
    icone: Container,
    technos: ["docker", "kubernetes", "argocd", "terraform", "ansible", "prometheus", "grafana", "nginx", "caddy", "render", "vercel", "supabase", "neon", "aiven", "linux"],
  },
  {
    titre: "Back-end et données",
    texte: "API REST versionnées, règles métier côté serveur, migrations qui concordent avec le schéma.",
    icone: Database,
    technos: ["spring", "nestjs", "django", "fastapi", "express", "nextjs", "prisma", "postgresql", "mysql", "redis", "jwt"],
  },
  {
    titre: "Front et mobile",
    texte: "Interfaces typées avec leurs états vides, de chargement et d'erreur ; applications installables.",
    icone: Smartphone,
    technos: ["react", "angular", "vue", "typescript", "mui", "primevue", "tailwind", "expo", "ionic"],
  },
  {
    titre: "Apprentissage et données",
    texte:
      "Modèles jugés sur ce qu'ils font gagner et non sur leur exactitude, sur des données déséquilibrées ou trouées, et une chaîne qui refuse de livrer un modèle moins bon que le précédent.",
    icone: Brain,
    technos: ["python", "pandas", "numpy", "scikitlearn", "pytorch", "mlflow", "opencv", "postgresql"],
  },
  {
    titre: "Embarqué et robotique",
    texte: "Micrologiciel temps réel, pilotes de capteurs, ROS 2 et vision par ordinateur.",
    icone: Cpu,
    technos: ["c", "stm32", "arm", "freertos", "ros", "raspberrypi", "opencv", "python"],
  },
  {
    titre: "Conception",
    texte: "Décisions écrites et motivées, contrats d'API, modèles de données, patrons de conception.",
    icone: Layers,
    technos: ["java", "figma", "git", "maven"],
  },
];

export const BANDEAU_HAUT: Techno[] = [
  "githubactions",
  "docker",
  "kubernetes",
  "terraform",
  "prometheus",
  "nginx",
  "render",
  "vercel",
  "supabase",
  "neon",
  "postgresql",
  "prisma",
  "nestjs",
  "django",
  "node",
  "python",
  "linux",
];

export const BANDEAU_BAS: Techno[] = [
  "react",
  "vue",
  "typescript",
  "tailwind",
  "mui",
  "primevue",
  "expo",
  "ionic",
  "stripe",
  "c",
  "stm32",
  "ros",
  "raspberrypi",
  "opencv",
];
