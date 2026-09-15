import { motion } from "motion/react";
import { TECHNOS } from "../contenu/technos";
import { cx, EASE_SORTIE } from "../outils";
import { CATEGORIES } from "../projets/categories";
import type { Media, Projet } from "../projets/types";
import { IconeTechno } from "./IconeTechno";

interface Props {
  projet: Projet;
  className?: string;
}

/**
 * La vignette d'un projet : sa couverture quand elle existe, sinon un visuel
 * dessiné à ses couleurs — une application pour le logiciel, un circuit pour
 * la robotique.
 */
export function VisuelProjet({ projet, className }: Props) {
  if (projet.couverture) return <ImageCadree media={projet.couverture} couleur={projet.couleur} className={className} />;
  if (projet.categorie === "robotique") return <VisuelCircuit projet={projet} className={className} />;
  return <MaquetteApplication projet={projet} className={className} />;
}

/**
 * Une image dans un cadre 16/10. Une capture d'écran remplit le cadre ; un
 * écran de téléphone, une photo ou un schéma y est posé entier, jamais étiré.
 */
export function ImageCadree({ media, couleur, className, grand = false }: { media: Media; couleur: string; className?: string; grand?: boolean }) {
  if (media.format === "ecran" || !media.format) {
    return (
      <div className={cx("relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-ligne bg-surface-3", className)}>
        <img src={media.src} alt={media.alt} loading="lazy" className="h-full w-full object-cover object-top" />
      </div>
    );
  }
  return (
    <div
      className={cx("relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-ligne", className)}
      style={{ background: `radial-gradient(80% 90% at 50% 45%, color-mix(in srgb, ${couleur} 16%, var(--color-surface-2)), var(--color-surface-3))` }}
    >
      <div aria-hidden className="grille absolute inset-0" />
      <div className={cx("absolute inset-0 grid place-items-center", grand ? "p-8" : "p-3")}>
        <img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          className={cx(
            "max-h-full max-w-full object-contain",
            media.format === "mobile" ? "rounded-[1.1rem] border-[3px] border-[#0f1420] shadow-xl" : "rounded-lg bg-white shadow-lg",
          )}
        />
      </div>
    </div>
  );
}

const BARRES = [38, 64, 48, 82, 58, 94, 71, 86];

