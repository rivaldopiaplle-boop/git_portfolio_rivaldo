/**
 * Les informations de profil, en un seul endroit. Une valeur à `null` masque simplement
 * l'élément correspondant du site (lien, bouton).
 */
export const PROFIL = {
  prenom: "Rivaldo",
  nom: "Piaplle",
  titre: "DevOps et développement full-stack",
  ecole: "ENIB",
  ecoleLong: "École nationale d'ingénieurs de Brest",
  niveau: "5ᵉ année",
  ville: "Brest",
  recherche: "Stage de fin d'études",
  /** Adresse d'étudiant, donnée en premier. Elle cessera de servir au diplôme. */
  email: "f25piapll@enib.fr",
  /** Adresse durable, donnée juste après : un recruteur écrit parfois des mois plus tard. */
  emailSecondaire: "rivaldopiaplle@gmail.com",
  github: "https://github.com/rivaldopiaplle-boop",
  linkedin: "https://www.linkedin.com/in/rivaldo-piaplle-720356308/" as string | null,
  cv: "/cv/Rivaldo-Piaplle-CV.pdf",
  langues: [
    { nom: "Français", niveau: "natif" },
    { nom: "Anglais", niveau: "intermédiaire" },
  ],
};
