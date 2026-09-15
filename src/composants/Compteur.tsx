import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

interface Props {
  valeur: number;
  suffixe?: string;
  duree?: number;
}

const formater = (v: number, suffixe: string) => `${Math.round(v).toLocaleString("fr-FR")}${suffixe}`;

export function Compteur({ valeur, suffixe = "", duree = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const vu = useInView(ref, { once: true, margin: "-40px" });
  const reduit = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !vu) return;
    if (reduit) {
      el.textContent = formater(valeur, suffixe);
      return;
    }
    const controles = animate(0, valeur, {
      duration: duree,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = formater(v, suffixe);
      },
    });
    return () => controles.stop();
  }, [vu, valeur, suffixe, duree, reduit]);

  return (
    <span ref={ref} className="tabular-nums">
      {formater(0, suffixe)}
    </span>
  );
}
