#!/usr/bin/env node
/**
 * Vérifie ce que le site promet, avant qu'un visiteur ne le découvre :
 *
 *   1. chaque projet publié a quelque chose à montrer (démo, dépôt public,
 *      image ou extrait de code) ;
 *   2. chaque adresse que le site donne répond vraiment, démos (QR code), dépôts
 *      publics et preuves (liens). Une adresse vers une 404 est pire que pas d'adresse ;
 *   3. aucun dépôt marqué « public » n'est en réalité privé.
 *
 * Il lit les fiches telles quelles : Node retire les types TypeScript, et un
 * petit chargeur remplace les images importées par leur nom de fichier.
 *
 *   node scripts/verifier-liens.mjs
 */
import { readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const CHARGEUR = `
export async function resolve(specifier, context, next) {
  if (/\\.(webp|png|jpe?g|svg|gif)$/.test(specifier)) {
    return { url: "image:" + specifier, shortCircuit: true };
  }
  if (specifier.startsWith(".") && !/\\.[a-z]+$/i.test(specifier)) {
    return next(specifier + ".ts", context);
  }
  return next(specifier, context);
}
export async function load(url, context, next) {
  if (url.startsWith("image:")) {
    return { format: "module", source: "export default " + JSON.stringify(url.slice(6)) + ";", shortCircuit: true };
  }
  return next(url, context);
}`;
register(`data:text/javascript,${encodeURIComponent(CHARGEUR)}`, import.meta.url);

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "projets");
/**
 * Réponses qui ne disent rien de l'adresse : LinkedIn répond 999 et Figma 403
 * à tout robot, même quand le lien marche dans un navigateur.
 */
const NON_VERIFIABLES = [999];
const HOTES_FERMES_AUX_ROBOTS = ["www.figma.com", "www.linkedin.com"];

const fiches = [];
for (const dossier of readdirSync(RACINE, { withFileTypes: true })) {
  const chemin = join(RACINE, dossier.name, "fiche.ts");
  if (!dossier.isDirectory() || !existsSync(chemin)) continue;
  const { default: fiche } = await import(pathToFileURL(chemin).href);
  if (fiche.publie !== false) fiches.push(fiche);
}

let echecs = 0;
const echec = (message) => {
  echecs += 1;
  console.log(`  ✗ ${message}`);
};

console.log(`\n── ${fiches.length} projets publiés`);
for (const fiche of fiches) {
  const visible =
    (fiche.demos?.length ?? 0) +
    (fiche.preuves?.length ?? 0) +
    fiche.depots.filter((d) => d.visibilite === "public" && d.url).length +
    (fiche.galerie?.length ?? 0) +
    (fiche.extraits?.length ?? 0);
  /**
   * Un projet encore en construction n'a parfois rien d'ouvrable, et c'est
   * honnête : ce qu'il montre, c'est sa feuille de route. La règle ne se
   * relâche que là, et seulement si cette feuille existe vraiment. Un projet
   * annoncé en ligne ou terminé sans rien à ouvrir reste une faute.
   */
  const enChantier = fiche.statut === "en-cours" && (fiche.feuilleDeRoute?.length ?? 0) > 0;
  if (visible === 0 && !enChantier) echec(`${fiche.slug} : rien à montrer (démo, preuve, dépôt public, image ou extrait)`);
  else if (visible === 0) console.log(`  ~ ${fiche.slug} (en cours : sa feuille de route tient lieu de preuve)`);
  else console.log(`  ✓ ${fiche.slug}`);
}

const adresses = new Map();
for (const fiche of fiches) {
  for (const demo of fiche.demos ?? []) adresses.set(demo.url, `${fiche.slug} · démo « ${demo.libelle} »`);
  for (const depot of fiche.depots) if (depot.url && depot.visibilite === "public") adresses.set(depot.url, `${fiche.slug} · dépôt public`);
  for (const preuve of fiche.preuves ?? []) {
    adresses.set(preuve.url, `${fiche.slug} · preuve « ${preuve.libelle} »`);
    if (preuve.badge) adresses.set(preuve.badge, `${fiche.slug} · badge de « ${preuve.libelle} »`);
  }
}

console.log(`\n── ${adresses.size} adresses promises au visiteur`);
await Promise.all(
  [...adresses].map(async ([url, origine]) => {
    // 150 secondes : un service gratuit endormi (Render) met jusqu'à deux minutes
    // à revenir, et un faux négatif ferait douter d'un lien pourtant valide.
    //
    // Et un second essai avant de condamner. Mesuré : cette chaîne a échoué
    // deux fois sur cette étape pour des liens qui répondaient depuis le même
    // poste quelques minutes plus tard. Une alerte qui se trompe une fois sur
    // trois finit par n'être plus lue, ce qui est pire que pas d'alerte.
    const appeler = () =>
      fetch(url, {
        redirect: "follow",
        headers: { "user-agent": "Mozilla/5.0 (verifier-liens du portfolio)" },
        signal: AbortSignal.timeout(150_000),
      });
    // Trois essais, et la raison est mesuree : les deux services gratuits
    // cites par le site s'endorment au bout de quinze minutes et mettent
    // jusqu'a une minute a se reveiller, en rendant des 502 pendant ce temps.
    // Un seul nouvel essai douze secondes plus tard tombait encore en plein
    // reveil. Une vraie erreur de lien, elle, ne guerit pas au troisieme coup.
    let dernier = "";
    const ESSAIS = 3;
    for (let essai = 0; essai < ESSAIS; essai += 1) {
      try {
        const reponse = await appeler();
        if (reponse.ok) {
          console.log(`  ✓ ${reponse.status} ${url}${essai > 0 ? ` (au ${essai + 1}e essai)` : ""}`);
          return;
        }
        if (NON_VERIFIABLES.includes(reponse.status) || HOTES_FERMES_AUX_ROBOTS.includes(new URL(url).hostname)) {
          console.log(`  ~ ${reponse.status} ${url} (non vérifiable automatiquement)`);
          return;
        }
        dernier = String(reponse.status);
        if (reponse.status < 500) break; // une vraie erreur de lien ne guérit pas
      } catch (erreur) {
        dernier = erreur.cause?.code ?? erreur.message;
      }
      if (essai < ESSAIS - 1) await new Promise((r) => setTimeout(r, 20_000));
    }
    echec(`${dernier} ${url}, ${origine}`);
  }),
);

console.log(echecs === 0 ? "\nTout ce que le site promet est vrai.\n" : `\n${echecs} promesse(s) non tenue(s).\n`);
process.exit(echecs === 0 ? 0 : 1);
