import { Check, Copy, Download, Mail, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { PROFIL } from "../../contenu/profil";
import { EASE_SORTIE } from "../../outils";
import { BlocQr } from "../BlocQr";
import { IconeTechno } from "../IconeTechno";
import { Logo } from "../Logo";
import { useCoquille } from "./contexte";

/**
 * Le panneau droit : une colonne stable sur grand écran, un tiroir ailleurs.
 * Chaque page y dépose ce qui mérite de rester sous les yeux ; sans rien, il
 * montre comment me joindre.
 */
export function PanneauDroit() {
  const { panneau, panneauMobile, ouvrirPanneauMobile, contenuPanneau } = useCoquille();
  const contenu = contenuPanneau ?? <PanneauContact />;

  return (
    <>
      <AnimatePresence initial={false}>
        {panneau && (
          <motion.aside
            key="colonne"
            aria-label="Panneau latéral"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_SORTIE }}
            className="sticky top-[60px] hidden h-[calc(100svh-60px)] shrink-0 overflow-hidden border-l border-ligne bg-surface xl:block"
          >
            <div className="defilement-fin h-full w-80 overflow-y-auto p-5">{contenu}</div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {panneauMobile && (
          <>
            <motion.div
              key="voile"
              className="fixed inset-0 z-[60] bg-[#0f1420]/45 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => ouvrirPanneauMobile(false)}
            />
            <motion.aside
              key="tiroir"
              aria-label="Panneau latéral"
              className="fixed inset-y-0 right-0 z-[61] w-[340px] max-w-[90vw] overflow-y-auto bg-surface p-5 xl:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: EASE_SORTIE }}
            >
              <button
                type="button"
                onClick={() => ouvrirPanneauMobile(false)}
                aria-label="Fermer le panneau"
                className="mb-3 ml-auto grid size-8 place-items-center rounded-lg border border-ligne text-encre-2"
              >
                <X className="size-4" />
              </button>
              {contenu}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function TitrePanneau({ children }: { children: ReactNode }) {
  return <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-encre-3">{children}</p>;
}

function PanneauContact() {
  const { ouvrirContact } = useCoquille();
  const [copie, setCopie] = useState(false);
  const local = /^(localhost|127\.|192\.168\.)/.test(window.location.hostname);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(PROFIL.email);
      setCopie(true);
      setTimeout(() => setCopie(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFIL.email}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="sombre relative overflow-hidden rounded-2xl bg-[#0e1119] p-5">
        <div aria-hidden className="grille absolute inset-0 opacity-60" />
        <div className="relative">
          <Logo taille={44} />
          <p className="mt-4 text-lg font-semibold tracking-tight">
            {PROFIL.prenom} {PROFIL.nom}
          </p>
          <p className="text-sm text-encre-2">
            {PROFIL.titre} · {PROFIL.ecole} {PROFIL.niveau}
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-encre">
            <span className="mt-1.5 size-1.5 shrink-0 animate-pulsation rounded-full bg-vert text-vert/50" />
            {PROFIL.recherche}
          </p>
        </div>
      </div>

      <div>
        <TitrePanneau>Me joindre</TitrePanneau>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => ouvrirContact(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-encre px-4 py-2.5 text-sm font-medium text-surface transition hover:bg-encre/85"
          >
            <Mail className="size-4" /> Écrire un message
          </button>
          <button
            type="button"
            onClick={copier}
            className="flex w-full items-center gap-2 rounded-xl border border-ligne px-3 py-2.5 text-left text-sm text-encre-2 transition hover:bg-surface-2"
          >
            {copie ? <Check className="size-4 text-vert" /> : <Copy className="size-4" />}
            <span className="truncate">{copie ? "Adresse copiée" : PROFIL.email}</span>
          </button>
          <div className="grid grid-cols-3 gap-2">
            <a href={PROFIL.github} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 rounded-xl border border-ligne py-2.5 text-[11px] text-encre-2 transition hover:bg-surface-2">
              <IconeTechno techno="github" monochrome taille={16} /> GitHub
            </a>
            {PROFIL.linkedin ? (
              <a href={PROFIL.linkedin} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 rounded-xl border border-ligne py-2.5 text-[11px] text-encre-2 transition hover:bg-surface-2">
                <span className="grid size-4 place-items-center rounded-[3px] bg-[#0a66c2] text-[9px] font-bold text-white">in</span>
                LinkedIn
              </a>
            ) : (
              <span />
            )}
            <a href={PROFIL.cv} download className="flex flex-col items-center gap-1 rounded-xl border border-ligne py-2.5 text-[11px] text-encre-2 transition hover:bg-surface-2">
              <Download className="size-4" /> CV
            </a>
          </div>
        </div>
      </div>

      <div>
        <TitrePanneau>Langues</TitrePanneau>
        <ul className="space-y-1.5 text-sm">
          {PROFIL.langues.map((langue) => (
            <li key={langue.nom} className="flex justify-between">
              <span className="text-encre">{langue.nom}</span>
              <span className="text-encre-3">{langue.niveau}</span>
            </li>
          ))}
        </ul>
      </div>

      {!local && (
        <div>
          <TitrePanneau>Sur téléphone</TitrePanneau>
          <BlocQr url={window.location.origin} libelle="Ce portfolio" detail="Scannez pour le rouvrir" />
        </div>
      )}
    </div>
  );
}
