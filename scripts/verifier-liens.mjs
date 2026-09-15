#!/usr/bin/env node
/**
 * Vérifie ce que le site promet, avant qu'un visiteur ne le découvre :
 *
 *   1. chaque projet publié a quelque chose à montrer (démo, dépôt public,
 *      image ou extrait de code) ;
 *   2. chaque adresse qui porte un QR code répond vraiment, démos et dépôts
 *      publics. Un QR code vers une 404 est pire que pas de QR code ;
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
    (fiche.demos?.length ?? 0) + fiche.depots.filter((d) => d.visibilite === "public" && d.url).length + (fiche.galerie?.length ?? 0) + (fiche.extraits?.length ?? 0);
  if (visible === 0) echec(`${fiche.slug} : rien à montrer (démo, dépôt public, image ou extrait)`);
  else console.log(`  ✓ ${fiche.slug}`);
}

const adresses = new Map();
for (const fiche of fiches) {
  for (const demo of fiche.demos ?? []) adresses.set(demo.url, `${fiche.slug} · démo « ${demo.libelle} »`);
  for (const depot of fiche.depots) if (depot.url && depot.visibilite === "public") adresses.set(depot.url, `${fiche.slug} · dépôt public`);
}

console.log(`\n── ${adresses.size} adresses avec QR code`);
await Promise.all(
  [...adresses].map(async ([url, origine]) => {
    try {
      const reponse = await fetch(url, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 (verifier-liens du portfolio)" }, signal: AbortSignal.timeout(90_000) });
      if (reponse.ok) console.log(`  ✓ ${reponse.status} ${url}`);
      else if (NON_VERIFIABLES.includes(reponse.status) || HOTES_FERMES_AUX_ROBOTS.includes(new URL(url).hostname)) console.log(`  ~ ${reponse.status} ${url} (non vérifiable automatiquement)`);
      else echec(`${reponse.status} ${url}, ${origine}`);
    } catch (erreur) {
      echec(`injoignable ${url}, ${origine} (${erreur.cause?.code ?? erreur.message})`);
    }
  }),
);

console.log(echecs === 0 ? "\nTout ce que le site promet est vrai.\n" : `\n${echecs} promesse(s) non tenue(s).\n`);
process.exit(echecs === 0 ? 0 : 1);
