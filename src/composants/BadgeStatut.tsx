import { TrendingUp } from "lucide-react";
import { STATUTS } from "../projets/categories";
import type { Statut } from "../projets/types";
import { cx } from "../outils";

export function BadgeStatut({ statut, className }: { statut: Statut; className?: string }) {
  const { nom, couleur } = STATUTS[statut];
  return (
    <span
      className={cx("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium", className)}
      style={{ color: couleur, background: `color-mix(in srgb, ${couleur} 9%, var(--color-surface))`, borderColor: `${couleur}40` }}
    >
      <span className={cx("size-1.5 rounded-full", statut === "en-ligne" && "animate-pulsation")} style={{ background: couleur, color: `${couleur}66` }} />
      {nom}
    </span>
  );
}

/** Le projet continue : il a une feuille de route. */
export function BadgeEvolution({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full border border-violet/30 bg-[color-mix(in_srgb,var(--color-violet)_9%,var(--color-surface))] px-2 py-0.5 text-[11px] font-medium text-violet",
        className,
      )}
    >
      <TrendingUp className="size-3" />
      En évolution
    </span>
  );
}
