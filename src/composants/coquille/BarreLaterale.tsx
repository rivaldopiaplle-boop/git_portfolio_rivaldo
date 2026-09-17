import {
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Layers,
  PanelLeftClose,
  PanelLeftOpen,
  Smartphone,
  Workflow,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ComponentType, ReactNode } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router";
import { PROFIL } from "../../contenu/profil";
import { cx, EASE_SORTIE } from "../../outils";
import { PHARES, PROJETS } from "../../projets";
import { CATEGORIES, ORDRE_CATEGORIES } from "../../projets/categories";
import { Logo } from "../Logo";
import { useCoquille } from "./contexte";

export const LARGEUR_BARRE = 248;
export const LARGEUR_REDUITE = 72;

const NAVIGATION: { vers: string; nom: string; icone: ComponentType<{ className?: string }>; exact?: boolean; compte?: number }[] = [
  { vers: "/", nom: "Tableau de bord", icone: LayoutDashboard, exact: true },
  { vers: "/projets", nom: "Projets", icone: FolderKanban, compte: PROJETS.length },
  { vers: "/chaine", nom: "Chaîne CI/CD", icone: Workflow },
  { vers: "/parcours", nom: "Parcours", icone: GraduationCap },
  { vers: "/competences", nom: "Compétences", icone: Layers },
  { vers: "/cv", nom: "CV", icone: FileText },
  { vers: "/mobile", nom: "Version téléphone", icone: Smartphone },
];

