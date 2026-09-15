import { ArrowRight, Gauge, Lock, ShieldCheck, Undo2 } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { usePanneauDroit } from "../composants/coquille/contexte";
import { TitrePanneau } from "../composants/coquille/PanneauDroit";
import { EnTetePage, ZonePage } from "../composants/EnTetePage";
import { Onglets } from "../composants/Onglets";
import { GENRES, Pipeline } from "../composants/Pipeline";
import { useTitre } from "../outils";
import { PROJETS } from "../projets";

const PRINCIPES = [
  { icone: ShieldCheck, titre: "Tester contre du vrai", texte: "PostgreSQL et serveur de courriel réels dans la chaîne : une imitation ne casse jamais comme la production." },
  { icone: Lock, titre: "Rien ne fuit", texte: "L'historique Git entier passé au crible à chaque poussée. La vigilance ne protège pas un secret." },
  { icone: Undo2, titre: "Toujours pouvoir revenir", texte: "Images étiquetées par hash de commit, jamais latest : on sait ce qui tourne, on redéploie la version d'avant." },
  { icone: Gauge, titre: "Refuser de démarrer mal", texte: "Le serveur s'arrête s'il trouve une commodité de développement en production — et nomme le drapeau fautif." },
];

export default function Chaine() {
  useTitre("Chaîne CI/CD — Rivaldo Piaplle");
  const avecChaine = PROJETS.filter((p) => p.pipeline);
  const [params, setParams] = useSearchParams();
  const projet = avecChaine.find((p) => p.slug === params.get("projet")) ?? avecChaine[0];

  usePanneauDroit("chaine", () => <PanneauLegende />);

  if (!projet?.pipeline) return null;

  return (
    <>
      <EnTetePage
        titre="Chaîne CI/CD"
        description="Ce qui se passe entre git push et la mise en ligne, relevé dans les vrais fichiers de workflow. Le code est la moitié du travail ; la chaîne, l'autre."
      >
        <Onglets
          onglets={avecChaine.map((p) => ({ id: p.slug, nom: p.titre }))}
          actif={projet.slug}
          choisir={(id) => setParams({ projet: id }, { replace: true, preventScrollReset: true })}
        />
      </EnTetePage>

      <ZonePage className="space-y-6">
        <section className="sombre overflow-hidden rounded-2xl border border-ligne bg-[#0e1119]">
          <div className="flex flex-wrap items-center gap-3 border-b border-ligne px-5 py-4">
            {projet.logo && <img src={projet.logo} alt="" className="size-8 rounded-lg object-cover" />}
            <div className="min-w-0">
              <p className="font-semibold text-encre">{projet.titre}</p>
              <p className="text-xs text-encre-3">Relevée dans .github/workflows du dépôt</p>
            </div>
            <Link to={`/projets/${projet.slug}`} className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-ligne px-3 py-1.5 text-sm text-encre-2 transition hover:bg-white/5 hover:text-encre">
              Fiche du projet <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="p-4 sm:p-5">
            <Pipeline key={projet.slug} etapes={projet.pipeline} couleur={projet.couleur} />
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {PRINCIPES.map(({ icone: Icone, titre, texte }) => (
            <div key={titre} className="carte rounded-2xl p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-vert/10 text-vert">
                <Icone className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold tracking-tight text-encre">{titre}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-encre-2">{texte}</p>
            </div>
          ))}
        </section>
      </ZonePage>
    </>
  );
}

function PanneauLegende() {
  return (
    <div className="space-y-6">
      <div>
        <TitrePanneau>Lire la chaîne</TitrePanneau>
        <ul className="space-y-3">
          {Object.values(GENRES).map(({ nom, icone: Icone, explication }) => (
            <li key={nom} className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-3 text-encre-2">
                <Icone className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-medium text-encre">{nom}</span>
                <span className="block text-xs leading-relaxed text-encre-2">{explication}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl bg-surface-2 p-4 text-sm leading-relaxed text-encre-2">
        Une étape sans pastille n'a pas encore tourné ; l'étape entourée est en cours ; le vert dit qu'elle est passée.
      </div>
    </div>
  );
}
