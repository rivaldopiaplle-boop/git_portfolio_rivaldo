import { Activity, Boxes, Check, Cloud, GitCommitHorizontal, LoaderCircle, ShieldCheck } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useRef, useState, type ComponentType } from "react";
import { cx } from "../outils";
import type { EtapePipeline, GenreEtape } from "../projets/types";

export const GENRES: Record<GenreEtape, { nom: string; icone: ComponentType<{ className?: string }>; explication: string }> = {
  declencheur: { nom: "Déclencheur", icone: GitCommitHorizontal, explication: "Ce qui lance la chaîne : une poussée ou une pull request." },
  verification: { nom: "Vérification", icone: ShieldCheck, explication: "Tout ce qui doit être vert avant que quoi que ce soit ne sorte." },
  publication: { nom: "Publication", icone: Boxes, explication: "Les images construites et étiquetées, prêtes à déployer." },
  hebergement: { nom: "Hébergement", icone: Cloud, explication: "Là où le projet tourne réellement." },
  surveillance: { nom: "Surveillance", icone: Activity, explication: "Ce qui vérifie, après coup, que tout répond encore." },
};

type Etat = "fait" | "encours" | "attente";

const DUREE_ETAPE = 1900;

/**
 * Une chaîne CI/CD qui s'exécute sous les yeux : chaque étage passe au vert à
 * son tour, puis la chaîne repart. Elle se couche à l'horizontale dès que *sa
 * zone* est assez large, et non l'écran : le panneau droit peut être ouvert.
 * À poser dans un îlot `.sombre`. Parent : poser `key` pour repartir de zéro.
 */
export function Pipeline({ etapes, couleur }: { etapes: EtapePipeline[]; couleur: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const vu = useInView(ref, { margin: "-10%" });
  const reduit = useReducedMotion();
  const [actif, setActif] = useState(0);
  const courant = reduit ? etapes.length : actif;

  useEffect(() => {
    if (reduit || !vu) return;
    const fini = actif >= etapes.length;
    const minuterie = setTimeout(() => setActif((a) => (a >= etapes.length ? 0 : a + 1)), fini ? 4000 : DUREE_ETAPE);
    return () => clearTimeout(minuterie);
  }, [actif, vu, reduit, etapes.length]);

  return (
    <div className="@container">
      <div ref={ref} className="flex flex-col @4xl:flex-row @4xl:items-stretch">
        {etapes.map((etape, i) => {
          const etat: Etat = i < courant ? "fait" : i === courant ? "encours" : "attente";
          return (
            <Fragment key={`${etape.genre}-${etape.titre}`}>
              {i > 0 && <Connecteur etat={i < courant ? "fait" : i === courant ? "flux" : "attente"} couleur={couleur} />}
              <Colonne etape={etape} etat={etat} couleur={couleur} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function Colonne({ etape, etat, couleur }: { etape: EtapePipeline; etat: Etat; couleur: string }) {
  const { nom, icone: Icone } = GENRES[etape.genre];
  const multiple = etape.taches.length > 1;

  return (
    <motion.div
      animate={{ opacity: etat === "attente" ? 0.5 : 1 }}
      transition={{ duration: 0.5 }}
      className={cx(
        "relative min-w-0 rounded-2xl border bg-surface/70 p-3 transition-[border-color,box-shadow] duration-500",
        multiple ? "@4xl:flex-[2.4]" : "@4xl:flex-1",
        etat === "encours" ? "border-transparent" : "border-ligne",
      )}
      style={etat === "encours" ? { boxShadow: `0 0 0 1px ${couleur}, 0 0 44px -12px ${couleur}` } : undefined}
    >
      <div className="mb-3 flex items-center gap-2 px-1">
        <Icone className="size-4 shrink-0 text-encre-3" />
        <div className="min-w-0">
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-encre-3">{nom}</p>
          <p className="truncate text-sm font-medium text-encre">{etape.titre}</p>
        </div>
        <span className="ml-auto">
          <Pastille etat={etat} couleur={couleur} />
        </span>
      </div>

      <div className={cx("grid gap-2", multiple && "@md:grid-cols-2")}>
        {etape.taches.map((tache) => (
          <div key={tache.nom} className="rounded-xl border border-ligne bg-surface-2/70 p-3">
            <p className="mb-2 text-[13px] font-medium text-encre">{tache.nom}</p>
            <ul className="space-y-1.5">
              {tache.controles.map((controle, j) => (
                <li key={controle} className="flex items-start gap-2 text-[12px] leading-snug text-encre-2">
                  <motion.span
                    className="mt-[3px] grid size-3.5 shrink-0 place-items-center rounded-full"
                    initial={false}
                    animate={{
                      backgroundColor: etat === "attente" ? "rgba(255,255,255,0.06)" : "rgba(62,230,163,0.16)",
                      color: etat === "attente" ? "rgba(255,255,255,0.25)" : "#3ee6a3",
                    }}
                    transition={{ duration: 0.3, delay: etat === "encours" ? 0.15 + j * 0.22 : 0 }}
                  >
                    <Check className="size-2.5" strokeWidth={3.5} />
                  </motion.span>
                  {controle}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Pastille({ etat, couleur }: { etat: Etat; couleur: string }) {
  if (etat === "fait")
    return (
      <span className="grid size-6 place-items-center rounded-full bg-vert/15 text-vert">
        <Check className="size-3.5" strokeWidth={3} />
      </span>
    );
  if (etat === "encours")
    return (
      <span className="grid size-6 place-items-center rounded-full" style={{ background: `${couleur}33`, color: "#eef0f6" }}>
        <LoaderCircle className="size-3.5 animate-spin" strokeWidth={2.5} />
      </span>
    );
  return <span className="block size-6 rounded-full border border-dashed border-ligne-forte" />;
}

function Connecteur({ etat, couleur }: { etat: "fait" | "flux" | "attente"; couleur: string }) {
  const trait = etat === "attente" ? "rgba(255,255,255,0.1)" : etat === "fait" ? "rgba(62,230,163,0.6)" : couleur;
  const point = { background: couleur, boxShadow: `0 0 12px ${couleur}` };
  return (
    <div className="relative mx-auto h-6 w-px @4xl:mx-0 @4xl:h-auto @4xl:w-6 @4xl:shrink-0 @4xl:self-center" aria-hidden>
      <span className="absolute inset-0 @4xl:inset-y-auto @4xl:top-1/2 @4xl:h-px" style={{ background: trait }} />
      {etat === "flux" && (
        <>
          <motion.span
            className="absolute left-1/2 size-2 -translate-x-1/2 rounded-full @4xl:hidden"
            style={point}
            animate={{ top: ["-10%", "100%"] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeIn" }}
          />
          <motion.span
            className="absolute top-1/2 hidden size-2 -translate-y-1/2 rounded-full @4xl:block"
            style={point}
            animate={{ left: ["-10%", "100%"] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeIn" }}
          />
        </>
      )}
    </div>
  );
}
