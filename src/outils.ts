import { useEffect, useState, type PointerEvent } from "react";

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

/** Vrai sur un écran de téléphone. Suit les rotations et les changements de fenêtre. */
export function useEcranTelephone() {
  const requete = "(max-width: 767px)";
  const [telephone, setTelephone] = useState(() => typeof window !== "undefined" && window.matchMedia(requete).matches);
  useEffect(() => {
    const media = window.matchMedia(requete);
    const suivre = () => setTelephone(media.matches);
    media.addEventListener("change", suivre);
    return () => media.removeEventListener("change", suivre);
  }, []);
  return telephone;
}

/** Retient, le temps de la visite, que le visiteur est passé par la version téléphone. */
const CLE_VUE_MOBILE = "portfolio:vue-mobile";

export function retenirVueMobile() {
  try {
    sessionStorage.setItem(CLE_VUE_MOBILE, "1");
  } catch {
    // Stockage refusé : le lien « Version téléphone » de la barre latérale reste là.
  }
}

export function vientDeLaVueMobile() {
  try {
    return sessionStorage.getItem(CLE_VUE_MOBILE) === "1";
  } catch {
    return false;
  }
}

export function useTitre(titre: string) {
  useEffect(() => {
    document.title = titre;
  }, [titre]);
}
