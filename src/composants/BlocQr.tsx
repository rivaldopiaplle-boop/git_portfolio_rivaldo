import { ArrowUpRight, Check, Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { sansProtocole } from "../outils";

interface Props {
  url: string;
  libelle: string;
  detail?: string;
}

/** Un QR code toujours généré depuis l'adresse : il ne peut pas être périmé. */
export function BlocQr({ url, libelle, detail }: Props) {
  const [copie, setCopie] = useState(false);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopie(true);
      setTimeout(() => setCopie(false), 1800);
    } catch {
      // Presse-papiers refusé : le lien reste lisible et cliquable.
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-ligne bg-surface-2/60 p-3">
      <div className="shrink-0 rounded-xl bg-white p-2">
        <QRCodeSVG value={url} size={84} level="M" bgColor="#ffffff" fgColor="#07080d" title={`QR code : ${libelle}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-encre">{libelle}</p>
        {detail && <p className="mt-0.5 text-xs text-encre-3">{detail}</p>}
        <p className="mt-1.5 truncate font-mono text-[11px] text-encre-2">{sansProtocole(url)}</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-encre px-3 py-1 text-xs font-medium text-surface transition hover:bg-encre/85"
          >
            Ouvrir <ArrowUpRight className="size-3" />
          </a>
          <button
            type="button"
            onClick={copier}
            className="inline-flex items-center gap-1 rounded-full border border-ligne px-3 py-1 text-xs text-encre-2 transition hover:bg-surface-3 hover:text-encre"
          >
            {copie ? <Check className="size-3 text-vert" /> : <Copy className="size-3" />}
            {copie ? "Copié" : "Copier"}
          </button>
        </div>
      </div>
    </div>
  );
}
