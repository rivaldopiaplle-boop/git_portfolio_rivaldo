import { GitBranch, Lock, Mail } from "lucide-react";
import type { Depot } from "../projets/types";
import { BlocQr } from "./BlocQr";
import { useCoquille } from "./coquille/contexte";

/**
 * Un dépôt, selon ce qu'un visiteur peut réellement en faire :
 * public → lien et QR code ; privé → signalé, sans lien (il tomberait sur une
 * 404) mais avec un accès sur demande ; pas encore poussé → annoncé.
 */
export function LigneDepot({ depot }: { depot: Depot }) {
  const { ouvrirContact } = useCoquille();

  if (depot.url && depot.visibilite === "public") {
    return <BlocQr url={depot.url} libelle={depot.libelle} detail="Dépôt public sur GitHub" />;
  }
  if (depot.url) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-ligne bg-surface-2 p-3.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-3 text-encre-2">
          <Lock className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-encre">{depot.libelle}</p>
          <p className="mt-0.5 text-xs text-encre-3">Dépôt privé — accessible sur demande</p>
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
