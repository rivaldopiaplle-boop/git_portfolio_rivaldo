import { motion } from "motion/react";
import { useId } from "react";
import { EASE_SORTIE } from "../outils";

interface Props {
  taille?: number;
  anime?: boolean;
  className?: string;
}

/** Le monogramme R dessiné comme un graphe Git : un tronc, une boucle, une branche qui fusionne. */
export function Logo({ taille = 36, anime = true, className }: Props) {
  const id = useId();
  const trace = anime ? { initial: { pathLength: 0 }, animate: { pathLength: 1 } } : {};
  const noeud = anime ? { initial: { scale: 0 }, animate: { scale: 1 } } : {};

  return (
    <svg width={taille} height={taille} viewBox="0 0 40 40" fill="none" className={className} role="img" aria-label="Monogramme RP">
      <defs>
        <linearGradient id={id} x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3ee6a3" />
          <stop offset="1" stopColor="#5cc8ff" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="39" height="39" rx="11" fill="#0d0f16" stroke="rgb(255 255 255 / 0.1)" />
      <motion.path
        d="M13 30V10h8.5a6.5 6.5 0 0 1 0 13H13"
        stroke={`url(#${id})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...trace}
        transition={{ duration: 1.1, ease: EASE_SORTIE }}
      />
      <motion.path
        d="M20 23l8 7"
        stroke={`url(#${id})`}
        strokeWidth="3"
        strokeLinecap="round"
        {...trace}
        transition={{ duration: 0.5, delay: 0.8, ease: EASE_SORTIE }}
      />
      <motion.circle cx="13" cy="30" r="2.6" fill="#07080d" stroke="#3ee6a3" strokeWidth="2" {...noeud} transition={{ delay: 0.9, type: "spring", stiffness: 400, damping: 18 }} />
      <motion.circle cx="28" cy="30" r="2.6" fill="#5cc8ff" {...noeud} transition={{ delay: 1.1, type: "spring", stiffness: 400, damping: 18 }} />
      <motion.circle cx="20" cy="23" r="2" fill="#eef0f6" {...noeud} transition={{ delay: 1.2, type: "spring", stiffness: 400, damping: 18 }} />
    </svg>
  );
}
