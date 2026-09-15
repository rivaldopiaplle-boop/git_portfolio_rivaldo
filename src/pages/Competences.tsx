import { Link, useSearchParams } from "react-router";
import { EnTetePage, ZonePage } from "../composants/EnTetePage";
import { IconeTechno } from "../composants/IconeTechno";
import { Onglets } from "../composants/Onglets";
import { COMPETENCES } from "../contenu/competences";
import { TECHNOS } from "../contenu/technos";
import { useTitre } from "../outils";
import { PROJETS } from "../projets";

export default function Competences() {
  useTitre("Compétences — Rivaldo Piaplle");
  const [params, setParams] = useSearchParams();
  const index = Math.max(0, COMPETENCES.findIndex((c) => String(COMPETENCES.indexOf(c)) === params.get("domaine")));
  const domaine = COMPETENCES[index] ?? COMPETENCES[0]!;

  return (
    <>
      <EnTetePage titre="Compétences" description="Chaque outil ci-dessous a servi dans au moins un projet : cliquez-le pour voir lesquels.">
        <Onglets
          onglets={COMPETENCES.map((c, i) => ({ id: String(i), nom: c.titre, icone: c.icone }))}
          actif={String(index)}
          choisir={(id) => setParams({ domaine: id }, { replace: true, preventScrollReset: true })}
        />
      </EnTetePage>

      <ZonePage className="space-y-5">
        <div className="carte flex items-start gap-4 rounded-2xl p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-vert/10 text-vert">
            <domaine.icone className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-encre">{domaine.titre}</h2>
            <p className="mt-1 text-sm leading-relaxed text-encre-2">{domaine.texte}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
          {domaine.technos.map((techno) => {
            const projets = PROJETS.filter((p) => p.stack.includes(techno));
            return (
              <div key={techno} className="carte flex flex-col rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-surface-2">
                    <IconeTechno techno={techno} taille={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-encre">{TECHNOS[techno].nom}</p>
                    <p className="text-xs text-encre-3">
                      {projets.length === 0 ? "Utilisée en formation" : `${projets.length} projet${projets.length > 1 ? "s" : ""}`}
                    </p>
                  </div>
                  {projets.length > 0 && (
                    <Link to={`/projets?techno=${techno}`} className="ml-auto text-xs text-vert hover:underline">
                      Filtrer
                    </Link>
                  )}
                </div>
                {projets.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 border-t border-ligne pt-3">
                    {projets.map((projet) => (
                      <Link
                        key={projet.slug}
                        to={`/projets/${projet.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-surface-2 px-2 py-1 text-xs text-encre-2 transition hover:bg-surface-3 hover:text-encre"
                      >
                        <span className="size-1.5 rounded-full" style={{ background: projet.couleur }} />
                        {projet.titre}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ZonePage>
    </>
  );
}