function MaquetteApplication({ projet, className }: Props) {
  const c = projet.couleur;
  return (
    <div
      className={cx("sombre relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-ligne", className)}
      style={{ background: `radial-gradient(120% 90% at 85% -10%, ${c}55, transparent 55%), linear-gradient(180deg, #141824, #0c0e15)` }}
    >
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="mx-auto rounded-full bg-white/5 px-3 py-0.5 font-mono text-[9px] text-encre-3">{projet.slug}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-8 flex gap-2 p-2.5">
        <div className="flex w-[22%] flex-col gap-1.5 rounded-lg bg-white/[0.03] p-2">
          {projet.logo ? <img src={projet.logo} alt="" className="mb-1.5 size-6 rounded-md object-cover" /> : <span className="mb-1.5 size-6 rounded-md" style={{ background: c }} />}
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-1.5 rounded-full" style={{ width: `${88 - i * 9}%`, background: i === 0 ? c : "rgb(255 255 255 / 0.08)" }} />
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg bg-white/[0.04] p-2">
                <span className="block h-1 w-1/2 rounded-full bg-white/10" />
                <span className="mt-1.5 block h-2.5 w-3/4 rounded-full" style={{ background: i === 0 ? c : "rgb(255 255 255 / 0.14)" }} />
              </div>
            ))}
          </div>
          <div className="relative flex flex-1 items-end gap-1.5 rounded-lg bg-white/[0.03] p-2.5">
            {BARRES.map((hauteur, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-t-[3px]"
                style={{ background: i === 5 ? c : `${c}66` }}
                initial={{ height: "6%" }}
                whileInView={{ height: `${hauteur}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.06, ease: EASE_SORTIE }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PISTES = [
  "M110 82 H72 V42 H18",
  "M110 100 H56 V152 H8",
  "M110 118 H84 V194",
  "M210 82 H252 V32 H304",
  "M210 100 H268 V142 H316",
  "M210 118 H238 V194",
  "M136 60 V22 H96 V4",
  "M184 60 V8",
  "M160 140 V172 H206 V200",
];

function VisuelCircuit({ projet, className }: Props) {
  const c = projet.couleur;
  const etiquette = projet.puce ?? TECHNOS[projet.stack[0] ?? "c"].nom;
  return (
    <div
      className={cx("sombre relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-ligne", className)}
      style={{ background: `radial-gradient(90% 90% at 50% 50%, ${c}33, transparent 70%), #0c0e15` }}
    >
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id={`points-${projet.slug}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="rgb(255 255 255 / 0.08)" />
          </pattern>
        </defs>
        <rect width="320" height="200" fill={`url(#points-${projet.slug})`} />
        {PISTES.map((d, i) => (
          <g key={d}>
            <path d={d} stroke="rgb(255 255 255 / 0.12)" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
            <motion.path
              d={d}
              stroke={c}
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="10 240"
              animate={{ strokeDashoffset: [0, -250] }}
              transition={{ duration: 2.6 + (i % 3) * 0.6, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
            />
          </g>
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i}>
            <rect x={116 + i * 13} y="54" width="4" height="8" rx="1" fill="rgb(255 255 255 / 0.3)" />
            <rect x={116 + i * 13} y="138" width="4" height="8" rx="1" fill="rgb(255 255 255 / 0.3)" />
          </g>
        ))}
        <rect x="106" y="60" width="108" height="80" rx="9" fill="#151823" stroke={c} strokeOpacity="0.8" />
        <circle cx="118" cy="72" r="3" fill="rgb(255 255 255 / 0.18)" />
        <text x="160" y="104" textAnchor="middle" fill="#eef0f6" fontFamily="JetBrains Mono Variable, monospace" fontSize="12" fontWeight="600">
          {etiquette}
        </text>
        <text x="160" y="120" textAnchor="middle" fill={c} fontFamily="JetBrains Mono Variable, monospace" fontSize="7" letterSpacing="2">
          {projet.titre.toUpperCase().slice(0, 22)}
        </text>
      </svg>
    </div>
  );
}

/**
 * Grande couverture d'une fiche sans image : le logo (ou l'icône de la
 * catégorie) au centre, la stack en orbite.
 */
export function CouvertureProjet({ projet, className }: Props) {
  const c = projet.couleur;
  const Icone = CATEGORIES[projet.categorie].icone;
  const interieur = projet.stack.slice(0, 6);
  const exterieur = projet.stack.slice(6, 16);

  return (
    <div
      className={cx("sombre relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-ligne sm:aspect-[16/7]", className)}
      style={{ background: `radial-gradient(55% 70% at 50% 50%, ${c}40, transparent 70%), #0c0e15` }}
    >
      <div aria-hidden className="grille absolute inset-0" />
      <Orbite technos={exterieur} taille="h-[118%]" duree={90} sens={-1} couleur={c} />
      <Orbite technos={interieur} taille="h-[72%]" duree={60} sens={1} couleur={c} />
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          <motion.span
            aria-hidden
            className="absolute -inset-8 rounded-[2.5rem] blur-2xl"
            style={{ background: `${c}66` }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {projet.logo ? (
            <img src={projet.logo} alt={`Logo ${projet.titre}`} className="relative size-20 rounded-[1.5rem] border border-white/15 object-cover shadow-2xl sm:size-28" />
          ) : (
            <span
              className="relative grid size-20 place-items-center rounded-[1.5rem] border shadow-2xl sm:size-28"
              style={{ borderColor: `${c}88`, background: `linear-gradient(145deg, ${c}55, #151823 70%)`, color: "#eef0f6" }}
            >
              <Icone className="size-9 sm:size-12" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Orbite({ technos, taille, duree, sens, couleur }: { technos: Projet["stack"]; taille: string; duree: number; sens: 1 | -1; couleur: string }) {
  if (technos.length === 0) return null;
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden>
      <motion.div
        className={cx("relative aspect-square rounded-full border border-dashed", taille)}
        style={{ borderColor: `${couleur}40` }}
        animate={{ rotate: 360 * sens }}
        transition={{ duration: duree, repeat: Infinity, ease: "linear" }}
      >
        {technos.map((techno, i) => {
          const angle = (i / technos.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <motion.span
              key={techno}
              className="absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-ligne-forte bg-surface-2/90 shadow-lg sm:size-10"
              style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
              animate={{ rotate: -360 * sens }}
              transition={{ duration: duree, repeat: Infinity, ease: "linear" }}
            >
              <IconeTechno techno={techno} taille={17} />
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}
