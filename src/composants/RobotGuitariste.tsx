import { useMemo, useState } from "react";

/**
 * Le simulateur du robot guitariste, manipulable par le visiteur.
 *
 * Ce n'est pas une animation décorative : c'est l'outil de dimensionnement du
 * projet, porté en TypeScript depuis les scripts Python du dépôt. Le visiteur
 * choisit une corde, une frette et un tempo ; la page résout la cinématique
 * inverse, puis compare l'effort demandé au geste d'un guitariste réel, relevé
 * image par image dans Kinovea.
 *
 * Tout se calcule dans le navigateur : aucun serveur, donc aucun coût.
 */

// ── La géométrie, en millimètres ──────────────────────────────────────────────
// L'écart entre deux cordes vient de l'étalonnage du relevé Kinovea : la ligne
// de référence tracée sur la vidéo valait onze millimètres.
const ECART_CORDES = 11;
const CORDES = 6;
const DIAPASON = 648; // longueur de corde vibrante d'une guitare classique
const FRETTES = 12;

// Le bras : A est la position du pivot en travers du manche, B la longueur de
// la dernière liaison. Les scripts de simulation raisonnent en unités
// abstraites ; ici ce sont des millimètres, choisis pour que le pivot tombe à
// côté du manche et que le bras atteigne les six cordes.
const A = -60;
const B = 90;

// Ce que le mécanisme sait faire, mesuré sur le montage.
const VITESSE_MOTEUR = 700; // mm/s
const ACCELERATION_MOTEUR = 9000; // mm/s²

// Ce qu'un guitariste fait, relevé sur 272 points à cinquante images par seconde.
const GESTE_HUMAIN = { amplitude: 33.3, vitesse: 465 };

/** Distance du sillet à la frette n, formule du tempérament égal. */
function positionFrette(n: number) {
  return DIAPASON * (1 - Math.pow(2, -n / 12));
}

/** Position visée par le médiator, dans le plan du manche. */
function cible(corde: number, frette: number) {
  // x : en travers des cordes ; z : le long du manche, entre deux frettes.
  const x = (corde - (CORDES + 1) / 2) * ECART_CORDES;
  const z = frette === 0 ? 0 : (positionFrette(frette - 1) + positionFrette(frette)) / 2;
  return { x, z };
}

/**
 * Cinématique inverse : quel angle et quelle translation placent l'outil là.
 * Le modèle direct est `x = A + B cos(theta)` et `z = d - B sin(theta)`, donc
 * l'angle se déduit du seul x, et la translation suit.
 */
function resoudre(x: number, z: number) {
  const rapport = (x - A) / B;
  if (rapport < -1 || rapport > 1) return null; // hors d'atteinte du bras
  const theta = Math.acos(rapport);
  return { theta, d: z + B * Math.sin(theta) };
}

/**
 * Ce qu'un déplacement coûte, sur un profil adouci au départ et à l'arrivée.
 * Ce profil est celui retenu dans l'étude : à vitesse presque égale, il demande
 * la moitié de l'accélération d'un aller-retour entretenu.
 */
function effort(distance: number, duree: number, adouci: boolean) {
  if (duree <= 0) return { vitesse: Infinity, acceleration: Infinity };
  return adouci
    ? { vitesse: (1.5 * distance) / duree, acceleration: (6 * distance) / (duree * duree) }
    : { vitesse: distance / duree, acceleration: (4 * distance) / (duree * duree) };
}

