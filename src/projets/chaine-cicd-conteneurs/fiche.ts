import type { Projet } from "../types";

const fiche: Projet = {
  slug: "chaine-cicd-conteneurs",
  ordre: 30,
  titre: "Chaîne CI/CD multi-conteneurs",
  accroche: "Tests front, tests .NET contre MySQL, intégration en conteneurs avec k6 et Chrome, puis images publiées en matrice.",
  resume:
    "Une chaîne GitHub Actions en quatre étages pour une application front et back-end .NET : chaque étage ne part que si le précédent est vert, l'intégration monte la pile entière en conteneurs, et les images ne sont poussées que depuis main.",
  categorie: "devops",
  statut: "termine",
  annee: "2026",
  cadre: "Formation déploiement",
  couleur: "#6d5bd0",
  stack: ["githubactions", "docker", "dotnet", "mysql", "k6", "puppeteer", "node"],
  sections: [
    {
      titre: "Quatre étages, chacun conditionné au précédent",
      points: [
        "Tests du front sous Node 20",
        "Tests du back-end .NET 6 contre un service MySQL doté d'une sonde de santé",
        "Intégration : migration de la base, pile montée par docker compose, scénarios k6 et Chrome sans interface",
        "Images front et back construites en matrice, poussées sur GHCR uniquement depuis main",
        "Mot de passe de base injecté par les secrets GitHub, jamais écrit dans le dépôt",
      ],
    },
  ],
  pipeline: [
    { genre: "declencheur", titre: "git push", taches: [{ nom: "main ou pull request", controles: ["Front et back en parallèle"] }] },
    {
      genre: "verification",
      titre: "Tests",
      taches: [
        { nom: "Front", controles: ["Node 20", "npm test"] },
        { nom: "Back", controles: [".NET 6", "MySQL en service", "dotnet test"] },
      ],
    },
    { genre: "verification", titre: "Intégration", taches: [{ nom: "Pile complète", controles: ["Migration MySQL", "docker compose up", "k6 + Chrome sans interface"] }] },
    { genre: "publication", titre: "Images", taches: [{ nom: "Matrice", controles: ["frontend + backend", "GHCR, depuis main"] }] },
  ],
  extraits: [
    {
      fichier: ".github/workflows/ci.yml",
      langage: "yaml",
      commentaire: "Les images ne partent que si l'intégration est verte, et ne sont poussées que depuis main.",
      code: `build-image:
  runs-on: ubuntu-latest
  needs: [integration-test]
  strategy:
    matrix:
      component: ["frontend", "backend"]
  permissions:
    packages: write
    contents: read
  steps:
    - uses: actions/checkout@v3
    - name: Build and push Docker image
      uses: docker/build-push-action@v6
      with:
        context: ./\${{ matrix.component }}
        push: \${{ github.event_name == 'push' && github.ref_name == 'main' }}
        tags: ghcr.io/\${{ github.repository_owner }}/spm-\${{ matrix.component }}:\${{ github.ref_name }}`,
    },
  ],
  depots: [{ libelle: "Dépôt de la chaîne", url: "https://github.com/rivaldopiaplle-boop/git-demo-cicd-rivaldo", visibilite: "public" }],
};

export default fiche;
