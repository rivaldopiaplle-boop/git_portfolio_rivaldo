/**
 * Qui je suis, en un seul endroit. Une valeur à `null` masque simplement
 * l'élément correspondant du site (lien, bouton).
 */
export const PROFIL = {
  prenom: "Rivaldo",
  nom: "Piaplle",
  titre: "DevOps & Full-stack",
  ecole: "ENIB",
  ecoleLong: "École nationale d'ingénieurs de Brest",
  niveau: "5ᵉ année",
  ville: "Brest",
  recherche: "Stage de fin d'études, puis CDI ou alternance",
  email: "rivaldopiaplle@gmail.com",
  github: "https://github.com/rivaldopiaplle-boop",
  linkedin: "https://www.linkedin.com/in/rivaldo-piaplle-720356308/" as string | null,
  cv: "/cv/Rivaldo-Piaplle-CV.pdf",
  langues: [
    { nom: "Français", niveau: "natif" },
    { nom: "Anglais", niveau: "intermédiaire" },
  ],
};
