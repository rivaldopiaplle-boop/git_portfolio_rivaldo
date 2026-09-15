import { ArrowUpRight, Eye, LayoutGrid, List, Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { BadgeEvolution, BadgeStatut } from "../composants/BadgeStatut";
import { BoutonIcone } from "../composants/Blocs";
import { CarteProjet } from "../composants/CarteProjet";
import { usePanneauDroit } from "../composants/coquille/contexte";
import { TitrePanneau } from "../composants/coquille/PanneauDroit";
import { EnTetePage, ZonePage } from "../composants/EnTetePage";
import { IconeTechno } from "../composants/IconeTechno";
import { Onglets } from "../composants/Onglets";
import { Popup } from "../composants/Popup";
import { PopupApercu } from "../composants/PopupApercu";
import { TECHNOS, type Techno } from "../contenu/technos";
import { cx, useTitre } from "../outils";
import { ceQuOnPeutVoir, PROJETS } from "../projets";
import { compter, correspond, lireFiltres, technosFrequentes, type Filtres } from "../projets/catalogue";
import { CATEGORIES, ORDRE_CATEGORIES, ORDRE_STATUTS, STATUTS } from "../projets/categories";
import type { Categorie, Projet } from "../projets/types";

type Vue = "grille" | "liste";

function lireVue(): Vue {
  try {
    return localStorage.getItem("projets.vue") === "liste" ? "liste" : "grille";
  } catch {
    return "grille";
  }
}

export default function Projets() {
  useTitre("Projets — Rivaldo Piaplle");
  const [params, setParams] = useSearchParams();
  const [apercu, setApercu] = useState<Projet | null>(null);
  const [vue, setVue] = useState<Vue>(lireVue);
  const [technosOuvertes, setTechnosOuvertes] = useState(false);

  const filtres = lireFiltres(params);
  const resultats = PROJETS.filter((p) => correspond(p, filtres));
  const actifs = Boolean(filtres.statut || filtres.techno || filtres.recherche);

  const poser = (cle: string, valeur: string | null) => {
    const suivant = new URLSearchParams(params);
    if (valeur === null || valeur === "") suivant.delete(cle);
    else suivant.set(cle, valeur);
    setParams(suivant, { replace: true, preventScrollReset: true });
  };
  const changerVue = (v: Vue) => {
    setVue(v);
    try {
      localStorage.setItem("projets.vue", v);
    } catch {
      // Préférence non mémorisée : sans conséquence.
    }
  };

  usePanneauDroit(`projets?${params.toString()}`, () => <PanneauSelection filtres={filtres} resultats={resultats} poser={poser} />);

  const onglets = [
    { id: "tous" as const, nom: "Tous", compte: compter(PROJETS, filtres, "categorie", null) },
    ...ORDRE_CATEGORIES.map((cle) => ({
      id: cle,
      nom: CATEGORIES[cle].court,
      icone: CATEGORIES[cle].icone,
      compte: compter(PROJETS, filtres, "categorie", cle),
    })),
  ];

  return (
    <>
      <EnTetePage
        titre="Projets"
        description="Chaque projet a une fiche : le problème, les choix, ce qu'on peut ouvrir — site, dépôt, captures ou extraits de code."
        actions={
          <div role="group" aria-label="Affichage" className="inline-flex rounded-xl border border-ligne bg-surface-2 p-1">
            {(
              [
                ["grille", LayoutGrid, "Grille"],
                ["liste", List, "Liste"],
              ] as const
            ).map(([id, Icone, nom]) => (
              <button
                key={id}
                type="button"
                onClick={() => changerVue(id)}
                aria-pressed={vue === id}
                className={cx(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition",
                  vue === id ? "bg-surface text-encre shadow-sm" : "text-encre-2 hover:text-encre",
                )}
              >
                <Icone className="size-4" /> {nom}
              </button>
            ))}
          </div>
        }
      >
        <Onglets
          onglets={onglets}
          actif={filtres.categorie ?? "tous"}
          choisir={(id) => poser("categorie", id === "tous" ? null : (id as Categorie))}
        />
      </EnTetePage>

      <ZonePage className="space-y-5">
        <div className="carte flex flex-wrap items-center gap-2 rounded-2xl p-2.5">
          <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl bg-surface-2 px-3 py-2">
            <Search className="size-4 text-encre-3" />
            <span className="sr-only">Rechercher</span>
            <input
              value={filtres.recherche}
              onChange={(e) => poser("q", e.target.value)}
              placeholder="Docker, robot, React, ROS…"
              className="w-full bg-transparent text-sm text-encre outline-none placeholder:text-encre-3"
            />
            {filtres.recherche && (
              <button type="button" onClick={() => poser("q", null)} aria-label="Effacer la recherche" className="text-encre-3 hover:text-encre">
                <X className="size-4" />
              </button>
            )}
          </label>

          <div className="flex flex-wrap gap-1">
            {ORDRE_STATUTS.map((statut) => {
              const actif = filtres.statut === statut;
              const nombre = compter(PROJETS, filtres, "statut", statut);
              return (
                <button
                  key={statut}
                  type="button"
                  disabled={nombre === 0 && !actif}
                  onClick={() => poser("statut", actif ? null : statut)}
                  aria-pressed={actif}
                  className={cx(
                    "inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm transition disabled:opacity-40",
                    actif ? "border-encre bg-encre text-surface" : "border-ligne text-encre-2 hover:border-ligne-forte hover:text-encre",
                  )}
                >
                  <span className="size-1.5 rounded-full" style={{ background: STATUTS[statut].couleur }} />
                  {STATUTS[statut].nom}
                  <span className={cx("font-mono text-[10px]", actif ? "text-surface/70" : "text-encre-3")}>{nombre}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setTechnosOuvertes(true)}
            className={cx(
              "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition",
              filtres.techno ? "border-vert/40 bg-vert/10 text-vert" : "border-ligne text-encre-2 hover:border-ligne-forte hover:text-encre",
            )}
          >
            <SlidersHorizontal className="size-4" />
            {filtres.techno ? TECHNOS[filtres.techno].nom : "Technologie"}
          </button>
          {filtres.techno && (
            <button type="button" onClick={() => poser("techno", null)} aria-label="Retirer le filtre technologie" className="grid size-9 place-items-center rounded-xl border border-ligne text-encre-2 hover:text-encre">
              <X className="size-4" />
            </button>
          )}

          <p className="ml-auto px-2 text-sm text-encre-2" aria-live="polite">
            <span className="font-semibold text-encre">{resultats.length}</span> {resultats.length > 1 ? "projets" : "projet"}
          </p>
        </div>

        {resultats.length === 0 ? (
          <div className="carte grid place-items-center rounded-2xl py-20 text-center">
            <SearchX className="size-8 text-encre-3" />
            <p className="mt-4 font-medium text-encre">Aucun projet ne réunit tous ces critères.</p>
            <p className="mt-1 text-sm text-encre-2">Retirez un filtre : les compteurs indiquent ce qui reste.</p>
            <button type="button" onClick={() => setParams(new URLSearchParams(), { replace: true })} className="mt-5 rounded-xl bg-encre px-4 py-2 text-sm font-medium text-surface">
              Voir tous les projets
            </button>
          </div>
        ) : vue === "grille" ? (
          <motion.div layout className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {resultats.map((projet) => (
                <CarteProjet key={projet.slug} projet={projet} apercu={setApercu} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <Tableau projets={resultats} apercu={setApercu} />
        )}

        {actifs && resultats.length > 0 && (
          <button type="button" onClick={() => setParams(filtres.categorie ? { categorie: filtres.categorie } : {}, { replace: true })} className="text-sm text-encre-2 underline-offset-4 hover:text-encre hover:underline">
            Effacer les filtres
          </button>
        )}
      </ZonePage>

      <PopupApercu projet={apercu} fermer={() => setApercu(null)} />
      <PopupTechnos ouvert={technosOuvertes} fermer={() => setTechnosOuvertes(false)} filtres={filtres} choisir={(t) => poser("techno", t)} />
    </>
  );
}

function Tableau({ projets, apercu }: { projets: Projet[]; apercu: (p: Projet) => void }) {
  const naviguer = useNavigate();
  return (
    <div className="carte overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-surface-2 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-encre-3">
            <tr>
              <th className="px-4 py-3 font-normal">Projet</th>
              <th className="px-3 py-3 font-normal">Catégorie</th>
              <th className="px-3 py-3 font-normal">Statut</th>
              <th className="px-3 py-3 font-normal">Stack</th>
              <th className="px-3 py-3 font-normal">À voir</th>
              <th className="px-4 py-3 text-right font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projets.map((projet) => {
              const categorie = CATEGORIES[projet.categorie];
              const voir = ceQuOnPeutVoir(projet);
              return (
                <tr key={projet.slug} onClick={() => naviguer(`/projets/${projet.slug}`)} className="cursor-pointer border-t border-ligne transition hover:bg-surface-2">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {projet.logo ? (
                        <img src={projet.logo} alt="" className="size-8 rounded-lg border border-ligne object-cover" />
                      ) : (
                        <span className="grid size-8 place-items-center rounded-lg text-white" style={{ background: projet.couleur }}>
                          <categorie.icone className="size-4" />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-encre">{projet.titre}</p>
                        <p className="max-w-[320px] truncate text-xs text-encre-3">{projet.accroche}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-encre-2">
                    <span className="inline-flex items-center gap-1.5">
                      <categorie.icone className="size-3.5" style={{ color: categorie.couleur }} />
                      {categorie.court}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      <BadgeStatut statut={projet.statut} />
                      {projet.feuilleDeRoute && <BadgeEvolution />}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1">
                      {projet.stack.slice(0, 4).map((techno) => (
                        <IconeTechno key={techno} techno={techno} taille={16} />
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-xs text-encre-2">
                    {[voir.demos && "site", voir.depotsPublics && "code", voir.images && `${voir.images} images`, voir.extraits && "extraits"].filter(Boolean).join(" · ")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <BoutonIcone titre="Aperçu rapide" onClick={() => apercu(projet)}>
                        <Eye className="size-4" />
                      </BoutonIcone>
                      <BoutonIcone titre="Ouvrir la fiche" principal onClick={() => naviguer(`/projets/${projet.slug}`)}>
                        <ArrowUpRight className="size-4" />
                      </BoutonIcone>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PopupTechnos({ ouvert, fermer, filtres, choisir }: { ouvert: boolean; fermer: () => void; filtres: Filtres; choisir: (t: Techno | null) => void }) {
  const toutes = technosFrequentes(PROJETS);
  return (
    <Popup ouvert={ouvert} fermer={fermer} titre="Filtrer par technologie" sousTitre="Le nombre indique les projets qui resteraient affichés." largeur="lg">
      <div className="flex flex-wrap gap-2">
        {toutes.map(({ techno }) => {
          const actif = filtres.techno === techno;
          const nombre = compter(PROJETS, filtres, "techno", techno);
          return (
            <button
              key={techno}
              type="button"
              disabled={nombre === 0 && !actif}
              onClick={() => {
                choisir(actif ? null : techno);
                fermer();
              }}
              className={cx(
                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition disabled:opacity-35",
                actif ? "border-encre bg-encre text-surface" : "border-ligne text-encre-2 hover:border-ligne-forte hover:text-encre",
              )}
            >
              <IconeTechno techno={techno} taille={15} monochrome={actif} />
              {TECHNOS[techno].nom}
              <span className={cx("font-mono text-[10px]", actif ? "text-surface/70" : "text-encre-3")}>{nombre}</span>
            </button>
          );
        })}
      </div>
    </Popup>
  );
}

function PanneauSelection({ filtres, resultats, poser }: { filtres: Filtres; resultats: Projet[]; poser: (cle: string, valeur: string | null) => void }) {
  const technos = technosFrequentes(resultats, 10);
  const enLigne = resultats.filter((p) => p.statut === "en-ligne").length;
  const images = resultats.reduce((total, p) => total + (p.galerie?.length ?? 0), 0);
  return (
    <div className="space-y-6">
      <div>
        <TitrePanneau>Votre sélection</TitrePanneau>
        <div className="grid grid-cols-3 gap-2">
          {[
            [resultats.length, "projets"],
            [enLigne, "en ligne"],
            [images, "images"],
          ].map(([valeur, libelle]) => (
            <div key={libelle} className="rounded-xl bg-surface-2 p-3 text-center">
              <p className="text-xl font-semibold text-encre">{valeur}</p>
              <p className="text-[11px] text-encre-3">{libelle}</p>
            </div>
          ))}
        </div>
      </div>

      {(filtres.categorie || filtres.statut || filtres.techno || filtres.recherche) && (
        <div>
          <TitrePanneau>Filtres actifs</TitrePanneau>
          <div className="flex flex-wrap gap-1.5">
            {filtres.categorie && <Puce texte={CATEGORIES[filtres.categorie].court} retirer={() => poser("categorie", null)} />}
            {filtres.statut && <Puce texte={STATUTS[filtres.statut].nom} retirer={() => poser("statut", null)} />}
            {filtres.techno && <Puce texte={TECHNOS[filtres.techno].nom} retirer={() => poser("techno", null)} />}
            {filtres.recherche && <Puce texte={`« ${filtres.recherche} »`} retirer={() => poser("q", null)} />}
          </div>
        </div>
      )}

      <div>
        <TitrePanneau>Technologies de la sélection</TitrePanneau>
        <ul className="space-y-1">
          {technos.map(({ techno, nombre }) => (
            <li key={techno}>
              <button
                type="button"
                onClick={() => poser("techno", filtres.techno === techno ? null : techno)}
                className={cx(
                  "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition hover:bg-surface-2",
                  filtres.techno === techno ? "bg-surface-2 font-medium text-encre" : "text-encre-2",
                )}
              >
                <IconeTechno techno={techno} taille={15} />
                <span className="flex-1">{TECHNOS[techno].nom}</span>
                <span className="font-mono text-[11px] text-encre-3">{nombre}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Puce({ texte, retirer }: { texte: string; retirer: () => void }) {
  return (
    <button type="button" onClick={retirer} className="inline-flex items-center gap-1 rounded-full border border-ligne bg-surface-2 py-1 pl-2.5 pr-1.5 text-xs text-encre-2 hover:text-encre">
      {texte} <X className="size-3" />
    </button>
  );
}
