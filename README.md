# Portfolio : Rivaldo Piaplle

Portfolio orienté DevOps, construit comme une application : tableau de bord, catalogue de
projets filtrable, fiches à onglets, panneau latéral, popups. Deux plateformes complètes en
ligne, leurs chaînes CI/CD rejouées à l'écran, et des projets d'applications et de robotique.

**React 19 · TypeScript · Vite · Tailwind CSS 4 · Motion · Simple Icons · Vercel**

## Démarrer

```bash
npm install
npm run dev              # http://localhost:5173
npm run build            # vérifie les types puis construit dist/
npm run verifier:liens   # chaque projet a quelque chose à montrer, chaque QR code répond
```

## Où vit quoi

```
src/
├── projets/                 un dossier par projet
│   ├── banque/
│   │   ├── fiche.ts         le texte, les chiffres, la chaîne CI/CD, les liens
│   │   └── *.webp           ses captures
│   ├── index.ts             le registre : il découvre les dossiers tout seul
│   ├── categories.ts        les trois catégories et les statuts
│   └── types.ts             le gabarit commun à toutes les fiches
├── contenu/                 ce qui ne dépend d'aucun projet
│   ├── profil.ts            nom, contact, LinkedIn, CV
│   ├── parcours.ts          formation et expériences
│   ├── competences.ts       domaines de compétences
│   └── technos.ts           technologies et logos officiels
├── composants/coquille/     barre latérale, barre haute, panneau droit, contact
└── pages/                   tableau de bord, projets, fiche, chaîne, parcours, compétences, CV
```

## Ajouter un projet

1. Créer `src/projets/<slug>/fiche.ts`, copier une fiche courte, par exemple `api-rest-prisma`.
2. Y déposer ses images et les importer : `import capture from "./capture.webp"`.
3. C'est tout : le tableau de bord, le catalogue, les compteurs et la barre latérale le prennent en compte.

Une fiche ne montre que ce qu'elle contient : pas de galerie sans images, pas d'onglet
« Chaîne CI/CD » sans `pipeline`, pas de « Feuille de route » pour un projet terminé.

**Un projet pas encore prêt** reste en brouillon avec `publie: false` : sa fiche se remplit
au fil du travail, et retirer cette ligne suffit à le publier.

## La chaîne

`.github/workflows/verification.yml` tourne à chaque poussée et chaque lundi : types,
construction, puis `verifier:liens`, qui échoue si une démo ou un dépôt public ne répond
plus, ou si un projet n'a plus rien à montrer.

## Déployer

Vercel → *Add New Project* → ce dépôt → *Deploy*. `vercel.json` règle la construction et la
réécriture des routes.
