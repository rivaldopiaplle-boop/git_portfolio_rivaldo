import { TECHNOS, type Techno } from "../contenu/technos";
import { cx } from "../outils";

/**
 * Les marques noires ou très sombres disparaissent dans un îlot sombre. Elles
 * gardent leur couleur sur fond clair et passent en clair sous `.sombre`, qui
 * définit `--icone-claire`.
 */
function remplissage(hex: string) {
  const n = Number.parseInt(hex, 16);
  const luminance = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return luminance < 0.32 ? `var(--icone-claire, #${hex})` : `#${hex}`;
}

interface Props {
  techno: Techno;
  taille?: number;
  monochrome?: boolean;
  className?: string;
}

export function IconeTechno({ techno, taille = 18, monochrome = false, className }: Props) {
  const { nom, icone } = TECHNOS[techno];
  if (!icone) {
    return (
      <span
        role="img"
        aria-label={nom}
        className={cx("inline-grid place-items-center rounded font-mono font-semibold leading-none", className)}
        style={{ width: taille, height: taille, fontSize: taille * 0.45 }}
      >
        {nom.slice(0, 2)}
      </span>
    );
  }
  return (
    <svg
      role="img"
      aria-label={nom}
      viewBox="0 0 24 24"
      width={taille}
      height={taille}
      style={{ fill: monochrome ? "currentColor" : remplissage(icone.hex) }}
      className={cx("shrink-0", className)}
    >
      <path d={icone.path} />
    </svg>
  );
}

export function PastilleTechno({ techno, className }: { techno: Techno; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-lg border border-ligne bg-surface-2 py-1 pl-1.5 pr-2.5 text-xs text-encre-2",
        className,
      )}
    >
      <IconeTechno techno={techno} taille={14} />
      {TECHNOS[techno].nom}
    </span>
  );
}
