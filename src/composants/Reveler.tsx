import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_SORTIE } from "../outils";

interface Props {
  children: ReactNode;
  delai?: number;
  className?: string;
}

/** Apparition au défilement : montée, fondu et mise au point. Une seule fois. */
export function Reveler({ children, delai = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: delai, ease: EASE_SORTIE }}
    >
      {children}
    </motion.div>
  );
}
