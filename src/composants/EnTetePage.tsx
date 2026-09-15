import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_SORTIE } from "../outils";

interface Props {
  surtitre?: ReactNode;
  titre: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** La barre de second ordre : onglets, en bas de l'en-tête. */
  children?: ReactNode;
  icone?: ReactNode;
}

/** L'en-tête blanc d'une page, posé sur le fond gris, avec sa navigation de second ordre. */
export function EnTetePage({ surtitre, titre, description, actions, children, icone }: Props) {
  return (
    <div className="border-b border-ligne bg-surface">
      <div className="mx-auto max-w-[1320px] px-4 pt-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_SORTIE }}
          className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${children ? "pb-4" : "pb-6"}`}
        >
          <div className="flex min-w-0 items-start gap-4">
            {icone}
            <div className="min-w-0">
              {surtitre && <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs text-encre-3">{surtitre}</div>}
              <h1 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-encre sm:text-[1.75rem]">{titre}</h1>
              {description && <p className="mt-1.5 max-w-3xl text-pretty text-sm leading-relaxed text-encre-2">{description}</p>}
            </div>
          </div>
          {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
        </motion.div>
        {children}
      </div>
    </div>
  );
}

export function ZonePage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1320px] px-4 py-6 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Bouton d'action d'en-tête, interne ou externe. */
export function ActionEnTete({
  href,
  onClick,
  children,
  principal = false,
  telecharger = false,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  principal?: boolean;
  telecharger?: boolean;
}) {
  const classe = principal
    ? "inline-flex items-center gap-2 rounded-xl bg-encre px-4 py-2.5 text-sm font-medium text-surface transition hover:bg-encre/85"
    : "inline-flex items-center gap-2 rounded-xl border border-ligne bg-surface px-4 py-2.5 text-sm font-medium text-encre transition hover:bg-surface-2";
  if (href) {
    const externe = /^https?:/.test(href);
    return (
      <a href={href} className={classe} {...(telecharger ? { download: "" } : externe ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classe}>
      {children}
    </button>
  );
}
