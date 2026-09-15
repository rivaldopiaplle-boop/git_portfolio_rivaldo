import { ArrowUpRight, Eye, FileCode, Globe, Images } from "lucide-react";
import { motion } from "motion/react";
import type { Ref } from "react";
import { Link } from "react-router";
import { EASE_SORTIE, suivrePointeur } from "../outils";
import { ceQuOnPeutVoir } from "../projets";
import { CATEGORIES } from "../projets/categories";
import type { Projet } from "../projets/types";
import { BadgeEvolution, BadgeStatut } from "./BadgeStatut";
import { BoutonIcone, Indice } from "./Blocs";
import { IconeTechno } from "./IconeTechno";
import { VisuelProjet } from "./VisuelProjet";

const MAX_ICONES = 5;

export function CarteProjet({ projet, apercu, ref }: { projet: Projet; apercu?: (p: Projet) => void; ref?: Ref<HTMLElement> }) {
  const categorie = CATEGORIES[projet.categorie];
  const voir = ceQuOnPeutVoir(projet);
  const reste = projet.stack.length - MAX_ICONES;

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: EASE_SORTIE }}
      className="h-full"
    >
      <div
        onPointerMove={suivrePointeur}
        className="carte projecteur group relative flex h-full flex-col rounded-2xl transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-ligne-forte hover:shadow-[0_18px_40px_-20px_rgb(15_20_32/0.3)]"
      >
        <Link to={`/projets/${projet.slug}`} className="relative block p-2 pb-0" tabIndex={-1} aria-hidden>
          <div className="overflow-hidden rounded-xl">
            <div className="transition-transform duration-500 group-hover:scale-[1.02]">
              <VisuelProjet projet={projet} />
            </div>
          </div>
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            <BadgeStatut statut={projet.statut} className="shadow-sm" />
            {projet.feuilleDeRoute && <BadgeEvolution className="shadow-sm" />}
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-4">
          <p className="mb-1.5 flex items-center gap-1.5 text-xs text-encre-3">
            <categorie.icone className="size-3.5" style={{ color: categorie.couleur }} />
            {categorie.court} · {projet.annee}
          </p>
          <div className="flex items-center gap-2">
            {projet.logo && <img src={projet.logo} alt="" className="size-6 rounded-md border border-ligne object-cover" />}
            <Link to={`/projets/${projet.slug}`} className="truncate font-semibold tracking-tight text-encre after:absolute after:inset-0 after:content-['']">
              {projet.titre}
            </Link>
          </div>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-encre-2">{projet.accroche}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {voir.demos > 0 && <Indice icone={Globe}>En ligne</Indice>}
            {voir.depotsPublics > 0 && (
              <Indice>
                <IconeTechno techno="github" monochrome taille={11} /> Code public
              </Indice>
            )}
            {voir.images > 0 && <Indice icone={Images}>{voir.images} images</Indice>}
            {voir.extraits > 0 && <Indice icone={FileCode}>Extraits de code</Indice>}
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between border-t border-ligne pt-3">
              <div className="flex items-center gap-1">
                {projet.stack.slice(0, MAX_ICONES).map((techno) => (
                  <span key={techno} className="grid size-7 place-items-center rounded-lg bg-surface-2">
                    <IconeTechno techno={techno} taille={14} />
                  </span>
                ))}
                {reste > 0 && <span className="pl-1 font-mono text-[11px] text-encre-3">+{reste}</span>}
              </div>
              <div className="relative z-10 flex gap-1.5">
                {apercu && (
                  <BoutonIcone titre="Aperçu rapide" onClick={() => apercu(projet)}>
                    <Eye className="size-4" />
                  </BoutonIcone>
                )}
                <Link
                  to={`/projets/${projet.slug}`}
                  title="Ouvrir la fiche"
                  aria-label={`Ouvrir la fiche ${projet.titre}`}
                  className="grid size-8 place-items-center rounded-lg bg-encre text-surface transition hover:bg-encre/85"
                >
                  <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