export function RobotGuitariste() {
  const [corde, setCorde] = useState(3);
  const [frette, setFrette] = useState(5);
  const [depuisCorde, setDepuisCorde] = useState(1);
  const [notesParSeconde, setNotes] = useState(4);
  const [adouci, setAdouci] = useState(true);

  const calcul = useMemo(() => {
    const arrivee = cible(corde, frette);
    const depart = cible(depuisCorde, frette);
    const poseArrivee = resoudre(arrivee.x, arrivee.z);
    const poseDepart = resoudre(depart.x, depart.z);
    const distance = Math.abs(arrivee.x - depart.x);
    const demande = effort(distance, 1 / notesParSeconde, adouci);
    return { arrivee, depart, poseArrivee, poseDepart, distance, demande };
  }, [corde, frette, depuisCorde, notesParSeconde, adouci]);

  const { arrivee, poseArrivee, poseDepart, distance, demande } = calcul;
  const tenable = poseArrivee !== null
    && demande.vitesse <= VITESSE_MOTEUR
    && demande.acceleration <= ACCELERATION_MOTEUR;

  // ── Le dessin ───────────────────────────────────────────────────────────────
  // Repère : x en travers des cordes (horizontal), z le long du manche
  // (vertical). Le manche est dessiné en entier, le bras par-dessus.
  const LARGEUR = 360;
  const HAUTEUR = 330;
  const PAR_MM_X = 1.9;   // en travers des cordes : on étale pour les distinguer
  const PAR_MM_Z = 0.85;  // le long du manche : douze frettes tiennent dans la hauteur
  const versEcran = (x: number, z: number) => ({
    cx: LARGEUR / 2 + x * PAR_MM_X,
    cy: 28 + z * PAR_MM_Z,
  });

  const pivot = versEcran(A, poseArrivee ? poseArrivee.d : 0);
  const outil = versEcran(arrivee.x, arrivee.z);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,24rem)_1fr]">
      {/* Le manche, les cordes, et le bras */}
      <figure className="m-0 rounded-2xl border border-ligne bg-surface-2 p-3">
        <svg viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`} className="w-full" role="img"
             aria-label="Vue du manche : les six cordes, les frettes, et le bras du robot">
          <rect x={LARGEUR / 2 - 64} y={24} width={128} height={HAUTEUR - 44}
                rx={6} className="fill-surface-3" />
          {Array.from({ length: FRETTES + 1 }, (_, n) => {
            const y = 28 + positionFrette(n) * PAR_MM_Z;
            return (
              <g key={n}>
                <line x1={LARGEUR / 2 - 64} y1={y} x2={LARGEUR / 2 + 64} y2={y}
                      className="stroke-encre-3" strokeWidth={n === 0 ? 3 : 1} opacity={0.5} />
                {n % 3 === 0 && n > 0 && (
                  <text x={LARGEUR / 2 + 70} y={y + 4} className="fill-encre-3" fontSize={10}>{n}</text>
                )}
              </g>
            );
          })}
          {Array.from({ length: CORDES }, (_, i) => {
            const { cx } = versEcran((i + 1 - (CORDES + 1) / 2) * ECART_CORDES, 0);
            return (
              <line key={i} x1={cx} y1={24} x2={cx} y2={HAUTEUR - 20}
                    className={i + 1 === corde ? "stroke-orange" : "stroke-encre-3"}
                    strokeWidth={i + 1 === corde ? 2 : 1} opacity={i + 1 === corde ? 1 : 0.55} />
            );
          })}

          {/* La trace du déplacement demandé */}
          {poseDepart && (
            <line x1={versEcran(calcul.depart.x, calcul.depart.z).cx}
                  y1={versEcran(calcul.depart.x, calcul.depart.z).cy}
                  x2={outil.cx} y2={outil.cy}
                  className="stroke-cyan" strokeWidth={2} strokeDasharray="4 3" opacity={0.8} />
          )}

          {/* Le bras : du pivot à l'outil */}
          {poseArrivee ? (
            <>
              <line x1={pivot.cx} y1={pivot.cy} x2={outil.cx} y2={outil.cy}
                    className="stroke-encre" strokeWidth={5} strokeLinecap="round" />
              <circle cx={pivot.cx} cy={pivot.cy} r={6} className="fill-encre-2" />
              <circle cx={outil.cx} cy={outil.cy} r={7} className="fill-orange" />
            </>
          ) : (
            <text x={LARGEUR / 2} y={HAUTEUR / 2} textAnchor="middle"
                  className="fill-rose" fontSize={12}>hors d'atteinte du bras</text>
          )}
        </svg>
        <figcaption className="mt-2 text-xs text-encre-3">
          Le manche vu de face : six cordes espacées de onze millimètres, douze frettes placées
          au tempérament égal. Le bras mesure quatre-vingt-dix millimètres et pivote à soixante
          millimètres du milieu du manche ; le trait pointillé est le déplacement demandé.
        </figcaption>
      </figure>

      {/* Les réglages et le verdict */}
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Reglage libelle="Corde visée" valeur={`${corde}`} min={1} max={CORDES} pas={1}
                   sur={setCorde} nombre={corde} />
          <Reglage libelle="Frette visée" valeur={frette === 0 ? "à vide" : `${frette}`}
                   min={0} max={FRETTES} pas={1} sur={setFrette} nombre={frette} />
          <Reglage libelle="Corde de départ" valeur={`${depuisCorde}`} min={1} max={CORDES} pas={1}
                   sur={setDepuisCorde} nombre={depuisCorde} />
          <Reglage libelle="Notes par seconde" valeur={`${notesParSeconde}`} min={1} max={16} pas={1}
                   sur={setNotes} nombre={notesParSeconde} />
        </div>

        <label className="flex items-center gap-2 text-sm text-encre-2">
          <input type="checkbox" checked={adouci} onChange={(e) => setAdouci(e.target.checked)}
                 className="size-4 accent-orange" />
          Profil adouci au départ et à l'arrivée
        </label>

        <div className={`rounded-2xl border p-4 ${tenable ? "border-vert/40 bg-vert/5" : "border-rose/40 bg-rose/5"}`}>
          <p className={`text-sm font-semibold ${tenable ? "text-vert" : "text-rose"}`}>
            {poseArrivee === null
              ? "Position hors d'atteinte : le bras ne peut pas se placer là."
              : tenable
                ? "Le mécanisme peut tenir ce rythme."
                : "Trop demandé : le moteur ne suit pas."}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            <Ligne nom="Angle du bras" valeur={poseArrivee ? `${((poseArrivee.theta * 180) / Math.PI).toFixed(1)} °` : "-"} />
            <Ligne nom="Translation" valeur={poseArrivee ? `${poseArrivee.d.toFixed(1)} mm` : "-"} />
            <Ligne nom="Déplacement" valeur={`${distance.toFixed(1)} mm`} />
            <Ligne nom="Temps par note" valeur={`${(1000 / notesParSeconde).toFixed(0)} ms`} />
            <Ligne nom="Vitesse demandée" valeur={`${demande.vitesse.toFixed(0)} mm/s`}
                   alerte={demande.vitesse > VITESSE_MOTEUR} />
            <Ligne nom="Accélération demandée" valeur={`${demande.acceleration.toFixed(0)} mm/s²`}
                   alerte={demande.acceleration > ACCELERATION_MOTEUR} />
          </dl>
        </div>

        <p className="text-sm text-encre-2">
          Pour comparer : le geste d'un guitariste, relevé image par image sur une vidéo au
          ralenti, balaye <strong>{GESTE_HUMAIN.amplitude} mm</strong> à{" "}
          <strong>{GESTE_HUMAIN.vitesse} mm/s</strong> en pointe. C'est la cible que le
          mécanisme doit tenir, et c'est elle qui a fixé le choix du moteur et de la courroie.
        </p>
        <p className="text-xs text-encre-3">
          Les formules sont celles des scripts de simulation du dépôt : position de l'outil
          <code className="mx-1 rounded bg-surface-3 px-1">x = A + B cos θ</code> et
          <code className="mx-1 rounded bg-surface-3 px-1">z = d − B sin θ</code>, résolues
          à l'envers pour trouver l'angle et la translation. Tout se calcule ici, dans votre
          navigateur.
        </p>
      </div>
    </div>
  );
}

function Reglage({ libelle, valeur, min, max, pas, sur, nombre }: {
  libelle: string; valeur: string; min: number; max: number; pas: number;
  sur: (n: number) => void; nombre: number;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm text-encre-2">
        {libelle}
        <span className="font-mono text-encre">{valeur}</span>
      </span>
      <input type="range" min={min} max={max} step={pas} value={nombre}
             onChange={(e) => sur(Number(e.target.value))}
             className="mt-1 w-full accent-orange" />
    </label>
  );
}

function Ligne({ nom, valeur, alerte }: { nom: string; valeur: string; alerte?: boolean }) {
  return (
    <>
      <dt className="text-encre-2">{nom}</dt>
      <dd className={`text-right font-mono ${alerte ? "text-rose" : "text-encre"}`}>{valeur}</dd>
    </>
  );
}
