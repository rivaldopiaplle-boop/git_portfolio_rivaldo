import { ArrowUpRight, Briefcase, ChevronRight, Download, FolderKanban, GraduationCap, House, Mail, Monitor, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router";
import { BadgeStatut } from "../composants/BadgeStatut";
import { IconeTechno } from "../composants/IconeTechno";
import { Logo } from "../composants/Logo";
import { EXPERIENCES, FORMATION, type ElementParcours } from "../contenu/parcours";
import { PROFIL } from "../contenu/profil";
import { cx, retenirVueMobile, useTitre } from "../outils";
import { demoPrincipale, PHARES, PROJETS } from "../projets";
import { CATEGORIES, ORDRE_CATEGORIES } from "../projets/categories";
import type { Categorie, Projet } from "../projets/types";

/**
 * La version téléphone, là où mène le QR code du CV.
 *
 * Qui scanne un CV papier tient un téléphone, souvent debout, souvent pressé :
 * il lui faut une application et non un site réduit. Une barre d'onglets en
 * bas, à portée de pouce ; chaque onglet tient sur un écran ; les fiches
 * complètes restent à un toucher.
 */

const ONGLETS = [
  { id: "accueil", nom: "Accueil", icone: House },
  { id: "projets", nom: "Projets", icone: FolderKanban },
  { id: "parcours", nom: "Parcours", icone: GraduationCap },
  { id: "contact", nom: "Contact", icone: UserRound },
] as const;

type IdOnglet = (typeof ONGLETS)[number]["id"];

export default function Mobile() {
  useTitre("Rivaldo Piaplle | Portfolio");
  const [params, setParams] = useSearchParams();

  // Une fiche ouverte d'ici s'affiche dans la version complète : elle saura
  // proposer le retour.
  useEffect(() => retenirVueMobile(), []);
  const actif: IdOnglet = ONGLETS.find((o) => o.id === params.get("onglet"))?.id ?? "accueil";

  const choisir = (id: IdOnglet) => {
    setParams(id === "accueil" ? {} : { onglet: id }, { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-svh bg-fond">
      <div className="mx-auto flex min-h-svh max-w-[480px] flex-col bg-fond pb-[calc(72px+env(safe-area-inset-bottom))] sm:border-x sm:border-ligne">
        <EnTete />

        <main className="flex-1 px-4 pt-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={actif} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              {actif === "accueil" && <Accueil ouvrir={choisir} />}
              {actif === "projets" && <ListeProjets />}
              {actif === "parcours" && <ParcoursMobile />}
              {actif === "contact" && <Contact />}
            </motion.div>
          </AnimatePresence>
        </main>

        <nav
          aria-label="Navigation principale"
          className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[480px] border-t border-ligne bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
        >
          <ul className="grid grid-cols-4">
            {ONGLETS.map((onglet) => {
              const selectionne = onglet.id === actif;
              return (
                <li key={onglet.id}>
                  <button
                    type="button"
                    onClick={() => choisir(onglet.id)}
                    aria-current={selectionne ? "page" : undefined}
                    className={cx("relative flex h-[64px] w-full flex-col items-center justify-center gap-1 text-[11px] transition", selectionne ? "text-encre" : "text-encre-3")}
                  >
                    {selectionne && <motion.span layoutId="repere-mobile" className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-vert" />}
                    <onglet.icone className={cx("size-5", selectionne && "text-vert")} />
                    {onglet.nom}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function EnTete() {
  return (
    <header className="sombre relative overflow-hidden bg-fond px-4 pb-5 pt-[calc(20px+env(safe-area-inset-top))]">
      <div className="grille pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative flex items-center gap-3">
        <Logo taille={44} />
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-encre">
            {PROFIL.prenom} {PROFIL.nom}
          </h1>
          <p className="truncate text-sm text-encre-2">{PROFIL.titre}</p>
        </div>
      </div>
      <div className="relative mt-4 rounded-xl border border-vert/25 bg-vert/10 px-3 py-2">
        <p className="flex items-center gap-2 text-sm font-medium text-vert">
          <span className="size-1.5 animate-pulsation rounded-full bg-vert text-vert/40" />
          {PROFIL.recherche}
        </p>
        <p className="mt-0.5 pl-3.5 text-xs text-encre-2">{PROFIL.disponibilite}</p>
      </div>
      <div className="relative mt-3 grid grid-cols-2 gap-2">
        <a href={PROFIL.cv} download className="flex items-center justify-center gap-2 rounded-xl bg-encre px-3 py-2.5 text-sm font-medium text-surface">
          <Download className="size-4" /> CV
        </a>
        <a href={`mailto:${PROFIL.email}`} className="flex items-center justify-center gap-2 rounded-xl border border-ligne-forte px-3 py-2.5 text-sm font-medium text-encre">
          <Mail className="size-4" /> Écrire
        </a>
      </div>
    </header>
  );
}

/* ─── Accueil ──────────────────────────────────────────────────────────────── */

function Accueil({ ouvrir }: { ouvrir: (id: IdOnglet) => void }) {
  const enLigne = PROJETS.filter((p) => p.statut === "en-ligne").length;

  return (
    <div className="space-y-5">
      <p className="text-[15px] leading-relaxed text-encre-2">
        Élève ingénieur en {PROFIL.niveau} à l'{PROFIL.ecole}, orientation DevOps : conception d'applications complètes et de la chaîne qui les teste, les empaquette et les met en ligne.
      </p>

      <div className="grid grid-cols-3 gap-2">
        <Chiffre valeur={PROJETS.length} libelle="projets" onClick={() => ouvrir("projets")} />
        <Chiffre valeur={enLigne} libelle="en ligne" onClick={() => ouvrir("projets")} />
        <Chiffre valeur={FORMATION.length} libelle="diplômes" onClick={() => ouvrir("parcours")} />
      </div>

      <section>
        <TitreSection titre="Projets phares" sous="Deux plateformes à ouvrir directement sur le téléphone" />
        <div className="space-y-3">
          {PHARES.map((projet) => (
            <CartePhare key={projet.slug} projet={projet} />
          ))}
        </div>
      </section>

      <Link to="/" className="carte flex items-center gap-3 rounded-2xl p-3.5">
        <span className="grid size-9 place-items-center rounded-xl bg-surface-3 text-encre-2">
          <Monitor className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-encre">Version complète du portfolio</span>
          <span className="block text-xs text-encre-3">Chaîne CI/CD, compétences, études de cas</span>
        </span>
        <ChevronRight className="size-4 text-encre-3" />
      </Link>
    </div>
  );
}

function Chiffre({ valeur, libelle, onClick }: { valeur: number; libelle: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="carte rounded-2xl px-3 py-3 text-left">
      <span className="block text-2xl font-semibold tabular-nums text-encre">{valeur}</span>
      <span className="block text-xs text-encre-3">{libelle}</span>
    </button>
  );
}

function CartePhare({ projet }: { projet: Projet }) {
  const demo = demoPrincipale(projet, true);
  return (
    <article className="carte overflow-hidden rounded-2xl">
      <div className="h-1" style={{ background: projet.couleur }} />
      <div className="p-4">
        <div className="flex items-center gap-3">
          {projet.logo && <img src={projet.logo} alt="" className="size-10 rounded-xl" />}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-encre">{projet.titre}</h3>
            <BadgeStatut statut={projet.statut} className="mt-1" />
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-encre-2">{projet.accroche}</p>
        <div className="mt-3 flex items-center gap-2.5">
          {projet.stack.slice(0, 6).map((techno) => (
            <IconeTechno key={techno} techno={techno} taille={16} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {demo ? (
            <a href={demo.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl bg-encre px-3 py-2.5 text-sm font-medium text-surface">
              {demo.support === "mobile" ? "L'application" : "Ouvrir"} <ArrowUpRight className="size-4" />
            </a>
          ) : (
            <span />
          )}
          <Link to={`/projets/${projet.slug}`} className="flex items-center justify-center gap-1.5 rounded-xl border border-ligne-forte px-3 py-2.5 text-sm font-medium text-encre">
            La fiche <ChevronRight className="size-4" />
          </Link>
        </div>
        {demo?.detail && <p className="mt-2 text-xs leading-snug text-encre-3">{demo.detail}</p>}
      </div>
    </article>
  );
}

/* ─── Projets ──────────────────────────────────────────────────────────────── */

function ListeProjets() {
  const [categorie, setCategorie] = useState<Categorie | null>(null);
  const liste = PROJETS.filter((p) => !categorie || p.categorie === categorie);

  return (
    <div>
      <TitreSection titre="Projets" sous="Toucher un projet ouvre sa fiche complète" />
      <div className="bords-fondus -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
        <Puce actif={!categorie} onClick={() => setCategorie(null)} libelle={`Tous · ${PROJETS.length}`} />
        {ORDRE_CATEGORIES.map((id) => (
          <Puce key={id} actif={categorie === id} onClick={() => setCategorie(id)} libelle={`${CATEGORIES[id].court} · ${PROJETS.filter((p) => p.categorie === id).length}`} />
        ))}
      </div>
      <ul className="space-y-2">
        {liste.map((projet) => (
          <li key={projet.slug}>
            <Link to={`/projets/${projet.slug}`} className="carte flex items-start gap-3 rounded-2xl p-3.5">
              <span className="mt-1.5 size-2.5 shrink-0 rounded-full" style={{ background: projet.couleur }} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-encre">{projet.titre}</span>
                  <BadgeStatut statut={projet.statut} className="shrink-0" />
                </span>
                <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-encre-2">{projet.accroche}</span>
                <span className="mt-1 block text-[11px] text-encre-3">
                  {CATEGORIES[projet.categorie].court} · {projet.annee}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Puce({ actif, onClick, libelle }: { actif: boolean; onClick: () => void; libelle: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx("shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition", actif ? "border-encre bg-encre text-surface" : "border-ligne bg-surface text-encre-2")}
    >
      {libelle}
    </button>
  );
}

/* ─── Parcours ─────────────────────────────────────────────────────────────── */

function ParcoursMobile() {
  const [rubrique, setRubrique] = useState<"formation" | "experiences">("formation");
  const elements = rubrique === "formation" ? FORMATION : EXPERIENCES;

  return (
    <div>
      <TitreSection titre="Parcours" sous="De Yaoundé à Brest" />
      <div className="carte mb-4 grid grid-cols-2 gap-1 rounded-xl p-1">
        <Segment actif={rubrique === "formation"} onClick={() => setRubrique("formation")} icone={GraduationCap} libelle="Formation" />
        <Segment actif={rubrique === "experiences"} onClick={() => setRubrique("experiences")} icone={Briefcase} libelle="Expériences" />
      </div>
      <ol className="relative space-y-3 border-l border-ligne-forte pl-4">
        {elements.map((element) => (
          <ElementMobile key={element.titre} element={element} />
        ))}
      </ol>
    </div>
  );
}

function Segment({ actif, onClick, icone: Icone, libelle }: { actif: boolean; onClick: () => void; icone: typeof GraduationCap; libelle: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx("flex items-center justify-center gap-2 rounded-lg py-2 text-sm transition", actif ? "bg-encre font-medium text-surface" : "text-encre-2")}
    >
      <Icone className="size-4" /> {libelle}
    </button>
  );
}

function ElementMobile({ element }: { element: ElementParcours }) {
  return (
    <li className="relative">
      <span className="absolute -left-[21px] top-4 size-2.5 rounded-full border-2 border-vert bg-fond" />
      <div className="carte rounded-2xl p-3.5">
        <p className="font-mono text-[11px] text-encre-3">{element.periode}</p>
        <h3 className="mt-1 text-sm font-semibold leading-snug text-encre">{element.titre}</h3>
        <p className="mt-0.5 text-[13px] text-encre-2">{element.lieu}</p>
        {element.mention && <p className="mt-1 text-xs font-medium text-vert">{element.mention}</p>}
        {element.details && (
          <ul className="mt-2 space-y-1">
            {element.details.map((detail) => (
              <li key={detail} className="text-[13px] leading-snug text-encre-2">
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

/* ─── Contact ──────────────────────────────────────────────────────────────── */

function Contact() {
  return (
    <div>
      <TitreSection titre="Contact" sous={`${PROFIL.recherche}, ${PROFIL.disponibilite.toLowerCase()}`} />
      <ul className="space-y-2">
        <LigneContact href={`mailto:${PROFIL.email}`} titre={PROFIL.email} detail="Adresse ENIB" icone={<Mail className="size-4" />} />
        <LigneContact href={`mailto:${PROFIL.emailSecondaire}`} titre={PROFIL.emailSecondaire} detail="Adresse personnelle" icone={<Mail className="size-4" />} />
        {PROFIL.linkedin && (
          <LigneContact
            href={PROFIL.linkedin}
            externe
            titre="LinkedIn"
            detail="Profil et publications"
            icone={<span className="grid size-4 place-items-center rounded-[3px] bg-[#0a66c2] text-[9px] font-bold text-white">in</span>}
          />
        )}
        <LigneContact href={PROFIL.github} externe titre="GitHub" detail="Les dépôts des projets" icone={<IconeTechno techno="github" monochrome taille={16} />} />
        <LigneContact href={PROFIL.cv} telecharger titre="CV en PDF" detail="Une page, à imprimer ou à transférer" icone={<Download className="size-4" />} />
      </ul>
    </div>
  );
}

function LigneContact({ href, titre, detail, icone, externe, telecharger }: { href: string; titre: string; detail: string; icone: ReactNode; externe?: boolean; telecharger?: boolean }) {
  return (
    <li>
      <a
        href={href}
        target={externe ? "_blank" : undefined}
        rel={externe ? "noreferrer" : undefined}
        download={telecharger || undefined}
        className="carte flex items-center gap-3 rounded-2xl p-3.5"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-3 text-encre-2">{icone}</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-encre">{titre}</span>
          <span className="block text-xs text-encre-3">{detail}</span>
        </span>
        <ChevronRight className="size-4 text-encre-3" />
      </a>
    </li>
  );
}

function TitreSection({ titre, sous }: { titre: string; sous?: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-base font-semibold text-encre">{titre}</h2>
      {sous && <p className="text-xs text-encre-3">{sous}</p>}
    </div>
  );
}