export function BarreLaterale() {
  const { reduite, tiroir, ouvrirTiroir } = useCoquille();
  return (
    <>
      <aside
        aria-label="Navigation principale"
        className="sombre fixed inset-y-0 left-0 z-50 hidden border-r border-ligne bg-[#0e1119] transition-[width] duration-300 lg:block"
        style={{ width: reduite ? LARGEUR_REDUITE : LARGEUR_BARRE }}
      >
        <Contenu reduite={reduite} />
      </aside>

      <AnimatePresence>
        {tiroir && (
          <>
            <motion.div
              key="voile"
              className="fixed inset-0 z-[60] bg-[#0f1420]/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => ouvrirTiroir(false)}
            />
            <motion.aside
              key="tiroir"
              aria-label="Navigation principale"
              className="sombre fixed inset-y-0 left-0 z-[61] w-[284px] max-w-[86vw] bg-[#0e1119] lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: EASE_SORTIE }}
            >
              <Contenu reduite={false} fermer={() => ouvrirTiroir(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Contenu({ reduite, fermer }: { reduite: boolean; fermer?: () => void }) {
  const { basculerReduite } = useCoquille();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const categorieActive = pathname === "/projets" ? params.get("categorie") : null;

  return (
    <div className="flex h-full flex-col">
      <div className={cx("flex h-[60px] shrink-0 items-center gap-2.5 border-b border-ligne", reduite ? "justify-center px-2" : "px-4")}>
        <Link to="/" onClick={fermer} className="flex min-w-0 items-center gap-2.5" aria-label="Tableau de bord">
          <Logo taille={32} anime={false} />
          {!reduite && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-encre">
                {PROFIL.prenom} {PROFIL.nom}
              </span>
              <span className="block truncate text-[11px] text-encre-3">{PROFIL.titre}</span>
            </span>
          )}
        </Link>
        {fermer && (
          <button
            type="button"
            onClick={fermer}
            aria-label="Fermer le menu"
            className="ml-auto grid size-8 place-items-center rounded-lg text-encre-2 hover:bg-white/5"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <nav className="defilement-fin flex-1 space-y-6 overflow-y-auto px-2.5 py-5">
        <Groupe titre="Portfolio" reduite={reduite}>
          {NAVIGATION.map((entree) => (
            <NavLink
              key={entree.vers}
              to={entree.vers}
              end={entree.exact}
              onClick={fermer}
              title={reduite ? entree.nom : undefined}
              className={({ isActive }) => classeEntree(isActive, reduite)}
            >
              {({ isActive }) => (
                <>
                  {isActive && <Repere />}
                  <entree.icone className="size-[18px] shrink-0" />
                  {!reduite && <span className="flex-1 truncate">{entree.nom}</span>}
                  {!reduite && entree.compte !== undefined && (
                    <span className="font-mono text-[10px] tabular-nums text-encre-3">{entree.compte}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </Groupe>

        <Groupe titre="Catégories" reduite={reduite}>
          {ORDRE_CATEGORIES.map((cle) => {
            const { court, icone: Icone, couleur } = CATEGORIES[cle];
            const actif = categorieActive === cle;
            const compte = PROJETS.filter((p) => p.categorie === cle).length;
            return (
              <Link
                key={cle}
                to={`/projets?categorie=${cle}`}
                onClick={fermer}
                title={reduite ? court : undefined}
                className={classeEntree(actif, reduite)}
              >
                {actif && <Repere />}
                <Icone className="size-[18px] shrink-0" style={{ color: couleur }} />
                {!reduite && <span className="flex-1 truncate">{court}</span>}
                {!reduite && <span className="font-mono text-[10px] tabular-nums text-encre-3">{compte}</span>}
              </Link>
            );
          })}
        </Groupe>

        <Groupe titre="Projets phares" reduite={reduite}>
          {PHARES.map((projet) => (
            <NavLink
              key={projet.slug}
              to={`/projets/${projet.slug}`}
              onClick={fermer}
              title={reduite ? projet.titre : undefined}
              className={({ isActive }) => classeEntree(isActive, reduite)}
            >
              {({ isActive }) => (
                <>
                  {isActive && <Repere />}
                  {projet.logo ? (
                    <img src={projet.logo} alt="" className="size-[18px] shrink-0 rounded-[5px] object-cover" />
                  ) : (
                    <span className="size-[18px] shrink-0 rounded-[5px]" style={{ background: projet.couleur }} />
                  )}
                  {!reduite && <span className="flex-1 truncate">{projet.titre}</span>}
                  {!reduite && projet.statut === "en-ligne" && <span className="size-1.5 rounded-full bg-vert" title="En ligne" />}
                </>
              )}
            </NavLink>
          ))}
        </Groupe>
      </nav>

      <div className="shrink-0 space-y-2 border-t border-ligne p-2.5">
        {!reduite && (
          <div className="rounded-xl border border-ligne bg-white/[0.03] p-3">
            <p className="flex items-center gap-2 text-xs font-medium text-encre">
              <span className="size-1.5 animate-pulsation rounded-full bg-vert text-vert/50" />
              Disponible
            </p>
            <p className="mt-1 text-[11px] leading-snug text-encre-2">{PROFIL.recherche}</p>
            <p className="text-[11px] leading-snug text-encre-3">{PROFIL.disponibilite}</p>
          </div>
        )}
        <button
          type="button"
          onClick={basculerReduite}
          className={cx(
            "hidden w-full items-center gap-2 rounded-xl py-2 text-xs text-encre-2 transition hover:bg-white/5 hover:text-encre lg:flex",
            reduite ? "justify-center" : "px-3",
          )}
          aria-label={reduite ? "Déplier la barre latérale" : "Réduire la barre latérale"}
        >
          {reduite ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          {!reduite && "Réduire"}
        </button>
      </div>
    </div>
  );
}

function Groupe({ titre, reduite, children }: { titre: string; reduite: boolean; children: ReactNode }) {
  return (
    <div>
      {reduite ? (
        <span className="mx-auto mb-2 block h-px w-6 bg-ligne-forte" />
      ) : (
        <p className="mb-1.5 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-encre-3">{titre}</p>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function Repere() {
  return (
    <motion.span
      layoutId="repere-barre"
      className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-vert"
      transition={{ type: "spring", stiffness: 420, damping: 36 }}
    />
  );
}

function classeEntree(actif: boolean, reduite: boolean) {
  return cx(
    "relative flex items-center gap-3 rounded-xl py-2 text-sm transition-colors",
    reduite ? "justify-center px-0" : "px-3",
    actif ? "bg-white/[0.08] font-medium text-encre" : "text-encre-2 hover:bg-white/[0.04] hover:text-encre",
  );
}
