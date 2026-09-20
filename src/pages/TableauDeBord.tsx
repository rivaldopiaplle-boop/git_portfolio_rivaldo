import { BookOpen, Download, FolderKanban, Globe, Layers, Mail, ShieldCheck, Workflow } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { CarteAction, EtatRoute, Kpi, TitreBloc } from "../composants/Blocs";
import { CarteProjet } from "../composants/CarteProjet";
import { useCoquille } from "../composants/coquille/contexte";
import { ActionEnTete, EnTetePage, ZonePage } from "../composants/EnTetePage";
import { IconeTechno } from "../composants/IconeTechno";
import { Logo } from "../composants/Logo";
import { PopupApercu } from "../composants/PopupApercu";
import { TerminalVivant } from "../composants/TerminalVivant";
import { PROFIL } from "../contenu/profil";
import { TECHNOS } from "../contenu/technos";
import { EASE_SORTIE, useTitre } from "../outils";
import { PHARES, PROJETS, trouverProjet } from "../projets";
import { technosFrequentes } from "../projets/catalogue";
import { CATEGORIES, ORDRE_CATEGORIES } from "../projets/categories";
import type { Projet } from "../projets/types";

export default function TableauDeBord() {
  useTitre(`${PROFIL.prenom} ${PROFIL.nom} | ${PROFIL.titre}`);
  const { ouvrirContact } = useCoquille();
  const [apercu, setApercu] = useState<Projet | null>(null);

  const enLigne = PROJETS.filter((p) => p.statut === "en-ligne");
  const nombreTechnos = new Set(PROJETS.flatMap((p) => p.stack)).size;
  const demo = trouverProjet("rivdinde")?.demos?.[0];
  const autres = PROJETS.filter((p) => !p.phare);

  return (
    <>
      <EnTetePage
        icone={<Logo taille={52} />}
        surtitre={
          <span className="inline-flex items-center gap-2 rounded-full border border-vert/25 bg-vert/10 px-2.5 py-0.5 font-medium text-vert">
            <span className="size-1.5 animate-pulsation rounded-full bg-vert text-vert/40" />
            {PROFIL.recherche}, {PROFIL.disponibilite}
          </span>
        }
        titre={
          <>
            {PROFIL.prenom} {PROFIL.nom}
          </>
        }
        description={`Élève ingénieur en ${PROFIL.niveau} à l'${PROFIL.ecole}, développement full-stack et mise en ligne automatisée : les applications elles-mêmes, du serveur à l'interface, et la chaîne qui les teste, les empaquette et les déploie. La barre latérale donne accès à l'ensemble du portfolio ; cette page en présente l'essentiel.`}
        actions={
          <>
            <ActionEnTete href={PROFIL.cv} telecharger>
              <Download className="size-4" /> CV
            </ActionEnTete>
            <ActionEnTete principal onClick={() => ouvrirContact(true)}>
              <Mail className="size-4" /> Me contacter
            </ActionEnTete>
          </>
        }
      />

      <ZonePage className="space-y-8">
        <section>
          <TitreBloc titre="Par où commencer ?" sous="Trois façons d'évaluer ce travail, de la plus rapide à la plus complète." />
          <div className="grid gap-3 md:grid-cols-3">
            <CarteAction numero="1" duree="1 min" icone={Workflow} vers="/chaine" titre="Voir une chaîne CI/CD s'exécuter" texte="Les workflows réels des deux plateformes, étage par étage." />
            <CarteAction
              numero="2"
              duree="2 min"
              icone={Globe}
              href={demo?.url}
              vers="/projets/rivdinde"
              titre="Ouvrir une plateforme en ligne"
              texte="RivDinde et Banque App tournent en ligne, sans création de compte : des identifiants de démonstration sont fournis."
            />
            <CarteAction numero="3" duree="5 min" icone={BookOpen} vers="/projets/banque" titre="Lire une étude de cas" texte="Banque App : le problème, les choix, la chaîne et ce qui arrive ensuite." />
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi vers="/projets" libelle="Projets" valeur={PROJETS.length} detail="du microcontrôleur au cloud" icone={FolderKanban} />
          <Kpi vers="/projets?statut=en-ligne" libelle="En ligne" valeur={enLigne.length} detail={enLigne.map((p) => p.titre).join(" · ")} icone={Globe} />
          <Kpi vers="/chaine" libelle="Vérifications" valeur={1500} suffixe="+" detail="rejouées à chaque modification" icone={ShieldCheck} />
          <Kpi vers="/competences" libelle="Technologies" valeur={nombreTechnos} detail="toutes utilisées en projet" icone={Layers} />
        </section>

        <section className="grid grid-cols-[minmax(0,1fr)] gap-6 2xl:grid-cols-[minmax(0,1fr)_440px]">
          <div>
            <TitreBloc
              titre="Projets phares"
              sous="Deux plateformes complètes, menées jusqu'à la mise en production, et qui continuent d'évoluer."
              action={
                <Link to="/projets?categorie=devops" className="shrink-0 text-sm text-vert hover:underline">
                  Catégorie DevOps
                </Link>
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              {PHARES.map((projet) => (
                <CarteProjet key={projet.slug} projet={projet} apercu={setApercu} />
              ))}
            </div>
          </div>
          <div>
            <TitreBloc titre="Dernière exécution" sous="Relevé des vraies chaînes, rejoué en boucle." />
            <TerminalVivant />
          </div>
        </section>

        <section className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2">
          <Repartition />
          <FeuilleDeRoute />
        </section>

        <section>
          <TitreBloc
            titre="Les autres projets"
            sous="Applications, logiciel et robotique."
            action={
              <Link to="/projets" className="shrink-0 text-sm text-vert hover:underline">
                Tout le catalogue
              </Link>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {autres.map((projet) => (
              <CarteProjet key={projet.slug} projet={projet} apercu={setApercu} />
            ))}
          </div>
        </section>
      </ZonePage>

      <PopupApercu projet={apercu} fermer={() => setApercu(null)} />
    </>
  );
}

function Repartition() {
  const max = Math.max(...ORDRE_CATEGORIES.map((c) => PROJETS.filter((p) => p.categorie === c).length));
  const technos = technosFrequentes(PROJETS, 8);
  return (
    <div className="carte rounded-2xl p-5">
      <TitreBloc titre="Répartition" sous="Par catégorie : un clic filtre le catalogue." />
      <div className="space-y-1">
        {ORDRE_CATEGORIES.map((cle) => {
          const { nom, icone: Icone, couleur } = CATEGORIES[cle];
          const nombre = PROJETS.filter((p) => p.categorie === cle).length;
          return (
            <Link key={cle} to={`/projets?categorie=${cle}`} className="block rounded-xl p-2.5 transition hover:bg-surface-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-encre">
                  <Icone className="size-4" style={{ color: couleur }} />
                  {nom}
                </span>
                <span className="font-mono text-xs text-encre-2">{nombre}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: couleur }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(nombre / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE_SORTIE }}
                />
              </div>
            </Link>
          );
        })}
      </div>
      <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-encre-3">Les plus utilisées</p>
      <div className="flex flex-wrap gap-1.5">
        {technos.map(({ techno, nombre }) => (
          <Link
            key={techno}
            to={`/projets?techno=${techno}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-ligne bg-surface-2 py-1 pl-1.5 pr-2 text-xs text-encre-2 transition hover:border-ligne-forte hover:text-encre"
          >
            <IconeTechno techno={techno} taille={13} />
            {TECHNOS[techno].nom}
            <span className="font-mono text-[10px] text-encre-3">{nombre}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FeuilleDeRoute() {
  const elements = PHARES.flatMap((projet) => (projet.feuilleDeRoute ?? []).slice(0, 3).map((etape) => ({ projet, etape })));
  return (
    <div className="carte rounded-2xl p-5">
      <TitreBloc titre="Ce qui arrive" sous="Les feuilles de route des deux plateformes." />
      <ul className="divide-y divide-ligne">
        {elements.map(({ projet, etape }) => (
          <li key={projet.slug + etape.titre}>
            <Link to={`/projets/${projet.slug}?onglet=feuille`} className="flex items-center gap-3 rounded-lg px-1 py-3 transition hover:bg-surface-2">
              {projet.logo ? (
                <img src={projet.logo} alt="" className="size-7 shrink-0 rounded-lg border border-ligne object-cover" />
              ) : (
                <span className="size-7 shrink-0 rounded-lg" style={{ background: projet.couleur }} />
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-encre">{etape.titre}</span>
                <span className="block truncate text-xs text-encre-3">{projet.titre}</span>
              </span>
              <EtatRoute etat={etape.etat} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
