import { ArrowLeft, ArrowRight, Check, ChevronRight, Code, Copy, Globe, Images, LayoutGrid, Lightbulb, MonitorPlay, Route, Users, Workflow } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { BadgeEvolution, BadgeStatut } from "../composants/BadgeStatut";
import { BlocQr } from "../composants/BlocQr";
import { EtatRoute, TitreBloc } from "../composants/Blocs";
import { Compteur } from "../composants/Compteur";
import { usePanneauDroit } from "../composants/coquille/contexte";
import { TitrePanneau } from "../composants/coquille/PanneauDroit";
import { LigneDepot, LignePreuve } from "../composants/Depots";
import { ActionEnTete, EnTetePage, ZonePage } from "../composants/EnTetePage";
import { IconeTechno, PastilleTechno } from "../composants/IconeTechno";
import { Lecteur } from "../composants/Lecteur";
import { Onglets, type Onglet } from "../composants/Onglets";
import { Pipeline } from "../composants/Pipeline";
import { CouvertureProjet, ImageCadree } from "../composants/VisuelProjet";
import { Visionneuse } from "../composants/Visionneuse";
import { useEcranTelephone, useTitre } from "../outils";
import { demoPrincipale, PROJETS, trouverProjet } from "../projets";
import { CATEGORIES, STATUTS } from "../projets/categories";
import type { Media, Projet } from "../projets/types";
import Introuvable from "./Introuvable";

type IdOnglet = "apercu" | "film" | "galerie" | "chaine" | "feuille" | "code" | "lecons";

