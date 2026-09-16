import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PROFIL } from "../../contenu/profil";
import { cx } from "../../outils";
import { Popup } from "../Popup";
import { useCoquille } from "./contexte";

const OBJETS = ["Stage de fin d'études", "Alternance", "CDI", "Démonstration d'un projet", "Autre"] as const;

/**
 * Le site n'a pas de serveur : le formulaire prépare le message et l'ouvre dans
 * la messagerie du visiteur. On le dit, plutôt que de faire croire à un envoi.
 */
export function PopupContact() {
  const { contact, ouvrirContact } = useCoquille();
  const [objet, setObjet] = useState<(typeof OBJETS)[number]>(OBJETS[0]);
  const [nom, setNom] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [message, setMessage] = useState("");

  const envoyer = (e: FormEvent) => {
    e.preventDefault();
    const sujet = `${objet}${entreprise ? ` - ${entreprise}` : ""}`;
    const corps = `${message}\n\n${nom}${entreprise ? `\n${entreprise}` : ""}`;
    window.location.href = `mailto:${PROFIL.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    ouvrirContact(false);
  };

  return (
    <Popup
      ouvert={contact}
      fermer={() => ouvrirContact(false)}
      titre="Me contacter"
      sousTitre={PROFIL.recherche}
      pied={
        <p className="text-xs text-encre-3">
          Le message s'ouvre dans votre messagerie, adressé à <span className="text-encre-2">{PROFIL.email}</span>, avec{" "}
          <span className="text-encre-2">{PROFIL.emailSecondaire}</span> en second recours.
        </p>
      }
    >
      <form id="formulaire-contact" onSubmit={envoyer} className="space-y-4">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-encre">Objet</legend>
          <div className="flex flex-wrap gap-2">
            {OBJETS.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setObjet(o)}
                aria-pressed={objet === o}
                className={cx(
                  "rounded-full border px-3 py-1.5 text-xs transition",
                  objet === o ? "border-encre bg-encre text-surface" : "border-ligne text-encre-2 hover:border-ligne-forte",
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <Champ libelle="Votre nom" valeur={nom} changer={setNom} requis />
          <Champ libelle="Entreprise" valeur={entreprise} changer={setEntreprise} />
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-encre">Message</span>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Le poste, l'équipe, ce qui vous a donné envie d'écrire…"
            className="w-full resize-y rounded-xl border border-ligne bg-surface-2 px-3.5 py-2.5 text-sm text-encre outline-none transition placeholder:text-encre-3 focus:border-vert focus:bg-surface"
          />
        </label>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-vert px-4 py-3 text-sm font-medium text-white transition hover:brightness-110"
        >
          <Send className="size-4" /> Préparer le message
        </button>
      </form>
    </Popup>
  );
}

function Champ({ libelle, valeur, changer, requis = false }: { libelle: string; valeur: string; changer: (v: string) => void; requis?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-encre">{libelle}</span>
      <input
        required={requis}
        value={valeur}
        onChange={(e) => changer(e.target.value)}
        className="w-full rounded-xl border border-ligne bg-surface-2 px-3.5 py-2.5 text-sm text-encre outline-none transition focus:border-vert focus:bg-surface"
      />
    </label>
  );
}
