import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import type { Projet } from "../projets/types";
import { BadgeEvolution, BadgeStatut } from "./BadgeStatut";
import { BlocQr } from "./BlocQr";
import { LigneDepot } from "./Depots";
import { PastilleTechno } from "./IconeTechno";
import { Popup } from "./Popup";
import { VisuelProjet } from "./VisuelProjet";

/** Voir un projet sans quitter la liste : l'essentiel, les liens, et la porte vers la fiche. */
export function PopupApercu({ projet, fermer }: { projet: Projet | null; fermer: () => void }) {
  // Garde le dernier projet affiché le temps de l'animation de fermeture.
  const [affiche, setAffiche] = useState(projet);
  if (projet && projet !== affiche) setAffiche(projet);
  const p = projet ?? affiche;

  return (
    <Popup
      ouvert={projet !== null}
      fermer={fermer}
      largeur="lg"
      titre={p?.titre}
      sousTitre={p?.accroche}
      pied={
        p && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-encre-3">{p.cadre}</span>
            <Link
              to={`/projets/${p.slug}`}
              onClick={fermer}
              className="inline-flex items-center gap-1.5 rounded-xl bg-encre px-3.5 py-2 text-sm font-medium text-surface transition hover:bg-encre/85"
            >
              Ouvrir la fiche complète <ArrowRight className="size-4" />
            </Link>
          </div>
        )
      }
    >
      {p && (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-1.5">
            <BadgeStatut statut={p.statut} />
            {p.feuilleDeRoute && <BadgeEvolution />}
          </div>
          <VisuelProjet projet={p} />
          <p className="text-sm leading-relaxed text-encre-2">{p.resume}</p>

          {p.chiffres && (
            <dl className="grid grid-cols-3 gap-2">
              {p.chiffres.slice(0, 3).map((chiffre) => (
                <div key={chiffre.libelle} className="rounded-xl bg-surface-2 p-3">
                  <dd className="text-xl font-semibold tracking-tight text-encre">
                    {chiffre.valeur.toLocaleString("fr-FR")}
                    {chiffre.suffixe}
                  </dd>
                  <dt className="mt-0.5 text-[11px] leading-snug text-encre-3">{chiffre.libelle}</dt>
                </div>
              ))}
            </dl>
          )}

          {((p.demos?.length ?? 0) > 0 || p.depots.length > 0) && (
            <div className="grid gap-3 sm:grid-cols-2">
              {p.demos?.map((demo) => (
                <BlocQr key={demo.url} url={demo.url} libelle={demo.libelle} detail={demo.detail} />
              ))}
              {p.depots.map((depot) => (
                <LigneDepot key={depot.libelle} depot={depot} />
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((techno) => (
              <PastilleTechno key={techno} techno={techno} />
            ))}
          </div>
        </div>
      )}
    </Popup>
  );
}