export default function FicheProjet() {
  const { slug } = useParams();
  const projet = trouverProjet(slug);
  const [params, setParams] = useSearchParams();
  const [image, setImage] = useState<number | null>(null);
  useTitre(projet ? `${projet.titre} | Rivaldo Piaplle` : "Projet introuvable");
  const telephone = useEcranTelephone();
  usePanneauDroit(`fiche-${slug}`, () => (projet ? <PanneauProjet projet={projet} /> : null));

  if (!projet) return <Introuvable />;

  const onglets: Onglet<IdOnglet>[] = [{ id: "apercu", nom: "Vue d'ensemble", icone: LayoutGrid }];
  if (projet.film) onglets.push({ id: "film", nom: "Démonstration", icone: MonitorPlay });
  if (projet.galerie?.length) onglets.push({ id: "galerie", nom: "Galerie", icone: Images, compte: projet.galerie.length });
  if (projet.pipeline) onglets.push({ id: "chaine", nom: "Chaîne CI/CD", icone: Workflow });
  if (projet.feuilleDeRoute) onglets.push({ id: "feuille", nom: "Feuille de route", icone: Route, compte: projet.feuilleDeRoute.length });
  onglets.push({ id: "code", nom: "Code", icone: Code, compte: (projet.extraits?.length ?? 0) + projet.depots.length });
  if (projet.lecons) onglets.push({ id: "lecons", nom: "Leçons", icone: Lightbulb });

  const actif = onglets.find((o) => o.id === params.get("onglet"))?.id ?? "apercu";
  const choisir = (id: IdOnglet) => setParams(id === "apercu" ? {} : { onglet: id }, { replace: true, preventScrollReset: true });

  const categorie = CATEGORIES[projet.categorie];
  const demo = demoPrincipale(projet, telephone);
  const depotPublic = projet.depots.find((d) => d.visibilite === "public" && d.url);

  return (
    <>
      <EnTetePage
        icone={
          projet.logo ? (
            <img src={projet.logo} alt="" className="size-14 shrink-0 rounded-2xl border border-ligne object-cover shadow-sm" />
          ) : (
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl text-white shadow-sm" style={{ background: projet.couleur }}>
              <categorie.icone className="size-6" />
            </span>
          )
        }
        surtitre={
          <>
            <Link to="/projets" className="hover:text-encre">
              Projets
            </Link>
            <ChevronRight className="size-3" />
            <Link to={`/projets?categorie=${projet.categorie}`} className="inline-flex items-center gap-1 hover:text-encre">
              <categorie.icone className="size-3.5" style={{ color: categorie.couleur }} />
              {categorie.court}
            </Link>
            <span>·</span>
            <span>
              {projet.cadre} · {projet.annee}
            </span>
          </>
        }
        titre={projet.titre}
        description={projet.accroche}
        actions={
          <>
            {depotPublic?.url && (
              <ActionEnTete href={depotPublic.url}>
                <IconeTechno techno="github" monochrome taille={16} /> Code source
              </ActionEnTete>
            )}
            {demo && (
              <ActionEnTete principal href={demo.url}>
                <Globe className="size-4" /> Voir en ligne
              </ActionEnTete>
            )}
          </>
        }
      >
        <div className="mb-2 flex flex-wrap gap-1.5">
          <BadgeStatut statut={projet.statut} />
          {projet.feuilleDeRoute && <BadgeEvolution />}
          {projet.equipe && (
            <span className="inline-flex items-center gap-1 rounded-full border border-ligne bg-surface-2 px-2 py-0.5 text-[11px] text-encre-2">
              <Users className="size-3" /> {projet.equipe}
            </span>
          )}
        </div>
        <Onglets onglets={onglets} actif={actif} choisir={choisir} />
      </EnTetePage>

      <ZonePage>
        <AnimatePresence mode="wait">
          <motion.div key={actif} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            {actif === "apercu" && <OngletApercu projet={projet} ouvrirImage={setImage} voirGalerie={() => choisir("galerie")} />}
            {actif === "film" && projet.film && <Lecteur film={projet.film} />}
            {actif === "galerie" && projet.galerie && <OngletGalerie medias={projet.galerie} couleur={projet.couleur} ouvrir={setImage} />}
            {actif === "chaine" && projet.pipeline && (
              <div className="sombre rounded-2xl bg-[#0e1119] p-4 sm:p-5">
                <p className="mb-4 text-sm text-encre-2">Relevée dans le fichier de workflow du dépôt. Chaque étage passe au vert à son tour.</p>
                <Pipeline etapes={projet.pipeline} couleur={projet.couleur} />
              </div>
            )}
            {actif === "feuille" && projet.feuilleDeRoute && (
              <div className="carte rounded-2xl p-2">
                <p className="px-3 pb-2 pt-3 text-sm text-encre-2">Le projet continue : voici ce qui vient ensuite, dans l'ordre.</p>
                <ol className="divide-y divide-ligne">
                  {projet.feuilleDeRoute.map((etape, i) => (
                    <li key={etape.titre} className="flex items-start gap-4 px-3 py-4">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-3 font-mono text-xs text-encre-2">{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-encre">{etape.titre}</p>
                        <p className="mt-0.5 text-sm text-encre-2">{etape.detail}</p>
                      </div>
                      <EtatRoute etat={etape.etat} />
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {actif === "code" && <OngletCode projet={projet} />}
            {actif === "lecons" && projet.lecons && (
              <div className="grid gap-4 md:grid-cols-2">
                {projet.lecons.map((lecon) => (
                  <div key={lecon.titre} className="carte rounded-2xl p-5">
                    <Lightbulb className="size-5" style={{ color: projet.couleur }} />
                    <h3 className="mt-3 font-semibold tracking-tight text-encre">{lecon.titre}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-encre-2">{lecon.texte}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <Voisins projet={projet} />
      </ZonePage>

      {projet.galerie && <Visionneuse medias={projet.galerie} index={image} changer={setImage} />}
    </>
  );
}

function OngletApercu({ projet, ouvrirImage, voirGalerie }: { projet: Projet; ouvrirImage: (i: number) => void; voirGalerie: () => void }) {
  const galerie = projet.galerie ?? [];
  return (
    <div className="space-y-6">
      {projet.couverture ? (
        <button type="button" onClick={() => ouvrirImage(0)} className="block w-full text-left" aria-label="Agrandir l'image">
          <ImageCadree media={projet.couverture} couleur={projet.couleur} grand className="rounded-2xl transition hover:border-ligne-forte" />
        </button>
      ) : (
        <CouvertureProjet projet={projet} />
      )}

      {projet.chiffres && (
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {projet.chiffres.map((chiffre, i) => (
            <div key={chiffre.libelle} className="carte rounded-2xl p-4">
              <dd className="text-2xl font-semibold tracking-[-0.03em]" style={{ color: i === 0 ? projet.couleur : undefined }}>
                <Compteur valeur={chiffre.valeur} suffixe={chiffre.suffixe} />
              </dd>
              <dt className="mt-1 text-xs leading-snug text-encre-2">{chiffre.libelle}</dt>
            </div>
          ))}
        </dl>
      )}

      <div className="carte rounded-2xl p-5">
        <TitreBloc titre="En bref" />
        <p className="text-pretty leading-relaxed text-encre-2">{projet.resume}</p>
      </div>

      {projet.probleme && projet.solution && (
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { titre: "Le problème", texte: projet.probleme, teinte: "#cf3f4f" },
            { titre: "La réponse", texte: projet.solution, teinte: "#0c9467" },
          ].map((bloc) => (
            <div key={bloc.titre} className="carte rounded-2xl border-l-4 p-5" style={{ borderLeftColor: bloc.teinte }}>
              <p className="text-sm font-semibold" style={{ color: bloc.teinte }}>
                {bloc.titre}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-encre-2">{bloc.texte}</p>
            </div>
          ))}
        </div>
      )}

      {projet.role && (
        <div className="carte rounded-2xl p-5">
          <TitreBloc titre="Rôle tenu" sous={projet.equipe ? "La part conduite personnellement au sein de l'équipe." : undefined} />
          <ul className="grid gap-2 md:grid-cols-2">
            {projet.role.map((ligne) => (
              <li key={ligne} className="flex gap-2.5 rounded-xl bg-surface-2 p-3 text-sm leading-relaxed text-encre-2">
                <Check className="mt-0.5 size-4 shrink-0 text-vert" />
                {ligne}
              </li>
            ))}
          </ul>
        </div>
      )}

      {projet.sections?.map((section, i) => (
        <div key={section.titre} className="carte rounded-2xl p-5">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs" style={{ color: projet.couleur }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold tracking-tight text-encre">{section.titre}</h2>
              {section.texte && <p className="mt-1 text-sm leading-relaxed text-encre-2">{section.texte}</p>}
            </div>
          </div>
          {section.points && (
            <ul className="mt-4 divide-y divide-ligne border-t border-ligne">
              {section.points.map((point) => (
                <li key={point} className="flex gap-3 py-2.5 text-sm leading-relaxed text-encre-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: projet.couleur }} />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {galerie.length > 1 && (
        <div className="carte rounded-2xl p-5">
          <TitreBloc
            titre="Images"
            action={
              <button type="button" onClick={voirGalerie} className="text-sm text-vert hover:underline">
                Voir les {galerie.length}
              </button>
            }
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {galerie.slice(0, 4).map((media, i) => (
              <button key={media.src} type="button" onClick={() => ouvrirImage(i)} className="text-left" aria-label={`Agrandir : ${media.alt}`}>
                <ImageCadree media={media} couleur={projet.couleur} className="transition hover:border-ligne-forte" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OngletGalerie({ medias, couleur, ouvrir }: { medias: Media[]; couleur: string; ouvrir: (i: number) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
      {medias.map((media, i) => (
        <figure key={media.src} className="carte overflow-hidden rounded-2xl p-2">
          <button type="button" onClick={() => ouvrir(i)} className="block w-full" aria-label={`Agrandir : ${media.alt}`}>
            <ImageCadree media={media} couleur={couleur} className="transition hover:border-ligne-forte" />
          </button>
          {media.legende && <figcaption className="px-2 pb-1 pt-2.5 text-sm text-encre-2">{media.legende}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function OngletCode({ projet }: { projet: Projet }) {
  return (
    <div className="space-y-6">
      <div>
        <TitreBloc titre="Dépôts" sous="Où vit le code, et ce qu'un visiteur peut en ouvrir." />
        <div className="grid gap-3 md:grid-cols-2">
          {projet.depots.map((depot) => (
            <LigneDepot key={depot.libelle} depot={depot} />
          ))}
        </div>
      </div>
      {projet.extraits && projet.extraits.length > 0 && (
        <div>
          <TitreBloc titre="Extraits" sous="Tirés tels quels du code source." />
          <div className="space-y-4">
            {projet.extraits.map((extrait) => (
              <Extrait key={extrait.fichier + extrait.code.slice(0, 20)} {...extrait} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Extrait({ fichier, langage, code, commentaire }: { fichier: string; langage: string; code: string; commentaire?: string }) {
  const [copie, setCopie] = useState(false);
  const copier = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopie(true);
      setTimeout(() => setCopie(false), 1600);
    } catch {
      // Presse-papiers refusé : le code reste sélectionnable.
    }
  };
  return (
    <figure className="sombre overflow-hidden rounded-2xl border border-ligne bg-[#0e1119]">
      <div className="flex items-center gap-3 border-b border-ligne px-4 py-2.5">
        <span className="truncate font-mono text-xs text-encre">{fichier}</span>
        <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] uppercase text-encre-3">{langage}</span>
        <button type="button" onClick={copier} className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-encre-2 hover:bg-white/5 hover:text-encre">
          {copie ? <Check className="size-3.5 text-vert" /> : <Copy className="size-3.5" />}
          {copie ? "Copié" : "Copier"}
        </button>
      </div>
      {commentaire && <figcaption className="border-b border-ligne px-4 py-2.5 text-sm text-encre-2">{commentaire}</figcaption>}
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-encre">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

function Voisins({ projet }: { projet: Projet }) {
  const index = PROJETS.indexOf(projet);
  const precedent = PROJETS[(index - 1 + PROJETS.length) % PROJETS.length];
  const suivant = PROJETS[(index + 1) % PROJETS.length];
  if (!precedent || !suivant) return null;
  return (
    <nav className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Projets voisins">
      {[
        { p: precedent, sens: "Précédent", Icone: ArrowLeft },
        { p: suivant, sens: "Suivant", Icone: ArrowRight },
      ].map(({ p, sens, Icone }) => (
        <Link key={sens} to={`/projets/${p.slug}`} className={`carte group flex items-center gap-3 rounded-2xl p-4 transition hover:border-ligne-forte ${sens === "Suivant" ? "sm:flex-row-reverse sm:text-right" : ""}`}>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-3 text-encre-2 transition group-hover:bg-encre group-hover:text-surface">
            <Icone className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs text-encre-3">{sens}</span>
            <span className="block truncate font-medium text-encre">{p.titre}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}

function PanneauProjet({ projet }: { projet: Projet }) {
  const categorie = CATEGORIES[projet.categorie];
  return (
    <div className="space-y-6">
      {projet.demos && projet.demos.length > 0 && (
        <div>
          <TitrePanneau>En ligne</TitrePanneau>
          <div className="space-y-2">
            {projet.demos.map((demo) => (
              <BlocQr key={demo.url} url={demo.url} libelle={demo.libelle} detail={demo.detail} />
            ))}
          </div>
        </div>
      )}
      {projet.preuves && projet.preuves.length > 0 && (
        <div>
          <TitrePanneau>Preuves</TitrePanneau>
          <div className="space-y-2">
            {projet.preuves.map((preuve) => (
              <LignePreuve key={preuve.url} preuve={preuve} />
            ))}
          </div>
        </div>
      )}
      <div>
        <TitrePanneau>Code</TitrePanneau>
        <div className="space-y-2">
          {projet.depots.map((depot) => (
            <LigneDepot key={depot.libelle} depot={depot} />
          ))}
        </div>
      </div>
      <div>
        <TitrePanneau>Stack</TitrePanneau>
        <div className="flex flex-wrap gap-1.5">
          {projet.stack.map((techno) => (
            <PastilleTechno key={techno} techno={techno} />
          ))}
        </div>
      </div>
      <div>
        <TitrePanneau>Informations</TitrePanneau>
        <dl className="divide-y divide-ligne rounded-xl border border-ligne text-sm">
          {[
            ["Catégorie", categorie.nom],
            ["Statut", STATUTS[projet.statut].nom],
            ["Période", projet.annee],
            ["Cadre", projet.cadre],
            ...(projet.equipe ? [["Équipe", projet.equipe]] : []),
          ].map(([cle, valeur]) => (
            <div key={cle} className="flex justify-between gap-3 px-3 py-2">
              <dt className="text-encre-3">{cle}</dt>
              <dd className="text-right text-encre">{valeur}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
