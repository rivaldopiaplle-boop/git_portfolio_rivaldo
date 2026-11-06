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
  recherche: "Stage de fin d'études, CDI",
  disponibilite: "4 à 6 mois, à partir du 2 janvier 2027",
  /** Adresse d'étudiant, donnée en premier. Elle cessera de servir au diplôme. */
  email: "f25piapll@enib.fr",
  /** Adresse durable, donnée juste après : un recruteur écrit parfois des mois plus tard. */
  emailSecondaire: "rivaldopiaplle@gmail.com",
  github: "https://github.com/rivaldopiaplle-boop",
  linkedin: "https://www.linkedin.com/in/rivaldo-piaplle" as string | null,
  /**
   * Le CV, avec la date de sa version collée à l'adresse.
   *
   * Sans elle, un visiteur qui a déjà ouvert la page garde l'ancien fichier :
   * le navigateur et le lecteur de PDF le gardent en mémoire sous la même
   * adresse, et on croit que la mise à jour n'a pas eu lieu. Changer ce
   * nombre à chaque nouvelle version force le téléchargement.
   */
  cv: "/cv/Rivaldo-Piaplle-CV.pdf?v=20261106",
  langues: [
    { nom: "Français", niveau: "natif" },
    { nom: "Anglais", niveau: "intermédiaire" },
  ],
};
