import { Download, ExternalLink, FileText } from "lucide-react";
import { ActionEnTete, EnTetePage, ZonePage } from "../composants/EnTetePage";
import { PROFIL } from "../contenu/profil";
import { useTitre } from "../outils";

export default function Cv() {
  useTitre("CV — Rivaldo Piaplle");
  return (
    <>
      <EnTetePage
        titre="Curriculum vitæ"
        description="Un seul fichier PDF, à télécharger ou à imprimer."
        actions={
          <>
            <ActionEnTete href={PROFIL.cv}>
              <ExternalLink className="size-4" /> Ouvrir pour imprimer
            </ActionEnTete>
            <ActionEnTete href={PROFIL.cv} telecharger principal>
              <Download className="size-4" /> Télécharger
            </ActionEnTete>
          </>
        }
      />
      <ZonePage>
        <div className="carte overflow-hidden rounded-2xl">
          <object data={PROFIL.cv} type="application/pdf" className="block h-[calc(100svh-210px)] min-h-[520px] w-full bg-surface-3" aria-label="Aperçu du CV">
            <div className="grid h-full min-h-[320px] place-items-center p-8 text-center">
              <div>
                <FileText className="mx-auto size-10 text-encre-3" />
                <p className="mt-4 font-medium text-encre">L'aperçu n'est pas disponible sur cet appareil.</p>
                <a href={PROFIL.cv} download className="mt-4 inline-flex items-center gap-2 rounded-xl bg-encre px-4 py-2.5 text-sm font-medium text-surface">
                  <Download className="size-4" /> Télécharger le CV
                </a>
              </div>
            </div>
          </object>
        </div>
      </ZonePage>
    </>
  );
}
