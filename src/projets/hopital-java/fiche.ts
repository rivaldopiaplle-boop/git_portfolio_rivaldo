import type { Projet } from "../types";
import connexion from "./connexion.webp";
import patients from "./patients.webp";
import rendezVous from "./rendez-vous.webp";

const DEPOT = "https://github.com/rivaldopiaplle-boop/myhopital";
const CHAINE = `${DEPOT}/actions/workflows/ci.yml`;

const fiche: Projet = {
  slug: "hopital-java",
  ordre: 50,
  titre: "MyHopital",
  accroche: "Une application de bureau JavaFX pour un hôpital : trois rôles, rendez-vous sans conflit, dossiers médicaux. Téléchargeable pour Windows et Linux.",
  resume:
    "Prototype desktop de gestion hospitalière en JavaFX : authentification par rôle (directeur, gestionnaire, médecin), patients, médecins, rendez-vous, consultations, dossiers et documents médicaux. Architecture en couches (interface, services, dépôts, domaine), avec une base SQLite locale et un import initial depuis des CSV. À la reprise : mots de passe hachés, 11 tests JUnit, un défaut corrigé, et des versions publiées automatiquement par jpackage.",
  categorie: "applications",
  statut: "termine",
  annee: "2026",
  cadre: "ENIB · développement Java",
  couleur: "#0a7fb0",
  couverture: { src: rendezVous, alt: "MyHopital : onglet des rendez-vous, avec médecins, patients et créneaux", format: "ecran" },
  galerie: [
    { src: rendezVous, alt: "Onglet des rendez-vous", legende: "Rendez-vous : médecin, patient et créneau, recherche et tri", format: "ecran" },
    { src: patients, alt: "Onglet des patients", legende: "Patients : la liste et le formulaire de saisie côte à côte", format: "ecran" },
    { src: connexion, alt: "Écran de connexion", legende: "Connexion, inscription et mot de passe oublié", format: "ecran" },
  ],
  stack: ["java", "maven", "githubactions"],
  chiffres: [
    { valeur: 3, libelle: "rôles, dont un directeur à approuver" },
    { valeur: 11, libelle: "tests JUnit, dont 6 contre une base SQLite" },
    { valeur: 2, libelle: "paquets publiés à chaque version : Windows et Linux" },
  ],
  sections: [
    {
      titre: "Ce que fait l'application",
      points: [
        "Accès par rôle : directeur, gestionnaire, médecin",
        "Rendez-vous refusés si le médecin ou le patient est déjà pris sur le créneau",
        "Réinitialisation du mot de passe par code temporaire",
        "Workflow d'approbation pour les comptes directeur",
        "Persistance SQLite, import initial depuis des CSV",
      ],
    },
    {
      titre: "La reprise : sécurité, tests, livraison",
      texte: "Un prototype d'école devient une application qu'on peut télécharger et à laquelle on peut se fier.",
      points: [
        "Mots de passe hachés (PBKDF2-HMAC-SHA256) ; une base existante migre seule, à la première connexion",
        "11 tests JUnit, dont 6 contre une vraie base SQLite temporaire",
        "Un défaut trouvé par les tests : l'inscription d'un second directeur échouait, sa demande d'approbation étant enregistrée avant lui",
        "Une étiquette de version construit avec jpackage l'application Windows et le paquet Linux, puis les publie",
        "Captures reproductibles : un programme monte l'application sur une base temporaire et photographie chaque écran",
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
      fichier: "util/MotDePasse.java",
      langage: "java",
      commentaire: "Les mots de passe étaient stockés et comparés en clair. PBKDF2 est fourni par Java : un sel par compte, et une comparaison dont la durée ne révèle rien.",
      code: `public static boolean verifier(String saisi, String stocke) {
    String[] parties = stocke.split("\\\\$");          // pbkdf2$iterations$sel$hache
    int iterations = Integer.parseInt(parties[1]);
    byte[] sel = Base64.getDecoder().decode(parties[2]);
    byte[] attendu = Base64.getDecoder().decode(parties[3]);
    return MessageDigest.isEqual(attendu, deriver(saisi, sel, iterations));
}`,
    },
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
  preuves: [
    {
      libelle: "Télécharger l'application",
      url: `${DEPOT}/releases/latest`,
      detail: "Windows : dossier à décompresser, puis MyHopital.exe. Linux : paquet .deb. Java est embarqué",
    },
    {
      libelle: "Les tests à chaque poussée",
      url: `${CHAINE}?query=branch%3Amain`,
      detail: "Compilation et 11 tests JUnit sur GitHub Actions",
      badge: `${CHAINE}/badge.svg?branch=main`,
    },
  ],
  depots: [{ libelle: "Dépôt de l'application", url: DEPOT, visibilite: "public" }],
};

export default fiche;
