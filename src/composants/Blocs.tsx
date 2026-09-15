import { ArrowUpRight } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { Link } from "react-router";
import { cx } from "../outils";
import type { EtapeFeuilleDeRoute } from "../projets/types";
import { Compteur } from "./Compteur";

type Icone = ComponentType<{ className?: string }>;

export function TitreBloc({ titre, sous, action, className }: { titre: ReactNode; sous?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cx("mb-3 flex items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <h2 className="text-base font-semibold tracking-tight text-encre">{titre}</h2>
        {sous && <p className="mt-0.5 text-sm text-encre-2">{sous}</p>}
      </div>
      {action}
    </div>
  );
}

/** Une tuile de chiffre clé. Elle mène toujours quelque part : un chiffre qu'on ne peut qu'admirer est un élément mort. */
export function Kpi({ vers, libelle, valeur, suffixe, detail, icone: IconeKpi }: { vers: string; libelle: string; valeur: number; suffixe?: string; detail: string; icone: Icone }) {
  return (
    <Link to={vers} className="carte group block rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-ligne-forte">
      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-encre-3">{libelle}</p>
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-3 text-encre-2 transition group-hover:bg-encre group-hover:text-surface">
          <IconeKpi className="size-4" />
        </span>
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-encre">
        <Compteur valeur={valeur} suffixe={suffixe} />
      </p>
      <p className="mt-1 truncate text-xs text-encre-2">{detail}</p>
    </Link>
  );
}

export function CarteAction({
  numero,
  duree,
  titre,
  texte,
  vers,
  href,
  icone: IconeAction,
}: {
  numero: string;
  duree: string;
  titre: string;
  texte: string;
  vers?: string;
  href?: string;
  icone: Icone;
}) {
  const contenu = (
    <>
      <div className="flex items-center justify-between">
        <span className="grid size-9 place-items-center rounded-xl bg-vert/10 text-vert">
          <IconeAction className="size-[18px]" />
        </span>
        <span className="rounded-full bg-surface-3 px-2 py-0.5 font-mono text-[10px] text-encre-2">
          {numero} · {duree}
        </span>
      </div>
      <p className="mt-3 flex items-center gap-1.5 font-semibold tracking-tight text-encre">
        {titre}
        <ArrowUpRight className="size-4 text-encre-3 transition group-hover:rotate-45 group-hover:text-encre" />
      </p>
      <p className="mt-1 text-sm leading-relaxed text-encre-2">{texte}</p>
    </>
  );
  const classe = "carte group block rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-vert/40";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classe}>
        {contenu}
      </a>
    );
  }
  return (
    <Link to={vers ?? "/"} className={classe}>
      {contenu}
    </Link>
  );
}

export function EtatRoute({ etat }: { etat: EtapeFeuilleDeRoute["etat"] }) {
  return etat === "en-cours" ? (
    <span className="shrink-0 rounded-full border border-violet/30 bg-violet/10 px-2 py-0.5 text-[11px] font-medium text-violet">En cours</span>
  ) : (
    <span className="shrink-0 rounded-full border border-ligne bg-surface-3 px-2 py-0.5 text-[11px] text-encre-2">Prévu</span>
  );
}

export function Indice({ icone: IconeIndice, children }: { icone?: Icone; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-surface-3 px-1.5 py-0.5 text-[11px] text-encre-2">
      {IconeIndice && <IconeIndice className="size-3" />}
      {children}
    </span>
  );
}

/** Bouton-icône d'une ligne ou d'une carte : infobulle et libellé accessible, toujours. */
export function BoutonIcone({ titre, onClick, children, principal = false }: { titre: string; onClick?: () => void; children: ReactNode; principal?: boolean }) {
  return (
    <button
      type="button"
      title={titre}
      aria-label={titre}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={cx(
        "grid size-8 place-items-center rounded-lg transition",
        principal ? "bg-encre text-surface hover:bg-encre/85" : "border border-ligne text-encre-2 hover:bg-surface-3 hover:text-encre",
      )}
    >
      {children}
    </button>
  );
}
