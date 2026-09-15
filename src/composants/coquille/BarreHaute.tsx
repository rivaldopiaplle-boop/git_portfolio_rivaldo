import { ChevronRight, Download, Mail, Menu, PanelRightClose, PanelRightOpen, Search } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { PROFIL } from "../../contenu/profil";
import { cx } from "../../outils";
import { trouverProjet } from "../../projets";
import { CATEGORIES } from "../../projets/categories";
import { IconeTechno } from "../IconeTechno";
import { useCoquille } from "./contexte";

const PAGES: Record<string, string> = {
  "/": "Tableau de bord",
  "/projets": "Projets",
  "/chaine": "Chaîne CI/CD",
  "/parcours": "Parcours",
  "/competences": "Compétences",
  "/cv": "Curriculum vitæ",
};

function useFilAriane() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/projets/")) {
    const projet = trouverProjet(pathname.split("/")[2]);
    return { section: "Projets", parent: projet ? CATEGORIES[projet.categorie].court : undefined, titre: projet?.titre ?? "Introuvable" };
  }
  return { section: "Portfolio", parent: undefined, titre: PAGES[pathname] ?? "Page introuvable" };
}

export function BarreHaute() {
  const { ouvrirTiroir, panneau, basculerPanneau, ouvrirPanneauMobile, ouvrirContact } = useCoquille();
  const fil = useFilAriane();
  const naviguer = useNavigate();
  const [recherche, setRecherche] = useState("");
  const champ = useRef<HTMLInputElement>(null);

  // « / » place le curseur dans la recherche, comme dans la plupart des back-offices.
  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      const cible = e.target as HTMLElement;
      if (e.key !== "/" || cible.closest("input, textarea, [contenteditable]")) return;
      e.preventDefault();
      champ.current?.focus();
    };
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  }, []);

  const basculer = () => {
    if (window.matchMedia("(min-width: 1280px)").matches) basculerPanneau();
    else ouvrirPanneauMobile(true);
  };

  return (
    <header className="sticky top-0 z-40 flex h-[60px] items-center gap-3 border-b border-ligne bg-surface/95 px-3 backdrop-blur-xl sm:px-5">
      <button
        type="button"
        onClick={() => ouvrirTiroir(true)}
        aria-label="Ouvrir le menu"
        className="grid size-9 shrink-0 place-items-center rounded-lg border border-ligne text-encre-2 lg:hidden"
      >
        <Menu className="size-4" />
      </button>

      <div className="min-w-0 flex-1 lg:w-60 lg:flex-none">
        <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-vert">
          {fil.section}
          {fil.parent && (
            <>
              <ChevronRight className="size-3 text-encre-3" />
              <span className="text-encre-3">{fil.parent}</span>
            </>
          )}
        </p>
        <p className="truncate text-sm font-semibold text-encre">{fil.titre}</p>
      </div>

      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          naviguer(recherche.trim() ? `/projets?q=${encodeURIComponent(recherche.trim())}` : "/projets");
          champ.current?.blur();
        }}
        className="hidden max-w-md flex-1 items-center gap-2.5 rounded-full border border-ligne bg-surface-2 px-4 py-2 transition focus-within:border-ligne-forte focus-within:bg-surface md:flex"
      >
        <Search className="size-4 shrink-0 text-encre-3" />
        <label className="sr-only" htmlFor="recherche-globale">
          Rechercher un projet
        </label>
        <input
          ref={champ}
          id="recherche-globale"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un projet, une technologie…"
          className="w-full bg-transparent text-sm text-encre outline-none placeholder:text-encre-3"
        />
        <kbd className="rounded border border-ligne-forte px-1.5 font-mono text-[10px] text-encre-3">/</kbd>
      </form>

      <div className="ml-auto flex items-center gap-1.5">
        <BoutonIcone href={PROFIL.github} titre="GitHub" className="hidden sm:grid">
          <IconeTechno techno="github" monochrome taille={16} />
        </BoutonIcone>
        {PROFIL.linkedin && (
          <BoutonIcone href={PROFIL.linkedin} titre="LinkedIn" className="hidden sm:grid">
            <span className="grid size-4 place-items-center rounded-[3px] bg-current">
              <span className="text-[9px] font-bold leading-none text-surface">in</span>
            </span>
          </BoutonIcone>
        )}
        <BoutonIcone href={PROFIL.cv} titre="Télécharger le CV" telecharger className="hidden sm:grid">
          <Download className="size-4" />
        </BoutonIcone>
        <button
          type="button"
          onClick={() => ouvrirContact(true)}
          className="inline-flex items-center gap-2 rounded-full bg-encre px-3.5 py-2 text-sm font-medium text-surface transition hover:bg-encre/85"
        >
          <Mail className="size-4" />
          <span className="hidden sm:inline">Me contacter</span>
        </button>
        <button
          type="button"
          onClick={basculer}
          aria-label="Panneau latéral"
          aria-pressed={panneau}
          className="grid size-9 place-items-center rounded-lg border border-ligne text-encre-2 transition hover:bg-surface-3 hover:text-encre"
        >
          {panneau ? <PanelRightClose className="size-4" /> : <PanelRightOpen className="size-4" />}
        </button>
      </div>
    </header>
  );
}

function BoutonIcone({
  href,
  titre,
  telecharger = false,
  className,
  children,
}: {
  href: string;
  titre: string;
  telecharger?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      title={titre}
      aria-label={titre}
      {...(telecharger ? { download: "" } : { target: "_blank", rel: "noreferrer" })}
      className={cx(
        "size-9 place-items-center rounded-lg border border-ligne text-encre-2 transition hover:bg-surface-3 hover:text-encre",
        className,
      )}
    >
      {children}
    </a>
  );
}
