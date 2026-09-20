import { Clock, Play } from "lucide-react";
import { useRef, useState } from "react";
import type { Film } from "../projets/types";

/**
 * Le film de démonstration d'un projet, avec ses chapitres.
 *
 * La vidéo n'est pas chargée tant que le visiteur ne l'a pas demandée
 * (`preload="none"` et l'affiche en attente) : une page de projet reste légère,
 * et la bande passante de l'hébergement n'est consommée que par ceux qui
 * regardent vraiment.
 */
export function Lecteur({ film }: { film: Film }) {
  const video = useRef<HTMLVideoElement>(null);
  const [encours, setEncours] = useState<number | null>(null);

  function aller(instant: number, rang: number) {
    const lecteur = video.current;
    if (!lecteur) return;
    lecteur.currentTime = instant;
    void lecteur.play();
    setEncours(rang);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <figure className="m-0">
        <video
          ref={video}
          src={film.src}
          poster={film.affiche}
          controls
          preload="none"
          playsInline
          className="w-full rounded-2xl border border-ligne bg-surface-3 shadow-sm"
          onTimeUpdate={(e) => {
            const t = e.currentTarget.currentTime;
            const rang = (film.chapitres ?? []).findLastIndex((c) => c.instant <= t);
            if (rang >= 0) setEncours(rang);
          }}
        />
        <figcaption className="mt-2 flex items-center gap-1.5 text-xs text-encre-3">
          <Clock className="size-3.5" /> {film.duree}
        </figcaption>
      </figure>

      <div>
        <p className="text-sm text-encre-2">{film.legende}</p>
        {film.chapitres?.length ? (
          <ol className="mt-4 divide-y divide-ligne overflow-hidden rounded-2xl border border-ligne bg-surface">
            {film.chapitres.map((chapitre, rang) => (
              <li key={chapitre.instant}>
                <button
                  type="button"
                  onClick={() => aller(chapitre.instant, rang)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-surface-2 ${
                    encours === rang ? "bg-surface-2 font-semibold text-encre" : "text-encre-2"
                  }`}
                >
                  <Play className="size-3.5 shrink-0 text-encre-3" />
                  <span className="flex-1">{chapitre.titre}</span>
                  <span className="shrink-0 font-mono text-xs text-encre-3">
                    {Math.floor(chapitre.instant / 60)}:{String(chapitre.instant % 60).padStart(2, "0")}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </div>
  );
}
