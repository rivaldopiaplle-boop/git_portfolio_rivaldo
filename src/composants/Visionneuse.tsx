import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Media } from "../projets/types";
import { cx } from "../outils";

interface Props {
  medias: Media[];
  index: number | null;
  changer: (index: number | null) => void;
}

/** Galerie plein écran : flèches du clavier, Échap, vignettes cliquables. */
export function Visionneuse({ medias, index, changer }: Props) {
  const ouvert = index !== null;
  const media = index !== null ? medias[index] : undefined;

  const aller = useCallback(
    (pas: number) => {
      if (index === null) return;
      changer((index + pas + medias.length) % medias.length);
    },
    [index, medias.length, changer],
  );

  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") changer(null);
      if (e.key === "ArrowRight") aller(1);
      if (e.key === "ArrowLeft") aller(-1);
    };
    document.addEventListener("keydown", surTouche);
    const debordement = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", surTouche);
      document.body.style.overflow = debordement;
    };
  }, [ouvert, aller, changer]);

  return createPortal(
    <AnimatePresence>
      {ouvert && media && (
        <motion.div
          className="sombre fixed inset-0 z-[90] flex flex-col bg-[#07080d]/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Galerie d'images"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="min-w-0 truncate text-sm text-encre-2">
              <span className="font-mono text-encre-3">
                {index + 1} / {medias.length}
              </span>
              {media.legende && <span className="ml-3 text-encre">{media.legende}</span>}
            </p>
            <button type="button" onClick={() => changer(null)} aria-label="Fermer la galerie" className="grid size-10 place-items-center rounded-full border border-ligne-forte text-encre hover:bg-white/10">
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 sm:px-20" onClick={() => changer(null)}>
            <AnimatePresence mode="wait">
              <motion.img
                key={media.src}
                src={media.src}
                alt={media.alt}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className={cx(
                  "max-h-full max-w-full rounded-xl object-contain shadow-2xl",
                  media.format === "schema" || media.format === "photo" ? "bg-white" : "",
                )}
              />
            </AnimatePresence>
            {medias.length > 1 && (
              <>
                <BoutonNav cote="gauche" onClick={(e) => (e.stopPropagation(), aller(-1))} />
                <BoutonNav cote="droite" onClick={(e) => (e.stopPropagation(), aller(1))} />
              </>
            )}
          </div>

          {medias.length > 1 && (
            <div className="flex justify-center gap-2 overflow-x-auto px-4 py-4">
              {medias.map((m, i) => (
                <button
                  key={m.src}
                  type="button"
                  onClick={() => changer(i)}
                  aria-label={`Image ${i + 1}`}
                  className={cx(
                    "h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition",
                    i === index ? "border-vert" : "border-transparent opacity-50 hover:opacity-100",
                  )}
                >
                  <img src={m.src} alt="" className="h-full w-full bg-white object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function BoutonNav({ cote, onClick }: { cote: "gauche" | "droite"; onClick: (e: React.MouseEvent) => void }) {
  const Icone = cote === "gauche" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={cote === "gauche" ? "Image précédente" : "Image suivante"}
      className={cx(
        "absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-ligne-forte bg-surface/70 text-encre hover:bg-white/10",
        cote === "gauche" ? "left-3 sm:left-5" : "right-3 sm:right-5",
      )}
    >
      <Icone className="size-5" />
    </button>
  );
}
