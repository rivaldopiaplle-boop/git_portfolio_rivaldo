import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface EtatCoquille {
  /** Barre latérale réduite à ses icônes (bureau). */
  reduite: boolean;
  basculerReduite: () => void;
  /** Barre latérale ouverte en tiroir (mobile). */
  tiroir: boolean;
  ouvrirTiroir: (ouvert: boolean) => void;
  /** Panneau droit en colonne (grand écran), mémorisé d'une visite à l'autre. */
  panneau: boolean;
  basculerPanneau: () => void;
  /** Panneau droit en tiroir (petit écran), toujours fermé au chargement. */
  panneauMobile: boolean;
  ouvrirPanneauMobile: (ouvert: boolean) => void;
  /** Ce que la page en cours dépose dans le panneau droit. */
  contenuPanneau: ReactNode | null;
  poserContenuPanneau: (contenu: ReactNode | null) => void;
  contact: boolean;
  ouvrirContact: (ouvert: boolean) => void;
}

const Contexte = createContext<EtatCoquille | null>(null);

function lire(cle: string, defaut: boolean) {
  try {
    const valeur = localStorage.getItem(cle);
    return valeur === null ? defaut : valeur === "1";
  } catch {
    return defaut;
  }
}

function ecrire(cle: string, valeur: boolean) {
  try {
    localStorage.setItem(cle, valeur ? "1" : "0");
  } catch {
    // Stockage indisponible (navigation privée) : le réglage vit le temps de la visite.
  }
}

export function FournisseurCoquille({ children }: { children: ReactNode }) {
  const [reduite, setReduite] = useState(() => lire("coquille.reduite", false));
  const [panneau, setPanneau] = useState(() => lire("coquille.panneau", true));
  const [panneauMobile, ouvrirPanneauMobile] = useState(false);
  const [tiroir, ouvrirTiroir] = useState(false);
  const [contact, ouvrirContact] = useState(false);
  const [contenuPanneau, poserContenuPanneau] = useState<ReactNode | null>(null);

  const basculerReduite = useCallback(() => {
    setReduite((r) => {
      ecrire("coquille.reduite", !r);
      return !r;
    });
  }, []);
  const basculerPanneau = useCallback(() => {
    setPanneau((p) => {
      ecrire("coquille.panneau", !p);
      return !p;
    });
  }, []);

  const valeur = useMemo(
    () => ({
      reduite,
      basculerReduite,
      tiroir,
      ouvrirTiroir,
      panneau,
      basculerPanneau,
      panneauMobile,
      ouvrirPanneauMobile,
      contenuPanneau,
      poserContenuPanneau,
      contact,
      ouvrirContact,
    }),
    [reduite, basculerReduite, tiroir, panneau, basculerPanneau, panneauMobile, contenuPanneau, contact],
  );

  return <Contexte.Provider value={valeur}>{children}</Contexte.Provider>;
}

export function useCoquille() {
  const etat = useContext(Contexte);
  if (!etat) throw new Error("useCoquille doit être appelé sous <FournisseurCoquille>.");
  return etat;
}

/**
 * Une page dépose son contenu dans le panneau droit, et le reprend en partant.
 * `cle` dit quand le contenu change réellement (un slug, un filtre).
 */
export function usePanneauDroit(cle: string, fabriquer: () => ReactNode) {
  const { poserContenuPanneau } = useCoquille();
  useEffect(() => {
    poserContenuPanneau(fabriquer());
    return () => poserContenuPanneau(null);
    // `fabriquer` change à chaque rendu : seule la clé décide.
  }, [cle, poserContenuPanneau]); // eslint-disable-line react-hooks/exhaustive-deps
}
