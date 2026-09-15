import { useEffect, type PointerEvent } from "react";

export const EASE_SORTIE = [0.22, 1, 0.36, 1] as const;

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Pose la position du pointeur en variables CSS : le halo `.projecteur` la suit. */
export function suivrePointeur(e: PointerEvent<HTMLElement>) {
  const zone = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - zone.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - zone.top}px`);
}

export function sansProtocole(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function useTitre(titre: string) {
  useEffect(() => {
    document.title = titre;
  }, [titre]);
}
