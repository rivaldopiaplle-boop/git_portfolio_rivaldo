import { ArrowUpRight, Check, Copy, GitBranch, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { sansProtocole } from "../outils";
import type { Depot, Preuve } from "../projets/types";
import { useCoquille } from "./coquille/contexte";

/**
 * Un dépôt, selon ce qu'un visiteur peut réellement en faire :
 * public → lien à ouvrir ou à copier ; privé → signalé, sans lien (il tomberait
 * sur une 404), et ce sont les extraits de code de la fiche qui montrent le
 * travail ; pas encore poussé → annoncé.
 *
 * C'est la pratique courante : un recruteur lit ce qui est public et n'accepte
 * presque jamais une invitation sur un dépôt privé. Le bouton de demande reste
 * là pour celui qui insiste, il ne remplace pas les extraits.
 *
 * Pas de QR code ici : on lit du code sur un écran, pas sur un téléphone. Les QR
 * codes sont réservés à ce qui se scanne debout, devant quelqu'un : un site, une
 * application mobile, des maquettes.
 */
/** Une preuve : son badge d'état s'il en a un, puis le lien pour aller voir. */
export function LignePreuve({ preuve }: { preuve: Preuve }) {
  return (
    <div className="rounded-2xl border border-ligne bg-surface-2/60 p-3.5">
      <p className="text-sm font-medium text-encre">{preuve.libelle}</p>
      {preuve.detail && <p className="mt-0.5 text-xs text-encre-3">{preuve.detail}</p>}
      {preuve.badge && <img src={preuve.badge} alt="" className="mt-2 h-5" />}
      <a
        href={preuve.url}
        target="_blank"
        rel="noreferrer"
        className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-encre px-3 py-1 text-xs font-medium text-surface transition hover:bg-encre/85"
      >
        Aller voir <ArrowUpRight className="size-3" />
      </a>
    </div>
  );
}

export function LigneDepot({ depot }: { depot: Depot }) {
  const { ouvrirContact } = useCoquille();
  const [copie, setCopie] = useState(false);

  const copier = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopie(true);
      setTimeout(() => setCopie(false), 1800);
    } catch {
      // Presse-papiers refusé : le lien reste lisible et cliquable.
    }
  };

  if (depot.url && depot.visibilite === "public") {
    const url = depot.url;
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-ligne bg-surface-2/60 p-3.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-3 text-encre-2">
          <GitBranch className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-encre">{depot.libelle}</p>
          <p className="mt-0.5 text-xs text-encre-3">Dépôt public sur GitHub</p>
          <p className="mt-1.5 truncate font-mono text-[11px] text-encre-2">{sansProtocole(url)}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-encre px-3 py-1 text-xs font-medium text-surface transition hover:bg-encre/85"
            >
              Ouvrir <ArrowUpRight className="size-3" />
            </a>
            <button
              type="button"
              onClick={() => copier(url)}
              className="inline-flex items-center gap-1 rounded-full border border-ligne px-3 py-1 text-xs text-encre-2 transition hover:bg-surface-3 hover:text-encre"
            >
              {copie ? <Check className="size-3 text-vert" /> : <Copy className="size-3" />}
              {copie ? "Copié" : "Copier"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (depot.url) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-ligne bg-surface-2 p-3.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-3 text-encre-2">
          <Lock className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-encre">{depot.libelle}</p>
          <p className="mt-0.5 text-xs text-encre-3">Dépôt privé : il contient du code fourni par le cours. Les extraits de la fiche montrent le travail</p>
          <button
            type="button"
            onClick={() => ouvrirContact(true)}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-ligne bg-surface px-2.5 py-1 text-xs text-encre-2 transition hover:border-ligne-forte hover:text-encre"
          >
            <Mail className="size-3" /> Demander l'accès
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-dashed border-ligne-forte p-3.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-3 text-encre-3">
        <GitBranch className="size-4" />
      </span>
      <div>
        <p className="text-sm font-medium text-encre">{depot.libelle}</p>
        <p className="mt-0.5 text-xs text-encre-3">Publication sur GitHub en préparation</p>
      </div>
    </div>
  );
}
