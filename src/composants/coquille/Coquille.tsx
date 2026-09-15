import type { CSSProperties, ReactNode } from "react";
import { BarreHaute } from "./BarreHaute";
import { BarreLaterale, LARGEUR_BARRE, LARGEUR_REDUITE } from "./BarreLaterale";
import { useCoquille } from "./contexte";
import { PanneauDroit } from "./PanneauDroit";
import { PopupContact } from "./PopupContact";

/**
 * La structure de toute l'application : barre latérale à gauche, barre haute,
 * zone de contenu, panneau droit. Les pages ne s'occupent que de leur contenu.
 */
export function Coquille({ children }: { children: ReactNode }) {
  const { reduite } = useCoquille();
  const largeur = reduite ? LARGEUR_REDUITE : LARGEUR_BARRE;

  return (
    <div className="min-h-svh bg-fond" style={{ "--barre": `${largeur}px` } as CSSProperties}>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[90] focus:rounded-lg focus:bg-encre focus:px-3 focus:py-2 focus:text-surface"
      >
        Aller au contenu
      </a>
      <BarreLaterale />
      <div className="transition-[padding] duration-300 lg:pl-[var(--barre)]">
        <BarreHaute />
        <div className="flex">
          <main id="contenu" className="min-w-0 flex-1">
            {children}
          </main>
          <PanneauDroit />
        </div>
      </div>
      <PopupContact />
    </div>
  );
}
