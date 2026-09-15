import { Award, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useSearchParams } from "react-router";
import { EnTetePage, ZonePage } from "../composants/EnTetePage";
import { PROFIL } from "../contenu/profil";
import { ATOUTS, EXPERIENCES, FORMATION, type ElementParcours } from "../contenu/parcours";
import { cx, useTitre } from "../outils";
import { trouverProjet } from "../projets";

const RUBRIQUES = [
  { id: "experiences", nom: "Expériences", icone: Briefcase, compte: EXPERIENCES.length },
  { id: "formation", nom: "Formation", icone: GraduationCap, compte: FORMATION.length },
  { id: "atouts", nom: "Langues et atouts", icone: Sparkles },
] as const;

type IdRubrique = (typeof RUBRIQUES)[number]["id"];

export default function Parcours() {
  useTitre("Parcours — Rivaldo Piaplle");
  const [params, setParams] = useSearchParams();
  const actif: IdRubrique = RUBRIQUES.find((r) => r.id === params.get("rubrique"))?.id ?? "experiences";

  return (
    <>
      <EnTetePage titre="Parcours" description="De la mécatronique à Yaoundé au cycle ingénieur à Brest, et deux plateformes mises en ligne en chemin." />
      <ZonePage>
        <div className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label="Rubriques du parcours" className="md:sticky md:top-[76px] md:self-start">
            <ul className="carte flex gap-1 overflow-x-auto rounded-2xl p-1.5 md:flex-col">
              {RUBRIQUES.map((rubrique) => {
                const selectionne = rubrique.id === actif;
                return (
                  <li key={rubrique.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setParams({ rubrique: rubrique.id }, { replace: true, preventScrollReset: true })}
                      aria-current={selectionne}
                      className={cx(
                        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition",
                        selectionne ? "bg-encre text-surface" : "text-encre-2 hover:bg-surface-2 hover:text-encre",
                      )}
                    >
                      <rubrique.icone className="size-4" />
                      <span className="flex-1">{rubrique.nom}</span>
                      {"compte" in rubrique && <span className={cx("font-mono text-[10px]", selectionne ? "text-surface/60" : "text-encre-3")}>{rubrique.compte}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <AnimatePresence mode="wait">
            <motion.div key={actif} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
              {actif === "experiences" && <Frise elements={EXPERIENCES} />}
              {actif === "formation" && <Frise elements={FORMATION} />}
              {actif === "atouts" && <Atouts />}
            </motion.div>
          </AnimatePresence>
        </div>
      </ZonePage>
    </>
  );
}

function Frise({ elements }: { elements: ElementParcours[] }) {
  return (
    <ol className="relative space-y-4 pl-6">
      <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-ligne-forte" />
      {elements.map((element) => {
        const projets = (element.projets ?? []).map(trouverProjet).filter((p) => p !== undefined);
        return (
          <li key={element.titre + element.periode} className="relative">
            <span aria-hidden className="absolute -left-6 top-6 grid size-[15px] place-items-center rounded-full border-2 border-vert bg-surface" />
            <article className="carte rounded-2xl p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold tracking-tight text-encre">{element.titre}</h3>
                <span className="rounded-full bg-surface-3 px-2.5 py-0.5 font-mono text-[11px] text-encre-2">{element.periode}</span>
              </div>
              <p className="mt-0.5 text-sm text-encre-3">{element.lieu}</p>
              {element.mention && (
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-vert/10 px-2 py-1 text-xs font-medium text-vert">
                  <Award className="size-3.5" /> {element.mention}
                </p>
              )}
              {element.details && (
                <ul className="mt-3 space-y-1.5">
                  {element.details.map((detail) => (
                    <li key={detail} className="flex gap-2.5 text-sm leading-relaxed text-encre-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-encre-3" />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
              {projets.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-ligne pt-3">
                  {projets.map((projet) => (
                    <Link
                      key={projet.slug}
                      to={`/projets/${projet.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-ligne bg-surface-2 px-2 py-1 text-xs text-encre-2 transition hover:border-ligne-forte hover:text-encre"
                    >
                      {projet.logo ? <img src={projet.logo} alt="" className="size-3.5 rounded object-cover" /> : <span className="size-2 rounded-full" style={{ background: projet.couleur }} />}
                      {projet.titre}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}

function Atouts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="carte rounded-2xl p-5">
        <h3 className="font-semibold tracking-tight text-encre">Langues</h3>
        <ul className="mt-3 divide-y divide-ligne">
          {PROFIL.langues.map((langue) => (
            <li key={langue.nom} className="flex justify-between py-2.5 text-sm">
              <span className="text-encre">{langue.nom}</span>
              <span className="text-encre-2">{langue.niveau}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="carte rounded-2xl p-5">
        <h3 className="font-semibold tracking-tight text-encre">Atouts</h3>
        <ul className="mt-3 space-y-2">
          {ATOUTS.map((atout) => (
            <li key={atout} className="flex items-center gap-2.5 rounded-xl bg-surface-2 px-3 py-2.5 text-sm text-encre-2">
              <Sparkles className="size-4 shrink-0 text-vert" />
              {atout}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
