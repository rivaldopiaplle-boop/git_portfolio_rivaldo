import { ArrowLeft, FolderKanban } from "lucide-react";
import { Link } from "react-router";
import { ZonePage } from "../composants/EnTetePage";
import { useTitre } from "../outils";

export default function Introuvable() {
  useTitre("Page introuvable — Rivaldo Piaplle");
  return (
    <ZonePage>
      <div className="carte mx-auto mt-10 max-w-lg rounded-2xl p-8 text-center">
        <p className="font-mono text-6xl font-semibold tracking-tighter text-encre-3">404</p>
        <p className="mt-3 font-mono text-sm text-rose">✗ déploiement introuvable</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-encre">Cette page n'a jamais passé la chaîne.</h1>
        <p className="mt-2 text-sm text-encre-2">L'adresse est peut-être mal saisie, ou le projet a changé de nom.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-encre px-4 py-2.5 text-sm font-medium text-surface">
            <ArrowLeft className="size-4" /> Tableau de bord
          </Link>
          <Link to="/projets" className="inline-flex items-center gap-2 rounded-xl border border-ligne px-4 py-2.5 text-sm font-medium text-encre">
            <FolderKanban className="size-4" /> Projets
          </Link>
        </div>
      </div>
    </ZonePage>
  );
}
