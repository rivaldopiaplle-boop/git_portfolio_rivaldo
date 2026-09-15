import { Check } from "lucide-react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { EASE_SORTIE } from "../outils";

interface Ligne {
  genre: "commande" | "titre" | "ok" | "final";
  texte: string;
  valeur?: string;
}

/** Relevé des vraies chaînes des deux projets phares, rejoué en boucle. */
const LIGNES: Ligne[] = [
  { genre: "commande", texte: "git push origin main" },
  { genre: "titre", texte: "Intégration — banque-app" },
  { genre: "ok", texte: "API · types, linter, migrations" },
  { genre: "ok", texte: "Banc de preuves", valeur: "994/994" },
  { genre: "ok", texte: "Secrets · historique passé au crible" },
  { genre: "ok", texte: "Refuse de démarrer mal configuré" },
  { genre: "titre", texte: "Vérification — rivdinde" },
  { genre: "ok", texte: "pytest sur PostgreSQL", valeur: "326" },
  { genre: "ok", texte: "Web + mobile · tests, build", valeur: "211" },
  { genre: "titre", texte: "Publication" },
  { genre: "ok", texte: "Image étiquetée par hash du commit" },
  { genre: "final", texte: "render · vercel · neon", valeur: "en ligne" },
];

export function TerminalVivant() {
  const ref = useRef<HTMLDivElement>(null);
  const vu = useInView(ref, { margin: "-10%" });
  const reduit = useReducedMotion();
  const [visibles, setVisibles] = useState(0);
  const affichees = reduit ? LIGNES.length : visibles;

  useEffect(() => {
    if (reduit || !vu) return;
    const fini = visibles >= LIGNES.length;
    const precedente = LIGNES[visibles - 1];
    const delai = visibles === 0 ? 900 : fini ? 4500 : precedente?.genre === "commande" ? 1000 : 420;
    const minuterie = setTimeout(() => setVisibles((v) => (v >= LIGNES.length ? 0 : v + 1)), delai);
    return () => clearTimeout(minuterie);
  }, [visibles, vu, reduit]);

  // Légère inclinaison vers le pointeur
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const incliner = (e: PointerEvent<HTMLDivElement>) => {
    const zone = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - zone.left) / zone.width - 0.5) * 8);
    rx.set(-((e.clientY - zone.top) / zone.height - 0.5) * 8);
  };

  return (
    <div className="[perspective:1400px]">
      <motion.div
        ref={ref}
        onPointerMove={incliner}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: EASE_SORTIE }}
        className="sombre relative overflow-hidden rounded-2xl border border-ligne-forte bg-[#0e1119] shadow-[0_30px_80px_-30px_rgb(15_20_32/0.45)]"
      >
        <div className="flex items-center gap-2 border-b border-ligne px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] text-encre-3">github-actions — main</span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-vert">
            <span className="size-1.5 animate-pulsation rounded-full bg-vert text-vert/60" />
            en direct
          </span>
        </div>

        <div className="min-h-[392px] space-y-1.5 p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
          {LIGNES.slice(0, affichees).map((ligne, i) => (
            <LigneTerminal key={`${i}-${ligne.texte}`} ligne={ligne} />
          ))}
          {affichees < LIGNES.length && <span className="inline-block h-4 w-2 translate-y-0.5 animate-clignote bg-vert" />}
        </div>

        <div className="h-0.5 bg-ligne">
          <motion.div
            className="h-full bg-linear-to-r from-vert to-cyan"
            animate={{ width: `${(affichees / LIGNES.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>
    </div>
  );
}

function LigneTerminal({ ligne }: { ligne: Ligne }) {
  const apparition = { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.25 } };

  if (ligne.genre === "commande") {
    return (
      <motion.p {...apparition} className="flex gap-2">
        <span className="text-cyan">~/projets</span>
        <span className="text-encre-3">$</span>
        <motion.span
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.7, ease: "linear" }}
          className="text-encre"
        >
          {ligne.texte}
        </motion.span>
      </motion.p>
    );
  }
  if (ligne.genre === "titre") {
    return (
      <motion.p {...apparition} className="pt-2 text-encre-2">
        <span className="text-violet">▸</span> {ligne.texte}
      </motion.p>
    );
  }
  const final = ligne.genre === "final";
  return (
    <motion.p {...apparition} className="flex items-center gap-2 pl-4">
      {final ? (
        <span className="size-2 animate-pulsation rounded-full bg-vert text-vert/60" />
      ) : (
        <Check className="size-3.5 shrink-0 text-vert" strokeWidth={3} />
      )}
      <span className={final ? "text-encre" : "text-encre-2"}>{ligne.texte}</span>
      {ligne.valeur && (
        <>
          <span className="mx-1 hidden flex-1 border-b border-dotted border-ligne-forte sm:block" />
          <span className={final ? "rounded-full bg-vert/15 px-2 text-vert" : "text-vert"}>{ligne.valeur}</span>
        </>
      )}
    </motion.p>
  );
}
