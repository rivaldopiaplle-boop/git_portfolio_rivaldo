import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cx, EASE_SORTIE } from "../outils";

interface Props {
  ouvert: boolean;
  fermer: () => void;
  titre: ReactNode;
  sousTitre?: ReactNode;
  children: ReactNode;
  pied?: ReactNode;
  largeur?: "sm" | "md" | "lg" | "xl";
  /** Fenêtre sombre, pour une image ou du code. */
  sombre?: boolean;
}

const LARGEURS = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl", xl: "max-w-6xl" };

/** Fenêtre modale : voile, Échap, clic hors fenêtre, focus rendu à l'élément d'origine. */
export function Popup({ ouvert, fermer, titre, sousTitre, children, pied, largeur = "md", sombre = false }: Props) {
  const idTitre = useId();
  const fenetre = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ouvert) return;
    const origine = document.activeElement as HTMLElement | null;
    const surTouche = (e: KeyboardEvent) => e.key === "Escape" && fermer();
    document.addEventListener("keydown", surTouche);
    const debordement = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => fenetre.current?.focus());
    return () => {
      document.removeEventListener("keydown", surTouche);
      document.body.style.overflow = debordement;
      origine?.focus?.();
    };
  }, [ouvert, fermer]);

  return createPortal(
    <AnimatePresence>
      {ouvert && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0f1420]/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={fermer}
        >
          <motion.div
            ref={fenetre}
            role="dialog"
            aria-modal="true"
            aria-labelledby={idTitre}
            tabIndex={-1}
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_SORTIE }}
            className={cx(
              "flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-3xl shadow-2xl outline-none sm:rounded-3xl",
              LARGEURS[largeur],
              sombre ? "sombre bg-surface" : "bg-surface",
            )}
          >
            <div className="flex items-start gap-4 border-b border-ligne px-5 py-4 sm:px-6">
              <div className="min-w-0 flex-1">
                <h2 id={idTitre} className="text-lg font-semibold tracking-tight text-encre">
                  {titre}
                </h2>
                {sousTitre && <p className="mt-0.5 text-sm text-encre-2">{sousTitre}</p>}
              </div>
              <button
                type="button"
                onClick={fermer}
                aria-label="Fermer"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-ligne text-encre-2 transition hover:bg-surface-3 hover:text-encre"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
            {pied && <div className="border-t border-ligne bg-surface-2 px-5 py-3.5 sm:px-6">{pied}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
