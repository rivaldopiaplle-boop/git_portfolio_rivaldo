import type { Projet } from "../types";

const fiche: Projet = {
  slug: "hopital-java",
  ordre: 50,
  titre: "MyHopital",
  accroche: "Une application de bureau JavaFX pour un hôpital : trois rôles, rendez-vous sans conflit, dossiers médicaux.",
  resume:
    "Prototype desktop de gestion hospitalière en JavaFX : authentification par rôle (directeur, gestionnaire, médecin), patients, médecins, rendez-vous, consultations, dossiers et documents médicaux. Architecture en couches (interface, services, dépôts, domaine), avec une base SQLite locale et un import initial depuis des CSV.",
  categorie: "applications",
  statut: "termine",
  annee: "2026",
  cadre: "ENIB · développement Java",
  couleur: "#0a7fb0",
  stack: ["java", "maven"],
  sections: [
    {
      titre: "Ce que fait l'application",
      points: [
        "Accès par rôle : directeur, gestionnaire, médecin",
        "Rendez-vous refusés si le médecin ou le patient est déjà pris sur le créneau",
        "Réinitialisation du mot de passe par code temporaire",
        "Workflow d'approbation pour les comptes directeur",
        "Persistance SQLite, import initial depuis des CSV, tests JUnit",
      ],
    },
    {
      titre: "L'architecture",
      texte: "Chaque couche ne connaît que celle du dessous : UI → Service → Repository → Domain.",
      points: [
        "Treize écrans JavaFX, un service par domaine métier",
        "Exceptions métier dédiées (HospitalException, ValidationException)",
        "Configuration et chargement des données séparés du reste",
      ],
    },
  ],
  extraits: [
    {
      fichier: "service/RendezVousService.java",
      langage: "java",
      commentaire: "La règle vit dans le service, pas dans l'écran : aucun chemin ne crée un rendez-vous sur un créneau pris.",
      code: `public RendezVous create(RendezVous rendezVous) {
    if (!isSlotAvailableForMedecin(rendezVous.getMedecinId(), rendezVous.getDateHeure())) {
        throw new ValidationException("Creneau medecin indisponible.");
    }
    if (!isSlotAvailableForPatient(rendezVous.getPatientId(), rendezVous.getDateHeure())) {
        throw new ValidationException("Creneau patient indisponible.");
    }
    rendezVous.setId(IdGenerator.newId());
    dataStore.getRendezVous().add(rendezVous);
    databaseRepository.insertRendezVous(rendezVous);
    return rendezVous;
}`,
    },
  ],
  depots: [{ libelle: "Dépôt de l'application", url: "https://github.com/rivaldopiaplle-boop/myhopital", visibilite: "public" }],
};

export default fiche;
