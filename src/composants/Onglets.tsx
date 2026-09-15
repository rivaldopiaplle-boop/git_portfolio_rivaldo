import { motion } from "motion/react";
import { useId, type ComponentType } from "react";
import { cx } from "../outils";

export interface Onglet<T extends string> {
  id: T;
  nom: string;
  icone?: ComponentType<{ className?: string }>;
  compte?: number;
}

interface Props<T extends string> {
  onglets: Onglet<T>[];
  actif: T;
  choisir: (id: T) => void;
  className?: string;
}

/** Navigation par onglets, soulignée : la barre de second ordre des pages. */
export function Onglets<T extends string>({ onglets, actif, choisir, className }: Props<T>) {
  const groupe = useId();
  return (
    <div role="tablist" className={cx("-mb-px flex gap-1 overflow-x-auto", className)}>
      {onglets.map(({ id, nom, icone: Icone, compte }) => {
        const selectionne = id === actif;
        return (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={selectionne}
            onClick={() => choisir(id)}
            className={cx(
              "relative flex shrink-0 items-center gap-2 px-3.5 pb-3 pt-2.5 text-sm transition-colors",
              selectionne ? "font-medium text-encre" : "text-encre-2 hover:text-encre",
            )}
          >
            {Icone && <Icone className="size-4" />}
            {nom}
            {compte !== undefined && (
              <span
                className={cx(
                  "rounded-full px-1.5 py-px font-mono text-[10px] tabular-nums",
                  selectionne ? "bg-encre text-surface" : "bg-surface-3 text-encre-2",
                )}
              >
                {compte}
              </span>
            )}
            {selectionne && (
              <motion.span
                layoutId={`onglet-${groupe}`}
                className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-vert"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
